import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

interface EventCountdownProps {
  eventDate: string;
  eventTime: string;
  location: string;
  eventTitle?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const EventCountdown: React.FC<EventCountdownProps> = ({ 
  eventDate, 
  eventTime, 
  location, 
  eventTitle 
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
      // Combine event date and time
      const eventDateTime = new Date(`${eventDate}T${eventTime}`);
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
    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6 mb-8 border border-orange-100">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        
        {/* Left Side - Hurry Up Message */}
        <div className="flex-shrink-0">
          <h3 className="text-3xl font-bold text-gray-800 mb-1">Hurry Up!</h3>
          <p className="text-lg text-gray-600 font-medium">Book Your Seat Now</p>
        </div>

        {/* Center - Countdown Timer */}
        <div className="flex items-center gap-3 flex-wrap justify-center">
          {/* Days */}
          <div className="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl p-4 min-w-[80px] text-center shadow-lg transform hover:scale-105 transition-transform duration-300">
            <div className="text-3xl font-bold text-gray-800">
              {timeLeft.days.toString().padStart(2, '0')}
            </div>
            <div className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              DAY{timeLeft.days !== 1 ? 'S' : ''}
            </div>
          </div>

          {/* Hours */}
          <div className="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl p-4 min-w-[80px] text-center shadow-lg transform hover:scale-105 transition-transform duration-300">
            <div className="text-3xl font-bold text-gray-800">
              {timeLeft.hours.toString().padStart(2, '0')}
            </div>
            <div className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              HRS
            </div>
          </div>

          {/* Minutes */}
          <div className="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl p-4 min-w-[80px] text-center shadow-lg transform hover:scale-105 transition-transform duration-300">
            <div className="text-3xl font-bold text-gray-800">
              {timeLeft.minutes.toString().padStart(2, '0')}
            </div>
            <div className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              MINS
            </div>
          </div>

          {/* Seconds */}
          <div className="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl p-4 min-w-[80px] text-center shadow-lg transform hover:scale-105 transition-transform duration-300">
            <div className="text-3xl font-bold text-gray-800">
              {timeLeft.seconds.toString().padStart(2, '0')}
            </div>
            <div className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              SECS
            </div>
          </div>
        </div>

        {/* Right Side - Location Info */}
        <div className="flex-shrink-0">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-4 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6" />
              <div className="text-center">
                <div className="font-bold text-xl">{formatLocation(location)}</div>
                <div className="text-sm opacity-90">{formatDateRange(eventDate)}</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Animated Progress Bar */}
      <div className="mt-6 bg-gray-200 rounded-full h-2 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full transition-all duration-1000 animate-pulse"
          style={{ 
            width: `${Math.max(10, Math.min(90, (timeLeft.hours * 60 + timeLeft.minutes) / 10))}%` 
          }}
        ></div>
      </div>

      {/* Urgency Message */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          ⏰ <span className="font-semibold text-orange-600">Limited seats available!</span> Don't miss out on this amazing event.
        </p>
      </div>
    </div>
  );
};

export default EventCountdown;