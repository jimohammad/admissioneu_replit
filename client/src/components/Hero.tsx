import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import heroBg from '@assets/generated_images/modern_abstract_university_architecture_background.png';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function Hero({ searchQuery, setSearchQuery }: HeroProps) {
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden bg-slate-900">
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
      <div className="relative z-10 max-w-4xl w-full px-6 text-center space-y-8">
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
            Find Your Future in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Spain</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            The official directory of accredited Spanish universities. Explore programs, compare campuses, and start your journey.
          </p>
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
