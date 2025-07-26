import {
  type MarketplaceItem,
  type ClassRegistration,
  type GearDropoff,
  type GearPickup,
  type ContactSubmission,
  type Donation,
  type EquipmentRequest,
  type InsertMarketplaceItem,
  type InsertClassRegistration,
  type InsertGearDropoff,
  type InsertGearPickup,
  type InsertContactSubmission,
  type InsertDonation,
  type InsertEquipmentRequest,
} from "@shared/schema";

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
}

export class MemoryStorage implements IStorage {
  // Marketplace operations
  async getMarketplaceItems(): Promise<MarketplaceItem[]> {
    return [...marketplaceItemsData].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
  
  async createMarketplaceItem(item: InsertMarketplaceItem): Promise<MarketplaceItem> {
    const newItem: MarketplaceItem = {
      id: marketplaceItemsData.length + 1,
      ...item,
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
      status: "pending", 
      createdAt: new Date(),
    };
    equipmentRequestsData.push(newRequest);
    return newRequest;
  }
}

export const storage = new MemoryStorage();