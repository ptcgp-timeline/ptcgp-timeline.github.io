import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import PropTypes from 'prop-types';
import { useLanguage } from '../../context/LanguageContext';
import { getDomainAndFavicon } from '../../utils/urlUtils';
import { useState, useEffect } from 'react';
import Watermark from '../Watermark';
import Comments from '../Comments';

dayjs.extend(duration);

const DetailModal = ({ event, onClose, showLocalTime, convertTime, now }) => {
  const { language } = useLanguage();
  const [eventStart, setEventStart] = useState(convertTime(event.start));
  const [eventEnd, setEventEnd] = useState(convertTime(event.end));
  const [showComments, setShowComments] = useState(false);

  const uncertaintyMessage = {
    en: "Date and time subject to change",
    zh: "日期和時間可能會更改",
    ja: "日時は変更される可能性があります",
    ko: "날짜와 시간은 변경될 수 있습니다",
    fr: "Date et heure sujettes à modification",
    de: "Datum und Uhrzeit können sich ändern",
    es: "Fecha y hora sujetas a cambios",
    it: "Data e ora soggette a modifiche",
    pt: "Data e hora sujeitas a alterações"
  };

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

  const showUncertainty = event.uncertain || event.description?.[language]?.includes('subject to change');

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div 
        className="relative bg-background-secondary p-6 rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {event.image && (
          <div className="relative mb-4">
            <img 
              src={`/images/events/${event.image}`} 
              className="w-full rounded-lg" 
              alt={eventName} 
            />
            <div className="bottom-0 right-0 p-0">
              <Watermark />
            </div>
          </div>
        )}
        
        <h1 className="text-white font-display font-semibold text-xl">
          {eventName}
        </h1>
        
        <div className="space-y-2">
          <p className="text-gray-400 font-body flex flex-col md:flex-row">
            <span className="flex group relative">
              <span>
                {eventStart.format('ddd, D MMM YYYY HH:mm')}
                {showUncertainty && (
                  <sup className="text-primary text-base ml-0.5 font-bold">*</sup>
                )}
              </span>
              {showUncertainty && (
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-3 py-1.5 text-sm bg-item border border-button text-gray-300 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">
                  {uncertaintyMessage[language] || uncertaintyMessage.en}
                </span>
              )}
              <span className="mx-2">-</span>
            </span>
            <span className="group relative">
              {!event.noEnd ? (
                <span>
                  {eventEnd.format('ddd, D MMM YYYY HH:mm')}
                  {(showUncertainty || event.noEnd) && (
                    <sup className="text-primary text-base ml-0.5 font-bold">*</sup>
                  )}
                </span>
              ) : (
                <span className="text-gray-400">
                  No End Date
                  <sup className="text-primary text-base ml-0.5 font-bold">*</sup>
                </span>
              )}
              {(showUncertainty || event.noEnd) && (
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-3 py-1.5 text-sm bg-item border border-button text-gray-300 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">
                  {uncertaintyMessage[language] || uncertaintyMessage.en}
                </span>
              )}
            </span>
          </p>
        </div>

        <div className="mb-4">
          {urls.length > 0 ? (
            <div className="flex flex-wrap items-start gap-2">
              {urls.map((url, index) => {
                const { domain, favicon } = getDomainAndFavicon(url);
                const urlWithUTM = `${url}${url.includes('?') ? '&' : '?'}utm_source=ptcgp-timeline`;
                return (
                  <a 
                    key={index}
                    className="inline-flex items-center shrink-0 gap-2 px-3 py-2 rounded-xl bg-button hover:bg-button/80 transition-all duration-200 group shadow-sm hover:shadow-md active:scale-95"
                    target="_blank" 
                    href={urlWithUTM}
                    rel="noopener noreferrer"
                    aria-label={`Visit ${domain} for more information about ${eventName}`}
                  >
                    <div className="w-5 h-5 rounded-md bg-background/50 p-0.5 flex items-center justify-center">
                      <img 
                        src={favicon} 
                        alt=""
                        className="w-full h-full object-contain rounded"
                        aria-hidden="true"
                      />
                    </div>
                    <span className="text-gray-300 group-hover:text-white transition-colors text-sm font-medium">
                      {domain.split('.')[0]}
                    </span>
                    <svg 
                      className="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-colors" 
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

        <div className="mt-4">
          <button
            onClick={() => setShowComments(!showComments)}
            className="w-full flex items-center justify-between px-4 py-2 bg-button hover:bg-button/80 rounded-xl transition-colors"
          >
            <span className="text-gray-300 font-medium">Comments</span>
            <svg 
              className={`w-5 h-5 text-gray-400 transition-transform ${showComments ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {showComments && (
            <div className="mt-4">
              <Comments 
                identifier={`event-${event.start}-${event.end}`}
                title={eventName}
                url={window.location.href}
              />
            </div>
          )}
        </div>
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
    uncertain: PropTypes.bool,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  showLocalTime: PropTypes.bool.isRequired,
  convertTime: PropTypes.func.isRequired,
  now: PropTypes.object.isRequired,
};

export default DetailModal; 