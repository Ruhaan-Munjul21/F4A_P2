import { useEffect, useState } from "react";
import { useMedia, getImagesByCategory, getMediaUrl } from "@/hooks/useMedia";

export default function TestHero() {
  const { data: mediaFiles = [], isLoading, error } = useMedia();
  const [debugInfo, setDebugInfo] = useState<string>("");

  useEffect(() => {
    const heroImages = getImagesByCategory(mediaFiles, 'hero');
    const info = {
      loading: isLoading,
      error: error?.message || null,
      totalMedia: mediaFiles.length,
      heroImages: heroImages.length,
      heroImageUrls: heroImages.map(img => ({
        id: img.id,
        filename: img.filename,
        category: img.category,
        url: getMediaUrl(img.filePath)
      }))
    };
    setDebugInfo(JSON.stringify(info, null, 2));
  }, [mediaFiles, isLoading, error]);

  const heroImages = getImagesByCategory(mediaFiles, 'hero');
  const imageUrl = heroImages.length > 0 ? getMediaUrl(heroImages[0].filePath) : null;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Hero Image Debug Test</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Debug Info:</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {debugInfo}
        </pre>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Hero Image Display Test:</h2>
        {imageUrl ? (
          <div>
            <p className="mb-2">Image URL: <code className="text-sm bg-gray-100 p-1">{imageUrl}</code></p>
            <div className="border-2 border-gray-300 rounded p-4">
              <img 
                src={imageUrl} 
                alt="Hero test" 
                className="max-w-full h-auto"
                onLoad={() => console.log("Image loaded successfully")}
                onError={(e) => console.error("Image failed to load:", e)}
              />
            </div>
          </div>
        ) : (
          <p>No hero image found</p>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Background Style Test:</h2>
        <div 
          className="h-64 w-full border-2 border-gray-300 rounded bg-cover bg-center"
          style={{ 
            backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
            backgroundColor: imageUrl ? 'transparent' : '#f0f0f0'
          }}
        >
          <div className="bg-black/50 text-white p-4 h-full flex items-center justify-center">
            <p>Background image test</p>
          </div>
        </div>
      </div>
    </div>
  );
}