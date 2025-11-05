import admin from 'firebase-admin';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { config } from 'dotenv';

config();

// Firebase client SDK configuration (for client-side uploads if needed)
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || 'dummy-api-key',
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || 'dummy.firebaseapp.com',
  projectId: process.env.FIREBASE_PROJECT_ID || 'dummy-project',
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'dummy.appspot.com',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '123456',
  appId: process.env.FIREBASE_APP_ID || 'dummy-app-id'
};

// Initialize Firebase Admin SDK for server-side operations
let adminApp: admin.app.App | null = null;
let bucket: any | null = null;
let isFirebaseConfigured = false;

try {
  // Check if we have valid service account credentials
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY && 
      process.env.FIREBASE_SERVICE_ACCOUNT_KEY !== '{}' &&
      !process.env.FIREBASE_SERVICE_ACCOUNT_KEY.includes('your-project-id')) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    adminApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET
    });
    bucket = admin.storage().bucket();
    isFirebaseConfigured = true;
    console.log('✅ Firebase Admin initialized with service account');
  } else {
    console.log('⚠️  Firebase Admin not configured - using mock storage');
    console.log('   To enable Firebase storage, add valid credentials to .env file');
  }
} catch (error) {
  console.error('⚠️  Failed to initialize Firebase Admin:', error);
  console.log('   Firebase storage features will be disabled');
  adminApp = null;
  bucket = null;
}

// Initialize client app (optional, for direct browser uploads)
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { adminApp, bucket, storage, firebaseConfig, isFirebaseConfigured };