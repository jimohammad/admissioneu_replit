import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  ArrowLeft,
  FileText,
  CheckCircle2,
  Globe,
  Download,
  Copy,
  ExternalLink,
  GraduationCap,
  Plane,
  Building2,
  CreditCard,
  Shield,
  BookOpen,
  Users,
  ClipboardList,
  Landmark,
  Lock,
  AlertTriangle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const applicationPortals = [
  {
    country: 'Netherlands',
    flag: '🇳🇱',
    portal: 'Studielink',
    website: 'https://www.studielink.nl',
    description: 'Official centralized portal for all Dutch universities. Create one account, apply to multiple programs.',
    coverage: 'All public universities',
    cost: 'Free',
    deadline: 'January 15 (selective programs), May-June (most Bachelor)',
  },
  {
    country: 'Germany',
    flag: '🇩🇪',
    portal: 'uni-assist',
    website: 'https://www.uni-assist.de/en/',
    description: 'Central service for processing international applications. Evaluates credentials and forwards to universities.',
    coverage: '180+ universities',
    cost: '€75 first application, €30 each additional',
    deadline: 'Mid-July (winter semester)',
  },
  {
    country: 'Italy',
    flag: '🇮🇹',
    portal: 'Universitaly',
    website: 'https://www.universitaly.it',
    description: 'Official platform for international students alongside individual university portals.',
    coverage: 'Many public universities',
    cost: 'Free',
    deadline: 'Varies by university',
  },
  {
    country: 'Spain',
    flag: '🇪🇸',
    portal: 'Direct Application',
    website: null,
    description: 'No centralized system. Apply directly to each university through their individual portals.',
    coverage: 'Individual universities',
    cost: 'Varies (€50-150)',
    deadline: 'June-September',
  },
  {
    country: 'Hungary',
    flag: '🇭🇺',
    portal: 'Direct Application',
    website: null,
    description: 'Apply directly to universities. Some offer Stipendium Hungaricum scholarship portal.',
    coverage: 'Individual universities',
    cost: 'Varies',
    deadline: 'February-June',
  },
  {
    country: 'Poland',
    flag: '🇵🇱',
    portal: 'IRK System',
    website: 'https://irk.uw.edu.pl',
    description: 'Many Polish universities use IRK (Internet Registration of Candidates) system individually.',
    coverage: 'Individual universities',
    cost: 'Varies',
    deadline: 'June-September',
  },
];

const admissionDocuments = [
  { name: 'Official Academic Transcripts', required: true, description: 'Certified copies of all academic records' },
  { name: 'Degree Certificate/Diploma', required: true, description: 'Proof of completed previous education' },
  { name: 'School Leaving Certificate', required: true, description: 'Official certificate confirming completion of previous schooling' },
  { name: 'Bonafide Certificate', required: true, description: 'Certificate from last attended institute confirming you were a bonafide student' },
  { name: 'Passport Copy', required: true, description: 'Valid for at least 6-12 months beyond study period' },
  { name: 'English Proficiency Test', required: true, description: 'IELTS (6.0-7.0), TOEFL (80-100), or equivalent' },
  { name: 'English Language Proficiency Letter', required: true, description: 'Letter from last attended institute confirming education was conducted in English' },
  { name: 'Motivation Letter / Statement of Purpose', required: true, description: 'Explains goals and reasons for program choice' },
  { name: 'Curriculum Vitae (CV)', required: true, description: 'Academic and professional experience' },
  { name: 'Two Reference Letters', required: true, description: 'Reference letters from school, college or university last attended' },
  { name: 'Letters of Recommendation', required: false, description: '1-2 academic or professional references' },
  { name: 'Passport-sized Photos', required: true, description: '3-4 biometric photos (white background)' },
  { name: 'Application Form', required: true, description: 'University-specific or portal application' },
  { name: 'Portfolio', required: false, description: 'For arts, design, architecture programs' },
];

const visaDocuments = [
  { name: 'Valid Passport', required: true, description: 'Valid 6-12 months beyond intended stay' },
  { name: 'Two Photos', required: true, description: 'Color photos 35mm x 45mm with white background, not older than 6 months' },
  { name: 'National ID Card', required: true, description: 'Government-issued national identity card' },
  { name: 'University Admission Letter', required: true, description: 'Official acceptance with course details' },
  { name: 'Proof of Financial Means', required: true, description: 'Bank statements, sponsor letter, scholarship proof' },
  { name: 'Bank Statement (Sponsor)', required: true, description: '3-6 months bank statement of sponsor showing sufficient funds' },
  { name: 'Health Insurance', required: true, description: 'Travel insurance + health coverage for study period' },
  { name: 'Proof of Accommodation', required: true, description: 'Rental Agreement, Proof of Rent Payment transfer' },
  { name: 'Tuition Fee Payment Proof', required: false, description: 'Receipt or confirmation of payment' },
  { name: 'Sponsor\'s Salary Certificate', required: false, description: 'If financially sponsored by parent/guardian' },
  { name: 'Sponsorship Certificate', required: true, description: 'Affidavit/certificate by parents or legal guardian confirming financial support' },
  { name: 'Family Registration Certificate (FRC)', required: true, description: 'Official document showing family members and relationships' },
  { name: 'Residence Card', required: false, description: 'Required if currently living abroad in a different country' },
  { name: 'Cover Letter', required: true, description: 'Explaining purpose and duration of stay' },
  { name: 'Visa Application Form', required: true, description: 'Embassy-specific forms' },
  { name: 'VFS Appointment Letter', required: true, description: 'Confirmation of visa appointment booking at VFS Global or embassy' },
  { name: 'Previous Visa Copies', required: false, description: 'If you have traveled before' },
];

const blockedAccountProviders = [
  {
    name: 'Expatrio',
    country: 'Germany',
    flag: '🇩🇪',
    website: 'https://www.expatrio.com',
    minDeposit: '€11,904',
    monthlyRelease: '€992/month',
    setupFee: '€49',
    processingTime: '1-3 days',
    features: ['Fast digital process', 'Mobile app', 'Health insurance bundle', 'English support'],
    highlight: true,
  },
  {
    name: 'Fintiba',
    country: 'Germany',
    flag: '🇩🇪',
    website: 'https://www.fintiba.com',
    minDeposit: '€11,904',
    monthlyRelease: '€992/month',
    setupFee: '€89',
    processingTime: '2-5 days',
    features: ['Trusted provider', 'Insurance options', 'Visa-compliant', 'Good support'],
    highlight: true,
  },
  {
    name: 'Deutsche Bank',
    country: 'Germany',
    flag: '🇩🇪',
    website: 'https://www.deutsche-bank.de',
    minDeposit: '€11,904',
    monthlyRelease: '€992/month',
    setupFee: '€0 (account fees apply)',
    processingTime: '2-4 weeks',
    features: ['Traditional bank', 'Physical presence', 'Full banking services'],
    highlight: false,
  },
  {
    name: 'Coracle (for Austria)',
    country: 'Austria',
    flag: '🇦🇹',
    website: 'https://www.coracle.de',
    minDeposit: '€12,768',
    monthlyRelease: '€1,064/month',
    setupFee: '€100',
    processingTime: '3-5 days',
    features: ['Austria-compliant', 'Digital process', 'English support'],
    highlight: true,
  },
];

const blockedAccountRequirements = [
  {
    country: 'Germany',
    flag: '🇩🇪',
    required: 'Mandatory',
    amount: '€11,904/year (€992/month)',
    description: 'Sperrkonto (blocked account) is mandatory for all non-EU students applying for a German student visa. Money is released monthly to cover living expenses.',
    notes: 'Amount updated annually by German government. For 2025/2026, it is €992/month × 12 months.',
  },
  {
    country: 'Austria',
    flag: '🇦🇹',
    required: 'Mandatory',
    amount: '€12,768/year (€1,064/month)',
    description: 'Similar to Germany, Austria requires non-EU students to prove sufficient funds through a blocked account.',
    notes: 'Can also show scholarship proof or sponsor guarantee as alternatives.',
  },
  {
    country: 'Netherlands',
    flag: '🇳🇱',
    required: 'Proof of Funds',
    amount: '€13,176/year',
    description: 'Not specifically a blocked account, but proof of sufficient funds is required. Bank statement or scholarship letter accepted.',
    notes: 'Amount may vary. Check with IND (immigration) for current requirements.',
  },
  {
    country: 'France',
    flag: '🇫🇷',
    required: 'Proof of Funds',
    amount: '€615/month minimum',
    description: 'Proof of financial resources required. Can be bank statement, sponsor letter, or scholarship.',
    notes: 'Campus France may require additional documentation.',
  },
  {
    country: 'Italy',
    flag: '🇮🇹',
    required: 'Proof of Funds',
    amount: '€6,000-8,000/year',
    description: 'Financial guarantee required. Bank statement, scholarship, or sponsor letter accepted.',
    notes: 'Requirements vary by consulate. Check specific embassy requirements.',
  },
  {
    country: 'Spain',
    flag: '🇪🇸',
    required: 'Proof of Funds',
    amount: '€600/month (IPREM)',
    description: 'Based on IPREM indicator. Bank statement or sponsor letter showing sufficient funds.',
    notes: 'Some consulates prefer funds in a Spanish bank account.',
  },
  {
    country: 'Poland',
    flag: '🇵🇱',
    required: 'Proof of Funds',
    amount: '€700/month',
    description: 'Proof of financial means required. Bank statement or scholarship letter accepted.',
    notes: 'Lower cost of living means lower financial requirements.',
  },
  {
    country: 'Czech Republic',
    flag: '🇨🇿',
    required: 'Proof of Funds',
    amount: 'CZK 85,800/year (~€3,500)',
    description: 'Proof of financial means required for visa. Bank statement with sufficient balance.',
    notes: 'Relatively low financial requirement compared to Western Europe.',
  },
  {
    country: 'Hungary',
    flag: '🇭🇺',
    required: 'Proof of Funds',
    amount: '€5,000-6,000/year',
    description: 'Financial proof required. Scholarship, bank statement, or sponsor letter.',
    notes: 'Stipendium Hungaricum scholarship covers all costs if awarded.',
  },
  {
    country: 'Finland',
    flag: '🇫🇮',
    required: 'Mandatory',
    amount: '€6,720/year (€560/month)',
    description: 'Proof of funds required for residence permit. Bank statement or scholarship letter.',
    notes: 'Must show funds available for entire study period or first year.',
  },
  {
    country: 'Portugal',
    flag: '🇵🇹',
    required: 'Proof of Funds',
    amount: '€760/month (minimum wage)',
    description: 'Financial proof required for visa. Bank statement or sponsor documentation.',
    notes: 'Relatively affordable compared to other Western European countries.',
  },
];

const sampleMotivationLetter = `[Your Full Name]
[Your Address]
[City, Postal Code, Country]
[Email Address]
[Phone Number]
[Date]

Admissions Committee
[University Name]
[Department/Faculty]
[University Address]

Subject: Application for [Program Name] - Academic Year 2026/2027

Dear Members of the Admissions Committee,

I am writing to express my strong interest in pursuing the [Program Name] at [University Name] for the upcoming academic year. With a solid academic foundation in [Your Field] and a passion for [Relevant Area], I am confident that this program aligns perfectly with my career aspirations and academic goals.

ACADEMIC BACKGROUND

I completed my [Bachelor's/High School] degree in [Subject] from [Institution Name], graduating with [GPA/Percentage/Honors]. During my studies, I developed a strong foundation in [Key Subjects], which sparked my interest in [Specific Area of Study]. My academic journey has equipped me with critical thinking skills and a deep appreciation for [Field].

RELEVANT EXPERIENCE

[Describe internships, research projects, or relevant work experience. Be specific about what you learned and accomplished.]

During my internship at [Company/Organization], I gained practical experience in [Specific Skills]. This experience reinforced my desire to pursue advanced studies in [Field] and contribute to [Industry/Research Area].

WHY [UNIVERSITY NAME]?

I am particularly drawn to [University Name] because of its excellent reputation in [Field], world-class faculty, and innovative approach to education. The [Specific Program Feature, Research Center, or Course] particularly interests me, as it aligns with my goal to [Career Objective].

Furthermore, studying in [Country] will provide me with an international perspective and expose me to diverse cultures and ideas, which I believe is essential in today's globalized world.

FUTURE GOALS

Upon completing this program, I plan to [Describe your career goals - whether continuing to PhD, working in industry, returning to home country, etc.]. I am committed to applying the knowledge and skills gained to make meaningful contributions to [Field/Industry/Society].

I am confident that my academic background, relevant experience, and strong motivation make me a suitable candidate for this program. I would be honored to join [University Name] and contribute to its academic community.

Thank you for considering my application. I look forward to the opportunity to discuss my candidacy further.

Sincerely,

[Your Signature]
[Your Full Name]`;

const sampleSalaryCertificate = `[COMPANY LETTERHEAD]

SALARY CERTIFICATE / INCOME VERIFICATION

Date: [Current Date]
Reference No: [HR Reference Number]

TO WHOM IT MAY CONCERN

This is to certify that:

EMPLOYEE DETAILS:
Full Name: [Sponsor's Full Name]
Employee ID: [Employee ID Number]
Designation: [Job Title]
Department: [Department Name]
Date of Joining: [Start Date]
Employment Status: Permanent / Full-time

SALARY DETAILS:
Monthly Gross Salary: [Currency] [Amount]
Annual Gross Salary: [Currency] [Amount]
Net Monthly Salary (After Deductions): [Currency] [Amount]

ADDITIONAL BENEFITS:
- Housing Allowance: [Currency] [Amount] per month
- Transportation Allowance: [Currency] [Amount] per month
- Other Benefits: [List any additional benefits]

PURPOSE:
This certificate is issued upon the request of the employee for the purpose of sponsoring their [son/daughter/ward], [Student's Full Name], for higher education studies at [University Name, if known] in [Country].

SPONSOR'S COMMITMENT:
[Sponsor's Name] has confirmed their commitment to financially support [Student's Full Name] throughout the duration of their studies, covering tuition fees, living expenses, accommodation, health insurance, and other related costs.

VERIFICATION:
For any verification or additional information, please contact:
HR Department: [Phone Number]
Email: [HR Email Address]

This certificate is issued without any liability on the part of [Company Name].

_______________________________
[Authorized Signatory Name]
[Designation]
[Company Name]
[Company Stamp/Seal]

Contact Information:
[Company Address]
[Phone Number]
[Email Address]
[Website]`;

const sampleSponsorshipCertificate = `SPONSORSHIP CERTIFICATE / AFFIDAVIT OF SUPPORT

Date: [Current Date]

TO WHOM IT MAY CONCERN

I, [Sponsor's Full Name], holder of [Passport/National ID] Number [ID Number], residing at [Full Address], hereby declare and affirm the following:

SPONSOR DETAILS:
Full Name: [Sponsor's Full Name]
Relationship to Student: [Father/Mother/Legal Guardian/Uncle/Other]
Occupation: [Job Title/Profession]
Employer: [Company/Organization Name]
Monthly Income: [Currency] [Amount]
Contact Number: [Phone Number]
Email: [Email Address]

STUDENT DETAILS:
Full Name: [Student's Full Name]
Date of Birth: [DD/MM/YYYY]
Passport Number: [Passport Number]
Relationship: [Son/Daughter/Ward/Nephew/Niece]

DECLARATION OF SPONSORSHIP:

I hereby declare that I will fully sponsor [Student's Full Name] for their higher education studies at [University Name] in [Country] for the academic year [Year].

I commit to bear all expenses related to:
1. Tuition Fees: Approximately [Currency] [Amount] per year
2. Living Expenses: Approximately [Currency] [Amount] per month
3. Accommodation: Approximately [Currency] [Amount] per month
4. Health Insurance: As required by the university/country
5. Travel Expenses: Round-trip airfare and local transportation
6. Books and Study Materials: As required
7. Other Miscellaneous Expenses: As needed

FINANCIAL CAPACITY:
I confirm that I have sufficient financial resources to support the above-mentioned student throughout the duration of their studies. My bank statements for the last [3-6] months are attached as evidence of my financial capacity.

Total Estimated Cost of Studies: [Currency] [Total Amount]
Duration of Studies: [Number] years

I understand that this sponsorship is a binding commitment and I will ensure uninterrupted financial support until the completion of [Student's Full Name]'s studies.

DECLARATION:
I solemnly declare that all information provided above is true and correct to the best of my knowledge. I understand that any false statement may result in the rejection of the visa application or cancellation of the student's enrollment.

_______________________________
[Sponsor's Signature]
[Sponsor's Full Name]
Date: [Current Date]

WITNESS (if required):
Name: [Witness Full Name]
Signature: _______________________________
Date: [Current Date]

NOTARIZATION (if required):
[Notary Stamp/Seal]
Notary Public: [Notary Name]
Date: [Current Date]
Registration No: [Notary Registration Number]`;

export default function ApplicationResources() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${type} template copied to clipboard`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-2 cursor-pointer" 
              onClick={() => setLocation('/')}
              data-testid="button-back-home"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="h-6 w-px bg-slate-300 dark:bg-slate-700" />
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Application Resources</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div>
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100">
              Free Resources
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Everything You Need to Apply
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Sample documents, checklists, and application portal information to help you prepare your university and visa applications.
            </p>
          </div>

          <Tabs defaultValue="documents" className="space-y-8">
            <TabsList className="grid grid-cols-5 w-full max-w-2xl mx-auto h-auto gap-2 p-2 bg-slate-100 dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
              <TabsTrigger 
                value="documents" 
                className="flex flex-col items-center gap-1.5 py-3 px-2 text-[10px] sm:text-xs font-medium rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-md data-[state=active]:text-emerald-600 dark:data-[state=active]:text-emerald-400 transition-all" 
                data-testid="tab-documents"
              >
                <ClipboardList className="w-5 h-5" />
                <span className="text-center leading-tight">Required Docs</span>
              </TabsTrigger>
              <TabsTrigger 
                value="blocked" 
                className="flex flex-col items-center gap-1.5 py-3 px-2 text-[10px] sm:text-xs font-medium rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-md data-[state=active]:text-emerald-600 dark:data-[state=active]:text-emerald-400 transition-all" 
                data-testid="tab-blocked"
              >
                <Landmark className="w-5 h-5" />
                <span className="text-center leading-tight">Blocked Account</span>
              </TabsTrigger>
              <TabsTrigger 
                value="motivation" 
                className="flex flex-col items-center gap-1.5 py-3 px-2 text-[10px] sm:text-xs font-medium rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-md data-[state=active]:text-emerald-600 dark:data-[state=active]:text-emerald-400 transition-all" 
                data-testid="tab-motivation"
              >
                <FileText className="w-5 h-5" />
                <span className="text-center leading-tight">Motivation Letter</span>
              </TabsTrigger>
              <TabsTrigger 
                value="salary" 
                className="flex flex-col items-center gap-1.5 py-3 px-2 text-[10px] sm:text-xs font-medium rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-md data-[state=active]:text-emerald-600 dark:data-[state=active]:text-emerald-400 transition-all" 
                data-testid="tab-salary"
              >
                <CreditCard className="w-5 h-5" />
                <span className="text-center leading-tight">Salary Certificate</span>
              </TabsTrigger>
              <TabsTrigger 
                value="portals" 
                className="flex flex-col items-center gap-1.5 py-3 px-2 text-[10px] sm:text-xs font-medium rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-md data-[state=active]:text-emerald-600 dark:data-[state=active]:text-emerald-400 transition-all" 
                data-testid="tab-portals"
              >
                <Globe className="w-5 h-5" />
                <span className="text-center leading-tight">Admission Portals</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="documents" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-blue-600" />
                      University Admission Documents
                    </CardTitle>
                    <CardDescription>
                      Scanned Copies Documents (in PDF, JPEG, JPG Format) required for university applications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {admissionDocuments.map((doc, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                        <CheckCircle2 className={`w-5 h-5 mt-0.5 flex-shrink-0 ${doc.required ? 'text-emerald-500' : 'text-slate-400'}`} />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-slate-900 dark:text-white">{doc.name}</span>
                            {doc.required ? (
                              <Badge variant="destructive" className="text-xs">Required</Badge>
                            ) : (
                              <Badge variant="secondary" className="text-xs">Optional</Badge>
                            )}
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{doc.description}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plane className="w-5 h-5 text-purple-600" />
                      Student Visa Documents
                    </CardTitle>
                    <CardDescription>
                      Documents typically required for student visa applications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {visaDocuments.map((doc, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                        <CheckCircle2 className={`w-5 h-5 mt-0.5 flex-shrink-0 ${doc.required ? 'text-emerald-500' : 'text-slate-400'}`} />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-slate-900 dark:text-white">{doc.name}</span>
                            {doc.required ? (
                              <Badge variant="destructive" className="text-xs">Required</Badge>
                            ) : (
                              <Badge variant="secondary" className="text-xs">If Applicable</Badge>
                            )}
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{doc.description}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-950/30 dark:to-emerald-950/30 border-blue-200 dark:border-blue-800">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Shield className="w-8 h-8 text-blue-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Important Tips</h3>
                      <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                        <li>• All documents must be officially translated if not in English or the local language</li>
                        <li>• Keep both physical and digital copies of all documents</li>
                        <li>• Start gathering documents at least 3-4 months before deadline</li>
                        <li>• Check specific university requirements as they may vary</li>
                        <li>• Apostille or notarization may be required for some documents</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="blocked" className="space-y-8">
              <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-200 dark:border-amber-800">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="w-8 h-8 text-amber-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">What is a Blocked Account?</h3>
                      <p className="text-sm text-amber-800 dark:text-amber-200 mb-3">
                        A <strong>blocked account (Sperrkonto)</strong> is a special bank account required by some countries to prove you have sufficient funds to support yourself during your studies. The money is "blocked" and released to you monthly after you arrive.
                      </p>
                      <ul className="space-y-1 text-sm text-amber-800 dark:text-amber-200">
                        <li>• <strong>Germany & Austria:</strong> Mandatory blocked account required for visa</li>
                        <li>• <strong>Other countries:</strong> Proof of funds via bank statement or scholarship</li>
                        <li>• Open the account <strong>before</strong> your visa appointment</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <Lock className="w-5 h-5 text-blue-600" />
                  Blocked Account Providers
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {blockedAccountProviders.map((provider) => (
                    <Card key={provider.name} className={provider.highlight ? 'border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20' : ''}>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xl">{provider.flag}</span>
                              <h4 className="font-semibold text-slate-900 dark:text-white">{provider.name}</h4>
                              {provider.highlight && (
                                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">Recommended</Badge>
                              )}
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">For {provider.country}</p>
                          </div>
                          <a href={provider.website} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm" className="gap-1">
                              <ExternalLink className="w-3 h-3" />
                              Visit
                            </Button>
                          </a>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                          <div>
                            <p className="text-slate-500 dark:text-slate-400">Min. Deposit</p>
                            <p className="font-semibold text-slate-900 dark:text-white">{provider.minDeposit}</p>
                          </div>
                          <div>
                            <p className="text-slate-500 dark:text-slate-400">Monthly Release</p>
                            <p className="font-semibold text-slate-900 dark:text-white">{provider.monthlyRelease}</p>
                          </div>
                          <div>
                            <p className="text-slate-500 dark:text-slate-400">Setup Fee</p>
                            <p className="font-semibold text-slate-900 dark:text-white">{provider.setupFee}</p>
                          </div>
                          <div>
                            <p className="text-slate-500 dark:text-slate-400">Processing</p>
                            <p className="font-semibold text-slate-900 dark:text-white">{provider.processingTime}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {provider.features.map((feature, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">{feature}</Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <Globe className="w-5 h-5 text-emerald-600" />
                  Financial Requirements by Country
                </h3>
                <div className="grid gap-3">
                  {blockedAccountRequirements.map((req) => (
                    <Card key={req.country}>
                      <CardContent className="py-4">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div className="flex items-center gap-3 md:w-40">
                            <span className="text-2xl">{req.flag}</span>
                            <span className="font-semibold text-slate-900 dark:text-white">{req.country}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <Badge className={req.required === 'Mandatory' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100' : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'}>
                                {req.required}
                              </Badge>
                              <span className="font-semibold text-emerald-600 dark:text-emerald-400">{req.amount}</span>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{req.description}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-500 italic">{req.notes}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-blue-200 dark:border-blue-800">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Shield className="w-8 h-8 text-blue-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-2">How to Open a Blocked Account</h3>
                      <ol className="space-y-2 text-sm text-slate-700 dark:text-slate-300 list-decimal list-inside">
                        <li>Choose a provider (Expatrio or Fintiba recommended for Germany)</li>
                        <li>Create an account on their website with your passport details</li>
                        <li>Pay the setup fee and transfer the required deposit amount</li>
                        <li>Receive the blocking confirmation letter (needed for visa)</li>
                        <li>After arriving and registering, funds are released monthly to your regular account</li>
                      </ol>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-3">
                        <strong>Tip:</strong> Open your blocked account 2-3 weeks before your visa appointment to allow time for processing and receiving the confirmation letter.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="motivation" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Sample Letter of Intent / Motivation Letter
                  </CardTitle>
                  <CardDescription>
                    A professional template you can customize for your university application
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 mb-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => copyToClipboard(sampleMotivationLetter, 'Motivation letter')}
                      className="gap-2"
                      data-testid="button-copy-motivation"
                    >
                      <Copy className="w-4 h-4" />
                      Copy Template
                    </Button>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 max-h-[600px] overflow-y-auto">
                    <pre className="whitespace-pre-wrap font-mono text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                      {sampleMotivationLetter}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-3">Writing Tips</h3>
                  <ul className="space-y-2 text-sm text-amber-800 dark:text-amber-200">
                    <li>• Be specific about why you chose this particular university and program</li>
                    <li>• Connect your past experiences to your future goals</li>
                    <li>• Show genuine enthusiasm and motivation</li>
                    <li>• Keep it to 1-2 pages maximum</li>
                    <li>• Proofread carefully for grammar and spelling errors</li>
                    <li>• Customize for each university - avoid generic letters</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="salary" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-purple-600" />
                    Sample Salary Certificate for Sponsors
                  </CardTitle>
                  <CardDescription>
                    Template for sponsors (parents/guardians) to obtain from their employer
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 mb-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => copyToClipboard(sampleSalaryCertificate, 'Salary certificate')}
                      className="gap-2"
                      data-testid="button-copy-salary"
                    >
                      <Copy className="w-4 h-4" />
                      Copy Template
                    </Button>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 max-h-[600px] overflow-y-auto">
                    <pre className="whitespace-pre-wrap font-mono text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                      {sampleSalaryCertificate}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-emerald-600" />
                    Sample Sponsorship Certificate / Affidavit of Support
                  </CardTitle>
                  <CardDescription>
                    Template for sponsors (parents/guardians) to declare financial support for the student
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 mb-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => copyToClipboard(sampleSponsorshipCertificate, 'Sponsorship certificate')}
                      className="gap-2"
                      data-testid="button-copy-sponsorship"
                    >
                      <Copy className="w-4 h-4" />
                      Copy Template
                    </Button>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 max-h-[600px] overflow-y-auto">
                    <pre className="whitespace-pre-wrap font-mono text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                      {sampleSponsorshipCertificate}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-3">Sponsor Documentation Tips</h3>
                  <ul className="space-y-2 text-sm text-purple-800 dark:text-purple-200">
                    <li>• Certificate must be on official company letterhead with stamp/seal</li>
                    <li>• Include contact information for verification purposes</li>
                    <li>• Document should be recent (within last 3 months)</li>
                    <li>• Also provide sponsor's bank statements (last 6 months)</li>
                    <li>• Include a separate affidavit of support if required by embassy</li>
                    <li>• Get the certificate translated if not in English</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="portals" className="space-y-6">
              <div className="grid gap-4">
                {applicationPortals.map((portal) => (
                  <div key={portal.country}>
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div className="flex items-center gap-3 md:w-48">
                            <span className="text-3xl">{portal.flag}</span>
                            <div>
                              <h3 className="font-semibold text-slate-900 dark:text-white">{portal.country}</h3>
                              <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">{portal.portal}</p>
                            </div>
                          </div>
                          <div className="flex-1 space-y-2">
                            <p className="text-sm text-slate-600 dark:text-slate-400">{portal.description}</p>
                            <div className="flex flex-wrap gap-2 text-xs">
                              <Badge variant="outline">{portal.coverage}</Badge>
                              <Badge variant="outline">Cost: {portal.cost}</Badge>
                              <Badge variant="outline">Deadline: {portal.deadline}</Badge>
                            </div>
                          </div>
                          {portal.website && (
                            <a 
                              href={portal.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex-shrink-0"
                            >
                              <Button variant="outline" size="sm" className="gap-2">
                                <ExternalLink className="w-4 h-4" />
                                Visit Portal
                              </Button>
                            </a>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>

              <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950/30 dark:to-blue-950/30 border-emerald-200 dark:border-emerald-800">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Globe className="w-8 h-8 text-emerald-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Application Timeline Tips</h3>
                      <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                        <li>• <strong>9-12 months before:</strong> Research programs and prepare documents</li>
                        <li>• <strong>6-9 months before:</strong> Take language tests (IELTS/TOEFL)</li>
                        <li>• <strong>4-6 months before:</strong> Submit university applications</li>
                        <li>• <strong>3-4 months before:</strong> Receive admission decisions</li>
                        <li>• <strong>2-3 months before:</strong> Apply for student visa</li>
                        <li>• <strong>1 month before:</strong> Arrange accommodation and travel</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-8 mt-20 border-t border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm max-w-2xl mx-auto">
            An <a href="https://iqbal.app" className="text-white hover:text-emerald-400 transition-colors font-medium" target="_blank" rel="noopener noreferrer">Iqbal.app</a> initiative, powered by intelligent systems to deliver precision-driven insights and next-generation information clarity.
          </p>
          <p className="text-xs pt-4 mt-4 border-t border-slate-800 w-full max-w-lg mx-auto">
            © 2026 AdmissionEU. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
