import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  ArrowLeft,
  Smartphone,
  CreditCard,
  CheckCircle2,
  ExternalLink,
  Wifi,
  Building2,
  FileText,
  Bus,
  Heart,
  Home,
  Globe,
  Euro,
  Shield,
  Clock,
  Star
} from 'lucide-react';

const countryData: Record<string, {
  flag: string;
  simCards: Array<{
    name: string;
    price: string;
    data: string;
    network: string;
    highlight?: boolean;
    notes: string;
  }>;
  banks: Array<{
    name: string;
    type: string;
    monthlyFee: string;
    highlight?: boolean;
    pros: string[];
    website?: string;
  }>;
  essentials: Array<{
    task: string;
    deadline: string;
    description: string;
    documents?: string[];
  }>;
}> = {
  'Czech Republic': {
    flag: '🇨🇿',
    simCards: [
      { name: 'Vodafone CZ', price: '300-500 CZK/month', data: '10-30GB', network: 'Vodafone', highlight: true, notes: 'Best coverage, student discounts' },
      { name: 'T-Mobile CZ', price: '400-600 CZK/month', data: '15-40GB', network: 'T-Mobile', highlight: true, notes: 'Reliable network, good data' },
      { name: 'O2 CZ', price: '350-550 CZK/month', data: '10-30GB', network: 'O2', notes: 'Third major carrier, competitive' },
      { name: 'Kaktus', price: '200-400 CZK/month', data: '5-20GB', network: 'T-Mobile', notes: 'Budget MVNO option' },
      { name: 'Sazkamobil', price: '249 CZK/month', data: '4GB', network: 'O2', notes: 'Very affordable prepaid' },
    ],
    banks: [
      { name: 'Revolut', type: 'Digital Bank', monthlyFee: '€0', highlight: true, pros: ['CZK account', 'No documents needed', 'Multi-currency'], website: 'https://revolut.com' },
      { name: 'Wise', type: 'Money Account', monthlyFee: '€0', highlight: true, pros: ['Great for transfers', 'Low fees', 'Multi-currency'], website: 'https://wise.com' },
      { name: 'Fio Banka', type: 'Traditional', monthlyFee: '0 CZK', highlight: true, pros: ['Completely free', 'Free ATM withdrawals', 'English support'] },
      { name: 'ČSOB', type: 'Traditional', monthlyFee: '0 CZK (students)', pros: ['Large bank', 'Student accounts free', 'Branch network'] },
      { name: 'Česká spořitelna', type: 'Traditional', monthlyFee: '0 CZK (students)', pros: ['Largest Czech bank', 'George app', 'Student offers'] },
    ],
    essentials: [
      { task: 'Temporary Residence Permit', deadline: 'Within 3 days of arrival', description: 'Non-EU students must report at Foreign Police within 3 working days.', documents: ['Passport', 'Visa', 'Proof of accommodation', 'Photos'] },
      { task: 'Health Insurance', deadline: 'Before arrival', description: 'VZP or private insurance. EU students use EHIC. ~500-1500 CZK/month for non-EU.', documents: ['Passport', 'Enrollment letter'] },
      { task: 'Student ISIC Card', deadline: 'At university', description: 'International student ID with discounts on transport, museums, and more.' },
      { task: 'Lítačka Transport Card', deadline: 'First week in Prague', description: 'Prague transport pass. Students get 50% discount with valid university ID.' },
      { task: 'Bank Account', deadline: 'First 2 weeks', description: 'Fio Banka offers free accounts for everyone including foreigners.' },
    ],
  },
  'Germany': {
    flag: '🇩🇪',
    simCards: [
      { name: 'Lidl Connect', price: '€8.99/4 weeks', data: '10GB', network: 'Vodafone', highlight: true, notes: 'Best budget option, unlimited calls/texts' },
      { name: 'Aldi Talk', price: '€14.99/4 weeks', data: '30GB', network: 'O2', highlight: true, notes: 'Great value, EU roaming included' },
      { name: 'Lebara', price: '€14.99/month', data: '10GB', network: 'O2', notes: 'English website/support, international calls' },
      { name: 'SIMon Mobile', price: '€11.99/month', data: '20GB', network: 'Vodafone', notes: 'Post-paid, cancel monthly' },
      { name: 'O2 Free M Youth', price: '€15/month', data: '25GB', network: 'O2', notes: 'Under 29 or student ID required' },
    ],
    banks: [
      { name: 'N26', type: 'Digital Bank', monthlyFee: '€0', highlight: true, pros: ['German IBAN', '€100k deposit protection', 'English app', '3 free ATM withdrawals/month'], website: 'https://n26.com' },
      { name: 'Revolut', type: 'Digital Bank', monthlyFee: '€0', pros: ['Easy signup', 'Multi-currency', '€200 free ATM/month', 'Virtual cards'], website: 'https://revolut.com' },
      { name: 'Wise', type: 'Money Account', monthlyFee: '€0', highlight: true, pros: ['Best for international transfers', 'Low fees', 'Multi-currency'], website: 'https://wise.com' },
      { name: 'Deutsche Bank', type: 'Traditional', monthlyFee: '€0 (students)', pros: ['Free for students under 30', 'Branch network', 'Local support'] },
      { name: 'Sparkasse', type: 'Traditional', monthlyFee: '€0-5', pros: ['Largest ATM network', 'Local branches', 'Student accounts'] },
    ],
    essentials: [
      { task: 'City Registration (Anmeldung)', deadline: 'Within 14 days', description: 'Register your address at the local Bürgeramt. This is mandatory and needed for everything else.', documents: ['Passport', 'Rental contract (Wohnungsgeberbestätigung)', 'Visa'] },
      { task: 'Health Insurance', deadline: 'Before enrollment', description: 'Public insurance (TK, AOK, Barmer) ~€120/month for students. Private options available for 30+.', documents: ['Passport', 'University enrollment letter'] },
      { task: 'Bank Account', deadline: 'First 2 weeks', description: 'Open a German bank account for rent, salary, and monthly payments.' },
      { task: 'Semester Ticket', deadline: 'At enrollment', description: 'Included in semester fees (€150-350). Covers public transport in your city/region.' },
      { task: 'Residence Permit', deadline: 'Before visa expires', description: 'Non-EU students must apply at Ausländerbehörde for residence permit.', documents: ['Passport', 'Anmeldung', 'Health insurance', 'Blocked account proof', 'Photos'] },
    ],
  },
  'France': {
    flag: '🇫🇷',
    simCards: [
      { name: 'Free Mobile', price: '€10.99/month', data: '110GB', network: 'Free', highlight: true, notes: 'Best value, unlimited calls/texts' },
      { name: 'RED by SFR', price: '€15/month', data: '100GB', network: 'SFR', highlight: true, notes: 'No contract, EU roaming' },
      { name: 'Lebara', price: '€13.99/4 weeks', data: '30GB', network: 'SFR', notes: 'English website, free SIM' },
      { name: 'Sosh', price: '€15/month', data: '100GB+', network: 'Orange', notes: 'Orange subsidiary, reliable' },
      { name: 'B&You', price: '€10-15/month', data: '80GB', network: 'Bouygues', notes: 'Budget-friendly option' },
    ],
    banks: [
      { name: 'N26', type: 'Digital Bank', monthlyFee: '€0', highlight: true, pros: ['French IBAN', 'Easy online opening', 'English support'], website: 'https://n26.com' },
      { name: 'Boursorama', type: 'Digital Bank', monthlyFee: '€0', highlight: true, pros: ['Free French IBAN', 'Welcome bonus', 'Good app'], website: 'https://boursorama.com' },
      { name: 'Revolut', type: 'Digital Bank', monthlyFee: '€0', pros: ['Multi-currency', 'Instant transfers', 'Travel-friendly'], website: 'https://revolut.com' },
      { name: 'BNP Paribas', type: 'Traditional', monthlyFee: '€0 (students)', pros: ['Large branch network', 'Student offers', 'CAF compatible'] },
      { name: 'Société Générale', type: 'Traditional', monthlyFee: '€0 (students)', pros: ['Student packages', 'Overdraft options'] },
    ],
    essentials: [
      { task: 'CAF Registration (Housing Aid)', deadline: 'After moving in', description: 'Apply for APL housing allowance - can cover €100-300/month of rent!', documents: ['Passport', 'Visa', 'Rental contract', 'RIB (bank details)', 'Birth certificate'] },
      { task: 'Social Security (Ameli)', deadline: 'First month', description: 'Register for French health coverage. Free for students!', documents: ['Passport', 'Visa', 'University certificate', 'Proof of address'] },
      { task: 'Navigo Card', deadline: 'First week', description: 'Paris transport pass. Imagine R for students: ~€40/month for unlimited travel.' },
      { task: 'OFII Validation', deadline: 'Within 3 months', description: 'Non-EU students must validate visa with OFII online.', documents: ['Passport', 'Visa', 'Photos', 'Medical form'] },
      { task: 'French Phone Number', deadline: 'First days', description: 'Needed for 2FA, bank accounts, and daily life.' },
    ],
  },
  'Spain': {
    flag: '🇪🇸',
    simCards: [
      { name: 'Orange Spain', price: '€10-20/month', data: '10-50GB', network: 'Orange', highlight: true, notes: 'Best coverage, prepaid available' },
      { name: 'Yoigo', price: '€8-15/month', data: '10-30GB', network: 'Movistar', highlight: true, notes: 'Budget MVNO, good value' },
      { name: 'MásMóvil', price: '€10-20/month', data: '20-50GB', network: 'MásMóvil', notes: 'Growing network, competitive' },
      { name: 'Simyo', price: '€8-15/month', data: '10-30GB', network: 'Orange', notes: 'Budget-friendly' },
      { name: 'Vodafone Yu', price: '€15-25/month', data: '15-40GB', network: 'Vodafone', notes: 'Youth plans available' },
    ],
    banks: [
      { name: 'N26', type: 'Digital Bank', monthlyFee: '€0', highlight: true, pros: ['Spanish IBAN', 'No paperwork', 'English app'], website: 'https://n26.com' },
      { name: 'Revolut', type: 'Digital Bank', monthlyFee: '€0', pros: ['Easy setup', 'Multi-currency', 'Travel features'], website: 'https://revolut.com' },
      { name: 'BBVA', type: 'Traditional', monthlyFee: '€0 (students)', highlight: true, pros: ['Student accounts free', 'Large ATM network', 'Good app'] },
      { name: 'Santander', type: 'Traditional', monthlyFee: '€0 (students)', pros: ['Free for under 25', 'Branch network'] },
      { name: 'CaixaBank', type: 'Traditional', monthlyFee: '€0 (students)', pros: ['Student offers', 'imagin app for youth'] },
    ],
    essentials: [
      { task: 'NIE Number', deadline: 'First priority', description: 'Foreigner ID number. Essential for bank accounts, contracts, work.', documents: ['Passport', 'EX-15 form', 'Proof of address', 'University letter'] },
      { task: 'Empadronamiento', deadline: 'First 2 weeks', description: 'Register at town hall (Ayuntamiento). Needed for NIE and many services.', documents: ['Passport', 'Rental contract'] },
      { task: 'Health Card (TSE)', deadline: 'After registration', description: 'EU students: bring EHIC. Non-EU: private insurance or register for public.' },
      { task: 'TIE Card', deadline: 'Within 30 days', description: 'Non-EU students must get TIE residence card.', documents: ['Passport', 'NIE', 'EX-17 form', 'Photos', 'Fee payment'] },
      { task: 'Transport Card', deadline: 'First week', description: 'Abono Joven in Madrid (~€20/month for under 26), T-Jove in Barcelona.' },
    ],
  },
  'Italy': {
    flag: '🇮🇹',
    simCards: [
      { name: 'Iliad', price: '€7.99/month', data: '150GB', network: 'Iliad', highlight: true, notes: 'Best value in Italy!' },
      { name: 'ho.Mobile', price: '€6.99/month', data: '100GB', network: 'Vodafone', highlight: true, notes: 'Budget MVNO, great coverage' },
      { name: 'TIM', price: '€10-20/month', data: '20-70GB', network: 'TIM', notes: 'Best coverage nationwide' },
      { name: 'WindTre', price: '€7-15/month', data: '50-100GB', network: 'WindTre', notes: 'Good value plans' },
      { name: 'Vodafone', price: '€15-25/month', data: '30-100GB', network: 'Vodafone', notes: 'Youth plans available' },
    ],
    banks: [
      { name: 'N26', type: 'Digital Bank', monthlyFee: '€0', highlight: true, pros: ['Italian IBAN', 'No codice fiscale needed initially', 'English app'], website: 'https://n26.com' },
      { name: 'Revolut', type: 'Digital Bank', monthlyFee: '€0', pros: ['Easy signup', 'Multi-currency', 'No documents needed'], website: 'https://revolut.com' },
      { name: 'Intesa Sanpaolo', type: 'Traditional', monthlyFee: '€0 (students)', highlight: true, pros: ['XME account free under 35', 'Large network'] },
      { name: 'UniCredit', type: 'Traditional', monthlyFee: '€0 (students)', pros: ['Student accounts', 'Buddy Bank digital option'] },
      { name: 'Fineco', type: 'Digital Bank', monthlyFee: '€0', pros: ['Trading features', 'Good for long-term'] },
    ],
    essentials: [
      { task: 'Codice Fiscale', deadline: 'First priority', description: 'Italian tax code. Needed for EVERYTHING - bank, phone, rent, work.', documents: ['Passport', 'Apply at Agenzia delle Entrate'] },
      { task: 'Residence Permit (Permesso)', deadline: 'Within 8 days', description: 'Non-EU students must apply at Post Office within 8 days of arrival.', documents: ['Passport', 'Kit from Post Office', 'Photos', 'Insurance', 'Enrollment proof'] },
      { task: 'Residenza', deadline: 'After permesso', description: 'Register residence at Anagrafe (town registry).', documents: ['Passport', 'Permesso', 'Rental contract'] },
      { task: 'Health Insurance (SSN)', deadline: 'After codice fiscale', description: 'Register for national health service. €150/year for students.' },
      { task: 'Transport Pass', deadline: 'First week', description: 'ATM Milan, ATAC Rome - student discounts available with university ID.' },
    ],
  },
  'Netherlands': {
    flag: '🇳🇱',
    simCards: [
      { name: 'Lebara', price: '€10/month', data: '8GB', network: 'KPN', highlight: true, notes: 'English support, easy activation' },
      { name: 'Simyo', price: '€10-15/month', data: '10-20GB', network: 'KPN', highlight: true, notes: 'Budget-friendly, good coverage' },
      { name: 'Ben', price: '€10-15/month', data: '10GB', network: 'T-Mobile', notes: 'Simple plans, no contract' },
      { name: 'KPN', price: '€15-25/month', data: '15-40GB', network: 'KPN', notes: 'Best coverage' },
      { name: 'Vodafone NL', price: '€15-30/month', data: '20-50GB', network: 'Vodafone', notes: 'Student discounts' },
    ],
    banks: [
      { name: 'bunq', type: 'Digital Bank', monthlyFee: '€0-8', highlight: true, pros: ['Dutch IBAN instantly', 'No BSN needed to start', 'English app'], website: 'https://bunq.com' },
      { name: 'N26', type: 'Digital Bank', monthlyFee: '€0', pros: ['Easy signup', 'German IBAN (works in NL)'], website: 'https://n26.com' },
      { name: 'Revolut', type: 'Digital Bank', monthlyFee: '€0', pros: ['Multi-currency', 'Quick setup'], website: 'https://revolut.com' },
      { name: 'ING', type: 'Traditional', monthlyFee: '€0 (students)', highlight: true, pros: ['Largest Dutch bank', 'Student accounts free', 'iDEAL support'] },
      { name: 'ABN AMRO', type: 'Traditional', monthlyFee: '€0 (students)', pros: ['Student packages', 'Good English support'] },
    ],
    essentials: [
      { task: 'BSN Number', deadline: 'First 5 days', description: 'Citizen Service Number. Book appointment at gemeente before arriving!', documents: ['Passport', 'Rental contract', 'Birth certificate (apostilled)'] },
      { task: 'DigiD', deadline: 'After BSN', description: 'Digital identity for government services. Apply online after getting BSN.' },
      { task: 'Health Insurance', deadline: 'Within 4 months', description: 'Mandatory for everyone. €120-150/month. Students may get zorgtoeslag (subsidy).' },
      { task: 'OV-Chipkaart', deadline: 'First week', description: 'Public transport card. Students can get free off-peak travel through DUO.' },
      { task: 'IND Registration', deadline: 'Non-EU students', description: 'University usually handles this. Collect residence permit at IND.' },
    ],
  },
  'Poland': {
    flag: '🇵🇱',
    simCards: [
      { name: 'Play', price: '30-50 PLN/month', data: '30-100GB', network: 'Play', highlight: true, notes: 'Best for students, good coverage' },
      { name: 'Orange Poland', price: '30-60 PLN/month', data: '20-80GB', network: 'Orange', highlight: true, notes: 'Reliable network' },
      { name: 'Plus', price: '30-50 PLN/month', data: '30-60GB', network: 'Plus', notes: 'Good rural coverage' },
      { name: 'T-Mobile PL', price: '35-60 PLN/month', data: '30-100GB', network: 'T-Mobile', notes: 'Student offers available' },
      { name: 'Heyah', price: '20-35 PLN/month', data: '20-50GB', network: 'T-Mobile', notes: 'Budget MVNO' },
    ],
    banks: [
      { name: 'Revolut', type: 'Digital Bank', monthlyFee: '€0', highlight: true, pros: ['PLN account', 'Easy signup', 'No PESEL needed'], website: 'https://revolut.com' },
      { name: 'mBank', type: 'Digital Bank', monthlyFee: '0 PLN', highlight: true, pros: ['Free for students', 'Good app', 'English support'], website: 'https://mbank.pl' },
      { name: 'PKO BP', type: 'Traditional', monthlyFee: '0 PLN (students)', pros: ['Largest Polish bank', 'Wide ATM network'] },
      { name: 'Santander PL', type: 'Traditional', monthlyFee: '0 PLN (students)', pros: ['Student accounts', 'International brand'] },
      { name: 'ING Poland', type: 'Digital Bank', monthlyFee: '0 PLN', pros: ['Good digital banking', 'No monthly fees'] },
    ],
    essentials: [
      { task: 'PESEL Number', deadline: 'First 30 days', description: 'Polish ID number. Apply at local Urząd Gminy (municipality).', documents: ['Passport', 'Visa', 'Proof of address'] },
      { task: 'Temporary Residence Card', deadline: 'Non-EU: within 45 days', description: 'Apply at Voivodeship Office for Karta Pobytu.', documents: ['Passport', 'Photos', 'Health insurance', 'Enrollment proof', 'Financial proof'] },
      { task: 'Zameldowanie', deadline: 'Within 30 days', description: 'Address registration at local office.' },
      { task: 'Health Insurance (NFZ)', deadline: 'At enrollment', description: 'University often provides. Otherwise ~50-100 PLN/month.' },
      { task: 'Student ID (ELS)', deadline: 'At university', description: 'Get your Elektroniczna Legitymacja Studencka for discounts.' },
    ],
  },
  'Hungary': {
    flag: '🇭🇺',
    simCards: [
      { name: 'Yettel', price: '3000-6000 HUF/month', data: '20-100GB', network: 'Yettel', highlight: true, notes: 'Best student plans' },
      { name: 'Telekom HU', price: '3500-7000 HUF/month', data: '20-80GB', network: 'Telekom', highlight: true, notes: 'Best coverage' },
      { name: 'Vodafone HU', price: '3000-6000 HUF/month', data: '20-60GB', network: 'Vodafone', notes: 'Good urban coverage' },
      { name: 'Digi', price: '2000-4000 HUF/month', data: '20-50GB', network: 'Digi', notes: 'Budget option' },
    ],
    banks: [
      { name: 'Revolut', type: 'Digital Bank', monthlyFee: '€0', highlight: true, pros: ['HUF account', 'No documents needed', 'Instant setup'], website: 'https://revolut.com' },
      { name: 'Wise', type: 'Money Account', monthlyFee: '€0', highlight: true, pros: ['Multi-currency', 'Great for transfers'], website: 'https://wise.com' },
      { name: 'OTP Bank', type: 'Traditional', monthlyFee: '0 HUF (students)', pros: ['Largest Hungarian bank', 'Student accounts free'] },
      { name: 'K&H Bank', type: 'Traditional', monthlyFee: '0 HUF (students)', pros: ['Part of KBC Group', 'Good student offers'] },
      { name: 'Erste Bank', type: 'Traditional', monthlyFee: '0 HUF (students)', pros: ['George app', 'Student packages'] },
    ],
    essentials: [
      { task: 'Address Card', deadline: 'Within 3 days', description: 'Register address at local government office.', documents: ['Passport', 'Rental contract'] },
      { task: 'Residence Permit', deadline: 'Non-EU: before visa expires', description: 'Apply at Immigration Office (OIF).', documents: ['Passport', 'Photos', 'Address card', 'Health insurance', 'Financial proof'] },
      { task: 'TAJ Number', deadline: 'For health services', description: 'Social security number. Apply at government office with enrollment.' },
      { task: 'Student ID', deadline: 'At university', description: 'Diákigazolvány for transport and other discounts.' },
      { task: 'BKK Pass', deadline: 'First week', description: 'Budapest transport pass. Students get 50% discount with valid ID.' },
    ],
  },
};

export default function ArrivalGuide() {
  const [, setLocation] = useLocation();
  const [selectedCountry, setSelectedCountry] = useState<string>('Germany');

  const data = countryData[selectedCountry];

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
            <Globe className="w-5 h-5 text-emerald-500" />
            <span className="font-heading font-semibold">Arrival Guide</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100">
            Essential Guide
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold font-heading mb-3">
            Your First Days in Europe
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            SIM cards, bank accounts, and essential tasks to complete when you arrive
          </p>
        </div>

        {/* Country Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {Object.keys(countryData).map((country) => (
            <Button
              key={country}
              variant={selectedCountry === country ? 'default' : 'outline'}
              onClick={() => setSelectedCountry(country)}
              className="gap-2"
              data-testid={`country-${country.toLowerCase()}`}
            >
              <span>{countryData[country].flag}</span>
              {country}
            </Button>
          ))}
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="sim" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto">
            <TabsTrigger value="sim" className="gap-2" data-testid="tab-sim">
              <Smartphone className="w-4 h-4" />
              SIM Cards
            </TabsTrigger>
            <TabsTrigger value="banks" className="gap-2" data-testid="tab-banks">
              <CreditCard className="w-4 h-4" />
              Banks
            </TabsTrigger>
            <TabsTrigger value="essentials" className="gap-2" data-testid="tab-essentials">
              <CheckCircle2 className="w-4 h-4" />
              Essentials
            </TabsTrigger>
          </TabsList>

          {/* SIM Cards Tab */}
          <TabsContent value="sim">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {data.simCards.map((sim, index) => (
                <Card key={index} className={sim.highlight ? 'border-emerald-500 dark:border-emerald-400' : ''}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Wifi className="w-5 h-5 text-blue-500" />
                        {sim.name}
                      </CardTitle>
                      {sim.highlight && (
                        <Badge className="bg-emerald-500">
                          <Star className="w-3 h-3 mr-1" />
                          Top Pick
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-primary">{sim.price}</span>
                      <Badge variant="secondary">{sim.data}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">Network:</span> {sim.network}
                    </div>
                    <p className="text-sm text-muted-foreground">{sim.notes}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card className="mt-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <CardContent className="p-4">
                <h4 className="font-semibold flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-blue-500" />
                  Pro Tips for SIM Cards
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Ensure your phone is unlocked before arriving</li>
                  <li>• Bring your passport - it's required for activation</li>
                  <li>• Buy at carrier stores for help with activation</li>
                  <li>• All EU SIMs include free roaming in other EU countries</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Banks Tab */}
          <TabsContent value="banks">
            <div className="grid gap-4 md:grid-cols-2">
              {data.banks.map((bank, index) => (
                <Card key={index} className={bank.highlight ? 'border-amber-500 dark:border-amber-400' : ''}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Building2 className="w-5 h-5 text-amber-500" />
                          {bank.name}
                        </CardTitle>
                        <CardDescription>{bank.type}</CardDescription>
                      </div>
                      {bank.highlight && (
                        <Badge className="bg-amber-500">
                          <Star className="w-3 h-3 mr-1" />
                          Recommended
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Euro className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{bank.monthlyFee}/month</span>
                    </div>
                    <ul className="text-sm space-y-1">
                      {bank.pros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                    {bank.website && (
                      <Button variant="outline" size="sm" asChild className="w-full mt-2">
                        <a href={bank.website} target="_blank" rel="noopener noreferrer">
                          Visit Website
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-6 bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
              <CardContent className="p-4">
                <h4 className="font-semibold flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-amber-500" />
                  Banking Tips for Students
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Open a digital bank (N26/Revolut) before arrival for immediate access</li>
                  <li>• Get a local bank account for rent payments and official transactions</li>
                  <li>• Use Wise for receiving money from home (lowest fees)</li>
                  <li>• Many traditional banks offer free accounts for students under 25-30</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Essentials Tab */}
          <TabsContent value="essentials">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Essential Tasks Checklist - {selectedCountry}
                </CardTitle>
                <CardDescription>
                  Complete these tasks in order of priority after arriving
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {data.essentials.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-3 text-left">
                          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                            {index + 1}
                          </span>
                          <div>
                            <div className="font-semibold">{item.task}</div>
                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {item.deadline}
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pl-11">
                        <p className="text-muted-foreground mb-3">{item.description}</p>
                        {item.documents && (
                          <div>
                            <p className="text-sm font-medium mb-2">Documents needed:</p>
                            <div className="flex flex-wrap gap-2">
                              {item.documents.map((doc, i) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  {doc}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                <CardContent className="p-4 text-center">
                  <Bus className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <h4 className="font-semibold">Transport</h4>
                  <p className="text-sm text-muted-foreground">Get student transport cards for major discounts</p>
                </CardContent>
              </Card>
              <Card className="bg-rose-50 dark:bg-rose-950 border-rose-200 dark:border-rose-800">
                <CardContent className="p-4 text-center">
                  <Heart className="w-8 h-8 text-rose-500 mx-auto mb-2" />
                  <h4 className="font-semibold">Health Insurance</h4>
                  <p className="text-sm text-muted-foreground">Mandatory in all EU countries</p>
                </CardContent>
              </Card>
              <Card className="bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800">
                <CardContent className="p-4 text-center">
                  <Home className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                  <h4 className="font-semibold">Address Registration</h4>
                  <p className="text-sm text-muted-foreground">Required within days of arrival</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
