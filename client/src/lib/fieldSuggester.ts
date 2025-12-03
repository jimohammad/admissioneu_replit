export const educationLevels = [
  { value: '10th', label: '10th Standard (Secondary)', weight: 1 },
  { value: '12th', label: '12th Standard (Higher Secondary)', weight: 1.2 },
  { value: 'bachelor', label: "Bachelor's Degree", weight: 1.5 },
  { value: 'master', label: "Master's Degree", weight: 1.8 },
] as const;

export type EducationLevel = typeof educationLevels[number]['value'];

export const subjects = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
  'Economics',
  'Business Studies',
  'Accounting',
  'English',
  'Literature',
  'History',
  'Geography',
  'Political Science',
  'Psychology',
  'Sociology',
  'Philosophy',
  'Art & Drawing',
  'Music',
  'Physical Education',
  'Environmental Science',
  'Statistics',
  'Law',
  'Journalism',
  'Media Studies',
  'Agriculture',
  'Biotechnology',
  'Electronics',
  'Mechanical',
  'Civil Engineering',
  'Medicine/Pre-Med',
  'Nursing',
  'Pharmacy',
  'Dentistry',
  'Veterinary',
  'Hotel Management',
  'Tourism',
  'Fashion Design',
  'Architecture',
  'Fine Arts',
  'Theatre/Drama',
] as const;

export type Subject = typeof subjects[number];

export const studyFields = [
  'Agriculture & Environment',
  'Arts & Design',
  'Business & Economics',
  'Engineering & Technology',
  'Law & Politics',
  'Media & Communication',
  'Medicine & Health',
  'Sciences',
  'Social Sciences & Humanities',
  'Sports & Tourism',
] as const;

export type StudyField = typeof studyFields[number];

const subjectToFieldMapping: Record<string, { field: StudyField; weight: number }[]> = {
  'Mathematics': [
    { field: 'Engineering & Technology', weight: 1.0 },
    { field: 'Sciences', weight: 0.9 },
    { field: 'Business & Economics', weight: 0.6 },
  ],
  'Physics': [
    { field: 'Engineering & Technology', weight: 1.0 },
    { field: 'Sciences', weight: 0.9 },
  ],
  'Chemistry': [
    { field: 'Sciences', weight: 1.0 },
    { field: 'Medicine & Health', weight: 0.8 },
    { field: 'Engineering & Technology', weight: 0.5 },
  ],
  'Biology': [
    { field: 'Medicine & Health', weight: 1.0 },
    { field: 'Sciences', weight: 0.9 },
    { field: 'Agriculture & Environment', weight: 0.7 },
  ],
  'Computer Science': [
    { field: 'Engineering & Technology', weight: 1.0 },
    { field: 'Sciences', weight: 0.6 },
    { field: 'Business & Economics', weight: 0.4 },
  ],
  'Economics': [
    { field: 'Business & Economics', weight: 1.0 },
    { field: 'Social Sciences & Humanities', weight: 0.6 },
    { field: 'Law & Politics', weight: 0.4 },
  ],
  'Business Studies': [
    { field: 'Business & Economics', weight: 1.0 },
    { field: 'Sports & Tourism', weight: 0.4 },
  ],
  'Accounting': [
    { field: 'Business & Economics', weight: 1.0 },
  ],
  'English': [
    { field: 'Social Sciences & Humanities', weight: 0.8 },
    { field: 'Media & Communication', weight: 0.7 },
    { field: 'Arts & Design', weight: 0.5 },
  ],
  'Literature': [
    { field: 'Social Sciences & Humanities', weight: 1.0 },
    { field: 'Arts & Design', weight: 0.6 },
    { field: 'Media & Communication', weight: 0.5 },
  ],
  'History': [
    { field: 'Social Sciences & Humanities', weight: 1.0 },
    { field: 'Law & Politics', weight: 0.5 },
  ],
  'Geography': [
    { field: 'Social Sciences & Humanities', weight: 0.8 },
    { field: 'Agriculture & Environment', weight: 0.7 },
    { field: 'Sciences', weight: 0.5 },
  ],
  'Political Science': [
    { field: 'Law & Politics', weight: 1.0 },
    { field: 'Social Sciences & Humanities', weight: 0.7 },
    { field: 'Media & Communication', weight: 0.4 },
  ],
  'Psychology': [
    { field: 'Social Sciences & Humanities', weight: 1.0 },
    { field: 'Medicine & Health', weight: 0.6 },
  ],
  'Sociology': [
    { field: 'Social Sciences & Humanities', weight: 1.0 },
    { field: 'Law & Politics', weight: 0.4 },
  ],
  'Philosophy': [
    { field: 'Social Sciences & Humanities', weight: 1.0 },
    { field: 'Law & Politics', weight: 0.5 },
  ],
  'Art & Drawing': [
    { field: 'Arts & Design', weight: 1.0 },
    { field: 'Media & Communication', weight: 0.5 },
  ],
  'Music': [
    { field: 'Arts & Design', weight: 1.0 },
    { field: 'Social Sciences & Humanities', weight: 0.4 },
  ],
  'Physical Education': [
    { field: 'Sports & Tourism', weight: 1.0 },
    { field: 'Medicine & Health', weight: 0.5 },
  ],
  'Environmental Science': [
    { field: 'Agriculture & Environment', weight: 1.0 },
    { field: 'Sciences', weight: 0.8 },
    { field: 'Engineering & Technology', weight: 0.4 },
  ],
  'Statistics': [
    { field: 'Sciences', weight: 0.9 },
    { field: 'Business & Economics', weight: 0.8 },
    { field: 'Engineering & Technology', weight: 0.6 },
  ],
  'Law': [
    { field: 'Law & Politics', weight: 1.0 },
    { field: 'Business & Economics', weight: 0.4 },
  ],
  'Journalism': [
    { field: 'Media & Communication', weight: 1.0 },
    { field: 'Social Sciences & Humanities', weight: 0.5 },
  ],
  'Media Studies': [
    { field: 'Media & Communication', weight: 1.0 },
    { field: 'Arts & Design', weight: 0.6 },
  ],
  'Agriculture': [
    { field: 'Agriculture & Environment', weight: 1.0 },
    { field: 'Sciences', weight: 0.5 },
  ],
  'Biotechnology': [
    { field: 'Sciences', weight: 0.9 },
    { field: 'Medicine & Health', weight: 0.8 },
    { field: 'Agriculture & Environment', weight: 0.6 },
  ],
  'Electronics': [
    { field: 'Engineering & Technology', weight: 1.0 },
    { field: 'Sciences', weight: 0.5 },
  ],
  'Mechanical': [
    { field: 'Engineering & Technology', weight: 1.0 },
  ],
  'Civil Engineering': [
    { field: 'Engineering & Technology', weight: 1.0 },
    { field: 'Agriculture & Environment', weight: 0.4 },
  ],
  'Medicine/Pre-Med': [
    { field: 'Medicine & Health', weight: 1.0 },
    { field: 'Sciences', weight: 0.6 },
  ],
  'Nursing': [
    { field: 'Medicine & Health', weight: 1.0 },
  ],
  'Pharmacy': [
    { field: 'Medicine & Health', weight: 1.0 },
    { field: 'Sciences', weight: 0.6 },
  ],
  'Dentistry': [
    { field: 'Medicine & Health', weight: 1.0 },
  ],
  'Veterinary': [
    { field: 'Medicine & Health', weight: 0.9 },
    { field: 'Agriculture & Environment', weight: 0.7 },
  ],
  'Hotel Management': [
    { field: 'Sports & Tourism', weight: 1.0 },
    { field: 'Business & Economics', weight: 0.6 },
  ],
  'Tourism': [
    { field: 'Sports & Tourism', weight: 1.0 },
    { field: 'Business & Economics', weight: 0.5 },
  ],
  'Fashion Design': [
    { field: 'Arts & Design', weight: 1.0 },
    { field: 'Business & Economics', weight: 0.4 },
  ],
  'Architecture': [
    { field: 'Arts & Design', weight: 0.8 },
    { field: 'Engineering & Technology', weight: 0.8 },
  ],
  'Fine Arts': [
    { field: 'Arts & Design', weight: 1.0 },
    { field: 'Social Sciences & Humanities', weight: 0.4 },
  ],
  'Theatre/Drama': [
    { field: 'Arts & Design', weight: 1.0 },
    { field: 'Media & Communication', weight: 0.6 },
  ],
};

const fieldDescriptions: Record<StudyField, string> = {
  'Agriculture & Environment': 'Sustainable farming, environmental science, ecology, forestry, and natural resource management.',
  'Arts & Design': 'Fine arts, graphic design, architecture, fashion, music, theatre, and creative industries.',
  'Business & Economics': 'Management, finance, marketing, entrepreneurship, economics, and international business.',
  'Engineering & Technology': 'Computer science, software engineering, mechanical, electrical, civil, and emerging technologies.',
  'Law & Politics': 'Legal studies, international relations, public policy, governance, and political science.',
  'Media & Communication': 'Journalism, digital media, public relations, advertising, and film studies.',
  'Medicine & Health': 'Medicine, nursing, pharmacy, public health, psychology, and healthcare management.',
  'Sciences': 'Physics, chemistry, biology, mathematics, data science, and research-focused disciplines.',
  'Social Sciences & Humanities': 'History, philosophy, sociology, languages, literature, and cultural studies.',
  'Sports & Tourism': 'Sports management, hospitality, tourism, event management, and recreation.',
};

const levelBoosts: Record<EducationLevel, Record<StudyField, number>> = {
  '10th': {
    'Agriculture & Environment': 1.0,
    'Arts & Design': 1.1,
    'Business & Economics': 1.0,
    'Engineering & Technology': 1.0,
    'Law & Politics': 0.9,
    'Media & Communication': 1.0,
    'Medicine & Health': 1.0,
    'Sciences': 1.0,
    'Social Sciences & Humanities': 1.0,
    'Sports & Tourism': 1.1,
  },
  '12th': {
    'Agriculture & Environment': 1.0,
    'Arts & Design': 1.0,
    'Business & Economics': 1.1,
    'Engineering & Technology': 1.1,
    'Law & Politics': 1.0,
    'Media & Communication': 1.0,
    'Medicine & Health': 1.1,
    'Sciences': 1.1,
    'Social Sciences & Humanities': 1.0,
    'Sports & Tourism': 1.0,
  },
  'bachelor': {
    'Agriculture & Environment': 1.0,
    'Arts & Design': 1.0,
    'Business & Economics': 1.2,
    'Engineering & Technology': 1.2,
    'Law & Politics': 1.1,
    'Media & Communication': 1.0,
    'Medicine & Health': 1.1,
    'Sciences': 1.2,
    'Social Sciences & Humanities': 1.1,
    'Sports & Tourism': 1.0,
  },
  'master': {
    'Agriculture & Environment': 1.1,
    'Arts & Design': 1.0,
    'Business & Economics': 1.3,
    'Engineering & Technology': 1.3,
    'Law & Politics': 1.2,
    'Media & Communication': 1.1,
    'Sciences': 1.3,
    'Social Sciences & Humanities': 1.2,
    'Medicine & Health': 1.2,
    'Sports & Tourism': 1.0,
  },
};

export interface FieldSuggestion {
  field: StudyField;
  score: number;
  description: string;
  matchedSubjects: string[];
  reasoning: string;
}

export function suggestFields(
  selectedSubjects: string[],
  educationLevel: EducationLevel
): FieldSuggestion[] {
  const fieldScores: Record<StudyField, { score: number; matchedSubjects: string[] }> = {} as any;
  
  for (const field of studyFields) {
    fieldScores[field] = { score: 0, matchedSubjects: [] };
  }

  for (const subject of selectedSubjects) {
    const mappings = subjectToFieldMapping[subject];
    if (mappings) {
      for (const { field, weight } of mappings) {
        fieldScores[field].score += weight;
        if (!fieldScores[field].matchedSubjects.includes(subject)) {
          fieldScores[field].matchedSubjects.push(subject);
        }
      }
    }
  }

  for (const field of studyFields) {
    const levelBoost = levelBoosts[educationLevel][field];
    fieldScores[field].score *= levelBoost;
  }

  const suggestions: FieldSuggestion[] = studyFields
    .map((field) => {
      const { score, matchedSubjects } = fieldScores[field];
      const reasoning = generateReasoning(field, matchedSubjects, educationLevel);
      return {
        field,
        score,
        description: fieldDescriptions[field],
        matchedSubjects,
        reasoning,
      };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  return suggestions;
}

function generateReasoning(
  field: StudyField,
  matchedSubjects: string[],
  level: EducationLevel
): string {
  if (matchedSubjects.length === 0) {
    return '';
  }

  const subjectList = matchedSubjects.join(', ');
  const levelLabel = educationLevels.find((l) => l.value === level)?.label || level;

  const templates: Record<StudyField, string> = {
    'Agriculture & Environment': `Your background in ${subjectList} provides a strong foundation for environmental and agricultural sciences. This field offers growing opportunities in sustainability and climate research.`,
    'Arts & Design': `Your creative subjects like ${subjectList} align well with arts and design programs. European universities offer excellent facilities for creative development.`,
    'Business & Economics': `With ${subjectList} in your background, you have the analytical skills valued in business programs. Many European business schools offer internationally recognized degrees.`,
    'Engineering & Technology': `Your strength in ${subjectList} makes engineering and technology a natural fit. European technical universities are globally renowned for innovation.`,
    'Law & Politics': `${subjectList} provides good preparation for legal and political studies. European universities offer unique perspectives on international law and EU governance.`,
    'Media & Communication': `Your experience with ${subjectList} translates well to media and communication studies. Europe has leading programs in journalism and digital media.`,
    'Medicine & Health': `${subjectList} gives you the scientific foundation needed for healthcare programs. European medical schools offer world-class training with clinical experience.`,
    'Sciences': `Your background in ${subjectList} positions you well for advanced scientific research. European research universities lead in many scientific disciplines.`,
    'Social Sciences & Humanities': `${subjectList} shows your interest in understanding human society. European universities have rich traditions in humanities and social research.`,
    'Sports & Tourism': `With ${subjectList}, you can explore careers in sports management or hospitality. Europe offers unique opportunities given its tourism and sports industries.`,
  };

  let reasoning = templates[field];
  
  if (level === 'master') {
    reasoning += ' At the Master\'s level, you can specialize in research or professional tracks.';
  } else if (level === 'bachelor') {
    reasoning += ' A Bachelor\'s degree will build your foundational knowledge and open pathways for specialization.';
  }

  return reasoning;
}
