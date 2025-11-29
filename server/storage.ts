import { type University, type InsertUniversity, universities } from "@shared/schema";
import { db } from "./db";
import { eq, ilike, or, and, arrayContains, sql } from "drizzle-orm";

export interface IStorage {
  // University CRUD operations
  getAllUniversities(): Promise<University[]>;
  getUniversityById(id: number): Promise<University | undefined>;
  searchUniversities(query: string): Promise<University[]>;
  filterUniversities(filters: {
    region?: string;
    type?: string;
    domain?: string;
    englishPrograms?: boolean;
  }): Promise<University[]>;
  createUniversity(university: InsertUniversity): Promise<University>;
  updateUniversity(id: number, university: Partial<InsertUniversity>): Promise<University | undefined>;
  deleteUniversity(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getAllUniversities(): Promise<University[]> {
    return await db.select().from(universities).orderBy(universities.ranking);
  }

  async getUniversityById(id: number): Promise<University | undefined> {
    const [university] = await db
      .select()
      .from(universities)
      .where(eq(universities.id, id))
      .limit(1);
    return university;
  }

  async searchUniversities(query: string): Promise<University[]> {
    const searchPattern = `%${query}%`;
    return await db
      .select()
      .from(universities)
      .where(
        or(
          ilike(universities.name, searchPattern),
          ilike(universities.city, searchPattern),
          ilike(universities.region, searchPattern)
        )
      )
      .orderBy(universities.ranking);
  }

  async filterUniversities(filters: {
    region?: string;
    type?: string;
    domain?: string;
    englishPrograms?: boolean;
  }): Promise<University[]> {
    const conditions = [];

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
