import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

interface HurryUpBookingProps {
  eventDate: string;
  eventTime?: string; // Made optional - defaults to 23:59:59 if not provided
  location: string;
  eventTitle?: string;
  backgroundColor?: string;
  accentColor?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const HurryUpBooking: React.FC<HurryUpBookingProps> = ({ 
  eventDate, 
  eventTime, 
  location, 
  eventTitle,
  backgroundColor = "from-orange-50 to-yellow-50",
  accentColor = "from-yellow-400 to-orange-400"
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [isEventPassed, setIsEventPassed] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Parse the date portion consistently
      const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(eventDate);
      if (!match) {
        setIsEventPassed(true);
        return;
      }
      const y = parseInt(match[1], 10);
      const m = parseInt(match[2], 10);
      const d = parseInt(match[3], 10);
      
      let eventDateTime: Date;
      if (eventTime) {
        // Parse time and combine with date using local timezone
        const [hours, minutes] = eventTime.split(':').map(v => parseInt(v, 10));
        eventDateTime = new Date(y, m - 1, d, hours || 0, minutes || 0, 0, 0);
      } else {
        // If no time provided, use end of day (11:59 PM) local time
        eventDateTime = new Date(y, m - 1, d, 23, 59, 59, 999);
      }
      const now = new Date();
      const difference = eventDateTime.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
        setIsEventPassed(false);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsEventPassed(true);
      }
    };

    // Calculate initial time
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [eventDate, eventTime]);

  // Format location for display
  const formatLocation = (loc: string) => {
    const parts = loc.split(',');
    return parts[0].trim(); // Get first part (city name)
  };

  // Format date range (assuming it's a multi-day event)
  const formatDateRange = (date: string) => {
    const eventDateObj = new Date(date);
    const startDate = eventDateObj.getDate();
    const endDate = startDate + 1; // Assuming 2-day event
    const month = eventDateObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    const year = eventDateObj.getFullYear();
    
    return `${startDate}-${endDate}TH OF ${month} ${year}`;
  };

  if (isEventPassed) {
    return (
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">Event Completed!</h3>
            <p className="text-gray-500">Thank you for your interest in this event.</p>
          </div>
          <div className="flex items-center gap-3 bg-gray-300 text-gray-600 px-6 py-3 rounded-full">
            <MapPin className="w-5 h-5" />
            <div className="text-center">
              <div className="font-bold text-lg">{formatLocation(location)}</div>
              <div className="text-sm opacity-75">Event Completed</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-r ${backgroundColor} rounded-2xl p-6 mb-8 border border-orange-100 shadow-lg`}>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        
        {/* Left Side - Hurry Up Message */}
        <div className="flex-shrink-0 text-center lg:text-left">
          <h3 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-2 leading-tight">
            Hurry Up!
          </h3>
          <p className="text-xl lg:text-2xl text-gray-700 font-semibold">
            Book Your Seat Now
          </p>
        </div>

        {/* Center - Countdown Timer */}
        <div className="flex items-center gap-2 lg:gap-4 flex-wrap justify-center">
          {/* Days */}
          <div className={`bg-gradient-to-br ${accentColor} rounded-3xl p-4 lg:p-6 min-w-[90px] lg:min-w-[110px] text-center shadow-xl transform hover:scale-110 transition-all duration-300 hover:shadow-2xl`}>
            <div className="text-4xl lg:text-5xl font-black text-gray-900 mb-1">
              {timeLeft.days.toString().padStart(2, '0')}
            </div>
            <div className="text-sm lg:text-base font-bold text-gray-800 uppercase tracking-wider">
              DAY{timeLeft.days !== 1 ? 'S' : ''}
            </div>
          </div>

          {/* Hours */}
          <div className={`bg-gradient-to-br ${accentColor} rounded-3xl p-4 lg:p-6 min-w-[90px] lg:min-w-[110px] text-center shadow-xl transform hover:scale-110 transition-all duration-300 hover:shadow-2xl`}>
            <div className="text-4xl lg:text-5xl font-black text-gray-900 mb-1">
              {timeLeft.hours.toString().padStart(2, '0')}
            </div>
            <div className="text-sm lg:text-base font-bold text-gray-800 uppercase tracking-wider">
              HRS
            </div>
          </div>

          {/* Minutes */}
          <div className={`bg-gradient-to-br ${accentColor} rounded-3xl p-4 lg:p-6 min-w-[90px] lg:min-w-[110px] text-center shadow-xl transform hover:scale-110 transition-all duration-300 hover:shadow-2xl`}>
            <div className="text-4xl lg:text-5xl font-black text-gray-900 mb-1">
              {timeLeft.minutes.toString().padStart(2, '0')}
            </div>
            <div className="text-sm lg:text-base font-bold text-gray-800 uppercase tracking-wider">
              MINS
            </div>
          </div>

          {/* Seconds */}
          <div className={`bg-gradient-to-br ${accentColor} rounded-3xl p-4 lg:p-6 min-w-[90px] lg:min-w-[110px] text-center shadow-xl transform hover:scale-110 transition-all duration-300 hover:shadow-2xl`}>
            <div className="text-4xl lg:text-5xl font-black text-gray-900 mb-1">
              {timeLeft.seconds.toString().padStart(2, '0')}
            </div>
            <div className="text-sm lg:text-base font-bold text-gray-800 uppercase tracking-wider">
              SECS
            </div>
          </div>
        </div>

        {/* Right Side - Location Info */}
        <div className="flex-shrink-0">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 lg:px-8 py-4 lg:py-6 rounded-3xl shadow-xl transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
            <div className="flex items-center gap-4">
              <MapPin className="w-8 h-8" />
              <div className="text-center">
                <div className="font-bold text-xl lg:text-2xl mb-1">{formatLocation(location)}</div>
                <div className="text-sm lg:text-base opacity-90 font-medium">{formatDateRange(eventDate)}</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Optional Event Title */}
      {eventTitle && (
        <div className="mt-6 text-center">
          <h4 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">{eventTitle}</h4>
        </div>
      )}

      {/* Animated Progress Bar */}
      <div className="mt-6 bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
        <div 
          className="bg-gradient-to-r from-orange-400 to-red-500 h-3 rounded-full transition-all duration-1000 animate-pulse shadow-lg"
          style={{ 
            width: `${Math.max(15, Math.min(85, (timeLeft.hours * 60 + timeLeft.minutes) / 10))}%` 
          }}
        ></div>
      </div>

      {/* Urgency Message */}
      <div className="mt-4 text-center">
        <p className="text-base lg:text-lg text-gray-700 font-medium">
          ⏰ <span className="font-bold text-orange-600">Limited seats available!</span> 
          <span className="block mt-1 text-sm text-gray-600">Don't miss out on this amazing event.</span>
        </p>
      </div>
    </div>
  );
};

export default HurryUpBooking;
