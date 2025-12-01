import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, ExternalLink, Shield, Globe, CheckCircle, Building2 } from 'lucide-react';

interface AccreditationBody {
  name: string;
  acronym: string;
  type: 'primary' | 'specialized';
  role: string;
  website: string;
  established?: string;
  notes?: string;
}

interface CountryData {
  flag: string;
  bodies: AccreditationBody[];
  process?: string;
}

const southAsiaData: Record<string, CountryData> = {
  'India': {
    flag: '🇮🇳',
    bodies: [
      {
        name: 'University Grants Commission',
        acronym: 'UGC',
        type: 'primary',
        role: 'Statutory body for coordination, determination, and maintenance of university education standards',
        website: 'https://www.ugc.ac.in',
        established: '1956',
      },
      {
        name: 'National Assessment and Accreditation Council',
        acronym: 'NAAC',
        type: 'primary',
        role: 'Quality assurance and performance evaluation of Higher Education Institutions',
        website: 'https://www.naac.gov.in',
        established: '1994',
        notes: 'Grading: A++, A+, A, B++, B+, B, C, D',
      },
      {
        name: 'All India Council for Technical Education',
        acronym: 'AICTE',
        type: 'specialized',
        role: 'Accreditation and approval for technical education programs',
        website: 'https://www.aicte-india.org',
        established: '1945',
      },
      {
        name: 'Association of Indian Universities',
        acronym: 'AIU',
        type: 'specialized',
        role: 'Recognition and equivalence of foreign degrees for Indian students',
        website: 'https://www.aiu.ac.in',
        notes: 'Check here for European degree equivalence',
      },
    ],
    process: 'Foreign degrees are evaluated by AIU for equivalence. European degrees from recognized universities are generally accepted.',
  },
  'Pakistan': {
    flag: '🇵🇰',
    bodies: [
      {
        name: 'Higher Education Commission',
        acronym: 'HEC',
        type: 'primary',
        role: 'Funding, overseeing, regulating, and accrediting higher education institutions',
        website: 'https://www.hec.gov.pk',
        established: '2002',
        notes: 'University Categories: W4 (highest), W3, W2, W1',
      },
      {
        name: 'Pakistan Engineering Council',
        acronym: 'PEC',
        type: 'specialized',
        role: 'Accreditation of engineering programs and recognition of engineering degrees',
        website: 'https://www.pec.org.pk',
      },
      {
        name: 'Pakistan Medical Commission',
        acronym: 'PMC',
        type: 'specialized',
        role: 'Recognition and equivalence of medical degrees',
        website: 'https://www.pmc.gov.pk',
      },
    ],
    process: 'HEC evaluates foreign degrees for equivalence. European degrees require attestation and verification through HEC portal.',
  },
  'Bangladesh': {
    flag: '🇧🇩',
    bodies: [
      {
        name: 'University Grants Commission of Bangladesh',
        acronym: 'UGC',
        type: 'primary',
        role: 'Regulation of public and private universities, quality assurance',
        website: 'https://www.ugc.gov.bd',
        established: '1973',
      },
      {
        name: 'Bangladesh Accreditation Council',
        acronym: 'BAC',
        type: 'primary',
        role: 'National quality assurance body for higher education',
        website: 'https://www.bac.gov.bd',
        established: '2017',
      },
    ],
    process: 'Foreign degrees evaluated by UGC Bangladesh. Degrees from QS-ranked universities generally recognized.',
  },
  'Sri Lanka': {
    flag: '🇱🇰',
    bodies: [
      {
        name: 'University Grants Commission',
        acronym: 'UGC',
        type: 'primary',
        role: 'Planning and coordination of university education, maintenance of standards',
        website: 'https://www.ugc.ac.lk',
        established: '1978',
      },
      {
        name: 'Quality Assurance Council',
        acronym: 'QAC',
        type: 'primary',
        role: 'Quality assurance reviews of state universities',
        website: 'https://www.ugc.ac.lk/en/quality-assurance',
      },
    ],
    process: 'Foreign degrees require UGC evaluation. EU degrees from accredited institutions are generally recognized.',
  },
  'Nepal': {
    flag: '🇳🇵',
    bodies: [
      {
        name: 'University Grants Commission Nepal',
        acronym: 'UGC',
        type: 'primary',
        role: 'Quality assurance and funding of higher education',
        website: 'https://www.ugcnepal.edu.np',
        established: '1994',
      },
      {
        name: 'Tribhuvan University',
        acronym: 'TU',
        type: 'specialized',
        role: 'Equivalence determination for foreign degrees (for TU-affiliated purposes)',
        website: 'https://www.tu.edu.np',
      },
    ],
    process: 'Foreign degrees evaluated by respective universities or UGC for equivalence purposes.',
  },
};

const gccData: Record<string, CountryData> = {
  'UAE': {
    flag: '🇦🇪',
    bodies: [
      {
        name: 'Commission for Academic Accreditation',
        acronym: 'CAA',
        type: 'primary',
        role: 'National quality assurance, institutional licensure and program accreditation',
        website: 'https://www.mohesr.gov.ae',
        established: '2000',
        notes: 'Aligned with international benchmarks, member of INQAAHE',
      },
      {
        name: 'Ministry of Education - Recognition System',
        acronym: 'MoE',
        type: 'primary',
        role: 'Foreign degree recognition for employment and visa purposes',
        website: 'https://u.ae',
        notes: 'Categories based on global rankings: Top 200 (fast-track), 201-500, nationally accredited',
      },
    ],
    process: 'Foreign degrees verified through DataFlow/QuadraBay. Processing: ~18 working days. Top-200 universities get streamlined recognition.',
  },
  'Saudi Arabia': {
    flag: '🇸🇦',
    bodies: [
      {
        name: 'Education and Training Evaluation Commission',
        acronym: 'ETEC',
        type: 'primary',
        role: 'Programmatic and institutional accreditation for post-secondary education',
        website: 'https://www.etec.gov.sa',
        established: '2017',
      },
      {
        name: 'Ministry of Education',
        acronym: 'MOE',
        type: 'primary',
        role: 'Degree equivalency and recognition for foreign degrees',
        website: 'https://www.moe.gov.sa',
        notes: 'Maintains approved foreign institutions list by major and degree type',
      },
      {
        name: 'Saudi Commission for Health Specialties',
        acronym: 'SCFHS',
        type: 'specialized',
        role: 'Recognition and licensing for health profession degrees',
        website: 'https://www.scfhs.org.sa',
      },
    ],
    process: 'Degrees require apostille attestation (Saudi joined Hague Convention). Documents verified by home country MOFA and Saudi Embassy.',
  },
  'Qatar': {
    flag: '🇶🇦',
    bodies: [
      {
        name: 'Ministry of Education and Higher Education',
        acronym: 'MOEHE',
        type: 'primary',
        role: 'National accreditation, recognition of foreign degrees',
        website: 'https://www.edu.gov.qa',
      },
      {
        name: 'Qatar National Accreditation Commission',
        acronym: 'QNAC',
        type: 'primary',
        role: 'Quality assurance for higher education institutions',
        website: 'https://www.edu.gov.qa',
      },
    ],
    process: 'Foreign degrees require attestation from Qatar Embassy. MOEHE evaluates for equivalence.',
  },
  'Kuwait': {
    flag: '🇰🇼',
    bodies: [
      {
        name: 'Ministry of Higher Education',
        acronym: 'MOHE',
        type: 'primary',
        role: 'Recognition and equivalency of foreign degrees',
        website: 'https://www.mohe.edu.kw',
      },
      {
        name: 'Private Universities Council',
        acronym: 'PUC',
        type: 'specialized',
        role: 'Accreditation of private higher education institutions',
        website: 'https://www.puc.edu.kw',
      },
    ],
    process: 'Foreign degrees evaluated by MOHE for equivalency. Attestation through Kuwait Embassy required.',
  },
  'Bahrain': {
    flag: '🇧🇭',
    bodies: [
      {
        name: 'Education & Training Quality Authority',
        acronym: 'BQA',
        type: 'primary',
        role: 'Quality assurance and accreditation of education institutions',
        website: 'https://www.bqa.gov.bh',
        established: '2008',
      },
      {
        name: 'Higher Education Council',
        acronym: 'HEC',
        type: 'primary',
        role: 'Recognition and equivalency of foreign degrees',
        website: 'https://www.moe.gov.bh',
      },
    ],
    process: 'Foreign degrees require BQA evaluation. EU degrees from recognized institutions generally accepted.',
  },
  'Oman': {
    flag: '🇴🇲',
    bodies: [
      {
        name: 'Oman Academic Accreditation Authority',
        acronym: 'OAAA',
        type: 'primary',
        role: 'Quality assurance and accreditation of higher education',
        website: 'https://www.oaaa.gov.om',
        established: '2010',
      },
      {
        name: 'Ministry of Higher Education, Research and Innovation',
        acronym: 'MoHERI',
        type: 'primary',
        role: 'Recognition and equivalency of foreign degrees',
        website: 'https://www.moheri.gov.om',
      },
    ],
    process: 'Foreign degrees evaluated by MoHERI. Attestation through Oman Embassy required.',
  },
};

export default function Accreditation() {
  const [, setLocation] = useLocation();

  const renderCountrySection = (country: string, data: CountryData) => (
    <Card key={country} className="overflow-hidden" data-testid={`card-country-${country.toLowerCase().replace(' ', '-')}`}>
      <CardHeader className="bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-700">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{data.flag}</span>
          <div>
            <CardTitle className="text-xl">{country}</CardTitle>
            <CardDescription>{data.bodies.length} accreditation bodies</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        {data.bodies.map((body) => (
          <div 
            key={body.acronym} 
            className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-semibold text-slate-900 dark:text-white">{body.name}</h4>
                  <Badge variant={body.type === 'primary' ? 'default' : 'secondary'} className="text-xs">
                    {body.acronym}
                  </Badge>
                  {body.type === 'primary' && (
                    <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800">
                      Primary Body
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{body.role}</p>
                {body.established && (
                  <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">Established: {body.established}</p>
                )}
                {body.notes && (
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-2 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    {body.notes}
                  </p>
                )}
              </div>
              <a 
                href={body.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="shrink-0"
              >
                <Button variant="outline" size="sm" className="gap-1" data-testid={`link-website-${body.acronym.toLowerCase()}`}>
                  <ExternalLink className="w-3 h-3" />
                  Visit
                </Button>
              </a>
            </div>
          </div>
        ))}
        
        {data.process && (
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mt-4">
            <div className="flex items-start gap-2">
              <Shield className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-medium text-amber-800 dark:text-amber-300 text-sm">Recognition Process</h5>
                <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">{data.process}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

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
            Home
          </Button>
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-500" />
            <span className="font-heading font-semibold">Degree Recognition</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
            <Globe className="w-3 h-3 mr-1" />
            Accreditation Guide
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold font-heading mb-3">
            Degree Recognition Bodies
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Check if your European university degree will be recognized in your home country
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Important Information</h3>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside">
                <li>European degrees from QS/THE Top 500 universities are generally recognized worldwide</li>
                <li>Always verify with your home country's recognition body before enrolling</li>
                <li>Some professions (medicine, engineering, law) may have additional requirements</li>
                <li>Keep all original documents and transcripts for attestation purposes</li>
              </ul>
            </div>
          </div>
        </div>

        <Tabs defaultValue="south-asia" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="south-asia" className="gap-2" data-testid="tab-south-asia">
              🌏 South Asia
            </TabsTrigger>
            <TabsTrigger value="gcc" className="gap-2" data-testid="tab-gcc">
              🏜️ GCC Countries
            </TabsTrigger>
          </TabsList>

          <TabsContent value="south-asia" className="space-y-6">
            <div className="grid gap-6">
              {Object.entries(southAsiaData).map(([country, data]) => renderCountrySection(country, data))}
            </div>
          </TabsContent>

          <TabsContent value="gcc" className="space-y-6">
            <div className="grid gap-6">
              {Object.entries(gccData).map(([country, data]) => renderCountrySection(country, data))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-12 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>Information compiled from official government sources. Always verify with the respective authority for the most current requirements.</p>
        </div>
      </main>
    </div>
  );
}
