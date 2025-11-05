import { useMedia, getVideosByCategory, getMediaUrl } from "@/hooks/useMedia";
import Navigation from "@/components/navigation";

export default function VideoTest() {
  const { data: mediaFiles = [], isLoading } = useMedia();
  const heroVideos = getVideosByCategory(mediaFiles, 'hero');
  const introVideos = getVideosByCategory(mediaFiles, 'intro-video');
  const allVideos = [...heroVideos, ...introVideos];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Video Test Page</h1>
        
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded">
            <h2 className="font-semibold">Debug Info:</h2>
            <p>Loading: {isLoading ? 'Yes' : 'No'}</p>
            <p>Total media files: {mediaFiles.length}</p>
            <p>Hero videos: {heroVideos.length}</p>
            <p>Intro videos: {introVideos.length}</p>
            <p>Combined videos: {allVideos.length}</p>
          </div>

          {allVideos.map((video, index) => {
            const videoUrl = getMediaUrl(video.filePath);
            return (
              <div key={video.id} className="p-4 bg-muted rounded">
                <h3 className="font-semibold mb-2">Video {index + 1} - {video.category}</h3>
                <p className="text-sm mb-2">ID: {video.id}</p>
                <p className="text-sm mb-2">Filename: {video.filename}</p>
                <p className="text-sm mb-2">MIME Type: {video.mimeType}</p>
                <p className="text-sm mb-2">URL: {videoUrl}</p>
                <div className="mt-4">
                  <video
                    controls
                    muted={false}
                    className="w-full max-w-2xl"
                    onLoadedData={() => console.log(`Video ${video.id} loaded successfully`)}
                    onError={(e) => console.error(`Video ${video.id} failed to load:`, e)}
                  >
                    <source src={videoUrl} type={video.mimeType} />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            );
          })}

          {!isLoading && allVideos.length === 0 && (
            <p className="text-muted-foreground">
              No videos found with categories "hero" or "intro-video"
            </p>
          )}
        </div>
      </div>
    </div>
  );
}