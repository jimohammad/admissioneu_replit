import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  ArrowLeft,
  Trophy,
  Medal,
  Award,
  Crown,
  Star,
  Building2,
  MapPin,
  ExternalLink,
  TrendingUp,
  Globe,
  GraduationCap
} from 'lucide-react';
import type { University } from '@shared/schema';

const countryFlags: Record<string, string> = {
  'France': '🇫🇷',
  'Germany': '🇩🇪',
  'Hungary': '🇭🇺',
  'Italy': '🇮🇹',
  'Netherlands': '🇳🇱',
  'Poland': '🇵🇱',
  'Spain': '🇪🇸',
};

const rankingSystemInfo = {
  qs: {
    name: 'QS World Rankings',
    fullName: 'Quacquarelli Symonds World University Rankings',
    description: 'Evaluates universities based on academic reputation, employer reputation, faculty/student ratio, citations per faculty, and international diversity.',
    criteria: ['Academic Reputation (30%)', 'Employer Reputation (15%)', 'Faculty/Student Ratio (10%)', 'Citations per Faculty (20%)', 'International Faculty (5%)', 'International Students (5%)'],
    color: 'bg-blue-500',
    icon: Trophy,
  },
  the: {
    name: 'THE World Rankings',
    fullName: 'Times Higher Education World University Rankings',
    description: 'Ranks universities across teaching, research, citations, industry income, and international outlook.',
    criteria: ['Teaching (30%)', 'Research Environment (30%)', 'Research Quality (30%)', 'Industry (4%)', 'International Outlook (7.5%)'],
    color: 'bg-purple-500',
    icon: Medal,
  },
  arwu: {
    name: 'ARWU (Shanghai)',
    fullName: 'Academic Ranking of World Universities',
    description: 'Focuses on research output including Nobel laureates, highly cited researchers, and publications in top journals.',
    criteria: ['Nobel & Fields Medal Alumni (10%)', 'Nobel & Fields Medal Staff (20%)', 'Highly Cited Researchers (20%)', 'Papers in Nature/Science (20%)', 'Papers Indexed (20%)', 'Per Capita Performance (10%)'],
    color: 'bg-amber-500',
    icon: Award,
  },
};

function getRankBadge(rank: number) {
  if (rank <= 10) return { label: 'Top 10', color: 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white', icon: Crown };
  if (rank <= 50) return { label: 'Top 50', color: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white', icon: Trophy };
  if (rank <= 100) return { label: 'Top 100', color: 'bg-gradient-to-r from-emerald-500 to-green-600 text-white', icon: Medal };
  if (rank <= 200) return { label: 'Top 200', color: 'bg-gradient-to-r from-purple-500 to-purple-600 text-white', icon: Award };
  if (rank <= 500) return { label: 'Top 500', color: 'bg-slate-600 text-white', icon: Star };
  return { label: `#${rank}`, color: 'bg-slate-500 text-white', icon: Star };
}

export default function Rankings() {
  const [, setLocation] = useLocation();
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedSystem, setSelectedSystem] = useState<'qs' | 'the' | 'arwu'>('qs');

  const { data: universities = [], isLoading } = useQuery<University[]>({
    queryKey: ['/api/universities'],
    queryFn: async () => {
      const res = await fetch('/api/universities');
      if (!res.ok) throw new Error('Failed to fetch universities');
      return res.json();
    },
  });

  const rankedUniversities = useMemo(() => {
    return universities
      .filter(u => u.globalRank && u.globalRank > 0)
      .filter(u => selectedCountry === 'all' || u.country === selectedCountry)
      .sort((a, b) => (a.globalRank || 999) - (b.globalRank || 999));
  }, [universities, selectedCountry]);

  const countryStats = useMemo(() => {
    const stats: Record<string, { total: number; top50: number; top100: number; top200: number }> = {};
    universities
      .filter(u => u.globalRank && u.globalRank > 0)
      .forEach(u => {
        if (!stats[u.country]) {
          stats[u.country] = { total: 0, top50: 0, top100: 0, top200: 0 };
        }
        stats[u.country].total++;
        if (u.globalRank! <= 50) stats[u.country].top50++;
        if (u.globalRank! <= 100) stats[u.country].top100++;
        if (u.globalRank! <= 200) stats[u.country].top200++;
      });
    return stats;
  }, [universities]);

  const systemInfo = rankingSystemInfo[selectedSystem];
  const SystemIcon = systemInfo.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button 
            variant="ghost" 
            className="gap-2 cursor-pointer" 
            onClick={() => setLocation('/')}
            data-testid="button-back-home"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Universities
          </Button>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span className="font-heading font-semibold">World Rankings</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold font-heading mb-3">University World Rankings</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore top-ranked European universities across major global ranking systems
          </p>
        </div>

        {/* Ranking System Tabs */}
        <Tabs value={selectedSystem} onValueChange={(v) => setSelectedSystem(v as 'qs' | 'the' | 'arwu')} className="mb-8">
          <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto">
            <TabsTrigger value="qs" className="gap-2" data-testid="tab-qs">
              <Trophy className="w-4 h-4" />
              QS
            </TabsTrigger>
            <TabsTrigger value="the" className="gap-2" data-testid="tab-the">
              <Medal className="w-4 h-4" />
              THE
            </TabsTrigger>
            <TabsTrigger value="arwu" className="gap-2" data-testid="tab-arwu">
              <Award className="w-4 h-4" />
              ARWU
            </TabsTrigger>
          </TabsList>

          {/* System Info Card */}
          <Card className="mt-6 mb-8">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${systemInfo.color}`}>
                  <SystemIcon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{systemInfo.fullName}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{systemInfo.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {systemInfo.criteria.map((criterion, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {criterion}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Tabs>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Country Filter Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Filter by Country
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant={selectedCountry === 'all' ? 'default' : 'ghost'}
                  className="w-full justify-start gap-2"
                  onClick={() => setSelectedCountry('all')}
                  data-testid="filter-all"
                >
                  <span>🇪🇺</span>
                  All Countries
                  <Badge variant="secondary" className="ml-auto">
                    {rankedUniversities.length}
                  </Badge>
                </Button>
                {Object.keys(countryFlags).map(country => {
                  const stats = countryStats[country];
                  if (!stats) return null;
                  return (
                    <Button
                      key={country}
                      variant={selectedCountry === country ? 'default' : 'ghost'}
                      className="w-full justify-start gap-2"
                      onClick={() => setSelectedCountry(country)}
                      data-testid={`filter-${country.toLowerCase()}`}
                    >
                      <span>{countryFlags[country]}</span>
                      {country}
                      <Badge variant="secondary" className="ml-auto">
                        {stats.total}
                      </Badge>
                    </Button>
                  );
                })}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Ranked</span>
                  <span className="font-semibold">{rankedUniversities.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Top 50</span>
                  <span className="font-semibold text-blue-600">
                    {rankedUniversities.filter(u => u.globalRank! <= 50).length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Top 100</span>
                  <span className="font-semibold text-emerald-600">
                    {rankedUniversities.filter(u => u.globalRank! <= 100).length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Top 200</span>
                  <span className="font-semibold text-purple-600">
                    {rankedUniversities.filter(u => u.globalRank! <= 200).length}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Rankings List */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <Card className="h-[400px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-lg font-medium">Loading rankings...</p>
                </div>
              </Card>
            ) : rankedUniversities.length === 0 ? (
              <Card className="h-[400px] flex items-center justify-center">
                <div className="text-center text-muted-foreground p-8">
                  <GraduationCap className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p className="text-xl font-medium mb-2">No ranked universities found</p>
                  <p className="text-sm">Try selecting a different country or ranking system.</p>
                </div>
              </Card>
            ) : (
              <ScrollArea className="h-[700px]">
                <div className="space-y-3 pr-4">
                  {rankedUniversities.map((university, index) => {
                    const rankBadge = getRankBadge(university.globalRank!);
                    const RankIcon = rankBadge.icon;
                    
                    return (
                      <Card 
                        key={university.id}
                        className="hover:shadow-md transition-shadow"
                        data-testid={`card-ranking-${university.id}`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            {/* Rank Number */}
                            <div className="flex-shrink-0 w-16 text-center">
                              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${rankBadge.color} font-bold text-lg`}>
                                {university.globalRank}
                              </div>
                            </div>

                            {/* University Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start gap-2">
                                <span className="text-xl flex-shrink-0">{countryFlags[university.country] || '🏛️'}</span>
                                <div className="min-w-0">
                                  <h3 className="font-semibold text-base leading-tight truncate">{university.name}</h3>
                                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                                    <MapPin className="w-3 h-3 flex-shrink-0" />
                                    <span className="truncate">{university.city}, {university.country}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex flex-wrap gap-2 mt-2">
                                <Badge variant={university.type === 'Public' ? 'default' : 'secondary'} className="text-xs">
                                  <Building2 className="w-3 h-3 mr-1" />
                                  {university.type}
                                </Badge>
                                <Badge variant="outline" className={`text-xs ${rankBadge.color} border-0`}>
                                  <RankIcon className="w-3 h-3 mr-1" />
                                  {rankBadge.label}
                                </Badge>
                                {university.englishPrograms && (
                                  <Badge variant="outline" className="text-xs border-emerald-500 text-emerald-600">
                                    English Programs
                                  </Badge>
                                )}
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex-shrink-0">
                              <Button variant="outline" size="sm" asChild>
                                <a href={university.website} target="_blank" rel="noopener noreferrer">
                                  Visit
                                  <ExternalLink className="w-3 h-3 ml-1" />
                                </a>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </ScrollArea>
            )}
          </div>
        </div>

        {/* Methodology Note */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">About University Rankings</h3>
            <p className="text-sm text-muted-foreground">
              Rankings are based on composite global university rankings from QS World University Rankings, 
              Times Higher Education (THE), and Academic Ranking of World Universities (ARWU/Shanghai). 
              Each system uses different methodologies focusing on research output, academic reputation, 
              teaching quality, and employer perception. We recommend considering multiple factors beyond 
              rankings when choosing a university, including program quality, location, and personal fit.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
