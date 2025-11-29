import { motion } from 'framer-motion';
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
    <div className="relative w-full min-h-[480px] flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="University Architecture" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl w-full px-6 py-12 text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
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
        </motion.div>

        {/* Search Row */}
        <motion.div 
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
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
          <div className="flex flex-col sm:flex-row gap-3 mt-4 justify-center flex-wrap">
            <Link href="/budget">
              <Button 
                size="lg"
                className="w-full sm:w-auto bg-white/95 hover:bg-white text-slate-900 shadow-lg hover:shadow-xl py-5 px-6 rounded-xl font-semibold border border-white/20 backdrop-blur-sm transition-all duration-200"
                data-testid="button-budget-finder"
              >
                <Wallet className="w-5 h-5 mr-2 text-blue-600" />
                Find by Budget
              </Button>
            </Link>
            <Link href="/calculator">
              <Button 
                size="lg"
                className="w-full sm:w-auto bg-white/95 hover:bg-white text-slate-900 shadow-lg hover:shadow-xl py-5 px-6 rounded-xl font-semibold border border-white/20 backdrop-blur-sm transition-all duration-200"
                data-testid="button-calculator-cta"
              >
                <Calculator className="w-5 h-5 mr-2 text-blue-600" />
                Cost Calculator
              </Button>
            </Link>
            <Link href="/resources">
              <Button 
                size="lg"
                className="w-full sm:w-auto bg-white/95 hover:bg-white text-slate-900 shadow-lg hover:shadow-xl py-5 px-6 rounded-xl font-semibold border border-white/20 backdrop-blur-sm transition-all duration-200"
                data-testid="button-resources"
              >
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Application Resources
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Country Cards */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.3 }}
        >
          <button
            onClick={() => setSelectedCountry('all')}
            className={`relative p-4 rounded-xl transition-all duration-200 ${
              selectedCountry === 'all'
                ? 'bg-blue-600 text-white shadow-xl scale-105 border-2 border-blue-400'
                : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
            }`}
            data-testid="button-country-all"
          >
            <div className="text-2xl mb-1">🌍</div>
            <div className="font-semibold text-sm">All Countries</div>
            <div className="text-xs opacity-80">{totalCount} universities</div>
          </button>
          {countries.map(country => (
            <div key={country} className="flex flex-col gap-2">
              <button
                onClick={() => setSelectedCountry(country)}
                className={`w-full p-4 rounded-xl transition-all duration-200 ${
                  selectedCountry === country
                    ? 'bg-blue-600 text-white shadow-xl scale-105 border-2 border-blue-400'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                }`}
                data-testid={`button-country-${country.toLowerCase()}`}
              >
                <div className="text-2xl mb-1">{countryFlags[country] || '🏛️'}</div>
                <div className="font-semibold text-sm">{country}</div>
                <div className="text-xs opacity-80">{countryCounts[country] || 0} universities</div>
              </button>
              <Link href={`/insights/${country}`}>
                <button
                  className="w-full py-2 px-3 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors border border-white/10"
                  data-testid={`button-insights-${country.toLowerCase()}`}
                >
                  <Info className="w-3.5 h-3.5" />
                  Visa & Jobs Info
                </button>
              </Link>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
