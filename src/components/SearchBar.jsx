import { useState, useRef, useMemo, useEffect } from 'react';
import { useLanguage } from '../context/useLanguage';
import { useTranslation } from 'react-i18next';
import { FaSearch, FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import duration from 'dayjs/plugin/duration';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);

const SearchBar = ({ events = [], onEventSelect, showLocalTime, isMobile = false, isSearchOpen = false }) => {
  const { t, i18n } = useTranslation();
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const [userTimezone] = useState(dayjs.tz.guess());

  useEffect(() => {
    dayjs.locale(i18n.language);
  }, [i18n.language]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMobile || isSearchOpen) {
      inputRef.current?.focus();
    }
  }, [isMobile, isSearchOpen]);

  const convertTime = useMemo(() => {
    return (time) => {
      if (!time) return null;
      const utcTime = dayjs.utc(time);
      return showLocalTime ? utcTime.tz(userTimezone) : utcTime;
    };
  }, [showLocalTime, userTimezone]);

  const filteredEvents = useMemo(() => {
    if (!searchQuery) return [];
    const searchLower = searchQuery.toLowerCase();
    const results = events
      .filter(event => {
        const currentLangName = event.name[language];
        const englishName = event.name['en'];
        
        if (!currentLangName && !englishName) return false;
        
        return (currentLangName && currentLangName.toLowerCase().includes(searchLower)) ||
               (englishName && englishName.toLowerCase().includes(searchLower));
      })
      .sort((a, b) => dayjs.utc(b.start).valueOf() - dayjs.utc(a.start).valueOf())
      .slice(0, 10);
    
    return results.filter((event, index, self) => 
      index === self.findIndex(e => 
        e.start === event.start && 
        e.name[language] === event.name[language]
      )
    );
  }, [events, searchQuery, language]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setSelectedIndex(-1);
    setShowResults(true);
  };

  const handleKeyDown = (e) => {
    if (!filteredEvents.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < filteredEvents.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : prev);
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleEventSelect(filteredEvents[selectedIndex]);
    } else if (e.key === 'Escape') {
      setShowResults(false);
      searchRef.current?.blur();
    }
  };

  const handleEventSelect = (event) => {
    onEventSelect(event);
    setSearchQuery('');
    setShowResults(false);
    setSelectedIndex(-1);
    searchRef.current?.blur();
  };

  const getEventStatus = (event) => {
    const now = showLocalTime ? dayjs() : dayjs.utc();
    const start = convertTime(event.start);
    const end = event.end ? convertTime(event.end) : null;

    if (end && now.isAfter(end)) {
      return { text: t('status.finished'), color: 'text-status-ended-text', dotColor: 'bg-status-ended-dot' };
    }
    if (now.isAfter(start)) {
      if (event.startOnly || event.noEnd) {
        return { text: t('status.live'), color: 'text-status-live-text', dotColor: 'bg-status-live-dot animate-pulse' };
      }
      return { text: t('status.endingIn'), color: 'text-status-ending-text', dotColor: 'bg-status-ending-dot animate-pulse' };
    }
    return { text: t('status.startingIn'), color: 'text-status-starting-text', dotColor: 'bg-status-starting-dot animate-pulse' };
  };

  const handleClear = () => {
    setSearchQuery('');
    setShowResults(false);
    setSelectedIndex(-1);
    searchRef.current?.blur();
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowResults(true)}
          placeholder={t('search.placeholder')}
          className="w-full bg-item text-gray-100 pl-10 pr-10 py-2 rounded-lg border border-gray-600 hover:border-gray-500 focus:outline-none focus:border-primary transition-colors"
        />
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        {searchQuery && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <FaTimes />
          </button>
        )}
      </div>

      {showResults && filteredEvents.length > 0 && (
        <div className={`absolute w-full mt-1 bg-item rounded-lg border border-gray-600 overflow-hidden shadow-lg overflow-y-auto scrollbar-custom ${isMobile ? 'max-h-[60vh]' : 'max-h-96'}`}>
          {filteredEvents.map((event, index) => {
            const status = getEventStatus(event);
            const start = convertTime(event.start);
            const end = event.end ? convertTime(event.end) : null;
            const now = showLocalTime ? dayjs() : dayjs.utc();
            const diffStart = start.diff(now);
            const diffEnd = end ? end.diff(now) : null;
            const currentLangName = event.name[language];
            const englishName = event.name['en'];
            
            if (!currentLangName && !englishName) return null;
            
            const displayName = currentLangName || englishName;
            const isUsingFallback = !currentLangName && englishName;

            return (
              <div
                key={`${event.start}-${event.name[language]}`}
                onClick={() => handleEventSelect(event)}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`p-3 hover:bg-gray-700 transition-colors cursor-pointer border-b border-gray-600 last:border-b-0
                  ${index === selectedIndex ? 'bg-gray-700' : ''}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${status.dotColor}`} />
                      <h3 className={`text-white font-medium ${isMobile ? 'text-sm' : ''} flex items-center gap-2`}>
                        <span>{displayName}</span>
                        {isUsingFallback && (
                          <span className="text-gray-400 text-xs">(English)</span>
                        )}
                      </h3>
                    </div>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-400 mt-1 group relative`}>
                      <span>
                        {start.format('ddd, D MMM YYYY HH:mm')}
                        {event.uncertain && (
                          <sup className="text-primary text-base ml-0.5 font-bold">*</sup>
                        )}
                      </span>
                      {event.uncertain && (
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-3 py-1.5 text-sm bg-item border border-gray-600 text-gray-200 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                          {t('dateTime.uncertaintyMessage')}
                        </span>
                      )}
                      {event.noEnd ? (
                        <span className="text-gray-300"> - {t('status.noEndDate')}</span>
                      ) : event.startOnly ? (
                        <span className="text-gray-300"> - {t('status.startOnly')}</span>
                      ) : end ? (
                        <span>
                          {` - ${end.format('ddd, D MMM YYYY HH:mm')}`}
                          {event.uncertain && (
                            <sup className="text-primary text-base ml-0.5 font-bold">*</sup>
                          )}
                        </span>
                      ) : null}
                    </p>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} ${status.color} mt-0.5 flex items-center gap-2`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${status.dotColor}`} />
                      <span>{status.text}</span>
                      {!event.noEnd && !event.startOnly && (
                        <span className="font-mono text-gray-200 text-xs ml-2">
                          {status.text === t('status.startingIn') && diffStart > 0 ? (
                            `${diffStart > 86400000 ? `${Math.trunc(dayjs.duration(diffStart).asDays())}d ` : ''}${
                              dayjs.duration(diffStart).format('HH:mm:ss')
                            }`
                          ) : status.text === t('status.endingIn') && diffEnd > 0 ? (
                            `${diffEnd > 86400000 ? `${Math.trunc(dayjs.duration(diffEnd).asDays())}d ` : ''}${
                              dayjs.duration(diffEnd).format('HH:mm:ss')
                            }`
                          ) : null}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.objectOf(PropTypes.string).isRequired,
      start: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
      end: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
      noEnd: PropTypes.bool,
      startOnly: PropTypes.bool,
    })
  ),
  onEventSelect: PropTypes.func.isRequired,
  showLocalTime: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool,
  isSearchOpen: PropTypes.bool,
};

export default SearchBar; 