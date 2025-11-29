import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const universities = pgTable("universities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
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
});

export const insertUniversitySchema = createInsertSchema(universities).omit({
  id: true,
  ranking: true,
});

export type InsertUniversity = z.infer<typeof insertUniversitySchema>;
export type University = typeof universities.$inferSelect;
