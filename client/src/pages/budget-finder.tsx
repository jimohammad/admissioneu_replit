import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowLeft,
  Euro,
  Wallet,
  GraduationCap,
  MapPin,
  CheckCircle2,
  AlertCircle,
  TrendingDown,
  Building2,
  ExternalLink,
  Globe
} from 'lucide-react';
import type { University, CostOfLiving } from '@shared/schema';

const currencies = [
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 1 },
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1.09 },
  { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.86 },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 91.5 },
  { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee', rate: 303 },
  { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka', rate: 119 },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', rate: 7.9 },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', rate: 1650 },
  { code: 'EGP', symbol: 'E£', name: 'Egyptian Pound', rate: 53 },
  { code: 'TRY', symbol: '₺', name: 'Turkish Lira', rate: 35 },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', rate: 5.4 },
  { code: 'MXN', symbol: 'MX$', name: 'Mexican Peso', rate: 18.5 },
  { code: 'VND', symbol: '₫', name: 'Vietnamese Dong', rate: 27000 },
  { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah', rate: 17200 },
  { code: 'PHP', symbol: '₱', name: 'Philippine Peso', rate: 62 },
  { code: 'THB', symbol: '฿', name: 'Thai Baht', rate: 38 },
  { code: 'MAD', symbol: 'د.م.', name: 'Moroccan Dirham', rate: 10.8 },
  { code: 'SAR', symbol: 'ر.س', name: 'Saudi Riyal', rate: 4.1 },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', rate: 4.0 },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won', rate: 1450 },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rate: 163 },
];

const countryFlags: Record<string, string> = {
  'France': '🇫🇷',
  'Germany': '🇩🇪',
  'Hungary': '🇭🇺',
  'Italy': '🇮🇹',
  'Netherlands': '🇳🇱',
  'Poland': '🇵🇱',
  'Spain': '🇪🇸',
};

function parseTuitionRange(tuitionStr: string | null): { min: number; max: number } | null {
  if (!tuitionStr) return null;
  
  const numbers = tuitionStr.match(/[\d,]+/g);
  if (!numbers || numbers.length === 0) return null;
  
  const parsed = numbers.map(n => parseInt(n.replace(/,/g, '')));
  if (parsed.length === 1) {
    return { min: parsed[0], max: parsed[0] };
  }
  return { min: Math.min(...parsed), max: Math.max(...parsed) };
}

export default function BudgetFinder() {
  const [, setLocation] = useLocation();
  const [monthlyBudget, setMonthlyBudget] = useState<number>(1500);
  const [budgetInput, setBudgetInput] = useState<string>('1500');
  const [isEU, setIsEU] = useState<boolean>(true);
  const [housingType, setHousingType] = useState<'shared' | 'solo'>('shared');
  const [selectedCurrency, setSelectedCurrency] = useState<string>('EUR');

  const currentCurrency = currencies.find(c => c.code === selectedCurrency) || currencies[0];
  
  const convertToLocal = (eurAmount: number) => {
    return Math.round(eurAmount * currentCurrency.rate);
  };
  
  const formatLocal = (eurAmount: number) => {
    const converted = convertToLocal(eurAmount);
    return `${currentCurrency.symbol}${converted.toLocaleString()}`;
  };

  const { data: universities = [], isLoading: loadingUnis } = useQuery<University[]>({
    queryKey: ['/api/universities'],
    queryFn: async () => {
      const res = await fetch('/api/universities');
      if (!res.ok) throw new Error('Failed to fetch universities');
      return res.json();
    },
  });

  const { data: costData = [], isLoading: loadingCosts } = useQuery<CostOfLiving[]>({
    queryKey: ['/api/cost-of-living'],
    queryFn: async () => {
      const res = await fetch('/api/cost-of-living');
      if (!res.ok) throw new Error('Failed to fetch cost data');
      return res.json();
    },
  });

  const costByCity = useMemo(() => {
    const map: Record<string, CostOfLiving> = {};
    costData.forEach(c => {
      map[`${c.country}-${c.city}`] = c;
    });
    return map;
  }, [costData]);

  const matchedUniversities = useMemo(() => {
    const annualBudget = monthlyBudget * 12;
    
    return universities
      .map(uni => {
        const cityKey = `${uni.country}-${uni.city}`;
        const cityCost = costByCity[cityKey];
        
        let monthlyLiving = 0;
        if (cityCost) {
          const rent = housingType === 'shared' ? cityCost.rentShared : cityCost.rentSolo;
          monthlyLiving = rent + cityCost.utilities + cityCost.groceries + cityCost.dining + cityCost.transport + cityCost.healthcare + cityCost.entertainment;
        } else {
          // Estimate based on country averages
          if (uni.country === 'Germany') monthlyLiving = housingType === 'shared' ? 950 : 1400;
          else if (uni.country === 'Spain') monthlyLiving = housingType === 'shared' ? 850 : 1200;
          else if (uni.country === 'Hungary') monthlyLiving = housingType === 'shared' ? 600 : 900;
          else monthlyLiving = 1000;
        }
        
        const annualLiving = monthlyLiving * 12;
        
        const tuitionStr = isEU ? uni.tuitionFeeEU : uni.tuitionFeeNonEU;
        const tuitionRange = parseTuitionRange(tuitionStr);
        
        let annualTuition = 0;
        if (tuitionRange) {
          annualTuition = tuitionRange.min;
          // Adjust for semester-based fees
          if (uni.tuitionPeriod === 'per semester') {
            annualTuition = tuitionRange.min * 2;
          }
        }
        
        const totalAnnualCost = annualLiving + annualTuition;
        const isAffordable = totalAnnualCost <= annualBudget;
        const savings = annualBudget - totalAnnualCost;
        
        return {
          university: uni,
          monthlyLiving,
          annualLiving,
          annualTuition,
          totalAnnualCost,
          monthlyTotal: Math.round(totalAnnualCost / 12),
          isAffordable,
          savings,
          hasCostData: !!cityCost,
        };
      })
      .filter(item => item.isAffordable)
      .sort((a, b) => a.totalAnnualCost - b.totalAnnualCost);
  }, [universities, costByCity, monthlyBudget, isEU, housingType]);

  const isLoading = loadingUnis || loadingCosts;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button 
            variant="ghost" 
            className="gap-2 cursor-pointer" 
            onClick={() => setLocation('/')}
            data-testid="button-back-home"
          >
            <ArrowLeft className="w-4 h-4" />
            Home
          </Button>
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-primary" />
            <span className="font-heading font-semibold">Budget Finder</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold font-heading mb-3">Find Universities Within Your Budget</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Enter your monthly budget and we'll show you which universities you can afford, including tuition and living costs.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Budget Input Panel */}
          <Card className="lg:col-span-1 h-fit" data-testid="card-budget-input">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-primary" />
                Your Budget
              </CardTitle>
              <CardDescription>Set your monthly budget and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Monthly Budget Input */}
              <div className="space-y-4">
                <label className="text-sm font-medium">Monthly Budget (€)</label>
                <div className="flex items-center gap-3">
                  <Euro className="w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    inputMode="numeric"
                    value={budgetInput}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, '');
                      setBudgetInput(val);
                      const num = parseInt(val);
                      if (!isNaN(num)) {
                        setMonthlyBudget(num);
                      } else {
                        setMonthlyBudget(0);
                      }
                    }}
                    className="text-2xl font-bold h-14"
                    placeholder="Enter budget"
                    data-testid="input-budget"
                  />
                </div>
                <Slider
                  value={[monthlyBudget]}
                  onValueChange={(val) => {
                    setMonthlyBudget(val[0]);
                    setBudgetInput(val[0].toString());
                  }}
                  min={500}
                  max={4000}
                  step={50}
                  className="mt-2"
                  data-testid="slider-budget"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>€500</span>
                  <span>€4,000</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Annual Budget</div>
                <div className="text-2xl font-bold text-primary">€{(monthlyBudget * 12).toLocaleString()}</div>
                {selectedCurrency !== 'EUR' && (
                  <div className="text-sm text-muted-foreground mt-1">
                    ≈ {formatLocal(monthlyBudget * 12)}
                  </div>
                )}
              </div>

              {/* Student Status */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Student Status</label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={isEU ? 'default' : 'outline'}
                    className="w-full"
                    onClick={() => setIsEU(true)}
                    data-testid="button-eu"
                  >
                    🇪🇺 EU Student
                  </Button>
                  <Button
                    variant={!isEU ? 'default' : 'outline'}
                    className="w-full"
                    onClick={() => setIsEU(false)}
                    data-testid="button-non-eu"
                  >
                    🌍 Non-EU
                  </Button>
                </div>
              </div>

              {/* Housing Type */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Housing Preference</label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={housingType === 'shared' ? 'default' : 'outline'}
                    className="w-full"
                    onClick={() => setHousingType('shared')}
                    data-testid="button-shared"
                  >
                    Shared Flat
                  </Button>
                  <Button
                    variant={housingType === 'solo' ? 'default' : 'outline'}
                    className="w-full"
                    onClick={() => setHousingType('solo')}
                    data-testid="button-solo"
                  >
                    Solo Apartment
                  </Button>
                </div>
              </div>

              {/* Local Currency */}
              <div className="space-y-3">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Globe className="w-4 h-4 text-primary" />
                  View in Local Currency
                </label>
                <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                  <SelectTrigger className="w-full" data-testid="select-currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {currencies.map(currency => (
                      <SelectItem key={currency.code} value={currency.code}>
                        <span className="flex items-center gap-2">
                          <span className="font-mono">{currency.symbol}</span>
                          <span>{currency.name}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedCurrency !== 'EUR' && (
                  <p className="text-xs text-muted-foreground">
                    1 EUR = {currentCurrency.rate.toLocaleString()} {currentCurrency.code}
                  </p>
                )}
              </div>

              {/* Results Summary */}
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                    {matchedUniversities.length} Universities Match
                  </span>
                </div>
                <p className="text-sm text-emerald-600 dark:text-emerald-500">
                  Out of {universities.length} total universities
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Results Panel */}
          <div className="lg:col-span-2">
            {isLoading ? (
              <Card className="h-[400px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-lg font-medium">Finding affordable universities...</p>
                </div>
              </Card>
            ) : matchedUniversities.length === 0 ? (
              <Card className="h-[400px] flex items-center justify-center" data-testid="card-no-results">
                <div className="text-center text-muted-foreground p-8">
                  <AlertCircle className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p className="text-xl font-medium mb-2">No universities found within this budget</p>
                  <p className="text-sm">Try increasing your monthly budget or changing your housing preference to shared.</p>
                </div>
              </Card>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Affordable Universities</h2>
                  <Badge variant="secondary" className="gap-1">
                    <TrendingDown className="w-3 h-3" />
                    Sorted by cost (lowest first)
                  </Badge>
                </div>
                
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-3">
                    {matchedUniversities.map(({ university, monthlyTotal, annualTuition, monthlyLiving, savings, hasCostData }) => (
                      <Card 
                        key={university.id} 
                        className="hover:shadow-md transition-shadow"
                        data-testid={`card-university-${university.id}`}
                      >
                        <CardContent className="p-4">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-start gap-2">
                                <span className="text-xl">{countryFlags[university.country] || '🏛️'}</span>
                                <div>
                                  <h3 className="font-semibold text-base leading-tight">{university.name}</h3>
                                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                                    <MapPin className="w-3 h-3" />
                                    {university.city}, {university.country}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex flex-wrap gap-2 mt-3">
                                <Badge variant={university.type === 'Public' ? 'default' : 'secondary'} className="text-xs">
                                  <Building2 className="w-3 h-3 mr-1" />
                                  {university.type}
                                </Badge>
                                {university.englishPrograms && (
                                  <Badge variant="outline" className="text-xs border-emerald-500 text-emerald-600">
                                    English Programs
                                  </Badge>
                                )}
                                {!hasCostData && (
                                  <Badge variant="outline" className="text-xs">
                                    Est. costs
                                  </Badge>
                                )}
                              </div>
                            </div>
                            
                            <div className="sm:text-right space-y-2">
                              <div>
                                <div className="text-2xl font-bold text-primary">€{monthlyTotal}/mo</div>
                                {selectedCurrency !== 'EUR' && (
                                  <div className="text-sm text-muted-foreground">
                                    ≈ {formatLocal(monthlyTotal)}/mo
                                  </div>
                                )}
                                <div className="text-xs text-muted-foreground">Total monthly cost</div>
                              </div>
                              <div className="flex flex-wrap gap-2 text-xs">
                                <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded">
                                  Living: €{monthlyLiving}/mo {selectedCurrency !== 'EUR' && <span className="opacity-75">({formatLocal(monthlyLiving)})</span>}
                                </span>
                                <span className="px-2 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded">
                                  Tuition: €{Math.round(annualTuition/12)}/mo {selectedCurrency !== 'EUR' && <span className="opacity-75">({formatLocal(Math.round(annualTuition/12))})</span>}
                                </span>
                              </div>
                              {savings > 0 && (
                                <div className="text-xs text-emerald-600 font-medium">
                                  ✓ €{Math.round(savings/12)}/mo under budget {selectedCurrency !== 'EUR' && `(${formatLocal(Math.round(savings/12))})`}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="mt-3 pt-3 border-t flex justify-end">
                            <Button variant="outline" size="sm" asChild>
                              <a href={university.website} target="_blank" rel="noopener noreferrer">
                                Visit Website
                                <ExternalLink className="w-3 h-3 ml-1" />
                              </a>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
