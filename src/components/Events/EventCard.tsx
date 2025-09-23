import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RegistrationModal from './RegistrationModal';
import CountdownTimer from '../ui/CountdownTimer';
import { Event } from '../../types/Events/event';
import { Calendar, Clock, MapPin, Users, Tag as TagIcon } from 'lucide-react';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-green-100 text-green-800';
      case 'ongoing':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <RegistrationModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        eventId={event.id ?? ""} 
        eventName={event.title} 
      />
      {/* Event Image */}
      {event.featured_image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={event.featured_image}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(event.status)}`}>
              {event.status}
            </span>
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Event Tags */}
        {event.event_tags && event.event_tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {event.event_tags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                <TagIcon className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
            {event.event_tags.length > 2 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                +{event.event_tags.length - 2} more
              </span>
            )}
          </div>
        )}

        {/* Event Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {event.title}
        </h3>

        {/* Event Description */}
        <div 
          className="text-gray-600 text-sm mb-4 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: event.description }}
        />

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{formatDate(event.event_date)} at {event.event_time}</span>
          </div>

          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{event.duration}</span>
          </div>

          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{event.location}</span>
          </div>

          <div className="flex items-center text-sm text-gray-500">
            <Users className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>Capacity: {event.capacity}</span>
          </div>
        </div>

        {/* Countdown Timer */}
        {(() => {
          const now = new Date();
          const eventDate = new Date(event.event_date);
          const registrationDeadline = event.registration_deadline ? new Date(event.registration_deadline) : null;
          
          // Show registration countdown if registration is still open and deadline exists
          if (registrationDeadline && registrationDeadline > now && event.status === 'upcoming') {
            return (
              <div className="mb-4 p-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
                <CountdownTimer 
                  targetDate={event.registration_deadline!}
                  type="registration"
                  compact={true}
                  className=""
                />
              </div>
            );
          }
          
          // Show event countdown if event is upcoming and no registration deadline or registration closed
          if (eventDate > now && event.status === 'upcoming') {
            return (
              <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                <CountdownTimer 
                  targetDate={event.event_date}
                  type="event"
                  compact={true}
                  className=""
                />
              </div>
            );
          }
          
          return null;
        })()}

        {/* Organizer Info */}
        <div className="border-t pt-4">
          <p className="text-sm text-gray-500">
            Organized by <span className="font-medium text-gray-700">{event.organizer_name}</span>
          </p>
          {event.price && (
            <p className="text-lg font-bold text-green-600 mt-2">
              {event.price === '0' ? 'Free' : `${event.price}`}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex flex-col gap-2">
          <Link 
            to={`/events/${event.slug}`}
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 text-center"
          >
            View Details
          </Link>
          {(() => {
            // Check if registration is closed
            const isRegistrationClosed = () => {
              // Check explicit registration status first
              if (event.registration_status === 'closed' || event.registration_status === 'full') {
                return true;
              }
              
              // Check event status
              if (event.status === 'completed' || event.status === 'cancelled') {
                return true;
              }
              
              // Check registration deadline
              if (event.registration_deadline) {
                const deadlineDate = new Date(event.registration_deadline);
                const currentDate = new Date();
                return currentDate > deadlineDate;
              }
              
              // Default to open if no explicit status is set
              return false;
            };

            const registrationClosed = isRegistrationClosed();

            // Get appropriate button text based on status
            const getButtonText = () => {
              if (!registrationClosed) return 'Register';
              
              if (event.registration_status === 'full') {
                return 'Registration Full';
              }
              if (event.status === 'completed') {
                return 'Event Completed';
              }
              if (event.status === 'cancelled') {
                return 'Event Cancelled';
              }
              if (event.registration_deadline) {
                const deadlineDate = new Date(event.registration_deadline);
                const currentDate = new Date();
                if (currentDate > deadlineDate) {
                  return 'Registration Closed';
                }
              }
              
              return 'Registration Closed';
            };

            return (
              <button
                className={`block w-full font-medium py-2 px-4 rounded-lg transition-colors duration-300 text-center ${
                  registrationClosed
                    ? 'bg-gray-400 cursor-not-allowed text-gray-600'
                    : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white'
                }`}
                onClick={registrationClosed ? undefined : () => setModalOpen(true)}
                disabled={registrationClosed}
              >
                {getButtonText()}
              </button>
            );
          })()}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
