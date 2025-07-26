import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  integer,
  decimal,
  boolean,
  serial,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Marketplace items (no authentication required)
export const marketplaceItems = pgTable("marketplace_items", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  condition: varchar("condition", { length: 50 }).notNull(),
  size: varchar("size", { length: 50 }),
  imageUrl: varchar("image_url"),
  donorName: varchar("donor_name", { length: 255 }),
  donorEmail: varchar("donor_email", { length: 255 }),
  isAvailable: boolean("is_available").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Class registrations (no authentication required)
export const classRegistrations = pgTable("class_registrations", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  dateOfBirth: varchar("date_of_birth", { length: 20 }).notNull(),
  programType: varchar("program_type", { length: 100 }).notNull(),
  ageGroup: varchar("age_group", { length: 50 }).notNull(),
  experience: varchar("experience", { length: 50 }).notNull(),
  emergencyContact: varchar("emergency_contact", { length: 255 }).notNull(),
  emergencyPhone: varchar("emergency_phone", { length: 20 }).notNull(),
  medicalInfo: text("medical_info"),
  parentName: varchar("parent_name", { length: 255 }),
  parentEmail: varchar("parent_email", { length: 255 }),
  status: varchar("status", { length: 50 }).default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Gear dropoff registrations
export const gearDropoffs = pgTable("gear_dropoffs", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  itemDescription: text("item_description").notNull(),
  itemCondition: varchar("item_condition", { length: 50 }).notNull(),
  itemCategory: varchar("item_category", { length: 100 }).notNull(),
  estimatedValue: decimal("estimated_value", { precision: 10, scale: 2 }),
  preferredDropoffTime: varchar("preferred_dropoff_time", { length: 100 }),
  additionalNotes: text("additional_notes"),
  status: varchar("status", { length: 50 }).default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Gear pickup registrations
export const gearPickups = pgTable("gear_pickups", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  studentAge: integer("student_age").notNull(),
  equipmentNeeded: text("equipment_needed").notNull(),
  experienceLevel: varchar("experience_level", { length: 50 }).notNull(),
  programEnrolled: varchar("program_enrolled", { length: 100 }),
  preferredPickupTime: varchar("preferred_pickup_time", { length: 100 }),
  additionalInfo: text("additional_info"),
  status: varchar("status", { length: 50 }).default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Contact form submissions
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  status: varchar("status", { length: 50 }).default("new"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Donations (no user reference needed)
export const donations = pgTable("donations", {
  id: serial("id").primaryKey(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  isRecurring: boolean("is_recurring").default(false),
  donorEmail: varchar("donor_email", { length: 255 }).notNull(),
  donorName: varchar("donor_name", { length: 255 }).notNull(),
  status: varchar("status", { length: 50 }).default("pending"),
  paymentId: varchar("payment_id", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
});

// Equipment requests (simplified, no user reference)
export const equipmentRequests = pgTable("equipment_requests", {
  id: serial("id").primaryKey(),
  itemId: integer("item_id").notNull().references(() => marketplaceItems.id),
  requesterEmail: varchar("requester_email", { length: 255 }).notNull(),
  requesterName: varchar("requester_name", { length: 255 }).notNull(),
  message: text("message"),
  status: varchar("status", { length: 50 }).default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Create insert schemas
export const insertMarketplaceItemSchema = createInsertSchema(marketplaceItems).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertClassRegistrationSchema = createInsertSchema(classRegistrations).omit({
  id: true,
  createdAt: true,
  status: true,
});

export const insertGearDropoffSchema = createInsertSchema(gearDropoffs).omit({
  id: true,
  createdAt: true,
  status: true,
});

export const insertGearPickupSchema = createInsertSchema(gearPickups).omit({
  id: true,
  createdAt: true,
  status: true,
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true,
  status: true,
});

export const insertDonationSchema = createInsertSchema(donations).omit({
  id: true,
  createdAt: true,
  status: true,
});

export const insertEquipmentRequestSchema = createInsertSchema(equipmentRequests).omit({
  id: true,
  createdAt: true,
  status: true,
});

// Type exports
export type MarketplaceItem = typeof marketplaceItems.$inferSelect;
export type ClassRegistration = typeof classRegistrations.$inferSelect;
export type GearDropoff = typeof gearDropoffs.$inferSelect;
export type GearPickup = typeof gearPickups.$inferSelect;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type Donation = typeof donations.$inferSelect;
export type EquipmentRequest = typeof equipmentRequests.$inferSelect;

export type InsertMarketplaceItem = z.infer<typeof insertMarketplaceItemSchema>;
export type InsertClassRegistration = z.infer<typeof insertClassRegistrationSchema>;
export type InsertGearDropoff = z.infer<typeof insertGearDropoffSchema>;
export type InsertGearPickup = z.infer<typeof insertGearPickupSchema>;
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type InsertDonation = z.infer<typeof insertDonationSchema>;
export type InsertEquipmentRequest = z.infer<typeof insertEquipmentRequestSchema>;


