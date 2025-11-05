// Mock database for development without real database
export const mockStorage = {
  getMarketplaceItems: async () => {
    return [
      {
        id: 1,
        title: "Fencing Mask",
        description: "Gently used fencing mask in good condition",
        category: "masks",
        condition: "good",
        size: "Medium",
        imageUrl: null,
        donorName: "John Doe",
        donorEmail: "john@example.com",
        isAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        title: "Electric Foil",
        description: "Competition-ready electric foil",
        category: "weapons",
        condition: "like new",
        size: null,
        imageUrl: null,
        donorName: "Jane Smith",
        donorEmail: "jane@example.com",
        isAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
  },
  
  createMarketplaceItem: async (data: any) => {
    return { id: Date.now(), ...data, createdAt: new Date(), updatedAt: new Date() };
  },
  
  createClassRegistration: async (data: any) => {
    return { id: Date.now(), ...data, status: "pending", createdAt: new Date() };
  },
  
  createGearDropoff: async (data: any) => {
    return { id: Date.now(), ...data, status: "pending", createdAt: new Date() };
  },
  
  createGearPickup: async (data: any) => {
    return { id: Date.now(), ...data, status: "pending", createdAt: new Date() };
  },
  
  createContactSubmission: async (data: any) => {
    return { id: Date.now(), ...data, status: "new", createdAt: new Date() };
  },
  
  createDonation: async (data: any) => {
    return { id: Date.now(), ...data, status: "pending", createdAt: new Date() };
  },
  
  createEquipmentRequest: async (data: any) => {
    return { id: Date.now(), ...data, status: "pending", createdAt: new Date() };
  }
};