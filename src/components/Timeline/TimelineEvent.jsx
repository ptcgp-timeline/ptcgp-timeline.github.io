import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import PropTypes from 'prop-types';
import { useLanguage } from '../../context/useLanguage';
import { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

dayjs.extend(duration);

const TimelineEvent = ({ 
  event, 
  prev, 
  next, 
  dayWidth, 
  marginTop, 
  eventHeight, 
  eventMargin, 
  index, 
  now, 
  onOpenDetail,
  convertTime,
  isHighlighted
}) => {
  const { language } = useLanguage();
  const { i18n } = useTranslation();
  const eventName = event.name[language] || event.name['en'];
  const [isClickable, setIsClickable] = useState(true);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef(null);

  const eventStart = convertTime(event.start);
  const eventEnd = convertTime(event.end);
  const prevEnd = prev ? convertTime(prev.end) : null;
  const nextStart = next ? convertTime(next.start) : null;

  const prevDiff = prev ? eventStart.diff(prevEnd, 'hour') : Number.MAX_VALUE;
  const nextDiff = next ? nextStart.diff(eventEnd, 'hour') : Number.MAX_VALUE;
  const prevNearby = prev && prevDiff < 48;
  const nextNearby = next && nextDiff < 48;
  const started = now.isAfter(eventStart);
  const ended = now.isAfter(eventEnd);
  const diffStart = eventStart.diff(now);
  const diffEnd = eventEnd.diff(now);
  const attachedNext = next && nextStart.diff(eventEnd, 'hour') < 3;
  const attachedPrev = prev && eventStart.diff(prevEnd, 'hour') < 3;
  const prevEnded = prev && now.isAfter(prevEnd);
  const shouldShowHourStart = diffStart <= 86400000 || event.duration > 6.5 || !prevNearby;
  const shouldShowHourEnd = diffEnd <= 86400000 || event.duration > 6.5 || !prevNearby;

  // Handle highlight state changes
  useEffect(() => {
    if (isHighlighted) {
      setIsClickable(false);
      // Re-enable clicking after the highlight animation (1s) plus a small buffer
      const timer = setTimeout(() => {
        setIsClickable(true);
      }, 2100);
      return () => clearTimeout(timer);
    } else {
      setIsClickable(true);
    }
  }, [isHighlighted]);

  const handleClick = (e) => {
    if (!isClickable) {
      e.preventDefault();
      return;
    }
    onOpenDetail(event);
  };

  useEffect(() => {
    const element = textRef.current;
    if (element) {
      setIsOverflowing(element.scrollWidth > element.clientWidth);
    }
  }, [eventName, i18n.language]);

  return (
    <div
      onClick={handleClick}
      data-event-start={dayjs.utc(event.start).format()}
      data-event-end={dayjs.utc(event.end).format()}
      className={`flex items-center z-10 text-white ${isClickable ? 'cursor-pointer' : 'cursor-default'} absolute transition-all duration-150
        ${prevDiff < 1 ? '' : 'rounded-l-xl'} 
        ${nextDiff < 1 ? 'border-r-4 border-white' : 'rounded-r-xl'}
        ${isHighlighted ? 'ring-2 ring-primary ring-offset-2 ring-offset-background shadow-lg scale-[1.02] z-30 animate-highlight' : ''}`}
      style={{
        width: `${dayWidth * event.duration}px`,
        left: `${dayWidth * event.offset}px`,
        backgroundColor: event.color,
        top: `${marginTop + index * (eventHeight + eventMargin)}px`,
        height: `${eventHeight}px`,
        paddingRight: '10px',
        paddingLeft: prevNearby && !started && (attachedPrev || prevEnded) ? '35px' : '10px',
        '--image': `url('/images/events/${event.image}')`,
        '--pos': event.pos || '50% 50%',
        '--color': event.color,
        '--zoom': event.zoom || '200%'
      }}
    >
      <div className={`event-item ${nextDiff < 1 ? '' : 'rounded-xl'}`} />
      <span 
        className="event-name text sticky left-0 font-display text-base md:text-lg text-black font-bold whitespace-nowrap overflow-hidden"
        ref={textRef}
      >
        {isOverflowing ? (
          <span 
            className="scroll-overflow"
            style={{
              '--scroll-duration': `${Math.max(eventName.length * 0.4, 15)}s`,
            }}
          >
            <span className="select-none px-6">{eventName}</span>
            <span className="select-none px-6">{eventName}</span>
            <span className="select-none px-6">{eventName}</span>
          </span>
        ) : (
          <span>{eventName}</span>
        )}
      </span>

      {/* Timer displays */}
      {started && !ended && !event.startOnly && !attachedNext && !event.noEnd && (
        <div
          className="absolute pl-3"
          style={{
            top: '6px',
            right: `${nextNearby ? '-55px' : shouldShowHourEnd ? '-120px' : '-40px'}`,
            width: `${shouldShowHourEnd ? '120px' : '40px'}`
          }}
        >
          
          <span className="text-sm rounded-xl text-black font-semibold bg-white bg-opacity-75 px-1">
            {diffEnd > 86400000
              ? `${Math.trunc(dayjs.duration(diffEnd).asDays())}d ${
                  shouldShowHourEnd ? dayjs.duration(diffEnd).format('H[h]') : ''
                }`
              : dayjs.duration(diffEnd).format('HH:mm:ss')}
          </span>
        </div>
      )}

      {(!started && !ended && (prevNearby && !attachedPrev ? prevEnded : true)) && (
        <div
          className="absolute pr-3 text-right"
          style={{
            top: '6px',
            left: `${prevNearby ? shouldShowHourStart ? '-80px' : '-18px' : '-120px'}`,
            width: `${shouldShowHourStart ? '120px' : '40px'}`
          }}
        >
          <span className="text-sm rounded-xl text-black font-semibold bg-white bg-opacity-75 px-1">
            {diffStart > 86400000
              ? `${Math.trunc(dayjs.duration(diffStart).asDays())}d ${
                  shouldShowHourStart ? dayjs.duration(diffStart).format('H[h]') : ''
                }`
              : dayjs.duration(diffStart).format('HH:mm:ss')}
          </span>
        </div>
      )}
    </div>
  );
};

TimelineEvent.propTypes = {
  event: PropTypes.shape({
    name: PropTypes.objectOf(PropTypes.string).isRequired,
    start: PropTypes.object.isRequired,
    end: PropTypes.object.isRequired,
    color: PropTypes.string.isRequired,
    image: PropTypes.string,
    pos: PropTypes.string.isRequired,
    zoom: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    offset: PropTypes.number.isRequired,
    startOnly: PropTypes.bool,
    timezoneDependent: PropTypes.bool,
    noEnd: PropTypes.bool,
  }).isRequired,
  prev: PropTypes.object,
  next: PropTypes.object,
  dayWidth: PropTypes.number.isRequired,
  marginTop: PropTypes.number.isRequired,
  eventHeight: PropTypes.number.isRequired,
  eventMargin: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  now: PropTypes.object.isRequired,
  onOpenDetail: PropTypes.func.isRequired,
  convertTime: PropTypes.func.isRequired,
  isHighlighted: PropTypes.bool,
};

export default TimelineEvent; 