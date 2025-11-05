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

// Media files for admin uploads
export const mediaFiles = pgTable("media_files", {
  id: serial("id").primaryKey(),
  filename: varchar("filename", { length: 255 }).notNull(),
  originalName: varchar("original_name", { length: 255 }).notNull(),
  mimeType: varchar("mime_type", { length: 100 }).notNull(),
  fileSize: integer("file_size").notNull(),
  filePath: varchar("file_path", { length: 500 }).notNull(),
  uploadedBy: varchar("uploaded_by", { length: 255 }),
  altText: varchar("alt_text", { length: 255 }),
  category: varchar("category", { length: 100 }).default("general"),
  isPublic: boolean("is_public").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Team members for about page
export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  imageUrl: varchar("image_url", { length: 500 }),
  category: varchar("category", { length: 100 }).default("leadership"), // leadership, advisors, team
  ordering: integer("ordering").default(0),
  isActive: boolean("is_active").default(true),
  linkedinUrl: varchar("linkedin_url", { length: 500 }),
  email: varchar("email", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Page content for CMS functionality
export const pageContent = pgTable("page_content", {
  id: serial("id").primaryKey(),
  pageId: varchar("page_id", { length: 100 }).notNull(),
  sectionId: varchar("section_id", { length: 100 }).notNull(),
  contentType: varchar("content_type", { length: 50 }).notNull(), // text, image, video, json
  content: text("content"),
  imageUrl: varchar("image_url", { length: 500 }),
  videoUrl: varchar("video_url", { length: 500 }),
  metadata: jsonb("metadata"), // Additional data like alt text, captions, etc.
  ordering: integer("ordering").default(0),
  isPublished: boolean("is_published").default(true),
  updatedBy: varchar("updated_by", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => ({
  pageSection: index("page_section_idx").on(table.pageId, table.sectionId),
}));

// Scholarship athletes
export const scholarshipAthletes = pgTable("scholarship_athletes", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  age: integer("age"),
  school: varchar("school", { length: 255 }),
  bio: text("bio"),
  achievements: text("achievements"), // JSON stringified array
  scholarshipYear: varchar("scholarship_year", { length: 20 }),
  imageUrl: varchar("image_url", { length: 500 }),
  ordering: integer("ordering").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
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

export const insertMediaFileSchema = createInsertSchema(mediaFiles).omit({
  id: true,
  createdAt: true,
});

export const insertPageContentSchema = createInsertSchema(pageContent).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertScholarshipAthleteSchema = createInsertSchema(scholarshipAthletes).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Type exports
export type MediaFile = typeof mediaFiles.$inferSelect;
export type PageContent = typeof pageContent.$inferSelect;
export type TeamMember = typeof teamMembers.$inferSelect;
export type MarketplaceItem = typeof marketplaceItems.$inferSelect;
export type ClassRegistration = typeof classRegistrations.$inferSelect;
export type GearDropoff = typeof gearDropoffs.$inferSelect;
export type GearPickup = typeof gearPickups.$inferSelect;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type Donation = typeof donations.$inferSelect;
export type EquipmentRequest = typeof equipmentRequests.$inferSelect;
export type ScholarshipAthlete = typeof scholarshipAthletes.$inferSelect;

export type InsertMarketplaceItem = z.infer<typeof insertMarketplaceItemSchema>;
export type InsertClassRegistration = z.infer<typeof insertClassRegistrationSchema>;
export type InsertGearDropoff = z.infer<typeof insertGearDropoffSchema>;
export type InsertGearPickup = z.infer<typeof insertGearPickupSchema>;
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type InsertDonation = z.infer<typeof insertDonationSchema>;
export type InsertEquipmentRequest = z.infer<typeof insertEquipmentRequestSchema>;
export type InsertMediaFile = z.infer<typeof insertMediaFileSchema>;
export type InsertPageContent = z.infer<typeof insertPageContentSchema>;
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;
export type InsertScholarshipAthlete = z.infer<typeof insertScholarshipAthleteSchema>;


