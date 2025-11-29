import { type University, type InsertUniversity, universities } from "@shared/schema";
import { db } from "./db";
import { eq, ilike, or, and, sql } from "drizzle-orm";

export interface IStorage {
  // University CRUD operations
  getAllUniversities(): Promise<University[]>;
  getUniversitiesByCountry(country: string): Promise<University[]>;
  getUniversityById(id: number): Promise<University | undefined>;
  searchUniversities(query: string, country?: string): Promise<University[]>;
  filterUniversities(filters: {
    country?: string;
    region?: string;
    type?: string;
    domain?: string;
    englishPrograms?: boolean;
  }): Promise<University[]>;
  getCountries(): Promise<string[]>;
  getRegionsByCountry(country: string): Promise<string[]>;
  createUniversity(university: InsertUniversity): Promise<University>;
  updateUniversity(id: number, university: Partial<InsertUniversity>): Promise<University | undefined>;
  deleteUniversity(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getAllUniversities(): Promise<University[]> {
    return await db.select().from(universities).orderBy(universities.ranking);
  }

  async getUniversitiesByCountry(country: string): Promise<University[]> {
    return await db
      .select()
      .from(universities)
      .where(eq(universities.country, country))
      .orderBy(universities.ranking);
  }

  async getUniversityById(id: number): Promise<University | undefined> {
    const [university] = await db
      .select()
      .from(universities)
      .where(eq(universities.id, id))
      .limit(1);
    return university;
  }

  async searchUniversities(query: string, country?: string): Promise<University[]> {
    const searchPattern = `%${query}%`;
    const searchCondition = or(
      ilike(universities.name, searchPattern),
      ilike(universities.city, searchPattern),
      ilike(universities.region, searchPattern),
      ilike(universities.country, searchPattern)
    );
    
    if (country) {
      return await db
        .select()
        .from(universities)
        .where(and(eq(universities.country, country), searchCondition))
        .orderBy(universities.ranking);
    }
    
    return await db
      .select()
      .from(universities)
      .where(searchCondition)
      .orderBy(universities.ranking);
  }

  async filterUniversities(filters: {
    country?: string;
    region?: string;
    type?: string;
    domain?: string;
    englishPrograms?: boolean;
  }): Promise<University[]> {
    const conditions = [];

    if (filters.country) {
      conditions.push(eq(universities.country, filters.country));
    }
    if (filters.region) {
      conditions.push(eq(universities.region, filters.region));
    }
    if (filters.type) {
      conditions.push(eq(universities.type, filters.type));
    }
    if (filters.domain) {
      conditions.push(sql`${filters.domain} = ANY(${universities.domains})`);
    }
    if (filters.englishPrograms !== undefined) {
      conditions.push(eq(universities.englishPrograms, filters.englishPrograms));
    }

    if (conditions.length === 0) {
      return this.getAllUniversities();
    }

    return await db
      .select()
      .from(universities)
      .where(and(...conditions))
      .orderBy(universities.ranking);
  }

  async getCountries(): Promise<string[]> {
    const result = await db
      .selectDistinct({ country: universities.country })
      .from(universities)
      .orderBy(universities.country);
    return result.map(r => r.country);
  }

  async getRegionsByCountry(country: string): Promise<string[]> {
    const result = await db
      .selectDistinct({ region: universities.region })
      .from(universities)
      .where(eq(universities.country, country))
      .orderBy(universities.region);
    return result.map(r => r.region);
  }

  async createUniversity(university: InsertUniversity): Promise<University> {
    const [newUniversity] = await db
      .insert(universities)
      .values(university)
      .returning();
    return newUniversity;
  }

  async updateUniversity(
    id: number,
    university: Partial<InsertUniversity>
  ): Promise<University | undefined> {
    const [updated] = await db
      .update(universities)
      .set(university)
      .where(eq(universities.id, id))
      .returning();
    return updated;
  }

  async deleteUniversity(id: number): Promise<boolean> {
    const result = await db
      .delete(universities)
      .where(eq(universities.id, id))
      .returning();
    return result.length > 0;
  }
}

export const storage = new DatabaseStorage();
