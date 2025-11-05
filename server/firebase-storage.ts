import { bucket, isFirebaseConfigured } from './firebase-config';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import sharp from 'sharp';
import { Readable } from 'stream';

export interface UploadOptions {
  folder?: string;
  maxSizeBytes?: number;
  allowedMimeTypes?: string[];
  generateThumbnail?: boolean;
  thumbnailSize?: { width: number; height: number };
  makePublic?: boolean;
}

export interface UploadResult {
  url: string;
  thumbnailUrl?: string;
  fileName: string;
  size: number;
  mimeType: string;
  metadata?: Record<string, any>;
}

const DEFAULT_OPTIONS: UploadOptions = {
  folder: 'uploads',
  maxSizeBytes: 200 * 1024 * 1024, // 200MB for video support
  allowedMimeTypes: [
    // Image formats
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    // Video formats
    'video/mp4',
    'video/quicktime',
    'video/x-msvideo',
    'video/webm',
    'video/mov',
    'video/mpeg',
    // Audio formats
    'audio/mpeg', // MP3
    'audio/mp3',
    'audio/wav',
    'audio/webm',
    'audio/ogg',
    'audio/m4a'
  ],
  generateThumbnail: true,
  thumbnailSize: { width: 400, height: 400 },
  makePublic: true
};

export class FirebaseStorageService {
  /**
   * Upload a file to Firebase Storage
   */
  static async uploadFile(
    fileBuffer: Buffer,
    originalName: string,
    mimeType: string,
    options: UploadOptions = {}
  ): Promise<UploadResult> {
    // Check if Firebase is configured
    if (!isFirebaseConfigured || !bucket) {
      console.warn('Firebase Storage not configured - returning mock URL');
      return {
        url: `/uploads/mock/${originalName}`,
        thumbnailUrl: undefined,
        fileName: originalName,
        size: fileBuffer.length,
        mimeType,
        metadata: {
          originalName,
          uploadedAt: new Date().toISOString()
        }
      };
    }
    
    const opts = { ...DEFAULT_OPTIONS, ...options };

    // Validate file size
    if (fileBuffer.length > (opts.maxSizeBytes || DEFAULT_OPTIONS.maxSizeBytes!)) {
      throw new Error(`File size exceeds maximum allowed size of ${opts.maxSizeBytes} bytes`);
    }

    // Validate mime type
    if (opts.allowedMimeTypes && !opts.allowedMimeTypes.includes(mimeType)) {
      throw new Error(`File type ${mimeType} is not allowed`);
    }

    // Generate unique filename
    const ext = path.extname(originalName);
    const nameWithoutExt = path.basename(originalName, ext);
    const uniqueId = uuidv4();
    const fileName = `${nameWithoutExt}-${uniqueId}${ext}`;
    const filePath = `${opts.folder}/${fileName}`;

    // Upload main file
    const file = bucket.file(filePath);
    const stream = file.createWriteStream({
      metadata: {
        contentType: mimeType,
        metadata: {
          originalName,
          uploadedAt: new Date().toISOString()
        }
      },
      resumable: false
    });

    await new Promise((resolve, reject) => {
      stream.on('error', reject);
      stream.on('finish', resolve);
      stream.end(fileBuffer);
    });

    // Make file public if requested
    if (opts.makePublic) {
      await file.makePublic();
    }

    // Get public URL - use firebasestorage.googleapis.com for public files
    const url = opts.makePublic 
      ? `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(filePath)}?alt=media`
      : await this.getSignedUrl(filePath);

    let thumbnailUrl: string | undefined;

    // Generate thumbnail for images
    if (opts.generateThumbnail && mimeType.startsWith('image/')) {
      thumbnailUrl = await this.generateThumbnail(
        fileBuffer,
        fileName,
        opts.folder!,
        opts.thumbnailSize!,
        opts.makePublic!
      );
    }

    return {
      url,
      thumbnailUrl,
      fileName,
      size: fileBuffer.length,
      mimeType,
      metadata: {
        originalName,
        uploadedAt: new Date().toISOString()
      }
    };
  }

  /**
   * Generate and upload a thumbnail
   */
  private static async generateThumbnail(
    imageBuffer: Buffer,
    originalFileName: string,
    folder: string,
    size: { width: number; height: number },
    makePublic: boolean
  ): Promise<string> {
    try {
      // Generate thumbnail using sharp
      const thumbnailBuffer = await sharp(imageBuffer)
        .resize(size.width, size.height, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({ quality: 80 })
        .toBuffer();

      // Create thumbnail filename
      const ext = path.extname(originalFileName);
      const nameWithoutExt = path.basename(originalFileName, ext);
      const thumbnailFileName = `${nameWithoutExt}-thumb.jpg`;
      const thumbnailPath = `${folder}/thumbnails/${thumbnailFileName}`;

      // Upload thumbnail
      const thumbnailFile = bucket.file(thumbnailPath);
      const stream = thumbnailFile.createWriteStream({
        metadata: {
          contentType: 'image/jpeg',
          metadata: {
            isThumbnail: 'true',
            originalFile: originalFileName
          }
        },
        resumable: false
      });

      await new Promise((resolve, reject) => {
        stream.on('error', reject);
        stream.on('finish', resolve);
        stream.end(thumbnailBuffer);
      });

      if (makePublic) {
        await thumbnailFile.makePublic();
      }

      return makePublic
        ? `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(thumbnailPath)}?alt=media`
        : await this.getSignedUrl(thumbnailPath);
    } catch (error) {
      console.error('Error generating thumbnail:', error);
      return '';
    }
  }

  /**
   * Delete a file from Firebase Storage
   */
  static async deleteFile(filePath: string): Promise<void> {
    if (!isFirebaseConfigured || !bucket) {
      console.warn('Firebase Storage not configured - skipping delete');
      return;
    }
    
    try {
      const file = bucket.file(filePath);
      await file.delete();
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }

  /**
   * Delete multiple files
   */
  static async deleteFiles(filePaths: string[]): Promise<void> {
    const deletePromises = filePaths.map(path => this.deleteFile(path));
    await Promise.all(deletePromises);
  }

  /**
   * Get a signed URL for private files
   */
  static async getSignedUrl(filePath: string, expiresInMinutes: number = 60): Promise<string> {
    if (!isFirebaseConfigured || !bucket) {
      console.warn('Firebase Storage not configured - returning mock URL');
      return `/uploads/mock/${filePath}`;
    }
    
    const file = bucket.file(filePath);
    const [signedUrl] = await file.getSignedUrl({
      version: 'v4',
      action: 'read',
      expires: Date.now() + expiresInMinutes * 60 * 1000
    });
    return signedUrl;
  }

  /**
   * List files in a folder
   */
  static async listFiles(folder: string, limit: number = 100): Promise<Array<{
    name: string;
    size: number;
    updated: string;
    url: string;
  }>> {
    if (!isFirebaseConfigured || !bucket) {
      console.warn('Firebase Storage not configured - returning empty list');
      return [];
    }
    
    const [files] = await bucket.getFiles({
      prefix: folder,
      maxResults: limit
    });

    return Promise.all(files.map(async (file) => {
      const [metadata] = await file.getMetadata();
      return {
        name: file.name,
        size: parseInt(metadata.size || '0'),
        updated: metadata.updated,
        url: `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(file.name)}?alt=media`
      };
    }));
  }

  /**
   * Move a file to a different location
   */
  static async moveFile(oldPath: string, newPath: string): Promise<void> {
    const file = bucket.file(oldPath);
    await file.move(newPath);
  }

  /**
   * Check if file exists
   */
  static async fileExists(filePath: string): Promise<boolean> {
    const file = bucket.file(filePath);
    const [exists] = await file.exists();
    return exists;
  }

  /**
   * Get file metadata
   */
  static async getFileMetadata(filePath: string): Promise<any> {
    const file = bucket.file(filePath);
    const [metadata] = await file.getMetadata();
    return metadata;
  }

  /**
   * Stream upload for large files
   */
  static async streamUpload(
    stream: Readable,
    fileName: string,
    mimeType: string,
    options: UploadOptions = {}
  ): Promise<UploadResult> {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const filePath = `${opts.folder}/${fileName}`;
    const file = bucket.file(filePath);

    const writeStream = file.createWriteStream({
      metadata: {
        contentType: mimeType
      },
      resumable: true
    });

    return new Promise((resolve, reject) => {
      let uploadedBytes = 0;

      stream.on('data', (chunk) => {
        uploadedBytes += chunk.length;
      });

      stream.on('error', reject);
      writeStream.on('error', reject);
      
      writeStream.on('finish', async () => {
        if (opts.makePublic) {
          await file.makePublic();
        }

        const url = opts.makePublic
          ? `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(filePath)}?alt=media`
          : await this.getSignedUrl(filePath);

        resolve({
          url,
          fileName,
          size: uploadedBytes,
          mimeType
        });
      });

      stream.pipe(writeStream);
    });
  }
}

export default FirebaseStorageService;