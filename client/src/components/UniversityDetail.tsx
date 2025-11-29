import { University } from '@shared/schema';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { MapPin, Calendar, BookOpen, ShieldCheck, ExternalLink, CheckCircle2 } from 'lucide-react';

interface UniversityDetailProps {
  university: University | null;
  isOpen: boolean;
  onClose: () => void;
}

export function UniversityDetail({ university, isOpen, onClose }: UniversityDetailProps) {
  if (!university) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0 overflow-hidden bg-white dark:bg-slate-950 border-none shadow-2xl" data-testid="dialog-university-detail">
        <div className="relative h-32 bg-gradient-to-r from-slate-900 to-slate-800 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
          <div className="relative z-10 text-center p-6 w-full">
            <h2 className="text-3xl font-bold text-white font-heading tracking-tight" data-testid="text-detail-name">{university.name}</h2>
            <div className="flex justify-center items-center gap-2 mt-2 text-slate-300">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium" data-testid="text-detail-location">{university.city}, {university.region}</span>
            </div>
          </div>
        </div>

        <ScrollArea className="max-h-[calc(90vh-8rem)]">
          <div className="p-6 space-y-8">
            <div className="flex flex-wrap gap-3">
              <Badge className={`px-3 py-1 text-sm ${university.type === 'Public' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-amber-600 hover:bg-amber-700'}`} data-testid="badge-detail-type">
                {university.type} University
              </Badge>
              {university.englishPrograms && (
                <Badge variant="outline" className="px-3 py-1 text-sm border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20" data-testid="badge-detail-english">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> English Programs Available
                </Badge>
              )}
              {university.ranking && (
                <Badge variant="outline" className="px-3 py-1 text-sm border-slate-300 dark:border-slate-700" data-testid="badge-detail-ranking">
                  Rank #{university.ranking} in Spain
                </Badge>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" /> About
                  </h3>
                  <p className="text-muted-foreground leading-relaxed" data-testid="text-detail-description">
                    {university.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Core Study Domains</h3>
                  <div className="flex flex-wrap gap-2">
                    {university.domains.map((domain) => (
                      <Badge key={domain} variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300" data-testid={`badge-detail-domain-${domain}`}>
                        {domain}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-100 dark:border-slate-800 space-y-4">
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground uppercase mb-1">Admission Period</div>
                    <div className="flex items-center gap-2 font-medium" data-testid="text-detail-admission">
                      <Calendar className="w-4 h-4 text-primary" />
                      {university.admissionPeriod}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground uppercase mb-1">Languages</div>
                    <div className="flex flex-wrap gap-1">
                      {university.languages.map(lang => (
                        <span key={lang} className="text-sm font-medium text-foreground bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700" data-testid={`text-detail-language-${lang}`}>
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <div className="text-xs font-semibold text-muted-foreground uppercase mb-1">Verification</div>
                    <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Officially Accredited</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full" asChild size="lg" data-testid="button-visit-website">
                  <a href={university.website} target="_blank" rel="noopener noreferrer">
                    Visit Official Website
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
                
                <p className="text-xs text-center text-muted-foreground">
                  *Always verify details via the official university website.
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
