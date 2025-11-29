import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const universities = pgTable("universities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  country: text("country").notNull().default('Spain'), // Country code/name
  region: text("region").notNull(),
  city: text("city").notNull(),
  type: text("type").notNull(), // 'Public' or 'Private'
  languages: text("languages").array().notNull(),
  domains: text("domains").array().notNull(),
  admissionPeriod: text("admission_period").notNull(),
  website: text("website").notNull(),
  logoUrl: text("logo_url"),
  description: text("description").notNull(),
  ranking: serial("ranking"),
  englishPrograms: boolean("english_programs").notNull().default(false),
  tuitionFeeEU: text("tuition_fee_eu"),
  tuitionFeeNonEU: text("tuition_fee_non_eu"),
  tuitionPeriod: text("tuition_period"),
});

export const insertUniversitySchema = createInsertSchema(universities).omit({
  id: true,
  ranking: true,
});

export type InsertUniversity = z.infer<typeof insertUniversitySchema>;
export type University = typeof universities.$inferSelect;

export const costOfLiving = pgTable("cost_of_living", {
  id: serial("id").primaryKey(),
  country: text("country").notNull(),
  city: text("city").notNull(),
  rentShared: integer("rent_shared").notNull(),
  rentSolo: integer("rent_solo").notNull(),
  utilities: integer("utilities").notNull(),
  groceries: integer("groceries").notNull(),
  dining: integer("dining").notNull(),
  transport: integer("transport").notNull(),
  healthcare: integer("healthcare").notNull(),
  entertainment: integer("entertainment").notNull(),
  currency: text("currency").notNull().default('EUR'),
});

export const insertCostOfLivingSchema = createInsertSchema(costOfLiving).omit({
  id: true,
});

export type InsertCostOfLiving = z.infer<typeof insertCostOfLivingSchema>;
export type CostOfLiving = typeof costOfLiving.$inferSelect;
