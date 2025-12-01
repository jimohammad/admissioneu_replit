import { Search, Calculator, Wallet, FileText, Briefcase, Trophy, Plane, Building2 } from 'lucide-react';
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
            Database of <span className="text-transparent bg-clip-text bg-gradient-to-b from-blue-300 via-indigo-400 to-blue-500">European Universities</span>
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
          
          {/* Tool Buttons - Flexbox Layout */}
          <div className="flex flex-wrap justify-center gap-3 mt-6 w-full max-w-4xl mx-auto px-4">
            <Link href="/budget" className="block group">
              <div 
                className="h-11 px-6 bg-slate-900/60 hover:bg-slate-900/80 border border-white/20 hover:border-blue-400 text-white hover:text-blue-400 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-all duration-200 cursor-pointer active:scale-[0.98] whitespace-nowrap"
                data-testid="button-budget-finder"
              >
                <Wallet className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>My Budget</span>
              </div>
            </Link>
            <Link href="/calculator" className="block group">
              <div 
                className="h-11 px-6 bg-slate-900/60 hover:bg-slate-900/80 border border-white/20 hover:border-amber-400 text-white hover:text-amber-400 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-all duration-200 cursor-pointer active:scale-[0.98] whitespace-nowrap"
                data-testid="button-calculator-cta"
              >
                <Calculator className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Cost of Living</span>
              </div>
            </Link>
            <Link href="/rankings" className="block group">
              <div 
                className="h-11 px-6 bg-slate-900/60 hover:bg-slate-900/80 border border-white/20 hover:border-yellow-400 text-white hover:text-yellow-400 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-all duration-200 cursor-pointer active:scale-[0.98] whitespace-nowrap"
                data-testid="button-rankings"
              >
                <Trophy className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span>Ranking</span>
              </div>
            </Link>
            <Link href="/resources" className="block group">
              <div 
                className="h-11 px-6 bg-slate-900/60 hover:bg-slate-900/80 border border-white/20 hover:border-slate-100 text-white hover:text-slate-100 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-all duration-200 cursor-pointer active:scale-[0.98] whitespace-nowrap"
                data-testid="button-resources"
              >
                <FileText className="w-4 h-4 text-slate-300 flex-shrink-0" />
                <span>Admission & Visa Docs</span>
              </div>
            </Link>
            <Link href="/arrival-guide" className="block group">
              <div 
                className="h-11 px-6 bg-slate-900/60 hover:bg-slate-900/80 border border-white/20 hover:border-cyan-400 text-white hover:text-cyan-400 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-all duration-200 cursor-pointer active:scale-[0.98] whitespace-nowrap"
                data-testid="button-arrival-guide"
              >
                <Plane className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Arrival Guide</span>
              </div>
            </Link>
            <Link href="/pr-jobs" className="block group">
              <div 
                className="h-11 px-6 bg-slate-900/60 hover:bg-slate-900/80 border border-white/20 hover:border-emerald-400 text-white hover:text-emerald-400 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-all duration-200 cursor-pointer active:scale-[0.98] whitespace-nowrap"
                data-testid="button-pr-jobs"
              >
                <Briefcase className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>PR & Jobs</span>
              </div>
            </Link>
            <Link href="/accreditation" className="block group">
              <div 
                className="h-11 px-6 bg-slate-900/60 hover:bg-slate-900/80 border border-white/20 hover:border-purple-400 text-white hover:text-purple-400 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-all duration-200 cursor-pointer active:scale-[0.98] whitespace-nowrap"
                data-testid="button-accreditation"
              >
                <Building2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span>Degree Recognition</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
