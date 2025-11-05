import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ZoomIn, ZoomOut, Move, RotateCw, Crop } from "lucide-react";

interface ImageCropperProps {
  imageUrl: string;
  onCrop: (croppedBlob: Blob) => void;
  onCancel: () => void;
  aspectRatio?: number; // width/height ratio, default is 16/9 for hero
}

export default function ImageCropper({ 
  imageUrl, 
  onCrop, 
  onCancel,
  aspectRatio = 16/9 
}: ImageCropperProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageSize({ width: img.width, height: img.height });
      setImageLoaded(true);
      
      // Auto-scale image to fit the crop area initially
      if (containerRef.current) {
        const container = containerRef.current.getBoundingClientRect();
        const containerAspect = container.width / container.height;
        const imageAspect = img.width / img.height;
        
        // Calculate initial scale to ensure image covers the crop area
        let initialScale = 1;
        if (imageAspect > containerAspect) {
          // Image is wider - scale based on height
          initialScale = (container.height / img.height) * 1.2;
        } else {
          // Image is taller - scale based on width
          initialScale = (container.width / img.width) * 1.2;
        }
        setScale(Math.max(1, initialScale));
      }
    };
    img.src = imageUrl;
  }, [imageUrl]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && containerRef.current) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      
      // Limit movement to keep image within bounds
      const container = containerRef.current.getBoundingClientRect();
      const maxX = container.width / 2;
      const maxY = container.height / 2;
      
      setPosition({
        x: Math.max(-maxX, Math.min(maxX, newX)),
        y: Math.max(-maxY, Math.min(maxY, newY))
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleCrop = async () => {
    if (!containerRef.current || !canvasRef.current || !imageLoaded) return;

    const container = containerRef.current.getBoundingClientRect();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match desired output (1920x1080 for 16:9 hero)
    const outputWidth = 1920;
    const outputHeight = Math.round(outputWidth / aspectRatio);
    canvas.width = outputWidth;
    canvas.height = outputHeight;

    // Create image for cropping
    const img = new Image();
    img.onload = () => {
      // Calculate what portion of the original image is visible in the crop area
      const containerWidth = container.width;
      const containerHeight = container.height;
      
      // Calculate the displayed image dimensions
      const displayedWidth = img.width * scale;
      const displayedHeight = img.height * scale;
      
      // Calculate the crop area in terms of the original image
      // The crop area is always the full container size
      const cropWidth = img.width / scale;
      const cropHeight = img.height / scale;
      
      // Calculate the top-left position of the crop area on the original image
      // Position is relative to center, so we need to convert it
      const centerX = img.width / 2;
      const centerY = img.height / 2;
      
      // Calculate source rectangle (what part of the original image to crop)
      const sourceX = Math.max(0, centerX - (cropWidth / 2) - (position.x * img.width / displayedWidth));
      const sourceY = Math.max(0, centerY - (cropHeight / 2) - (position.y * img.height / displayedHeight));
      const sourceWidth = Math.min(cropWidth, img.width - sourceX);
      const sourceHeight = Math.min(cropHeight, img.height - sourceY);
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw the cropped portion of the image onto the canvas
      ctx.drawImage(
        img,
        sourceX, sourceY, sourceWidth, sourceHeight,  // Source rectangle
        0, 0, canvas.width, canvas.height              // Destination rectangle
      );

      // Convert to blob
      canvas.toBlob((blob) => {
        if (blob) {
          onCrop(blob);
        }
      }, 'image/jpeg', 0.9);
    };
    img.src = imageUrl;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Crop & Position Image</h2>
            <p className="text-sm text-muted-foreground">
              Adjust how your image will appear in the hero section (16:9 ratio)
            </p>
          </div>

          {/* Preview Container */}
          <div className="relative">
            <div 
              ref={containerRef}
              className="relative bg-gray-900 rounded-lg overflow-hidden cursor-move"
              style={{ aspectRatio: `${aspectRatio}`, maxHeight: '500px' }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {/* Image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  ref={imageRef}
                  src={imageUrl}
                  alt="Crop preview"
                  className="max-w-none"
                  style={{
                    transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                    transition: isDragging ? 'none' : 'transform 0.1s',
                    userSelect: 'none',
                    pointerEvents: 'none',
                    width: 'auto',
                    height: 'auto'
                  }}
                  draggable={false}
                />
              </div>
              
              {/* Crop area indicator */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Corner markers */}
                <div className="absolute top-2 left-2 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-sm" />
                <div className="absolute top-2 right-2 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-sm" />
                <div className="absolute bottom-2 left-2 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-sm" />
                <div className="absolute bottom-2 right-2 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-sm" />
                
                {/* Grid lines */}
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
                  <div className="border-r border-white/20" />
                  <div className="border-r border-white/20" />
                  <div />
                  <div className="border-r border-white/20" />
                  <div className="border-r border-white/20" />
                  <div />
                  <div className="border-r border-white/20" />
                  <div className="border-r border-white/20" />
                  <div />
                </div>
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
                  <div className="border-b border-white/20" />
                  <div className="border-b border-white/20" />
                  <div className="border-b border-white/20" />
                  <div className="border-b border-white/20" />
                  <div className="border-b border-white/20" />
                  <div className="border-b border-white/20" />
                  <div />
                  <div />
                  <div />
                </div>
              </div>
              
              {/* Crop info */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded text-sm">
                16:9 Crop Area
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <ZoomOut className="h-4 w-4 text-muted-foreground" />
              <Slider
                value={[scale]}
                onValueChange={([value]) => setScale(value)}
                min={0.5}
                max={3}
                step={0.1}
                className="flex-1"
              />
              <ZoomIn className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground w-16 text-right">
                {Math.round(scale * 100)}%
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Move className="h-4 w-4" />
                <span>Drag image to reposition within the crop area</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setScale(1);
                  setPosition({ x: 0, y: 0 });
                }}
              >
                <RotateCw className="h-4 w-4 mr-1" />
                Reset
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <div className="text-xs text-muted-foreground">
              Output: 1920×{Math.round(1920 / aspectRatio)}px
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button onClick={handleCrop}>
                <Crop className="h-4 w-4 mr-1" />
                Apply Crop
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden canvas for cropping */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}