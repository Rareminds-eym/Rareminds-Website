import React from 'react';
import { Link } from 'react-router-dom';
import { Event } from '../../types/Events/event';
import { Calendar, Clock, MapPin, Users, Tag } from 'lucide-react';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
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

        {/* Organizer Info */}
        <div className="border-t pt-4">
          <p className="text-sm text-gray-500">
            Organized by <span className="font-medium text-gray-700">{event.organizer_name}</span>
          </p>
          {event.price && (
            <p className="text-lg font-bold text-green-600 mt-2">
              {event.price === '0' ? 'Free' : `$${event.price}`}
            </p>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-4">
          <Link 
            to={`/events/${event.slug}`}
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 text-center"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
