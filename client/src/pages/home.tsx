import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
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
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [showEnglishOnly, setShowEnglishOnly] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);

  const { data: universities = [], isLoading, error } = useQuery({
    queryKey: ['universities'],
    queryFn: fetchUniversities,
  });

  const regions = useMemo(() => {
    return Array.from(new Set(universities.map(u => u.region))).sort();
  }, [universities]);

  const domains = useMemo(() => {
    return Array.from(new Set(universities.flatMap(u => u.domains))).sort();
  }, [universities]);

  const filteredUniversities = useMemo(() => {
    return universities.filter((u) => {
      const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           u.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           u.region.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = selectedRegion === 'all' || u.region === selectedRegion;
      const matchesType = selectedType === 'all' || u.type === selectedType;
      const matchesDomain = selectedDomain === 'all' || u.domains.includes(selectedDomain);
      const matchesEnglish = !showEnglishOnly || u.englishPrograms;

      return matchesSearch && matchesRegion && matchesType && matchesDomain && matchesEnglish;
    });
  }, [universities, searchQuery, selectedRegion, selectedType, selectedDomain, showEnglishOnly]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedRegion('all');
    setSelectedType('all');
    setSelectedDomain('all');
    setShowEnglishOnly(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main className="container mx-auto px-4 py-12 -mt-20 relative z-20">
        {/* Filters Panel */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 mb-10 backdrop-blur-md">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </div>
            
            <div className="flex flex-wrap gap-4 flex-1 justify-end">
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-[180px]" data-testid="select-region">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  {regions.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[160px]" data-testid="select-type">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Public">Public</SelectItem>
                  <SelectItem value="Private">Private</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                <SelectTrigger className="w-[180px]" data-testid="select-domain">
                  <SelectValue placeholder="Field of Study" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Fields</SelectItem>
                  {domains.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                </SelectContent>
              </Select>

              <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-md border border-slate-200 dark:border-slate-700">
                <Switch id="english-mode" checked={showEnglishOnly} onCheckedChange={setShowEnglishOnly} data-testid="switch-english" />
                <Label htmlFor="english-mode" className="text-sm font-medium cursor-pointer">English Taught</Label>
              </div>

              <Button variant="ghost" size="icon" onClick={clearFilters} title="Reset Filters" data-testid="button-reset-filters">
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="space-y-6">
          <div className="flex justify-between items-end px-2">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-heading tracking-tight">
              Accredited Universities
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence mode='popLayout'>
                {filteredUniversities.map((university) => (
                  <UniversityCard 
                    key={university.id} 
                    university={university} 
                    onSelect={setSelectedUniversity} 
                  />
                ))}
              </AnimatePresence>
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
          <p className="text-sm">
            Data sourced from official government registries: Ministry of Science, Innovation and Universities, CRUE, and verified partner networks.
          </p>
          <div className="flex justify-center gap-6 text-xs">
             <a href="https://www.ciencia.gob.es/en/Universidades.html" className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Ministry of Universities</a>
             <a href="https://www.crue.org/universidades/" className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">CRUE</a>
             <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
          <p className="text-xs pt-4 border-t border-slate-800 w-full max-w-md mx-auto">
            © 2025 UniSpain Directory. All rights reserved.
          </p>
        </div>
      </footer>

      <UniversityDetail 
        university={selectedUniversity} 
        isOpen={!!selectedUniversity} 
        onClose={() => setSelectedUniversity(null)} 
      />
    </div>
  );
}
