import React, { useState, useCallback, useRef } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { motion } from 'framer-motion';
import { Search, Calendar, Users, MapPin } from 'lucide-react';
import { EventLocation } from '../types/event';
import { EventModal } from './EventModal';
import { eventLocations } from '../Data/eventLocations';

const mapContainerStyle = {
  width: '100%',
  height: '600px',
};

const center = {
  lat: 11.1271,
  lng: 78.6569,
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: [
    {
      featureType: 'all',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#6c7280' }],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#dbeafe' }],
    },
  ],
};

export function MapSection() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
  });

  const [selectedEvent, setSelectedEvent] = useState<EventLocation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState<'2024' | '2025'>('2024');
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set(['hackathon', 'workshop', 'training']));

  const mapRef = useRef<google.maps.Map>();
  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const filteredEvents = eventLocations.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedTypes.has(event.type);
    const matchesYear = event.date.startsWith(selectedYear);
    return matchesSearch && matchesType && matchesYear;
  });

  const toggleEventType = (type: string) => {
    const newTypes = new Set(selectedTypes);
    if (newTypes.has(type)) {
      newTypes.delete(type);
    } else {
      newTypes.add(type);
    }
    setSelectedTypes(newTypes);
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Event Locations
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Explore our events across Tamil Nadu
          </p>
        </motion.div>

        <div className="mb-8 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search events or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-full border border-gray-300 pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-gray-100 rounded-full p-1">
                <button
                  onClick={() => setSelectedYear('2024')}
                  className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedYear === '2024'
                      ? 'bg-white text-blue-600 shadow'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  2024
                </button>
                <button
                  onClick={() => setSelectedYear('2025')}
                  className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedYear === '2025'
                      ? 'bg-white text-blue-600 shadow'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  2025
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {['hackathon', 'workshop', 'training'].map((type) => (
              <button
                key={type}
                onClick={() => toggleEventType(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedTypes.has(type)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}s
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-lg overflow-hidden shadow-lg">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={7}
            center={center}
            options={options}
            onLoad={onMapLoad}
          >
            {filteredEvents.map((event) => (
              <Marker
                key={event.id}
                position={{ lat: event.latitude, lng: event.longitude }}
                onClick={() => setSelectedEvent(event)}
                icon={{
                  url: `/markers/${event.type}.svg`,
                  scaledSize: new window.google.maps.Size(30, 30),
                }}
              />
            ))}

            {selectedEvent && (
              <InfoWindow
                position={{ lat: selectedEvent.latitude, lng: selectedEvent.longitude }}
                onCloseClick={() => setSelectedEvent(null)}
              >
                <div className="p-2">
                  <h3 className="font-semibold text-gray-900">{selectedEvent.name}</h3>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(selectedEvent.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      {selectedEvent.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-1" />
                      {selectedEvent.participants}+ participants
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setIsModalOpen(true);
                      setSelectedEvent(null);
                    }}
                    className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    View Details →
                  </button>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </div>

        <EventModal
          isOpen={isModalOpen}
          event={selectedEvent}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedEvent(null);
          }}
        />
      </div>
    </div>
  );
}