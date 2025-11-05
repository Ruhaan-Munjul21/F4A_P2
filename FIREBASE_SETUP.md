# Firebase Storage Setup Guide

This guide will help you set up Firebase Storage for your Fencing For All application to store images, videos, and dynamic content.

## Prerequisites

- A Google account
- Node.js installed (v16 or higher)
- The project cloned and dependencies installed

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project" or "Add project"
3. Enter a project name (e.g., "fencing-for-all")
4. (Optional) Enable Google Analytics
5. Click "Create project"

## Step 2: Enable Firebase Storage

1. In your Firebase project, go to the left sidebar
2. Click on "Storage" under "Build"
3. Click "Get started"
4. Choose your security rules mode:
   - Start in **production mode** for better security (recommended)
   - Start in test mode for easier development (less secure)
5. Select a Cloud Storage location (choose one closest to your users)
6. Click "Done"

## Step 3: Configure Storage Security Rules

1. In Storage, click on the "Rules" tab
2. Replace the default rules with these:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Public read for images and videos in public folders
    match /images/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /videos/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /marketplace/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Thumbnails are always public
    match /thumbnails/{allPaths=**} {
      allow read: if true;
      allow write: if false; // Only server can write thumbnails
    }
    
    // Private files require authentication
    match /private/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
    
    // Default deny all
    match /{allPaths=**} {
      allow read: if false;
      allow write: if false;
    }
  }
}
```

3. Click "Publish" to save the rules

## Step 4: Get Firebase Configuration

### Web SDK Configuration

1. Go to Project Settings (gear icon) > General
2. Scroll down to "Your apps"
3. Click on the "</>" (Web) icon
4. Register your app with a nickname (e.g., "fencing-for-all-web")
5. Copy the Firebase configuration object:

```javascript
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

### Admin SDK Service Account

1. Go to Project Settings > Service Accounts
2. Click "Generate new private key"
3. Save the downloaded JSON file securely
4. Convert the JSON to a single-line string for the .env file

## Step 5: Configure Environment Variables

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Fill in your Firebase configuration:
```env
# Firebase Web SDK Configuration
FIREBASE_API_KEY=your-api-key
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your-sender-id
FIREBASE_APP_ID=your-app-id

# Firebase Admin SDK (paste the entire JSON as a single-line string)
FIREBASE_SERVICE_ACCOUNT_KEY='{"type":"service_account",...}'
```

## Step 6: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- firebase
- firebase-admin
- sharp (for image processing)
- uuid (for unique file names)

## Step 7: Test the Setup

1. Start the development server:
```bash
npm run dev
```

2. Navigate to the admin panel: `http://localhost:3000/admin`

3. Try uploading an image or video

4. Check Firebase Console > Storage to see if the file was uploaded

## Usage in the Application

### Uploading Files (Client-side)

```typescript
import { useFirebaseUpload } from '@/hooks/useFirebaseUpload';

function MyComponent() {
  const { upload, isUploading, uploadProgress } = useFirebaseUpload();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      upload(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileSelect} />
      {isUploading && <p>Uploading: {uploadProgress?.percentage}%</p>}
    </div>
  );
}
```

### Displaying Media

```typescript
import MediaGallery from '@/components/media-gallery';

function GalleryPage() {
  return (
    <MediaGallery 
      category="gallery"
      columns={3}
      showFilters={true}
    />
  );
}
```

## Storage Structure

The Firebase Storage bucket is organized as follows:

```
/
├── images/          # General images
├── videos/          # Video content
├── marketplace/     # Marketplace item images
├── thumbnails/      # Auto-generated thumbnails
│   ├── images/
│   └── marketplace/
└── private/         # Private files (requires auth)
```

## API Endpoints

### Upload single file
```
POST /api/admin/media/upload
Body: FormData with 'file' field
```

### Upload multiple files
```
POST /api/admin/media/upload-batch
Body: FormData with 'files' field (array)
```

### Upload marketplace image
```
POST /api/marketplace/upload-image
Body: FormData with 'image' field
```

### Get all media
```
GET /api/admin/media?category=gallery&type=image
```

### Delete media
```
DELETE /api/admin/media/:id
```

### List Firebase files
```
GET /api/admin/media/firebase-files?folder=images&limit=100
```

### Get signed URL (for private files)
```
GET /api/admin/media/signed-url/:id
```

## Troubleshooting

### "Permission denied" errors
- Check Firebase Storage security rules
- Ensure service account has proper permissions
- Verify environment variables are set correctly

### Files not uploading
- Check file size (max 50MB by default)
- Verify MIME type is allowed (images and videos only)
- Check browser console for errors
- Verify Firebase Storage bucket name in .env

### Thumbnails not generating
- Ensure `sharp` package is installed
- Check server logs for errors
- Verify image format is supported (JPEG, PNG, GIF, WebP)

### CORS issues
1. Go to Google Cloud Console
2. Find your storage bucket
3. Configure CORS:
```json
[
  {
    "origin": ["http://localhost:3000", "https://yourdomain.com"],
    "method": ["GET", "POST", "PUT", "DELETE"],
    "maxAgeSeconds": 3600,
    "responseHeader": ["Content-Type"]
  }
]
```

## Security Best Practices

1. **Never commit .env files** - Add to .gitignore
2. **Use appropriate security rules** - Don't allow public write access
3. **Validate file types** - Check MIME types on both client and server
4. **Limit file sizes** - Prevent abuse with size limits
5. **Use signed URLs** - For temporary access to private files
6. **Enable Firebase App Check** - For additional security (optional)

## Cost Considerations

Firebase Storage pricing:
- **Free tier**: 5GB storage, 1GB/day download, 20K upload operations/day
- **Pay as you go**: $0.026/GB storage, $0.12/GB download

Tips to minimize costs:
1. Use thumbnails for previews
2. Compress images before upload
3. Set appropriate cache headers
4. Delete unused files regularly
5. Monitor usage in Firebase Console

## Support

For issues or questions:
1. Check Firebase documentation: https://firebase.google.com/docs/storage
2. Review server logs for detailed error messages
3. Check browser console for client-side errors
4. Verify all environment variables are set correctly