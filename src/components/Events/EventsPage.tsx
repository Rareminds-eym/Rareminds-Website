import React, { useState } from 'react';
import { useOptimizedEvents } from '../../hooks/Events/useOptimizedEvents';
import { Event } from '../../types/Events/event';
import EventCard from './EventCard';
import EventFilters from './EventFilters';
import { Calendar, AlertCircle, Loader2 } from 'lucide-react';

const EventsPage: React.FC = () => {
  const { events, loading, error, refetch } = useOptimizedEvents();
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
 // Banner carousel logic (hooks must be top-level)
  const banners = events.map(e => ({
    img: e.event_banner || e.featured_image,
    title: e.title,
    status: e.status,
    category: e.category
  })).filter(b => b.img);
  const [current, setCurrent] = React.useState(0);
  React.useEffect(() => {
    if (banners.length < 2) return;
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % banners.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [banners.length]);
  React.useEffect(() => {
    if (events) {
      setFilteredEvents(events);
    }
  }, [events]);

  const handleFilteredEvents = (filtered: Event[]) => {
    setFilteredEvents(filtered);
  };

    // Back to top button logic
  const [showTopBtn, setShowTopBtn] = React.useState(false);
  React.useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <div className="text-center max-w-md mx-auto px-6">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Error Loading Events</h2>
          <p className="text-gray-500 mb-2">Unable to load events at the moment.</p>
          <p className="text-sm text-gray-400 mb-6">{error}</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={() => refetch()}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Try Again
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Banner Carousel Section */}
      <div className="container mx-auto px-4 pt-8">
        {banners.length > 0 && (
          <div className="relative h-[40vh] min-h-[250px] rounded-3xl overflow-hidden shadow-2xl mb-6">
            <img
              src={banners[current].img}
              alt={banners[current].title}
              className="w-full h-full object-cover transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0">
              <div className="p-8 md:p-12 lg:p-16">
                <div className="max-w-4xl">
                  <div className="inline-flex items-center px-4 py-2 rounded-2xl text-sm font-semibold mb-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-700 border border-blue-200/50 backdrop-blur-sm">
                    <Calendar className="w-4 h-4" />
                    <span className="ml-2 capitalize">{banners[current].status}</span>
                  </div>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
                    {banners[current].title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-6 md:gap-8 text-white/90 text-sm md:text-base">
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
                        <Tag className="w-4 h-4" />
                      </div>
                      <span className="font-medium">{banners[current].category}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Pagination Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {banners.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-3 h-3 rounded-full border-2 border-white transition-all duration-300 ${current === idx ? 'bg-blue-500 scale-125' : 'bg-white/40'}`}
                  onClick={() => setCurrent(idx)}
                  aria-label={`Go to banner ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {events.length > 0 ? (
          <>
            {/* Event Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
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
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {events.filter(e => e.status === 'completed').length}
                </div>
                <div className="text-sm text-gray-600">Past Events</div>
              </div>
            </div>

            {/* Filters and Events Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Vertical Filter Bar */}
              <div className="md:col-span-1">
                <EventFilters events={events} onFilteredEvents={handleFilteredEvents} />
                {/* Results Summary only shown here, removed elsewhere */}
              </div>
              {/* Event Cards 2x2 Grid */}
              <div className="md:col-span-2">
                {/* Results Summary removed from here, now only in filter bar */}
                <div style={{ paddingTop: '24px' }}>
                  {filteredEvents.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      {filteredEvents.slice(0, 4).map((event, index) => (
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
                </div>
              </div>
            </div>
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
      {/* Back to Top Button */}
      {showTopBtn && (
        <button
          onClick={handleBackToTop}
          className="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg p-3 transition-colors flex items-center justify-center"
          title="Back to Top"
          aria-label="Back to Top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
        </button>
      )}
    </div>
  );
};

export default EventsPage;
