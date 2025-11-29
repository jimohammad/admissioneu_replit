import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUniversitySchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Get all countries
  app.get("/api/countries", async (req, res) => {
    try {
      const countries = await storage.getCountries();
      res.json(countries);
    } catch (error) {
      console.error("Error fetching countries:", error);
      res.status(500).json({ error: "Failed to fetch countries" });
    }
  });

  // Get regions by country
  app.get("/api/countries/:country/regions", async (req, res) => {
    try {
      const regions = await storage.getRegionsByCountry(req.params.country);
      res.json(regions);
    } catch (error) {
      console.error("Error fetching regions:", error);
      res.status(500).json({ error: "Failed to fetch regions" });
    }
  });

  // Get universities by country
  app.get("/api/countries/:country/universities", async (req, res) => {
    try {
      const universities = await storage.getUniversitiesByCountry(req.params.country);
      res.json(universities);
    } catch (error) {
      console.error("Error fetching universities:", error);
      res.status(500).json({ error: "Failed to fetch universities" });
    }
  });

  // Get all universities
  app.get("/api/universities", async (req, res) => {
    try {
      const universities = await storage.getAllUniversities();
      res.json(universities);
    } catch (error) {
      console.error("Error fetching universities:", error);
      res.status(500).json({ error: "Failed to fetch universities" });
    }
  });

  // Get university by ID
  app.get("/api/universities/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid university ID" });
      }

      const university = await storage.getUniversityById(id);
      if (!university) {
        return res.status(404).json({ error: "University not found" });
      }

      res.json(university);
    } catch (error) {
      console.error("Error fetching university:", error);
      res.status(500).json({ error: "Failed to fetch university" });
    }
  });

  // Search universities
  app.get("/api/universities/search/:query", async (req, res) => {
    try {
      const query = req.params.query;
      const universities = await storage.searchUniversities(query);
      res.json(universities);
    } catch (error) {
      console.error("Error searching universities:", error);
      res.status(500).json({ error: "Failed to search universities" });
    }
  });

  // Filter universities
  app.post("/api/universities/filter", async (req, res) => {
    try {
      const filters = req.body;
      const universities = await storage.filterUniversities(filters);
      res.json(universities);
    } catch (error) {
      console.error("Error filtering universities:", error);
      res.status(500).json({ error: "Failed to filter universities" });
    }
  });

  // Create university (admin endpoint)
  app.post("/api/universities", async (req, res) => {
    try {
      const validatedData = insertUniversitySchema.parse(req.body);
      const university = await storage.createUniversity(validatedData);
      res.status(201).json(university);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Validation error", details: error.errors });
      }
      console.error("Error creating university:", error);
      res.status(500).json({ error: "Failed to create university" });
    }
  });

  // Update university (admin endpoint)
  app.patch("/api/universities/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid university ID" });
      }

      const validatedData = insertUniversitySchema.partial().parse(req.body);
      const university = await storage.updateUniversity(id, validatedData);
      
      if (!university) {
        return res.status(404).json({ error: "University not found" });
      }

      res.json(university);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Validation error", details: error.errors });
      }
      console.error("Error updating university:", error);
      res.status(500).json({ error: "Failed to update university" });
    }
  });

  // Delete university (admin endpoint)
  app.delete("/api/universities/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid university ID" });
      }

      const deleted = await storage.deleteUniversity(id);
      if (!deleted) {
        return res.status(404).json({ error: "University not found" });
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting university:", error);
      res.status(500).json({ error: "Failed to delete university" });
    }
  });

  // Cost of Living routes
  app.get("/api/cost-of-living", async (req, res) => {
    try {
      const data = await storage.getAllCostOfLiving();
      res.json(data);
    } catch (error) {
      console.error("Error fetching cost of living data:", error);
      res.status(500).json({ error: "Failed to fetch cost of living data" });
    }
  });

  app.get("/api/cost-of-living/cities", async (req, res) => {
    try {
      const cities = await storage.getCostOfLivingCities();
      res.json(cities);
    } catch (error) {
      console.error("Error fetching cities:", error);
      res.status(500).json({ error: "Failed to fetch cities" });
    }
  });

  app.get("/api/cost-of-living/:country", async (req, res) => {
    try {
      const data = await storage.getCostOfLivingByCountry(req.params.country);
      res.json(data);
    } catch (error) {
      console.error("Error fetching cost of living data:", error);
      res.status(500).json({ error: "Failed to fetch cost of living data" });
    }
  });

  app.get("/api/cost-of-living/:country/:city", async (req, res) => {
    try {
      const data = await storage.getCostOfLivingByCity(req.params.city, req.params.country);
      if (!data) {
        return res.status(404).json({ error: "City not found" });
      }
      res.json(data);
    } catch (error) {
      console.error("Error fetching cost of living data:", error);
      res.status(500).json({ error: "Failed to fetch cost of living data" });
    }
  });

  return httpServer;
}
