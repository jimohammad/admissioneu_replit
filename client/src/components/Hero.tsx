import { Search, Calculator, Wallet, FileText, Briefcase, Trophy, Plane, Building2, Lightbulb } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Link } from 'wouter';
import heroBg from '@assets/stock_images/modern_glass_buildin_0e142d1a.webp';

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
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/70 to-slate-900/30 pointer-events-none"></div>
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
          
          {/* Tool Buttons - Round Icons with Labels */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-6 w-full max-w-3xl mx-auto px-2">
            <Link 
              href="/budget"
              className="flex flex-col items-center gap-1.5 group cursor-pointer select-none"
              data-testid="button-budget-finder"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-900/60 border border-white/20 group-hover:border-blue-400 group-hover:bg-slate-900/80 flex items-center justify-center transition-all duration-200 group-active:scale-95">
                <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 pointer-events-none" />
              </div>
              <span className="text-[10px] sm:text-xs text-white/80 group-hover:text-blue-400 font-medium transition-colors pointer-events-none">Budget</span>
            </Link>
            <Link 
              href="/calculator"
              className="flex flex-col items-center gap-1.5 group cursor-pointer select-none"
              data-testid="button-calculator-cta"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-900/60 border border-white/20 group-hover:border-amber-400 group-hover:bg-slate-900/80 flex items-center justify-center transition-all duration-200 group-active:scale-95">
                <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 pointer-events-none" />
              </div>
              <span className="text-[10px] sm:text-xs text-white/80 group-hover:text-amber-400 font-medium transition-colors pointer-events-none">Cost</span>
            </Link>
            <Link 
              href="/rankings"
              className="flex flex-col items-center gap-1.5 group cursor-pointer select-none"
              data-testid="button-rankings"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-900/60 border border-white/20 group-hover:border-yellow-400 group-hover:bg-slate-900/80 flex items-center justify-center transition-all duration-200 group-active:scale-95">
                <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 pointer-events-none" />
              </div>
              <span className="text-[10px] sm:text-xs text-white/80 group-hover:text-yellow-400 font-medium transition-colors pointer-events-none">Ranking</span>
            </Link>
            <Link 
              href="/resources"
              className="flex flex-col items-center gap-1.5 group cursor-pointer select-none"
              data-testid="button-resources"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-900/60 border border-white/20 group-hover:border-slate-100 group-hover:bg-slate-900/80 flex items-center justify-center transition-all duration-200 group-active:scale-95">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-slate-300 pointer-events-none" />
              </div>
              <span className="text-[10px] sm:text-xs text-white/80 group-hover:text-slate-100 font-medium transition-colors pointer-events-none">Visa Docs</span>
            </Link>
            <Link 
              href="/arrival-guide"
              className="flex flex-col items-center gap-1.5 group cursor-pointer select-none"
              data-testid="button-arrival-guide"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-900/60 border border-white/20 group-hover:border-cyan-400 group-hover:bg-slate-900/80 flex items-center justify-center transition-all duration-200 group-active:scale-95">
                <Plane className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 pointer-events-none" />
              </div>
              <span className="text-[10px] sm:text-xs text-white/80 group-hover:text-cyan-400 font-medium transition-colors pointer-events-none">Arrival</span>
            </Link>
            <Link 
              href="/pr-jobs"
              className="flex flex-col items-center gap-1.5 group cursor-pointer select-none"
              data-testid="button-pr-jobs"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-900/60 border border-white/20 group-hover:border-emerald-400 group-hover:bg-slate-900/80 flex items-center justify-center transition-all duration-200 group-active:scale-95">
                <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 pointer-events-none" />
              </div>
              <span className="text-[10px] sm:text-xs text-white/80 group-hover:text-emerald-400 font-medium transition-colors pointer-events-none">PR & Jobs</span>
            </Link>
            <Link 
              href="/accreditation"
              className="flex flex-col items-center gap-1.5 group cursor-pointer select-none"
              data-testid="button-accreditation"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-900/60 border border-white/20 group-hover:border-purple-400 group-hover:bg-slate-900/80 flex items-center justify-center transition-all duration-200 group-active:scale-95">
                <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 pointer-events-none" />
              </div>
              <span className="text-[10px] sm:text-xs text-white/80 group-hover:text-purple-400 font-medium transition-colors pointer-events-none">Degree</span>
            </Link>
            <Link 
              href="/field-suggester"
              className="flex flex-col items-center gap-1.5 group cursor-pointer select-none"
              data-testid="button-field-suggester"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-900/60 border border-white/20 group-hover:border-violet-400 group-hover:bg-slate-900/80 flex items-center justify-center transition-all duration-200 group-active:scale-95">
                <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-violet-400 pointer-events-none" />
              </div>
              <span className="text-[10px] sm:text-xs text-white/80 group-hover:text-violet-400 font-medium transition-colors pointer-events-none">Suggest</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
