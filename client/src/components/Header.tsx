import { useLocation } from 'wouter';
import { GraduationCap, Globe } from 'lucide-react';

const countries = [
  { name: 'Germany', flag: '🇩🇪' },
  { name: 'Hungary', flag: '🇭🇺' },
  { name: 'Italy', flag: '🇮🇹' },
  { name: 'Netherlands', flag: '🇳🇱' },
  { name: 'Poland', flag: '🇵🇱' },
  { name: 'Spain', flag: '🇪🇸' },
];

export function Header() {
  const [location, setLocation] = useLocation();
  
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    setLocation(path);
  };
  
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
            <span>6 Countries • 591 Universities</span>
          </div>
        </div>
        
        {/* Country navigation bar */}
        <nav className="border-t border-slate-800">
          <div className="flex overflow-x-auto scrollbar-hide">
            <a 
              href="/"
              onClick={(e) => handleNavClick(e, '/')}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors no-underline border-b-2 ${
                location === '/' 
                  ? 'text-white border-blue-400 bg-slate-800/50' 
                  : 'text-slate-400 border-transparent hover:text-white hover:bg-slate-800/30'
              }`}
              data-testid="nav-home"
            >
              🌍 All
            </a>
            {countries.map(({ name, flag }) => (
              <a 
                key={name} 
                href={`/insights/${name}`}
                onClick={(e) => handleNavClick(e, `/insights/${name}`)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors no-underline border-b-2 ${
                  location === `/insights/${name}` 
                    ? 'text-white border-amber-400 bg-slate-800/50' 
                    : 'text-slate-400 border-transparent hover:text-white hover:bg-slate-800/30'
                }`}
                data-testid={`nav-${name.toLowerCase()}`}
              >
                <span>{flag}</span>
                <span>{name}</span>
              </a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
