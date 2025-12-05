import { Link } from 'wouter';
import { ArrowLeft, TrendingUp, Briefcase, GraduationCap, MapPin, Sparkles, Building2, Heart, Cpu, Shield, Leaf, FlaskConical, BarChart3, Globe, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface TrendingProgram {
  id: number;
  name: string;
  category: string;
  icon: React.ReactNode;
  iconBg: string;
  demandLevel: 'Critical' | 'Very High' | 'High';
  growthRate: string;
  salaryRange: string;
  description: string;
  whyTrending: string[];
  topCountries: string[];
  topUniversities: string[];
  careerPaths: string[];
  keySkills: string[];
  employmentRate: string;
}

const trendingPrograms: TrendingProgram[] = [
  {
    id: 1,
    name: "Computer Science & IT",
    category: "Technology",
    icon: <Cpu className="w-6 h-6" />,
    iconBg: "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400",
    demandLevel: "Critical",
    growthRate: "+57%",
    salaryRange: "€50,000 - €75,000",
    description: "Foundation of the digital economy, covering software development, systems design, and computational thinking.",
    whyTrending: [
      "57% of EU firms unable to find qualified developers",
      "10 million ICT specialists currently employed in EU",
      "Target of 20 million ICT specialists by 2030",
      "Python is most in-demand programming skill"
    ],
    topCountries: ["Germany", "Netherlands", "Ireland", "Finland"],
    topUniversities: ["TU Munich", "ETH Zurich", "TU Delft", "University of Amsterdam"],
    careerPaths: ["Software Developer", "Full-Stack Engineer", "Systems Architect", "DevOps Engineer"],
    keySkills: ["Python", "JavaScript", "Cloud Computing", "System Design"],
    employmentRate: "93%"
  },
  {
    id: 2,
    name: "Artificial Intelligence & Machine Learning",
    category: "Technology",
    icon: <Sparkles className="w-6 h-6" />,
    iconBg: "bg-violet-100 text-violet-600 dark:bg-violet-900/50 dark:text-violet-400",
    demandLevel: "Critical",
    growthRate: "+383%",
    salaryRange: "€55,000 - €85,000",
    description: "Cutting-edge field combining computer science, mathematics, and cognitive science to create intelligent systems.",
    whyTrending: [
      "383% growth in AI job demand expected by 2025",
      "€1.3 billion EU investment in AI and digital skills",
      "44% of organizations boost pay for AI/ML skills",
      "AI reshaping every industry from healthcare to finance"
    ],
    topCountries: ["Germany", "Netherlands", "France", "Finland"],
    topUniversities: ["TU Munich", "University of Amsterdam", "EPFL", "KTH Stockholm"],
    careerPaths: ["ML Engineer", "AI Researcher", "Data Scientist", "AI Product Manager"],
    keySkills: ["TensorFlow/PyTorch", "Deep Learning", "NLP", "Computer Vision"],
    employmentRate: "95%"
  },
  {
    id: 3,
    name: "Data Science & Analytics",
    category: "Technology",
    icon: <BarChart3 className="w-6 h-6" />,
    iconBg: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/50 dark:text-cyan-400",
    demandLevel: "Very High",
    growthRate: "+35%",
    salaryRange: "€45,000 - €70,000",
    description: "Extracting insights from data using statistics, programming, and domain expertise to drive business decisions.",
    whyTrending: [
      "Growing demand with 35% year-over-year increase",
      "Every industry now data-driven",
      "92 Bachelor's programs available across EU",
      "Critical for digital transformation initiatives"
    ],
    topCountries: ["Netherlands", "Germany", "Ireland", "Poland"],
    topUniversities: ["Leiden University", "TU Eindhoven", "University of Warsaw", "Trinity College Dublin"],
    careerPaths: ["Data Analyst", "Business Intelligence Analyst", "Data Engineer", "Quantitative Analyst"],
    keySkills: ["SQL", "Python/R", "Tableau/Power BI", "Statistical Modeling"],
    employmentRate: "91%"
  },
  {
    id: 4,
    name: "Cybersecurity",
    category: "Technology",
    icon: <Shield className="w-6 h-6" />,
    iconBg: "bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400",
    demandLevel: "Critical",
    growthRate: "+28%",
    salaryRange: "€55,000 - €80,000",
    description: "Protecting digital infrastructure, networks, and data from cyber threats and attacks.",
    whyTrending: [
      "EU's NIS2 directive driving compliance demand",
      "Rising cyber threats across all sectors",
      "Demand consistently outpacing supply",
      "Critical infrastructure protection priority"
    ],
    topCountries: ["Netherlands", "Germany", "Ireland", "Czech Republic"],
    topUniversities: ["TU Delft", "RWTH Aachen", "University College Dublin", "Masaryk University"],
    careerPaths: ["Security Analyst", "Penetration Tester", "Security Architect", "SOC Analyst"],
    keySkills: ["Network Security", "Ethical Hacking", "SIEM Tools", "Compliance Frameworks"],
    employmentRate: "94%"
  },
  {
    id: 5,
    name: "Nursing & Healthcare Sciences",
    category: "Healthcare",
    icon: <Heart className="w-6 h-6" />,
    iconBg: "bg-pink-100 text-pink-600 dark:bg-pink-900/50 dark:text-pink-400",
    demandLevel: "Critical",
    growthRate: "+2M jobs",
    salaryRange: "€35,000 - €55,000",
    description: "Essential healthcare profession providing patient care, health promotion, and medical support services.",
    whyTrending: [
      "2.3 million nurse shortage projected across EU",
      "2 million new healthcare jobs expected by 2025",
      "Aging population driving sustained demand",
      "Healthcare reaching 10% of EU GDP"
    ],
    topCountries: ["Germany", "Netherlands", "Finland", "Ireland"],
    topUniversities: ["Karolinska Institute", "King's College London", "Charité Berlin", "University of Helsinki"],
    careerPaths: ["Registered Nurse", "Clinical Specialist", "Nurse Practitioner", "Healthcare Manager"],
    keySkills: ["Patient Care", "Clinical Skills", "Medical Technology", "Communication"],
    employmentRate: "97%"
  },
  {
    id: 6,
    name: "Medicine & Health Sciences",
    category: "Healthcare",
    icon: <Heart className="w-6 h-6" />,
    iconBg: "bg-rose-100 text-rose-600 dark:bg-rose-900/50 dark:text-rose-400",
    demandLevel: "Critical",
    growthRate: "600K shortage",
    salaryRange: "€50,000 - €90,000",
    description: "Comprehensive medical education preparing students to become physicians and healthcare leaders.",
    whyTrending: [
      "600,000 doctor shortage across Europe",
      "€65 million investment in health services (Sweden)",
      "Specialist doctors in high demand",
      "Mental health professionals critically needed"
    ],
    topCountries: ["Germany", "Hungary", "Czech Republic", "Poland"],
    topUniversities: ["Heidelberg University", "Semmelweis University", "Charles University", "Jagiellonian University"],
    careerPaths: ["General Practitioner", "Specialist Doctor", "Medical Researcher", "Hospital Administrator"],
    keySkills: ["Clinical Knowledge", "Diagnostics", "Patient Communication", "Research Methods"],
    employmentRate: "99%"
  },
  {
    id: 7,
    name: "Engineering (Mechanical, Electrical, Civil)",
    category: "Engineering",
    icon: <Building2 className="w-6 h-6" />,
    iconBg: "bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400",
    demandLevel: "Very High",
    growthRate: "+15%",
    salaryRange: "€45,000 - €65,000",
    description: "Applied sciences designing and building systems, structures, and technologies for modern society.",
    whyTrending: [
      "Germany's #1 in-demand field",
      "Skilled worker shortage across EU",
      "Green transition creating new opportunities",
      "EUR-ACE accreditation ensures quality"
    ],
    topCountries: ["Germany", "Netherlands", "France", "Italy"],
    topUniversities: ["TU Munich", "RWTH Aachen", "TU Delft", "Politecnico di Milano"],
    careerPaths: ["Design Engineer", "Project Manager", "R&D Engineer", "Manufacturing Engineer"],
    keySkills: ["CAD/CAM", "Project Management", "Technical Analysis", "Problem Solving"],
    employmentRate: "90%"
  },
  {
    id: 8,
    name: "Business Management & Finance",
    category: "Business",
    icon: <Briefcase className="w-6 h-6" />,
    iconBg: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400",
    demandLevel: "High",
    growthRate: "+12%",
    salaryRange: "€40,000 - €60,000",
    description: "Developing leadership, strategic thinking, and financial acumen for corporate and entrepreneurial success.",
    whyTrending: [
      "FinTech sector rapidly expanding",
      "Frankfurt, London, Zurich major hubs",
      "Compliance and regulation roles growing",
      "Startup ecosystem booming (€51B funding in 2024)"
    ],
    topCountries: ["Netherlands", "Germany", "France", "Italy"],
    topUniversities: ["Bocconi University", "HEC Paris", "University of Mannheim", "Rotterdam School of Management"],
    careerPaths: ["Financial Analyst", "Management Consultant", "Investment Banker", "Business Developer"],
    keySkills: ["Financial Modeling", "Data Analysis", "Leadership", "Strategic Planning"],
    employmentRate: "88%"
  },
  {
    id: 9,
    name: "Environmental Science & Sustainability",
    category: "Green Economy",
    icon: <Leaf className="w-6 h-6" />,
    iconBg: "bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400",
    demandLevel: "Very High",
    growthRate: "+25%",
    salaryRange: "€40,000 - €60,000",
    description: "Addressing climate change and environmental challenges through science, policy, and sustainable innovation.",
    whyTrending: [
      "European Green Deal creating massive job transformation",
      "Germany, Sweden, Netherlands going carbon-neutral",
      "Green infrastructure investment booming",
      "ESG compliance driving corporate demand"
    ],
    topCountries: ["Netherlands", "Germany", "Finland", "France"],
    topUniversities: ["Wageningen University", "ETH Zurich", "University of Helsinki", "University of Copenhagen"],
    careerPaths: ["Environmental Consultant", "Sustainability Officer", "Climate Analyst", "Renewable Energy Specialist"],
    keySkills: ["Environmental Assessment", "GIS", "Policy Analysis", "Project Management"],
    employmentRate: "87%"
  },
  {
    id: 10,
    name: "Biotechnology & Pharmaceutical Sciences",
    category: "Life Sciences",
    icon: <FlaskConical className="w-6 h-6" />,
    iconBg: "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400",
    demandLevel: "Very High",
    growthRate: "+22%",
    salaryRange: "€45,000 - €70,000",
    description: "Applying biological systems to develop new products, treatments, and technologies for healthcare and industry.",
    whyTrending: [
      "€11 billion in healthcare biotech funding (2024)",
      "AI in biotech accelerating drug discovery",
      "mRNA technology revolutionizing medicine",
      "Personalized medicine driving innovation"
    ],
    topCountries: ["Germany", "Netherlands", "France", "Finland"],
    topUniversities: ["ETH Zurich", "TU Munich", "Leiden University", "University of Copenhagen"],
    careerPaths: ["Research Scientist", "Bioprocess Engineer", "Regulatory Affairs Specialist", "Clinical Research Associate"],
    keySkills: ["Laboratory Techniques", "Bioinformatics", "Regulatory Knowledge", "Data Analysis"],
    employmentRate: "89%"
  }
];

const getDemandBadgeColor = (level: string) => {
  switch (level) {
    case 'Critical': return 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400 border-red-200 dark:border-red-800';
    case 'Very High': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-400 border-orange-200 dark:border-orange-800';
    case 'High': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400 border-amber-200 dark:border-amber-800';
    default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400';
  }
};

export default function TrendingProgramsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <main className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6" data-testid="link-back-home">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Home
        </Link>
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
            <TrendingUp className="w-3 h-3 mr-1" />
            2025 Career Guide
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4" data-testid="text-page-title">
            Top 10 In-Demand Undergraduate Programs
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Discover the most trending undergraduate programs in EU universities for 2025, specially curated for South Asian students seeking excellent career prospects in Europe.
          </p>
        </div>

        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800" data-testid="stats-overview-card">
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div data-testid="stat-ict-jobs">
                <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">10M+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">ICT Jobs in EU</div>
              </div>
              <div data-testid="stat-employment-rate">
                <div className="text-2xl md:text-3xl font-bold text-emerald-600 dark:text-emerald-400">93%</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Avg. Employment Rate</div>
              </div>
              <div data-testid="stat-startup-funding">
                <div className="text-2xl md:text-3xl font-bold text-amber-600 dark:text-amber-400">€51B</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Startup Funding (2024)</div>
              </div>
              <div data-testid="stat-tech-workers">
                <div className="text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400">20M</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Tech Workers Needed by 2030</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {trendingPrograms.map((program) => (
            <Card key={program.id} className="hover:shadow-lg transition-shadow overflow-hidden" data-testid={`program-card-${program.id}`}>
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/3 p-6 bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${program.iconBg}`}>
                        {program.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg font-bold text-slate-900 dark:text-white">#{program.id}</span>
                          <Badge variant="outline" className="text-xs">{program.category}</Badge>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
                          {program.name}
                        </h3>
                      </div>
                    </div>
                    
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      {program.description}
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
                        <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Demand Level</div>
                        <Badge className={`${getDemandBadgeColor(program.demandLevel)} text-xs`}>
                          {program.demandLevel}
                        </Badge>
                      </div>
                      <div className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
                        <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Growth</div>
                        <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{program.growthRate}</div>
                      </div>
                      <div className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
                        <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Salary Range</div>
                        <div className="text-sm font-semibold text-slate-900 dark:text-white">{program.salaryRange}</div>
                      </div>
                      <div className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
                        <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Employment</div>
                        <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">{program.employmentRate}</div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-2/3 p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-orange-500" />
                          Why It's Trending
                        </h4>
                        <ul className="space-y-2">
                          {program.whyTrending.map((reason, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                              <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                              {reason}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-blue-500" />
                          Career Paths
                        </h4>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {program.careerPaths.map((career, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {career}
                            </Badge>
                          ))}
                        </div>

                        <h4 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-violet-500" />
                          Key Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {program.keySkills.map((skill, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs bg-violet-50 dark:bg-violet-950/30 border-violet-200 dark:border-violet-800">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-red-500" />
                            Top Countries
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {program.topCountries.map((country, idx) => (
                              <Link key={idx} href={`/?country=${country}`}>
                                <Badge variant="outline" className="text-xs cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800">
                                  {country}
                                </Badge>
                              </Link>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-amber-500" />
                            Top Universities
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {program.topUniversities.map((uni, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {uni}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-12 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border-emerald-200 dark:border-emerald-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-900 dark:text-emerald-100">
              <Globe className="w-5 h-5" />
              Top Destinations for South Asian Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <img src="https://flagcdn.com/w20/de.png" alt="Germany" className="w-5 h-4 rounded-sm" />
                  <span className="font-semibold text-slate-900 dark:text-white">Germany</span>
                </div>
                <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                  <li>Free tuition at public universities</li>
                  <li>18-month post-study work visa</li>
                  <li>60,000+ Indian students</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <img src="https://flagcdn.com/w20/nl.png" alt="Netherlands" className="w-5 h-4 rounded-sm" />
                  <span className="font-semibold text-slate-900 dark:text-white">Netherlands</span>
                </div>
                <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                  <li>93.1% graduate employment (highest in EU)</li>
                  <li>2,100+ English programs</li>
                  <li>Strong tech & startup ecosystem</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <img src="https://flagcdn.com/w20/ie.png" alt="Ireland" className="w-5 h-4 rounded-sm" />
                  <span className="font-semibold text-slate-900 dark:text-white">Ireland</span>
                </div>
                <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                  <li>2-year post-study work visa</li>
                  <li>EU tech hub (Google, Meta, Apple)</li>
                  <li>English-speaking environment</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <img src="https://flagcdn.com/w20/fi.png" alt="Finland" className="w-5 h-4 rounded-sm" />
                  <span className="font-semibold text-slate-900 dark:text-white">Finland</span>
                </div>
                <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                  <li>World-class education system</li>
                  <li>Strong tech & innovation sector</li>
                  <li>High quality of life</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Not sure which field is right for you?</h3>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Use our Field of Study Suggester to get personalized recommendations based on your subjects and interests.
                </p>
              </div>
              <Link href="/field-suggester">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2" data-testid="button-field-suggester-cta">
                  <Sparkles className="w-4 h-4" />
                  Try Field Suggester
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400" data-testid="text-data-source">
          <p>Data sourced from EU labor statistics, World Economic Forum Future of Jobs Report 2025, and university employment surveys.</p>
        </div>
      </main>
    </div>
  );
}
