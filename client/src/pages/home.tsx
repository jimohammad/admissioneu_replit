import React, { useState, useMemo, useCallback, useDeferredValue, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useVirtualizer } from '@tanstack/react-virtual';
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
import { RotateCcw, SlidersHorizontal, Loader2, Trophy, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

type TableRow = 
  | { type: 'header'; country: string; count: number }
  | { type: 'university'; university: University; rowNumber: number };

const countryFlags: Record<string, string> = {
  'Czech Republic': '🇨🇿', 'Finland': '🇫🇮', 'France': '🇫🇷', 'Germany': '🇩🇪', 'Hungary': '🇭🇺', 
  'Italy': '🇮🇹', 'Netherlands': '🇳🇱', 'Poland': '🇵🇱', 'Portugal': '🇵🇹', 'Spain': '🇪🇸'
};

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
  const [selectedRanking, setSelectedRanking] = useState<string>('all');
  const [showEnglishOnly, setShowEnglishOnly] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [sortColumn, setSortColumn] = useState<'rank' | 'enrollment' | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const parentRef = useRef<HTMLDivElement>(null);
  
  const handleSelectUniversity = useCallback((university: University) => {
    setSelectedUniversity(university);
  }, []);
  
  const handleCloseDetail = useCallback(() => {
    setSelectedUniversity(null);
  }, []);

  const handleSort = useCallback((column: 'rank' | 'enrollment') => {
    if (sortColumn === column) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  }, [sortColumn]);

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
      
      let matchesRanking = true;
      if (selectedRanking !== 'all' && u.globalRank) {
        const rankLimit = parseInt(selectedRanking);
        matchesRanking = u.globalRank <= rankLimit;
      } else if (selectedRanking !== 'all') {
        matchesRanking = false;
      }

      return matchesSearch && matchesCountry && matchesRegion && matchesType && matchesDomain && matchesEnglish && matchesRanking;
    });
  }, [universities, deferredSearchQuery, selectedCountry, selectedRegion, selectedType, selectedDomain, showEnglishOnly, selectedRanking]);

  const tableRows = useMemo((): TableRow[] => {
    let sortedUniversities = [...filteredUniversities];
    
    if (sortColumn === 'rank') {
      sortedUniversities.sort((a, b) => {
        const aRank = a.globalRank || 9999;
        const bRank = b.globalRank || 9999;
        return sortDirection === 'asc' ? aRank - bRank : bRank - aRank;
      });
    } else if (sortColumn === 'enrollment') {
      sortedUniversities.sort((a, b) => {
        const aEnroll = a.totalEnrollment || 0;
        const bEnroll = b.totalEnrollment || 0;
        return sortDirection === 'asc' ? aEnroll - bEnroll : bEnroll - aEnroll;
      });
    } else {
      sortedUniversities.sort((a, b) => a.country.localeCompare(b.country));
    }

    const rows: TableRow[] = [];
    let lastCountry = '';
    let rowNumber = 0;

    for (const university of sortedUniversities) {
      if (sortColumn === null && university.country !== lastCountry) {
        const countryCount = sortedUniversities.filter(u => u.country === university.country).length;
        rows.push({ type: 'header', country: university.country, count: countryCount });
        lastCountry = university.country;
      }
      rowNumber++;
      rows.push({ type: 'university', university, rowNumber });
    }

    return rows;
  }, [filteredUniversities, sortColumn, sortDirection]);

  const rowVirtualizer = useVirtualizer({
    count: tableRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: (index) => tableRows[index]?.type === 'header' ? 40 : 56,
    overscan: 10,
  });

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCountry('all');
    setSelectedRegion('all');
    setSelectedType('all');
    setSelectedDomain('all');
    setSelectedRanking('all');
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
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide mb-2 flex items-center gap-1">
                  <Trophy className="w-3 h-3 text-amber-500" />
                  Ranking
                </label>
                <Select value={selectedRanking} onValueChange={setSelectedRanking}>
                  <SelectTrigger className="w-full h-10 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700" data-testid="select-ranking">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Rankings</SelectItem>
                    <SelectItem value="50">Top 50</SelectItem>
                    <SelectItem value="100">Top 100</SelectItem>
                    <SelectItem value="200">Top 200</SelectItem>
                    <SelectItem value="500">Top 500</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide mb-2">Region</label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger className="w-full h-10 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700" data-testid="select-region">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    {regions.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide mb-2">Type</label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full h-10 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700" data-testid="select-type">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Public">Public</SelectItem>
                    <SelectItem value="Private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide mb-2">Field</label>
                <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                  <SelectTrigger className="w-full h-10 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700" data-testid="select-domain">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Fields</SelectItem>
                    {domains.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide mb-2">Program Language</label>
                <div className="flex items-center justify-center h-10 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 px-3 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 transition">
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
              <div 
                ref={parentRef}
                className="overflow-auto"
                style={{ height: 'min(600px, calc(100vh - 400px))' }}
              >
                <table className="w-full min-w-[800px]" role="table">
                  <thead className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
                    <tr role="row">
                      <th role="columnheader" className="text-center px-2 py-3 text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider w-12">#</th>
                      <th role="columnheader" className="text-left px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">University</th>
                      <th 
                        role="columnheader"
                        className="text-center px-3 py-3 text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider w-16 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors select-none"
                        onClick={() => handleSort('rank')}
                        data-testid="header-rank-sort"
                      >
                        <div className="flex items-center justify-center gap-1">
                          Rank
                          {sortColumn === 'rank' ? (
                            sortDirection === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                          ) : (
                            <ArrowUpDown className="w-3 h-3 opacity-50" />
                          )}
                        </div>
                      </th>
                      <th role="columnheader" className="text-left px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Type</th>
                      <th 
                        role="columnheader"
                        className="text-center px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors select-none"
                        onClick={() => handleSort('enrollment')}
                        data-testid="header-enrollment-sort"
                      >
                        <div className="flex items-center justify-center gap-1">
                          Enrollment
                          {sortColumn === 'enrollment' ? (
                            sortDirection === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                          ) : (
                            <ArrowUpDown className="w-3 h-3 opacity-50" />
                          )}
                        </div>
                      </th>
                      <th role="columnheader" className="text-center px-3 py-3 text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Majors</th>
                      <th role="columnheader" className="text-left px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Fields</th>
                      <th role="columnheader" className="text-center px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">English</th>
                    </tr>
                  </thead>
                  <tbody
                    style={{
                      height: `${rowVirtualizer.getTotalSize()}px`,
                      display: 'block',
                      position: 'relative',
                    }}
                  >
                    {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                      const row = tableRows[virtualRow.index];
                      
                      if (row.type === 'header') {
                        return (
                          <tr
                            key={`header-${row.country}`}
                            role="row"
                            className="bg-slate-200 dark:bg-slate-700 table w-full table-fixed"
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              height: `${virtualRow.size}px`,
                              transform: `translateY(${virtualRow.start}px)`,
                            }}
                          >
                            <td colSpan={8} className="px-4 py-2" role="cell">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{countryFlags[row.country] || '🏛️'}</span>
                                <span className="font-semibold text-slate-800 dark:text-white">{row.country}</span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">({row.count} universities)</span>
                              </div>
                            </td>
                          </tr>
                        );
                      }

                      const university = row.university;
                      return (
                        <tr
                          key={university.id}
                          role="row"
                          className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors border-b border-slate-100 dark:border-slate-800 table w-full table-fixed"
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: `${virtualRow.size}px`,
                            transform: `translateY(${virtualRow.start}px)`,
                          }}
                          onClick={() => handleSelectUniversity(university)}
                          data-testid={`row-university-${university.id}`}
                        >
                          <td role="cell" className="px-2 py-3 text-center text-sm text-slate-500 dark:text-slate-400 w-12">{row.rowNumber}</td>
                          <td role="cell" className="px-4 py-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-slate-900 dark:text-white text-sm" data-testid={`text-name-${university.id}`}>{university.name}</span>
                                {university.globalRank && (
                                  <span className="sm:hidden inline-flex items-center justify-center px-1.5 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded text-xs font-semibold">
                                    #{university.globalRank}
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-slate-500 dark:text-slate-400">{university.city}</div>
                            </div>
                          </td>
                          <td role="cell" className="px-3 py-3 text-center w-16">
                            {university.globalRank ? (
                              <span className="inline-flex items-center justify-center px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-xs font-semibold" data-testid={`badge-rank-${university.id}`}>
                                #{university.globalRank}
                              </span>
                            ) : (
                              <span className="text-slate-300 dark:text-slate-600">—</span>
                            )}
                          </td>
                          <td role="cell" className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${university.type === 'Public' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'}`} data-testid={`badge-type-${university.id}`}>
                              {university.type}
                            </span>
                          </td>
                          <td role="cell" className="px-4 py-3 text-center">
                            {university.totalEnrollment ? (
                              <span className="text-sm text-slate-700 dark:text-slate-300" data-testid={`text-enrollment-${university.id}`}>
                                {university.totalEnrollment.toLocaleString()}
                              </span>
                            ) : (
                              <span className="text-slate-300 dark:text-slate-600">—</span>
                            )}
                          </td>
                          <td role="cell" className="px-3 py-3 text-center">
                            {university.numberOfPrograms ? (
                              <span className="text-sm text-slate-700 dark:text-slate-300" data-testid={`text-majors-${university.id}`}>
                                {university.numberOfPrograms}
                              </span>
                            ) : (
                              <span className="text-slate-300 dark:text-slate-600">—</span>
                            )}
                          </td>
                          <td role="cell" className="px-4 py-3">
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
                          <td role="cell" className="px-4 py-3 text-center">
                            {university.englishPrograms ? (
                              <span className="inline-flex items-center justify-center w-6 h-6 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full text-xs" data-testid={`badge-english-${university.id}`}>✓</span>
                            ) : (
                              <span className="text-slate-300 dark:text-slate-600">—</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
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
            © 2025 AdmissionEU. All rights reserved.
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
