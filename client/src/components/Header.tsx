import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'wouter';
import { GraduationCap, Globe, ChevronDown, Briefcase } from 'lucide-react';

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    setLocation(path);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
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
        
        {/* Main navigation bar */}
        <nav className="border-t border-slate-800">
          <div className="flex items-center overflow-x-auto scrollbar-hide">
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
              🌍 Universities
            </a>
            
            {/* Visa & Jobs Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                  location.startsWith('/insights') 
                    ? 'text-white border-amber-400 bg-slate-800/50' 
                    : 'text-slate-400 border-transparent hover:text-white hover:bg-slate-800/30'
                }`}
                data-testid="nav-visa-jobs"
              >
                <Briefcase className="w-4 h-4" />
                Visa & Jobs
                <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-xl min-w-[180px] py-1 z-50">
                  {countries.map(({ name, flag }) => (
                    <a 
                      key={name} 
                      href={`/insights/${name}`}
                      onClick={(e) => handleNavClick(e, `/insights/${name}`)}
                      className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors no-underline ${
                        location === `/insights/${name}` 
                          ? 'text-amber-400 bg-slate-700/50' 
                          : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                      }`}
                      data-testid={`nav-visa-${name.toLowerCase()}`}
                    >
                      <span className="text-lg">{flag}</span>
                      <span>{name}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
            
            <a 
              href="/budget-finder"
              onClick={(e) => handleNavClick(e, '/budget-finder')}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors no-underline border-b-2 ${
                location === '/budget-finder' 
                  ? 'text-white border-blue-400 bg-slate-800/50' 
                  : 'text-slate-400 border-transparent hover:text-white hover:bg-slate-800/30'
              }`}
              data-testid="nav-budget"
            >
              💰 Budget Finder
            </a>
            
            <a 
              href="/calculator"
              onClick={(e) => handleNavClick(e, '/calculator')}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors no-underline border-b-2 ${
                location === '/calculator' 
                  ? 'text-white border-blue-400 bg-slate-800/50' 
                  : 'text-slate-400 border-transparent hover:text-white hover:bg-slate-800/30'
              }`}
              data-testid="nav-calculator"
            >
              🧮 Calculator
            </a>
            
            <a 
              href="/resources"
              onClick={(e) => handleNavClick(e, '/resources')}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors no-underline border-b-2 ${
                location === '/resources' 
                  ? 'text-white border-blue-400 bg-slate-800/50' 
                  : 'text-slate-400 border-transparent hover:text-white hover:bg-slate-800/30'
              }`}
              data-testid="nav-resources"
            >
              📚 Resources
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
