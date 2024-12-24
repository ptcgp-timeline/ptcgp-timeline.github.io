import { useEffect, useRef, useState, useCallback } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import TimelineEvent from './TimelineEvent';
import DetailModal from './DetailModal';
import { saveToLocalStorage, getFromLocalStorage, STORAGE_KEYS } from '../../utils/localStorage';
import PropTypes from 'prop-types';


dayjs.extend(duration);
dayjs.extend(timezone);
dayjs.extend(utc);


function Timeline({ events = [] }) {
  const timelineRef = useRef(null);
  const [dayWidth, setDayWidth] = useState(40);
  const [loading, setLoading] = useState(true);
  const [showLocalTime, setShowLocalTime] = useState(
    getFromLocalStorage(STORAGE_KEYS.TIMEZONE_PREFERENCE, true)
  );
  const [userTimezone] = useState(dayjs.tz.guess());
  
  const eventHeight = 36;
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

    newFirstDay = newFirstDay.startOf('month').subtract(padding, 'day');
    setFirstDay(newFirstDay);

    const dayTotal = Math.ceil(lastEventTime.diff(newFirstDay, 'day')) + (2 * padding);

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
  }, [convertTime, events]);

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

  return (
    <div className="flex-1 flex flex-col pt-16">

      <div className="pt-20 lg:pt-8">
        <div className="flex">
          <div className="px-4 md:px-8 text-white select-none">
            <input
              type="checkbox"
              className="mr-2 w-4 h-4"
              style={{minWidth: '1rem'}}
              checked={showLocalTime}
              onChange={(e) => handleTimezoneChange(e.target.checked)}
            />
            <span>Show as local time ({userTimezone})</span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-white px-4 md:px-8">Loading...</div>
      ) : (
        <div 
          ref={timelineRef}
          className="timelineContainer w-full overflow-x-auto px-4 md:px-8"
        >
          <div
            className="timeline relative"
            style={{
              paddingTop: '50px',
              width: `${dates.length * dayWidth}px`,
              height: `${marginTop + (processedEvents.length * (eventHeight + eventMargin))}px`
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