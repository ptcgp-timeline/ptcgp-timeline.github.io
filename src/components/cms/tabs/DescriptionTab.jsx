import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const REQUIRED_LANGUAGES = ['en'];
const ALL_LANGUAGES = ['en', 'ja', 'ko', 'zh', 'fr', 'de', 'es', 'it', 'pt'];

const DescriptionTab = ({ event, setEvent }) => {
  const [selectedLang, setSelectedLang] = useState(null);

    useEffect(() => {
    if (!event.description) {
      setEvent(prev => ({
        ...prev,
        description: {}
      }));
    }
  }, [event, setEvent]); 

  const handleDescriptionChange = (lang, value) => {
    setEvent(prev => ({
      ...prev,
      description: {
        ...(prev.description || {}),
        [lang]: value || '' 
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-700 -mx-6 px-6">
        <div className="flex space-x-4">
          <button
            className={`py-2 px-4 border-b-2 transition-colors ${
              !selectedLang ? 'border-primary text-primary' : 'border-transparent hover:border-gray-600'
            }`}
            onClick={() => setSelectedLang(null)}
          >
            All
          </button>
          {ALL_LANGUAGES.map(lang => (
            <button
              key={lang}
              className={`py-2 px-4 border-b-2 transition-colors ${
                selectedLang === lang ? 'border-primary text-primary' : 'border-transparent hover:border-gray-600'
              }`}
              onClick={() => setSelectedLang(lang)}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      {(selectedLang ? [selectedLang] : ALL_LANGUAGES).map(lang => (
        <div key={lang} className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            Description ({lang})
            {REQUIRED_LANGUAGES.includes(lang) && <span className="text-red-500">*</span>}
          </label>
          <textarea
            placeholder={`Enter description in ${lang.toUpperCase()}`}
            className="w-full px-3 py-2 rounded-lg bg-background border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none min-h-[200px] resize-y"
            value={event.description?.[lang] || ''}
            onChange={e => handleDescriptionChange(lang, e.target.value)}
            rows={8}
          />
        </div>
      ))}
    </div>
  );
};

DescriptionTab.propTypes = {
  event: PropTypes.object.isRequired,
  setEvent: PropTypes.func.isRequired
};

export default DescriptionTab; 