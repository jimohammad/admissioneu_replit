import { motion } from 'framer-motion';
import { Search, Globe2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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
  'France': '🇫🇷',
  'Italy': '🇮🇹',
  'Netherlands': '🇳🇱',
  'All': '🌍',
};

export function Hero({ searchQuery, setSearchQuery, selectedCountry, setSelectedCountry, countries, countryCounts }: HeroProps) {
  return (
    <div className="relative w-full h-[560px] flex items-center justify-center overflow-hidden bg-slate-900">
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
      <div className="relative z-10 max-w-4xl w-full px-6 text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-white text-sm font-medium tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
            Live Database: 2025 Academic Year
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 font-heading">
            Find Your Future in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Europe</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            The comprehensive directory of accredited European universities. Explore programs across countries, compare campuses, and start your journey.
          </p>
        </motion.div>

        {/* Country Selection Pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 pt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Button
            variant={selectedCountry === 'all' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setSelectedCountry('all')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              selectedCountry === 'all'
                ? 'bg-white text-slate-900 shadow-lg'
                : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
            }`}
            data-testid="button-country-all"
          >
            <Globe2 className="w-4 h-4 mr-1.5" />
            All Countries
            <span className="ml-1.5 text-xs opacity-70">({countryCounts ? Object.values(countryCounts).reduce((a, b) => a + b, 0) : 0})</span>
          </Button>
          {countries.map(country => (
            <Button
              key={country}
              variant={selectedCountry === country ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedCountry(country)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                selectedCountry === country
                  ? 'bg-white text-slate-900 shadow-lg'
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
              }`}
              data-testid={`button-country-${country.toLowerCase()}`}
            >
              <span className="mr-1.5">{countryFlags[country] || '🏛️'}</span>
              {country}
              <span className="ml-1.5 text-xs opacity-70">({countryCounts[country] || 0})</span>
            </Button>
          ))}
        </motion.div>

        <motion.div 
          className="max-w-xl mx-auto relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex items-center">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input 
                type="text" 
                placeholder="Search universities by name, city, or region..." 
                className="w-full pl-12 py-6 text-lg bg-white/95 backdrop-blur-xl border-white/20 text-slate-900 placeholder:text-slate-400 shadow-2xl rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
