import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag } from 'lucide-react';
import { useEvents } from '../../hooks/Events/useEvent';
import { Event } from '../../types/Events/event';
import EventCard from './EventCard';
import EventFilters from './EventFilters';
import RegistrationModal from './RegistrationModal';
import { Calendar, AlertCircle, Loader2 } from 'lucide-react';

// For mobile drawer
import { X, Filter } from 'lucide-react';

const EventsPage: React.FC = () => {
  const { events, loading, error } = useEvents();
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [showRegistrationModal, setShowRegistrationModal] = React.useState(false);
  // Banner carousel logic (hooks must be top-level)
  const banners = events
    .filter(e => e.status === 'upcoming')
    .map(e => ({
      img: e.event_banner || e.featured_image,
      title: e.title,
      status: e.status,
      category: e.category,
      slug: e.slug
    }))
    .filter(b => b.img);
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
  // (Removed) Mobile filter drawer state (bottom)
  // Mobile right-side filter drawer state
  const [showMobileRightFilter, setShowMobileRightFilter] = React.useState(false);
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
      {/* Mobile Top Bar */}
      <AnimatePresence>
        <motion.div
          className="md:hidden sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-200 flex flex-col"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <motion.div
            className="flex items-center justify-between px-4 h-14 shadow-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <span className="text-lg font-bold text-gray-900">Categories</span>
            <button
              className="p-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
              aria-label="Open Filters"
              onClick={() => setShowMobileRightFilter(true)}
            >
              <Filter className="w-6 h-6 text-blue-600" />
            </button>
          </motion.div>
          {/* Horizontally scrollable categories row */}
          <motion.div
            className="w-full overflow-x-auto no-scrollbar pb-2 pt-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex gap-3 px-3">
              {Array.from(new Set(events.map(e => e.category))).map((cat, idx) => {
                // Find first event with this category for image
                const eventWithCat = events.find(e => e.category === cat);
                const img = eventWithCat?.event_banner || eventWithCat?.featured_image || '';
                return (
                  <motion.div
                    key={cat}
                    className="min-w-[80px] max-w-[90px] flex flex-col items-center bg-[#f4f4f4] rounded-lg shadow p-2 flex-shrink-0"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.25 + idx * 0.05 }}
                  >
                    {img ? (
                      <img src={img} alt={cat} className="w-full h-10 object-cover rounded-md mb-1" />
                    ) : (
                      <div className="w-full h-10 rounded-md bg-gray-200 flex items-center justify-center mb-1 text-xs text-gray-400">No Img</div>
                    )}
                    <span className="text-[11px] text-gray-700 text-center truncate w-full font-medium">{cat}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
          <style>{`
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>
        </motion.div>
      </AnimatePresence>
      {/* Mobile: Right-side Filter Drawer */}
      {showMobileRightFilter && (
        <div className="fixed inset-0 z-50 flex items-stretch justify-end md:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setShowMobileRightFilter(false)}
          />
          {/* Drawer */}
          <div className="relative h-full w-5/6 max-w-xs bg-white shadow-2xl rounded-l-3xl p-6 animate-slideInRight flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Filter className="w-5 h-5" /> Filters
              </h3>
              <button
                onClick={() => setShowMobileRightFilter(false)}
                className="text-gray-400 hover:text-gray-700 rounded-full p-2"
                aria-label="Close Filters"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <EventFilters events={events} onFilteredEvents={handleFilteredEvents} />
            </div>
            <button
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-lg shadow active:scale-95 transition-all"
              onClick={() => setShowMobileRightFilter(false)}
            >
              Apply
            </button>
          </div>
        </div>
      )}
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slideInRight {
          animation: slideInRight 0.3s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
      {/* Hero Banner Carousel Section */}
      <div className="container mx-auto px-4 pt-8">
        {/* Mobile: Upcoming Events heading above banner */}
        <div className="md:hidden mb-4">
          <h2 className="text-xl font-bold text-gray-900">Upcoming Events</h2>
        </div>
        {banners.length > 0 && (
          <div className="relative h-[50vh] min-h-[320px] rounded-3xl overflow-hidden shadow-2xl mb-6">
            <img
              src={banners[current].img}
              alt={banners[current].title}
              className="w-full h-full object-cover transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0">
              {/* Desktop: status badge in content */}
              <div>
                {/* Desktop: in content */}
                <div className="hidden md:block p-8 md:p-12 lg:p-16">
                  <div className="max-w-4xl">
                    <div className="inline-flex items-center px-4 py-2 rounded-2xl text-sm font-semibold mb-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-700 border border-blue-200/50 backdrop-blur-sm">
                      <Calendar className="w-4 h-4" />
                      <span className="ml-2 capitalize">{banners[current].status}</span>
                    </div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
                      {banners[current].title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-8 text-white/90 text-base">
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
              {/* Mobile: title and category below image */}
              <div className="md:hidden p-6 pt-24">
                <h1 className="text-xl font-bold text-white mb-20 leading-[1.1] tracking-tight">
                  {banners[current].title}
                </h1>
                <div className="flex items-center gap-4 text-white/90 text-sm">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-2">
                      <Tag className="w-4 h-4" />
                    </div>
                    <span className="font-medium">{banners[current].category}</span>
                  </div>
                </div>
              </div>
              {/* CTA Buttons - Bottom Left of Banner */}
              {/* Desktop: horizontal buttons */}
              <div className="absolute bottom-8 left-16 gap-4 z-20 pt-4 hidden md:flex">
                <a
                  href={`/events/${events[current]?.slug || ''}`}
                  className="px-6 py-3 rounded-2xl bg-white/90 text-blue-700 font-semibold shadow hover:bg-blue-50 transition-colors text-base"
                  style={{ textDecoration: 'none' }}
                >
                  View Details
                </a>
                <button
                  onClick={() => setShowRegistrationModal(true)}
                  className="px-6 py-3 rounded-2xl bg-white/90 text-blue-700 font-semibold shadow hover:bg-blue-50 transition-colors text-base"
                >
                  Register
                </button>
              </div>
              {/* Mobile: stacked full-width buttons (only Register) */}
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[90%] flex flex-col gap-3 z-20 md:hidden">
                <button
                  onClick={() => setShowRegistrationModal(true)}
                  className="w-full py-2 rounded-xl bg-white/90 text-blue-700 font-bold shadow hover:bg-blue-50 transition-colors text-base"
                >
                  Register
                </button>
              </div>
              
                  {/* Registration Modal for Banner CTA */}
                  {showRegistrationModal && events[current] && (
                    <RegistrationModal
                      open={showRegistrationModal}
                      onClose={() => setShowRegistrationModal(false)}
                      eventId={events[current].id ?? ""}
                      eventName={events[current].title ?? ""}
                    />
                  )}
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
            {/* Mobile: horizontal scrollable cards */}
            <div className="md:hidden mb-8">
              <div className="flex gap-2 overflow-x-auto no-scrollbar pl-2 pr-8" style={{ WebkitOverflowScrolling: 'touch' }}>
                <div className="min-w-[96px] rounded-md shadow p-2 text-center bg-[#f4f4f4] flex-shrink-0">
                  <div className="text-base font-bold text-blue-600 mb-0.5">{events.length}</div>
                  <div className="text-[11px] text-gray-600 leading-tight">Total Events</div>
                </div>
                <div className="min-w-[96px] rounded-md shadow p-2 text-center bg-[#f4f4f4] flex-shrink-0">
                  <div className="text-base font-bold text-green-600 mb-0.5">{events.filter(e => e.status === 'upcoming').length}</div>
                  <div className="text-[11px] text-gray-600 leading-tight">Upcoming</div>
                </div>
                <div className="min-w-[96px] rounded-md shadow p-2 text-center bg-[#f4f4f4] flex-shrink-0">
                  <div className="text-base font-bold text-orange-600 mb-0.5">{events.filter(e => e.status === 'ongoing').length}</div>
                  <div className="text-[11px] text-gray-600 leading-tight">Ongoing</div>
                </div>
                <div className="min-w-[96px] rounded-md shadow p-2 text-center bg-[#f4f4f4] flex-shrink-0">
                  <div className="text-base font-bold text-purple-600 mb-0.5">{[...new Set(events.map(e => e.category))].length}</div>
                  <div className="text-[11px] text-gray-600 leading-tight">Categories</div>
                </div>
                <div className="min-w-[80px] rounded-md shadow p-2 text-center bg-[#f4f4f4] flex-shrink-0 mr-4 opacity-80">
                  <div className="text-base font-bold text-blue-600 mb-0.5">{events.filter(e => e.status === 'completed').length}</div>
                  <div className="text-[11px] text-gray-600 leading-tight">Past Events</div>
                </div>
              </div>
              <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
              `}</style>
            </div>
            {/* Desktop: grid layout */}
            <div className="hidden md:grid grid-cols-5 gap-4 mb-8">
              <div className="rounded-lg shadow p-6 text-center" style={{ backgroundColor: '#f4f4f4' }}>
                <div className="text-2xl font-bold text-blue-600 mb-2">{events.length}</div>
                <div className="text-sm text-gray-600">Total Events</div>
              </div>
              <div className="rounded-lg shadow p-6 text-center" style={{ backgroundColor: '#f4f4f4' }}>
                <div className="text-2xl font-bold text-green-600 mb-2">{events.filter(e => e.status === 'upcoming').length}</div>
                <div className="text-sm text-gray-600">Upcoming</div>
              </div>
              <div className="rounded-lg shadow p-6 text-center" style={{ backgroundColor: '#f4f4f4' }}>
                <div className="text-2xl font-bold text-orange-600 mb-2">{events.filter(e => e.status === 'ongoing').length}</div>
                <div className="text-sm text-gray-600">Ongoing</div>
              </div>
              <div className="rounded-lg shadow p-6 text-center" style={{ backgroundColor: '#f4f4f4' }}>
                <div className="text-2xl font-bold text-purple-600 mb-2">{[...new Set(events.map(e => e.category))].length}</div>
                <div className="text-sm text-gray-600">Categories</div>
              </div>
              <div className="rounded-lg shadow p-6 text-center" style={{ backgroundColor: '#f4f4f4' }}>
                <div className="text-2xl font-bold text-blue-600 mb-2">{events.filter(e => e.status === 'completed').length}</div>
                <div className="text-sm text-gray-600">Past Events</div>
              </div>
            </div>

            {/* Filters and Events Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Desktop: Vertical Filter Bar */}
              <div className="hidden md:block md:col-span-1" style={{ paddingTop: '24px' }}>
                <EventFilters events={events} onFilteredEvents={handleFilteredEvents} />
              </div>
              {/* Mobile: Horizontal Scrollable Event Cards */}
              <div className="md:hidden w-full flex items-center justify-between p-2">
                <span className="text-lg font-bold text-gray-900">Events</span>
                <a href="/events/all" className="text-blue-600 font-semibold text-sm px-4 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 shadow transition-colors">View All</a>
              </div>
              <AnimatePresence>
                <motion.div
                  className="md:hidden w-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  {filteredEvents.length > 0 ? (
                    <motion.div
                      className="flex gap-4 overflow-x-auto no-scrollbar px-2 pb-2"
                      style={{ WebkitOverflowScrolling: 'touch' }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      {filteredEvents.map((event, index) => {
                        // Formatting functions and price logic inside map
                        const formatDate = (dateString: string) => {
                          if (!dateString) return '';
                          return new Date(dateString).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          });
                        };
                        const formatTime = (timeString: string) => {
                          if (!timeString) return '';
                          const [hours, minutes] = timeString.split(':');
                          const date = new Date();
                          date.setHours(parseInt(hours), parseInt(minutes));
                          return date.toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true,
                          });
                        };
                        let priceDisplay: string;
                        const priceStr = (event.price ?? '0').toString().toLowerCase();
                        if (priceStr === 'free' || priceStr === '0' || priceStr === '') {
                          priceDisplay = 'FREE';
                        } else {
                          const numeric = parseFloat(priceStr.replace(/[^\d.]/g, '')) || 0;
                          priceDisplay = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(numeric);
                        }
                        return (
                          <motion.div
                            key={event.id || index}
                            className="min-w-[260px] max-w-[280px] bg-white rounded-2xl shadow p-3 flex flex-col flex-shrink-0"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.15 + index * 0.05 }}
                          >
                            {/* ...existing card content... */}
                            <div className="relative h-32 w-full mb-2 rounded-xl overflow-hidden">
                              <img src={event.event_banner || event.featured_image || ''} alt={event.title} className="w-full h-full object-cover" />
                              <span className={`absolute top-2 left-2 text-xs px-2 py-0.5 rounded-full capitalize shadow ${
                                event.status === 'upcoming' ? 'bg-green-100 text-green-800' :
                                event.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                                event.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                                event.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {event.status}
                              </span>
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                              {/* ...existing card info... */}
                              <h4 className="text-base font-bold text-gray-900 mb-1 truncate" title={event.title}>{event.title}</h4>
                              <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                                <Calendar className="w-4 h-4" />
                                <span>{formatDate(event.event_date)}</span>
                              </div>
                              {/* Time row with clock icon and duration */}
                              {event.event_time && (
                                <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                                  <span>{formatTime(event.event_time)}{event.duration ? ` • ${event.duration}` : ''}</span>
                                </div>
                              )}
                              <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                                <Tag className="w-4 h-4 text-gray-400 mr-1" />
                                <span className="font-medium">{event.category}</span>
                              </div>
                              {/* Attendees (capacity) */}
                              {typeof event.capacity !== 'undefined' && (
                                <div className="flex items-center gap-1 text-xs text-gray-600 mb-1">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-5a4 4 0 11-8 0 4 4 0 018 0zm6 6v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2a2 2 0 012-2h2a2 2 0 012 2z" /></svg>
                                  <span>{event.capacity} Attendees</span>
                                </div>
                              )}
                              {/* Price */}
                              <div className="flex items-center gap-1 text-xs text-green-600 mb-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 12v4" /></svg>
                                <span>{priceDisplay}</span>
                              </div>
                              {/* Location with map link */}
                              {event.location && (
                                <div className="flex items-center gap-1 text-xs text-blue-700 mb-1">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" /><circle cx="12" cy="10" r="3" /></svg>
                                  <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline hover:text-blue-900"
                                  >
                                    {event.location}
                                  </a>
                                </div>
                              )}
                              <a href={`/events/${event.slug || ''}`} className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-center rounded-lg py-2 text-sm font-semibold transition-colors">View Details</a>
                            </div>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  ) : (
                    <motion.div
                      className="text-center py-12"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">No events found</h3>
                      <p className="text-gray-500">
                        Try adjusting your filters or search terms to find more events.
                      </p>
                    </motion.div>
                  )}
                  <style>{`
                    .no-scrollbar::-webkit-scrollbar { display: none; }
                    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                  `}</style>
                </motion.div>
              </AnimatePresence>
      {/* Mobile: Right-side Filter Drawer */}
      <AnimatePresence>
        {showMobileRightFilter && (
          <motion.div
            className="fixed inset-0 z-50 flex items-stretch justify-end md:hidden"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
              onClick={() => setShowMobileRightFilter(false)}
            />
            {/* Drawer */}
            <motion.div
              className="relative h-full w-5/6 max-w-xs bg-white shadow-2xl rounded-l-3xl p-6 animate-slideInRight flex flex-col"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Filter className="w-5 h-5" /> Filters
                </h3>
                <button
                  onClick={() => setShowMobileRightFilter(false)}
                  className="text-gray-400 hover:text-gray-700 rounded-full p-2"
                  aria-label="Close Filters"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <EventFilters events={events} onFilteredEvents={handleFilteredEvents} />
              </div>
              <button
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-lg shadow active:scale-95 transition-all"
                onClick={() => setShowMobileRightFilter(false)}
              >
                Apply
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
              {/* Desktop: Event Cards 2x2 Grid */}
              <div className="hidden md:block md:col-span-2">
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
            {/* ...sticky filter button and bottom drawer removed for mobile... */}
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
          className="hidden md:flex fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg p-3 transition-colors items-center justify-center"
          title="Back to Top"
          aria-label="Back to Top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
        </button>
      )}
      {/* Mobile filter drawer animation */}
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slideUp {
          animation: slideUp 0.3s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </div>
  );
};

export default EventsPage;