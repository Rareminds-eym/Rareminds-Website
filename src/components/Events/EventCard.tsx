import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RegistrationModal from './RegistrationModal';
import { Event } from '../../types/Events/event';
import { Calendar, Clock, MapPin, Users, Tag } from 'lucide-react';
import compact from 'lodash/compact';

interface EventCardProps {
  event: Event;
  compact?: boolean;
}


const EventCard: React.FC<EventCardProps> = ({ event, compact = false }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Track mobile viewport to use appropriate image
  React.useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    if ((mq as any).addEventListener) (mq as any).addEventListener('change', onChange);
    else (mq as any).addListener(onChange);
    return () => {
      if ((mq as any).removeEventListener) (mq as any).removeEventListener('change', onChange);
      else (mq as any).removeListener(onChange);
    };
  }, []);
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
    <Link
      to={`/events/${event.slug}`}
      className={`block bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer ${compact ? 'min-h-[180px]' : ''}`}
      style={{ textDecoration: 'none' }}
    >
      {/* Event Image */}
      {(event.featured_image || event.mobile_featured_image) && (
        <div className="relative h-40 sm:h-48 overflow-hidden">
          <img
            src={
              // Use mobile_featured_image for mobile devices if available, otherwise fallback to featured_image
              isMobile && event.mobile_featured_image 
                ? event.mobile_featured_image 
                : event.featured_image
            }
            alt={event.title}
            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              // Fallback to featured_image if mobile_featured_image fails to load
              const target = e.target as HTMLImageElement;
              if (isMobile && event.mobile_featured_image && target.src === event.mobile_featured_image) {
                target.src = event.featured_image || '';
              }
            }}
          />
          <div className="absolute top-2 right-2">
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(event.status)}`}>{event.status}</span>
          </div>
        </div>
      )}

      <div className={`${compact ? 'p-3' : 'p-6'}`} style={{ backgroundColor: '#eef5ff', borderRadius: '0 0 0.75rem 0.75rem' }}>
        {/* Show only category in compact (view all) mode, tags hidden */}
        {compact ? (
          event.category && (
            <div className="mb-1">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                {event.category}
              </span>
            </div>
          )
        ) : (
          event.event_tags && event.event_tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {event.event_tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
              {event.event_tags.length > 2 && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                  +{event.event_tags.length - 2} more
                </span>
              )}
            </div>
          )
        )}

        {/* Event Title */}
        <h3 className={`${compact ? 'text-base mb-2' : 'text-xl mb-3'} font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors`}>
          {event.title}
        </h3>

        {/* Event Details */}
        <div className={`space-y-1 ${compact ? 'mb-2' : 'mb-4'}`}>
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="w-4 h-4 mr-1 flex-shrink-0" />
            <span>{formatDate(event.event_date)} at {event.event_time}</span>
          </div>

          <div className="flex items-center text-xs text-gray-500">
            <Clock className="w-4 h-4 mr-1 flex-shrink-0" />
            <span>{event.duration}</span>
          </div>

          <div className="flex items-center text-xs text-gray-500">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
            <span>{event.location}</span>
          </div>

          <div className="flex items-center text-xs text-gray-500">
            <Users className="w-4 h-4 mr-1 flex-shrink-0" />
            <span>Capacity: {event.capacity}</span>
          </div>
        </div>

        {/* Organizer Info */}
        <div className={`border-t ${compact ? 'pt-2' : 'pt-4'}`}>
          <p className="text-xs text-gray-500">
            Organized by <span className="font-medium text-gray-700">{event.organizer_name}</span>
          </p>
          {event.price && (
            <p className="text-sm font-bold text-green-600 mt-1">
              {event.price === '0' ? 'Free' : `${event.price}`}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
