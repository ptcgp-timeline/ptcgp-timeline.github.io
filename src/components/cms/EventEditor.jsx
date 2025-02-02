import { useState, useEffect } from 'react';
import { FiCheck, FiAlertCircle, FiLink, FiFileText, FiCode } from 'react-icons/fi';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import BasicInfoTab from './tabs/BasicInfoTab';
import PreviewStyleTab from './tabs/PreviewStyleTab';
import URLsTab from './tabs/URLsTab';
import DescriptionTab from './tabs/DescriptionTab';
import JSONEditorTab from './tabs/JSONEditorTab';

dayjs.extend(utc);

const eventFiles = import.meta.glob('../../data/**/*.json', { eager: true });
const imageFiles = import.meta.glob('/public/images/events/*', { eager: true });

const EventEditor = ({ targetFolder = '', eventId = null }) => {
  const [event, setEvent] = useState({
    name: {},
    pos: "50% 50%",  // Centered by default
    zoom: "100%",
    image: "",
    start: dayjs.utc().format('YYYY-MM-DD HH:mm:ss'),
    end: dayjs.utc().add(14, 'days').format('YYYY-MM-DD HH:mm:ss'),
    color: "#000000",
    urls: {},
    showOnHome: true,
    description: {},
    noEnd: false,
    uncertain: false
  });
  const [availableImages, setAvailableImages] = useState([]);
  const [activeTab, setActiveTab] = useState('basic');
  const [saveMessage, setSaveMessage] = useState(null);

  useEffect(() => {
    // Getting available images from public directory
    const images = Object.keys(imageFiles).map(path => path.split('/').pop());
    setAvailableImages(images);

    // Load event data if editing
    if (eventId) {
      const eventPath = Object.keys(eventFiles).find(path => path.includes(eventId));
      if (eventPath) {
        const eventData = eventFiles[eventPath].default || eventFiles[eventPath];
        setEvent(eventData);
        
        // Extract folder from path
        const folder = eventPath.split('/')[2]; 
        if (folder) {
          // Update parent component's folder selection if no target folder is provided
          if (!targetFolder) {
            window.dispatchEvent(new CustomEvent('selectFolder', { detail: folder }));
          }
        }
      }
    }
  }, [eventId, targetFolder]);

  // Add useEffect to handle auto-dismiss
  useEffect(() => {
    if (saveMessage) {
      const timer = setTimeout(() => {
        setSaveMessage(null);
      }, saveMessage.type === 'error' ? 5000 : 3000); // 5s for errors, 3s for success

      return () => clearTimeout(timer);
    }
  }, [saveMessage]);

  const handleSave = async () => {
    try {
      // Validate required fields
      const issues = validateEvent();
      if (issues.length > 0) {
        setSaveMessage({
          type: 'error',
          text: 'Please fix validation issues before saving',
          details: issues
        });
        return;
      }

      let filePath;
      let isEditing = false;

      if (eventId) {
        // If editing, use the existing file path
        const existingPath = Object.keys(eventFiles).find(path => path.includes(eventId));
        if (!existingPath) {
          throw new Error('Could not find original file path');
        }
        filePath = existingPath;
        isEditing = true;
      }

      const response = await fetch('/api/dev/save-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event,
          filePath,
          isEditing,
          targetFolder: !isEditing ? targetFolder : undefined
        })
      });

      const data = await response.text();
      let result;
      try {
        result = JSON.parse(data);
      } catch (e) {
        console.error('Failed to parse response:', data);
        setSaveMessage({
          type: 'error',
          text: 'Invalid response from server'
        });
        return;
      }

      if (!response.ok) {
        setSaveMessage({
          type: 'error',
          text: result.error || 'Failed to save event'
        });
        return;
      }

      setSaveMessage({
        type: 'success',
        text: result.message || 'Event saved successfully!'
      });

      // Only reload if creating a new event
      if (!isEditing) {
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      console.error('Failed to save event:', error);
      setSaveMessage({
        type: 'error',
        text: 'Failed to save event',
        details: [error.message || 'Unknown error occurred']
      });
    }
  };

  const validateEvent = () => {
    const issues = [];
    
    // English name is required
    if (!event.name.en) {
      issues.push('English name is required');
    }

    // Image is required
    if (!event.image) {
      issues.push('Image is required');
    }

    // Start date is required
    if (!event.start) {
      issues.push('Start date is required');
    }

    // End date validation
    if (!event.noEnd && event.end) {
      if (dayjs(event.end).isBefore(dayjs(event.start))) {
        issues.push('End date cannot be before start date');
      }
    }

    return issues;
  };

  const getCompletionStatus = () => {
    const total = 3; // en name + image + dates
    let completed = 0;

    // Check English name
    if (event.name.en) completed++;
    // Check image
    if (event.image) completed++;
    // Check dates
    if (event.start && (event.noEnd || event.end)) completed++;

    return {
      completed,
      total,
      percentage: Math.round((completed / total) * 100)
    };
  };

  const completion = getCompletionStatus();
  const issues = validateEvent();

  return (
    <div className="bg-item rounded-xl">
      {/* Tabs */}
      <div className="border-b border-gray-700 px-6">
        <div className="flex space-x-6">
          <button
            className={`py-4 px-2 border-b-2 transition-colors ${
              activeTab === 'basic' 
                ? 'border-primary text-primary' 
                : 'border-transparent hover:border-gray-600'
            }`}
            onClick={() => setActiveTab('basic')}
          >
            Basic Info
          </button>
          <button
            className={`py-4 px-2 border-b-2 transition-colors ${
              activeTab === 'preview' 
                ? 'border-primary text-primary' 
                : 'border-transparent hover:border-gray-600'
            }`}
            onClick={() => setActiveTab('preview')}
          >
            Preview & Style
          </button>
          <button
            className={`py-4 px-2 border-b-2 transition-colors ${
              activeTab === 'urls' 
                ? 'border-primary text-primary' 
                : 'border-transparent hover:border-gray-600'
            }`}
            onClick={() => setActiveTab('urls')}
          >
            <div className="flex items-center gap-2">
              <FiLink />
              URLs
            </div>
          </button>
          <button
            className={`py-4 px-2 border-b-2 transition-colors ${
              activeTab === 'description' 
                ? 'border-primary text-primary' 
                : 'border-transparent hover:border-gray-600'
            }`}
            onClick={() => setActiveTab('description')}
          >
            <div className="flex items-center gap-2">
              <FiFileText />
              Description
            </div>
          </button>
          <button
            className={`py-4 px-2 border-b-2 transition-colors ${
              activeTab === 'json' 
                ? 'border-primary text-primary' 
                : 'border-transparent hover:border-gray-600'
            }`}
            onClick={() => setActiveTab('json')}
          >
            <div className="flex items-center gap-2">
              <FiCode />
              JSON
            </div>
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Save Message with animation */}
        {saveMessage && (
          <div 
            className={`mb-4 p-4 rounded-lg flex items-start gap-3 transition-all duration-300 animate-fade-in ${
              saveMessage.type === 'error' 
                ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                : 'bg-green-500/10 text-green-400 border border-green-500/20'
            }`}
          >
            {saveMessage.type === 'error' ? (
              <FiAlertCircle className="mt-0.5" />
            ) : (
              <FiCheck className="mt-0.5" />
            )}
            <div>
              <p className="font-medium">{saveMessage.text}</p>
              {saveMessage.details && (
                <ul className="mt-2 text-sm list-disc pl-4">
                  {saveMessage.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {/* Tab Content */}
        {activeTab === 'basic' && (
          <BasicInfoTab event={event} setEvent={setEvent} />
        )}

        {activeTab === 'preview' && (
          <PreviewStyleTab 
            event={event} 
            setEvent={setEvent} 
            availableImages={availableImages} 
          />
        )}

        {activeTab === 'urls' && (
          <URLsTab event={event} setEvent={setEvent} />
        )}

        {activeTab === 'description' && (
          <DescriptionTab event={event} setEvent={setEvent} />
        )}

        {activeTab === 'json' && (
          <JSONEditorTab 
            event={event} 
            setEvent={setEvent} 
            onSave={handleSave} 
          />
        )}

        {/* Save Button */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-32 h-2 bg-background rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${completion.percentage}%` }}
              />
            </div>
            <span className="text-sm text-gray-400">
              {completion.completed}/{completion.total} required fields
            </span>
          </div>

          <button
            onClick={handleSave}
            disabled={issues.length > 0}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
              issues.length > 0 ? 'bg-gray-500 cursor-not-allowed' : 'bg-primary hover:bg-primary/80'
            }`}
          >
            <FiCheck />
            Save Event
          </button>
        </div>
      </div>
    </div>
  );
};

EventEditor.propTypes = {
  targetFolder: PropTypes.string,
  eventId: PropTypes.string
};

export default EventEditor; 