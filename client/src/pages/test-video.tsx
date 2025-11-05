import { useState, useRef, useEffect } from "react";
import { useMedia, getVideosByCategory, getImagesByCategory, getMediaUrl } from "@/hooks/useMedia";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Play, Pause, Upload, Video, Image as ImageIcon, Volume2, VolumeX } from "lucide-react";
import MediaUpload from "@/components/media-upload";

export default function TestVideo() {
  const { data: mediaFiles = [], isLoading, error, refetch } = useMedia();
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const heroVideos = getVideosByCategory(mediaFiles, 'hero');
  const heroImages = getImagesByCategory(mediaFiles, 'hero');
  
  const videoUrl = heroVideos.length > 0 ? getMediaUrl(heroVideos[0].filePath) : null;
  const imageUrl = heroImages.length > 0 ? getMediaUrl(heroImages[0].filePath) : null;

  const handleVideoPlay = () => {
    setIsPlaying(true);
    setVideoError(null);
    // Start audio overlay when video plays
    if (audioRef.current && audioPlaying) {
      audioRef.current.play();
    }
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
    // Pause audio overlay when video pauses
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const handleVideoError = (e: any) => {
    console.error("Video error:", e);
    setVideoError("Failed to load video. Check console for details.");
    setIsPlaying(false);
  };

  const handleUploadSuccess = () => {
    refetch();
  };

  const toggleAudioOverlay = () => {
    if (audioRef.current) {
      if (audioPlaying) {
        audioRef.current.pause();
        setAudioPlaying(false);
      } else {
        audioRef.current.play();
        setAudioPlaying(true);
      }
    }
  };

  useEffect(() => {
    // Sync audio with video playback
    if (audioRef.current) {
      if (isPlaying && audioPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, audioPlaying]);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Hero Video Test Page</h1>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Media Files</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mediaFiles.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Hero Videos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center">
              <Video className="h-5 w-5 mr-2" />
              {heroVideos.length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Hero Images</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center">
              <ImageIcon className="h-5 w-5 mr-2" />
              {heroImages.length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upload Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Upload Hero Video</CardTitle>
        </CardHeader>
        <CardContent>
          <MediaUpload 
            category="hero"
            onUploadSuccess={handleUploadSuccess}
            accept="video/*"
            maxSize={100}
          />
        </CardContent>
      </Card>

      {/* Video Display Test */}
      {heroVideos.length > 0 ? (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Current Hero Video</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gray-100 p-2 rounded">
                <p className="text-sm font-mono break-all">{videoUrl}</p>
              </div>
              
              <div className="relative bg-black rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                <video
                  className="absolute inset-0 w-full h-full"
                  controls
                  muted={false}
                  autoPlay={isPlaying}
                  onPlay={handleVideoPlay}
                  onPause={handleVideoPause}
                  onError={handleVideoError}
                  key={videoUrl} // Force re-render when URL changes
                >
                  <source src={videoUrl!} type="video/mp4" />
                  <source src={videoUrl!} type="video/webm" />
                  Your browser does not support the video tag.
                </video>

                {/* Audio Overlay */}
                <audio
                  ref={audioRef}
                  loop
                  volume={0.3}
                >
                  <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mp3" />
                  <source src="https://upload.wikimedia.org/wikipedia/commons/c/c8/Example.ogg" type="audio/ogg" />
                </audio>

                {/* Audio Overlay Control Button */}
                <button
                  onClick={toggleAudioOverlay}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors z-10"
                  title={audioPlaying ? "Mute Background Music" : "Play Background Music"}
                >
                  {audioPlaying ? (
                    <Volume2 className="w-5 h-5" />
                  ) : (
                    <VolumeX className="w-5 h-5" />
                  )}
                </button>
              </div>
              
              {videoError && (
                <Alert variant="destructive">
                  <AlertDescription>{videoError}</AlertDescription>
                </Alert>
              )}
              
              <div className="flex gap-2">
                <Button onClick={() => setIsPlaying(!isPlaying)}>
                  {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                  {isPlaying ? 'Pause' : 'Play'}
                </Button>
                <Button
                  onClick={toggleAudioOverlay}
                  variant={audioPlaying ? "default" : "outline"}
                >
                  {audioPlaying ? <Volume2 className="h-4 w-4 mr-2" /> : <VolumeX className="h-4 w-4 mr-2" />}
                  {audioPlaying ? 'Background Music On' : 'Background Music Off'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Alert>
          <AlertDescription>
            No hero videos uploaded yet. Use the upload form above to add a video with category "hero".
          </AlertDescription>
        </Alert>
      )}

      {/* Hero Section Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Hero Section Preview (How it will look)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative h-96 bg-gray-900 rounded-lg overflow-hidden">
            {heroVideos.length > 0 ? (
              <>
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={videoUrl!} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/40"></div>
              </>
            ) : imageUrl ? (
              <>
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url("${imageUrl}")` }}
                />
                <div className="absolute inset-0 bg-black/40"></div>
              </>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
            )}
            
            <div className="relative z-10 p-8 text-white">
              <h2 className="text-3xl font-bold mb-2">Making Fencing Accessible to Everyone</h2>
              <p className="text-lg opacity-90">This is how your hero section will appear with video background</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Debug Information */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Debug Information</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto">
            {JSON.stringify({
              loading: isLoading,
              error: error?.message,
              totalMedia: mediaFiles.length,
              heroVideos: heroVideos.map(v => ({
                id: v.id,
                filename: v.filename,
                mimeType: v.mimeType,
                size: v.fileSize,
                url: getMediaUrl(v.filePath)
              })),
              heroImages: heroImages.map(img => ({
                id: img.id,
                filename: img.filename,
                category: img.category
              }))
            }, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}