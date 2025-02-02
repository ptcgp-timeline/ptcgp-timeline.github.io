import { FiCalendar } from 'react-icons/fi';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

const REQUIRED_LANGUAGES = ['en'];
const ALL_LANGUAGES = ['en', 'ja', 'ko', 'zh', 'fr', 'de', 'es', 'it', 'pt'];
const OTHER_LANGUAGES = ALL_LANGUAGES.filter(lang => lang !== 'en');

const BasicInfoTab = ({ event, setEvent }) => {
  return (
    <div className="space-y-6">
      {/* English Name (Full Width) */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Name (en)
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 rounded-lg bg-background border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          value={event.name.en || ''}
          onChange={e => setEvent(prev => ({
            ...prev,
            name: { ...prev.name, en: e.target.value }
          }))}
        />
      </div>

      {/* Other Languages (Two Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {OTHER_LANGUAGES.map(lang => (
          <div key={lang} className="space-y-2">
            <label className="text-sm font-medium">
              Name ({lang})
              {REQUIRED_LANGUAGES.includes(lang) && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-lg bg-background border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              value={event.name[lang] || ''}
              onChange={e => setEvent(prev => ({
                ...prev,
                name: { ...prev.name, [lang]: e.target.value }
              }))}
            />
          </div>
        ))}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <FiCalendar />
            Start Date
            <span className="text-red-500">*</span>
          </label>
          <input
            type="datetime-local"
            className="w-full px-3 py-2 rounded-lg bg-background border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            value={dayjs(event.start).format('YYYY-MM-DDTHH:mm')}
            onChange={e => setEvent(prev => ({
              ...prev,
              start: dayjs(e.target.value).format('YYYY-MM-DD HH:mm:ss')
            }))}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <FiCalendar />
            End Date
          </label>
          <input
            type="datetime-local"
            className="w-full px-3 py-2 rounded-lg bg-background border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            value={dayjs(event.end).format('YYYY-MM-DDTHH:mm')}
            onChange={e => setEvent(prev => ({
              ...prev,
              end: dayjs(e.target.value).format('YYYY-MM-DD HH:mm:ss')
            }))}
            disabled={event.noEnd}
          />
        </div>
      </div>

      {/* Options */}
      <div className="flex items-center gap-4 flex-wrap">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="rounded bg-background border-gray-700 text-primary focus:ring-primary"
            checked={event.showOnHome}
            onChange={e => setEvent(prev => ({ ...prev, showOnHome: e.target.checked }))}
          />
          Show on home page
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="rounded bg-background border-gray-700 text-primary focus:ring-primary"
            checked={event.noEnd}
            onChange={e => setEvent(prev => ({ ...prev, noEnd: e.target.checked }))}
          />
          No end date
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="rounded bg-background border-gray-700 text-primary focus:ring-primary"
            checked={event.uncertain}
            onChange={e => setEvent(prev => ({ ...prev, uncertain: e.target.checked }))}
          />
          Uncertain dates
        </label>
      </div>
    </div>
  );
};

BasicInfoTab.propTypes = {
  event: PropTypes.object.isRequired,
  setEvent: PropTypes.func.isRequired
};

export default BasicInfoTab; 