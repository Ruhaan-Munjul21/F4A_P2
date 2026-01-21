var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  classRegistrations: () => classRegistrations,
  contactSubmissions: () => contactSubmissions,
  donations: () => donations,
  equipmentRequests: () => equipmentRequests,
  gearDropoffs: () => gearDropoffs,
  gearPickups: () => gearPickups,
  insertClassRegistrationSchema: () => insertClassRegistrationSchema,
  insertContactSubmissionSchema: () => insertContactSubmissionSchema,
  insertDonationSchema: () => insertDonationSchema,
  insertEquipmentRequestSchema: () => insertEquipmentRequestSchema,
  insertGearDropoffSchema: () => insertGearDropoffSchema,
  insertGearPickupSchema: () => insertGearPickupSchema,
  insertMarketplaceItemSchema: () => insertMarketplaceItemSchema,
  insertMediaFileSchema: () => insertMediaFileSchema,
  insertPageContentSchema: () => insertPageContentSchema,
  insertScholarshipAthleteSchema: () => insertScholarshipAthleteSchema,
  insertTeamMemberSchema: () => insertTeamMemberSchema,
  marketplaceItems: () => marketplaceItems,
  mediaFiles: () => mediaFiles,
  pageContent: () => pageContent,
  scholarshipAthletes: () => scholarshipAthletes,
  teamMembers: () => teamMembers
});
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
  serial
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var marketplaceItems, classRegistrations, gearDropoffs, gearPickups, contactSubmissions, donations, equipmentRequests, mediaFiles, teamMembers, pageContent, scholarshipAthletes, insertMarketplaceItemSchema, insertClassRegistrationSchema, insertGearDropoffSchema, insertGearPickupSchema, insertContactSubmissionSchema, insertDonationSchema, insertEquipmentRequestSchema, insertMediaFileSchema, insertPageContentSchema, insertTeamMemberSchema, insertScholarshipAthleteSchema;
var init_schema = __esm({
  "shared/schema.ts"() {
    "use strict";
    marketplaceItems = pgTable("marketplace_items", {
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
      updatedAt: timestamp("updated_at").defaultNow()
    });
    classRegistrations = pgTable("class_registrations", {
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
      createdAt: timestamp("created_at").defaultNow()
    });
    gearDropoffs = pgTable("gear_dropoffs", {
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
      createdAt: timestamp("created_at").defaultNow()
    });
    gearPickups = pgTable("gear_pickups", {
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
      createdAt: timestamp("created_at").defaultNow()
    });
    contactSubmissions = pgTable("contact_submissions", {
      id: serial("id").primaryKey(),
      firstName: varchar("first_name", { length: 100 }).notNull(),
      lastName: varchar("last_name", { length: 100 }).notNull(),
      email: varchar("email", { length: 255 }).notNull(),
      subject: varchar("subject", { length: 255 }).notNull(),
      message: text("message").notNull(),
      status: varchar("status", { length: 50 }).default("new"),
      createdAt: timestamp("created_at").defaultNow()
    });
    donations = pgTable("donations", {
      id: serial("id").primaryKey(),
      amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
      isRecurring: boolean("is_recurring").default(false),
      donorEmail: varchar("donor_email", { length: 255 }).notNull(),
      donorName: varchar("donor_name", { length: 255 }).notNull(),
      status: varchar("status", { length: 50 }).default("pending"),
      paymentId: varchar("payment_id", { length: 255 }),
      createdAt: timestamp("created_at").defaultNow()
    });
    equipmentRequests = pgTable("equipment_requests", {
      id: serial("id").primaryKey(),
      itemId: integer("item_id").notNull().references(() => marketplaceItems.id),
      requesterEmail: varchar("requester_email", { length: 255 }).notNull(),
      requesterName: varchar("requester_name", { length: 255 }).notNull(),
      message: text("message"),
      status: varchar("status", { length: 50 }).default("pending"),
      createdAt: timestamp("created_at").defaultNow()
    });
    mediaFiles = pgTable("media_files", {
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
      createdAt: timestamp("created_at").defaultNow()
    });
    teamMembers = pgTable("team_members", {
      id: serial("id").primaryKey(),
      name: varchar("name", { length: 255 }).notNull(),
      title: varchar("title", { length: 255 }).notNull(),
      description: text("description"),
      imageUrl: varchar("image_url", { length: 500 }),
      category: varchar("category", { length: 100 }).default("leadership"),
      // leadership, advisors, team
      ordering: integer("ordering").default(0),
      isActive: boolean("is_active").default(true),
      linkedinUrl: varchar("linkedin_url", { length: 500 }),
      email: varchar("email", { length: 255 }),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    pageContent = pgTable("page_content", {
      id: serial("id").primaryKey(),
      pageId: varchar("page_id", { length: 100 }).notNull(),
      sectionId: varchar("section_id", { length: 100 }).notNull(),
      contentType: varchar("content_type", { length: 50 }).notNull(),
      // text, image, video, json
      content: text("content"),
      imageUrl: varchar("image_url", { length: 500 }),
      videoUrl: varchar("video_url", { length: 500 }),
      metadata: jsonb("metadata"),
      // Additional data like alt text, captions, etc.
      ordering: integer("ordering").default(0),
      isPublished: boolean("is_published").default(true),
      updatedBy: varchar("updated_by", { length: 255 }),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    }, (table) => ({
      pageSection: index("page_section_idx").on(table.pageId, table.sectionId)
    }));
    scholarshipAthletes = pgTable("scholarship_athletes", {
      id: serial("id").primaryKey(),
      name: varchar("name", { length: 255 }).notNull(),
      age: integer("age"),
      school: varchar("school", { length: 255 }),
      bio: text("bio"),
      achievements: text("achievements"),
      // JSON stringified array
      scholarshipYear: varchar("scholarship_year", { length: 20 }),
      imageUrl: varchar("image_url", { length: 500 }),
      ordering: integer("ordering").default(0),
      isActive: boolean("is_active").default(true),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    insertMarketplaceItemSchema = createInsertSchema(marketplaceItems).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    insertClassRegistrationSchema = createInsertSchema(classRegistrations).omit({
      id: true,
      createdAt: true,
      status: true
    });
    insertGearDropoffSchema = createInsertSchema(gearDropoffs).omit({
      id: true,
      createdAt: true,
      status: true
    });
    insertGearPickupSchema = createInsertSchema(gearPickups).omit({
      id: true,
      createdAt: true,
      status: true
    });
    insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
      id: true,
      createdAt: true,
      status: true
    });
    insertDonationSchema = createInsertSchema(donations).omit({
      id: true,
      createdAt: true,
      status: true
    });
    insertEquipmentRequestSchema = createInsertSchema(equipmentRequests).omit({
      id: true,
      createdAt: true,
      status: true
    });
    insertMediaFileSchema = createInsertSchema(mediaFiles).omit({
      id: true,
      createdAt: true
    });
    insertPageContentSchema = createInsertSchema(pageContent).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    insertTeamMemberSchema = createInsertSchema(teamMembers).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    insertScholarshipAthleteSchema = createInsertSchema(scholarshipAthletes).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
  }
});

// server/db.ts
var db_exports = {};
__export(db_exports, {
  db: () => db,
  pool: () => pool
});
import { config } from "dotenv";
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
var pool, db;
var init_db = __esm({
  "server/db.ts"() {
    "use strict";
    init_schema();
    config();
    neonConfig.webSocketConstructor = ws;
    if (!process.env.DATABASE_URL) {
      throw new Error(
        "DATABASE_URL must be set. Did you forget to provision a database?"
      );
    }
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
    db = drizzle({ client: pool, schema: schema_exports });
  }
});

// server/index.ts
import express3 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
init_db();
init_schema();
import { eq, desc, sql } from "drizzle-orm";
var marketplaceItemsData = [
  {
    id: 1,
    title: "Complete Foil Set - Size Medium",
    description: "Excellent condition foil set including weapon, mask, jacket, and glove. Perfect for intermediate fencers.",
    category: "complete-set",
    condition: "good",
    size: "medium",
    imageUrl: null,
    donorName: "Sarah Johnson",
    donorEmail: "sarah@example.com",
    isAvailable: true,
    createdAt: /* @__PURE__ */ new Date("2024-12-01"),
    updatedAt: /* @__PURE__ */ new Date("2024-12-01")
  },
  {
    id: 2,
    title: "Beginner Foil Mask",
    description: "Great starter mask for youth fencers. Some wear but fully functional and safe.",
    category: "masks",
    condition: "fair",
    size: "small",
    imageUrl: null,
    donorName: "Mike Chen",
    donorEmail: "mike@example.com",
    isAvailable: true,
    createdAt: /* @__PURE__ */ new Date("2024-11-28"),
    updatedAt: /* @__PURE__ */ new Date("2024-11-28")
  },
  {
    id: 3,
    title: "Fencing Jacket - Adult Large",
    description: "Heavy-duty fencing jacket in excellent condition. Recently cleaned and inspected.",
    category: "jackets",
    condition: "like-new",
    size: "large",
    imageUrl: null,
    donorName: "Anonymous",
    donorEmail: "donor@example.com",
    isAvailable: true,
    createdAt: /* @__PURE__ */ new Date("2024-11-25"),
    updatedAt: /* @__PURE__ */ new Date("2024-11-25")
  }
];
var classRegistrationsData = [];
var gearDropoffsData = [];
var gearPickupsData = [];
var contactSubmissionsData = [];
var donationsData = [];
var equipmentRequestsData = [];
var mediaFilesData = [];
var pageContentData = [];
var teamMembersData = [];
var pageContentIdCounter = 1;
var teamMemberIdCounter = 1;
var MemoryStorage = class {
  // Marketplace operations
  async getMarketplaceItems() {
    return [...marketplaceItemsData].sort(
      (a, b) => new Date(b.createdAt || /* @__PURE__ */ new Date()).getTime() - new Date(a.createdAt || /* @__PURE__ */ new Date()).getTime()
    );
  }
  async createMarketplaceItem(item) {
    const newItem = {
      id: marketplaceItemsData.length + 1,
      ...item,
      size: item.size || null,
      imageUrl: item.imageUrl || null,
      donorName: item.donorName || null,
      donorEmail: item.donorEmail || null,
      isAvailable: item.isAvailable ?? true,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    };
    marketplaceItemsData.push(newItem);
    return newItem;
  }
  // Registration operations
  async createClassRegistration(registration) {
    const newRegistration = {
      id: classRegistrationsData.length + 1,
      ...registration,
      medicalInfo: registration.medicalInfo || null,
      parentName: registration.parentName || null,
      parentEmail: registration.parentEmail || null,
      status: "pending",
      createdAt: /* @__PURE__ */ new Date()
    };
    classRegistrationsData.push(newRegistration);
    return newRegistration;
  }
  async createGearDropoff(dropoff) {
    const newDropoff = {
      id: gearDropoffsData.length + 1,
      ...dropoff,
      estimatedValue: dropoff.estimatedValue || null,
      preferredDropoffTime: dropoff.preferredDropoffTime || null,
      additionalNotes: dropoff.additionalNotes || null,
      status: "pending",
      createdAt: /* @__PURE__ */ new Date()
    };
    gearDropoffsData.push(newDropoff);
    return newDropoff;
  }
  async createGearPickup(pickup) {
    const newPickup = {
      id: gearPickupsData.length + 1,
      ...pickup,
      programEnrolled: pickup.programEnrolled || null,
      preferredPickupTime: pickup.preferredPickupTime || null,
      additionalInfo: pickup.additionalInfo || null,
      status: "pending",
      createdAt: /* @__PURE__ */ new Date()
    };
    gearPickupsData.push(newPickup);
    return newPickup;
  }
  // Contact operations
  async createContactSubmission(submission) {
    const newSubmission = {
      id: contactSubmissionsData.length + 1,
      ...submission,
      status: "new",
      createdAt: /* @__PURE__ */ new Date()
    };
    contactSubmissionsData.push(newSubmission);
    return newSubmission;
  }
  // Donation operations
  async createDonation(donation) {
    const newDonation = {
      id: donationsData.length + 1,
      ...donation,
      isRecurring: donation.isRecurring ?? false,
      paymentId: donation.paymentId || null,
      status: "pending",
      createdAt: /* @__PURE__ */ new Date()
    };
    donationsData.push(newDonation);
    return newDonation;
  }
  // Equipment request operations
  async createEquipmentRequest(request) {
    const newRequest = {
      id: equipmentRequestsData.length + 1,
      ...request,
      message: request.message || null,
      status: "pending",
      createdAt: /* @__PURE__ */ new Date()
    };
    equipmentRequestsData.push(newRequest);
    return newRequest;
  }
  // Media file operations
  async createMediaFile(media) {
    const newMedia = {
      id: mediaFilesData.length + 1,
      ...media,
      uploadedBy: media.uploadedBy || null,
      altText: media.altText || null,
      category: media.category || "general",
      isPublic: media.isPublic ?? true,
      createdAt: /* @__PURE__ */ new Date()
    };
    mediaFilesData.push(newMedia);
    return newMedia;
  }
  async getMediaFiles(filters) {
    let filtered = [...mediaFilesData];
    if (filters?.category) {
      filtered = filtered.filter((m) => m.category === filters.category);
    }
    if (filters?.type) {
      const isImage = filters.type === "image";
      filtered = filtered.filter(
        (m) => isImage ? m.mimeType.startsWith("image/") : m.mimeType.startsWith("video/")
      );
    }
    return filtered.sort((a, b) => new Date(b.createdAt || /* @__PURE__ */ new Date()).getTime() - new Date(a.createdAt || /* @__PURE__ */ new Date()).getTime());
  }
  async getMediaFileById(id) {
    return mediaFilesData.find((m) => m.id === id) || null;
  }
  async deleteMediaFile(id) {
    const index2 = mediaFilesData.findIndex((m) => m.id === id);
    if (index2 > -1) {
      mediaFilesData.splice(index2, 1);
    }
  }
  // Page content methods
  async getPageContent(pageId, sectionId) {
    if (sectionId) {
      return pageContentData.filter((c) => c.pageId === pageId && c.sectionId === sectionId && c.isPublished);
    }
    return pageContentData.filter((c) => c.pageId === pageId && c.isPublished);
  }
  async getAllPageContent(pageId) {
    return pageContentData.filter((c) => c.pageId === pageId);
  }
  async createPageContent(data) {
    const newContent = {
      id: pageContentIdCounter++,
      ...data,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    };
    pageContentData.push(newContent);
    return newContent;
  }
  async updatePageContent(id, data) {
    const index2 = pageContentData.findIndex((c) => c.id === id);
    if (index2 === -1) throw new Error("Content not found");
    pageContentData[index2] = {
      ...pageContentData[index2],
      ...data,
      updatedAt: /* @__PURE__ */ new Date()
    };
    return pageContentData[index2];
  }
  async deletePageContent(id) {
    const index2 = pageContentData.findIndex((c) => c.id === id);
    if (index2 > -1) {
      pageContentData.splice(index2, 1);
    }
  }
  // Team member methods
  async getTeamMembers(category) {
    if (category) {
      return teamMembersData.filter((m) => m.category === category && m.isActive).sort((a, b) => a.ordering - b.ordering);
    }
    return teamMembersData.filter((m) => m.isActive).sort((a, b) => a.ordering - b.ordering);
  }
  async getAllTeamMembers() {
    return teamMembersData.sort((a, b) => a.ordering - b.ordering);
  }
  async createTeamMember(data) {
    const newMember = {
      id: teamMemberIdCounter++,
      ...data,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    };
    teamMembersData.push(newMember);
    return newMember;
  }
  async updateTeamMember(id, data) {
    const index2 = teamMembersData.findIndex((m) => m.id === id);
    if (index2 === -1) throw new Error("Team member not found");
    teamMembersData[index2] = {
      ...teamMembersData[index2],
      ...data,
      updatedAt: /* @__PURE__ */ new Date()
    };
    return teamMembersData[index2];
  }
  async deleteTeamMember(id) {
    const index2 = teamMembersData.findIndex((m) => m.id === id);
    if (index2 > -1) {
      teamMembersData.splice(index2, 1);
    }
  }
  async getAdminStats() {
    return {
      totalMarketplaceItems: marketplaceItemsData.length,
      totalRegistrations: classRegistrationsData.length,
      totalDropoffs: gearDropoffsData.length,
      totalPickups: gearPickupsData.length,
      totalContacts: contactSubmissionsData.length,
      totalDonations: donationsData.length,
      totalMediaFiles: mediaFilesData.length,
      recentActivity: {
        marketplaceItems: marketplaceItemsData.slice(-5),
        registrations: classRegistrationsData.slice(-5),
        mediaFiles: mediaFilesData.slice(-5)
      }
    };
  }
  async upsertUser(user) {
    return user;
  }
};
var DatabaseStorage = class {
  // Marketplace operations
  async getMarketplaceItems() {
    return await db.select().from(marketplaceItems).where(eq(marketplaceItems.isAvailable, true)).orderBy(desc(marketplaceItems.createdAt));
  }
  async createMarketplaceItem(item) {
    const [newItem] = await db.insert(marketplaceItems).values(item).returning();
    return newItem;
  }
  // Registration operations
  async createClassRegistration(registration) {
    const [newRegistration] = await db.insert(classRegistrations).values(registration).returning();
    return newRegistration;
  }
  async createGearDropoff(dropoff) {
    const [newDropoff] = await db.insert(gearDropoffs).values(dropoff).returning();
    return newDropoff;
  }
  async createGearPickup(pickup) {
    const [newPickup] = await db.insert(gearPickups).values(pickup).returning();
    return newPickup;
  }
  // Contact operations
  async createContactSubmission(submission) {
    const [newSubmission] = await db.insert(contactSubmissions).values(submission).returning();
    return newSubmission;
  }
  // Donation operations
  async createDonation(donation) {
    const [newDonation] = await db.insert(donations).values(donation).returning();
    return newDonation;
  }
  // Equipment request operations
  async createEquipmentRequest(request) {
    const [newRequest] = await db.insert(equipmentRequests).values(request).returning();
    return newRequest;
  }
  // Media file operations
  async createMediaFile(media) {
    const [newMedia] = await db.insert(mediaFiles).values(media).returning();
    return newMedia;
  }
  async getMediaFiles(filters) {
    let queryBuilder = db.select().from(mediaFiles);
    if (filters?.category) {
      queryBuilder = queryBuilder.where(eq(mediaFiles.category, filters.category));
    }
    let results = await queryBuilder.orderBy(desc(mediaFiles.createdAt));
    if (filters?.type) {
      const isImage = filters.type === "image";
      results = results.filter(
        (m) => isImage ? m.mimeType.startsWith("image/") : m.mimeType.startsWith("video/")
      );
    }
    return results;
  }
  async getMediaFileById(id) {
    const [media] = await db.select().from(mediaFiles).where(eq(mediaFiles.id, id));
    return media || null;
  }
  async deleteMediaFile(id) {
    await db.delete(mediaFiles).where(eq(mediaFiles.id, id));
  }
  // Page content methods
  async getPageContent(pageId, sectionId) {
    try {
      if (sectionId) {
        return await db.select().from(pageContent).where(sql`${pageContent.pageId} = ${pageId} AND ${pageContent.sectionId} = ${sectionId} AND ${pageContent.isPublished} = true`).orderBy(pageContent.ordering);
      }
      return await db.select().from(pageContent).where(sql`${pageContent.pageId} = ${pageId} AND ${pageContent.isPublished} = true`).orderBy(pageContent.ordering);
    } catch (error) {
      console.error("Error fetching page content:", error);
      return [];
    }
  }
  async getAllPageContent(pageId) {
    try {
      return await db.select().from(pageContent).where(eq(pageContent.pageId, pageId)).orderBy(pageContent.ordering);
    } catch (error) {
      console.error("Error fetching all page content:", error);
      return [];
    }
  }
  async createPageContent(data) {
    const [result] = await db.insert(pageContent).values(data).returning();
    return result;
  }
  async updatePageContent(id, data) {
    const [result] = await db.update(pageContent).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(pageContent.id, id)).returning();
    return result;
  }
  async deletePageContent(id) {
    await db.delete(pageContent).where(eq(pageContent.id, id));
  }
  // Team member methods
  async getTeamMembers(category) {
    try {
      if (category) {
        return await db.select().from(teamMembers).where(sql`${teamMembers.category} = ${category} AND ${teamMembers.isActive} = true`).orderBy(teamMembers.ordering);
      }
      return await db.select().from(teamMembers).where(eq(teamMembers.isActive, true)).orderBy(teamMembers.ordering);
    } catch (error) {
      console.error("Error fetching team members:", error);
      return [];
    }
  }
  async getAllTeamMembers() {
    try {
      return await db.select().from(teamMembers).orderBy(teamMembers.ordering);
    } catch (error) {
      console.error("Error fetching all team members:", error);
      return [];
    }
  }
  async createTeamMember(data) {
    const [result] = await db.insert(teamMembers).values(data).returning();
    return result;
  }
  async updateTeamMember(id, data) {
    const [result] = await db.update(teamMembers).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(teamMembers.id, id)).returning();
    return result;
  }
  async deleteTeamMember(id) {
    await db.delete(teamMembers).where(eq(teamMembers.id, id));
  }
  // Scholarship athlete methods
  async getScholarshipAthletes() {
    try {
      return await db.select().from(scholarshipAthletes).where(eq(scholarshipAthletes.isActive, true)).orderBy(scholarshipAthletes.ordering);
    } catch (error) {
      console.error("Error fetching scholarship athletes:", error);
      return [];
    }
  }
  async getAllScholarshipAthletes() {
    try {
      return await db.select().from(scholarshipAthletes).orderBy(scholarshipAthletes.ordering);
    } catch (error) {
      console.error("Error fetching all scholarship athletes:", error);
      return [];
    }
  }
  async createScholarshipAthlete(data) {
    const [result] = await db.insert(scholarshipAthletes).values(data).returning();
    return result;
  }
  async updateScholarshipAthlete(id, data) {
    const [result] = await db.update(scholarshipAthletes).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(scholarshipAthletes.id, id)).returning();
    return result;
  }
  async deleteScholarshipAthlete(id) {
    await db.delete(scholarshipAthletes).where(eq(scholarshipAthletes.id, id));
  }
  async getAdminStats() {
    const [marketplaceCount] = await db.select({ count: sql`count(*)` }).from(marketplaceItems);
    const [registrationCount] = await db.select({ count: sql`count(*)` }).from(classRegistrations);
    const [dropoffCount] = await db.select({ count: sql`count(*)` }).from(gearDropoffs);
    const [pickupCount] = await db.select({ count: sql`count(*)` }).from(gearPickups);
    const [contactCount] = await db.select({ count: sql`count(*)` }).from(contactSubmissions);
    const [donationCount] = await db.select({ count: sql`count(*)` }).from(donations);
    const [mediaCount] = await db.select({ count: sql`count(*)` }).from(mediaFiles);
    const recentMarketplace = await db.select().from(marketplaceItems).orderBy(desc(marketplaceItems.createdAt)).limit(5);
    const recentRegistrations = await db.select().from(classRegistrations).orderBy(desc(classRegistrations.createdAt)).limit(5);
    const recentMedia = await db.select().from(mediaFiles).orderBy(desc(mediaFiles.createdAt)).limit(5);
    return {
      totalMarketplaceItems: Number(marketplaceCount.count),
      totalRegistrations: Number(registrationCount.count),
      totalDropoffs: Number(dropoffCount.count),
      totalPickups: Number(pickupCount.count),
      totalContacts: Number(contactCount.count),
      totalDonations: Number(donationCount.count),
      totalMediaFiles: Number(mediaCount.count),
      recentActivity: {
        marketplaceItems: recentMarketplace,
        registrations: recentRegistrations,
        mediaFiles: recentMedia
      }
    };
  }
  async upsertUser(user) {
    return user;
  }
};
var storage = process.env.DATABASE_URL ? new DatabaseStorage() : new MemoryStorage();

// server/admin-routes.ts
import express from "express";
import multer from "multer";
init_schema();
import { z } from "zod";

// server/firebase-config.ts
import admin from "firebase-admin";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { config as config2 } from "dotenv";
config2();
var firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "dummy-api-key",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "dummy.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "dummy-project",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "dummy.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "123456",
  appId: process.env.FIREBASE_APP_ID || "dummy-app-id"
};
var adminApp = null;
var bucket = null;
var isFirebaseConfigured = false;
try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY && process.env.FIREBASE_SERVICE_ACCOUNT_KEY !== "{}" && !process.env.FIREBASE_SERVICE_ACCOUNT_KEY.includes("your-project-id")) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    adminApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET
    });
    bucket = admin.storage().bucket();
    isFirebaseConfigured = true;
    console.log("\u2705 Firebase Admin initialized with service account");
  } else {
    console.log("\u26A0\uFE0F  Firebase Admin not configured - using mock storage");
    console.log("   To enable Firebase storage, add valid credentials to .env file");
  }
} catch (error) {
  console.error("\u26A0\uFE0F  Failed to initialize Firebase Admin:", error);
  console.log("   Firebase storage features will be disabled");
  adminApp = null;
  bucket = null;
}
var app = initializeApp(firebaseConfig);
var storage2 = getStorage(app);

// server/firebase-storage.ts
import { v4 as uuidv4 } from "uuid";
import path from "path";
import sharp from "sharp";
var DEFAULT_OPTIONS = {
  folder: "uploads",
  maxSizeBytes: 200 * 1024 * 1024,
  // 200MB for video support
  allowedMimeTypes: [
    // Image formats
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    // Video formats
    "video/mp4",
    "video/quicktime",
    "video/x-msvideo",
    "video/webm",
    "video/mov",
    "video/mpeg",
    // Audio formats
    "audio/mpeg",
    // MP3
    "audio/mp3",
    "audio/wav",
    "audio/webm",
    "audio/ogg",
    "audio/m4a"
  ],
  generateThumbnail: true,
  thumbnailSize: { width: 400, height: 400 },
  makePublic: true
};
var FirebaseStorageService = class {
  /**
   * Upload a file to Firebase Storage
   */
  static async uploadFile(fileBuffer, originalName, mimeType, options = {}) {
    if (!isFirebaseConfigured || !bucket) {
      console.warn("Firebase Storage not configured - returning mock URL");
      return {
        url: `/uploads/mock/${originalName}`,
        thumbnailUrl: void 0,
        fileName: originalName,
        size: fileBuffer.length,
        mimeType,
        metadata: {
          originalName,
          uploadedAt: (/* @__PURE__ */ new Date()).toISOString()
        }
      };
    }
    const opts = { ...DEFAULT_OPTIONS, ...options };
    if (fileBuffer.length > (opts.maxSizeBytes || DEFAULT_OPTIONS.maxSizeBytes)) {
      throw new Error(`File size exceeds maximum allowed size of ${opts.maxSizeBytes} bytes`);
    }
    if (opts.allowedMimeTypes && !opts.allowedMimeTypes.includes(mimeType)) {
      throw new Error(`File type ${mimeType} is not allowed`);
    }
    const ext = path.extname(originalName);
    const nameWithoutExt = path.basename(originalName, ext);
    const uniqueId = uuidv4();
    const fileName = `${nameWithoutExt}-${uniqueId}${ext}`;
    const filePath = `${opts.folder}/${fileName}`;
    const file = bucket.file(filePath);
    const stream = file.createWriteStream({
      metadata: {
        contentType: mimeType,
        metadata: {
          originalName,
          uploadedAt: (/* @__PURE__ */ new Date()).toISOString()
        }
      },
      resumable: false
    });
    await new Promise((resolve, reject) => {
      stream.on("error", reject);
      stream.on("finish", resolve);
      stream.end(fileBuffer);
    });
    if (opts.makePublic) {
      await file.makePublic();
    }
    const url = opts.makePublic ? `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(filePath)}?alt=media` : await this.getSignedUrl(filePath);
    let thumbnailUrl;
    if (opts.generateThumbnail && mimeType.startsWith("image/")) {
      thumbnailUrl = await this.generateThumbnail(
        fileBuffer,
        fileName,
        opts.folder,
        opts.thumbnailSize,
        opts.makePublic
      );
    }
    return {
      url,
      thumbnailUrl,
      fileName,
      size: fileBuffer.length,
      mimeType,
      metadata: {
        originalName,
        uploadedAt: (/* @__PURE__ */ new Date()).toISOString()
      }
    };
  }
  /**
   * Generate and upload a thumbnail
   */
  static async generateThumbnail(imageBuffer, originalFileName, folder, size, makePublic) {
    try {
      const thumbnailBuffer = await sharp(imageBuffer).resize(size.width, size.height, {
        fit: "inside",
        withoutEnlargement: true
      }).jpeg({ quality: 80 }).toBuffer();
      const ext = path.extname(originalFileName);
      const nameWithoutExt = path.basename(originalFileName, ext);
      const thumbnailFileName = `${nameWithoutExt}-thumb.jpg`;
      const thumbnailPath = `${folder}/thumbnails/${thumbnailFileName}`;
      const thumbnailFile = bucket.file(thumbnailPath);
      const stream = thumbnailFile.createWriteStream({
        metadata: {
          contentType: "image/jpeg",
          metadata: {
            isThumbnail: "true",
            originalFile: originalFileName
          }
        },
        resumable: false
      });
      await new Promise((resolve, reject) => {
        stream.on("error", reject);
        stream.on("finish", resolve);
        stream.end(thumbnailBuffer);
      });
      if (makePublic) {
        await thumbnailFile.makePublic();
      }
      return makePublic ? `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(thumbnailPath)}?alt=media` : await this.getSignedUrl(thumbnailPath);
    } catch (error) {
      console.error("Error generating thumbnail:", error);
      return "";
    }
  }
  /**
   * Delete a file from Firebase Storage
   */
  static async deleteFile(filePath) {
    if (!isFirebaseConfigured || !bucket) {
      console.warn("Firebase Storage not configured - skipping delete");
      return;
    }
    try {
      const file = bucket.file(filePath);
      await file.delete();
    } catch (error) {
      console.error("Error deleting file:", error);
      throw error;
    }
  }
  /**
   * Delete multiple files
   */
  static async deleteFiles(filePaths) {
    const deletePromises = filePaths.map((path4) => this.deleteFile(path4));
    await Promise.all(deletePromises);
  }
  /**
   * Get a signed URL for private files
   */
  static async getSignedUrl(filePath, expiresInMinutes = 60) {
    if (!isFirebaseConfigured || !bucket) {
      console.warn("Firebase Storage not configured - returning mock URL");
      return `/uploads/mock/${filePath}`;
    }
    const file = bucket.file(filePath);
    const [signedUrl] = await file.getSignedUrl({
      version: "v4",
      action: "read",
      expires: Date.now() + expiresInMinutes * 60 * 1e3
    });
    return signedUrl;
  }
  /**
   * List files in a folder
   */
  static async listFiles(folder, limit = 100) {
    if (!isFirebaseConfigured || !bucket) {
      console.warn("Firebase Storage not configured - returning empty list");
      return [];
    }
    const [files] = await bucket.getFiles({
      prefix: folder,
      maxResults: limit
    });
    return Promise.all(files.map(async (file) => {
      const [metadata] = await file.getMetadata();
      return {
        name: file.name,
        size: parseInt(metadata.size || "0"),
        updated: metadata.updated,
        url: `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(file.name)}?alt=media`
      };
    }));
  }
  /**
   * Move a file to a different location
   */
  static async moveFile(oldPath, newPath) {
    const file = bucket.file(oldPath);
    await file.move(newPath);
  }
  /**
   * Check if file exists
   */
  static async fileExists(filePath) {
    const file = bucket.file(filePath);
    const [exists] = await file.exists();
    return exists;
  }
  /**
   * Get file metadata
   */
  static async getFileMetadata(filePath) {
    const file = bucket.file(filePath);
    const [metadata] = await file.getMetadata();
    return metadata;
  }
  /**
   * Stream upload for large files
   */
  static async streamUpload(stream, fileName, mimeType, options = {}) {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const filePath = `${opts.folder}/${fileName}`;
    const file = bucket.file(filePath);
    const writeStream = file.createWriteStream({
      metadata: {
        contentType: mimeType
      },
      resumable: true
    });
    return new Promise((resolve, reject) => {
      let uploadedBytes = 0;
      stream.on("data", (chunk) => {
        uploadedBytes += chunk.length;
      });
      stream.on("error", reject);
      writeStream.on("error", reject);
      writeStream.on("finish", async () => {
        if (opts.makePublic) {
          await file.makePublic();
        }
        const url = opts.makePublic ? `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(filePath)}?alt=media` : await this.getSignedUrl(filePath);
        resolve({
          url,
          fileName,
          size: uploadedBytes,
          mimeType
        });
      });
      stream.pipe(writeStream);
    });
  }
};
var firebase_storage_default = FirebaseStorageService;

// server/admin-routes.ts
var upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 200 * 1024 * 1024
    // 200MB limit for video support
  },
  fileFilter: (_req, file, cb) => {
    console.log("File upload attempt:", file.originalname, "MIME:", file.mimetype);
    if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/") || file.mimetype.startsWith("audio/")) {
      cb(null, true);
    } else {
      cb(new Error(`Only image, video, and audio files are allowed. Received: ${file.mimetype}`));
    }
  }
});
function registerAdminRoutes(app3) {
  app3.post("/api/admin/media/upload", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      const folder = req.file.mimetype.startsWith("image/") ? "images" : "videos";
      const uploadResult = await firebase_storage_default.uploadFile(
        req.file.buffer,
        req.file.originalname,
        req.file.mimetype,
        {
          folder,
          generateThumbnail: req.file.mimetype.startsWith("image/"),
          makePublic: req.body.isPublic !== "false"
        }
      );
      const mediaData = {
        filename: uploadResult.fileName,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        fileSize: req.file.size,
        filePath: uploadResult.url,
        // Store Firebase URL instead of local path
        uploadedBy: req.body.uploadedBy || "admin",
        altText: req.body.altText || req.file.originalname,
        category: req.body.category || "general",
        isPublic: req.body.isPublic !== "false"
      };
      const validatedData = insertMediaFileSchema.parse(mediaData);
      const newMedia = await storage.createMediaFile(validatedData);
      res.status(201).json({
        message: "File uploaded successfully",
        media: newMedia,
        url: uploadResult.url,
        thumbnailUrl: uploadResult.thumbnailUrl
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error uploading media:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to upload media";
      res.status(500).json({ message: errorMessage, error: error.toString() });
    }
  });
  app3.post("/api/admin/media/upload-batch", upload.array("files", 10), async (req, res) => {
    try {
      if (!req.files || !Array.isArray(req.files)) {
        return res.status(400).json({ message: "No files uploaded" });
      }
      const uploadPromises = req.files.map(async (file) => {
        const folder = file.mimetype.startsWith("image/") ? "images" : "videos";
        const uploadResult = await firebase_storage_default.uploadFile(
          file.buffer,
          file.originalname,
          file.mimetype,
          {
            folder,
            generateThumbnail: file.mimetype.startsWith("image/"),
            makePublic: req.body.isPublic !== "false"
          }
        );
        const mediaData = {
          filename: uploadResult.fileName,
          originalName: file.originalname,
          mimeType: file.mimetype,
          fileSize: file.size,
          filePath: uploadResult.url,
          uploadedBy: req.body.uploadedBy || "admin",
          altText: req.body.altText || file.originalname,
          category: req.body.category || "general",
          isPublic: req.body.isPublic !== "false"
        };
        const validatedData = insertMediaFileSchema.parse(mediaData);
        const newMedia = await storage.createMediaFile(validatedData);
        return {
          media: newMedia,
          url: uploadResult.url,
          thumbnailUrl: uploadResult.thumbnailUrl
        };
      });
      const results = await Promise.all(uploadPromises);
      res.status(201).json({
        message: "Files uploaded successfully",
        results
      });
    } catch (error) {
      console.error("Error uploading batch media:", error);
      res.status(500).json({ message: "Failed to upload media files" });
    }
  });
  app3.get("/api/admin/media", async (_req, res) => {
    try {
      const { category, type } = _req.query;
      const mediaFiles2 = await storage.getMediaFiles({
        category,
        type
      });
      res.json(mediaFiles2);
    } catch (error) {
      console.error("Error fetching media files:", error);
      res.status(500).json({ message: "Failed to fetch media files" });
    }
  });
  app3.delete("/api/admin/media/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const media = await storage.getMediaFileById(id);
      if (!media) {
        return res.status(404).json({ message: "Media file not found" });
      }
      if (media.filePath && media.filePath.includes("storage.googleapis.com")) {
        const urlParts = media.filePath.split("/");
        const bucketIndex = urlParts.findIndex((part) => part.includes(".appspot.com"));
        if (bucketIndex !== -1 && bucketIndex < urlParts.length - 1) {
          const filePath = urlParts.slice(bucketIndex + 1).join("/");
          try {
            await firebase_storage_default.deleteFile(filePath);
          } catch (error) {
            console.error("Error deleting file from Firebase:", error);
          }
        }
      }
      await storage.deleteMediaFile(id);
      res.json({ message: "Media file deleted successfully" });
    } catch (error) {
      console.error("Error deleting media file:", error);
      res.status(500).json({ message: "Failed to delete media file" });
    }
  });
  app3.get("/api/admin/dashboard", async (_req, res) => {
    try {
      const stats = await storage.getAdminStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching admin stats:", error);
      res.status(500).json({ message: "Failed to fetch admin statistics" });
    }
  });
  app3.get("/api/admin/media/firebase-files", async (req, res) => {
    try {
      const folder = req.query.folder || "uploads";
      const limit = parseInt(req.query.limit) || 100;
      const files = await firebase_storage_default.listFiles(folder, limit);
      res.json(files);
    } catch (error) {
      console.error("Error listing Firebase files:", error);
      res.status(500).json({ message: "Failed to list Firebase files" });
    }
  });
  app3.get("/api/admin/media/signed-url/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const media = await storage.getMediaFileById(id);
      if (!media) {
        return res.status(404).json({ message: "Media file not found" });
      }
      if (!media.isPublic && media.filePath) {
        const urlParts = media.filePath.split("/");
        const bucketIndex = urlParts.findIndex((part) => part.includes(".appspot.com"));
        if (bucketIndex !== -1 && bucketIndex < urlParts.length - 1) {
          const filePath = urlParts.slice(bucketIndex + 1).join("/");
          const signedUrl = await firebase_storage_default.getSignedUrl(filePath, 60);
          res.json({ url: signedUrl });
        } else {
          res.json({ url: media.filePath });
        }
      } else {
        res.json({ url: media.filePath });
      }
    } catch (error) {
      console.error("Error generating signed URL:", error);
      res.status(500).json({ message: "Failed to generate signed URL" });
    }
  });
  app3.get("/api/admin/page-content/:pageId", async (req, res) => {
    try {
      const { pageId } = req.params;
      const { sectionId } = req.query;
      const content = await storage.getAllPageContent(pageId);
      res.json(content);
    } catch (error) {
      console.error("Error fetching page content:", error);
      res.status(500).json({ message: "Failed to fetch page content" });
    }
  });
  app3.get("/api/page-content/:pageId", async (req, res) => {
    try {
      const { pageId } = req.params;
      const { sectionId } = req.query;
      const content = await storage.getPageContent(pageId, sectionId);
      res.json(content);
    } catch (error) {
      console.error("Error fetching page content:", error);
      res.status(500).json({ message: "Failed to fetch page content" });
    }
  });
  app3.post("/api/admin/page-content", async (req, res) => {
    try {
      const validatedData = insertPageContentSchema.parse(req.body);
      const newContent = await storage.createPageContent(validatedData);
      res.status(201).json(newContent);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error creating page content:", error);
      res.status(500).json({ message: "Failed to create page content" });
    }
  });
  app3.put("/api/admin/page-content/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertPageContentSchema.partial().parse(req.body);
      const updated = await storage.updatePageContent(Number(id), validatedData);
      res.json(updated);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error updating page content:", error);
      res.status(500).json({ message: "Failed to update page content" });
    }
  });
  app3.delete("/api/admin/page-content/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deletePageContent(Number(id));
      res.json({ message: "Content deleted successfully" });
    } catch (error) {
      console.error("Error deleting page content:", error);
      res.status(500).json({ message: "Failed to delete page content" });
    }
  });
  app3.get("/api/team-members", async (req, res) => {
    try {
      const { category } = req.query;
      const members = await storage.getTeamMembers(category);
      res.json(members);
    } catch (error) {
      console.error("Error fetching team members:", error);
      res.status(500).json({ message: "Failed to fetch team members" });
    }
  });
  app3.get("/api/admin/team-members", async (req, res) => {
    try {
      const members = await storage.getAllTeamMembers();
      const response = members.map((member) => ({
        ...member,
        imageUrl: member.image_url || member.imageUrl,
        isActive: member.is_active !== void 0 ? member.is_active : member.isActive,
        linkedinUrl: member.linkedin_url || member.linkedinUrl,
        createdAt: member.created_at || member.createdAt,
        updatedAt: member.updated_at || member.updatedAt
      }));
      res.json(response);
    } catch (error) {
      console.error("Error fetching all team members:", error);
      res.status(500).json({ message: "Failed to fetch team members" });
    }
  });
  app3.put("/api/admin/team-members/reorder", async (req, res) => {
    try {
      console.log("Reorder request:", req.body);
      const { members } = req.body;
      if (!Array.isArray(members)) {
        return res.status(400).json({ message: "Invalid data: members must be an array" });
      }
      const { db: db2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      const { teamMembers: teamMembers2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
      const { eq: eq2, sql: sql2 } = await import("drizzle-orm");
      for (const member of members) {
        if (member.id && typeof member.ordering === "number") {
          console.log(`Updating member ${member.id} to ordering ${member.ordering}`);
          await db2.update(teamMembers2).set({
            ordering: member.ordering,
            updated_at: /* @__PURE__ */ new Date()
          }).where(eq2(teamMembers2.id, member.id));
        }
      }
      res.json({ message: "Ordering updated successfully" });
    } catch (error) {
      console.error("Error updating team member ordering:", error);
      res.status(500).json({
        message: "Failed to update ordering",
        error: error instanceof Error ? error.message : String(error),
        details: error
      });
    }
  });
  app3.post("/api/admin/team-members", async (req, res) => {
    try {
      console.log("Create team member request:", req.body);
      const dbData = {
        name: req.body.name,
        title: req.body.title,
        description: req.body.description || null,
        image_url: req.body.imageUrl || null,
        category: req.body.category || "leadership",
        ordering: req.body.ordering || 0,
        is_active: req.body.isActive !== false,
        linkedin_url: req.body.linkedinUrl || null,
        email: req.body.email || null
      };
      console.log("Converted data for DB:", dbData);
      const validatedData = insertTeamMemberSchema.parse(dbData);
      console.log("Validated data:", validatedData);
      const newMember = await storage.createTeamMember(validatedData);
      console.log("Created team member:", newMember);
      const response = {
        ...newMember,
        imageUrl: newMember.image_url,
        isActive: newMember.is_active,
        linkedinUrl: newMember.linkedin_url
      };
      res.status(201).json(response);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation error:", error.errors);
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error creating team member:", error);
      res.status(500).json({ message: "Failed to create team member", error: error.toString() });
    }
  });
  app3.put("/api/admin/team-members/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const dbData = {};
      if (req.body.name !== void 0) dbData.name = req.body.name;
      if (req.body.title !== void 0) dbData.title = req.body.title;
      if (req.body.description !== void 0) dbData.description = req.body.description || null;
      if (req.body.imageUrl !== void 0) dbData.image_url = req.body.imageUrl || null;
      if (req.body.category !== void 0) dbData.category = req.body.category;
      if (req.body.ordering !== void 0) dbData.ordering = req.body.ordering;
      if (req.body.isActive !== void 0) dbData.is_active = req.body.isActive;
      if (req.body.linkedinUrl !== void 0) dbData.linkedin_url = req.body.linkedinUrl || null;
      if (req.body.email !== void 0) dbData.email = req.body.email || null;
      const validatedData = insertTeamMemberSchema.partial().parse(dbData);
      const updated = await storage.updateTeamMember(Number(id), validatedData);
      const response = {
        ...updated,
        imageUrl: updated.image_url,
        isActive: updated.is_active,
        linkedinUrl: updated.linkedin_url
      };
      res.json(response);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error updating team member:", error);
      res.status(500).json({ message: "Failed to update team member" });
    }
  });
  app3.delete("/api/admin/team-members/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteTeamMember(Number(id));
      res.json({ message: "Team member deleted successfully" });
    } catch (error) {
      console.error("Error deleting team member:", error);
      res.status(500).json({ message: "Failed to delete team member" });
    }
  });
  app3.get("/api/admin/scholarship-athletes", async (req, res) => {
    try {
      const athletes = await storage.getAllScholarshipAthletes();
      res.json(athletes);
    } catch (error) {
      console.error("Error fetching scholarship athletes:", error);
      res.status(500).json({ message: "Failed to fetch scholarship athletes" });
    }
  });
  app3.post("/api/admin/scholarship-athletes", async (req, res) => {
    try {
      console.log("Create scholarship athlete request:", req.body);
      const achievementsData = Array.isArray(req.body.achievements) ? JSON.stringify(req.body.achievements) : req.body.achievements;
      const dbData = {
        name: req.body.name,
        age: req.body.age || null,
        school: req.body.school || null,
        bio: req.body.bio || null,
        achievements: achievementsData || null,
        scholarshipYear: req.body.scholarshipYear || null,
        imageUrl: req.body.imageUrl || null,
        ordering: req.body.ordering || 0,
        isActive: req.body.isActive !== false
      };
      console.log("Converted data for DB:", dbData);
      const validatedData = insertScholarshipAthleteSchema.parse(dbData);
      console.log("Validated data:", validatedData);
      const newAthlete = await storage.createScholarshipAthlete(validatedData);
      console.log("Created scholarship athlete:", newAthlete);
      res.status(201).json(newAthlete);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation error:", error.errors);
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error creating scholarship athlete:", error);
      res.status(500).json({ message: "Failed to create scholarship athlete", error: error.toString() });
    }
  });
  app3.put("/api/admin/scholarship-athletes/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const dbData = {};
      if (req.body.name !== void 0) dbData.name = req.body.name;
      if (req.body.age !== void 0) dbData.age = req.body.age || null;
      if (req.body.school !== void 0) dbData.school = req.body.school || null;
      if (req.body.bio !== void 0) dbData.bio = req.body.bio || null;
      if (req.body.achievements !== void 0) {
        dbData.achievements = Array.isArray(req.body.achievements) ? JSON.stringify(req.body.achievements) : req.body.achievements;
      }
      if (req.body.scholarshipYear !== void 0) dbData.scholarshipYear = req.body.scholarshipYear || null;
      if (req.body.imageUrl !== void 0) dbData.imageUrl = req.body.imageUrl || null;
      if (req.body.ordering !== void 0) dbData.ordering = req.body.ordering;
      if (req.body.isActive !== void 0) dbData.isActive = req.body.isActive;
      const validatedData = insertScholarshipAthleteSchema.partial().parse(dbData);
      const updated = await storage.updateScholarshipAthlete(Number(id), validatedData);
      res.json(updated);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error updating scholarship athlete:", error);
      res.status(500).json({ message: "Failed to update scholarship athlete" });
    }
  });
  app3.delete("/api/admin/scholarship-athletes/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteScholarshipAthlete(Number(id));
      res.json({ message: "Scholarship athlete deleted successfully" });
    } catch (error) {
      console.error("Error deleting scholarship athlete:", error);
      res.status(500).json({ message: "Failed to delete scholarship athlete" });
    }
  });
  const uploadsDir = "uploads";
  import("fs").then((fs2) => {
    if (fs2.existsSync(uploadsDir)) {
      app3.use("/uploads", express.static(uploadsDir));
    }
  });
}

// server/routes.ts
init_schema();
import { z as z2 } from "zod";
async function registerRoutes(app3) {
  app3.get("/api/media", async (req, res) => {
    try {
      const { category, type } = req.query;
      const mediaFiles2 = await storage.getMediaFiles({
        category,
        type
      });
      res.json(mediaFiles2);
    } catch (error) {
      console.error("Error fetching media files:", error);
      res.status(500).json({ message: "Failed to fetch media files" });
    }
  });
  app3.get("/api/team-members", async (req, res) => {
    try {
      const members = await storage.getTeamMembers();
      const response = members.map((member) => ({
        id: member.id,
        name: member.name,
        title: member.title,
        description: member.description,
        imageUrl: member.image_url || member.imageUrl,
        category: member.category,
        ordering: member.ordering,
        isActive: member.is_active !== void 0 ? member.is_active : member.isActive,
        linkedinUrl: member.linkedin_url || member.linkedinUrl,
        email: member.email,
        createdAt: member.created_at || member.createdAt,
        updatedAt: member.updated_at || member.updatedAt,
        metadata: member.metadata
      }));
      res.json(response);
    } catch (error) {
      console.error("Error fetching team members:", error);
      res.status(500).json({ message: "Failed to fetch team members" });
    }
  });
  app3.get("/api/scholarship-athletes", async (req, res) => {
    try {
      const athletes = await storage.getScholarshipAthletes();
      res.json(athletes);
    } catch (error) {
      console.error("Error fetching scholarship athletes:", error);
      res.status(500).json({ message: "Failed to fetch scholarship athletes" });
    }
  });
  app3.post("/api/class-registrations", async (req, res) => {
    try {
      const validatedData = insertClassRegistrationSchema.parse(req.body);
      const newRegistration = await storage.createClassRegistration(validatedData);
      res.status(201).json(newRegistration);
    } catch (error) {
      if (error instanceof z2.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error creating class registration:", error);
      res.status(500).json({ message: "Failed to create class registration" });
    }
  });
  app3.post("/api/gear-dropoffs", async (req, res) => {
    try {
      const validatedData = insertGearDropoffSchema.parse(req.body);
      const newDropoff = await storage.createGearDropoff(validatedData);
      res.status(201).json(newDropoff);
    } catch (error) {
      if (error instanceof z2.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error creating gear dropoff:", error);
      res.status(500).json({ message: "Failed to create gear dropoff" });
    }
  });
  app3.post("/api/gear-pickups", async (req, res) => {
    try {
      const validatedData = insertGearPickupSchema.parse(req.body);
      const newPickup = await storage.createGearPickup(validatedData);
      res.status(201).json(newPickup);
    } catch (error) {
      if (error instanceof z2.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error creating gear pickup:", error);
      res.status(500).json({ message: "Failed to create gear pickup" });
    }
  });
  app3.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const newSubmission = await storage.createContactSubmission(validatedData);
      res.status(201).json(newSubmission);
    } catch (error) {
      if (error instanceof z2.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error creating contact submission:", error);
      res.status(500).json({ message: "Failed to create contact submission" });
    }
  });
  app3.post("/api/donations", async (req, res) => {
    try {
      const validatedData = insertDonationSchema.parse(req.body);
      const newDonation = await storage.createDonation(validatedData);
      res.status(201).json(newDonation);
    } catch (error) {
      if (error instanceof z2.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error creating donation:", error);
      res.status(500).json({ message: "Failed to create donation" });
    }
  });
  app3.post("/api/equipment-requests", async (req, res) => {
    try {
      const validatedData = insertEquipmentRequestSchema.parse(req.body);
      const newRequest = await storage.createEquipmentRequest(validatedData);
      res.status(201).json(newRequest);
    } catch (error) {
      if (error instanceof z2.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error creating equipment request:", error);
      res.status(500).json({ message: "Failed to create equipment request" });
    }
  });
  registerAdminRoutes(app3);
  const httpServer = createServer(app3);
  return httpServer;
}

// server/vite.ts
import express2 from "express";
import fs from "fs";
import path3 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path2 from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path2.resolve(import.meta.dirname, "client", "src"),
      "@shared": path2.resolve(import.meta.dirname, "shared"),
      "@assets": path2.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path2.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path2.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app3, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app3.use(vite.middlewares);
  app3.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path3.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app3) {
  const distPath = path3.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app3.use(express2.static(distPath));
  app3.use("*", (_req, res) => {
    res.sendFile(path3.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app2 = express3();
app2.use(express3.json());
app2.use(express3.urlencoded({ extended: false }));
app2.use((req, res, next) => {
  if (req.path.startsWith("/api")) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
  }
  next();
});
app2.use((req, res, next) => {
  const start = Date.now();
  const path4 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path4.startsWith("/api")) {
      let logLine = `${req.method} ${path4} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app2);
  app2.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app2.get("env") === "development") {
    await setupVite(app2, server);
  } else {
    serveStatic(app2);
  }
  const port = process.env.PORT || 3002;
  server.listen(port, "0.0.0.0", () => {
    log(`serving on port ${port}`);
  });
})();
