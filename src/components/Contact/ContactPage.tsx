import React, { useState, useEffect, useRef } from 'react';
import { MapPin, X, ExternalLink, Mail, Phone } from 'lucide-react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import RareMindsLogo from "../../assets/RareMindsLogo.svg";
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
// 🧠 Custom RareMinds Bulb Icon
const RareMindsBulbIcon = ({ className }) => (
  <img src={RareMindsLogo} alt="RareMinds Logo" className={className} />
);

const InteractiveWorldMap = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [hoveredLocation, setHoveredLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [autoIndex, setAutoIndex] = useState(0);

  // 🟢 Track animation state
  const [isPaused, setIsPaused] = useState(false);
  const [showAutoPopup, setShowAutoPopup] = useState(true); // ✅ Added to control popup visibility
  const intervalRef = useRef(null);

  const locations = [
    { id: 'bangalore', name: 'RareMinds Bangalore', city: '231, 13th Cross Road, Hoysala Nagar, Indiranagar, Bangalore - 560038', country: 'India', position: { top: '53.4%', left: '68%' }, mapLink: 'https://www.google.com/maps/search/location+of+rareminds+in+bangalore/@12.9752479,77.631305,3232m/data=!3m2!1e3!4b1?entry=ttu&g_ep=EgoyMDI1MTAyOC4wIKXMDSoASAFQAw%3D%3D', email: 'marketing@rareminds.in', phone: '+91 9562481110' },
    { id: 'goa', name: 'RareMinds Goa', city: 'Goa', country: 'India', position: { top: '53.5%', left: '67.3%' }, mapLink: 'https://www.google.com/maps/search/RareMinds+Goa+India', email: 'marketing@rareminds.in', phone: '+91 xxx xxx xxxx' },
    { id: 'delhi', name: 'RareMinds Delhi', city: 'Delhi', country: 'India', position: { top: '50%', left: '68.6%' }, mapLink: 'https://www.google.com/maps/search/RareMinds+Delhi+India', email: 'marketing@rareminds.in', phone: '+91 xxx xxx xxxx' },
    { id: 'mumbai', name: 'RareMinds Mumbai', city: 'Mumbai, Maharashtra', country: 'India', position: { top: '49.9%', left: '67.1%' }, mapLink: 'https://www.google.com/maps/search/RareMinds+Mumbai+India', email: 'marketing@rareminds.in', phone: '+91 xxx xxx xxxx' },
    { id: 'pune', name: 'RareMinds Pune', city: 'Pune, Maharashtra', country: 'India', position: { top: '51%', left: '67.1%' }, mapLink: 'https://www.google.com/maps/search/RareMinds+Pune+India', email: 'marketing@rareminds.in', phone: '+91 xxx xxx xxxx' },
    { id: 'salem', name: 'RareMinds Salem', city: 'Salem, Tamil Nadu', country: 'India', position: { top: '56.8%', left: '68.2%' }, mapLink: 'https://www.google.com/maps/search/RareMinds+Salem+Tamil+Nadu+India', email: 'marketing@rareminds.in', phone: '+91 xxx xxx xxxx' },
    { id: 'vellore', name: 'RareMinds Vellore', city: 'Vellore, Tamil Nadu', country: 'India', position: { top: '55.5%', left: '68.8%' }, mapLink: 'https://www.google.com/maps/search/RareMinds+Vellore+Tamil+Nadu+India', email: 'marketing@rareminds.in', phone: '+91 xxx xxx xxxx' },
    { id: 'coimbatore', name: 'RareMinds Coimbatore', city: 'Coimbatore, Tamil Nadu', country: 'India', position: { top: '54.9%', left: '68.8%' }, mapLink: 'https://www.google.com/maps/search/RareMinds+Coimbatore+Tamil+Nadu+India', email: 'marketing@rareminds.in', phone: '+91 xxx xxx xxxx' },
    { id: 'madurai', name: 'RareMinds Madurai', city: 'Madurai, Tamil Nadu', country: 'India', position: { top: '56.1%', left: '68.5%' }, mapLink: 'https://www.google.com/maps/search/RareMinds+Madurai+Tamil+Nadu+India', email: 'marketing@rareminds.in', phone: '+91 xxx xxx xxxx' },
    { id: 'tirunelveli', name: 'RareMinds Tirunelveli', city: 'Tirunelveli, Tamil Nadu', country: 'India', position: { top: '56.5%', left: '68.5%' }, mapLink: 'https://www.google.com/maps/search/RareMinds+Tirunelveli+Tamil+Nadu+India', email: 'marketing@rareminds.in', phone: '+91 xxx xxx xxxx' },
    { id: 'karaikudi', name: 'RareMinds Karaikudi', city: 'Karaikudi, Tamil Nadu', country: 'India', position: { top: '55.2%', left: '69%' }, mapLink: 'https://www.google.com/maps/search/RareMinds+Karaikudi+Tamil+Nadu+India', email: 'marketing@rareminds.in', phone: '+91 xxx xxx xxxx' },
    { id: 'dubai', name: 'RareMinds Dubai', city: 'Dubai', country: 'UAE', position: { top: '47%', left: '61.5%' }, mapLink: 'https://www.google.com/maps/search/RareMinds+Dubai+UAE', email: 'dubai@rareminds.in', phone: '+971 xxx xxx xxxx' },
    { id: 'abudhabi', name: 'RareMinds Abu Dhabi', city: 'Abu Dhabi', country: 'UAE', position: { top: '47.2%', left: '60.7%' }, mapLink: 'https://www.google.com/maps/search/RareMinds+Abu+Dhabi+UAE', email: 'marketing@rareminds.in', phone: '+971 xxx xxx xxxx' },
    { id: 'sharjah', name: 'RareMinds Sharjah', city: 'Sharjah', country: 'UAE', position: { top: '48.3%', left: '61.7%' }, mapLink: 'https://www.google.com/maps/search/RareMinds+Sharjah+UAE', email: 'marketing@rareminds.in', phone: '+971 xxx xxx xxxx' },
    { id: 'uk', name: 'RareMinds UK', city: 'London', country: 'United Kingdom', position: { top: '22%', left: '42.8%' }, mapLink: 'https://www.google.com/maps/search/RareMinds+London+UK', email: 'marketing@rareminds.in', phone: '+44 xxx xxx xxxx' },
    { id: 'newyork', name: 'RareMinds New York', city: 'New York, NY', country: 'United States', position: { top: '37%', left: '19%' }, mapLink: 'https://www.google.com/maps/search/RareMinds+New+York+NY+USA', email: 'marketing@rareminds.in', phone: '+1 xxx xxx xxxx' },
    { id: 'portland', name: 'RareMinds Portland', city: 'Portland, OR', country: 'United States', position: { top: '30.5%', left: '5%' }, mapLink: 'https://www.google.com/maps/search/RareMinds+Portland+OR+USA', email: 'marketing@rareminds.in', phone: '+1 xxx xxx xxxx' },
  ];

  // 🟢 Auto animation effect (with popup)
  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(() => {
      setAutoIndex((prev) => (prev + 1) % locations.length);
      setShowAutoPopup(true); // ✅ Show popup during animation
      setTimeout(() => setShowAutoPopup(false), 1400); // hide before next cycle
    }, 1500);
    return () => clearInterval(intervalRef.current);
  }, [isPaused, locations.length]);

  // 🟢 Pause/resume handlers
  const handleMouseEnter = (id) => {
    setHoveredLocation(id);
    setIsPaused(true);
    clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    setHoveredLocation(null);
    setIsPaused(false);
  };

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
    setShowPopup(true);
  };

  const handleClose = () => {
    setShowPopup(false);
    setSelectedLocation(null);
  };

  return (
    <div className="bg-white py-5 md:py-18 max-sm:mt-6">
      {/* ✅ Added heading */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-8 text-center">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
            Get in touch with our Global Team
          </h1>
          <p className="text-sm md:text-base text-gray-500 mt-7">
            We'd love to hear from you. Here's how you can reach us.
          </p>
        </div>
      </div>

      <div className="max-w-full mx-auto px-1 sm:px-4 md:px-6 py-3 md:py-12 max-sm-mt-10">
        <div className="bg-white rounded-xl md:rounded-2xl p-2 sm:p-4 md:p-8 relative overflow-hidden">
          {/* <div className="relative w-full aspect-[16/9] md:aspect-[2/1] bg-gray-50 rounded-lg md:rounded-xl overflow-hidden"> */}
            {/* <ComposableMap
              projection="geoMercator"
              projectionConfig={{ scale: 147, center: [20, 20] }}
              width={790}
              height={400}
              className="w-full h-full opacity-40"
            > */}
            <div className="relative mx-auto w-[98%] max-sm:w-[100%] md:w-[88%] lg:w-[90%] bg-gray-50 rounded-lg md:rounded-xl overflow-hidden">
  <ComposableMap
    projection="geoMercator"
    projectionConfig={{ scale: 130, center: [20, 20] }}
    width={720}
    height={380}
    className="w-full h-auto opacity-40"
  >

              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography key={geo.rsmKey} geography={geo} fill="#E5E7EB" stroke="none" />
                  ))
                }
              </Geographies>
            </ComposableMap>

            {/* Markers */}
            {locations.map((location, index) => {
              const isHovered = hoveredLocation === location.id;
              const isAuto = autoIndex === index;
              const isMajor = ['portland', 'newyork', 'uk', 'dubai', 'abudhabi', 'sharjah', 'bangalore'].includes(location.id);
              return (
                <div
                  key={location.id}
                  className="absolute cursor-pointer group transition-all"
                  style={{ top: location.position.top, left: location.position.left, transform: 'translate(-50%, -50%)' }}
                  onMouseEnter={() => handleMouseEnter(location.id)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleMarkerClick(location)}
                >
                  <div className="relative">
                    <div className="transition-all">
                      <RareMindsBulbIcon
                        className={`transition-all duration-200 ${
                          isMajor
                            ? "w-[19px] h-[19px] max-sm:w-[8px] max-sm:h-[8px] md:w-[10px] md:h-[10px] lg:w-[30px] lg:h-[30px]"
                            : "w-[2px] h-[2px] sm:w-[3px] sm:h-[3px] md:w-[4px] md:h-[4px]"
                        }`}
                      />
                    </div>

                    {/* ✅ Tooltip visible on hover OR during auto animation */}

{(isHovered || (isAuto && showAutoPopup)) && (
  <div
    className={`absolute ${
      location.id === "portland"
        ? // ✅ PORTLAND fixed for all screens
          "top-[110%] left-2 -translate-x-1/2 px-2 py-1.5 md:top-[110%] md:left-1/2 md:-translate-x-1/2 max-sm:top[90] max-sm:left-[45%] max-sm:-translate-x-1/2 max-sm:px-1 max-sm:py-0.5"
        : // other locations
          "top-full left-1/2 -translate-x-1/2 px-3 py-2 lg:px-3 lg:py-2 md:px-2 md:py-1 max-sm:px-1 max-sm:py-0.5"
    } 
    mt-2 bg-gray-900 text-white rounded-lg max-sm:rounded-md text-xs lg:text-xs md:text-xs max-sm:text-[5px] font-medium whitespace-nowrap shadow-xl max-sm:shadow-md z-50 max-sm:z-40 animate-fade`}
  >

    {/* Location Name */}
    <div
      className={`font-semibold ${
        location.id === "portland"
          ? "text-[11.5px] lg:text-[11.5px] md:text-[7.5px] max-sm:text-[5px]"
          : "text-[12px] lg:text-[12px] md:text-[11px] max-sm:text-[8px]"
      }`}
    >
      {location.name}
    </div>

    {/* City / Address */}
    <div
      className={`text-gray-300 ${
        location.id === "portland"
          ? "text-[10.5px] lg:text-[10.5px] md:text-[7.5px] max-sm:text-[5px]"
          : "text-[11px] lg:text-[11px] md:text-[10px] max-sm:text-[8px]"
      }`}
      style={
        location.id === "bangalore"
          ? {
              whiteSpace: "normal",
              width: "220px",
              textAlign: "left",
              lineHeight: "1.2",
            }
          : {}
      }
    >
      {location.id === "bangalore"
        ? `231, 13th Cross Road, Hoysala Nagar,
Indiranagar, Bangalore - 560038`
        : location.city}
    </div>

    {/* Details Link */}
    <div
      className={`text-blue-300 mt-1 ${
        location.id === "portland"
          ? "text-[10px] lg:text-[10px] md:text-[9px] max-sm:text-[8px]"
          : "text-[10.5px] lg:text-[10.5px] md:text-[9.5px] max-sm:text-[8.5px]"
      }`}
    >
      Click for details
    </div>

    {/* Tooltip Arrow */}
    <div
      className={`absolute -top-1 ${
        location.id === "portland"
          ? // ✅ Centered arrow for all screens
            "left-1/2 -translate-x-1/2"
          : "left-1/2 -translate-x-1/2"
      } w-2 h-2 lg:w-2 lg:h-2 md:w-1.5 md:h-1.5 max-sm:w-1 max-sm:h-1 bg-gray-900 rotate-45`}
    ></div>
  </div>
)}


                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Popup */}
      {showPopup && selectedLocation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg p-4 sm:p-6 md:p-8 relative animate-in max-h-[90vh] overflow-y-auto">
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <div className="text-center mb-4 sm:mb-6">
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-blue-100 rounded-full mb-3 sm:mb-4">
                <RareMindsBulbIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-blue-600" />
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
                {selectedLocation.name}
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-gray-500">
                Our office in {selectedLocation.country}
              </p>
            </div>

            <div className="space-y-2 sm:space-y-3 md:space-y-4 mb-4 sm:mb-6">
              <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 md:p-4 bg-gray-50 rounded-lg">
                <MapPin className="w-4 sm:w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900 mb-0.5 text-xs sm:text-sm md:text-base">
                    Address
                  </p>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Rareminds Pvt. Ltd.<br />
                    {selectedLocation.city}<br />
                    {selectedLocation.country}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 md:p-4 bg-gray-50 rounded-lg">
                <Mail className="w-4 sm:w-5 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900 mb-0.5 text-xs sm:text-sm md:text-base">
                    Email
                  </p>
                  <p className="text-gray-600 text-xs sm:text-sm">{selectedLocation.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 md:p-4 bg-gray-50 rounded-lg">
                <Phone className="w-4 sm:w-5 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900 mb-0.5 text-xs sm:text-sm md:text-base">
                    Phone
                  </p>
                  <p className="text-gray-600 text-xs sm:text-sm">{selectedLocation.phone}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <a
                href={selectedLocation.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white font-semibold py-2 sm:py-2.5 md:py-3 px-4 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base shadow-md"
              >
                View on Google Maps
                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>

              <a
                href="https://rareminds.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-gray-100 text-gray-700 font-semibold py-2 sm:py-2.5 md:py-3 px-4 rounded-lg hover:bg-gray-200 transition text-sm sm:text-base"
              >
                Visit RareMinds Website
                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>
        </div>
      )}
        <div className="mb-10">
        <p className="text-center text-gray-500 text-xs md:text-sm mt-4 md:mt-6 px-4 max-sm:mt-8">
          Tap or hover over the location markers to see office names, then click to view full details.
        </p>
        </div>
    </div>
  );
};

export default InteractiveWorldMap;