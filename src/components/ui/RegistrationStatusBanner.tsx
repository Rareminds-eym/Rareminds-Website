import React from 'react';
import { AlertCircle, MapPin } from 'lucide-react';

interface RegistrationStatusBannerProps {
  event: {
    registration_deadline?: string;
    event_date: string;
    location: string;
    registration_status?: 'open' | 'closed' | 'full' | 'waitlist';
    status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  };
  className?: string;
}

const RegistrationStatusBanner: React.FC<RegistrationStatusBannerProps> = ({ 
  event, 
  className = '' 
}) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // EXACT SAME LOGIC AS BUTTON
  const getRegistrationStatus = () => {
    console.log('🔘 BANNER Registration Status Check:', {
      registration_status: event.registration_status,
      event_status: event.status,
      registration_deadline: event.registration_deadline,
      current_time: new Date().toISOString()
    });
    
    // Check explicit registration status first
    if (event.registration_status === 'closed' || event.registration_status === 'full') {
      console.log('❌ BANNER: Registration closed by explicit status:', event.registration_status);
      return {
        isClosed: true,
        reason: event.registration_status === 'full' ? 'full' : 'closed',
        message: event.registration_status === 'full' ? 'Registration Full' : 'Registration Closed',
        deadlineDate: null
      };
    }
    
    // Check event status
    if (event.status === 'completed' || event.status === 'cancelled') {
      console.log('❌ BANNER: Registration closed by event status:', event.status);
      return {
        isClosed: true,
        reason: event.status,
        message: event.status === 'completed' ? 'Event Completed' : 'Event Cancelled',
        deadlineDate: null
      };
    }
    
    // Check registration deadline
    if (event.registration_deadline) {
      const deadlineDate = new Date(event.registration_deadline);
      const currentDate = new Date();
      console.log('📅 BANNER Deadline check:', {
        deadline: deadlineDate.toISOString(),
        current: currentDate.toISOString(),
        isPast: currentDate > deadlineDate
      });
      
      if (currentDate > deadlineDate) {
        console.log('❌ BANNER: Registration closed by deadline');
        return {
          isClosed: true,
          reason: 'deadline',
          message: 'Registration Closed',
          deadlineDate: deadlineDate
        };
      }
    }
    
    console.log('✅ BANNER: Registration is open');
    return {
      isClosed: false,
      reason: null,
      message: null,
      deadlineDate: null
    };
  };

  const status = getRegistrationStatus();
  
  if (!status.isClosed) {
    return null;
  }

  return (
    <div className={`bg-gray-100 border border-gray-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <AlertCircle className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-lg">
              {status.message}
            </h3>
            {status.reason === 'deadline' && status.deadlineDate && (
              <p className="text-gray-600 text-sm mt-1">
                Registration deadline passed on {formatDate(status.deadlineDate)} at {formatTime(status.deadlineDate)}
              </p>
            )}
            {status.reason === 'completed' && (
              <p className="text-gray-600 text-sm mt-1">
                This event has been completed
              </p>
            )}
            {status.reason === 'cancelled' && (
              <p className="text-gray-600 text-sm mt-1">
                This event has been cancelled
              </p>
            )}
            {status.reason === 'full' && (
              <p className="text-gray-600 text-sm mt-1">
                Registration capacity has been reached
              </p>
            )}
            {status.reason === 'closed' && (
              <p className="text-gray-600 text-sm mt-1">
                Registration has been closed by the organizer
              </p>
            )}
          </div>
        </div>
        <div className="flex-shrink-0 text-right">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{event.location.split(',')[0]?.trim()}</span>
          </div>
          <div className="text-sm text-gray-500 mt-1">
            Event: {formatDate(new Date(event.event_date))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationStatusBanner;