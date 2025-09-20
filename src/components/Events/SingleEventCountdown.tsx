import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, AlertCircle } from 'lucide-react';
import { Event } from '../../types/Events/event';

interface SingleEventCountdownProps {
  event: Event;
  backgroundColor?: string;
  accentColor?: string;
  className?: string;
  // Layout preference: 'responsive' (column on mobile, row on desktop),
  // 'column' (always stacked), or 'row' (always side-by-side)
  alignMode?: 'responsive' | 'column' | 'row';
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Parse registration_deadline and ALWAYS treat it as end-of-day local time (11:59:59.999)
function parseDeadlineEndOfDay(dateStr: string): Date {
  if (!dateStr) return new Date(0);
  // Extract just the date portion (YYYY-MM-DD) even if a time exists
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(dateStr));
  if (!match) return new Date(dateStr); // fallback
  const y = parseInt(match[1], 10);
  const m = parseInt(match[2], 10);
  const d = parseInt(match[3], 10);
  // Construct local date at 23:59:59.999
  return new Date(y, (m || 1) - 1, d || 1, 23, 59, 59, 999);
}

const SingleEventCountdown: React.FC<SingleEventCountdownProps> = ({
  event,
  backgroundColor = "from-orange-50 to-yellow-50",
  accentColor = "from-yellow-400 to-orange-400",
  className = "",
  alignMode = 'responsive'
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [isRegistrationOpen, setIsRegistrationOpen] = useState(true);

  // Determine layout utility classes
  const layoutClasses = alignMode === 'row'
    ? 'flex-row'
    : alignMode === 'column'
      ? 'flex-col'
      : 'flex-col lg:flex-row';

  const calculateTimeLeft = (deadline: string) => {
    const deadlineDate = parseDeadlineEndOfDay(deadline);
    const now = new Date();
    const difference = deadlineDate.getTime() - now.getTime();

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  useEffect(() => {
    if (!event.registration_deadline) {
      setIsRegistrationOpen(false);
      return;
    }

    const updateCountdown = () => {
      const timeLeft = calculateTimeLeft(event.registration_deadline!);
      const now = new Date();
      const deadlineDate = parseDeadlineEndOfDay(event.registration_deadline!);
      const eventDate = new Date(event.event_date);
      
      const isRegistrationDeadlinePassed = deadlineDate.getTime() <= now.getTime();
      const isEventPassed = eventDate.getTime() <= now.getTime();
      const isOpen = !isRegistrationDeadlinePassed && !isEventPassed;

      setTimeLeft(timeLeft);
      setIsRegistrationOpen(isOpen);
    };

    // Initial calculation
    updateCountdown();

    // Update every second
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [event.registration_deadline, event.event_date]);

  // Format location for display
  const formatLocation = (loc: string) => {
    const parts = loc.split(',');
    return parts[0].trim();
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).toUpperCase();
  };

  // Format time for display (not shown in UI now, but kept for future use)
  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Format event date like "SEP 21, 2025" (uses event_date column only)
  const formatEventDate = (dateString: string) => {
    const dt = new Date(dateString);
    const day = dt.getDate();
    const month = dt.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    const year = dt.getFullYear();
    return `${month} ${String(day).padStart(2, '0')}, ${year}`;
  };

  // If no registration deadline, don't show countdown
  if (!event.registration_deadline) {
    return (
      <div className={`bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl p-8 mb-6 border border-gray-200 ${className}`}>
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-xl font-semibold text-gray-600 mb-2">No Registration Deadline Set</p>
          <p className="text-gray-500">This event doesn't have a registration deadline configured.</p>
        </div>
      </div>
    );
  }

  // If registration is closed
  if (!isRegistrationOpen) {
    return (
      <div className={`bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-8 mb-6 border border-gray-200 ${className}`}>
        <div className={`flex ${layoutClasses} items-center justify-between gap-6`}>
          {/* Left: Status */}
          <div className="text-center lg:text-left flex-1">
            <AlertCircle className="w-12 h-12 text-gray-500 mx-auto lg:mx-0 mb-4" />
            <p className="text-2xl font-bold text-gray-600 mb-2">Registration Closed</p>
            <p className="text-gray-500">
              Registration deadline passed on {formatDate(event.registration_deadline)} at 11:59 PM
            </p>
          </div>
          {/* Right: Location pill */}
          <div className="flex-shrink-0">
            <div className="bg-gray-300 text-gray-700 px-6 py-3 rounded-full inline-flex items-center gap-3">
              <MapPin className="w-5 h-5" />
              <div className="text-center">
                <div className="font-bold text-lg">{formatLocation(event.location)}</div>
                <div className="text-sm opacity-75">Event: {formatDate(event.event_date)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl p-6 mb-6 transition-all duration-300 ${className}`}>
      <div className={`flex ${layoutClasses} items-center justify-between gap-6`}>
        
        {/* Left Side - Hurry Up Message */}
        <div className="flex-shrink-0 text-center lg:text-left">
          <h3 className="text-3xl lg:text-4xl font-extrabold text-[#1b1b1b] mb-1 leading-tight">
            Hurry Up!
          </h3>
          <p className="text-lg text-[#1b1b1b] font-semibold">
            Register Now
          </p>
        </div>

        {/* Center - Countdown Timer */}
        <div className="flex items-center gap-2 lg:gap-4 flex-wrap justify-center">
          {/* Days */}
          <div className={`bg-[#F9C802] rounded-[24px] p-5 min-w-[100px] text-center`}>
            <div className="text-3xl lg:text-4xl font-black text-[#191919] mb-1">
              {timeLeft.days.toString().padStart(2, '0')}
            </div>
            <div className="text-[10px] lg:text-xs font-extrabold text-[#1b1b1b] uppercase tracking-[0.2em]">
              DAY{timeLeft.days !== 1 ? 'S' : ''}
            </div>
          </div>

          {/* Hours */}
          <div className={`bg-[#F9C802] rounded-[24px] p-5 min-w-[100px] text-center`}>
            <div className="text-3xl lg:text-4xl font-black text-[#191919] mb-1">
              {timeLeft.hours.toString().padStart(2, '0')}
            </div>
            <div className="text-[10px] lg:text-xs font-extrabold text-[#1b1b1b] uppercase tracking-[0.2em]">
              HRS
            </div>
          </div>

          {/* Minutes */}
          <div className={`bg-[#F9C802] rounded-[24px] p-5 min-w-[100px] text-center`}>
            <div className="text-3xl lg:text-4xl font-black text-[#191919] mb-1">
              {timeLeft.minutes.toString().padStart(2, '0')}
            </div>
            <div className="text-[10px] lg:text-xs font-extrabold text-[#1b1b1b] uppercase tracking-[0.2em]">
              MINS
            </div>
          </div>

          {/* Seconds */}
          <div className={`bg-[#F9C802] rounded-[24px] p-5 min-w-[100px] text-center`}>
            <div className="text-3xl lg:text-4xl font-black text-[#191919] mb-1">
              {timeLeft.seconds.toString().padStart(2, '0')}
            </div>
            <div className="text-[10px] lg:text-xs font-extrabold text-[#1b1b1b] uppercase tracking-[0.2em]">
              SECS
            </div>
          </div>
        </div>

        {/* Right Side - Location Only */}
        <div className="flex-shrink-0">
          <div className="bg-[#4F3DFE] text-white px-6 py-4 rounded-[24px] transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6" />
              <div className="text-left">
                <div className="font-extrabold text-lg">{formatLocation(event.location)}</div>
                <div className="text-xs opacity-95 mt-0.5 tracking-wide">{formatEventDate(event.event_date)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleEventCountdown;
