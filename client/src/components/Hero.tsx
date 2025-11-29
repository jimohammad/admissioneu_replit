import { Search, Calculator, Wallet, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Link } from 'wouter';
import heroBg from '@assets/stock_images/modern_glass_buildin_0e142d1a.jpg';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function Hero({ searchQuery, setSearchQuery }: HeroProps) {
  
  return (
    <div className="relative w-full min-h-[520px] flex items-center justify-center bg-slate-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src={heroBg} 
          alt="University Campus" 
          className="w-full h-full object-cover opacity-50"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/70 to-slate-900/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl w-full px-6 py-12 text-center space-y-8">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4 font-heading">
            Database of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300">European Universities</span>
          </h1>
          <p className="text-base md:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
            Discover world-class universities across Europe
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
      </div>
    </div>
  );
}
