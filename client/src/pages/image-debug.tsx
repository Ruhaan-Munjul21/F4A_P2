import { useState, useEffect } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function ImageDebug() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadStatus, setLoadStatus] = useState<{[key: string]: string}>({});

  useEffect(() => {
    fetch('/api/media')
      .then(res => res.json())
      .then(data => {
        console.log('API Response:', data);
        setImages(data);
        setLoading(false);
        
        // Initialize load status
        const status: any = {};
        data.forEach((img: any) => {
          status[img.id] = 'loading';
        });
        setLoadStatus(status);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setLoading(false);
      });
  }, []);

  const handleImageLoad = (id: string) => {
    console.log(`Image ${id} loaded successfully`);
    setLoadStatus(prev => ({ ...prev, [id]: 'success' }));
  };

  const handleImageError = (id: string, url: string, event: any) => {
    console.error(`Image ${id} failed to load from URL:`, url);
    console.error('Error event:', event);
    setLoadStatus(prev => ({ ...prev, [id]: 'error' }));
  };

  const testDirectUrl = () => {
    const testUrl = 'https://firebasestorage.googleapis.com/v0/b/fencing-for-everyone.firebasestorage.app/o/images%2Ftest-cb7af5de-43c1-4046-9ef8-bbb49fe9c504.png?alt=media';
    const img = new Image();
    img.onload = () => {
      alert('Direct URL loaded successfully!');
    };
    img.onerror = () => {
      alert('Direct URL failed to load');
    };
    img.src = testUrl;
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Image Debug Page</h1>
        
        <button 
          onClick={testDirectUrl}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Test Direct Firebase URL
        </button>
        
        <div className="mb-6 p-4 bg-gray-100 rounded">
          <h2 className="font-bold mb-2">Summary:</h2>
          <p>Total images: {images.length}</p>
          <p>Successfully loaded: {Object.values(loadStatus).filter(s => s === 'success').length}</p>
          <p>Failed to load: {Object.values(loadStatus).filter(s => s === 'error').length}</p>
          <p>Still loading: {Object.values(loadStatus).filter(s => s === 'loading').length}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {images.map((img) => (
            <div key={img.id} className="border p-4 rounded">
              <h3 className="font-bold mb-2">Image ID: {img.id}</h3>
              <div className="text-sm space-y-1 mb-4">
                <p><strong>File:</strong> {img.originalName}</p>
                <p><strong>Category:</strong> {img.category}</p>
                <p><strong>Status:</strong> 
                  <span className={`ml-2 px-2 py-1 rounded text-white ${
                    loadStatus[img.id] === 'success' ? 'bg-green-500' :
                    loadStatus[img.id] === 'error' ? 'bg-red-500' :
                    'bg-yellow-500'
                  }`}>
                    {loadStatus[img.id]}
                  </span>
                </p>
                <p className="break-all"><strong>URL:</strong> {img.filePath}</p>
              </div>
              
              <div className="bg-gray-200 h-48 flex items-center justify-center">
                <img 
                  src={img.filePath}
                  alt={img.altText || img.originalName}
                  className="max-w-full max-h-full object-contain"
                  onLoad={() => handleImageLoad(img.id)}
                  onError={(e) => handleImageError(img.id, img.filePath, e)}
                />
              </div>
              
              {loadStatus[img.id] === 'error' && (
                <div className="mt-2 p-2 bg-red-100 text-red-700 rounded text-sm">
                  Failed to load image. Check console for details.
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}