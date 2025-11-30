import { Search, Calculator, Wallet, FileText, Briefcase, Trophy, Plane } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Link, useLocation } from 'wouter';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import heroBg from '@assets/stock_images/modern_glass_buildin_0e142d1a.jpg';

const countries = [
  { name: 'France', code: 'FR' },
  { name: 'Germany', code: 'DE' },
  { name: 'Hungary', code: 'HU' },
  { name: 'Italy', code: 'IT' },
  { name: 'Netherlands', code: 'NL' },
  { name: 'Poland', code: 'PL' },
  { name: 'Spain', code: 'ES' },
];

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function Hero({ searchQuery, setSearchQuery }: HeroProps) {
  const [, setLocation] = useLocation();
  
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
          
          {/* Tool Buttons - Flexbox Layout */}
          <div className="flex flex-wrap justify-center gap-3 mt-6 w-full max-w-4xl mx-auto px-4">
            <Link href="/budget" className="block">
              <div 
                className="h-11 px-6 bg-slate-900/60 hover:bg-slate-900/80 border border-white/20 hover:border-blue-400 text-white rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-all duration-200 cursor-pointer active:scale-[0.98] whitespace-nowrap"
                data-testid="button-budget-finder"
              >
                <Wallet className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>My Budget</span>
              </div>
            </Link>
            <Link href="/calculator" className="block">
              <div 
                className="h-11 px-6 bg-slate-900/60 hover:bg-slate-900/80 border border-white/20 hover:border-amber-400 text-white rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-all duration-200 cursor-pointer active:scale-[0.98] whitespace-nowrap"
                data-testid="button-calculator-cta"
              >
                <Calculator className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Calculator</span>
              </div>
            </Link>
            <Link href="/rankings" className="block">
              <div 
                className="h-11 px-6 bg-slate-900/60 hover:bg-slate-900/80 border border-white/20 hover:border-yellow-400 text-white rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-all duration-200 cursor-pointer active:scale-[0.98] whitespace-nowrap"
                data-testid="button-rankings"
              >
                <Trophy className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span>Ranking</span>
              </div>
            </Link>
            <Link href="/arrival-guide" className="block">
              <div 
                className="h-11 px-6 bg-slate-900/60 hover:bg-slate-900/80 border border-white/20 hover:border-cyan-400 text-white rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-all duration-200 cursor-pointer active:scale-[0.98] whitespace-nowrap"
                data-testid="button-arrival-guide"
              >
                <Plane className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Arrival Guide</span>
              </div>
            </Link>
            <Link href="/resources" className="block">
              <div 
                className="h-11 px-6 bg-slate-900/60 hover:bg-slate-900/80 border border-white/20 hover:border-slate-300 text-white rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-all duration-200 cursor-pointer active:scale-[0.98] whitespace-nowrap"
                data-testid="button-resources"
              >
                <FileText className="w-4 h-4 text-slate-300 flex-shrink-0" />
                <span>Resources</span>
              </div>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div 
                  className="h-11 px-6 bg-slate-900/60 hover:bg-slate-900/80 border border-white/20 hover:border-emerald-400 text-white rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-all duration-200 cursor-pointer active:scale-[0.98] whitespace-nowrap"
                  data-testid="button-visa-jobs"
                >
                  <Briefcase className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Visa & Jobs</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-slate-800 border-slate-700">
                {countries.map(({ name, code }) => (
                  <DropdownMenuItem 
                    key={name}
                    onClick={() => setLocation(`/insights/${name}`)}
                    className="cursor-pointer text-slate-300 hover:text-white focus:text-white hover:bg-slate-700/50 focus:bg-slate-700/50"
                    data-testid={`nav-visa-${name.toLowerCase()}`}
                  >
                    <img 
                      src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`} 
                      alt="" 
                      className="w-5 h-3.5 object-cover rounded-sm flex-shrink-0 mr-2" 
                    />
                    <span>{name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
