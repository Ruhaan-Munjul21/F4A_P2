# Video Upload and Display Test Guide

## Steps to Test Video Upload and Display

### 1. Navigate to Admin Panel
- Go to http://localhost:3000/admin
- You should see the admin dashboard with upload functionality

### 2. Upload a Video
- In the "Media Upload" tab:
  1. Click "Choose File" or drag and drop a video file (MP4, MOV, etc.)
  2. **IMPORTANT**: Select "Hero Section (Homepage)" from the Category dropdown
  3. Add alt text (optional)
  4. Click "Upload to Firebase"

### 3. Verify Upload
- After successful upload, you should see:
  - A success toast message
  - The video should appear in the media files list below
  - The category should show as "hero"

### 4. Check Homepage Display
- Navigate to http://localhost:3000/
- Look for two places where the video should appear:

#### A. Hero Section (Top of page)
- The hero section with the yellow "Everyone" text should show:
  - If video exists: Auto-playing background video
  - The video should play automatically, muted, and loop

#### B. "See Our Impact in Action" Section
- Scroll down to find this section
- Should display the uploaded video with controls
- Users can play/pause the video

### 5. Debug Information
- Open browser console (F12)
- You should see debug logs:
  - "Media files loaded: X"
  - "Hero videos found: X"
  - "HeroWithMedia - Hero videos: X"
  - If video URL is set, you'll see the Firebase URL

### Common Issues and Solutions

1. **Video doesn't appear after upload**
   - Ensure category is set to "hero" when uploading
   - Refresh the page after upload
   - Check browser console for errors

2. **Video fails to play**
   - Check if Firebase URL is accessible (should start with https://firebasestorage.googleapis.com/)
   - Ensure video format is supported (MP4 works best)
   - Check browser console for video load errors

3. **No Firebase configured**
   - If you see mock URLs (/uploads/mock/...), Firebase is not configured
   - Add Firebase credentials to .env file
   - Restart the server after adding credentials

### Expected Console Output
When working correctly, you should see:
```
Media files loaded: [number]
Hero videos found: [1 or more] [array of video objects]
HeroWithMedia - Media files: [number]
HeroWithMedia - Hero videos: [1 or more]
HeroWithMedia - Video URL: https://firebasestorage.googleapis.com/...
```