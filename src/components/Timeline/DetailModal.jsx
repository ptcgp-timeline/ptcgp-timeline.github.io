import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import PropTypes from 'prop-types';
import { useLanguage } from '../../context/LanguageContext';
import { getDomainAndFavicon } from '../../utils/urlUtils';
import { useState, useEffect } from 'react';

dayjs.extend(duration);

const DetailModal = ({ event, onClose, showLocalTime, convertTime, now }) => {
  const { language } = useLanguage();
  const [eventStart, setEventStart] = useState(convertTime(event.start));
  const [eventEnd, setEventEnd] = useState(convertTime(event.end));

  useEffect(() => {
    setEventStart(convertTime(event.start));
    setEventEnd(convertTime(event.end));
  }, [showLocalTime, event.start, event.end, convertTime]);

  const eventName = event.name[language] || event.name['en'];
  const eventDescription = event.description?.[language] || event.description?.['en'];
  
  const languageUrls = event.urls?.[language] || null;
  const urls = languageUrls || (event.url ? [event.url] : []);

  const started = now.isAfter(eventStart);
  const ended = now.isAfter(eventEnd);
  const diffStart = eventStart.diff(now);
  const diffEnd = eventEnd.diff(now);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div 
        className="bg-background-secondary p-6 rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {event.image && (
          <img 
            src={`/ptcgp-timeline/images/events/${event.image}`} 
            className="w-full rounded-lg mb-4" 
            alt={eventName} 
          />
        )}
        
        <h1 className="text-white font-display font-semibold text-xl">
          {eventName}
        </h1>
        
        <p className="text-gray-400 font-body flex flex-col md:flex-row">
          <span className="flex">
            <span>{eventStart.format('ddd, D MMM YYYY HH:mm')}</span>
            <span className="mx-2">-</span>
          </span>
          {!event.noEnd ? (
            <span>{eventEnd.format('ddd, D MMM YYYY HH:mm')}</span>
          ) : (
            <span>No End Date*</span>
          )}
        </p>

        <div className="mb-4">
          {urls.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {urls.map((url, index) => {
                const { domain, favicon } = getDomainAndFavicon(url);
                const urlWithUTM = `${url}${url.includes('?') ? '&' : '?'}utm_source=ptcgp-timeline`;
                return (
                  <a 
                    key={index}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-item hover:bg-button transition-colors group"
                    target="_blank" 
                    href={urlWithUTM}
                    rel="noopener noreferrer"
                    aria-label={`Visit ${domain} for more information about ${eventName}`}
                  >
                    <img 
                      src={favicon} 
                      alt=""
                      className="w-4 h-4 rounded-sm"
                      aria-hidden="true"
                    />
                    <span className="text-gray-400 group-hover:text-white text-sm">
                      {domain}
                    </span>
                    <svg 
                      className="w-4 h-4 text-gray-400 group-hover:text-white" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                      />
                    </svg>
                  </a>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-400 text-sm italic bg-item px-3 py-2 rounded-lg">
              No external links available at the moment
            </p>
          )}
        </div>

        {eventDescription && (
          <p className="my-2 overflow-auto mt-4 text-gray-200">
            {eventDescription}
          </p>
        )}

        <p className="text-gray-400 px-4 py-1 bg-black bg-opacity-50 rounded-xl mt-2 inline-block">
          {!started ? (
            <>
              Starting in{' '}
              {`${diffStart > 86400000 ? `${Math.trunc(dayjs.duration(diffStart).asDays())}d` : ''} ${
                dayjs.duration(diffStart).format('HH:mm:ss')
              }`}
            </>
          ) : started && !ended && !event.startOnly && !event.noEnd ? (
            <>
              Ending in{' '}
              {`${diffEnd > 86400000 ? `${Math.trunc(dayjs.duration(diffEnd).asDays())}d` : ''} ${
                dayjs.duration(diffEnd).format('HH:mm:ss')
              }`}
            </>
          ) : event.startOnly || event.noEnd ? (
            'Live'
          ) : (
            'Finished'
          )}
        </p>
      </div>
    </div>
  );
};

DetailModal.propTypes = {
  event: PropTypes.shape({
    name: PropTypes.objectOf(PropTypes.string).isRequired,
    description: PropTypes.objectOf(PropTypes.string),
    urls: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
    url: PropTypes.string,
    image: PropTypes.string,
    start: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]).isRequired,
    end: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]).isRequired,
    startOnly: PropTypes.bool,
    noEnd: PropTypes.bool,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  showLocalTime: PropTypes.bool.isRequired,
  convertTime: PropTypes.func.isRequired,
  now: PropTypes.object.isRequired,
};

export default DetailModal; 