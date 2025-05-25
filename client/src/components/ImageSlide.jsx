import React, { useState } from 'react';

function ImageSlide({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!images || images.length === 0) return null;

  return (
    <div style={{ position: 'relative', width: '400px', height: '300px' }}>
      <img
        src={images[currentIndex]}
        alt={`property-${currentIndex}`}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <button
        onClick={prevImage}
        style={{
          position: 'absolute',
          top: '50%',
          left: '10px',
          transform: 'translateY(-50%)',
          fontSize: '24px',
          background: 'rgba(0,0,0,0.5)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          padding: '5px 10px',
        }}
      >
        ‹
      </button>
      <button
        onClick={nextImage}
        style={{
          position: 'absolute',
          top: '50%',
          right: '10px',
          transform: 'translateY(-50%)',
          fontSize: '24px',
          background: 'rgba(0,0,0,0.5)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          padding: '5px 10px',
        }}
      >
        ›
      </button>
    </div>
  );
}

export default ImageSlide;
