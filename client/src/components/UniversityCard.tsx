import { memo, useCallback } from 'react';
import { University } from '@shared/schema';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, ExternalLink } from 'lucide-react';

interface UniversityCardProps {
  university: University;
  onSelect: (university: University) => void;
}

const countryFlags: Record<string, string> = {
  'Spain': '🇪🇸',
  'Germany': '🇩🇪',
  'Hungary': '🇭🇺',
  'France': '🇫🇷',
  'Italy': '🇮🇹',
  'Netherlands': '🇳🇱',
};

export const UniversityCard = memo(function UniversityCard({ university, onSelect }: UniversityCardProps) {
  const handleClick = useCallback(() => {
    onSelect(university);
  }, [university, onSelect]);

  const handleButtonClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(university);
  }, [university, onSelect]);

  return (
    <div className="transform transition-transform duration-200 hover:-translate-y-1">
      <Card className="h-full flex flex-col border-border/50 hover:border-primary/20 hover:shadow-lg transition-all duration-300 bg-white dark:bg-slate-900 overflow-hidden group cursor-pointer" onClick={handleClick} data-testid={`card-university-${university.id}`}>
        <CardHeader className="pb-3 relative">
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-1">
                <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider ${university.type === 'Public' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'}`} data-testid={`badge-type-${university.id}`}>
                  {university.type}
                </span>
                {university.englishPrograms && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 text-[10px] uppercase tracking-wider" data-testid={`badge-english-${university.id}`}>
                    English Taught
                  </span>
                )}
              </div>
              <CardTitle className="text-xl font-bold leading-tight group-hover:text-primary transition-colors" data-testid={`text-name-${university.id}`}>
                {university.name}
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground" data-testid={`text-location-${university.id}`}>
            <span className="text-base">{countryFlags[university.country] || '🏛️'}</span>
            <MapPin className="w-4 h-4 text-primary/70" />
            <span>{university.city}, {university.region}</span>
          </div>
          
          <div className="space-y-2">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Core Domains</div>
            <div className="flex flex-wrap gap-1.5">
              {university.domains.slice(0, 3).map((domain) => (
                <Badge key={domain} variant="secondary" className="font-normal text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200" data-testid={`badge-domain-${domain}-${university.id}`}>
                  {domain}
                </Badge>
              ))}
              {university.domains.length > 3 && (
                <Badge variant="outline" className="font-normal text-xs">+{university.domains.length - 3}</Badge>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-4 border-t border-border/40 bg-slate-50/50 dark:bg-slate-900/50">
          <Button 
            variant="ghost" 
            className="w-full justify-between hover:bg-primary hover:text-white group-hover:bg-primary group-hover:text-white transition-all duration-300"
            onClick={handleButtonClick}
            data-testid={`button-details-${university.id}`}
          >
            View Details
            <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
});
