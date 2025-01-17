import { useEffect, useRef, useState, useCallback } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import TimelineEvent from './TimelineEvent';
import DetailModal from './DetailModal';
import { saveToLocalStorage, getFromLocalStorage, STORAGE_KEYS } from '../../utils/localStorage';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';


dayjs.extend(duration);
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(advancedFormat);


const getNextReset = () => {
  const now = dayjs().utc();
  const today6AM = now.hour(6).minute(0).second(0);
  return now.isAfter(today6AM) 
    ? today6AM.add(1, 'day')
    : today6AM;
};


function Timeline({ events = [] }) {
  const { t, i18n } = useTranslation();
  const timelineRef = useRef(null);
  const [dayWidth, setDayWidth] = useState(40);
  const [loading, setLoading] = useState(true);
  const [showLocalTime, setShowLocalTime] = useState(
    getFromLocalStorage(STORAGE_KEYS.TIMEZONE_PREFERENCE, true)
  );
  const [userTimezone] = useState(dayjs.tz.guess());
  
  const eventHeight = 38;
  const eventMargin = 20;
  const padding = 10;
  const marginTop = 80;

  const [dates, setDates] = useState([]);
  const [monthList, setMonthList] = useState([]);
  const [processedEvents, setProcessedEvents] = useState([]);
  const [today, setToday] = useState(dayjs());
  const [firstDay, setFirstDay] = useState(dayjs());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [todayOffset, setTodayOffset] = useState(0);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [nextReset, setNextReset] = useState(getNextReset());
  const [timeToReset, setTimeToReset] = useState('');


  const handleTimezoneChange = (value) => {
    setShowLocalTime(value);
    saveToLocalStorage(STORAGE_KEYS.TIMEZONE_PREFERENCE, value);
    processEvents();
    setIsFirstLoad(true);
  };

  const convertTime = useCallback((time) => {
    if (!time) return null;
    const utcTime = dayjs.utc(time);
    return showLocalTime ? utcTime.tz(userTimezone) : utcTime;
  }, [showLocalTime, userTimezone]);

  useEffect(() => {
    if (!events?.length) return;
    
    const interval = setInterval(() => {
      const newNow = showLocalTime ? dayjs() : dayjs().utc();
      setToday(newNow);
    }, 1000);

    return () => clearInterval(interval);
  }, [events?.length, showLocalTime]);

  useEffect(() => {
    if (!loading && isFirstLoad && timelineRef.current) {
      setTimeout(() => {
       // const todayPosition = todayOffset * dayWidth;
        //const containerWidth = timelineRef.current.clientWidth;
        timelineRef.current.scrollTo({
          left: todayOffset * dayWidth - timelineRef.current.offsetWidth / 2 + dayWidth,
          top: 0,
          behavior: 'smooth'
        });
        setIsFirstLoad(false);
      }, 100);
    }
  }, [loading, isFirstLoad, todayOffset, dayWidth]);

  const processEvents = useCallback(() => {
    if (!events?.length) return;

    const filteredEvents = events.map(group => 
      group.filter(event => event.showOnHome !== false)
    ).filter(group => group.length > 0);

    const latestEndDate = filteredEvents.flat().reduce((latest, event) => {
      if (event.noEnd) return latest;
      const endDate = convertTime(event.end);
      return endDate.isAfter(latest) ? endDate : latest;
    }, dayjs().utc());

    const processedEvents = filteredEvents.map(group => {
      if (Array.isArray(group)) {
        return group.map(event => ({
          ...event,
          start: convertTime(event.start),
          end: event.noEnd ? latestEndDate : convertTime(event.end),
          name: typeof event.name === 'string' ? { en: event.name } : event.name
        }));
      }
      return {
        ...group,
        start: convertTime(group.start),
        end: group.noEnd ? latestEndDate : convertTime(group.end),
        name: typeof group.name === 'string' ? { en: group.name } : group.name
      };
    });

    let newFirstDay = dayjs().utc().add(1, 'year');
    let lastEventTime = dayjs().utc().subtract(1, 'year');

    processedEvents.forEach(group => {
      if (Array.isArray(group)) {
        group.forEach(event => {
          if (event.start.isBefore(newFirstDay)) newFirstDay = event.start;
          if (event.end.isAfter(lastEventTime)) lastEventTime = event.end;
        });
      } else {
        if (group.start.isBefore(newFirstDay)) newFirstDay = group.start;
        if (group.end.isAfter(lastEventTime)) lastEventTime = group.end;
      }
    });

    newFirstDay = newFirstDay.startOf('day').subtract(padding, 'day');
    lastEventTime = lastEventTime.endOf('day').add(padding, 'day');
    setFirstDay(newFirstDay);

    const dayTotal = Math.ceil(lastEventTime.diff(newFirstDay, 'day'));

    const newDates = Array.from({ length: dayTotal }, (_, i) => {
      const date = newFirstDay.add(i, 'day');
      return [date.date(), date.format('dd')];
    });
    setDates(newDates);

    const months = {};
    let currentOffset = 0;
    for (let i = 0; i < dayTotal; i++) {
      const date = newFirstDay.add(i, 'day');
      const month = date.format('MMMM');
      if (!months[month]) {
        months[month] = {
          total: 0,
          offset: currentOffset
        };
      }
      months[month].total++;
      currentOffset++;
    }
    setMonthList(Object.entries(months));

    const processed = processedEvents.map(group => {
      if (Array.isArray(group)) {
        return group.map(event => ({
          ...event,
          duration: event.end.diff(event.start, 'day', true),
          offset: event.start.diff(newFirstDay, 'day', true)
        }));
      }
      return {
        ...group,
        duration: group.end.diff(group.start, 'day', true),
        offset: group.start.diff(newFirstDay, 'day', true)
      };
    });

    setProcessedEvents(processed);
    setLoading(false);
  }, [convertTime, events, padding]);

  // Initial load
  useEffect(() => {
    if (events?.length) {
      processEvents();
    }
  }, [events, processEvents]);

  useEffect(() => {
    if (today && firstDay) {
      const newOffset = Math.abs(firstDay.diff(today, 'day', true));
      setTodayOffset(newOffset);
    }
  }, [today, firstDay]);

  useEffect(() => {
    processEvents();
  }, [processEvents, showLocalTime]);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const transformScroll = (event) => {
      if (!event.deltaY) return;

      const delta = Math.abs(event.deltaY);
      const dir = event.deltaY > 0 ? 1 : -1;
      
      requestAnimationFrame(() => {
        timeline.scrollLeft += delta * dir;
      });
    };

    timeline.removeEventListener('wheel', transformScroll);
    timeline.addEventListener('wheel', transformScroll);
    const timeoutId = setTimeout(() => {
      timeline.removeEventListener('wheel', transformScroll);
      timeline.addEventListener('wheel', transformScroll);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      timeline.removeEventListener('wheel', transformScroll);
    };
  }, [loading]);

  useEffect(() => {
    const handleResize = () => {
      if (timelineRef.current) {
        setDayWidth(timelineRef.current.offsetWidth < 500 ? 30 : 40);
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const updateCountdown = () => {
      const now = dayjs().utc();
      const next = getNextReset();
      
      if (next.isBefore(now)) {
        setNextReset(getNextReset());
        return;
      }

      const diff = next.diff(now);
      const duration = dayjs.duration(diff);
      const hours = duration.hours().toString().padStart(2, '0');
      const minutes = duration.minutes().toString().padStart(2, '0');
      const seconds = duration.seconds().toString().padStart(2, '0');
      
      setTimeToReset(`${hours}:${minutes}:${seconds}`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [nextReset]);

  useEffect(() => {
    processEvents();
  }, [processEvents, i18n.language]);

  useEffect(() => {
    setNextReset(getNextReset());
  }, [i18n.language]);

  useEffect(() => {
    dayjs.locale(i18n.language);
  }, [i18n.language]);

  return (
    <div className="flex-1 flex flex-col pt-16">
      <h1 className="sr-only">
        Timeline
      </h1>

      <div className="pt-8 sm:pt-16 lg:pt-8">
        <div className="flex justify-between items-center max-sm:flex-col max-sm:gap-2 px-4 md:px-8">
          <div className="text-white select-none">
            <input
              type="checkbox"
              className="mr-2 w-4 h-4"
              style={{minWidth: '1rem'}}
              checked={showLocalTime}
              onChange={(e) => handleTimezoneChange(e.target.checked)}
            />
            <span className="text-sm sm:text-base">
              {t('timeline.timezone.showLocal', { timezone: userTimezone })}
            </span>
          </div>
          <div className="relative group select-none pr-8 sm:pr-12">
            <div className="bg-item border border-button rounded-full px-4 py-1 text-white flex items-center gap-2 text-sm sm:text-base">
              <span className="font-mono">{timeToReset}</span>
              <span>{t('timeline.reset.toDaily')}</span>
            </div>
            <div className="absolute z-50 hidden group-hover:block w-max">
              <div className="relative bg-background-secondary border border-button rounded-full px-3 py-1 text-white text-sm
                max-sm:-bottom-11 -bottom-10 left-1/2 -translate-x-1/2">
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-background-secondary border-l border-t border-button rotate-45">
                </div>
                <span className="relative z-10">
                  {nextReset.format(t('dateTime.formats.nextReset'))}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-white px-4 md:px-8">{t('timeline.loading')}</div>
      ) : (
        <div 
          ref={timelineRef}
          className="timelineContainer w-full overflow-x-auto px-4 md:px-8 relative"
          style={{
            overflowY: 'hidden'
          }}
        >
          <div
            className="timeline relative"
            style={{
              paddingTop: '50px',
              width: `${dates.length * dayWidth}px`,
              height: `${marginTop + (processedEvents.length * (eventHeight + eventMargin))}px`,
              paddingRight: '0'
            }}
          >
            {/* Month titles */}
            {monthList.map(([month, data]) => (
              <div
                key={month}
                className="absolute pr-4"
                style={{
                  top: '12px',
                  width: `${data.total * dayWidth}px`,
                  left: `${data.offset * dayWidth}px`,
                  zIndex: 10
                }}
              >
                <span className="text-legendary-from font-bold sticky left-0 month">
                  {month}
                </span>
              </div>
            ))}

            {/* Date lines */}
            {dates.map((date, i) => (
              <div 
                key={i}
                className="bg-gray-700"
                style={{ 
                  width: '1px', 
                  height: `calc(100% - ${eventHeight}px)`, 
                  position: 'absolute',
                  left: `${i * dayWidth}px`, 
                  top: `${eventHeight}px`
                }}
              >
                <span 
                  className="absolute top-0 text-gray-200 text-center pb-1"
                  style={{ 
                    width: '20px',
                    left: '-10px',
                  }}
                >
                  {date[0]}
                </span>
                <span 
                  className="absolute top-0 text-gray-600 text-center pb-1"
                  style={{ 
                    width: '20px',
                    left: '-10px',
                    top: '-24px'
                  }}
                >
                  {date[1]}
                </span>
              </div>
            ))}

            {/* Events */}
            {processedEvents.map((eventGroup, i) => (
              <div key={i}>
                {Array.isArray(eventGroup) ? (
                  eventGroup.map((event, j) => (
                    <TimelineEvent
                      key={`${i}-${j}`}
                      event={event}
                      prev={j > 0 ? eventGroup[j - 1] : null}
                      next={j < eventGroup.length - 1 ? eventGroup[j + 1] : null}
                      dayWidth={dayWidth}
                      marginTop={marginTop}
                      eventHeight={eventHeight}
                      eventMargin={eventMargin}
                      index={i}
                      now={today}
                      onOpenDetail={setSelectedEvent}
                      showLocalTime={showLocalTime}
                      convertTime={convertTime}
                    />
                  ))
                ) : (
                  <TimelineEvent
                    key={i}
                    event={eventGroup}
                    dayWidth={dayWidth}
                    marginTop={marginTop}
                    eventHeight={eventHeight}
                    eventMargin={eventMargin}
                    index={i}
                    now={today}
                    onOpenDetail={setSelectedEvent}
                    showLocalTime={showLocalTime}
                    convertTime={convertTime}
                  />
                )}
              </div>
            ))}

            {/* Current time indicator */}
            <div
              className="bg-gray-200 z-20 relative opacity-75"
              style={{
                left: `${todayOffset * dayWidth}px`,
                width: '2px', 
                height: 'calc(100% - 10px)',
                position: 'absolute',
                top: '10px'
              }}
            >
              <div className="absolute rounded-xl top-0 text-center bg-white text-black"
              style={{
                width: '80px',
                 left: '-40px'
              }}>
                {today.format('HH:mm:ss')}
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedEvent && (
        <DetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          showLocalTime={showLocalTime}
          convertTime={convertTime}
          now={today}
        />
      )}
    </div>
  );
}

Timeline.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        name: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.objectOf(PropTypes.string)
        ]).isRequired,
        start: PropTypes.string.isRequired,
        end: PropTypes.string.isRequired,
        color: PropTypes.string,
        image: PropTypes.string,
        duration: PropTypes.number,
        offset: PropTypes.number,
        startOnly: PropTypes.bool,
      }),
      PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.objectOf(PropTypes.string)
          ]).isRequired,
          start: PropTypes.string.isRequired,
          end: PropTypes.string.isRequired,
          color: PropTypes.string,
          image: PropTypes.string,
          duration: PropTypes.number,
          offset: PropTypes.number,
          startOnly: PropTypes.bool,
        })
      )
    ])
  ).isRequired
};

export default Timeline;