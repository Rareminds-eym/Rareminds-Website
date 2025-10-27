// import React, { useState } from 'react';
// import { MapPin, X, ExternalLink, Mail, Phone } from 'lucide-react';

// const InteractiveWorldMap = () => {
//   const [showPopup, setShowPopup] = useState(false);
//   const [hoveredLocation, setHoveredLocation] = useState(null);
//   const [selectedLocation, setSelectedLocation] = useState(null);

//   const locations = [
//     {
//       id: 'india',
//       name: 'RareMinds India',
//       city: 'Bangalore, Karnataka',
//       country: 'India',
//       position: { top: '49%', left: '67%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+Bangalore+Karnataka+India',
//       email: 'contact@rareminds.com',
//       phone: '+91 xxx xxx xxxx',
//       isPrimary: true
//     },
//     {
//       id: 'usa',
//       name: 'RareMinds USA',
//       city: 'New York, NY',
//       country: 'United States',
//       position: { top: '35%', left: '18%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+New+York+NY+USA',
//       email: 'usa@rareminds.com',
//       phone: '+1 xxx xxx xxxx',
//       isPrimary: true
//     },
//     {
//       id: 'russia',
//       name: 'RareMinds Russia',
//       city: 'Moscow',
//       country: 'Russia',
//       position: { top: '28%', left: '54%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+Moscow+Russia',
//       email: 'russia@rareminds.com',
//       phone: '+7 xxx xxx xxxx',
//       isPrimary: true
//     },
//     {
//       id: 'southeast-asia',
//       name: 'RareMinds Southeast Asia',
//       city: 'Singapore',
//       country: 'Singapore',
//       position: { top: '58%', left: '75%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+Singapore',
//       email: 'sea@rareminds.com',
//       phone: '+65 xxx xxx xxxx',
//       isPrimary: true
//     },
//     {
//       id: 'africa',
//       name: 'RareMinds Africa',
//       city: 'Nairobi',
//       country: 'Kenya',
//       position: { top: '58%', left: '52%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+Nairobi+Kenya',
//       email: 'africa@rareminds.com',
//       phone: '+254 xxx xxx xxxx',
//       isPrimary: true
//     }
//   ];

//   const handleMarkerClick = (location) => {
//     setSelectedLocation(location);
//     setShowPopup(true);
//   };

//   const handleClose = () => {
//     setShowPopup(false);
//     setSelectedLocation(null);
//   };

//   return (
//     <div className="min-h-screen bg-white-50 py-6 md:py-12">
//       {/* Header Section */}
//       <div className="bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
//           <h1 className="text-2xl md:text-4xl font-bold text-gray-900 text-center mb-2">
//             Get in touch with our Global Team
//           </h1>
//           <p className="text-sm md:text-base text-gray-500 text-center">
//             We'd love to hear from you. Here's how you can reach us.
//           </p>
//         </div>
//       </div>

//       {/* Map Section */}
//       <div className="max-w-full mx-auto px-4 md:px-6 py-6 md:py-12">
//         <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-200 p-4 md:p-8 relative overflow-hidden">
//           {/* World Map Background */}
//           <div className="relative w-full h-[400px] md:h-[700px] bg-gray-50 rounded-lg md:rounded-xl overflow-hidden">
//             {/* Clear World Map Image */}
//             <img
//               src="https://c8.alamy.com/comp/2H49BK0/world-map-separate-continents-blue-background-blank-2H49BK0.jpg"
//               alt="World Map"
//               className="w-full h-full object-cover opacity-40"
//             />
            
//             {/* Location Markers */}
//             {locations.map((location) => (
//               <div key={location.id}>
//                 {/* Highlight Overlay for all locations */}
//                 <div 
//                   className="absolute bg-blue-200 opacity-50 animate-pulse"
//                   style={{
//                     top: `calc(${location.position.top} - 12px)`,
//                     left: `calc(${location.position.left} - 10px)`,
//                     width: '30px',
//                     height: '40px',
//                     clipPath: 'polygon(50% 0%, 70% 25%, 85% 50%, 80% 75%, 50% 100%, 20% 75%, 15% 50%, 30% 25%)',
//                     filter: 'blur(6px)'
//                   }}
//                 ></div>

//                 {/* Location Marker */}
//                 <div 
//                   className="absolute cursor-pointer group"
//                   style={{ 
//                     top: location.position.top, 
//                     left: location.position.left, 
//                     transform: 'translate(-50%, -50%)',
//                     zIndex: hoveredLocation === location.id ? 20 : 10
//                   }}
//                   onMouseEnter={() => setHoveredLocation(location.id)}
//                   onMouseLeave={() => setHoveredLocation(null)}
//                   onClick={() => handleMarkerClick(location)}
//                 >
//                   {/* Pulsing Ring Effect for all locations */}
//                   <div className="absolute inset-0 -m-2 md:-m-4">
//                     <div className="w-8 h-8 md:w-16 md:h-16 bg-blue-500 rounded-full opacity-20 animate-ping"></div>
//                   </div>
                  
//                   {/* Marker Pin - All same color */}
//                   <div className="relative">
//                     <div className="bg-gray-400 rounded-full p-1.5 md:p-3 shadow-lg transform transition-all group-hover:scale-100 group-hover:bg-blue-700">
//                       <MapPin className="w-4 h-4 md:w-6 md:h-6 text-white fill-white" />
//                     </div>
                    
//                     {/* Hover Popup */}
//                     {hoveredLocation === location.id && (
//                       <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-900 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium whitespace-nowrap shadow-xl z-50 animate-in">
//                         <div className="font-semibold">{location.name}</div>
//                         <div className="text-xs text-gray-300">{location.city}</div>
//                         <div className="text-xs text-blue-300 mt-1">Click for details</div>
//                         <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Popup Modal */}
//           {showPopup && selectedLocation && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//               <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl max-w-lg w-full p-6 md:p-8 relative animate-in max-h-[90vh] overflow-y-auto">
//                 {/* Close Button */}
//                 <button
//                   onClick={handleClose}
//                   className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
//                 >
//                   <X className="w-5 h-5 md:w-6 md:h-6" />
//                 </button>

//                 {/* Popup Header */}
//                 <div className="text-center mb-6">
//                   <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full mb-4">
//                     <MapPin className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
//                   </div>
//                   <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
//                     {selectedLocation.name}
//                   </h2>
//                   <p className="text-sm md:text-base text-gray-500">
//                     Our office in {selectedLocation.country}
//                   </p>
//                 </div>

//                 {/* Address Details */}
//                 <div className="space-y-3 md:space-y-4 mb-6">
//                   <div className="flex items-start gap-3 p-3 md:p-4 bg-gray-50 rounded-lg">
//                     <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
//                     <div>
//                       <p className="font-medium text-gray-900 mb-1 text-sm md:text-base">Address</p>
//                       <p className="text-gray-600 text-xs md:text-sm">
//                         RareMinds Technology Solutions<br />
//                         {selectedLocation.city}<br />
//                         {selectedLocation.country}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3 p-3 md:p-4 bg-gray-50 rounded-lg">
//                     <Mail className="w-5 h-5 text-blue-600 flex-shrink-0" />
//                     <div>
//                       <p className="font-medium text-gray-900 mb-1 text-sm md:text-base">Email</p>
//                       <p className="text-gray-600 text-xs md:text-sm">{selectedLocation.email}</p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3 p-3 md:p-4 bg-gray-50 rounded-lg">
//                     <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
//                     <div>
//                       <p className="font-medium text-gray-900 mb-1 text-sm md:text-base">Phone</p>
//                       <p className="text-gray-600 text-xs md:text-sm">{selectedLocation.phone}</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="space-y-3">
//                   <a
//                     href={selectedLocation.mapLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white font-semibold py-2.5 md:py-3 px-4 md:px-6 rounded-lg hover:bg-blue-700 transition-colors shadow-lg text-sm md:text-base"
//                   >
//                     View on Google Maps
//                     <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
//                   </a>
                  
//                   <a
//                     href="https://rareminds.in"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex items-center justify-center gap-2 w-full bg-gray-100 text-gray-700 font-semibold py-2.5 md:py-3 px-4 md:px-6 rounded-lg hover:bg-gray-200 transition-colors text-sm md:text-base"
//                   >
//                     Visit RareMinds Website
//                     <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
//                   </a>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Bottom Info Text */}
//         <p className="text-center text-gray-500 text-xs md:text-sm mt-4 md:mt-6 px-4">
//           Hover over the location markers to see office names, then click to view full details and map links
//         </p>
//       </div>
//     </div>
//   );
// };

// export default InteractiveWorldMap;


import React, { useState } from 'react';
import { MapPin, X, ExternalLink, Mail, Phone } from 'lucide-react';

const InteractiveWorldMap = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [hoveredLocation, setHoveredLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const locations = [
    {
      id: 'india',
      name: 'RareMinds India',
      city: 'Bangalore, Karnataka',
      country: 'India',
      position: { top: '49%', left: '67%' },
      mapLink: 'https://www.google.com/maps/search/RareMinds+Bangalore+Karnataka+India',
      email: 'contact@rareminds.com',
      phone: '+91 xxx xxx xxxx',
      isPrimary: true,
    },
    {
      id: 'usa',
      name: 'RareMinds USA',
      city: 'New York, NY',
      country: 'United States',
      position: { top: '35%', left: '18%' },
      mapLink: 'https://www.google.com/maps/search/RareMinds+New+York+NY+USA',
      email: 'usa@rareminds.com',
      phone: '+1 xxx xxx xxxx',
      isPrimary: true,
    },
    {
      id: 'russia',
      name: 'RareMinds Russia',
      city: 'Moscow',
      country: 'Russia',
      position: { top: '28%', left: '54%' },
      mapLink: 'https://www.google.com/maps/search/RareMinds+Moscow+Russia',
      email: 'russia@rareminds.com',
      phone: '+7 xxx xxx xxxx',
      isPrimary: true,
    },
    {
      id: 'southeast-asia',
      name: 'RareMinds Southeast Asia',
      city: 'Singapore',
      country: 'Singapore',
      position: { top: '58%', left: '75%' },
      mapLink: 'https://www.google.com/maps/search/RareMinds+Singapore',
      email: 'sea@rareminds.com',
      phone: '+65 xxx xxx xxxx',
      isPrimary: true,
    },
    {
      id: 'africa',
      name: 'RareMinds Africa',
      city: 'Nairobi',
      country: 'Kenya',
      position: { top: '58%', left: '52%' },
      mapLink: 'https://www.google.com/maps/search/RareMinds+Nairobi+Kenya',
      email: 'africa@rareminds.com',
      phone: '+254 xxx xxx xxxx',
      isPrimary: true,
    },
  ];

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
    setShowPopup(true);
  };

  const handleClose = () => {
    setShowPopup(false);
    setSelectedLocation(null);
  };

  return (
    <div className="bg-white py-5 md:py-18">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8 text-center">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
            Get in touch with our Global Team
          </h1>
          <p className="text-sm md:text-base text-gray-500">
            We'd love to hear from you. Here's how you can reach us.
          </p>
        </div>
      </div>

      {/* Map Section */}
      <div className="max-w-full mx-auto px-2 sm:px-4 md:px-6 py-6 md:py-12">
        <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-200 p-2 sm:p-4 md:p-8 relative overflow-hidden">
          {/* World Map */}
          {/* World Map with responsive aspect ratio */}
<div className="relative w-full aspect-[16/9] md:aspect-[2/1] bg-gray-50 rounded-lg md:rounded-xl overflow-hidden">
            <img
              src="https://c8.alamy.com/comp/2H49BK0/world-map-separate-continents-blue-background-blank-2H49BK0.jpg"
              alt="World Map"
              className="w-full h-full object-cover opacity-40"
            />

            {/* Markers */}
            {locations.map((location) => (
              <div key={location.id}>
                <div
                  className="absolute bg-blue-200 opacity-50 animate-pulse"
                  style={{
                    top: `calc(${location.position.top} - 10px)`,
                    left: `calc(${location.position.left} - 8px)`,
                    width: '25px',
                    height: '35px',
                    clipPath:
                      'polygon(50% 0%, 70% 25%, 85% 50%, 80% 75%, 50% 100%, 20% 75%, 15% 50%, 30% 25%)',
                    filter: 'blur(5px)',
                  }}
                ></div>

                <div
                  className="absolute cursor-pointer group"
                  style={{
                    top: location.position.top,
                    left: location.position.left,
                    transform: 'translate(-50%, -50%)',
                    zIndex: hoveredLocation === location.id ? 20 : 10,
                  }}
                  onMouseEnter={() => setHoveredLocation(location.id)}
                  onMouseLeave={() => setHoveredLocation(null)}
                  onTouchStart={() => setHoveredLocation(location.id)}
                  onClick={() => handleMarkerClick(location)}
                >
                  <div className="absolute inset-0 -m-1 sm:-m-2 md:-m-4">
                    <div className="w-5 h-5 sm:w-8 sm:h-8 md:w-16 md:h-16 bg-blue-500 rounded-full opacity-20 animate-ping"></div>
                  </div>

                  <div className="relative">
                    <div className="bg-gray-600 rounded-full p-1 sm:p-1.5 md:p-3 shadow-lg transition-all group-hover:bg-blue-700">
                      <MapPin className="w-2 h-2 sm:w-4 sm:h-4 md:w-6 md:h-6 text-white fill-white" />
                    </div>

                    {/* Tooltip for non-touch only */}
                    <div>
                      {hoveredLocation === location.id && (
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-900 text-white px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap shadow-xl z-50">
                          <div className="font-semibold">{location.name}</div>
                          <div className="text-gray-300">{location.city}</div>
                          <div className="text-blue-300 mt-1">Click for details</div>
                          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Popup Modal */}
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
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-blue-600" />
                  </div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
                    {selectedLocation.name}
                  </h2>
                  <p className="text-xs sm:text-sm md:text-base text-gray-500">
                    Our office in {selectedLocation.country}
                  </p>
                </div>

                {/* Details */}
                <div className="space-y-2 sm:space-y-3 md:space-y-4 mb-4 sm:mb-6">
                  <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 md:p-4 bg-gray-50 rounded-lg">
                    <MapPin className="w-4 sm:w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900 mb-0.5 text-xs sm:text-sm md:text-base">
                        Address
                      </p>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        RareMinds Technology Solutions<br />
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

                {/* Buttons */}
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
        </div>

        <p className="text-center text-gray-500 text-xs md:text-sm mt-4 md:mt-6 px-4">
          Tap or hover over the location markers to see office names, then click to view full details.
        </p>
      </div>
    </div>
  );
};

export default InteractiveWorldMap;
