import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Brands table
export const brands = pgTable("brands", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  logo: text("logo"),
  description: text("description"),
});

// Frames table
export const frames = pgTable("frames", {
  id: varchar("id").primaryKey(),
  brandId: varchar("brand_id").notNull(),
  name: text("name").notNull(),
  image: text("image").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  weight: decimal("weight", { precision: 5, scale: 2 }).notNull(),
  description: text("description"),
  travelMm: integer("travel_mm"),
  wheelSize: text("wheel_size"),
  material: text("material"),
});

// Components table (fork, wheelset, groupset, brakes, etc.)
export const components = pgTable("components", {
  id: varchar("id").primaryKey(),
  category: text("category").notNull(), // 'fork', 'wheelset', 'groupset', 'brakes', 'saddle', 'handlebar', 'stem'
  brand: text("brand").notNull(),
  name: text("name").notNull(),
  image: text("image").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  weight: decimal("weight", { precision: 5, scale: 2 }).notNull(),
  description: text("description"),
  specs: text("specs"),
  compatibleWheelSizes: text("compatible_wheel_sizes"),
});

// Custom builds table
export const builds = pgTable("builds", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  brandId: varchar("brand_id").notNull(),
  frameId: varchar("frame_id").notNull(),
  forkId: varchar("fork_id"),
  wheelsetId: varchar("wheelset_id"),
  groupsetId: varchar("groupset_id"),
  brakesId: varchar("brakes_id"),
  saddleId: varchar("saddle_id"),
  handlebarId: varchar("handlebar_id"),
  stemId: varchar("stem_id"),
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
  totalWeight: decimal("total_weight", { precision: 5, scale: 2 }).notNull(),
  riderWeight: integer("rider_weight"),
  riderHeight: integer("rider_height"),
  saddleHeight: integer("saddle_height"),
  tshirtSize: text("tshirt_size"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// Cart table
export const cart = pgTable("cart", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  buildId: varchar("build_id").notNull(),
  quantity: integer("quantity").notNull().default(1),
  addedAt: text("added_at").default(sql`CURRENT_TIMESTAMP`),
});

// Zod schemas for validation
export const insertBrandSchema = createInsertSchema(brands).omit({ id: true });
export const insertFrameSchema = createInsertSchema(frames).omit({ id: true });
export const insertComponentSchema = createInsertSchema(components).omit({ id: true });
export const insertBuildSchema = createInsertSchema(builds).omit({ id: true, createdAt: true });
export const insertCartSchema = createInsertSchema(cart).omit({ id: true, addedAt: true });

// TypeScript types
export type Brand = typeof brands.$inferSelect;
export type Frame = typeof frames.$inferSelect;
export type Component = typeof components.$inferSelect;
export type Build = typeof builds.$inferSelect;
export type CartItem = typeof cart.$inferSelect;

export type InsertBrand = z.infer<typeof insertBrandSchema>;
export type InsertFrame = z.infer<typeof insertFrameSchema>;
export type InsertComponent = z.infer<typeof insertComponentSchema>;
export type InsertBuild = z.infer<typeof insertBuildSchema>;
export type InsertCart = z.infer<typeof insertCartSchema>;

// Component categories enum
export const ComponentCategory = {
  FORK: 'fork',
  WHEELSET: 'wheelset',
  GROUPSET: 'groupset',
  BRAKES: 'brakes',
  SADDLE: 'saddle',
  HANDLEBAR: 'handlebar',
  STEM: 'stem',
} as const;

// Rider info schema
export const riderInfoSchema = z.object({
  riderWeight: z.number().min(50).max(500),
  riderHeight: z.number().min(48).max(96),
  saddleHeight: z.number().min(1),
  tshirtSize: z.enum(['XS', 'S', 'M', 'L', 'XL', 'XXL']).optional(),
});

export type RiderInfo = z.infer<typeof riderInfoSchema>;
