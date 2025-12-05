import { useLocation, useSearch } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { GraduationCap, Globe, ChevronRight } from 'lucide-react';
import { fetchUniversities } from '@/lib/api';
import { useRef, useState, useEffect } from 'react';

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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showRightIndicator, setShowRightIndicator] = useState(true);
  const [showLeftIndicator, setShowLeftIndicator] = useState(false);
  
  const { data: universities = [] } = useQuery({
    queryKey: ['universities'],
    queryFn: fetchUniversities,
  });
  
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    setLocation(path);
  };
  
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftIndicator(scrollLeft > 10);
      setShowRightIndicator(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };
  
  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      return () => {
        el.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);
  
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
        <nav className="border-t border-slate-800 relative">
          {/* Left fade indicator */}
          {showLeftIndicator && (
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none md:hidden" />
          )}
          
          {/* Right fade indicator with arrow */}
          {showRightIndicator && (
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-slate-900 via-slate-900/80 to-transparent z-10 pointer-events-none md:hidden flex items-center justify-end pr-1">
              <ChevronRight className="w-5 h-5 text-blue-400 animate-pulse" />
            </div>
          )}
          
          <div 
            ref={scrollRef}
            className="flex items-center overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
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
