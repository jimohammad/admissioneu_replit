import { db } from "./db";
import { countryProfiles } from "@shared/schema";
import { countryProfilesData } from "./countryProfilesData";

async function seedCountryProfiles() {
  try {
    console.log("Seeding country profiles...");
    
    // Clear existing data
    await db.delete(countryProfiles);
    
    // Insert new data
    await db.insert(countryProfiles).values(countryProfilesData);
    
    console.log(`✅ Country profiles seeded successfully with ${countryProfilesData.length} countries!`);
    console.log(`   Countries: ${countryProfilesData.map(c => c.country).join(', ')}`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding country profiles:", error);
    process.exit(1);
  }
}

seedCountryProfiles();
