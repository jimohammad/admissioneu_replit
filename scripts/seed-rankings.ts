import { db } from "../server/db";
import { universities } from "../shared/schema";
import { eq } from "drizzle-orm";

const topEuropeanUniversities: { name: string; globalRank: number }[] = [
  // Top 10 in Europe (Global Top 50)
  { name: "ETH Zurich", globalRank: 7 },
  { name: "University of Cambridge", globalRank: 5 },
  { name: "University of Oxford", globalRank: 3 },
  { name: "Imperial College London", globalRank: 6 },
  { name: "UCL", globalRank: 9 },
  { name: "University of Edinburgh", globalRank: 22 },
  { name: "PSL University", globalRank: 24 },
  { name: "University of Manchester", globalRank: 34 },
  { name: "EPFL", globalRank: 14 },
  { name: "King's College London", globalRank: 40 },
  
  // Top 25 in Europe (continued)
  { name: "LMU Munich", globalRank: 54 },
  { name: "Ludwig-Maximilians-Universität München", globalRank: 54 },
  { name: "Technical University of Munich", globalRank: 37 },
  { name: "Technische Universität München", globalRank: 37 },
  { name: "Heidelberg University", globalRank: 49 },
  { name: "Ruprecht-Karls-Universität Heidelberg", globalRank: 49 },
  { name: "Sorbonne University", globalRank: 59 },
  { name: "Sorbonne Université", globalRank: 59 },
  { name: "KU Leuven", globalRank: 61 },
  { name: "University of Amsterdam", globalRank: 53 },
  { name: "Universiteit van Amsterdam", globalRank: 53 },
  { name: "Delft University of Technology", globalRank: 47 },
  { name: "TU Delft", globalRank: 47 },
  { name: "Technische Universiteit Delft", globalRank: 47 },
  { name: "Wageningen University & Research", globalRank: 82 },
  { name: "Freie Universität Berlin", globalRank: 98 },
  { name: "Humboldt-Universität zu Berlin", globalRank: 117 },
  { name: "University of Copenhagen", globalRank: 76 },
  { name: "Uppsala University", globalRank: 105 },
  { name: "Lund University", globalRank: 85 },
  { name: "University of Helsinki", globalRank: 107 },
  { name: "University of Zurich", globalRank: 83 },
  { name: "Trinity College Dublin", globalRank: 81 },
  { name: "University of Vienna", globalRank: 128 },
  { name: "University of Barcelona", globalRank: 149 },
  { name: "Universitat de Barcelona", globalRank: 149 },
  
  // Top 50 in Europe (continued)
  { name: "Politecnico di Milano", globalRank: 111 },
  { name: "University of Bologna", globalRank: 133 },
  { name: "Università di Bologna", globalRank: 133 },
  { name: "Sapienza University of Rome", globalRank: 132 },
  { name: "La Sapienza - Università di Roma", globalRank: 132 },
  { name: "University of Warsaw", globalRank: 262 },
  { name: "Uniwersytet Warszawski", globalRank: 262 },
  { name: "Jagiellonian University", globalRank: 304 },
  { name: "Uniwersytet Jagielloński", globalRank: 304 },
  { name: "University of Groningen", globalRank: 139 },
  { name: "Erasmus University Rotterdam", globalRank: 176 },
  { name: "Leiden University", globalRank: 126 },
  { name: "Utrecht University", globalRank: 107 },
  { name: "RWTH Aachen University", globalRank: 106 },
  { name: "RWTH Aachen", globalRank: 106 },
  { name: "University of Freiburg", globalRank: 192 },
  { name: "Albert-Ludwigs-Universität Freiburg", globalRank: 192 },
  { name: "University of Göttingen", globalRank: 232 },
  { name: "Georg-August-Universität Göttingen", globalRank: 232 },
  { name: "University of Tübingen", globalRank: 169 },
  { name: "Eberhard Karls Universität Tübingen", globalRank: 169 },
  { name: "École Polytechnique", globalRank: 46 },
  { name: "Sciences Po", globalRank: 242 },
  { name: "HEC Paris", globalRank: 156 },
  { name: "INSEAD", globalRank: 175 },
  { name: "Autonomous University of Madrid", globalRank: 199 },
  { name: "Universidad Autónoma de Madrid", globalRank: 199 },
  { name: "University of Madrid", globalRank: 215 },
  { name: "Universidad Complutense de Madrid", globalRank: 215 },
  { name: "Pompeu Fabra University", globalRank: 235 },
  { name: "Universitat Pompeu Fabra", globalRank: 235 },
  { name: "Autonomous University of Barcelona", globalRank: 164 },
  { name: "Universitat Autònoma de Barcelona", globalRank: 164 },
  { name: "Central European University", globalRank: 386 },
  { name: "University of Padua", globalRank: 219 },
  { name: "Università degli Studi di Padova", globalRank: 219 },
  { name: "University of Milan", globalRank: 226 },
  { name: "Università degli Studi di Milano", globalRank: 226 },
  { name: "University of Turin", globalRank: 259 },
  { name: "Università degli Studi di Torino", globalRank: 259 },
  { name: "University of Florence", globalRank: 296 },
  { name: "Università degli Studi di Firenze", globalRank: 296 },
  { name: "Eindhoven University of Technology", globalRank: 120 },
  { name: "VU Amsterdam", globalRank: 207 },
  { name: "Maastricht University", globalRank: 288 },
  { name: "Radboud University", globalRank: 222 },
  { name: "University of Twente", globalRank: 210 },
  { name: "Karlsruhe Institute of Technology", globalRank: 119 },
  { name: "Karlsruher Institut für Technologie", globalRank: 119 },
  { name: "University of Bonn", globalRank: 217 },
  { name: "Rheinische Friedrich-Wilhelms-Universität Bonn", globalRank: 217 },
  { name: "University of Cologne", globalRank: 276 },
  { name: "Universität zu Köln", globalRank: 276 },
  { name: "University of Hamburg", globalRank: 205 },
  { name: "Universität Hamburg", globalRank: 205 },
  { name: "University of Stuttgart", globalRank: 285 },
  { name: "Universität Stuttgart", globalRank: 285 },
  { name: "TU Dresden", globalRank: 246 },
  { name: "Technische Universität Dresden", globalRank: 246 },
  { name: "Friedrich-Alexander-Universität Erlangen-Nürnberg", globalRank: 227 },
  { name: "University of Münster", globalRank: 294 },
  { name: "Westfälische Wilhelms-Universität Münster", globalRank: 294 },
  { name: "University of Grenoble Alpes", globalRank: 294 },
  { name: "Université Grenoble Alpes", globalRank: 294 },
  { name: "University of Strasbourg", globalRank: 318 },
  { name: "Université de Strasbourg", globalRank: 318 },
  { name: "Aix-Marseille University", globalRank: 346 },
  { name: "Université d'Aix-Marseille", globalRank: 346 },
  { name: "Paris-Saclay University", globalRank: 15 },
  { name: "Université Paris-Saclay", globalRank: 15 },
  { name: "Université de Paris", globalRank: 78 },
];

async function seedRankings() {
  console.log("🏆 Seeding global rankings for European universities...");
  
  let updated = 0;
  let notFound = 0;
  
  for (const uni of topEuropeanUniversities) {
    try {
      const result = await db
        .update(universities)
        .set({ globalRank: uni.globalRank })
        .where(eq(universities.name, uni.name));
      
      if (result.rowCount && result.rowCount > 0) {
        updated++;
        console.log(`✅ Updated: ${uni.name} → Rank #${uni.globalRank}`);
      } else {
        notFound++;
      }
    } catch (error) {
      console.error(`❌ Error updating ${uni.name}:`, error);
    }
  }
  
  console.log(`\n📊 Summary: ${updated} universities updated, ${notFound} not found in database`);
  
  // Show top ranked universities in database
  const topRanked = await db
    .select()
    .from(universities)
    .where(eq(universities.globalRank, universities.globalRank))
    .orderBy(universities.globalRank)
    .limit(20);
  
  console.log("\n🎓 Top ranked universities in database:");
  topRanked
    .filter(u => u.globalRank !== null)
    .sort((a, b) => (a.globalRank || 999) - (b.globalRank || 999))
    .slice(0, 15)
    .forEach((u, i) => {
      console.log(`  ${i + 1}. ${u.name} (${u.country}) - Global Rank #${u.globalRank}`);
    });
    
  process.exit(0);
}

seedRankings().catch(console.error);
