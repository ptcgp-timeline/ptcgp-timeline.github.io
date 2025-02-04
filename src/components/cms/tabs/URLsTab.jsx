import { useState } from 'react';
import PropTypes from 'prop-types';

const REQUIRED_LANGUAGES = ['en'];
const ALL_LANGUAGES = ['en', 'ja', 'ko', 'zh', 'fr', 'de', 'es', 'it', 'pt'];

const URLsTab = ({ event, setEvent }) => {
  const [selectedLang, setSelectedLang] = useState(null);

  const handleUrlChange = (lang, value) => {
    // Split by newlines and clean up empty lines
    const urls = value
      .split('\n')
      .map(url => url.trim())
      .filter(url => url !== '');

    if (urls.length > 0) {
      setEvent(prev => ({
        ...prev,
        urls: { ...prev.urls, [lang]: urls }
      }));
    } else {
      setEvent(prev => {
        const newUrls = { ...prev.urls };
        delete newUrls[lang];
        return { ...prev, urls: newUrls };
      });
    }
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
            URLs ({lang})
            {REQUIRED_LANGUAGES.includes(lang) && <span className="text-red-500">*</span>}
          </label>
          <textarea
            placeholder="One URL per line"
            className="w-full px-3 py-2 rounded-lg bg-background border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none min-h-[120px] resize-y font-mono text-sm"
            value={(event.urls?.[lang] || []).join('\n')}
            onChange={e => handleUrlChange(lang, e.target.value)}
            rows={5}
            wrap="soft"
          />
        </div>
      ))}
    </div>
  );
};

URLsTab.propTypes = {
  event: PropTypes.object.isRequired,
  setEvent: PropTypes.func.isRequired
};

export default URLsTab; 