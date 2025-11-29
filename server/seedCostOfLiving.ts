import { db } from "./db";
import { costOfLiving } from "@shared/schema";
import { costOfLivingData } from "./costOfLivingData";

async function seedCostOfLiving() {
  try {
    console.log("Seeding cost of living data...");
    
    // Clear existing data
    await db.delete(costOfLiving);
    
    // Insert seed data
    await db.insert(costOfLiving).values(costOfLivingData);
    
    console.log(`✅ Cost of living data seeded successfully with ${costOfLivingData.length} cities!`);
    
    // Count by country
    const byCountry = costOfLivingData.reduce((acc, item) => {
      acc[item.country] = (acc[item.country] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    Object.entries(byCountry).forEach(([country, count]) => {
      console.log(`   - ${country}: ${count} cities`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding cost of living data:", error);
    process.exit(1);
  }
}

seedCostOfLiving();
