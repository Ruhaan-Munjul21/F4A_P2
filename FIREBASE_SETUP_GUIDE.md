# Firebase Setup Guide for Fencing for Everyone

Follow these steps to set up Firebase for your project:

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter a project name (e.g., "fencing-for-everyone")
4. Disable Google Analytics (optional for now)
5. Click **"Create project"**

## Step 2: Enable Firebase Storage

1. In your Firebase project dashboard, click **"Storage"** in the left sidebar
2. Click **"Get started"**
3. Choose **"Start in production mode"** (we'll adjust rules later)
4. Select your preferred storage location (choose closest to your users)
5. Click **"Done"**

## Step 3: Update Storage Rules (Important!)

1. In Storage, click the **"Rules"** tab
2. Replace the default rules with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      // Allow read access to all users
      allow read: if true;
      // Allow write access to all users (for demo purposes)
      // In production, you should restrict this
      allow write: if true;
    }
  }
}
```

3. Click **"Publish"**

## Step 4: Get Web App Configuration

1. In project overview, click the gear icon ⚙️ → **"Project settings"**
2. Scroll down to **"Your apps"** section
3. Click **"</> Web"** icon to add a web app
4. Register app with a nickname (e.g., "fencing-web")
5. Copy the configuration values shown

## Step 5: Generate Service Account Key

1. In **"Project settings"**, go to **"Service accounts"** tab
2. Click **"Generate new private key"**
3. Click **"Generate key"** in the confirmation dialog
4. A JSON file will download - **KEEP THIS SECURE!**

## Step 6: Update Your .env File

Open your `.env` file and update with your Firebase configuration:

```env
# Firebase Web SDK Configuration (from Step 4)
FIREBASE_API_KEY=AIzaSy...your-actual-api-key
FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789
FIREBASE_APP_ID=1:123456789:web:abcdef123456

# Firebase Service Account (from Step 5)
# IMPORTANT: Convert the downloaded JSON to a single line!
# Option 1: Use the converter below
# Option 2: Manually remove all line breaks and paste as one line
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"your-project-id",...entire JSON content...}
```

## Step 7: Convert Service Account JSON to Single Line

The service account JSON needs to be on a single line. Here are two methods:

### Method A: Using Node.js (Recommended)

1. Save the downloaded JSON as `serviceAccount.json` in your project root
2. Run this command in your terminal:

```bash
node -e "console.log(JSON.stringify(require('./serviceAccount.json')))"
```

3. Copy the output and paste as the value for `FIREBASE_SERVICE_ACCOUNT_KEY`
4. **Delete the serviceAccount.json file** after copying

### Method B: Manual Conversion

1. Open the downloaded JSON file
2. Remove all line breaks (enter/return characters)
3. Make sure it's valid JSON on a single line
4. Paste as the value for `FIREBASE_SERVICE_ACCOUNT_KEY`

## Step 8: Test Your Setup

1. Stop your server if running (Ctrl+C)
2. Start it again:

```bash
npm run dev
```

3. You should see:
```
✅ Firebase Admin initialized with service account
```

Instead of the warning message.

## Step 9: Test File Upload

1. Open your browser to `http://localhost:3000/admin`
2. Try uploading an image or video
3. Check Firebase Console → Storage to see if files appear

## Troubleshooting

### Error: "Failed to parse private key"
- Make sure the service account JSON is on a single line
- Ensure no extra quotes or escaping issues
- The JSON must be valid

### Error: "Permission denied"
- Check your Storage rules (Step 3)
- Make sure Storage is enabled in Firebase Console

### Files not appearing in Firebase
- Verify all credentials in .env are correct
- Check browser console for errors
- Ensure the storage bucket name matches

## Security Notes

⚠️ **IMPORTANT**: 
- Never commit your `.env` file to git
- Keep your service account key secure
- In production, restrict Storage rules to authenticated users only
- Consider using environment variables on your hosting platform

## Next Steps

After setup is complete:
1. Test uploading media through the admin panel
2. Verify images appear in the gallery
3. Check that marketplace item images work
4. Consider setting up Firebase Authentication for admin access

Need help? Check the [Firebase Documentation](https://firebase.google.com/docs/storage/web/start)