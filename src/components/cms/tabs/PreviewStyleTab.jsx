import { useState, useRef } from 'react';
import { FiImage, FiMove, FiZoomIn } from 'react-icons/fi';
import PropTypes from 'prop-types';
import TimelineEvent from '../../Timeline/TimelineEvent';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const PreviewStyleTab = ({ event, setEvent, availableImages }) => {
  const [dragStart, setDragStart] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const previewRef = useRef(null);

  const handleDragStart = (e) => {
    if (!previewRef.current) return;
    setIsDragging(true);
    const rect = previewRef.current.getBoundingClientRect();
    const [currentX, currentY] = event.pos.split(' ').map(val => parseInt(val));
    setDragStart({
      x: e.clientX,
      y: e.clientY,
      rect,
      initialPos: { x: currentX, y: currentY }
    });
  };

  const handleDrag = (e) => {
    if (!isDragging || !dragStart || !previewRef.current) return;

    const deltaX = ((e.clientX - dragStart.x) / dragStart.rect.width) * 100;
    const deltaY = ((e.clientY - dragStart.y) / dragStart.rect.height) * 100;

    // Increase movement range
    const maxOffset = 500; // Allow full image width/height movement
    const newX = Math.max(-maxOffset, Math.min(maxOffset, dragStart.initialPos.x + deltaX));
    const newY = Math.max(-maxOffset, Math.min(maxOffset, dragStart.initialPos.y + deltaY));

    setEvent(prev => ({
      ...prev,
      pos: `${Math.round(newX)}% ${Math.round(newY)}%`
    }));
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDragStart(null);
  };

  const handleZoom = (e) => {
    e.preventDefault();
    const currentZoom = parseInt(event.zoom);
    const delta = e.deltaY > 0 ? -2 : 2; // Increase zoom step
    const newZoom = Math.max(10, Math.min(500, currentZoom + delta)); // Wider zoom range

    setEvent(prev => ({
      ...prev,
      zoom: `${newZoom}%`
    }));
  };

  const handleManualPositionChange = (axis, value) => {
    const [x, y] = event.pos.split(' ').map(val => parseInt(val));
    const newPos = axis === 'x' 
      ? `${Math.max(-500, Math.min(500, parseInt(value) || 0))}% ${y}%`
      : `${x}% ${Math.max(-500, Math.min(500, parseInt(value) || 0))}%`;
    
    setEvent(prev => ({
      ...prev,
      pos: newPos
    }));
  };

  const handleManualZoomChange = (value) => {
    const newZoom = Math.max(10, Math.min(500, parseInt(value) || 100));
    setEvent(prev => ({
      ...prev,
      zoom: `${newZoom}%`
    }));
  };

  const convertTime = (time) => {
    if (!time) return null;
    return dayjs.utc(time);
  };

  const previewEvent = {
    ...event,
    start: convertTime(event.start),
    end: event.noEnd ? null : convertTime(event.end),
    duration: 1,
    offset: 0
  };

  const [x, y] = event.pos.split(' ').map(val => parseInt(val));
  const zoom = parseInt(event.zoom);

  return (
    <div className="space-y-6">
      {/* Image and Color */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <FiImage />
            Image
            <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full px-3 py-2 rounded-lg bg-background border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            value={event.image}
            onChange={e => setEvent(prev => ({ ...prev, image: e.target.value }))}
          >
            <option value="">Select an image</option>
            {availableImages.map(image => (
              <option key={image} value={image}>{image}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Color</label>
          <input
            type="color"
            className="w-full h-10 px-1 rounded-lg bg-background border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            value={event.color}
            onChange={e => setEvent(prev => ({ ...prev, color: e.target.value }))}
          />
        </div>
      </div>

      {/* Position and Zoom Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <FiMove />
            X Position
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              className="w-full px-3 py-2 rounded-lg bg-background border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              value={x}
              onChange={e => handleManualPositionChange('x', e.target.value)}
              min="-500"
              max="500"
            />
            <span className="text-sm text-gray-400">%</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <FiMove />
            Y Position
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              className="w-full px-3 py-2 rounded-lg bg-background border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              value={y}
              onChange={e => handleManualPositionChange('y', e.target.value)}
              min="-500"
              max="500"
            />
            <span className="text-sm text-gray-400">%</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <FiZoomIn />
            Zoom
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              className="w-full px-3 py-2 rounded-lg bg-background border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              value={zoom}
              onChange={e => handleManualZoomChange(e.target.value)}
              min="10"
              max="500"
              step="2"
            />
            <span className="text-sm text-gray-400">%</span>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Preview</label>
        <div className="space-y-4">
          {/* Image Preview */}
          <div 
            ref={previewRef}
            className="relative h-[200px] rounded-lg overflow-hidden bg-black cursor-move"
            onMouseDown={handleDragStart}
            onMouseMove={handleDrag}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onWheel={handleZoom}
            style={{
              backgroundImage: event.image ? `url(/images/events/${event.image})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div 
              className="absolute inset-0"
              style={{
                transform: `translate(${x}%, ${y}%) scale(${zoom / 100})`,
                transformOrigin: 'center'
              }}
            />
          </div>

          {/* Timeline Preview */}
          <div className="bg-background rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-2">Timeline Preview</div>
            <div className="relative h-[60px] bg-black/20 rounded overflow-hidden">
              <TimelineEvent 
                event={previewEvent}
                dayWidth={300}
                marginTop={0}
                eventHeight={40}
                eventMargin={10}
                index={0}
                now={dayjs.utc()}
                onOpenDetail={() => {}}
                convertTime={convertTime}
              />
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-400">
          Drag to adjust position, scroll to zoom, or use the controls above
        </p>
      </div>
    </div>
  );
};

PreviewStyleTab.propTypes = {
  event: PropTypes.object.isRequired,
  setEvent: PropTypes.func.isRequired,
  availableImages: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default PreviewStyleTab; 