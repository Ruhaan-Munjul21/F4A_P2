import { storage } from '../server/storage';
import FirebaseStorageService from '../server/firebase-storage';
import { isFirebaseConfigured } from '../server/firebase-config';

async function cleanupOldHeroImages() {
  console.log('Cleaning up old hero images (keeping only the most recent)...');

  try {
    // Get all hero images
    const heroImages = await storage.getMediaFiles({ category: 'hero' });
    
    if (heroImages.length <= 1) {
      console.log('Only one or no hero images found. Nothing to clean up.');
      process.exit(0);
    }

    // Sort by creation date (newest first)
    const sortedImages = [...heroImages].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    console.log(`Found ${heroImages.length} hero images`);
    console.log(`Keeping: ${sortedImages[0].originalName} (created: ${sortedImages[0].createdAt})`);
    console.log(`Removing ${sortedImages.length - 1} older images...`);

    // Delete all but the most recent
    const imagesToDelete = sortedImages.slice(1);
    
    for (const image of imagesToDelete) {
      console.log(`Deleting: ${image.originalName}`);
      
      // Delete from Firebase Storage if configured
      if (isFirebaseConfigured && image.filePath && image.filePath.includes('firebasestorage.googleapis.com')) {
        try {
          const urlParts = image.filePath.split('/');
          const bucketIndex = urlParts.findIndex(part => part.includes('.firebasestorage.app'));
          if (bucketIndex !== -1) {
            const filePath = decodeURIComponent(
              urlParts[bucketIndex + 2].split('?')[0]
            );
            await FirebaseStorageService.deleteFile(filePath);
            console.log(`  ✓ Deleted from Firebase Storage`);
          }
        } catch (error) {
          console.error(`  ✗ Failed to delete from Firebase:`, error);
        }
      }
      
      // Delete from database
      await storage.deleteMediaFile(image.id);
      console.log(`  ✓ Deleted from database`);
    }

    console.log('\n✅ Cleanup complete!');
    console.log(`Kept 1 hero image, deleted ${imagesToDelete.length} old images`);

  } catch (error) {
    console.error('Error during cleanup:', error);
    process.exit(1);
  }

  process.exit(0);
}

// Run if called directly
if (require.main === module) {
  cleanupOldHeroImages();
}