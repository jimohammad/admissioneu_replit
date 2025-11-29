import { db } from "./db";
import { universities } from "@shared/schema";

const seedUniversities = [
  {
    name: 'Universidad Complutense de Madrid',
    region: 'Madrid',
    city: 'Madrid',
    type: 'Public',
    languages: ['Spanish', 'English'],
    domains: ['Medicine', 'Law', 'Arts', 'Science', 'Psychology'],
    admissionPeriod: 'June - July',
    website: 'https://www.ucm.es',
    description: 'One of the oldest universities in the world, located on a sprawling campus in Madrid. Known for its strong research focus and historical significance.',
    englishPrograms: true,
  },
  {
    name: 'Universitat de Barcelona',
    region: 'Catalonia',
    city: 'Barcelona',
    type: 'Public',
    languages: ['Catalan', 'Spanish', 'English'],
    domains: ['Medicine', 'Science', 'Business', 'Arts'],
    admissionPeriod: 'June - July',
    website: 'https://web.ub.edu',
    description: 'The top-ranked university in Spain, offering a wide range of programs in the heart of Barcelona.',
    englishPrograms: true,
  },
  {
    name: 'Universitat Pompeu Fabra',
    region: 'Catalonia',
    city: 'Barcelona',
    type: 'Public',
    languages: ['Catalan', 'Spanish', 'English'],
    domains: ['Economics', 'Communication', 'Law', 'Political Science'],
    admissionPeriod: 'May - June',
    website: 'https://www.upf.edu',
    description: 'A modern, high-performance public university known for its excellence in teaching and research, particularly in social sciences and humanities.',
    englishPrograms: true,
  },
  {
    name: 'Universidad Autónoma de Madrid',
    region: 'Madrid',
    city: 'Madrid',
    type: 'Public',
    languages: ['Spanish', 'English'],
    domains: ['Science', 'Law', 'Medicine', 'Engineering'],
    admissionPeriod: 'June - July',
    website: 'https://www.uam.es',
    description: 'Renowned for its research and located on the Cantoblanco campus, offering a vibrant student life.',
    englishPrograms: true,
  },
  {
    name: 'Universidad de Navarra',
    region: 'Navarre',
    city: 'Pamplona',
    type: 'Private',
    languages: ['Spanish', 'English'],
    domains: ['Medicine', 'Business', 'Communication', 'Architecture'],
    admissionPeriod: 'October - April',
    website: 'https://www.unav.edu',
    description: 'A prestigious private university with a strong focus on personalized education and research excellence.',
    englishPrograms: true,
  },
  {
    name: 'Universitat Politècnica de València',
    region: 'Valencia',
    city: 'Valencia',
    type: 'Public',
    languages: ['Spanish', 'Valencian', 'English'],
    domains: ['Engineering', 'Technology', 'Architecture', 'Art'],
    admissionPeriod: 'June - July',
    website: 'https://www.upv.es',
    description: 'Leading technological university in Spain, focused on science and technology.',
    englishPrograms: true,
  },
  {
    name: 'Universidad de Salamanca',
    region: 'Castile and León',
    city: 'Salamanca',
    type: 'Public',
    languages: ['Spanish'],
    domains: ['Humanities', 'Law', 'Language', 'History'],
    admissionPeriod: 'June - July',
    website: 'https://www.usal.es',
    description: 'The oldest university in Spain and one of the oldest in Europe, famous for its teaching of the Spanish language.',
    englishPrograms: false,
  },
  {
    name: 'IE University',
    region: 'Madrid',
    city: 'Madrid',
    type: 'Private',
    languages: ['English', 'Spanish'],
    domains: ['Business', 'Law', 'International Relations', 'Architecture'],
    admissionPeriod: 'Rolling',
    website: 'https://www.ie.edu',
    description: 'An international university with a focus on business, innovation, and entrepreneurship. Most programs are taught in English.',
    englishPrograms: true,
  },
  {
    name: 'Universidad de Granada',
    region: 'Andalusia',
    city: 'Granada',
    type: 'Public',
    languages: ['Spanish', 'English'],
    domains: ['Translation', 'Computer Science', 'Psychology', 'Science'],
    admissionPeriod: 'June - July',
    website: 'https://www.ugr.es',
    description: 'A major intellectual center in southern Spain with a rich history and a large international student population.',
    englishPrograms: true,
  },
  {
    name: 'Universidad de Deusto',
    region: 'Basque Country',
    city: 'Bilbao',
    type: 'Private',
    languages: ['Spanish', 'Basque', 'English'],
    domains: ['Law', 'Business', 'Engineering', 'Psychology'],
    admissionPeriod: 'January - May',
    website: 'https://www.deusto.es',
    description: 'A Jesuit university known for its social commitment and academic rigor.',
    englishPrograms: true,
  },
];

async function seed() {
  try {
    console.log("Seeding database...");
    
    // Clear existing data
    await db.delete(universities);
    
    // Insert seed data
    await db.insert(universities).values(seedUniversities);
    
    console.log("✅ Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seed();
