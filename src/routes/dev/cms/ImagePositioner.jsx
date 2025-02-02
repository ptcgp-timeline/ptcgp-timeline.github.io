import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const ImagePositioner = ({ image, pos, zoom, onUpdate }) => {
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const [availableImages, setAvailableImages] = useState([]);

  useEffect(() => {
    fetch('/api/dev/list-images')
      .then(res => res.json())
      .then(images => setAvailableImages(images));
  }, []);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    onUpdate({ pos: `${x}% ${y}%` });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4">Image Position</h2>
      
      {/* Image Selection */}
      <select
        value={image}
        onChange={(e) => onUpdate({ image: e.target.value })}
        className="w-full p-2 rounded mb-4"
      >
        <option value="">Select an image</option>
        {availableImages.map(img => (
          <option key={img} value={img}>{img}</option>
        ))}
      </select>

      {/* Position Preview */}
      <div
        ref={containerRef}
        className="relative w-full h-64 border-2 border-gray-700 rounded-xl overflow-hidden cursor-move"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {image && (
          <img
            src={`/images/events/${image}`}
            alt="Event"
            className="absolute w-full h-full object-cover"
            style={{
              objectPosition: pos,
              transform: `scale(${parseInt(zoom) / 100})`
            }}
          />
        )}
      </div>

      {/* Zoom Control */}
      <input
        type="range"
        min="100"
        max="1000"
        value={parseInt(zoom)}
        onChange={(e) => onUpdate({ zoom: `${e.target.value}%` })}
        className="w-full mt-4"
      />
    </section>
  );
};

ImagePositioner.propTypes = {
  image: PropTypes.string,
  pos: PropTypes.string.isRequired,
  zoom: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired
};

ImagePositioner.defaultProps = {
  image: ''
};

export default ImagePositioner; 