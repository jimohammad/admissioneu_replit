import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  ArrowLeft,
  Plane,
  Briefcase,
  FileText,
  Clock,
  Euro,
  Building2,
  GraduationCap,
  Globe2,
  Heart,
  Languages,
  ExternalLink,
  TrendingUp,
  Users,
  Timer,
  Shield,
  Home,
  Wallet
} from 'lucide-react';
import type { CountryProfile } from '@shared/schema';

const countryFlags: Record<string, string> = {
  'Spain': '🇪🇸',
  'Germany': '🇩🇪',
  'Hungary': '🇭🇺',
  'Italy': '🇮🇹',
  'Poland': '🇵🇱',
};

const countryColors: Record<string, string> = {
  'Spain': 'from-red-500 to-yellow-500',
  'Germany': 'from-gray-900 to-red-600',
  'Hungary': 'from-red-600 to-green-600',
  'Italy': 'from-green-600 to-red-500',
  'Poland': 'from-red-500 to-white',
};

export default function CountryInsights() {
  const params = useParams();
  const country = params.country;

  const { data: profile, isLoading, error } = useQuery<CountryProfile>({
    queryKey: ['/api/country-insights', country],
    queryFn: async () => {
      const res = await fetch(`/api/country-insights/${country}`);
      if (!res.ok) throw new Error('Failed to fetch country profile');
      return res.json();
    },
    enabled: !!country,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Loading country insights...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-lg text-muted-foreground mb-4">Country profile not found</p>
            <Link href="/">
              <Button>Back to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" className="gap-2" data-testid="button-back-home">
              <ArrowLeft className="w-4 h-4" />
              Back to Universities
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{countryFlags[profile.country]}</span>
            <span className="font-heading font-semibold">{profile.country} Insights</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Hero Section */}
        <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-r ${countryColors[profile.country] || 'from-blue-500 to-purple-500'} p-8 mb-8`}>
          <div className="relative z-10 text-white">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-6xl">{countryFlags[profile.country]}</span>
              <div>
                <h1 className="text-4xl font-bold font-heading">{profile.country}</h1>
                <p className="text-lg opacity-90">Immigration & Job Market Guide</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <div className="text-sm opacity-80">Official Language</div>
                <div className="font-semibold">{profile.officialLanguage}</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <div className="text-sm opacity-80">Currency</div>
                <div className="font-semibold">{profile.currency}</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <div className="text-sm opacity-80">Employment Rate</div>
                <div className="font-semibold">{profile.graduateEmploymentRate}</div>
              </div>
            </div>
          </div>
          <div className="absolute right-0 top-0 w-1/3 h-full opacity-10">
            <div className="w-full h-full bg-white rounded-l-full transform translate-x-1/2"></div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="immigration" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 h-12">
            <TabsTrigger value="immigration" className="text-base gap-2" data-testid="tab-immigration">
              <Plane className="w-4 h-4" />
              Immigration
            </TabsTrigger>
            <TabsTrigger value="jobs" className="text-base gap-2" data-testid="tab-jobs">
              <Briefcase className="w-4 h-4" />
              Job Market
            </TabsTrigger>
          </TabsList>

          {/* Immigration Tab */}
          <TabsContent value="immigration">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Visa Overview */}
              <Card data-testid="card-visa-overview">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Visa Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Visa Type</div>
                      <div className="font-medium">{profile.visaType}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Processing Time</div>
                      <div className="font-medium">{profile.visaProcessingTime}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                      <Euro className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Application Cost</div>
                      <div className="font-medium">{profile.visaCost}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Financial Requirements */}
              <Card data-testid="card-financial">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-primary" />
                    Financial Proof
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Minimum Funds Required</div>
                    <div className="font-semibold text-lg">{profile.financialRequirement}</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center shrink-0">
                      <Heart className="w-5 h-5 text-rose-600" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Health Insurance</div>
                      <div className="font-medium">{profile.healthInsurance}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Work Rights */}
              <Card data-testid="card-work-rights">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-primary" />
                    Work Rights During Study
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
                    <div className="font-semibold text-emerald-700 dark:text-emerald-400 text-lg">
                      {profile.workHoursAllowed}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Post-Study Options */}
              <Card data-testid="card-post-study">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    Post-Study Options
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center shrink-0">
                      <Timer className="w-5 h-5 text-violet-600" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Job Search Visa</div>
                      <div className="font-medium">{profile.postStudyWorkVisa}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center shrink-0">
                      <Home className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Path to Residency</div>
                      <div className="font-medium">{profile.pathToResidency}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Language & Resources */}
              <Card className="md:col-span-2" data-testid="card-resources">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe2 className="w-5 h-5 text-primary" />
                    Resources & Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {profile.languageRequirement && (
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center shrink-0">
                          <Languages className="w-5 h-5 text-cyan-600" />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Language Requirement</div>
                          <div className="font-medium">{profile.languageRequirement}</div>
                        </div>
                      </div>
                    )}
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                        <ExternalLink className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Official Immigration Portal</div>
                        <a 
                          href={profile.immigrationPortal} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-medium text-blue-600 hover:underline"
                        >
                          Visit Portal →
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Jobs Tab */}
          <TabsContent value="jobs">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Salary Overview */}
              <Card data-testid="card-salary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Euro className="w-5 h-5 text-primary" />
                    Salary Expectations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                    <div className="text-sm text-muted-foreground">Entry Level (0-2 years)</div>
                    <div className="text-2xl font-bold text-green-700 dark:text-green-400">{profile.averageSalaryEntry}</div>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
                    <div className="text-sm text-muted-foreground">Mid-Level (3-5 years)</div>
                    <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">{profile.averageSalaryMid}</div>
                  </div>
                </CardContent>
              </Card>

              {/* Employment Stats */}
              <Card data-testid="card-employment">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Employment Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
                    <div className="text-sm text-muted-foreground">Graduate Employment Rate</div>
                    <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">{profile.graduateEmploymentRate}</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Average Job Search Time</div>
                      <div className="font-medium">{profile.jobSearchTimeline}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top Sectors */}
              <Card data-testid="card-sectors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary" />
                    Top Industries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profile.topSectors.map((sector, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1.5">
                        {sector}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* In-Demand Jobs */}
              <Card data-testid="card-in-demand">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    In-Demand Jobs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profile.inDemandJobs.map((job, index) => (
                      <Badge key={index} variant="outline" className="px-3 py-1.5 border-primary/50">
                        {job}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Work Culture */}
              <Card className="md:col-span-2" data-testid="card-work-culture">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Work Culture & Language
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-2">Work Culture</div>
                      <div className="font-medium">{profile.workCulture}</div>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-2">Language for Work</div>
                      <div className="font-medium">{profile.languageForWork}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Job Portals */}
              <Card className="md:col-span-2" data-testid="card-job-portals">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe2 className="w-5 h-5 text-primary" />
                    Job Search Portals
                  </CardTitle>
                  <CardDescription>Popular websites to find jobs in {profile.country}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {profile.jobPortals.map((portal, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        {portal}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quality of Life */}
              {profile.qualityOfLife && (
                <Card className="md:col-span-2" data-testid="card-quality">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-primary" />
                      Quality of Life
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{profile.qualityOfLife}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* CTA */}
        <Card className="mt-8 bg-gradient-to-r from-primary/10 to-primary/5">
          <CardContent className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-lg">Ready to explore universities in {profile.country}?</h3>
              <p className="text-muted-foreground">Browse all {profile.country} universities with our search tools</p>
            </div>
            <Link href={`/?country=${profile.country}`}>
              <Button size="lg" data-testid="button-browse-universities">
                Browse Universities
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
