import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEvents } from '../../hooks/Events/useEvent';
import EventCard from './EventCard';
import EventFilters from './EventFilters';
import { Loader2, Filter, X } from 'lucide-react';

const EventsGridPage: React.FC = () => {
  const { events, loading, error } = useEvents();
  // Removed lazy loading: show all events
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState(events);

  // Always show all events by default; update filteredEvents when events change
  useEffect(() => {
    setFilteredEvents(events);
  }, [events]);

  // Removed lazy loading effect

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600 mt-8">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">All Events</h2>
          <button
            className="p-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
            aria-label="Open Filters"
            onClick={() => setShowFilterDrawer(true)}
          >
            <Filter className="w-6 h-6 text-blue-600" />
          </button>
        </div>
        {/* Right-side Filter Drawer */}
        <AnimatePresence>
          {showFilterDrawer && (
            <motion.div
              className="fixed inset-0 z-50 flex items-stretch justify-end"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Overlay */}
              <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={() => setShowFilterDrawer(false)}
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
                    onClick={() => setShowFilterDrawer(false)}
                    className="text-gray-400 hover:text-gray-700 rounded-full p-2"
                    aria-label="Close Filters"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <EventFilters events={events} onFilteredEvents={setFilteredEvents} />
                </div>
                <button
                  className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-lg shadow active:scale-95 transition-all"
                  onClick={() => setShowFilterDrawer(false)}
                >
                  Apply
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {filteredEvents.map((event, idx) => (
            <div className="bg-white rounded-xl shadow  md:p-3 flex flex-col min-h-[320px] max-h-[420px] justify-between" style={{ minWidth: 0 }}>
              <EventCard key={event.id || idx} event={event} compact />
            </div>
          ))}
        </div>
      </div>
      {/* Back to Top Button */}
      <button
        onClick={handleBackToTop}
        className="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg p-3 transition-colors items-center justify-center"
        title="Back to Top"
        aria-label="Back to Top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
      </button>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default EventsGridPage;
