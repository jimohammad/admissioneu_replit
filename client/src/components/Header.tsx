import { useLocation, useSearch } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { GraduationCap, Globe } from 'lucide-react';
import { fetchUniversities } from '@/lib/api';

const countries = [
  { name: 'Austria', flag: '🇦🇹', code: 'AT' },
  { name: 'Czech Republic', flag: '🇨🇿', code: 'CZ' },
  { name: 'Finland', flag: '🇫🇮', code: 'FI' },
  { name: 'France', flag: '🇫🇷', code: 'FR' },
  { name: 'Germany', flag: '🇩🇪', code: 'DE' },
  { name: 'Hungary', flag: '🇭🇺', code: 'HU' },
  { name: 'Italy', flag: '🇮🇹', code: 'IT' },
  { name: 'Netherlands', flag: '🇳🇱', code: 'NL' },
  { name: 'Poland', flag: '🇵🇱', code: 'PL' },
  { name: 'Portugal', flag: '🇵🇹', code: 'PT' },
  { name: 'Spain', flag: '🇪🇸', code: 'ES' },
  { name: 'Sweden', flag: '🇸🇪', code: 'SE' },
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
        <div className="flex items-center justify-between px-4 py-5">
          <a 
            href="/" 
            onClick={(e) => handleNavClick(e, '/')}
            className="flex items-center gap-3 text-white hover:text-blue-400 transition-colors no-underline"
          >
            <GraduationCap className="w-10 h-10 text-amber-400" />
            <span className="font-bold text-2xl tracking-tight">AdmissionEU</span>
          </a>
          
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <Globe className="w-4 h-4" />
            <span>12 Countries • {universities.length} Universities</span>
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
              <span>Home</span>
            </a>
            
            {countries.map(({ name, code }) => (
              <div key={name} className="flex items-center self-stretch">
                <div className="w-px bg-slate-700 self-stretch"></div>
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
          </div>
        </nav>
      </div>
    </header>
  );
}
