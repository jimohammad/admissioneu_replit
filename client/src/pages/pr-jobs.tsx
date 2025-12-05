import { Link } from 'wouter';
import { ArrowLeft, Briefcase, GraduationCap, FileCheck, TrendingUp } from 'lucide-react';

const countries = [
  { name: 'Czech Republic', code: 'CZ', description: 'Growing tech hub with affordable living' },
  { name: 'Finland', code: 'FI', description: 'Innovation leader with high quality of life' },
  { name: 'France', code: 'FR', description: 'Cultural capital with diverse opportunities' },
  { name: 'Germany', code: 'DE', description: 'Europe\'s largest economy with strong job market' },
  { name: 'Hungary', code: 'HU', description: 'Central European gateway with low costs' },
  { name: 'Italy', code: 'IT', description: 'Historic charm meets modern industry' },
  { name: 'Netherlands', code: 'NL', description: 'International hub with English-friendly workplaces' },
  { name: 'Poland', code: 'PL', description: 'Fast-growing economy with IT sector boom' },
  { name: 'Portugal', code: 'PT', description: 'Sunny climate with startup-friendly policies' },
  { name: 'Spain', code: 'ES', description: 'Vibrant culture with growing tech scene' },
  { name: 'Sweden', code: 'SE', description: 'Innovation leader with world-class research universities' },
];

export default function PRJobs() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <main className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6" data-testid="link-back-home">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Home
        </Link>

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-4">
            <Briefcase className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 font-heading">
            PR & Jobs by Country
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Explore permanent residency pathways, work permits, and job market insights for each European country
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 max-w-5xl mx-auto">
          {countries.map(({ name, code, description }) => (
            <Link 
              key={name} 
              href={`/insights/${name}`}
              className="group"
              data-testid={`link-country-${name.toLowerCase().replace(' ', '-')}`}
            >
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 md:p-6 text-center hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-lg transition-all duration-200 h-full flex flex-col items-center justify-center">
                <img 
                  src={`https://flagcdn.com/w80/${code.toLowerCase()}.png`}
                  alt={`${name} flag`}
                  width={80}
                  height={60}
                  loading="lazy"
                  decoding="async"
                  className="w-16 h-12 md:w-20 md:h-14 object-cover rounded-md shadow-sm mb-3 group-hover:scale-105 transition-transform"
                />
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm md:text-base mb-1">
                  {name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 hidden md:block line-clamp-2">
                  {description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 text-center">What You'll Find</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-3">
                <FileCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Visa Requirements</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Student visa types, application process, and required documents</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-3">
                <GraduationCap className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Post-Study Options</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Job seeker visa, work permit pathways after graduation</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-3">
                <TrendingUp className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Job Market</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">In-demand sectors, salary expectations, and job portals</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
