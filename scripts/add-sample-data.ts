import { db } from "../server/db";
import { marketplaceItems } from "../shared/schema";

async function addSampleData() {
  try {
    const sampleItems = [
      {
        title: 'Beginner Fencing Mask',
        description: 'Leon Paul X-Change mask in excellent condition. Perfect for beginners. Includes all safety certifications.',
        category: 'masks',
        condition: 'like new',
        size: 'Medium',
        imageUrl: null,
        donorId: '7911928',
        isAvailable: true
      },
      {
        title: 'Épée Complete Set',
        description: 'Professional grade épée with electric body cord. Recently maintained and ready for competition.',
        category: 'weapons',
        condition: 'good',
        size: '5',
        imageUrl: null,
        donorId: '7911928',
        isAvailable: true
      },
      {
        title: 'Fencing Jacket - Youth',
        description: 'White cotton fencing jacket for youth fencers. Great for getting started in the sport.',
        category: 'jackets',
        condition: 'fair',
        size: 'Youth Large',
        imageUrl: null,
        donorId: '7911928',
        isAvailable: true
      },
      {
        title: 'Fencing Gloves - Right Hand',
        description: 'High-quality leather fencing gloves for right-handed fencers. Minimal wear.',
        category: 'gloves',
        condition: 'good',
        size: 'Large',
        imageUrl: null,
        donorId: '7911928',
        isAvailable: true
      },
      {
        title: 'Equipment Bag',
        description: 'Spacious fencing bag with multiple compartments. Perfect for carrying all your gear.',
        category: 'bags',
        condition: 'new',
        size: 'Standard',
        imageUrl: null,
        donorId: '7911928',
        isAvailable: true
      },
      {
        title: 'Foil Blade - Electric',
        description: 'Electric foil blade in excellent working condition. Recently tested and certified.',
        category: 'weapons',
        condition: 'like new',
        size: '5',
        imageUrl: null,
        donorId: '7911928',
        isAvailable: true
      }
    ];

    await db.insert(marketplaceItems).values(sampleItems);
    console.log('Sample data inserted successfully');
  } catch (error) {
    console.error('Error inserting sample data:', error);
  }
}

addSampleData();