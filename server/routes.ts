import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertMarketplaceItemSchema,
  insertClassRegistrationSchema,
  insertGearDropoffSchema,
  insertGearPickupSchema,
  insertContactSubmissionSchema,
  insertDonationSchema,
  insertEquipmentRequestSchema,
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Marketplace routes
  app.get('/api/marketplace/items', async (req, res) => {
    try {
      const items = await storage.getMarketplaceItems();
      res.json(items);
    } catch (error) {
      console.error("Error fetching marketplace items:", error);
      res.status(500).json({ message: "Failed to fetch marketplace items" });
    }
  });

  app.post('/api/marketplace/items', async (req, res) => {
    try {
      const validatedData = insertMarketplaceItemSchema.parse(req.body);
      const newItem = await storage.createMarketplaceItem(validatedData);
      res.status(201).json(newItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error creating marketplace item:", error);
      res.status(500).json({ message: "Failed to create marketplace item" });
    }
  });

  // Class registration routes
  app.post('/api/class-registrations', async (req, res) => {
    try {
      const validatedData = insertClassRegistrationSchema.parse(req.body);
      const newRegistration = await storage.createClassRegistration(validatedData);
      res.status(201).json(newRegistration);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error creating class registration:", error);
      res.status(500).json({ message: "Failed to create class registration" });
    }
  });

  // Gear dropoff routes
  app.post('/api/gear-dropoffs', async (req, res) => {
    try {
      const validatedData = insertGearDropoffSchema.parse(req.body);
      const newDropoff = await storage.createGearDropoff(validatedData);
      res.status(201).json(newDropoff);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error creating gear dropoff:", error);
      res.status(500).json({ message: "Failed to create gear dropoff" });
    }
  });

  // Gear pickup routes
  app.post('/api/gear-pickups', async (req, res) => {
    try {
      const validatedData = insertGearPickupSchema.parse(req.body);
      const newPickup = await storage.createGearPickup(validatedData);
      res.status(201).json(newPickup);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error creating gear pickup:", error);
      res.status(500).json({ message: "Failed to create gear pickup" });
    }
  });

  // Contact routes
  app.post('/api/contact', async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const newSubmission = await storage.createContactSubmission(validatedData);
      res.status(201).json(newSubmission);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error creating contact submission:", error);
      res.status(500).json({ message: "Failed to create contact submission" });
    }
  });

  // Donation routes
  app.post('/api/donations', async (req, res) => {
    try {
      const validatedData = insertDonationSchema.parse(req.body);
      const newDonation = await storage.createDonation(validatedData);
      res.status(201).json(newDonation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error creating donation:", error);
      res.status(500).json({ message: "Failed to create donation" });
    }
  });

  // Equipment request routes
  app.post('/api/equipment-requests', async (req, res) => {
    try {
      const validatedData = insertEquipmentRequestSchema.parse(req.body);
      const newRequest = await storage.createEquipmentRequest(validatedData);
      res.status(201).json(newRequest);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error creating equipment request:", error);
      res.status(500).json({ message: "Failed to create equipment request" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}