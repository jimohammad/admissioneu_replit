import { db } from "./db";
import { universities, costOfLiving, countryProfiles } from "@shared/schema";
import { germanUniversities } from "./germanUniversities";
import { hungarianUniversities } from "./hungarianUniversities";
import { italianUniversities } from "./italianUniversities";
import { polishUniversities } from "./polishUniversities";
import { dutchUniversities } from "./dutchUniversities";
import { costOfLivingData } from "./costOfLivingData";
import { countryProfilesData } from "./countryProfilesData";
import { count } from "drizzle-orm";

const spanishUniversities = [
  { name: 'Universidad de Almería', country: 'Spain', region: 'Andalusia', city: 'Almería', type: 'Public', languages: ['Spanish', 'English'], domains: ['Science', 'Agriculture', 'Engineering', 'Humanities'], admissionPeriod: 'June - July', website: 'https://www.ual.es', description: 'A young and dynamic university focused on research in agriculture, environment, and renewable energies.', englishPrograms: true },
  { name: 'Universidad de Cádiz', country: 'Spain', region: 'Andalusia', city: 'Cádiz', type: 'Public', languages: ['Spanish', 'English'], domains: ['Marine Science', 'Engineering', 'Medicine', 'Business'], admissionPeriod: 'June - July', website: 'https://www.uca.es', description: 'Known for its marine sciences programs and strategic location on the Atlantic coast.', englishPrograms: true },
  { name: 'Universidad de Córdoba', country: 'Spain', region: 'Andalusia', city: 'Córdoba', type: 'Public', languages: ['Spanish', 'English'], domains: ['Veterinary', 'Agriculture', 'Science', 'Law'], admissionPeriod: 'June - July', website: 'https://www.uco.es', description: 'Excellence in agricultural sciences, veterinary medicine, and food technology.', englishPrograms: true },
  { name: 'Universidad de Granada', country: 'Spain', region: 'Andalusia', city: 'Granada', type: 'Public', languages: ['Spanish', 'English'], domains: ['Translation', 'Computer Science', 'Psychology', 'Science', 'Medicine'], admissionPeriod: 'June - July', website: 'https://www.ugr.es', description: "A major intellectual center in southern Spain with a rich history and a large international student population.", englishPrograms: true },
  { name: 'Universidad de Huelva', country: 'Spain', region: 'Andalusia', city: 'Huelva', type: 'Public', languages: ['Spanish'], domains: ['Education', 'Business', 'Engineering', 'Social Work'], admissionPeriod: 'June - July', website: 'https://www.uhu.es', description: 'A growing university with strong connections to the mining and energy sectors.', englishPrograms: false },
  { name: 'Universidad de Jaén', country: 'Spain', region: 'Andalusia', city: 'Jaén', type: 'Public', languages: ['Spanish'], domains: ['Olive Oil Research', 'Engineering', 'Social Sciences', 'Health'], admissionPeriod: 'June - July', website: 'https://www.ujaen.es', description: 'World leader in olive oil research and technology.', englishPrograms: false },
  { name: 'Universidad de Málaga', country: 'Spain', region: 'Andalusia', city: 'Málaga', type: 'Public', languages: ['Spanish', 'English'], domains: ['Tourism', 'Technology', 'Medicine', 'Arts', 'Engineering'], admissionPeriod: 'June - July', website: 'https://www.uma.es', description: 'A leading university in tourism studies and technology.', englishPrograms: true },
  { name: 'Universidad Pablo de Olavide', country: 'Spain', region: 'Andalusia', city: 'Seville', type: 'Public', languages: ['Spanish', 'English'], domains: ['Sports Science', 'Social Sciences', 'Biotechnology', 'Law'], admissionPeriod: 'June - July', website: 'https://www.upo.es', description: 'A modern campus university known for its sports science and biotechnology programs.', englishPrograms: true },
  { name: 'Universidad de Sevilla', country: 'Spain', region: 'Andalusia', city: 'Seville', type: 'Public', languages: ['Spanish', 'English'], domains: ['Engineering', 'Medicine', 'Law', 'Arts', 'Architecture'], admissionPeriod: 'June - July', website: 'https://www.us.es', description: "One of Spain's largest and oldest universities.", englishPrograms: true },
  { name: 'Universidad de Zaragoza', country: 'Spain', region: 'Aragon', city: 'Zaragoza', type: 'Public', languages: ['Spanish', 'English'], domains: ['Engineering', 'Science', 'Medicine', 'Arts'], admissionPeriod: 'June - July', website: 'https://www.unizar.es', description: 'A historic university with strong engineering and science programs.', englishPrograms: true },
  { name: 'Universidad San Jorge', country: 'Spain', region: 'Aragon', city: 'Zaragoza', type: 'Private', languages: ['Spanish', 'English'], domains: ['Communication', 'Architecture', 'Health', 'Business'], admissionPeriod: 'Rolling', website: 'https://www.usj.es', description: 'A private university focused on communication, architecture and health sciences.', englishPrograms: true },
  { name: 'Universidad de Oviedo', country: 'Spain', region: 'Asturias', city: 'Oviedo', type: 'Public', languages: ['Spanish', 'English'], domains: ['Mining Engineering', 'Law', 'Science', 'Medicine'], admissionPeriod: 'June - July', website: 'https://www.uniovi.es', description: 'One of the oldest universities in Spain, strong in engineering.', englishPrograms: true },
  { name: 'Universidad de las Islas Baleares', country: 'Spain', region: 'Balearic Islands', city: 'Palma de Mallorca', type: 'Public', languages: ['Spanish', 'Catalan', 'English'], domains: ['Tourism', 'Marine Science', 'Education', 'Economics'], admissionPeriod: 'June - July', website: 'https://www.uib.es', description: 'The main university of the Balearic Islands.', englishPrograms: true },
  { name: 'Universidad de La Laguna', country: 'Spain', region: 'Canary Islands', city: 'San Cristóbal de La Laguna', type: 'Public', languages: ['Spanish', 'English'], domains: ['Astrophysics', 'Marine Biology', 'Tourism', 'Medicine'], admissionPeriod: 'June - July', website: 'https://www.ull.es', description: 'Known for its astrophysics research and tropical location.', englishPrograms: true },
  { name: 'Universidad de Las Palmas de Gran Canaria', country: 'Spain', region: 'Canary Islands', city: 'Las Palmas', type: 'Public', languages: ['Spanish', 'English'], domains: ['Veterinary', 'Marine Science', 'Tourism', 'Engineering'], admissionPeriod: 'June - July', website: 'https://www.ulpgc.es', description: 'Excellence in marine sciences and veterinary medicine.', englishPrograms: true },
  { name: 'Universidad de Cantabria', country: 'Spain', region: 'Cantabria', city: 'Santander', type: 'Public', languages: ['Spanish', 'English'], domains: ['Engineering', 'Physics', 'Economics', 'Medicine'], admissionPeriod: 'June - July', website: 'https://www.unican.es', description: 'Strong in physics and engineering research.', englishPrograms: true },
  { name: 'Universidad de Castilla-La Mancha', country: 'Spain', region: 'Castile-La Mancha', city: 'Ciudad Real', type: 'Public', languages: ['Spanish'], domains: ['Engineering', 'Law', 'Health', 'Humanities'], admissionPeriod: 'June - July', website: 'https://www.uclm.es', description: 'A multi-campus university in central Spain.', englishPrograms: false },
  { name: 'Universidad de Salamanca', country: 'Spain', region: 'Castile and León', city: 'Salamanca', type: 'Public', languages: ['Spanish', 'English'], domains: ['Humanities', 'Law', 'Medicine', 'Spanish Language'], admissionPeriod: 'June - July', website: 'https://www.usal.es', description: "One of the oldest universities in Europe (1218), known for Spanish language studies.", englishPrograms: true },
  { name: 'Universidad de Valladolid', country: 'Spain', region: 'Castile and León', city: 'Valladolid', type: 'Public', languages: ['Spanish', 'English'], domains: ['Engineering', 'Law', 'Medicine', 'Arts'], admissionPeriod: 'June - July', website: 'https://www.uva.es', description: 'A historic university with strong engineering programs.', englishPrograms: true },
  { name: 'Universidad de Burgos', country: 'Spain', region: 'Castile and León', city: 'Burgos', type: 'Public', languages: ['Spanish'], domains: ['Food Technology', 'Engineering', 'Law', 'Economics'], admissionPeriod: 'June - July', website: 'https://www.ubu.es', description: 'Known for food technology and archaeology research.', englishPrograms: false },
  { name: 'Universidad de León', country: 'Spain', region: 'Castile and León', city: 'León', type: 'Public', languages: ['Spanish'], domains: ['Veterinary', 'Biology', 'Mining', 'Economics'], admissionPeriod: 'June - July', website: 'https://www.unileon.es', description: 'Strong in veterinary medicine and environmental sciences.', englishPrograms: false },
  { name: 'IE University', country: 'Spain', region: 'Castile and León', city: 'Segovia', type: 'Private', languages: ['English', 'Spanish'], domains: ['Business', 'Law', 'International Relations', 'Architecture'], admissionPeriod: 'Rolling', website: 'https://www.ie.edu', description: 'Elite business school known globally for MBA and entrepreneurship.', englishPrograms: true },
  { name: 'Universidad Pontificia de Salamanca', country: 'Spain', region: 'Castile and León', city: 'Salamanca', type: 'Private', languages: ['Spanish'], domains: ['Theology', 'Communication', 'Psychology', 'Education'], admissionPeriod: 'June - September', website: 'https://www.upsa.es', description: 'A Catholic university with strong humanities programs.', englishPrograms: false },
  { name: 'Universitat de Barcelona', country: 'Spain', region: 'Catalonia', city: 'Barcelona', type: 'Public', languages: ['Catalan', 'Spanish', 'English'], domains: ['Medicine', 'Law', 'Science', 'Arts', 'Economics'], admissionPeriod: 'June - July', website: 'https://www.ub.edu', description: "One of Spain's top universities with world-class research.", englishPrograms: true },
  { name: 'Universitat Autònoma de Barcelona', country: 'Spain', region: 'Catalonia', city: 'Barcelona', type: 'Public', languages: ['Catalan', 'Spanish', 'English'], domains: ['Veterinary', 'Communication', 'Science', 'Economics'], admissionPeriod: 'June - July', website: 'https://www.uab.cat', description: 'A research-intensive university with a large campus.', englishPrograms: true },
  { name: 'Universitat Politècnica de Catalunya', country: 'Spain', region: 'Catalonia', city: 'Barcelona', type: 'Public', languages: ['Catalan', 'Spanish', 'English'], domains: ['Engineering', 'Architecture', 'Technology', 'Mathematics'], admissionPeriod: 'June - July', website: 'https://www.upc.edu', description: "One of Europe's leading technical universities.", englishPrograms: true },
  { name: 'Universitat Pompeu Fabra', country: 'Spain', region: 'Catalonia', city: 'Barcelona', type: 'Public', languages: ['Catalan', 'Spanish', 'English'], domains: ['Economics', 'Political Science', 'Communication', 'Health Sciences'], admissionPeriod: 'June - July', website: 'https://www.upf.edu', description: 'A young but top-ranked university in social sciences.', englishPrograms: true },
  { name: 'Universitat de Girona', country: 'Spain', region: 'Catalonia', city: 'Girona', type: 'Public', languages: ['Catalan', 'Spanish', 'English'], domains: ['Tourism', 'Science', 'Arts', 'Law'], admissionPeriod: 'June - July', website: 'https://www.udg.edu', description: 'A vibrant university in the historic city of Girona.', englishPrograms: true },
  { name: 'Universitat de Lleida', country: 'Spain', region: 'Catalonia', city: 'Lleida', type: 'Public', languages: ['Catalan', 'Spanish'], domains: ['Agriculture', 'Education', 'Medicine', 'Engineering'], admissionPeriod: 'June - July', website: 'https://www.udl.es', description: 'Strong in agricultural sciences and education.', englishPrograms: false },
  { name: 'Universitat Rovira i Virgili', country: 'Spain', region: 'Catalonia', city: 'Tarragona', type: 'Public', languages: ['Catalan', 'Spanish', 'English'], domains: ['Chemistry', 'Engineering', 'Tourism', 'Medicine'], admissionPeriod: 'June - July', website: 'https://www.urv.cat', description: 'Known for chemistry research and oenology programs.', englishPrograms: true },
  { name: 'Universitat Ramon Llull', country: 'Spain', region: 'Catalonia', city: 'Barcelona', type: 'Private', languages: ['Catalan', 'Spanish', 'English'], domains: ['Business', 'Engineering', 'Communication', 'Philosophy'], admissionPeriod: 'Rolling', website: 'https://www.url.edu', description: 'A federation of prestigious institutions including ESADE and IQS.', englishPrograms: true },
  { name: 'Universitat Internacional de Catalunya', country: 'Spain', region: 'Catalonia', city: 'Barcelona', type: 'Private', languages: ['Spanish', 'English'], domains: ['Dentistry', 'Architecture', 'Business', 'Medicine'], admissionPeriod: 'Rolling', website: 'https://www.uic.es', description: 'Known for health sciences and architecture programs.', englishPrograms: true },
  { name: 'Universitat Oberta de Catalunya', country: 'Spain', region: 'Catalonia', city: 'Barcelona', type: 'Private', languages: ['Catalan', 'Spanish', 'English'], domains: ['Computer Science', 'Business', 'Law', 'Psychology'], admissionPeriod: 'Rolling', website: 'https://www.uoc.edu', description: "One of the world's leading online universities.", englishPrograms: true },
  { name: 'Universitat Abat Oliba CEU', country: 'Spain', region: 'Catalonia', city: 'Barcelona', type: 'Private', languages: ['Spanish', 'English'], domains: ['Law', 'Business', 'Psychology', 'Communication'], admissionPeriod: 'Rolling', website: 'https://www.uaoceu.es', description: 'A small private university with a focus on personalized education.', englishPrograms: true },
  { name: 'Universitat de Vic', country: 'Spain', region: 'Catalonia', city: 'Vic', type: 'Private', languages: ['Catalan', 'Spanish', 'English'], domains: ['Education', 'Health', 'Business', 'Engineering'], admissionPeriod: 'Rolling', website: 'https://www.uvic.cat', description: 'A private university known for education and health programs.', englishPrograms: true },
  { name: 'Universidad de Extremadura', country: 'Spain', region: 'Extremadura', city: 'Badajoz', type: 'Public', languages: ['Spanish'], domains: ['Veterinary', 'Agriculture', 'Engineering', 'Education'], admissionPeriod: 'June - July', website: 'https://www.unex.es', description: 'The main public university of Extremadura.', englishPrograms: false },
  { name: 'Universidade de Santiago de Compostela', country: 'Spain', region: 'Galicia', city: 'Santiago de Compostela', type: 'Public', languages: ['Galician', 'Spanish', 'English'], domains: ['Medicine', 'Pharmacy', 'Law', 'Science'], admissionPeriod: 'June - July', website: 'https://www.usc.es', description: 'One of the oldest universities in the world (1495).', englishPrograms: true },
  { name: 'Universidade da Coruña', country: 'Spain', region: 'Galicia', city: 'A Coruña', type: 'Public', languages: ['Galician', 'Spanish', 'English'], domains: ['Architecture', 'Engineering', 'Economics', 'Science'], admissionPeriod: 'June - July', website: 'https://www.udc.es', description: 'Known for naval and civil engineering.', englishPrograms: true },
  { name: 'Universidade de Vigo', country: 'Spain', region: 'Galicia', city: 'Vigo', type: 'Public', languages: ['Galician', 'Spanish', 'English'], domains: ['Marine Science', 'Engineering', 'Economics', 'Law'], admissionPeriod: 'June - July', website: 'https://www.uvigo.es', description: 'Strong in marine sciences and telecommunications.', englishPrograms: true },
  { name: 'Universidad de La Rioja', country: 'Spain', region: 'La Rioja', city: 'Logroño', type: 'Public', languages: ['Spanish'], domains: ['Oenology', 'Agriculture', 'Engineering', 'Law'], admissionPeriod: 'June - July', website: 'https://www.unirioja.es', description: 'The university of the famous wine region.', englishPrograms: false },
  { name: 'Universidad Complutense de Madrid', country: 'Spain', region: 'Madrid', city: 'Madrid', type: 'Public', languages: ['Spanish', 'English'], domains: ['Medicine', 'Law', 'Philosophy', 'Science', 'Arts'], admissionPeriod: 'June - July', website: 'https://www.ucm.es', description: "One of the oldest and largest universities in Europe.", englishPrograms: true },
  { name: 'Universidad Autónoma de Madrid', country: 'Spain', region: 'Madrid', city: 'Madrid', type: 'Public', languages: ['Spanish', 'English'], domains: ['Science', 'Law', 'Medicine', 'Philosophy'], admissionPeriod: 'June - July', website: 'https://www.uam.es', description: 'A top Spanish university with excellent research.', englishPrograms: true },
  { name: 'Universidad Politécnica de Madrid', country: 'Spain', region: 'Madrid', city: 'Madrid', type: 'Public', languages: ['Spanish', 'English'], domains: ['Engineering', 'Architecture', 'Aerospace', 'Computer Science'], admissionPeriod: 'June - July', website: 'https://www.upm.es', description: "Spain's largest technical university.", englishPrograms: true },
  { name: 'Universidad Carlos III de Madrid', country: 'Spain', region: 'Madrid', city: 'Madrid', type: 'Public', languages: ['Spanish', 'English'], domains: ['Economics', 'Law', 'Engineering', 'Social Sciences'], admissionPeriod: 'June - July', website: 'https://www.uc3m.es', description: 'A young, innovative university known for economics and law.', englishPrograms: true },
  { name: 'Universidad Rey Juan Carlos', country: 'Spain', region: 'Madrid', city: 'Madrid', type: 'Public', languages: ['Spanish', 'English'], domains: ['Communication', 'Law', 'Health', 'Engineering'], admissionPeriod: 'June - July', website: 'https://www.urjc.es', description: 'A modern university with a focus on employability.', englishPrograms: true },
  { name: 'Universidad de Alcalá', country: 'Spain', region: 'Madrid', city: 'Alcalá de Henares', type: 'Public', languages: ['Spanish', 'English'], domains: ['Humanities', 'Science', 'Health', 'Architecture'], admissionPeriod: 'June - July', website: 'https://www.uah.es', description: 'Historic university and UNESCO World Heritage Site.', englishPrograms: true },
  { name: 'Universidad Nacional de Educación a Distancia', country: 'Spain', region: 'Madrid', city: 'Madrid', type: 'Public', languages: ['Spanish'], domains: ['Law', 'Economics', 'Education', 'Psychology'], admissionPeriod: 'Rolling', website: 'https://www.uned.es', description: "Spain's largest university by enrollment, offering distance education.", englishPrograms: false },
  { name: 'Universidad Pontificia Comillas', country: 'Spain', region: 'Madrid', city: 'Madrid', type: 'Private', languages: ['Spanish', 'English'], domains: ['Law', 'Engineering', 'Business', 'Theology'], admissionPeriod: 'Rolling', website: 'https://www.comillas.edu', description: 'A prestigious Jesuit university with top-ranked ICADE business school.', englishPrograms: true },
  { name: 'Universidad CEU San Pablo', country: 'Spain', region: 'Madrid', city: 'Madrid', type: 'Private', languages: ['Spanish', 'English'], domains: ['Medicine', 'Pharmacy', 'Law', 'Communication'], admissionPeriod: 'Rolling', website: 'https://www.uspceu.com', description: 'One of the largest private universities in Spain.', englishPrograms: true },
  { name: 'Universidad Antonio de Nebrija', country: 'Spain', region: 'Madrid', city: 'Madrid', type: 'Private', languages: ['Spanish', 'English'], domains: ['Communication', 'Business', 'Engineering', 'Languages'], admissionPeriod: 'Rolling', website: 'https://www.nebrija.com', description: 'Known for language studies and international programs.', englishPrograms: true },
  { name: 'Universidad Alfonso X el Sabio', country: 'Spain', region: 'Madrid', city: 'Madrid', type: 'Private', languages: ['Spanish', 'English'], domains: ['Health', 'Engineering', 'Architecture', 'Business'], admissionPeriod: 'Rolling', website: 'https://www.uax.es', description: 'Known for dentistry and health sciences.', englishPrograms: true },
  { name: 'Universidad Europea de Madrid', country: 'Spain', region: 'Madrid', city: 'Madrid', type: 'Private', languages: ['Spanish', 'English'], domains: ['Sports', 'Health', 'Business', 'Architecture'], admissionPeriod: 'Rolling', website: 'https://www.universidadeuropea.es', description: 'Part of Laureate International Universities network.', englishPrograms: true },
  { name: 'Universidad Francisco de Vitoria', country: 'Spain', region: 'Madrid', city: 'Madrid', type: 'Private', languages: ['Spanish', 'English'], domains: ['Law', 'Communication', 'Education', 'Business'], admissionPeriod: 'Rolling', website: 'https://www.ufv.es', description: 'A Catholic university with a liberal arts approach.', englishPrograms: true },
  { name: 'Universidad Camilo José Cela', country: 'Spain', region: 'Madrid', city: 'Madrid', type: 'Private', languages: ['Spanish', 'English'], domains: ['Law', 'Psychology', 'Business', 'Education'], admissionPeriod: 'Rolling', website: 'https://www.ucjc.edu', description: 'Named after the Nobel Prize-winning author.', englishPrograms: true },
  { name: 'Universidad a Distancia de Madrid', country: 'Spain', region: 'Madrid', city: 'Madrid', type: 'Private', languages: ['Spanish'], domains: ['Law', 'Business', 'Psychology', 'Tourism'], admissionPeriod: 'Rolling', website: 'https://www.udima.es', description: 'A private distance learning university.', englishPrograms: false },
  { name: 'Universidad de Murcia', country: 'Spain', region: 'Murcia', city: 'Murcia', type: 'Public', languages: ['Spanish', 'English'], domains: ['Medicine', 'Law', 'Biology', 'Education'], admissionPeriod: 'June - July', website: 'https://www.um.es', description: 'The main public university of Murcia.', englishPrograms: true },
  { name: 'Universidad Politécnica de Cartagena', country: 'Spain', region: 'Murcia', city: 'Cartagena', type: 'Public', languages: ['Spanish', 'English'], domains: ['Naval Engineering', 'Mining', 'Agriculture', 'Business'], admissionPeriod: 'June - July', website: 'https://www.upct.es', description: 'Known for naval and agricultural engineering.', englishPrograms: true },
  { name: 'Universidad Católica San Antonio', country: 'Spain', region: 'Murcia', city: 'Murcia', type: 'Private', languages: ['Spanish', 'English'], domains: ['Sports', 'Health', 'Business', 'Education'], admissionPeriod: 'Rolling', website: 'https://www.ucam.edu', description: 'Known for elite sports programs and training facilities.', englishPrograms: true },
  { name: 'Universidad Pública de Navarra', country: 'Spain', region: 'Navarre', city: 'Pamplona', type: 'Public', languages: ['Spanish', 'English', 'Basque'], domains: ['Engineering', 'Economics', 'Agriculture', 'Health'], admissionPeriod: 'June - July', website: 'https://www.unavarra.es', description: 'A modern public university in Pamplona.', englishPrograms: true },
  { name: 'Universidad de Navarra', country: 'Spain', region: 'Navarre', city: 'Pamplona', type: 'Private', languages: ['Spanish', 'English'], domains: ['Medicine', 'Law', 'Communication', 'Business'], admissionPeriod: 'Rolling', website: 'https://www.unav.edu', description: 'Prestigious private university, home to top-ranked IESE Business School.', englishPrograms: true },
  { name: 'Universidad del País Vasco', country: 'Spain', region: 'Basque Country', city: 'Bilbao', type: 'Public', languages: ['Basque', 'Spanish', 'English'], domains: ['Science', 'Engineering', 'Medicine', 'Arts'], admissionPeriod: 'June - July', website: 'https://www.ehu.eus', description: 'The main public university of the Basque Country.', englishPrograms: true },
  { name: 'Universidad de Deusto', country: 'Spain', region: 'Basque Country', city: 'Bilbao', type: 'Private', languages: ['Spanish', 'English', 'Basque'], domains: ['Law', 'Business', 'Engineering', 'Psychology'], admissionPeriod: 'Rolling', website: 'https://www.deusto.es', description: 'A prestigious Jesuit university in Bilbao.', englishPrograms: true },
  { name: 'Mondragon Unibertsitatea', country: 'Spain', region: 'Basque Country', city: 'Mondragón', type: 'Private', languages: ['Basque', 'Spanish', 'English'], domains: ['Engineering', 'Business', 'Education', 'Gastronomy'], admissionPeriod: 'Rolling', website: 'https://www.mondragon.edu', description: 'A cooperative university known for innovation.', englishPrograms: true },
  { name: 'Universitat de València', country: 'Spain', region: 'Valencia', city: 'Valencia', type: 'Public', languages: ['Valencian', 'Spanish', 'English'], domains: ['Science', 'Medicine', 'Law', 'Arts'], admissionPeriod: 'June - July', website: 'https://www.uv.es', description: 'One of the oldest universities in Spain (1499).', englishPrograms: true },
  { name: 'Universitat Politècnica de València', country: 'Spain', region: 'Valencia', city: 'Valencia', type: 'Public', languages: ['Spanish', 'English'], domains: ['Engineering', 'Architecture', 'Fine Arts', 'Agriculture'], admissionPeriod: 'June - July', website: 'https://www.upv.es', description: 'Top-ranked technical university in Spain.', englishPrograms: true },
  { name: 'Universidad de Alicante', country: 'Spain', region: 'Valencia', city: 'Alicante', type: 'Public', languages: ['Spanish', 'English'], domains: ['Tourism', 'Law', 'Science', 'Economics'], admissionPeriod: 'June - July', website: 'https://www.ua.es', description: 'Known for tourism and criminology programs.', englishPrograms: true },
  { name: 'Universitat Jaume I', country: 'Spain', region: 'Valencia', city: 'Castellón de la Plana', type: 'Public', languages: ['Valencian', 'Spanish', 'English'], domains: ['Translation', 'Psychology', 'Engineering', 'Economics'], admissionPeriod: 'June - July', website: 'https://www.uji.es', description: 'Known for translation studies and psychology.', englishPrograms: true },
  { name: 'Universidad Miguel Hernández', country: 'Spain', region: 'Valencia', city: 'Elche', type: 'Public', languages: ['Spanish', 'English'], domains: ['Medicine', 'Engineering', 'Statistics', 'Agriculture'], admissionPeriod: 'June - July', website: 'https://www.umh.es', description: 'Known for medicine and neuroscience research.', englishPrograms: true },
  { name: 'Universidad Cardenal Herrera-CEU', country: 'Spain', region: 'Valencia', city: 'Valencia', type: 'Private', languages: ['Spanish', 'English'], domains: ['Veterinary', 'Medicine', 'Communication', 'Architecture'], admissionPeriod: 'Rolling', website: 'https://www.uchceu.es', description: 'A private university known for health sciences.', englishPrograms: true },
  { name: 'Universidad Católica de Valencia', country: 'Spain', region: 'Valencia', city: 'Valencia', type: 'Private', languages: ['Spanish', 'English'], domains: ['Health', 'Education', 'Psychology', 'Business'], admissionPeriod: 'Rolling', website: 'https://www.ucv.es', description: 'A Catholic university with a focus on health and education.', englishPrograms: true },
];

function addTuitionFees(uni: { name: string; country: string; region: string; city: string; type: string; languages: string[]; domains: string[]; admissionPeriod: string; website: string; description: string; englishPrograms: boolean; }) {
  const { country, type } = uni;
  let tuitionFeeEU: string;
  let tuitionFeeNonEU: string;
  let tuitionPeriod = 'annual';
  
  if (country === 'Spain') {
    if (type === 'Public') {
      tuitionFeeEU = '€700 - €1,500/year';
      tuitionFeeNonEU = '€1,500 - €3,000/year';
    } else {
      tuitionFeeEU = '€5,000 - €20,000/year';
      tuitionFeeNonEU = '€5,000 - €20,000/year';
    }
  } else if (country === 'Germany') {
    if (type === 'Public') {
      tuitionFeeEU = '€0 (Free) + €300 semester fee';
      tuitionFeeNonEU = '€0 - €1,500/semester';
    } else {
      tuitionFeeEU = '€10,000 - €30,000/year';
      tuitionFeeNonEU = '€10,000 - €30,000/year';
    }
  } else if (country === 'Hungary') {
    if (type === 'Public') {
      tuitionFeeEU = '€0 - €1,500/semester';
      tuitionFeeNonEU = '€3,000 - €8,000/year';
    } else {
      tuitionFeeEU = '€6,000 - €16,000/year';
      tuitionFeeNonEU = '€6,000 - €16,000/year';
    }
  } else if (country === 'Italy') {
    if (type === 'Public') {
      tuitionFeeEU = '€156 - €2,800';
      tuitionFeeNonEU = '€2,800 - €4,500';
    } else {
      tuitionFeeEU = '€5,000 - €15,000';
      tuitionFeeNonEU = '€8,000 - €20,000';
    }
  } else if (country === 'Poland') {
    if (type === 'Public') {
      tuitionFeeEU = '€0 (Free for EU)';
      tuitionFeeNonEU = '€2,000 - €4,000';
    } else {
      tuitionFeeEU = '€3,000 - €6,000';
      tuitionFeeNonEU = '€4,000 - €8,000';
    }
  } else {
    tuitionFeeEU = 'Contact university';
    tuitionFeeNonEU = 'Contact university';
  }
  
  return {
    ...uni,
    tuitionFeeEU,
    tuitionFeeNonEU,
    tuitionPeriod,
  };
}

export async function autoSeedIfEmpty(): Promise<void> {
  try {
    console.log("Checking if database needs seeding...");
    
    const [uniCount] = await db.select({ count: count() }).from(universities);
    
    if (uniCount.count > 0) {
      console.log(`Database already has ${uniCount.count} universities. Skipping seed.`);
      return;
    }
    
    console.log("Database is empty. Starting auto-seed...");
    
    const allUniversities = [
      ...spanishUniversities.map(addTuitionFees),
      ...germanUniversities,
      ...hungarianUniversities,
      ...italianUniversities,
      ...polishUniversities,
      ...dutchUniversities
    ];
    
    console.log(`Seeding ${allUniversities.length} universities...`);
    await db.insert(universities).values(allUniversities);
    console.log(`✅ Universities seeded: ${allUniversities.length}`);
    
    const [colCount] = await db.select({ count: count() }).from(costOfLiving);
    if (colCount.count === 0) {
      console.log("Seeding cost of living data...");
      for (const city of costOfLivingData) {
        await db.insert(costOfLiving).values(city);
      }
      console.log(`✅ Cost of living data seeded: ${costOfLivingData.length} cities`);
    }
    
    const [cpCount] = await db.select({ count: count() }).from(countryProfiles);
    if (cpCount.count === 0) {
      console.log("Seeding country profiles...");
      for (const profile of countryProfilesData) {
        await db.insert(countryProfiles).values(profile);
      }
      console.log(`✅ Country profiles seeded: ${countryProfilesData.length} countries`);
    }
    
    console.log("🎉 Auto-seed completed successfully!");
  } catch (error) {
    console.error("❌ Error during auto-seed:", error);
  }
}
