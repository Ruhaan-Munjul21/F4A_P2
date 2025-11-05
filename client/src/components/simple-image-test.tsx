import { useState, useEffect } from "react";

export default function SimpleImageTest() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/media')
      .then(res => res.json())
      .then(data => {
        console.log('Fetched images:', data);
        setImages(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching images:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Simple Image Test - Found {images.length} images</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {images.map((img, idx) => (
          <div key={img.id} style={{ border: '1px solid #ccc', padding: '10px' }}>
            <h4>Image {idx + 1}: {img.originalName}</h4>
            <p>Category: {img.category}</p>
            <p style={{ fontSize: '10px', wordBreak: 'break-all' }}>URL: {img.filePath}</p>
            <img 
              src={img.filePath}
              alt={img.altText || img.originalName}
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              onError={(e) => {
                console.error(`Failed to load image ${img.id}:`, img.filePath);
                (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2NjYyIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjIwMCIgeT0iMTAwIiBzdHlsZT0iZmlsbDojOTk5O2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1zaXplOjE4cHg7Zm9udC1mYW1pbHk6QXJpYWwsSGVsdmV0aWNhLHNhbnMtc2VyaWY7ZG9taW5hbnQtYmFzZWxpbmU6Y2VudHJhbCI+SW1hZ2UgRmFpbGVkPC90ZXh0Pjwvc3ZnPg==';
              }}
              onLoad={() => console.log(`Successfully loaded image ${img.id}`)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}