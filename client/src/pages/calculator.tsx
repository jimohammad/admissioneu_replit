import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  Home as HomeIcon, 
  Zap, 
  ShoppingCart, 
  Utensils, 
  Bus, 
  HeartPulse, 
  PartyPopper,
  Calculator as CalcIcon,
  ArrowLeft,
  Euro,
  TrendingUp,
  Users,
  User
} from 'lucide-react';
import type { CostOfLiving } from '@shared/schema';

const countryFlags: Record<string, string> = {
  'Spain': '🇪🇸',
  'Germany': '🇩🇪',
  'Hungary': '🇭🇺',
};

const lifestyleMultipliers: Record<string, { label: string; multiplier: number; description: string }> = {
  frugal: { label: 'Frugal', multiplier: 0.8, description: 'Budget-conscious living' },
  standard: { label: 'Standard', multiplier: 1.0, description: 'Typical student lifestyle' },
  comfortable: { label: 'Comfortable', multiplier: 1.25, description: 'More relaxed spending' },
};

export default function Calculator() {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [lifestyle, setLifestyle] = useState<string>('standard');
  const [housingType, setHousingType] = useState<'shared' | 'solo'>('shared');

  const { data: costData = [], isLoading } = useQuery<CostOfLiving[]>({
    queryKey: ['/api/cost-of-living'],
  });

  const countries = useMemo(() => {
    const uniqueCountries = Array.from(new Set(costData.map(c => c.country)));
    return uniqueCountries.sort();
  }, [costData]);

  const cities = useMemo(() => {
    if (!selectedCountry) return [];
    return costData
      .filter(c => c.country === selectedCountry)
      .map(c => c.city)
      .sort();
  }, [costData, selectedCountry]);

  const selectedCityData = useMemo(() => {
    return costData.find(c => c.city === selectedCity && c.country === selectedCountry);
  }, [costData, selectedCity, selectedCountry]);

  const calculatedCosts = useMemo(() => {
    if (!selectedCityData) return null;
    
    const mult = lifestyleMultipliers[lifestyle].multiplier;
    const rent = housingType === 'shared' ? selectedCityData.rentShared : selectedCityData.rentSolo;
    
    return {
      rent: Math.round(rent * mult),
      utilities: Math.round(selectedCityData.utilities * mult),
      groceries: Math.round(selectedCityData.groceries * mult),
      dining: Math.round(selectedCityData.dining * mult),
      transport: Math.round(selectedCityData.transport * mult),
      healthcare: Math.round(selectedCityData.healthcare * mult),
      entertainment: Math.round(selectedCityData.entertainment * mult),
    };
  }, [selectedCityData, lifestyle, housingType]);

  const totalMonthly = useMemo(() => {
    if (!calculatedCosts) return 0;
    return Object.values(calculatedCosts).reduce((sum, val) => sum + val, 0);
  }, [calculatedCosts]);

  const totalAnnual = totalMonthly * 12;

  const costCategories = calculatedCosts ? [
    { name: 'Rent', value: calculatedCosts.rent, icon: HomeIcon, color: 'bg-blue-500' },
    { name: 'Utilities', value: calculatedCosts.utilities, icon: Zap, color: 'bg-yellow-500' },
    { name: 'Groceries', value: calculatedCosts.groceries, icon: ShoppingCart, color: 'bg-green-500' },
    { name: 'Dining Out', value: calculatedCosts.dining, icon: Utensils, color: 'bg-orange-500' },
    { name: 'Transport', value: calculatedCosts.transport, icon: Bus, color: 'bg-purple-500' },
    { name: 'Healthcare', value: calculatedCosts.healthcare, icon: HeartPulse, color: 'bg-red-500' },
    { name: 'Entertainment', value: calculatedCosts.entertainment, icon: PartyPopper, color: 'bg-pink-500' },
  ] : [];

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
            <CalcIcon className="w-5 h-5 text-primary" />
            <span className="font-heading font-semibold">Cost of Living Calculator</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold font-heading mb-3">Student Cost of Living Calculator</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Estimate your monthly expenses in European university cities. Select a city and adjust for your lifestyle.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Selection Panel */}
          <Card className="lg:col-span-1 h-fit" data-testid="card-selection">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Euro className="w-5 h-5 text-primary" />
                Configure Your Budget
              </CardTitle>
              <CardDescription>Choose your destination and lifestyle preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Country Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Country</label>
                <Select 
                  value={selectedCountry} 
                  onValueChange={(val) => {
                    setSelectedCountry(val);
                    setSelectedCity('');
                  }}
                >
                  <SelectTrigger data-testid="select-country">
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map(country => (
                      <SelectItem key={country} value={country} data-testid={`option-country-${country}`}>
                        {countryFlags[country] || '🌍'} {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* City Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium">City</label>
                <Select 
                  value={selectedCity} 
                  onValueChange={setSelectedCity}
                  disabled={!selectedCountry}
                >
                  <SelectTrigger data-testid="select-city">
                    <SelectValue placeholder={selectedCountry ? "Select a city" : "Select country first"} />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map(city => (
                      <SelectItem key={city} value={city} data-testid={`option-city-${city}`}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              {/* Housing Type */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Housing Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={housingType === 'shared' ? 'default' : 'outline'}
                    className="w-full"
                    onClick={() => setHousingType('shared')}
                    data-testid="button-housing-shared"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Shared
                  </Button>
                  <Button
                    variant={housingType === 'solo' ? 'default' : 'outline'}
                    className="w-full"
                    onClick={() => setHousingType('solo')}
                    data-testid="button-housing-solo"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Solo
                  </Button>
                </div>
              </div>

              {/* Lifestyle */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Lifestyle</label>
                <div className="space-y-2">
                  {Object.entries(lifestyleMultipliers).map(([key, { label, description }]) => (
                    <Button
                      key={key}
                      variant={lifestyle === key ? 'default' : 'outline'}
                      className="w-full justify-start h-auto py-3"
                      onClick={() => setLifestyle(key)}
                      data-testid={`button-lifestyle-${key}`}
                    >
                      <div className="text-left">
                        <div className="font-medium">{label}</div>
                        <div className="text-xs opacity-70">{description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Panel */}
          <div className="lg:col-span-2 space-y-6">
            {selectedCityData && calculatedCosts ? (
              <>
                {/* Summary Cards */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20" data-testid="card-monthly-total">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Monthly Estimate</p>
                          <p className="text-4xl font-bold text-primary">€{totalMonthly.toLocaleString()}</p>
                        </div>
                        <div className="p-3 bg-primary/10 rounded-full">
                          <Euro className="w-8 h-8 text-primary" />
                        </div>
                      </div>
                      <Badge variant="secondary" className="mt-3">
                        {countryFlags[selectedCountry]} {selectedCity}, {selectedCountry}
                      </Badge>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20" data-testid="card-annual-total">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Annual Estimate</p>
                          <p className="text-4xl font-bold text-amber-600">€{totalAnnual.toLocaleString()}</p>
                        </div>
                        <div className="p-3 bg-amber-500/10 rounded-full">
                          <TrendingUp className="w-8 h-8 text-amber-600" />
                        </div>
                      </div>
                      <Badge variant="secondary" className="mt-3">
                        {lifestyleMultipliers[lifestyle].label} lifestyle • {housingType === 'shared' ? 'Shared' : 'Solo'} housing
                      </Badge>
                    </CardContent>
                  </Card>
                </div>

                {/* Breakdown */}
                <Card data-testid="card-breakdown">
                  <CardHeader>
                    <CardTitle>Monthly Expense Breakdown</CardTitle>
                    <CardDescription>Detailed breakdown of your estimated monthly costs</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {costCategories.map(({ name, value, icon: Icon, color }) => {
                      const percentage = Math.round((value / totalMonthly) * 100);
                      return (
                        <div key={name} className="space-y-2" data-testid={`breakdown-${name.toLowerCase().replace(' ', '-')}`}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${color} text-white`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <span className="font-medium">{name}</span>
                            </div>
                            <div className="text-right">
                              <span className="font-semibold">€{value}</span>
                              <span className="text-muted-foreground text-sm ml-2">({percentage}%)</span>
                            </div>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>

                {/* Tips */}
                <Card className="bg-slate-50 dark:bg-slate-900/50" data-testid="card-tips">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-3">💡 Budget Tips for {selectedCity}</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Student discounts are widely available on transport and cultural activities</li>
                      <li>• University cafeterias offer affordable meal options (€3-6)</li>
                      <li>• Consider getting a student health insurance plan</li>
                      <li>• Look for student housing near campus to save on transport costs</li>
                    </ul>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="h-[400px] flex items-center justify-center" data-testid="card-empty-state">
                <div className="text-center text-muted-foreground">
                  <CalcIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
                  <p className="text-lg font-medium">Select a city to calculate costs</p>
                  <p className="text-sm mt-1">Choose a country and city from the options on the left</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
