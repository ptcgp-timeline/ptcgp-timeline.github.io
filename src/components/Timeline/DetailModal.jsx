import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import PropTypes from 'prop-types';
import { useLanguage } from '../../context/useLanguage';
import { getDomainAndFavicon } from '../../utils/urlUtils';
import { useState, useEffect } from 'react';
import Watermark from '../Watermark';
//import Comments from '../Comments';
import { gameConfig } from '../../data/timeline';

import { useTranslation } from 'react-i18next';

dayjs.extend(duration);

const DetailModal = ({ event, onClose, showLocalTime, convertTime, now }) => {
  const { language } = useLanguage();
  const { t, i18n } = useTranslation();
  const [eventStart, setEventStart] = useState(convertTime(event.start));
  const [eventEnd, setEventEnd] = useState(convertTime(event.end));
  //const [showComments, setShowComments] = useState(false);
  const [showUrls, setShowUrls] = useState(true);

  useEffect(() => {
    setEventStart(convertTime(event.start));
    setEventEnd(convertTime(event.end));
  }, [showLocalTime, event.start, event.end, convertTime]);

  useEffect(() => {
    dayjs.locale(i18n.language);
  }, [i18n.language]);

  const eventName = event.name[language] || event.name['en'];
  if (!event.name[language] && !event.name['en']) {
    return null;
  }

  const eventDescription = event.description?.[language] || event.description?.['en'];
  
  const urls = event.urls?.[language] || [];
  const officialUrls = urls.filter(url => 
    gameConfig.officialDomains.some(domain => url.includes(domain))
  );
  const communityUrls = urls.filter(url => 
    !gameConfig.officialDomains.some(domain => url.includes(domain))
  );

  const started = now.isAfter(eventStart);
  const ended = now.isAfter(eventEnd);
  const diffStart = eventStart.diff(now);
  const diffEnd = eventEnd.diff(now);

  const showUncertainty = event.uncertain || event.description?.[language]?.includes('subject to change');

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div 
        className="bg-background-secondary p-6 rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto scrollbar-custom shadow-lg border border-gray-700"
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
        
        <h1 className="text-white font-display font-semibold text-xl mb-2">
          {eventName}
        </h1>
        
        <div className="space-y-2">
          <p className="text-gray-200 font-body flex flex-col md:flex-row">
            <span className="flex group relative">
              <span>
                {eventStart.format('ddd, D MMM YYYY HH:mm')}
                {showUncertainty && (
                  <sup className="text-primary text-base ml-0.5 font-bold">*</sup>
                )}
              </span>
              {showUncertainty && (
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-3 py-1.5 text-sm bg-item border border-gray-600 text-gray-200 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                  {t('dateTime.uncertaintyMessage')}
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
                <span className="text-gray-300">
                  {t('status.noEndDate')}
                  <sup className="text-primary text-base ml-0.5 font-bold">*</sup>
                </span>
              )}
              {(showUncertainty || event.noEnd) && (
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-3 py-1.5 text-sm bg-item border border-gray-600 text-gray-200 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                  {t('dateTime.uncertaintyMessage')}
                </span>
              )}
            </span>
          </p>
        </div>

        {/* Description Section */}
        {eventDescription && (
          <p className="text-gray-200 mt-4">
            {eventDescription}
          </p>
        )}

        {/* Timer Section */}
        <p className="text-sm font-medium px-3 py-1.5 bg-background rounded-lg mt-4 inline-flex items-center gap-2 shadow-lg border border-gray-700">
          {!started ? (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-status-starting-dot animate-pulse"></span>
              <span className="text-status-starting-text">{t('status.startingIn')}</span>{' '}
              <span className="font-mono text-gray-200 text-xs">
                {`${diffStart > 86400000 ? `${Math.trunc(dayjs.duration(diffStart).asDays())}d` : ''} ${
                  dayjs.duration(diffStart).format('HH:mm:ss')
                }`}
              </span>
            </>
          ) : started && !ended && !event.startOnly && !event.noEnd ? (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-status-ending-dot animate-pulse"></span>
              <span className="text-status-ending-text">{t('status.endingIn')}</span>{' '}
              <span className="font-mono text-gray-200 text-xs">
                {`${diffEnd > 86400000 ? `${Math.trunc(dayjs.duration(diffEnd).asDays())}d` : ''} ${
                  dayjs.duration(diffEnd).format('HH:mm:ss')
                }`}
              </span>
            </>
          ) : event.startOnly || event.noEnd ? (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-status-live-dot animate-pulse"></span>
              <span className="text-status-live-text font-medium">{t('status.live')}</span>
            </>
          ) : (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-status-ended-dot"></span>
              <span className="text-status-ended-text">{t('status.finished')}</span>
            </>
          )}
        </p>

        {/* Show uncertainty message only if language is supported */}
        {showUncertainty && event.name[language] && (
          <p className="text-gray-300 mt-2">
            {t('dateTime.uncertaintyMessage')}
          </p>
        )}

        {/* External Links Section */}
        <div className="mt-6">
          <button
            onClick={() => setShowUrls(!showUrls)}
            className="w-full flex items-center justify-between px-3.5 py-2.5 bg-button hover:bg-button/80 rounded-xl transition-colors"
          >
            <span className="text-gray-200 font-medium">
              {t('common.externalLinks.title')}
            </span>
            <svg 
              className={`w-4 h-4 text-gray-300 transition-transform ${showUrls ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showUrls && (
            <div className="mt-2 space-y-2 px-2 max-h-[200px] overflow-y-auto scrollbar-custom">
              {officialUrls.length === 0 && communityUrls.length === 0 ? (
                <p className="text-gray-300 text-sm italic bg-item px-3.5 py-2.5 rounded-xl">
                  {t('common.externalLinks.none')}
                </p>
              ) : (
                <>
                  {/* Official Links */}
                  {officialUrls.length > 0 && officialUrls.map((url, index) => {
                    const { favicon } = getDomainAndFavicon(url);
                    return (
                      <a 
                        key={index}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-button hover:bg-button/80 transition-all duration-200 group border border-gray-600"
                        target="_blank" 
                        href={`${url}${url.includes('?') ? '&' : '?'}utm_source=ptcgp-timeline`}
                        rel="noopener noreferrer"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-md bg-background/50 p-1 flex items-center justify-center">
                            <img 
                              src={favicon}
                              alt=""
                              className="w-full h-full object-contain rounded"
                              aria-hidden="true"
                            />
                          </div>
                          <span className="text-white font-bold text-sm">
                            {gameConfig.officialWebsiteText[language] || gameConfig.officialWebsiteText['en']}
                          </span>
                        </div>
                        <svg 
                          className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors" 
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

                  {/* Community Links */}
                  {communityUrls.length > 0 && (
                    <div className={`grid gap-2 ${communityUrls.length === 2 ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'}`}>
                      {communityUrls.map((url, index) => {
                        const { domain, favicon } = getDomainAndFavicon(url);
                        const urlWithUTM = `${url}${url.includes('?') ? '&' : '?'}utm_source=ptcgp-timeline`;
                        return (
                          <a 
                            key={index}
                            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/5 hover:bg-primary/10 transition-all duration-200 group border border-primary/20"
                            target="_blank" 
                            href={urlWithUTM}
                            rel="noopener noreferrer"
                          >
                            <div className="w-5 h-5 rounded-md bg-background/50 p-1 flex items-center justify-center shrink-0">
                              <img 
                                src={favicon} 
                                alt=""
                                className="w-full h-full object-contain rounded"
                                aria-hidden="true"
                              />
                            </div>
                            <span className="text-gray-200 group-hover:text-white transition-colors text-sm font-medium truncate">
                              {domain}
                            </span>
                            <svg 
                              className="w-4 h-4 text-primary/80 group-hover:text-primary transition-colors ml-auto shrink-0" 
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
                  )}
                </>
              )}
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
    urls: PropTypes.objectOf(PropTypes.shape({
      official: PropTypes.objectOf(PropTypes.string),
      community: PropTypes.arrayOf(PropTypes.string)
    })),
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