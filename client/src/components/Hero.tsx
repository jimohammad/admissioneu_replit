import { Search, Calculator, Wallet, FileText, Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import heroBg from '@assets/generated_images/modern_abstract_university_architecture_background.png';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  countries: string[];
  countryCounts: Record<string, number>;
}

const countryFlags: Record<string, string> = {
  'Spain': '🇪🇸',
  'Germany': '🇩🇪',
  'Hungary': '🇭🇺',
  'Italy': '🇮🇹',
  'Poland': '🇵🇱',
  'France': '🇫🇷',
  'Netherlands': '🇳🇱',
  'All': '🌍',
};

export function Hero({ searchQuery, setSearchQuery, selectedCountry, setSelectedCountry, countries, countryCounts }: HeroProps) {
  const totalCount = countryCounts ? Object.values(countryCounts).reduce((a, b) => a + b, 0) : 0;
  
  return (
    <div className="relative w-full min-h-[520px] flex items-center justify-center bg-slate-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src={heroBg} 
          alt="University Architecture" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl w-full px-6 py-12 text-center space-y-8">
        <div>
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-white text-sm font-medium tracking-wide">
            <span className="w-2 h-2 rounded-full bg-amber-400 mr-2 animate-pulse"></span>
            {totalCount} Universities • 2026 Academic Year
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4 font-heading">
            Find Your Future in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300">Europe</span>
          </h1>
          <p className="text-base md:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
            Explore accredited universities across 6 European countries
          </p>
        </div>

        {/* Search Row */}
        <div className="max-w-2xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-400 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative flex items-center">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input 
                type="text" 
                placeholder="Search universities, cities, regions..." 
                className="w-full pl-12 py-6 text-base bg-white/95 backdrop-blur-xl border-0 text-slate-900 placeholder:text-slate-400 shadow-2xl rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search"
              />
            </div>
          </div>
          
          {/* Tool Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4 justify-center">
            <Link href="/budget">
              <div 
                className="w-full sm:w-56 h-14 bg-slate-900/50 hover:bg-slate-900/70 border border-white/15 hover:border-blue-400 text-white rounded-xl inline-flex items-center justify-center gap-3 px-5 text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer active:scale-[0.98]"
                data-testid="button-budget-finder"
              >
                <Wallet className="w-5 h-5 text-blue-400" />
                Find by Budget
              </div>
            </Link>
            <Link href="/calculator">
              <div 
                className="w-full sm:w-56 h-14 bg-slate-900/50 hover:bg-slate-900/70 border border-white/15 hover:border-amber-400 text-white rounded-xl inline-flex items-center justify-center gap-3 px-5 text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer active:scale-[0.98]"
                data-testid="button-calculator-cta"
              >
                <Calculator className="w-5 h-5 text-amber-400" />
                Cost Calculator
              </div>
            </Link>
            <Link href="/resources">
              <div 
                className="w-full sm:w-56 h-14 bg-slate-900/50 hover:bg-slate-900/70 border border-white/15 hover:border-slate-300 text-white rounded-xl inline-flex items-center justify-center gap-3 px-5 text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer active:scale-[0.98]"
                data-testid="button-resources"
              >
                <FileText className="w-5 h-5 text-slate-300" />
                Resources
              </div>
            </Link>
          </div>
        </div>

        {/* Country Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto pb-4">
          <div className="flex flex-col gap-2">
            <div
              onClick={() => setSelectedCountry('all')}
              className={`relative p-4 rounded-xl transition-all duration-200 cursor-pointer text-white hover:bg-white/10 ${
                selectedCountry === 'all'
                  ? 'border-2 border-blue-400'
                  : 'border border-white/20'
              }`}
              data-testid="button-country-all"
            >
              <div className="text-2xl mb-1">🌍</div>
              <div className={`text-sm ${selectedCountry === 'all' ? 'font-bold' : 'font-medium'}`}>All Countries</div>
              <div className="text-xs opacity-80">{totalCount} universities</div>
            </div>
            <div className="h-[34px]"></div>
          </div>
          {countries.map(country => (
            <div key={country} className="flex flex-col gap-2">
              <div
                onClick={() => setSelectedCountry(country)}
                className={`w-full p-4 rounded-xl transition-all duration-200 cursor-pointer text-white hover:bg-white/10 ${
                  selectedCountry === country
                    ? 'border-2 border-blue-400'
                    : 'border border-white/20'
                }`}
                data-testid={`button-country-${country.toLowerCase()}`}
              >
                <div className="text-2xl mb-1">{countryFlags[country] || '🏛️'}</div>
                <div className={`text-sm ${selectedCountry === country ? 'font-bold' : 'font-medium'}`}>{country}</div>
                <div className="text-xs opacity-80">{countryCounts[country] || 0} universities</div>
              </div>
              <a
                href={`/insights/${country}`}
                className="w-full py-2 px-3 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors border border-white/10 cursor-pointer no-underline"
                data-testid={`button-insights-${country.toLowerCase()}`}
              >
                <Info className="w-3.5 h-3.5" />
                Visa & Jobs Info
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
