import {
  type MarketplaceItem,
  type ClassRegistration,
  type GearDropoff,
  type GearPickup,
  type ContactSubmission,
  type Donation,
  type EquipmentRequest,
  type MediaFile,
  type PageContent,
  type TeamMember,
  type ScholarshipAthlete,
  type InsertMarketplaceItem,
  type InsertClassRegistration,
  type InsertGearDropoff,
  type InsertGearPickup,
  type InsertContactSubmission,
  type InsertDonation,
  type InsertEquipmentRequest,
  type InsertMediaFile,
  type InsertPageContent,
  type InsertTeamMember,
  type InsertScholarshipAthlete,
} from "@shared/schema";
import { db } from "./db";
import * as schema from "@shared/schema";
import { eq, desc, sql } from "drizzle-orm";

// In-memory storage for demo purposes
const marketplaceItemsData: MarketplaceItem[] = [
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
    createdAt: new Date("2024-12-01"),
    updatedAt: new Date("2024-12-01"),
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
    createdAt: new Date("2024-11-28"),
    updatedAt: new Date("2024-11-28"),
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
    createdAt: new Date("2024-11-25"),
    updatedAt: new Date("2024-11-25"),
  },
];

const classRegistrationsData: ClassRegistration[] = [];
const gearDropoffsData: GearDropoff[] = [];
const gearPickupsData: GearPickup[] = [];
const contactSubmissionsData: ContactSubmission[] = [];
const donationsData: Donation[] = [];
const equipmentRequestsData: EquipmentRequest[] = [];
const mediaFilesData: MediaFile[] = [];
const pageContentData: PageContent[] = [];
const teamMembersData: TeamMember[] = [];
let pageContentIdCounter = 1;
let teamMemberIdCounter = 1;

// Interface for storage operations
export interface IStorage {
  // Marketplace operations
  getMarketplaceItems(): Promise<MarketplaceItem[]>;
  createMarketplaceItem(item: InsertMarketplaceItem): Promise<MarketplaceItem>;
  
  // Registration operations
  createClassRegistration(registration: InsertClassRegistration): Promise<ClassRegistration>;
  createGearDropoff(dropoff: InsertGearDropoff): Promise<GearDropoff>;
  createGearPickup(pickup: InsertGearPickup): Promise<GearPickup>;
  
  // Contact operations
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  
  // Donation operations
  createDonation(donation: InsertDonation): Promise<Donation>;
  
  // Equipment request operations
  createEquipmentRequest(request: InsertEquipmentRequest): Promise<EquipmentRequest>;
  
  // Media file operations
  createMediaFile(media: InsertMediaFile): Promise<MediaFile>;
  getMediaFiles(filters?: { category?: string; type?: string }): Promise<MediaFile[]>;
  getMediaFileById(id: number): Promise<MediaFile | null>;
  deleteMediaFile(id: number): Promise<void>;
  
  // Admin operations
  getAdminStats(): Promise<any>;
  
  // User operations (for auth)
  upsertUser?(user: any): Promise<any>;
}

export class MemoryStorage implements IStorage {
  // Marketplace operations
  async getMarketplaceItems(): Promise<MarketplaceItem[]> {
    return [...marketplaceItemsData].sort((a, b) => 
      new Date(b.createdAt || new Date()).getTime() - new Date(a.createdAt || new Date()).getTime()
    );
  }
  
  async createMarketplaceItem(item: InsertMarketplaceItem): Promise<MarketplaceItem> {
    const newItem: MarketplaceItem = {
      id: marketplaceItemsData.length + 1,
      ...item,
      size: item.size || null,
      imageUrl: item.imageUrl || null,
      donorName: item.donorName || null,
      donorEmail: item.donorEmail || null,
      isAvailable: item.isAvailable ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    marketplaceItemsData.push(newItem);
    return newItem;
  }
  
  // Registration operations
  async createClassRegistration(registration: InsertClassRegistration): Promise<ClassRegistration> {
    const newRegistration: ClassRegistration = {
      id: classRegistrationsData.length + 1,
      ...registration,
      medicalInfo: registration.medicalInfo || null,
      parentName: registration.parentName || null,
      parentEmail: registration.parentEmail || null,
      status: "pending",
      createdAt: new Date(),
    };
    classRegistrationsData.push(newRegistration);
    return newRegistration;
  }
  
  async createGearDropoff(dropoff: InsertGearDropoff): Promise<GearDropoff> {
    const newDropoff: GearDropoff = {
      id: gearDropoffsData.length + 1,
      ...dropoff,
      estimatedValue: dropoff.estimatedValue || null,
      preferredDropoffTime: dropoff.preferredDropoffTime || null,
      additionalNotes: dropoff.additionalNotes || null,
      status: "pending",
      createdAt: new Date(),
    };
    gearDropoffsData.push(newDropoff);
    return newDropoff;
  }
  
  async createGearPickup(pickup: InsertGearPickup): Promise<GearPickup> {
    const newPickup: GearPickup = {
      id: gearPickupsData.length + 1,
      ...pickup,
      programEnrolled: pickup.programEnrolled || null,
      preferredPickupTime: pickup.preferredPickupTime || null,
      additionalInfo: pickup.additionalInfo || null,
      status: "pending",
      createdAt: new Date(),
    };
    gearPickupsData.push(newPickup);
    return newPickup;
  }
  
  // Contact operations
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const newSubmission: ContactSubmission = {
      id: contactSubmissionsData.length + 1,
      ...submission,
      status: "new",
      createdAt: new Date(),
    };
    contactSubmissionsData.push(newSubmission);
    return newSubmission;
  }
  
  // Donation operations
  async createDonation(donation: InsertDonation): Promise<Donation> {
    const newDonation: Donation = {
      id: donationsData.length + 1,
      ...donation,
      isRecurring: donation.isRecurring ?? false,
      paymentId: donation.paymentId || null,
      status: "pending",
      createdAt: new Date(),
    };
    donationsData.push(newDonation);
    return newDonation;
  }
  
  // Equipment request operations
  async createEquipmentRequest(request: InsertEquipmentRequest): Promise<EquipmentRequest> {
    const newRequest: EquipmentRequest = {
      id: equipmentRequestsData.length + 1,
      ...request,
      message: request.message || null,
      status: "pending", 
      createdAt: new Date(),
    };
    equipmentRequestsData.push(newRequest);
    return newRequest;
  }

  // Media file operations
  async createMediaFile(media: InsertMediaFile): Promise<MediaFile> {
    const newMedia: MediaFile = {
      id: mediaFilesData.length + 1,
      ...media,
      uploadedBy: media.uploadedBy || null,
      altText: media.altText || null,
      category: media.category || "general",
      isPublic: media.isPublic ?? true,
      createdAt: new Date(),
    };
    mediaFilesData.push(newMedia);
    return newMedia;
  }

  async getMediaFiles(filters?: { category?: string; type?: string }): Promise<MediaFile[]> {
    let filtered = [...mediaFilesData];
    
    if (filters?.category) {
      filtered = filtered.filter(m => m.category === filters.category);
    }
    
    if (filters?.type) {
      const isImage = filters.type === 'image';
      filtered = filtered.filter(m => 
        isImage ? m.mimeType.startsWith('image/') : m.mimeType.startsWith('video/')
      );
    }
    
    return filtered.sort((a, b) => new Date(b.createdAt || new Date()).getTime() - new Date(a.createdAt || new Date()).getTime());
  }

  async getMediaFileById(id: number): Promise<MediaFile | null> {
    return mediaFilesData.find(m => m.id === id) || null;
  }

  async deleteMediaFile(id: number): Promise<void> {
    const index = mediaFilesData.findIndex(m => m.id === id);
    if (index > -1) {
      mediaFilesData.splice(index, 1);
    }
  }

  // Page content methods
  async getPageContent(pageId: string, sectionId?: string): Promise<PageContent[]> {
    if (sectionId) {
      return pageContentData.filter(c => c.pageId === pageId && c.sectionId === sectionId && c.isPublished);
    }
    return pageContentData.filter(c => c.pageId === pageId && c.isPublished);
  }

  async getAllPageContent(pageId: string): Promise<PageContent[]> {
    return pageContentData.filter(c => c.pageId === pageId);
  }

  async createPageContent(data: InsertPageContent): Promise<PageContent> {
    const newContent: PageContent = {
      id: pageContentIdCounter++,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as PageContent;
    pageContentData.push(newContent);
    return newContent;
  }

  async updatePageContent(id: number, data: Partial<InsertPageContent>): Promise<PageContent> {
    const index = pageContentData.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Content not found');

    pageContentData[index] = {
      ...pageContentData[index],
      ...data,
      updatedAt: new Date(),
    };
    return pageContentData[index];
  }

  async deletePageContent(id: number): Promise<void> {
    const index = pageContentData.findIndex(c => c.id === id);
    if (index > -1) {
      pageContentData.splice(index, 1);
    }
  }

  // Team member methods
  async getTeamMembers(category?: string): Promise<TeamMember[]> {
    if (category) {
      return teamMembersData.filter(m => m.category === category && m.isActive).sort((a, b) => a.ordering - b.ordering);
    }
    return teamMembersData.filter(m => m.isActive).sort((a, b) => a.ordering - b.ordering);
  }

  async getAllTeamMembers(): Promise<TeamMember[]> {
    return teamMembersData.sort((a, b) => a.ordering - b.ordering);
  }

  async createTeamMember(data: InsertTeamMember): Promise<TeamMember> {
    const newMember: TeamMember = {
      id: teamMemberIdCounter++,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as TeamMember;
    teamMembersData.push(newMember);
    return newMember;
  }

  async updateTeamMember(id: number, data: Partial<InsertTeamMember>): Promise<TeamMember> {
    const index = teamMembersData.findIndex(m => m.id === id);
    if (index === -1) throw new Error('Team member not found');

    teamMembersData[index] = {
      ...teamMembersData[index],
      ...data,
      updatedAt: new Date(),
    };
    return teamMembersData[index];
  }

  async deleteTeamMember(id: number): Promise<void> {
    const index = teamMembersData.findIndex(m => m.id === id);
    if (index > -1) {
      teamMembersData.splice(index, 1);
    }
  }

  async getAdminStats(): Promise<any> {
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
        mediaFiles: mediaFilesData.slice(-5),
      }
    };
  }

  async upsertUser(user: any): Promise<any> {
    // Memory storage implementation for user - just return the user for now
    return user;
  }
}

export class DatabaseStorage implements IStorage {
  // Marketplace operations
  async getMarketplaceItems(): Promise<MarketplaceItem[]> {
    return await db.select()
      .from(schema.marketplaceItems)
      .where(eq(schema.marketplaceItems.isAvailable, true))
      .orderBy(desc(schema.marketplaceItems.createdAt));
  }
  
  async createMarketplaceItem(item: InsertMarketplaceItem): Promise<MarketplaceItem> {
    const [newItem] = await db.insert(schema.marketplaceItems)
      .values(item)
      .returning();
    return newItem;
  }
  
  // Registration operations
  async createClassRegistration(registration: InsertClassRegistration): Promise<ClassRegistration> {
    const [newRegistration] = await db.insert(schema.classRegistrations)
      .values(registration)
      .returning();
    return newRegistration;
  }
  
  async createGearDropoff(dropoff: InsertGearDropoff): Promise<GearDropoff> {
    const [newDropoff] = await db.insert(schema.gearDropoffs)
      .values(dropoff)
      .returning();
    return newDropoff;
  }
  
  async createGearPickup(pickup: InsertGearPickup): Promise<GearPickup> {
    const [newPickup] = await db.insert(schema.gearPickups)
      .values(pickup)
      .returning();
    return newPickup;
  }
  
  // Contact operations
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const [newSubmission] = await db.insert(schema.contactSubmissions)
      .values(submission)
      .returning();
    return newSubmission;
  }
  
  // Donation operations
  async createDonation(donation: InsertDonation): Promise<Donation> {
    const [newDonation] = await db.insert(schema.donations)
      .values(donation)
      .returning();
    return newDonation;
  }
  
  // Equipment request operations
  async createEquipmentRequest(request: InsertEquipmentRequest): Promise<EquipmentRequest> {
    const [newRequest] = await db.insert(schema.equipmentRequests)
      .values(request)
      .returning();
    return newRequest;
  }

  // Media file operations
  async createMediaFile(media: InsertMediaFile): Promise<MediaFile> {
    const [newMedia] = await db.insert(schema.mediaFiles)
      .values(media)
      .returning();
    return newMedia;
  }

  async getMediaFiles(filters?: { category?: string; type?: string }): Promise<MediaFile[]> {
    let queryBuilder = db.select().from(schema.mediaFiles);
    
    if (filters?.category) {
      queryBuilder = queryBuilder.where(eq(schema.mediaFiles.category, filters.category)) as any;
    }
    
    let results = await queryBuilder.orderBy(desc(schema.mediaFiles.createdAt));
    
    if (filters?.type) {
      const isImage = filters.type === 'image';
      results = results.filter(m => 
        isImage ? m.mimeType.startsWith('image/') : m.mimeType.startsWith('video/')
      );
    }
    
    return results;
  }

  async getMediaFileById(id: number): Promise<MediaFile | null> {
    const [media] = await db.select()
      .from(schema.mediaFiles)
      .where(eq(schema.mediaFiles.id, id));
    return media || null;
  }

  async deleteMediaFile(id: number): Promise<void> {
    await db.delete(schema.mediaFiles)
      .where(eq(schema.mediaFiles.id, id));
  }

  // Page content methods
  async getPageContent(pageId: string, sectionId?: string): Promise<PageContent[]> {
    try {
      if (sectionId) {
        return await db.select()
          .from(schema.pageContent)
          .where(sql`${schema.pageContent.pageId} = ${pageId} AND ${schema.pageContent.sectionId} = ${sectionId} AND ${schema.pageContent.isPublished} = true`)
          .orderBy(schema.pageContent.ordering);
      }
      return await db.select()
        .from(schema.pageContent)
        .where(sql`${schema.pageContent.pageId} = ${pageId} AND ${schema.pageContent.isPublished} = true`)
        .orderBy(schema.pageContent.ordering);
    } catch (error) {
      console.error("Error fetching page content:", error);
      return [];
    }
  }

  async getAllPageContent(pageId: string): Promise<PageContent[]> {
    try {
      return await db.select()
        .from(schema.pageContent)
        .where(eq(schema.pageContent.pageId, pageId))
        .orderBy(schema.pageContent.ordering);
    } catch (error) {
      console.error("Error fetching all page content:", error);
      return [];
    }
  }

  async createPageContent(data: InsertPageContent): Promise<PageContent> {
    const [result] = await db.insert(schema.pageContent).values(data).returning();
    return result;
  }

  async updatePageContent(id: number, data: Partial<InsertPageContent>): Promise<PageContent> {
    const [result] = await db.update(schema.pageContent)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(schema.pageContent.id, id))
      .returning();
    return result;
  }

  async deletePageContent(id: number): Promise<void> {
    await db.delete(schema.pageContent).where(eq(schema.pageContent.id, id));
  }

  // Team member methods
  async getTeamMembers(category?: string): Promise<TeamMember[]> {
    try {
      if (category) {
        return await db.select()
          .from(schema.teamMembers)
          .where(sql`${schema.teamMembers.category} = ${category} AND ${schema.teamMembers.isActive} = true`)
          .orderBy(schema.teamMembers.ordering);
      }
      return await db.select()
        .from(schema.teamMembers)
        .where(eq(schema.teamMembers.isActive, true))
        .orderBy(schema.teamMembers.ordering);
    } catch (error) {
      console.error("Error fetching team members:", error);
      return [];
    }
  }

  async getAllTeamMembers(): Promise<TeamMember[]> {
    try {
      return await db.select()
        .from(schema.teamMembers)
        .orderBy(schema.teamMembers.ordering);
    } catch (error) {
      console.error("Error fetching all team members:", error);
      return [];
    }
  }

  async createTeamMember(data: InsertTeamMember): Promise<TeamMember> {
    const [result] = await db.insert(schema.teamMembers).values(data).returning();
    return result;
  }

  async updateTeamMember(id: number, data: Partial<InsertTeamMember>): Promise<TeamMember> {
    const [result] = await db.update(schema.teamMembers)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(schema.teamMembers.id, id))
      .returning();
    return result;
  }

  async deleteTeamMember(id: number): Promise<void> {
    await db.delete(schema.teamMembers).where(eq(schema.teamMembers.id, id));
  }

  // Scholarship athlete methods
  async getScholarshipAthletes(): Promise<ScholarshipAthlete[]> {
    try {
      return await db.select()
        .from(schema.scholarshipAthletes)
        .where(eq(schema.scholarshipAthletes.isActive, true))
        .orderBy(schema.scholarshipAthletes.ordering);
    } catch (error) {
      console.error("Error fetching scholarship athletes:", error);
      return [];
    }
  }

  async getAllScholarshipAthletes(): Promise<ScholarshipAthlete[]> {
    try {
      return await db.select()
        .from(schema.scholarshipAthletes)
        .orderBy(schema.scholarshipAthletes.ordering);
    } catch (error) {
      console.error("Error fetching all scholarship athletes:", error);
      return [];
    }
  }

  async createScholarshipAthlete(data: InsertScholarshipAthlete): Promise<ScholarshipAthlete> {
    const [result] = await db.insert(schema.scholarshipAthletes).values(data).returning();
    return result;
  }

  async updateScholarshipAthlete(id: number, data: Partial<InsertScholarshipAthlete>): Promise<ScholarshipAthlete> {
    const [result] = await db.update(schema.scholarshipAthletes)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(schema.scholarshipAthletes.id, id))
      .returning();
    return result;
  }

  async deleteScholarshipAthlete(id: number): Promise<void> {
    await db.delete(schema.scholarshipAthletes).where(eq(schema.scholarshipAthletes.id, id));
  }

  async getAdminStats(): Promise<any> {
    const [marketplaceCount] = await db.select({ count: sql`count(*)` })
      .from(schema.marketplaceItems);
    const [registrationCount] = await db.select({ count: sql`count(*)` })
      .from(schema.classRegistrations);
    const [dropoffCount] = await db.select({ count: sql`count(*)` })
      .from(schema.gearDropoffs);
    const [pickupCount] = await db.select({ count: sql`count(*)` })
      .from(schema.gearPickups);
    const [contactCount] = await db.select({ count: sql`count(*)` })
      .from(schema.contactSubmissions);
    const [donationCount] = await db.select({ count: sql`count(*)` })
      .from(schema.donations);
    const [mediaCount] = await db.select({ count: sql`count(*)` })
      .from(schema.mediaFiles);

    const recentMarketplace = await db.select()
      .from(schema.marketplaceItems)
      .orderBy(desc(schema.marketplaceItems.createdAt))
      .limit(5);
    
    const recentRegistrations = await db.select()
      .from(schema.classRegistrations)
      .orderBy(desc(schema.classRegistrations.createdAt))
      .limit(5);
    
    const recentMedia = await db.select()
      .from(schema.mediaFiles)
      .orderBy(desc(schema.mediaFiles.createdAt))
      .limit(5);

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
        mediaFiles: recentMedia,
      }
    };
  }

  async upsertUser(user: any): Promise<any> {
    // Database storage implementation for user - just return the user for now
    return user;
  }
}

// Use database storage if DATABASE_URL is set, otherwise use memory storage
export const storage = process.env.DATABASE_URL ? new DatabaseStorage() : new MemoryStorage();