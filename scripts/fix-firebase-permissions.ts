import { storage } from '../server/storage';
import FirebaseStorageService from '../server/firebase-storage';
import { bucket, isFirebaseConfigured } from '../server/firebase-config';

async function fixFirebasePermissions() {
  console.log('Fixing Firebase Storage permissions for all media files...');

  if (!isFirebaseConfigured || !bucket) {
    console.error('Firebase is not configured. Please check your environment variables.');
    process.exit(1);
  }

  try {
    // Get all media files from database
    const mediaFiles = await storage.getMediaFiles({});
    console.log(`Found ${mediaFiles.length} media files in database`);

    let fixed = 0;
    let errors = 0;

    for (const media of mediaFiles) {
      if (media.filePath && media.filePath.includes('storage.googleapis.com')) {
        try {
          // Extract the file path from the URL
          const urlParts = media.filePath.split('/');
          const bucketNameFromUrl = urlParts.find(part => part.includes('.firebasestorage.app') || part.includes('.appspot.com'));
          
          if (bucketNameFromUrl) {
            const startIndex = urlParts.indexOf(bucketNameFromUrl) + 1;
            const filePath = urlParts.slice(startIndex).join('/');
            
            console.log(`Fixing permissions for: ${filePath}`);
            
            // Get the file reference and make it public
            const file = bucket.file(filePath);
            const [exists] = await file.exists();
            
            if (exists) {
              await file.makePublic();
              console.log(`✓ Fixed: ${filePath}`);
              fixed++;
            } else {
              console.log(`✗ File not found in storage: ${filePath}`);
              errors++;
            }
          }
        } catch (error) {
          console.error(`Error fixing permissions for ${media.filename}:`, error);
          errors++;
        }
      }
    }

    console.log('\n=== Summary ===');
    console.log(`Successfully fixed: ${fixed} files`);
    console.log(`Errors: ${errors} files`);
    console.log('\nAll public files should now be accessible!');

  } catch (error) {
    console.error('Error fixing permissions:', error);
    process.exit(1);
  }

  process.exit(0);
}

// Run the fix
fixFirebasePermissions();