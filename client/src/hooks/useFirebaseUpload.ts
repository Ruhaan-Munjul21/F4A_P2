import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useToast } from './use-toast';

interface UploadOptions {
  endpoint?: string;
  onSuccess?: (data: UploadResult) => void;
  onError?: (error: Error) => void;
  category?: string;
  isPublic?: boolean;
}

interface UploadResult {
  message: string;
  url: string;
  thumbnailUrl?: string;
  media?: any;
}

interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export function useFirebaseUpload(options: UploadOptions = {}) {
  const { toast } = useToast();
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      
      if (options.category) {
        formData.append('category', options.category);
      }
      
      if (options.isPublic !== undefined) {
        formData.append('isPublic', String(options.isPublic));
      }

      const endpoint = options.endpoint || '/api/admin/media/upload';

      return new Promise<UploadResult>((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const progress = {
              loaded: event.loaded,
              total: event.total,
              percentage: Math.round((event.loaded / event.total) * 100)
            };
            setUploadProgress(progress);
          }
        });

        xhr.addEventListener('load', () => {
          setIsUploading(false);
          setUploadProgress(null);
          
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const response = JSON.parse(xhr.responseText);
              resolve(response);
            } catch (error) {
              reject(new Error('Invalid response format'));
            }
          } else {
            try {
              const error = JSON.parse(xhr.responseText);
              reject(new Error(error.message || 'Upload failed'));
            } catch {
              reject(new Error(`Upload failed with status ${xhr.status}`));
            }
          }
        });

        xhr.addEventListener('error', () => {
          setIsUploading(false);
          setUploadProgress(null);
          reject(new Error('Network error during upload'));
        });

        xhr.open('POST', endpoint);
        xhr.send(formData);
      });
    },
    onSuccess: (data) => {
      toast({
        title: 'Success',
        description: data.message || 'File uploaded successfully',
      });
      options.onSuccess?.(data);
    },
    onError: (error: Error) => {
      toast({
        title: 'Upload Failed',
        description: error.message,
        variant: 'destructive',
      });
      options.onError?.(error);
    }
  });

  const uploadMultiple = useMutation({
    mutationFn: async (files: File[]) => {
      setIsUploading(true);
      const formData = new FormData();
      
      files.forEach(file => {
        formData.append('files', file);
      });
      
      if (options.category) {
        formData.append('category', options.category);
      }
      
      if (options.isPublic !== undefined) {
        formData.append('isPublic', String(options.isPublic));
      }

      const response = await fetch('/api/admin/media/upload-batch', {
        method: 'POST',
        body: formData,
      });

      setIsUploading(false);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Batch upload failed');
      }

      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: 'Success',
        description: `${data.results?.length || 0} files uploaded successfully`,
      });
      options.onSuccess?.(data);
    },
    onError: (error: Error) => {
      toast({
        title: 'Batch Upload Failed',
        description: error.message,
        variant: 'destructive',
      });
      options.onError?.(error);
    }
  });

  return {
    upload: uploadMutation.mutate,
    uploadAsync: uploadMutation.mutateAsync,
    uploadMultiple: uploadMultiple.mutate,
    uploadMultipleAsync: uploadMultiple.mutateAsync,
    isUploading: isUploading || uploadMutation.isPending || uploadMultiple.isPending,
    isSuccess: uploadMutation.isSuccess || uploadMultiple.isSuccess,
    isError: uploadMutation.isError || uploadMultiple.isError,
    error: uploadMutation.error || uploadMultiple.error,
    uploadProgress,
    reset: () => {
      uploadMutation.reset();
      uploadMultiple.reset();
      setUploadProgress(null);
    }
  };
}

// Hook for marketplace image uploads
export function useMarketplaceImageUpload() {
  return useFirebaseUpload({
    endpoint: '/api/marketplace/upload-image',
    isPublic: true
  });
}

// Hook for admin media uploads
export function useAdminMediaUpload(category?: string) {
  return useFirebaseUpload({
    endpoint: '/api/admin/media/upload',
    category,
    isPublic: true
  });
}