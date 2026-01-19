import { useState } from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft, GraduationCap, Lightbulb, BookOpen, ChevronRight, X, Sparkles, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  educationLevels, 
  subjects, 
  suggestFields,
  type EducationLevel,
  type FieldSuggestion 
} from '@/lib/fieldSuggester';

const fieldIcons: Record<string, string> = {
  'Agriculture & Environment': '🌱',
  'Arts & Design': '🎨',
  'Business & Economics': '📊',
  'Engineering & Technology': '⚙️',
  'Law & Politics': '⚖️',
  'Media & Communication': '📺',
  'Medicine & Health': '🏥',
  'Sciences': '🔬',
  'Social Sciences & Humanities': '📚',
  'Sports & Tourism': '⚽',
};

const fieldColors: Record<string, string> = {
  'Agriculture & Environment': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
  'Arts & Design': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100',
  'Business & Economics': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
  'Engineering & Technology': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100',
  'Law & Politics': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100',
  'Media & Communication': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
  'Medicine & Health': 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100',
  'Sciences': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100',
  'Social Sciences & Humanities': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100',
  'Sports & Tourism': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-100',
};

export default function FieldSuggester() {
  const [, setLocation] = useLocation();
  const [selectedLevel, setSelectedLevel] = useState<EducationLevel | ''>('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<FieldSuggestion[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSubjectToggle = (subject: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
    setHasSearched(false);
  };

  const handleGetSuggestions = () => {
    if (!selectedLevel || selectedSubjects.length === 0) return;
    const results = suggestFields(selectedSubjects, selectedLevel);
    setSuggestions(results);
    setHasSearched(true);
  };

  const handleClearAll = () => {
    setSelectedSubjects([]);
    setSuggestions([]);
    setHasSearched(false);
  };

  const handleExploreField = (field: string) => {
    const domainParam = encodeURIComponent(field);
    setLocation(`/?domain=${domainParam}`);
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
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Field of Study Suggester</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-10">
          <Badge className="mb-4 bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-100">
            <Sparkles className="w-3 h-3 mr-1" />
            Smart Recommendations
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Discover Your Ideal Field of Study
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Select your education level and the subjects you've studied. We'll suggest the best fields of study for your European university journey.
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-violet-600" />
                Step 1: Select Your Education Level
              </CardTitle>
              <CardDescription>
                Choose the highest education level you have completed or are currently pursuing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select 
                value={selectedLevel} 
                onValueChange={(value) => {
                  setSelectedLevel(value as EducationLevel);
                  setHasSearched(false);
                }}
              >
                <SelectTrigger className="w-full max-w-md" data-testid="select-education-level">
                  <SelectValue placeholder="Select education level..." />
                </SelectTrigger>
                <SelectContent>
                  {educationLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Step 2: Select Your Subjects
                {selectedSubjects.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {selectedSubjects.length} selected
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                Click on the subjects you have studied or are interested in (select multiple)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {subjects.map((subject) => (
                  <button
                    key={subject}
                    onClick={() => handleSubjectToggle(subject)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
                      selectedSubjects.includes(subject)
                        ? 'bg-violet-600 text-white shadow-md'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                    }`}
                    data-testid={`subject-${subject.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  >
                    {subject}
                  </button>
                ))}
              </div>
              {selectedSubjects.length > 0 && (
                <div className="mt-4 flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleClearAll}
                    data-testid="button-clear-subjects"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Clear All
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={handleGetSuggestions}
              disabled={!selectedLevel || selectedSubjects.length === 0}
              className="gap-2 bg-violet-600 hover:bg-violet-700 text-white px-8"
              data-testid="button-get-suggestions"
            >
              <Lightbulb className="w-5 h-5" />
              Get Field Suggestions
            </Button>
          </div>

          {hasSearched && (
            <div className="space-y-4 mt-8">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white text-center">
                {suggestions.length > 0 
                  ? `Recommended Fields for You (${suggestions.length})`
                  : 'No Strong Matches Found'
                }
              </h3>

              {suggestions.length === 0 && (
                <Card className="bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800">
                  <CardContent className="pt-6">
                    <p className="text-amber-800 dark:text-amber-200 text-center">
                      We couldn't find strong field matches for your subjects. Try selecting different or additional subjects.
                    </p>
                  </CardContent>
                </Card>
              )}

              {suggestions.map((suggestion, index) => {
                const maxScore = suggestions[0]?.score || 1;
                const normalizedScore = Math.min(100, Math.round((suggestion.score / maxScore) * 100));
                return (
                <Card 
                  key={suggestion.field}
                  className="hover:shadow-lg transition-shadow"
                  data-testid={`suggestion-${index}`}
                >
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${fieldColors[suggestion.field]}`}>
                          {fieldIcons[suggestion.field]}
                        </div>
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div>
                            <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                              {index + 1}. {suggestion.field}
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {suggestion.description}
                            </p>
                          </div>
                          <Badge 
                            variant="outline" 
                            className="self-start sm:self-center whitespace-nowrap"
                          >
                            Match: {normalizedScore}%
                          </Badge>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          <span className="text-xs text-slate-500 dark:text-slate-400 mr-1">Based on:</span>
                          {suggestion.matchedSubjects.map((subject) => (
                            <Badge 
                              key={subject} 
                              variant="secondary" 
                              className="text-xs"
                            >
                              {subject}
                            </Badge>
                          ))}
                        </div>

                        <p className="text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
                          {suggestion.reasoning}
                        </p>

                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleExploreField(suggestion.field)}
                          className="gap-1"
                          data-testid={`button-explore-${suggestion.field.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                        >
                          Explore Universities
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
              })}
            </div>
          )}

          <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 mt-8">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">Guidance Disclaimer</h4>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    These suggestions are based on common academic pathways and are meant to guide your exploration. 
                    Your final choice should consider your personal interests, career goals, and admission requirements 
                    of specific programs. We recommend consulting with academic advisors for personalized guidance.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
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
