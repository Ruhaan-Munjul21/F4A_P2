import type { Express } from "express";
import express from "express";
import multer from "multer";
import { storage } from "./storage";
import { insertMediaFileSchema, insertPageContentSchema, insertTeamMemberSchema, insertScholarshipAthleteSchema } from "@shared/schema";
import { z } from "zod";
import FirebaseStorageService from "./firebase-storage";

// Configure multer for memory storage (for Firebase upload)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 200 * 1024 * 1024, // 200MB limit for video support
  },
  fileFilter: (_req, file, cb) => {
    // Allow images, videos, and audio files
    console.log('File upload attempt:', file.originalname, 'MIME:', file.mimetype);
    if (file.mimetype.startsWith('image/') || 
        file.mimetype.startsWith('video/') || 
        file.mimetype.startsWith('audio/')) {
      cb(null, true);
    } else {
      cb(new Error(`Only image, video, and audio files are allowed. Received: ${file.mimetype}`));
    }
  }
});

export function registerAdminRoutes(app: Express) {
  // Admin media upload endpoint using Firebase Storage
  app.post('/api/admin/media/upload', upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      // Determine folder based on file type
      const folder = req.file.mimetype.startsWith('image/') ? 'images' : 'videos';
      
      // Upload to Firebase Storage
      const uploadResult = await FirebaseStorageService.uploadFile(
        req.file.buffer,
        req.file.originalname,
        req.file.mimetype,
        {
          folder,
          generateThumbnail: req.file.mimetype.startsWith('image/'),
          makePublic: req.body.isPublic !== 'false'
        }
      );

      // Save metadata to database
      const mediaData = {
        filename: uploadResult.fileName,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        fileSize: req.file.size,
        filePath: uploadResult.url, // Store Firebase URL instead of local path
        uploadedBy: req.body.uploadedBy || 'admin',
        altText: req.body.altText || req.file.originalname,
        category: req.body.category || 'general',
        isPublic: req.body.isPublic !== 'false'
      };

      const validatedData = insertMediaFileSchema.parse(mediaData);
      const newMedia = await storage.createMediaFile(validatedData);

      res.status(201).json({
        message: 'File uploaded successfully',
        media: newMedia,
        url: uploadResult.url,
        thumbnailUrl: uploadResult.thumbnailUrl
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid data', errors: error.errors });
      }
      console.error('Error uploading media:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload media';
      res.status(500).json({ message: errorMessage, error: error.toString() });
    }
  });

  // Batch upload endpoint
  app.post('/api/admin/media/upload-batch', upload.array('files', 10), async (req, res) => {
    try {
      if (!req.files || !Array.isArray(req.files)) {
        return res.status(400).json({ message: 'No files uploaded' });
      }

      const uploadPromises = req.files.map(async (file) => {
        const folder = file.mimetype.startsWith('image/') ? 'images' : 'videos';
        
        const uploadResult = await FirebaseStorageService.uploadFile(
          file.buffer,
          file.originalname,
          file.mimetype,
          {
            folder,
            generateThumbnail: file.mimetype.startsWith('image/'),
            makePublic: req.body.isPublic !== 'false'
          }
        );

        const mediaData = {
          filename: uploadResult.fileName,
          originalName: file.originalname,
          mimeType: file.mimetype,
          fileSize: file.size,
          filePath: uploadResult.url,
          uploadedBy: req.body.uploadedBy || 'admin',
          altText: req.body.altText || file.originalname,
          category: req.body.category || 'general',
          isPublic: req.body.isPublic !== 'false'
        };

        const validatedData = insertMediaFileSchema.parse(mediaData);
        const newMedia = await storage.createMediaFile(validatedData);

        return {
          media: newMedia,
          url: uploadResult.url,
          thumbnailUrl: uploadResult.thumbnailUrl
        };
      });

      const results = await Promise.all(uploadPromises);

      res.status(201).json({
        message: 'Files uploaded successfully',
        results
      });
    } catch (error) {
      console.error('Error uploading batch media:', error);
      res.status(500).json({ message: 'Failed to upload media files' });
    }
  });

  // Get all media files
  app.get('/api/admin/media', async (_req, res) => {
    try {
      const { category, type } = _req.query;
      const mediaFiles = await storage.getMediaFiles({
        category: category as string,
        type: type as string
      });
      res.json(mediaFiles);
    } catch (error) {
      console.error('Error fetching media files:', error);
      res.status(500).json({ message: 'Failed to fetch media files' });
    }
  });

  // Delete media file
  app.delete('/api/admin/media/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const media = await storage.getMediaFileById(id);
      
      if (!media) {
        return res.status(404).json({ message: 'Media file not found' });
      }

      // Extract file path from URL for Firebase deletion
      if (media.filePath && media.filePath.includes('storage.googleapis.com')) {
        const urlParts = media.filePath.split('/');
        const bucketIndex = urlParts.findIndex(part => part.includes('.appspot.com'));
        if (bucketIndex !== -1 && bucketIndex < urlParts.length - 1) {
          const filePath = urlParts.slice(bucketIndex + 1).join('/');
          try {
            await FirebaseStorageService.deleteFile(filePath);
          } catch (error) {
            console.error('Error deleting file from Firebase:', error);
          }
        }
      }

      // Delete from database
      await storage.deleteMediaFile(id);
      
      res.json({ message: 'Media file deleted successfully' });
    } catch (error) {
      console.error('Error deleting media file:', error);
      res.status(500).json({ message: 'Failed to delete media file' });
    }
  });

  // Get admin dashboard data
  app.get('/api/admin/dashboard', async (_req, res) => {
    try {
      const stats = await storage.getAdminStats();
      res.json(stats);
    } catch (error) {
      console.error('Error fetching admin stats:', error);
      res.status(500).json({ message: 'Failed to fetch admin statistics' });
    }
  });

  // List Firebase Storage files
  app.get('/api/admin/media/firebase-files', async (req, res) => {
    try {
      const folder = req.query.folder as string || 'uploads';
      const limit = parseInt(req.query.limit as string) || 100;
      
      const files = await FirebaseStorageService.listFiles(folder, limit);
      res.json(files);
    } catch (error) {
      console.error('Error listing Firebase files:', error);
      res.status(500).json({ message: 'Failed to list Firebase files' });
    }
  });

  // Get signed URL for private files
  app.get('/api/admin/media/signed-url/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const media = await storage.getMediaFileById(id);
      
      if (!media) {
        return res.status(404).json({ message: 'Media file not found' });
      }

      // If file is not public, generate signed URL
      if (!media.isPublic && media.filePath) {
        const urlParts = media.filePath.split('/');
        const bucketIndex = urlParts.findIndex(part => part.includes('.appspot.com'));
        if (bucketIndex !== -1 && bucketIndex < urlParts.length - 1) {
          const filePath = urlParts.slice(bucketIndex + 1).join('/');
          const signedUrl = await FirebaseStorageService.getSignedUrl(filePath, 60);
          res.json({ url: signedUrl });
        } else {
          res.json({ url: media.filePath });
        }
      } else {
        res.json({ url: media.filePath });
      }
    } catch (error) {
      console.error('Error generating signed URL:', error);
      res.status(500).json({ message: 'Failed to generate signed URL' });
    }
  });

  // Marketplace item image upload - DISABLED
  // app.post('/api/marketplace/upload-image', upload.single('image'), async (req, res) => {
  //   try {
  //     if (!req.file) {
  //       return res.status(400).json({ message: 'No image uploaded' });
  //     }

  //     // Upload to Firebase Storage
  //     const uploadResult = await FirebaseStorageService.uploadFile(
  //       req.file.buffer,
  //       req.file.originalname,
  //       req.file.mimetype,
  //       {
  //         folder: 'marketplace',
  //         generateThumbnail: true,
  //         makePublic: true
  //       }
  //     );

  //     res.status(201).json({
  //       message: 'Image uploaded successfully',
  //       url: uploadResult.url,
  //       thumbnailUrl: uploadResult.thumbnailUrl
  //     });
  //   } catch (error) {
  //     console.error('Error uploading marketplace image:', error);
  //     res.status(500).json({ message: 'Failed to upload image' });
  //   }
  // });

  // Page content management endpoints
  app.get('/api/admin/page-content/:pageId', async (req, res) => {
    try {
      const { pageId } = req.params;
      const { sectionId } = req.query;
      const content = await storage.getAllPageContent(pageId);
      res.json(content);
    } catch (error) {
      console.error("Error fetching page content:", error);
      res.status(500).json({ message: "Failed to fetch page content" });
    }
  });

  app.get('/api/page-content/:pageId', async (req, res) => {
    try {
      const { pageId } = req.params;
      const { sectionId } = req.query;
      const content = await storage.getPageContent(pageId, sectionId as string);
      res.json(content);
    } catch (error) {
      console.error("Error fetching page content:", error);
      res.status(500).json({ message: "Failed to fetch page content" });
    }
  });

  app.post('/api/admin/page-content', async (req, res) => {
    try {
      const validatedData = insertPageContentSchema.parse(req.body);
      const newContent = await storage.createPageContent(validatedData);
      res.status(201).json(newContent);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error creating page content:", error);
      res.status(500).json({ message: "Failed to create page content" });
    }
  });

  app.put('/api/admin/page-content/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertPageContentSchema.partial().parse(req.body);
      const updated = await storage.updatePageContent(Number(id), validatedData);
      res.json(updated);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error updating page content:", error);
      res.status(500).json({ message: "Failed to update page content" });
    }
  });

  app.delete('/api/admin/page-content/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deletePageContent(Number(id));
      res.json({ message: "Content deleted successfully" });
    } catch (error) {
      console.error("Error deleting page content:", error);
      res.status(500).json({ message: "Failed to delete page content" });
    }
  });

  // Team member management endpoints
  app.get('/api/team-members', async (req, res) => {
    try {
      const { category } = req.query;
      const members = await storage.getTeamMembers(category as string);
      res.json(members);
    } catch (error) {
      console.error("Error fetching team members:", error);
      res.status(500).json({ message: "Failed to fetch team members" });
    }
  });

  app.get('/api/admin/team-members', async (req, res) => {
    try {
      const members = await storage.getAllTeamMembers();
      // Convert snake_case to camelCase for response
      const response = members.map((member: any) => ({
        ...member,
        imageUrl: member.image_url || member.imageUrl,
        isActive: member.is_active !== undefined ? member.is_active : member.isActive,
        linkedinUrl: member.linkedin_url || member.linkedinUrl,
        createdAt: member.created_at || member.createdAt,
        updatedAt: member.updated_at || member.updatedAt
      }));
      res.json(response);
    } catch (error) {
      console.error("Error fetching all team members:", error);
      res.status(500).json({ message: "Failed to fetch team members" });
    }
  });

  // Update ordering for multiple team members - MUST come before /:id route
  app.put('/api/admin/team-members/reorder', async (req, res) => {
    try {
      console.log('Reorder request:', req.body);
      const { members } = req.body; // Array of { id, ordering }

      if (!Array.isArray(members)) {
        return res.status(400).json({ message: "Invalid data: members must be an array" });
      }

      // Import database dependencies
      const { db } = await import("./db");
      const { teamMembers } = await import("@shared/schema");
      const { eq, sql } = await import("drizzle-orm");

      // Update each member's ordering directly
      for (const member of members) {
        if (member.id && typeof member.ordering === 'number') {
          console.log(`Updating member ${member.id} to ordering ${member.ordering}`);

          // Direct database update
          await db.update(teamMembers)
            .set({
              ordering: member.ordering,
              updated_at: new Date()
            })
            .where(eq(teamMembers.id, member.id));
        }
      }

      res.json({ message: "Ordering updated successfully" });
    } catch (error) {
      console.error("Error updating team member ordering:", error);
      res.status(500).json({
        message: "Failed to update ordering",
        error: error instanceof Error ? error.message : String(error),
        details: error
      });
    }
  });

  app.post('/api/admin/team-members', async (req, res) => {
    try {
      console.log('Create team member request:', req.body);

      // Convert camelCase to snake_case for database
      const dbData = {
        name: req.body.name,
        title: req.body.title,
        description: req.body.description || null,
        image_url: req.body.imageUrl || null,
        category: req.body.category || 'leadership',
        ordering: req.body.ordering || 0,
        is_active: req.body.isActive !== false,
        linkedin_url: req.body.linkedinUrl || null,
        email: req.body.email || null
      };

      console.log('Converted data for DB:', dbData);
      const validatedData = insertTeamMemberSchema.parse(dbData);
      console.log('Validated data:', validatedData);
      const newMember = await storage.createTeamMember(validatedData);
      console.log('Created team member:', newMember);

      // Convert back to camelCase for response
      const response = {
        ...newMember,
        imageUrl: newMember.image_url,
        isActive: newMember.is_active,
        linkedinUrl: newMember.linkedin_url
      };

      res.status(201).json(response);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Validation error:', error.errors);
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error creating team member:", error);
      res.status(500).json({ message: "Failed to create team member", error: error.toString() });
    }
  });

  app.put('/api/admin/team-members/:id', async (req, res) => {
    try {
      const { id } = req.params;

      // Convert camelCase to snake_case for database
      const dbData: any = {};
      if (req.body.name !== undefined) dbData.name = req.body.name;
      if (req.body.title !== undefined) dbData.title = req.body.title;
      if (req.body.description !== undefined) dbData.description = req.body.description || null;
      if (req.body.imageUrl !== undefined) dbData.image_url = req.body.imageUrl || null;
      if (req.body.category !== undefined) dbData.category = req.body.category;
      if (req.body.ordering !== undefined) dbData.ordering = req.body.ordering;
      if (req.body.isActive !== undefined) dbData.is_active = req.body.isActive;
      if (req.body.linkedinUrl !== undefined) dbData.linkedin_url = req.body.linkedinUrl || null;
      if (req.body.email !== undefined) dbData.email = req.body.email || null;

      const validatedData = insertTeamMemberSchema.partial().parse(dbData);
      const updated = await storage.updateTeamMember(Number(id), validatedData);

      // Convert back to camelCase for response
      const response = {
        ...updated,
        imageUrl: updated.image_url,
        isActive: updated.is_active,
        linkedinUrl: updated.linkedin_url
      };

      res.json(response);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error updating team member:", error);
      res.status(500).json({ message: "Failed to update team member" });
    }
  });

  app.delete('/api/admin/team-members/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteTeamMember(Number(id));
      res.json({ message: "Team member deleted successfully" });
    } catch (error) {
      console.error("Error deleting team member:", error);
      res.status(500).json({ message: "Failed to delete team member" });
    }
  });

  // Scholarship athletes management endpoints
  app.get('/api/admin/scholarship-athletes', async (req, res) => {
    try {
      const athletes = await storage.getAllScholarshipAthletes();
      res.json(athletes);
    } catch (error) {
      console.error("Error fetching scholarship athletes:", error);
      res.status(500).json({ message: "Failed to fetch scholarship athletes" });
    }
  });

  app.post('/api/admin/scholarship-athletes', async (req, res) => {
    try {
      console.log('Create scholarship athlete request:', req.body);

      // Parse achievements if it's an array
      const achievementsData = Array.isArray(req.body.achievements)
        ? JSON.stringify(req.body.achievements)
        : req.body.achievements;

      const dbData = {
        name: req.body.name,
        age: req.body.age || null,
        school: req.body.school || null,
        bio: req.body.bio || null,
        achievements: achievementsData || null,
        scholarshipYear: req.body.scholarshipYear || null,
        imageUrl: req.body.imageUrl || null,
        ordering: req.body.ordering || 0,
        isActive: req.body.isActive !== false
      };

      console.log('Converted data for DB:', dbData);
      const validatedData = insertScholarshipAthleteSchema.parse(dbData);
      console.log('Validated data:', validatedData);
      const newAthlete = await storage.createScholarshipAthlete(validatedData);
      console.log('Created scholarship athlete:', newAthlete);

      res.status(201).json(newAthlete);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Validation error:', error.errors);
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error creating scholarship athlete:", error);
      res.status(500).json({ message: "Failed to create scholarship athlete", error: error.toString() });
    }
  });

  app.put('/api/admin/scholarship-athletes/:id', async (req, res) => {
    try {
      const { id } = req.params;

      const dbData: any = {};
      if (req.body.name !== undefined) dbData.name = req.body.name;
      if (req.body.age !== undefined) dbData.age = req.body.age || null;
      if (req.body.school !== undefined) dbData.school = req.body.school || null;
      if (req.body.bio !== undefined) dbData.bio = req.body.bio || null;
      if (req.body.achievements !== undefined) {
        dbData.achievements = Array.isArray(req.body.achievements)
          ? JSON.stringify(req.body.achievements)
          : req.body.achievements;
      }
      if (req.body.scholarshipYear !== undefined) dbData.scholarshipYear = req.body.scholarshipYear || null;
      if (req.body.imageUrl !== undefined) dbData.imageUrl = req.body.imageUrl || null;
      if (req.body.ordering !== undefined) dbData.ordering = req.body.ordering;
      if (req.body.isActive !== undefined) dbData.isActive = req.body.isActive;

      const validatedData = insertScholarshipAthleteSchema.partial().parse(dbData);
      const updated = await storage.updateScholarshipAthlete(Number(id), validatedData);

      res.json(updated);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error updating scholarship athlete:", error);
      res.status(500).json({ message: "Failed to update scholarship athlete" });
    }
  });

  app.delete('/api/admin/scholarship-athletes/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteScholarshipAthlete(Number(id));
      res.json({ message: "Scholarship athlete deleted successfully" });
    } catch (error) {
      console.error("Error deleting scholarship athlete:", error);
      res.status(500).json({ message: "Failed to delete scholarship athlete" });
    }
  });

  // Serve static files for backward compatibility (if any local files exist)
  const uploadsDir = 'uploads';
  import('fs').then(fs => {
    if (fs.existsSync(uploadsDir)) {
      app.use('/uploads', express.static(uploadsDir));
    }
  });
}