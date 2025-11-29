import { motion } from 'framer-motion';
import { Search, Calculator } from 'lucide-react';
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
  'France': '🇫🇷',
  'Italy': '🇮🇹',
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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-white text-sm font-medium tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
            {totalCount} Universities • 2025 Academic Year
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4 font-heading">
            Find Your Future in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Europe</span>
          </h1>
          <p className="text-base md:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
            Explore accredited universities across Spain, Germany, and Hungary
          </p>
        </motion.div>

        {/* Search and Calculator Row */}
        <motion.div 
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
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
            <Link href="/calculator">
              <Button 
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-amber-500/25 py-6 px-6 rounded-xl font-semibold"
                data-testid="button-calculator-cta"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Cost Calculator
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Country Cards */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <button
            onClick={() => setSelectedCountry('all')}
            className={`relative p-4 rounded-xl transition-all duration-200 ${
              selectedCountry === 'all'
                ? 'bg-white text-slate-900 shadow-xl scale-105'
                : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
            }`}
            data-testid="button-country-all"
          >
            <div className="text-2xl mb-1">🌍</div>
            <div className="font-semibold text-sm">All Countries</div>
            <div className="text-xs opacity-70">{totalCount} universities</div>
          </button>
          {countries.map(country => (
            <button
              key={country}
              onClick={() => setSelectedCountry(country)}
              className={`relative p-4 rounded-xl transition-all duration-200 ${
                selectedCountry === country
                  ? 'bg-white text-slate-900 shadow-xl scale-105'
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
              }`}
              data-testid={`button-country-${country.toLowerCase()}`}
            >
              <div className="text-2xl mb-1">{countryFlags[country] || '🏛️'}</div>
              <div className="font-semibold text-sm">{country}</div>
              <div className="text-xs opacity-70">{countryCounts[country] || 0} universities</div>
            </button>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
