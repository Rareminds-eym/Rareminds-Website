import React from 'react';
import { MapPin, ExternalLink, Navigation } from 'lucide-react';

interface EventMapProps {
  location: string;
  locationGeo?: { lat: number; lng: number };
  eventTitle: string;
}

const EventMap: React.FC<EventMapProps> = ({ location, locationGeo, eventTitle }) => {
  // If no coordinates available, show location info only
  if (!locationGeo || !locationGeo.lat || !locationGeo.lng) {
    return (
      <div className="backdrop-blur-xl bg-white/95 rounded-3xl p-6 border border-white/20">
        <h3 className="text-2xl font-bold text-slate-900">Event Location</h3>
        <div className="mt-2 h-1 w-16 bg-green-600 rounded-full"></div>
        
        <div className="text-center py-8 mt-6">
          <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg font-medium mb-2">{location}</p>
          <p className="text-gray-500 text-sm">Map coordinates not available</p>
          
          {/* Search Location Button */}
          <button
            onClick={() => {
              const searchUrl = `https://www.google.com/maps/search/${encodeURIComponent(location)}`;
              window.open(searchUrl, '_blank');
            }}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg transition-all duration-300 text-sm font-medium"
          >
            <ExternalLink className="w-4 h-4" />
            Search Location
          </button>
        </div>
      </div>
    );
  }

  const { lat, lng } = locationGeo;

  return (
    <div className="backdrop-blur-xl bg-white/95 rounded-3xl p-6 border border-white/20">
      <h3 className="text-2xl font-bold text-slate-900">Event Location</h3>
      <div className="mt-2 h-1 w-16 bg-green-600 rounded-full"></div>
      
      {/* Location Address */}
      <div className="mt-6 mb-4 p-3 bg-gradient-to-r from-green-50/80 to-emerald-50/80 rounded-2xl border border-green-200/30">
        <p className="text-green-800 font-medium text-sm">{location}</p>
      </div>
      
      {/* Static Map Preview */}
      <div className="h-64 w-full rounded-2xl overflow-hidden border border-gray-200 mb-4 relative">
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${lng-0.01},${lat-0.01},${lng+0.01},${lat+0.01}&layer=mapnik&marker=${lat},${lng}`}
        ></iframe>
        
        {/* Map Overlay */}
        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
          <p className="text-xs font-medium text-gray-700">{eventTitle}</p>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="space-y-2">
        <button
          onClick={() => {
            const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
            window.open(googleMapsUrl, '_blank');
          }}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-2xl transition-all duration-300 transform hover:scale-[1.02] font-medium"
        >
          <Navigation className="w-4 h-4" />
          Get Directions
        </button>
        
        <button
          onClick={() => {
            const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
            window.open(googleMapsUrl, '_blank');
          }}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-xl transition-all duration-300 font-medium text-sm"
        >
          <ExternalLink className="w-4 h-4" />
          View in Google Maps
        </button>
      </div>
    </div>
  );
};

export default EventMap;