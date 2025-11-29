import { db } from "./db";
import { universities, costOfLiving, countryProfiles } from "@shared/schema";
import { dutchUniversities } from "./dutchUniversities";
import { costOfLivingData } from "./costOfLivingData";
import { countryProfilesData } from "./countryProfilesData";
import { eq, and } from "drizzle-orm";

async function seedNetherlands() {
  try {
    console.log("Seeding Netherlands data...");
    
    // Clear existing Dutch universities first for idempotency
    console.log("Clearing existing Dutch universities...");
    await db.delete(universities).where(eq(universities.country, 'Netherlands'));
    
    // Insert Dutch universities
    console.log("Adding Dutch universities...");
    await db.insert(universities).values(dutchUniversities);
    console.log(`✅ Added ${dutchUniversities.length} Dutch universities`);
    
    // Clear and re-insert Dutch cost of living data for idempotency
    console.log("Updating Dutch cost of living data...");
    await db.delete(costOfLiving).where(eq(costOfLiving.country, 'Netherlands'));
    
    const dutchCities = costOfLivingData.filter(c => c.country === 'Netherlands');
    for (const city of dutchCities) {
      await db.insert(costOfLiving).values(city);
      console.log(`  Added: ${city.city}`);
    }
    console.log(`✅ Added ${dutchCities.length} Dutch cities cost of living data`);
    
    // Update or insert Netherlands country profile
    console.log("Adding Netherlands country profile...");
    const netherlandsProfile = countryProfilesData.find(p => p.country === 'Netherlands');
    if (netherlandsProfile) {
      // Delete existing and re-insert
      await db.delete(countryProfiles).where(eq(countryProfiles.country, 'Netherlands'));
      await db.insert(countryProfiles).values(netherlandsProfile);
      console.log(`✅ Added Netherlands country profile`);
    }
    
    console.log("\n🎉 Netherlands data seeded successfully!");
    console.log(`   Universities: ${dutchUniversities.length}`);
    console.log(`   Cities: ${dutchCities.length}`);
    console.log(`   Country profile: 1`);
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding Netherlands data:", error);
    process.exit(1);
  }
}

seedNetherlands();
