import { useLocation, useSearch } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { GraduationCap, Globe, Menu, X } from 'lucide-react';
import { fetchUniversities } from '@/lib/api';
import { useState } from 'react';

const countries = [
  { name: 'Austria', code: 'AT' },
  { name: 'Czech Republic', code: 'CZ' },
  { name: 'Finland', code: 'FI' },
  { name: 'France', code: 'FR' },
  { name: 'Germany', code: 'DE' },
  { name: 'Hungary', code: 'HU' },
  { name: 'Italy', code: 'IT' },
  { name: 'Netherlands', code: 'NL' },
  { name: 'Poland', code: 'PL' },
  { name: 'Portugal', code: 'PT' },
  { name: 'Spain', code: 'ES' },
  { name: 'Sweden', code: 'SE' },
];

export function Header() {
  const [location, setLocation] = useLocation();
  const searchParams = useSearch();
  const urlCountry = new URLSearchParams(searchParams).get('country');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { data: universities = [] } = useQuery({
    queryKey: ['universities'],
    queryFn: fetchUniversities,
  });
  
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    setLocation(path);
    setMobileMenuOpen(false);
  };
  
  const isHome = location === '/' && !urlCountry;

  return (
    <header className="bg-slate-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a 
            href="/" 
            onClick={(e) => handleNavClick(e, '/')}
            className="flex items-center gap-2.5 text-white hover:text-blue-400 transition-colors no-underline"
          >
            <GraduationCap className="w-8 h-8 text-amber-500" />
            <span className="font-bold text-xl tracking-tight">AdmissionEU</span>
          </a>
          
          <div className="hidden md:flex items-center gap-1 text-xs text-slate-400">
            <Globe className="w-4 h-4" />
            <span>12 Countries • {universities.length} Universities</span>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <nav className="border-t border-slate-800 bg-slate-900/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="hidden md:flex items-center gap-1 py-2 overflow-x-auto">
            <a 
              href="/"
              onClick={(e) => handleNavClick(e, '/')}
              className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 no-underline ${
                isHome 
                  ? 'bg-blue-500 text-white' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
              data-testid="nav-home"
            >
              <img src="https://flagcdn.com/w20/eu.png" alt="EU" className="w-4 h-3 object-cover rounded-sm" loading="lazy" />
              <span>All</span>
            </a>
            
            {countries.map(({ name, code }) => (
              <a 
                key={name}
                href={`/?country=${name}`}
                onClick={(e) => handleNavClick(e, `/?country=${name}`)}
                className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 no-underline ${
                  urlCountry === name 
                    ? 'bg-blue-500 text-white' 
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
                data-testid={`nav-${name.toLowerCase().replace(' ', '-')}`}
              >
                <img 
                  src={`https://flagcdn.com/w20/${code.toLowerCase()}.png`} 
                  alt={name} 
                  className="w-4 h-3 object-cover rounded-sm" 
                  loading="lazy"
                />
                <span>{name === 'Czech Republic' ? 'Czechia' : name}</span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-50 bg-slate-900/98 backdrop-blur-md overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" />
                12 Countries • {universities.length} Universities
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <a
                href="/"
                onClick={(e) => handleNavClick(e, '/')}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 no-underline ${
                  isHome
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
                data-testid="mobile-nav-home"
              >
                <img src="https://flagcdn.com/w40/eu.png" alt="EU" className="w-8 h-6 object-cover rounded" />
                <div>
                  <span className="font-medium block text-sm">All Countries</span>
                  <span className="text-xs opacity-70">{universities.length} unis</span>
                </div>
              </a>
              
              {countries.map(({ name, code }) => {
                const countryUnis = universities.filter(u => u.country === name).length;
                return (
                  <a
                    key={name}
                    href={`/?country=${name}`}
                    onClick={(e) => handleNavClick(e, `/?country=${name}`)}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 no-underline ${
                      urlCountry === name
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                    data-testid={`mobile-nav-${name.toLowerCase().replace(' ', '-')}`}
                  >
                    <img 
                      src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`} 
                      alt={name} 
                      className="w-8 h-6 object-cover rounded" 
                    />
                    <div>
                      <span className="font-medium block text-sm">{name === 'Czech Republic' ? 'Czechia' : name}</span>
                      <span className="text-xs opacity-70">{countryUnis} unis</span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
