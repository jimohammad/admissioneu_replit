import { useState, useMemo, useCallback, useDeferredValue, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearch, useLocation } from 'wouter';
import { Hero } from '@/components/Hero';
import { UniversityCard } from '@/components/UniversityCard';
import { UniversityDetail } from '@/components/UniversityDetail';
import { fetchUniversities } from '@/lib/api';
import { University } from '@shared/schema';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RotateCcw, SlidersHorizontal, Loader2 } from 'lucide-react';

export default function Home() {
  const searchParams = useSearch();
  const [, setLocation] = useLocation();
  const urlCountry = new URLSearchParams(searchParams).get('country') || 'all';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>(urlCountry);
  
  useEffect(() => {
    setSelectedCountry(urlCountry);
  }, [urlCountry]);
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [showEnglishOnly, setShowEnglishOnly] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  
  const deferredSearchQuery = useDeferredValue(searchQuery);
  
  const handleSelectUniversity = useCallback((university: University) => {
    setSelectedUniversity(university);
  }, []);
  
  const handleCloseDetail = useCallback(() => {
    setSelectedUniversity(null);
  }, []);

  const { data: universities = [], isLoading, error } = useQuery({
    queryKey: ['universities'],
    queryFn: fetchUniversities,
  });

  const countries = useMemo(() => {
    return Array.from(new Set(universities.map(u => u.country))).sort();
  }, [universities]);

  const countryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    universities.forEach(u => {
      counts[u.country] = (counts[u.country] || 0) + 1;
    });
    return counts;
  }, [universities]);

  const regions = useMemo(() => {
    const filteredByCountry = selectedCountry === 'all' 
      ? universities 
      : universities.filter(u => u.country === selectedCountry);
    return Array.from(new Set(filteredByCountry.map(u => u.region))).sort();
  }, [universities, selectedCountry]);

  const domains = useMemo(() => {
    return Array.from(new Set(universities.flatMap(u => u.domains))).sort();
  }, [universities]);

  const filteredUniversities = useMemo(() => {
    const searchLower = deferredSearchQuery.toLowerCase();
    return universities.filter((u) => {
      const matchesSearch = !searchLower || 
                           u.name.toLowerCase().includes(searchLower) || 
                           u.city.toLowerCase().includes(searchLower) ||
                           u.region.toLowerCase().includes(searchLower) ||
                           u.country.toLowerCase().includes(searchLower);
      const matchesCountry = selectedCountry === 'all' || u.country === selectedCountry;
      const matchesRegion = selectedRegion === 'all' || u.region === selectedRegion;
      const matchesType = selectedType === 'all' || u.type === selectedType;
      const matchesDomain = selectedDomain === 'all' || u.domains.includes(selectedDomain);
      const matchesEnglish = !showEnglishOnly || u.englishPrograms;

      return matchesSearch && matchesCountry && matchesRegion && matchesType && matchesDomain && matchesEnglish;
    });
  }, [universities, deferredSearchQuery, selectedCountry, selectedRegion, selectedType, selectedDomain, showEnglishOnly]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCountry('all');
    setSelectedRegion('all');
    setSelectedType('all');
    setSelectedDomain('all');
    setShowEnglishOnly(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      <Hero 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
      />

      <main className="container mx-auto px-4 py-12 -mt-20 relative z-20">
        {/* Filters Panel */}
        <div className="bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-700 rounded-xl shadow-xl border border-slate-200 dark:border-slate-600 p-8 mb-10 backdrop-blur-md">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-500/20 rounded-lg">
                  <SlidersHorizontal className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white text-lg">Find Universities</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Refine your search with advanced filters</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters} 
                title="Reset Filters" 
                data-testid="button-reset-filters"
                className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700/50"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Clear
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide mb-2 block">Region</label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger className="w-full bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700" data-testid="select-region">
                    <SelectValue placeholder="All Regions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    {regions.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide mb-2 block">Type</label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700" data-testid="select-type">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Public">Public</SelectItem>
                    <SelectItem value="Private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide mb-2 block">Field</label>
                <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                  <SelectTrigger className="w-full bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700" data-testid="select-domain">
                    <SelectValue placeholder="All Fields" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Fields</SelectItem>
                    {domains.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide mb-2 block">Program</label>
                <div className="flex items-center h-10 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 px-3 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 transition">
                  <Switch id="english-mode" checked={showEnglishOnly} onCheckedChange={setShowEnglishOnly} data-testid="switch-english" className="scale-90" />
                  <Label htmlFor="english-mode" className="text-sm font-medium cursor-pointer text-slate-700 dark:text-slate-200 ml-2">English</Label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="space-y-6">
          <div className="flex justify-between items-end px-2">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-heading tracking-tight">
              {selectedCountry === 'all' ? 'Accredited Universities/All' : `Accredited Universities in ${selectedCountry}`}
            </h2>
            {!isLoading && (
              <Badge variant="secondary" className="text-sm px-3 py-1" data-testid="text-results-count">
                {filteredUniversities.length} Results Found
              </Badge>
            )}
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
              <p className="text-slate-600 dark:text-slate-400">Loading universities...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-xl border border-red-200 dark:border-red-900">
              <h3 className="text-xl font-semibold text-red-600 dark:text-red-400">Error loading data</h3>
              <p className="text-slate-500 mt-2">Please try again later.</p>
            </div>
          ) : filteredUniversities.length > 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                    <tr>
                      <th className="text-center px-2 py-3 text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider w-12">#</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">University</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider hidden md:table-cell">Type</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider hidden sm:table-cell">Location</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider hidden lg:table-cell">Fields</th>
                      <th className="text-center px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider hidden md:table-cell">English</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {(() => {
                      const sortedUniversities = [...filteredUniversities].sort((a, b) => a.country.localeCompare(b.country));
                      const countryFlags: Record<string, string> = {
                        'France': '🇫🇷', 'Germany': '🇩🇪', 'Hungary': '🇭🇺', 
                        'Italy': '🇮🇹', 'Netherlands': '🇳🇱', 'Poland': '🇵🇱', 'Spain': '🇪🇸'
                      };
                      let lastCountry = '';
                      let rowNumber = 0;
                      return sortedUniversities.map((university) => {
                        const showCountryHeader = university.country !== lastCountry;
                        lastCountry = university.country;
                        rowNumber++;
                        const countryCount = sortedUniversities.filter(u => u.country === university.country).length;
                        return (
                          <>
                            {showCountryHeader && (
                              <tr key={`country-${university.country}`} className="bg-slate-200 dark:bg-slate-700">
                                <td colSpan={6} className="px-4 py-2">
                                  <div className="flex items-center gap-2">
                                    <span className="text-lg">{countryFlags[university.country] || '🏛️'}</span>
                                    <span className="font-semibold text-slate-800 dark:text-white">{university.country}</span>
                                    <span className="text-xs text-slate-500 dark:text-slate-400">({countryCount} universities)</span>
                                  </div>
                                </td>
                              </tr>
                            )}
                            <tr 
                              key={university.id} 
                              className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                              onClick={() => handleSelectUniversity(university)}
                              data-testid={`row-university-${university.id}`}
                            >
                              <td className="px-2 py-3 text-center text-sm text-slate-500 dark:text-slate-400">{rowNumber}</td>
                              <td className="px-4 py-3">
                                <div>
                                  <div className="font-medium text-slate-900 dark:text-white text-sm" data-testid={`text-name-${university.id}`}>{university.name}</div>
                                  <div className="text-xs text-slate-500 dark:text-slate-400 sm:hidden">{university.city}</div>
                                </div>
                              </td>
                              <td className="px-4 py-3 hidden md:table-cell">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${university.type === 'Public' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'}`} data-testid={`badge-type-${university.id}`}>
                                  {university.type}
                                </span>
                              </td>
                              <td className="px-4 py-3 hidden sm:table-cell">
                                <div className="text-sm text-slate-700 dark:text-slate-300" data-testid={`text-location-${university.id}`}>{university.city}</div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">{university.region}</div>
                              </td>
                              <td className="px-4 py-3 hidden lg:table-cell">
                                <div className="flex flex-wrap gap-1">
                                  {university.domains.slice(0, 2).map((domain) => (
                                    <span key={domain} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded text-xs">
                                      {domain}
                                    </span>
                                  ))}
                                  {university.domains.length > 2 && (
                                    <span className="px-2 py-0.5 text-slate-500 dark:text-slate-400 text-xs">+{university.domains.length - 2}</span>
                                  )}
                                </div>
                              </td>
                              <td className="px-4 py-3 text-center hidden md:table-cell">
                                {university.englishPrograms ? (
                                  <span className="inline-flex items-center justify-center w-6 h-6 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full text-xs" data-testid={`badge-english-${university.id}`}>✓</span>
                                ) : (
                                  <span className="text-slate-300 dark:text-slate-600">—</span>
                                )}
                              </td>
                            </tr>
                          </>
                        );
                      });
                    })()}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
              <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-400">No universities found</h3>
              <p className="text-slate-500 mt-2">Try adjusting your filters or search query.</p>
              <Button variant="link" onClick={clearFilters} className="mt-4 text-primary" data-testid="button-clear-filters">Clear all filters</Button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 mt-20 border-t border-slate-800">
        <div className="container mx-auto px-4 text-center space-y-4">
          <p className="text-sm max-w-2xl mx-auto">
            An <a href="https://iqbal.app" className="text-white hover:text-emerald-400 transition-colors font-medium" target="_blank" rel="noopener noreferrer">Iqbal.app</a> initiative, powered by intelligent systems to deliver precision-driven insights and next-generation information clarity.
          </p>
          <div className="flex justify-center gap-6 text-xs">
             <a href="https://www.ciencia.gob.es/en/Universidades.html" className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Spain: Ministry of Universities</a>
             <a href="https://www.hrk.de/member-universities/" className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Germany: HRK</a>
             <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
          <p className="text-xs pt-4 border-t border-slate-800 w-full max-w-lg mx-auto">
            © 2025 EuroUni. All rights reserved.
          </p>
        </div>
      </footer>

      <UniversityDetail 
        university={selectedUniversity} 
        isOpen={!!selectedUniversity} 
        onClose={handleCloseDetail} 
      />
    </div>
  );
}
