import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
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
  ExternalLink
} from 'lucide-react';
import type { University, CostOfLiving } from '@shared/schema';

const countryFlags: Record<string, string> = {
  'Spain': '🇪🇸',
  'Germany': '🇩🇪',
  'Hungary': '🇭🇺',
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
  const [monthlyBudget, setMonthlyBudget] = useState<number>(1500);
  const [isEU, setIsEU] = useState<boolean>(true);
  const [housingType, setHousingType] = useState<'shared' | 'solo'>('shared');

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
          <Link href="/">
            <Button variant="ghost" className="gap-2" data-testid="button-back-home">
              <ArrowLeft className="w-4 h-4" />
              Back to Universities
            </Button>
          </Link>
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
                    type="number"
                    value={monthlyBudget}
                    onChange={(e) => setMonthlyBudget(Math.max(0, parseInt(e.target.value) || 0))}
                    className="text-2xl font-bold h-14"
                    min={0}
                    step={100}
                    data-testid="input-budget"
                  />
                </div>
                <Slider
                  value={[monthlyBudget]}
                  onValueChange={(val) => setMonthlyBudget(val[0])}
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
                                <div className="text-xs text-muted-foreground">Total monthly cost</div>
                              </div>
                              <div className="flex flex-wrap gap-2 text-xs">
                                <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded">
                                  Living: €{monthlyLiving}/mo
                                </span>
                                <span className="px-2 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded">
                                  Tuition: €{Math.round(annualTuition/12)}/mo
                                </span>
                              </div>
                              {savings > 0 && (
                                <div className="text-xs text-emerald-600 font-medium">
                                  ✓ €{Math.round(savings/12)}/mo under budget
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
