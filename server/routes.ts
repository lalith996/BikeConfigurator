import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBuildSchema } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // GET /api/brands - Get all brands
  app.get("/api/brands", async (req, res) => {
    try {
      const brands = await storage.getBrands();
      res.json(brands);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch brands" });
    }
  });

  // GET /api/frames - Get all frames (optionally filter by brandId)
  app.get("/api/frames", async (req, res) => {
    try {
      const brandId = req.query.brandId as string | undefined;
      const frames = await storage.getFrames(brandId);
      res.json(frames);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch frames" });
    }
  });

  // GET /api/frames/:brandId - Get frames by brand ID
  app.get("/api/frames/:brandId", async (req, res) => {
    try {
      const { brandId } = req.params;
      const frames = await storage.getFrames(brandId);
      res.json(frames);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch frames" });
    }
  });

  // GET /api/components - Get all components (optionally filter by category and compatibility)
  app.get("/api/components", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      const wheelSize = req.query.wheelSize as string | undefined;
      
      const components = await storage.getComponents({
        category,
        wheelSize,
      });
      
      res.json(components);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch components" });
    }
  });

  // POST /api/builds - Create a new build
  app.post("/api/builds", async (req, res) => {
    try {
      const validation = insertBuildSchema.safeParse(req.body);
      
      if (!validation.success) {
        const errorMessage = fromZodError(validation.error).toString();
        return res.status(400).json({ error: errorMessage });
      }

      const build = await storage.createBuild(validation.data);
      
      // Automatically add to cart
      await storage.addToCart(build.id);
      
      res.status(201).json(build);
    } catch (error) {
      console.error("Error creating build:", error);
      res.status(500).json({ error: "Failed to create build" });
    }
  });

  // GET /api/builds - Get all builds
  app.get("/api/builds", async (req, res) => {
    try {
      const builds = await storage.getBuilds();
      res.json(builds);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch builds" });
    }
  });

  // GET /api/cart - Get cart items (builds in cart)
  app.get("/api/cart", async (req, res) => {
    try {
      const cartBuilds = await storage.getCart();
      res.json(cartBuilds);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cart" });
    }
  });

  // DELETE /api/cart/:buildId - Remove build from cart
  app.delete("/api/cart/:buildId", async (req, res) => {
    try {
      const { buildId } = req.params;
      await storage.removeFromCart(buildId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to remove from cart" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
