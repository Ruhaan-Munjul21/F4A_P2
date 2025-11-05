import { useQuery } from "@tanstack/react-query";

export interface MediaFile {
  id: number;
  filename: string;
  originalName: string;
  mimeType: string;
  fileSize: number;
  filePath: string;
  uploadedBy?: string;
  altText?: string;
  category: string;
  isPublic: boolean;
  createdAt: string;
}

export function useMedia(filters?: { category?: string; type?: string }) {
  return useQuery<MediaFile[]>({
    queryKey: ["media", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.category) params.append("category", filters.category);
      if (filters?.type) params.append("type", filters.type);
      
      const response = await fetch(`/api/media?${params}`);
      if (!response.ok) throw new Error("Failed to fetch media");
      return response.json();
    },
  });
}

export function getMediaUrl(filePath: string, filename?: string): string {
  // If filePath is already a Firebase Storage URL, return it directly
  // Handle both .firebasestorage.com and .firebasestorage.app domains
  if (filePath.startsWith('https://storage.googleapis.com/') || 
      filePath.startsWith('https://firebasestorage.googleapis.com/') ||
      filePath.includes('.firebasestorage.app/')) {
    return filePath;
  }
  
  // Fallback for local files (backward compatibility)
  if (filename) {
    const mediaType = filePath.includes('images') ? 'images' : 'videos';
    return `/uploads/${mediaType}/${filename}`;
  }
  
  return filePath;
}

export function getMediaByCategory(mediaFiles: MediaFile[], category: string): MediaFile[] {
  return mediaFiles.filter(file => file.category === category && file.isPublic);
}

export function getImagesByCategory(mediaFiles: MediaFile[], category: string): MediaFile[] {
  return mediaFiles.filter(file => 
    file.category === category && 
    file.isPublic && 
    file.mimeType.startsWith('image/')
  );
}

export function getVideosByCategory(mediaFiles: MediaFile[], category: string): MediaFile[] {
  return mediaFiles.filter(file => 
    file.category === category && 
    file.isPublic && 
    file.mimeType.startsWith('video/')
  );
}

export function getRandomMedia(mediaFiles: MediaFile[], count: number = 1): MediaFile[] {
  const shuffled = [...mediaFiles].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}