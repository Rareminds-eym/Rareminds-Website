import React from 'react';
import { useEventCountdown, EventWithCountdown } from '../../hooks/Events/useEventCountdown';
import { AlertCircle, Calendar, Clock, MapPin, Users, Loader2 } from 'lucide-react';

interface EventCountdownSupabaseProps {
  showUrgentOnly?: boolean;
  maxEvents?: number;
  className?: string;
  backgroundColor?: string;
  accentColor?: string;
}

const EventCountdownSupabase: React.FC<EventCountdownSupabaseProps> = ({
  showUrgentOnly = false,
  maxEvents = 5,
  className = '',
  backgroundColor = "from-orange-50 to-yellow-50",
  accentColor = "from-yellow-400 to-orange-400"
}) => {
  const { events, activeEvents, urgentEvents, loading, error, refetch } = useEventCountdown();

  // Determine which events to show
  const eventsToShow = showUrgentOnly 
    ? urgentEvents.slice(0, maxEvents)
    : activeEvents.slice(0, maxEvents);

  // Loading state
  if (loading) {
    return (
      <div className={`bg-gradient-to-r ${backgroundColor} rounded-2xl p-8 mb-8 border border-orange-100 shadow-lg ${className}`}>
        <div className="flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
          <span className="ml-3 text-lg font-semibold text-gray-700">Loading events...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-8 mb-8 border border-red-100 shadow-lg ${className}`}>
        <div className="flex items-center justify-center text-center">
          <AlertCircle className="w-8 h-8 text-red-500 mr-3" />
          <div>
            <p className="text-lg font-semibold text-red-700 mb-2">Failed to load events</p>
            <p className="text-sm text-red-600 mb-4">{error}</p>
            <button
              onClick={refetch}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No events state
  if (eventsToShow.length === 0) {
    return (
      <div className={`bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl p-8 mb-8 border border-gray-200 shadow-lg ${className}`}>
        <div className="text-center">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-xl font-semibold text-gray-600 mb-2">
            {showUrgentOnly ? 'No urgent registrations' : 'No active events'}
          </p>
          <p className="text-gray-500">
            {showUrgentOnly 
              ? 'All event registration deadlines are either passed or more than 7 days away.'
              : 'No events with active registration are currently available.'
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {showUrgentOnly && eventsToShow.length > 0 && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">⚡ Urgent Registrations</h2>
          <p className="text-gray-600">Events with registration deadlines within 7 days</p>
        </div>
      )}
      
      {eventsToShow.map((event) => (
        <EventCountdownCard
          key={event.id}
          event={event}
          backgroundColor={backgroundColor}
          accentColor={accentColor}
        />
      ))}
    </div>
  );
};

// Individual event countdown card component
interface EventCountdownCardProps {
  event: EventWithCountdown;
  backgroundColor?: string;
  accentColor?: string;
}

const EventCountdownCard: React.FC<EventCountdownCardProps> = ({
  event,
  backgroundColor = "from-orange-50 to-yellow-50",
  accentColor = "from-yellow-400 to-orange-400"
}) => {
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

  // Format time for display
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

  const { timeLeft } = event;

  return (
    <div className={`bg-gradient-to-r ${backgroundColor} rounded-2xl p-6 mb-6 border border-orange-100 shadow-lg hover:shadow-xl transition-all duration-300`}>
      {/* Event Title */}
      <div className="mb-4">
        <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-1">{event.title}</h3>
        <p className="text-gray-600 text-sm lg:text-base">Registration closes soon!</p>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        
        {/* Left Side - Hurry Up Message */}
        <div className="flex-shrink-0 text-center lg:text-left">
          <h3 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2 leading-tight">
            Hurry Up!
          </h3>
          <p className="text-lg lg:text-xl text-gray-700 font-semibold">
            Register Now
          </p>
        </div>

        {/* Center - Countdown Timer */}
        <div className="flex items-center gap-2 lg:gap-4 flex-wrap justify-center">
          {/* Days */}
          <div className={`bg-gradient-to-br ${accentColor} rounded-3xl p-4 lg:p-6 min-w-[80px] lg:min-w-[100px] text-center shadow-xl transform hover:scale-110 transition-all duration-300 hover:shadow-2xl`}>
            <div className="text-3xl lg:text-4xl font-black text-gray-900 mb-1">
              {timeLeft.days.toString().padStart(2, '0')}
            </div>
            <div className="text-xs lg:text-sm font-bold text-gray-800 uppercase tracking-wider">
              DAY{timeLeft.days !== 1 ? 'S' : ''}
            </div>
          </div>

          {/* Hours */}
          <div className={`bg-gradient-to-br ${accentColor} rounded-3xl p-4 lg:p-6 min-w-[80px] lg:min-w-[100px] text-center shadow-xl transform hover:scale-110 transition-all duration-300 hover:shadow-2xl`}>
            <div className="text-3xl lg:text-4xl font-black text-gray-900 mb-1">
              {timeLeft.hours.toString().padStart(2, '0')}
            </div>
            <div className="text-xs lg:text-sm font-bold text-gray-800 uppercase tracking-wider">
              HRS
            </div>
          </div>

          {/* Minutes */}
          <div className={`bg-gradient-to-br ${accentColor} rounded-3xl p-4 lg:p-6 min-w-[80px] lg:min-w-[100px] text-center shadow-xl transform hover:scale-110 transition-all duration-300 hover:shadow-2xl`}>
            <div className="text-3xl lg:text-4xl font-black text-gray-900 mb-1">
              {timeLeft.minutes.toString().padStart(2, '0')}
            </div>
            <div className="text-xs lg:text-sm font-bold text-gray-800 uppercase tracking-wider">
              MINS
            </div>
          </div>

          {/* Seconds */}
          <div className={`bg-gradient-to-br ${accentColor} rounded-3xl p-4 lg:p-6 min-w-[80px] lg:min-w-[100px] text-center shadow-xl transform hover:scale-110 transition-all duration-300 hover:shadow-2xl`}>
            <div className="text-3xl lg:text-4xl font-black text-gray-900 mb-1">
              {timeLeft.seconds.toString().padStart(2, '0')}
            </div>
            <div className="text-xs lg:text-sm font-bold text-gray-800 uppercase tracking-wider">
              SECS
            </div>
          </div>
        </div>

        {/* Right Side - Event Info */}
        <div className="flex-shrink-0">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 lg:px-8 py-4 lg:py-6 rounded-3xl shadow-xl transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5" />
                <span className="font-bold text-lg">{formatLocation(event.location)}</span>
              </div>
              <div className="flex items-center gap-3 text-sm opacity-90">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(event.event_date)}</span>
              </div>
              <div className="flex items-center gap-3 text-sm opacity-90">
                <Clock className="w-4 h-4" />
                <span>{formatTime(event.event_time)}</span>
              </div>
              {event.capacity && (
                <div className="flex items-center gap-3 text-sm opacity-90">
                  <Users className="w-4 h-4" />
                  <span>{event.capacity} seats</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Registration Deadline Info */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          ⏰ <span className="font-bold text-orange-600">Registration closes on {formatDate(event.registration_deadline!)} by 11:59 PM</span>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Don't miss your chance to be part of this amazing event!
        </p>
      </div>

      {/* Optional Progress Bar */}
      <div className="mt-4 bg-gray-200 rounded-full h-2 overflow-hidden shadow-inner">
        <div 
          className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full transition-all duration-1000 animate-pulse shadow-lg"
          style={{ 
            width: `${Math.max(10, Math.min(90, 100 - (timeLeft.days * 10 + timeLeft.hours) / 10))}%` 
          }}
        ></div>
      </div>
    </div>
  );
};

export default EventCountdownSupabase;
