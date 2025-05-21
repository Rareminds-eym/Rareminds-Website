import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Users } from 'lucide-react';
import { EventLocation } from '../types/event';

interface EventModalProps {
  isOpen: boolean;
  event: EventLocation | null;
  onClose: () => void;
}

export function EventModal({ isOpen, event, onClose }: EventModalProps) {
  if (!event) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-25"
              onClick={onClose}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl rounded-2xl bg-white p-8 shadow-xl"
            >
              <button
                onClick={onClose}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="aspect-w-16 aspect-h-9 relative mb-6 overflow-hidden rounded-lg">
                <img
                  src={event.images[0]}
                  alt={event.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <h3 className="text-2xl font-bold text-gray-900">{event.name}</h3>
              
              <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex items-center text-gray-500">
                  <Calendar className="h-5 w-5 mr-2" />
                  {new Date(event.date).toLocaleDateString()}
                </div>
                <div className="flex items-center text-gray-500">
                  <MapPin className="h-5 w-5 mr-2" />
                  {event.location}
                </div>
                <div className="flex items-center text-gray-500">
                  <Users className="h-5 w-5 mr-2" />
                  {event.participants}+ participants
                </div>
              </div>

              <p className="mt-4 text-gray-600">{event.description}</p>

              <div className="mt-6">
                <h4 className="font-semibold text-gray-900">Event Highlights</h4>
                <ul className="mt-2 space-y-2">
                  {event.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                {event.images.map((image, index) => (
                  <div key={index} className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg">
                    <img
                      src={image}
                      alt={`${event.name} - Image ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={onClose}
                  className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}