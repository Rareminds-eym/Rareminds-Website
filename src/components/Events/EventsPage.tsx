import React, { useState } from 'react';
import { useEvents } from '../../hooks/Events/useEvent';
import { Event } from '../../types/Events/event';
import EventCard from './EventCard';
import EventFilters from './EventFilters';
import { Calendar, AlertCircle, Loader2 } from 'lucide-react';

const EventsPage: React.FC = () => {
  const { events, loading, error } = useEvents();
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

  React.useEffect(() => {
    if (events) {
      setFilteredEvents(events);
    }
  }, [events]);

  const handleFilteredEvents = (filtered: Event[]) => {
    setFilteredEvents(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading Events</h2>
          <p className="text-gray-500">Please wait while we fetch the latest events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Error Loading Events</h2>
          <p className="text-gray-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Events
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Discover exciting events, workshops, and seminars. Join us for learning, networking, and growth opportunities.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {events.length > 0 ? (
          <>
            {/* Event Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">{events.length}</div>
                <div className="text-sm text-gray-600">Total Events</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">
                  {events.filter(e => e.status === 'upcoming').length}
                </div>
                <div className="text-sm text-gray-600">Upcoming</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <div className="text-2xl font-bold text-orange-600 mb-2">
                  {events.filter(e => e.status === 'ongoing').length}
                </div>
                <div className="text-sm text-gray-600">Ongoing</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <div className="text-2xl font-bold text-purple-600 mb-2">
                  {[...new Set(events.map(e => e.category))].length}
                </div>
                <div className="text-sm text-gray-600">Categories</div>
              </div>
            </div>

            {/* Filters */}
            <EventFilters events={events} onFilteredEvents={handleFilteredEvents} />

            {/* Results Summary */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing <span className="font-semibold">{filteredEvents.length}</span> of{' '}
                <span className="font-semibold">{events.length}</span> events
              </p>
            </div>

            {/* Events Grid */}
            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event, index) => (
                  <EventCard key={event.id || index} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No events found</h3>
                <p className="text-gray-500">
                  Try adjusting your filters or search terms to find more events.
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <Calendar className="w-20 h-20 text-gray-400 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">No Events Available</h2>
            <p className="text-gray-500 text-lg mb-8">
              There are currently no events to display. Check back soon for exciting upcoming events!
            </p>
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Stay Updated</h3>
              <p className="text-gray-600 mb-4">
                Be the first to know about new events and workshops.
              </p>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                Notify Me
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
