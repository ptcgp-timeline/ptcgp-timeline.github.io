import { useState } from 'react';
import PropTypes from 'prop-types';
import TimelineEvent from '../../../components/Timeline/TimelineEvent';
import ImagePositioner from './ImagePositioner';
import LanguageValidator from './LanguageValidator';
import { SUPPORTED_LANGUAGES } from '../../../constants';
import dayjs from 'dayjs';

const EventEditor = () => {
  const [event, setEvent] = useState({
    name: { en: '' },
    pos: '50% 50%',
    zoom: '200%',
    image: '',
    start: dayjs().format('YYYY-MM-DDTHH:mm'),
    end: dayjs().add(1, 'day').format('YYYY-MM-DDTHH:mm'),
    color: '#000000',
    urls: { en: [] },
    showOnHome: true
  });

  const [validation, setValidation] = useState({
    missingLanguages: [],
    missingUrls: [],
    imageExists: false
  });

  // Preview section with actual TimelineEvent component
  const PreviewSection = () => {
    const previewEvent = {
      ...event,
      duration: 5, // Default for preview
      offset: 0,   // Default for preview
      start: dayjs(event.start),
      end: dayjs(event.end)
    };

    return (
      <div className="border-2 border-gray-700 rounded-xl p-4">
        <h2 className="text-xl font-bold mb-4">Preview</h2>
        <TimelineEvent
          event={previewEvent}
          dayWidth={40}
          marginTop={0}
          eventHeight={42}
          eventMargin={20}
          index={0}
          now={dayjs()}
          onOpenDetail={() => {}}
          convertTime={(time) => dayjs(time)}
        />
      </div>
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Event Editor</h1>
      
      {/* Basic Info */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Basic Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Start Date</label>
            <input
              type="datetime-local"
              value={event.start}
              onChange={(e) => setEvent({ ...event, start: e.target.value })}
              className="w-full p-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-2">End Date</label>
            <input
              type="datetime-local"
              value={event.end}
              onChange={(e) => setEvent({ ...event, end: e.target.value })}
              className="w-full p-2 rounded"
            />
          </div>
        </div>
      </section>

      {/* Translations */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Translations</h2>
        {SUPPORTED_LANGUAGES.map(lang => (
          <div key={lang} className="mb-4">
            <label className="block mb-2">{lang.toUpperCase()} Name</label>
            <input
              value={event.name[lang] || ''}
              onChange={(e) => setEvent({
                ...event,
                name: { ...event.name, [lang]: e.target.value }
              })}
              className="w-full p-2 rounded"
            />
          </div>
        ))}
      </section>

      {/* Image Positioner */}
      <ImagePositioner
        image={event.image}
        pos={event.pos}
        zoom={event.zoom}
        onUpdate={(updates) => setEvent({ ...event, ...updates })}
      />

      {/* Validation Warnings */}
      <LanguageValidator event={event} />

      {/* Preview */}
      <PreviewSection />

      {/* Save Button */}
      <button
        onClick={async () => {
          const response = await fetch('/api/dev/save-event', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
          });
          if (response.ok) {
            alert('Event saved successfully!');
          }
        }}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Save Event
      </button>
    </div>
  );
};

ImagePositioner.propTypes = {
  image: PropTypes.string.isRequired,
  pos: PropTypes.string.isRequired,
  zoom: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default EventEditor; 