import { useLocation, useSearch } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { GraduationCap, Globe, ChevronDown, Briefcase } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { fetchUniversities } from '@/lib/api';

const countries = [
  { name: 'Germany', flag: '🇩🇪', code: 'DE' },
  { name: 'Hungary', flag: '🇭🇺', code: 'HU' },
  { name: 'Italy', flag: '🇮🇹', code: 'IT' },
  { name: 'Netherlands', flag: '🇳🇱', code: 'NL' },
  { name: 'Poland', flag: '🇵🇱', code: 'PL' },
  { name: 'Spain', flag: '🇪🇸', code: 'ES' },
];

export function Header() {
  const [location, setLocation] = useLocation();
  const searchParams = useSearch();
  const urlCountry = new URLSearchParams(searchParams).get('country');
  
  const { data: universities = [] } = useQuery({
    queryKey: ['universities'],
    queryFn: fetchUniversities,
  });
  
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    setLocation(path);
  };
  
  const isHome = location === '/' && !urlCountry;
  
  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        {/* Top bar with logo */}
        <div className="flex items-center justify-between px-4 py-3">
          <a 
            href="/" 
            onClick={(e) => handleNavClick(e, '/')}
            className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors no-underline"
          >
            <GraduationCap className="w-6 h-6 text-amber-400" />
            <span className="font-bold text-lg tracking-tight">EuroUni</span>
          </a>
          
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <Globe className="w-4 h-4" />
            <span>6 Countries • {universities.length} Universities</span>
          </div>
        </div>
        
        {/* Country navigation bar */}
        <nav className="border-t border-slate-800">
          <div className="flex items-center overflow-x-auto scrollbar-hide">
            <a 
              href="/"
              onClick={(e) => handleNavClick(e, '/')}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all duration-200 no-underline border-b-2 ${
                isHome 
                  ? 'text-white border-blue-400 bg-blue-500/20' 
                  : 'text-slate-400 border-transparent hover:text-blue-300 hover:bg-blue-500/10 hover:border-blue-400/50'
              }`}
              data-testid="nav-home"
            >
              <img src="https://flagcdn.com/w20/eu.png" alt="EU" className="w-5 h-4 object-cover rounded-sm" />
              <span>All</span>
            </a>
            
            {countries.map(({ name, code }) => (
              <div key={name} className="flex items-center">
                <div className="h-4 w-px bg-slate-700"></div>
                <a 
                  href={`/?country=${name}`}
                  onClick={(e) => handleNavClick(e, `/?country=${name}`)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all duration-200 no-underline border-b-2 ${
                    urlCountry === name 
                      ? 'text-white border-blue-400 bg-blue-500/20' 
                      : 'text-slate-400 border-transparent hover:text-blue-300 hover:bg-blue-500/10 hover:border-blue-400/50'
                  }`}
                  data-testid={`nav-${name.toLowerCase()}`}
                >
                  <img src={`https://flagcdn.com/w20/${code.toLowerCase()}.png`} alt={name} className="w-5 h-4 object-cover rounded-sm" />
                  <span>{name}</span>
                </a>
              </div>
            ))}
            
            {/* Visa & Jobs Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all duration-200 border-b-2 cursor-pointer ml-auto ${
                    location.startsWith('/insights') 
                      ? 'text-white border-amber-400 bg-amber-500/20' 
                      : 'text-slate-400 border-transparent hover:text-blue-300 hover:bg-blue-500/10 hover:border-blue-400/50'
                  }`}
                  data-testid="nav-visa-jobs"
                >
                  <Briefcase className="w-4 h-4" />
                  Visa & Jobs
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-slate-800 border-slate-700">
                <DropdownMenuLabel className="text-slate-400">Select Country</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-700" />
                {countries.map(({ name, code }) => (
                  <DropdownMenuItem 
                    key={name}
                    onClick={() => setLocation(`/insights/${name}`)}
                    className={`flex items-center gap-3 cursor-pointer ${
                      location === `/insights/${name}` 
                        ? 'text-amber-400 bg-slate-700/50' 
                        : 'text-slate-300 hover:text-white focus:text-white hover:bg-slate-700/50 focus:bg-slate-700/50'
                    }`}
                    data-testid={`nav-visa-${name.toLowerCase()}`}
                  >
                    <img src={`https://flagcdn.com/w24/${code.toLowerCase()}.png`} alt={name} className="w-6 h-4 object-cover rounded-sm" />
                    <span className="font-medium">{name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
      </div>
    </header>
  );
}
