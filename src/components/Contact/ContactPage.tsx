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


// import React, { useState } from 'react';
// import { MapPin, X, ExternalLink, Mail, Phone } from 'lucide-react';

// const InteractiveWorldMap = () => {
//   const [showPopup, setShowPopup] = useState(false);
//   const [hoveredLocation, setHoveredLocation] = useState(null);
//   const [selectedLocation, setSelectedLocation] = useState(null);

//   const locations = [
//     // India locations
//     {
//       id: 'bangalore',
//       name: 'RareMinds Bangalore',
//       city: 'Bangalore, Karnataka',
//       country: 'India',
//       position: { top: '52%', left: '63.5%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+Bangalore+Karnataka+India',
//       email: 'bangalore@rareminds.com',
//       phone: '+91 xxx xxx xxxx',
//     },
//     {
//       id: 'goa',
//       name: 'RareMinds Goa',
//       city: 'Goa',
//       country: 'India',
//       position: { top: '50.5%', left: '64.5%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+Goa+India',
//       email: 'goa@rareminds.com',
//       phone: '+91 xxx xxx xxxx',
//     },
//     {
//       id: 'delhi',
//       name: 'RareMinds Delhi',
//       city: 'Delhi',
//       country: 'India',
//       position: { top: '46%', left: '67.2%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+Delhi+India',
//       email: 'delhi@rareminds.com',
//       phone: '+91 xxx xxx xxxx',
//     },
//     {
//       id: 'mumbai',
//       name: 'RareMinds Mumbai',
//       city: 'Mumbai, Maharashtra',
//       country: 'India',
//       position: { top: '49.5%', left: '66.2%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+Mumbai+India',
//       email: 'mumbai@rareminds.com',
//       phone: '+91 xxx xxx xxxx',
//     },
//     {
//       id: 'pune',
//       name: 'RareMinds Pune',
//       city: 'Pune, Maharashtra',
//       country: 'India',
//       position: { top: '50%', left: '66.8%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+Pune+India',
//       email: 'pune@rareminds.com',
//       phone: '+91 xxx xxx xxxx',
//     },
//     {
//       id: 'salem',
//       name: 'RareMinds Salem',
//       city: 'Salem, Tamil Nadu',
//       country: 'India',
//       position: { top: '54%', left: '67.8%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+Salem+Tamil+Nadu+India',
//       email: 'salem@rareminds.com',
//       phone: '+91 xxx xxx xxxx',
//     },
//     {
//       id: 'vellore',
//       name: 'RareMinds Vellore',
//       city: 'Vellore, Tamil Nadu',
//       country: 'India',
//       position: { top: '53.5%', left: '68%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+Vellore+Tamil+Nadu+India',
//       email: 'vellore@rareminds.com',
//       phone: '+91 xxx xxx xxxx',
//     },
//     {
//       id: 'coimbatore',
//       name: 'RareMinds Coimbatore',
//       city: 'Coimbatore, Tamil Nadu',
//       country: 'India',
//       position: { top: '54.5%', left: '67.5%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+Coimbatore+Tamil+Nadu+India',
//       email: 'coimbatore@rareminds.com',
//       phone: '+91 xxx xxx xxxx',
//     },
//     {
//       id: 'madurai',
//       name: 'RareMinds Madurai',
//       city: 'Madurai, Tamil Nadu',
//       country: 'India',
//       position: { top: '55.5%', left: '68%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+Madurai+Tamil+Nadu+India',
//       email: 'madurai@rareminds.com',
//       phone: '+91 xxx xxx xxxx',
//     },
//     {
//       id: 'tirunelveli',
//       name: 'RareMinds Tirunelveli',
//       city: 'Tirunelveli, Tamil Nadu',
//       country: 'India',
//       position: { top: '56.2%', left: '67.8%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+Tirunelveli+Tamil+Nadu+India',
//       email: 'tirunelveli@rareminds.com',
//       phone: '+91 xxx xxx xxxx',
//     },
//     {
//       id: 'karaikudi',
//       name: 'RareMinds Karaikudi',
//       city: 'Karaikudi, Tamil Nadu',
//       country: 'India',
//       position: { top: '55.8%', left: '68.2%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+Karaikudi+Tamil+Nadu+India',
//       email: 'karaikudi@rareminds.com',
//       phone: '+91 xxx xxx xxxx',
//     },
//     // UAE locations
//     {
//       id: 'dubai',
//       name: 'RareMinds Dubai',
//       city: 'Dubai',
//       country: 'UAE',
//       position: { top: '47%', left: '61.5%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+Dubai+UAE',
//       email: 'dubai@rareminds.com',
//       phone: '+971 xxx xxx xxxx',
//     },
//     {
//       id: 'abudhabi',
//       name: 'RareMinds Abu Dhabi',
//       city: 'Abu Dhabi',
//       country: 'UAE',
//       position: { top: '47.5%', left: '61%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+Abu+Dhabi+UAE',
//       email: 'abudhabi@rareminds.com',
//       phone: '+971 xxx xxx xxxx',
//     },
//     {
//       id: 'sharjah',
//       name: 'RareMinds Sharjah',
//       city: 'Sharjah',
//       country: 'UAE',
//       position: { top: '47.2%', left: '61.7%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+Sharjah+UAE',
//       email: 'sharjah@rareminds.com',
//       phone: '+971 xxx xxx xxxx',
//     },
//     // UK
//     {
//       id: 'uk',
//       name: 'RareMinds UK',
//       city: 'London',
//       country: 'United Kingdom',
//       position: { top: '32%', left: '48.5%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+London+UK',
//       email: 'uk@rareminds.com',
//       phone: '+44 xxx xxx xxxx',
//     },
//     // USA locations
//     {
//       id: 'newyork',
//       name: 'RareMinds New York',
//       city: 'New York, NY',
//       country: 'United States',
//       position: { top: '36%', left: '22%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+New+York+NY+USA',
//       email: 'newyork@rareminds.com',
//       phone: '+1 xxx xxx xxxx',
//     },
//     {
//       id: 'portland',
//       name: 'RareMinds Portland',
//       city: 'Portland, OR',
//       country: 'United States',
//       position: { top: '33%', left: '14%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+Portland+OR+USA',
//       email: 'portland@rareminds.com',
//       phone: '+1 xxx xxx xxxx',
//     },
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
//     <div className="bg-white py-8 md:py-20">
//       {/* Header */}
//       <div className="bg-white">
//         <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-8 text-center">
//           <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
//             Get in touch with our Global Team
//           </h1>
//           <p className="text-sm md:text-base text-gray-500">
//             We'd love to hear from you. Here's how you can reach us.
//           </p>
//         </div>
//       </div>

//       {/* Map Section */}
//       <div className="max-w-full mx-auto px-2 sm:px-4 md:px-6 py-6 md:py-12">
//         <div className="bg-white rounded-xl md:rounded-2xl p-2 sm:p-4 md:p-8 relative overflow-hidden">
//           {/* World Map */}
//           {/* World Map with responsive aspect ratio */}
// <div className="relative w-full aspect-[16/9] md:aspect-[2/1] bg-gray-50 rounded-lg md:rounded-xl overflow-hidden">
//             <img
//               src="https://c8.alamy.com/comp/2H49BK0/world-map-separate-continents-blue-background-blank-2H49BK0.jpg"
//               alt="World Map"
//               className="w-full h-full object-cover opacity-40"
//             />

//             {/* Markers */}
//             {locations.map((location) => (
//               <div key={location.id}>
//                 <div
//                   className="absolute bg-blue-200 opacity-50 animate-pulse"
//                   style={{
//                     top: `calc(${location.position.top} - 10px)`,
//                     left: `calc(${location.position.left} - 8px)`,
//                     width: '25px',
//                     height: '35px',
//                     clipPath:
//                       'polygon(50% 0%, 70% 25%, 85% 50%, 80% 75%, 50% 100%, 20% 75%, 15% 50%, 30% 25%)',
//                     filter: 'blur(5px)',
//                   }}
//                 ></div>

//                 <div
//                   className="absolute cursor-pointer group"
//                   style={{
//                     top: location.position.top,
//                     left: location.position.left,
//                     transform: 'translate(-50%, -50%)',
//                     zIndex: hoveredLocation === location.id ? 20 : 10,
//                   }}
//                   onMouseEnter={() => setHoveredLocation(location.id)}
//                   onMouseLeave={() => setHoveredLocation(null)}
//                   onTouchStart={() => setHoveredLocation(location.id)}
//                   onClick={() => handleMarkerClick(location)}
//                 >
//                   {/* <div className="absolute inset-0 -m-1 sm:-m-2 md:-m-4">
//                     <div className="w-3 h-3 sm:w-8 sm:h-8 md:w-16 md:h-16 bg-blue-500 rounded-full opacity-20 animate-ping"></div>
//                   </div>

//                   <div className="relative">
//                     <div className="bg-gray-600 rounded-full -p-2 sm:p-1.5 md:p-3 shadow-lg transition-all group-hover:bg-blue-700">
//                       <MapPin className="w-1 h-1 sm:w-4 sm:h-4 md:w-6 md:h-6 text-white fill-white" />
//                     </div> */}
//                     <div className="absolute inset-0 -m-[1px] sm:-m-[2px] md:-m-[3px]">
//   <div className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-blue-500 rounded-full opacity-20 animate-ping"></div>
// </div>

// <div className="relative">
//   <div className="bg-gray-600 rounded-full p-[1px] sm:p-[1.5px] md:p-[2px] shadow-lg transition-all group-hover:bg-blue-700">
//     <MapPin className="w-[6px] h-[6px] sm:w-[8px] sm:h-[8px] md:w-[10px] md:h-[10px] text-white fill-white" />
//   </div>



//                     {/* Tooltip for non-touch only */}
//                     <div>
//                       {hoveredLocation === location.id && (
//                         <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-900 text-white px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap shadow-xl z-50">
//                           <div className="font-semibold">{location.name}</div>
//                           <div className="text-gray-300">{location.city}</div>
//                           <div className="text-blue-300 mt-1">Click for details</div>
//                           <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Popup Modal */}
//           {showPopup && selectedLocation && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
//               <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg p-4 sm:p-6 md:p-8 relative animate-in max-h-[90vh] overflow-y-auto">
//                 <button
//                   onClick={handleClose}
//                   className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
//                 >
//                   <X className="w-5 h-5 md:w-6 md:h-6" />
//                 </button>

//                 <div className="text-center mb-4 sm:mb-6">
//                   <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-blue-100 rounded-full mb-3 sm:mb-4">
//                     <MapPin className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-blue-600" />
//                   </div>
//                   <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
//                     {selectedLocation.name}
//                   </h2>
//                   <p className="text-xs sm:text-sm md:text-base text-gray-500">
//                     Our office in {selectedLocation.country}
//                   </p>
//                 </div>

//                 {/* Details */}
//                 <div className="space-y-2 sm:space-y-3 md:space-y-4 mb-4 sm:mb-6">
//                   <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 md:p-4 bg-gray-50 rounded-lg">
//                     <MapPin className="w-4 sm:w-5 text-blue-600 mt-0.5 flex-shrink-0" />
//                     <div>
//                       <p className="font-medium text-gray-900 mb-0.5 text-xs sm:text-sm md:text-base">
//                         Address
//                       </p>
//                       <p className="text-gray-600 text-xs sm:text-sm">
//                         RareMinds Technology Solutions<br />
//                         {selectedLocation.city}<br />
//                         {selectedLocation.country}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 md:p-4 bg-gray-50 rounded-lg">
//                     <Mail className="w-4 sm:w-5 text-blue-600 flex-shrink-0" />
//                     <div>
//                       <p className="font-medium text-gray-900 mb-0.5 text-xs sm:text-sm md:text-base">
//                         Email
//                       </p>
//                       <p className="text-gray-600 text-xs sm:text-sm">{selectedLocation.email}</p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 md:p-4 bg-gray-50 rounded-lg">
//                     <Phone className="w-4 sm:w-5 text-blue-600 flex-shrink-0" />
//                     <div>
//                       <p className="font-medium text-gray-900 mb-0.5 text-xs sm:text-sm md:text-base">
//                         Phone
//                       </p>
//                       <p className="text-gray-600 text-xs sm:text-sm">{selectedLocation.phone}</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Buttons */}
//                 <div className="space-y-2 sm:space-y-3">
//                   <a
//                     href={selectedLocation.mapLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white font-semibold py-2 sm:py-2.5 md:py-3 px-4 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base shadow-md"
//                   >
//                     View on Google Maps
//                     <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
//                   </a>

//                   <a
//                     href="https://rareminds.in"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex items-center justify-center gap-2 w-full bg-gray-100 text-gray-700 font-semibold py-2 sm:py-2.5 md:py-3 px-4 rounded-lg hover:bg-gray-200 transition text-sm sm:text-base"
//                   >
//                     Visit RareMinds Website
//                     <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
//                   </a>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         <p className="text-center text-gray-500 text-xs md:text-sm mt-4 md:mt-6 px-4">
//           Tap or hover over the location markers to see office names, then click to view full details.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default InteractiveWorldMap;


// import React, { useState } from 'react';
// import { MapPin, X, ExternalLink, Mail, Phone } from 'lucide-react';
// import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

// const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// const InteractiveWorldMap = () => {
//   const [showPopup, setShowPopup] = useState(false);
//   const [hoveredLocation, setHoveredLocation] = useState(null);
//   const [selectedLocation, setSelectedLocation] = useState(null);

  // const locations = [
  //   // India locations
  //   {
  //     id: 'bangalore',
  //     name: 'RareMinds Bangalore',
  //     city: 'Bangalore, Karnataka',
  //     country: 'India',
  //     position: { top: '53.4%', left: '68.5%' },
  //     mapLink: 'https://www.google.com/maps/search/RareMinds+Bangalore+Karnataka+India',
  //     email: 'bangalore@rareminds.com',
  //     phone: '+91 xxx xxx xxxx',
  //   },
  //   {
  //     id: 'goa',
  //     name: 'RareMinds Goa',
  //     city: 'Goa',
  //     country: 'India',
  //     position: { top: '53.5%', left: '67.3%' },
  //     mapLink: 'https://www.google.com/maps/search/RareMinds+Goa+India',
  //     email: 'goa@rareminds.com',
  //     phone: '+91 xxx xxx xxxx',
  //   },
  //   {
  //     id: 'delhi',
  //     name: 'RareMinds Delhi',
  //     city: 'Delhi',
  //     country: 'India',
  //     position: { top: '45%', left: '68.1%' },
  //     mapLink: 'https://www.google.com/maps/search/RareMinds+Delhi+India',
  //     email: 'delhi@rareminds.com',
  //     phone: '+91 xxx xxx xxxx',
  //   },
  //   {
  //     id: 'mumbai',
  //     name: 'RareMinds Mumbai',
  //     city: 'Mumbai, Maharashtra',
  //     country: 'India',
  //     position: { top: '49.9%', left: '67.1%' },
  //     mapLink: 'https://www.google.com/maps/search/RareMinds+Mumbai+India',
  //     email: 'mumbai@rareminds.com',
  //     phone: '+91 xxx xxx xxxx',
  //   },
  //   {
  //     id: 'pune',
  //     name: 'RareMinds Pune',
  //     city: 'Pune, Maharashtra',
  //     country: 'India',
  //     position: { top: '51%', left: '67.1%' },
  //     mapLink: 'https://www.google.com/maps/search/RareMinds+Pune+India',
  //     email: 'pune@rareminds.com',
  //     phone: '+91 xxx xxx xxxx',
  //   },
  //   {
  //     id: 'salem',
  //     name: 'RareMinds Salem',
  //     city: 'Salem, Tamil Nadu',
  //     country: 'India',
  //     position: { top: '56.8%', left: '68.2%' },
  //     mapLink: 'https://www.google.com/maps/search/RareMinds+Salem+Tamil+Nadu+India',
  //     email: 'salem@rareminds.com',
  //     phone: '+91 xxx xxx xxxx',
  //   },
  //   {
  //     id: 'vellore',
  //     name: 'RareMinds Vellore',
  //     city: 'Vellore, Tamil Nadu',
  //     country: 'India',
  //     position: { top: '55.5%', left: '69%' },
  //     mapLink: 'https://www.google.com/maps/search/RareMinds+Vellore+Tamil+Nadu+India',
  //     email: 'vellore@rareminds.com',
  //     phone: '+91 xxx xxx xxxx',
  //   },
  //   {
  //     id: 'coimbatore',
  //     name: 'RareMinds Coimbatore',
  //     city: 'Coimbatore, Tamil Nadu',
  //     country: 'India',
  //     position: { top: '54.9%', left: '69.5%' },
  //     mapLink: 'https://www.google.com/maps/search/RareMinds+Coimbatore+Tamil+Nadu+India',
  //     email: 'coimbatore@rareminds.com',
  //     phone: '+91 xxx xxx xxxx',
  //   },
  //   {
  //     id: 'madurai',
  //     name: 'RareMinds Madurai',
  //     city: 'Madurai, Tamil Nadu',
  //     country: 'India',
  //     position: { top: '57.1%', left: '69.1%' },
  //     mapLink: 'https://www.google.com/maps/search/RareMinds+Madurai+Tamil+Nadu+India',
  //     email: 'madurai@rareminds.com',
  //     phone: '+91 xxx xxx xxxx',
  //   },
  //   {
  //     id: 'tirunelveli',
  //     name: 'RareMinds Tirunelveli',
  //     city: 'Tirunelveli, Tamil Nadu',
  //     country: 'India',
  //     position: { top: '57.2%', left: '69.8%' },
  //     mapLink: 'https://www.google.com/maps/search/RareMinds+Tirunelveli+Tamil+Nadu+India',
  //     email: 'tirunelveli@rareminds.com',
  //     phone: '+91 xxx xxx xxxx',
  //   },
  //   {
  //     id: 'karaikudi',
  //     name: 'RareMinds Karaikudi',
  //     city: 'Karaikudi, Tamil Nadu',
  //     country: 'India',
  //     position: { top: '55.8%', left: '69.5%' },
  //     mapLink: 'https://www.google.com/maps/search/RareMinds+Karaikudi+Tamil+Nadu+India',
  //     email: 'karaikudi@rareminds.com',
  //     phone: '+91 xxx xxx xxxx',
  //   },
  //   // UAE locations
  //   {
  //     id: 'dubai',
  //     name: 'RareMinds Dubai',
  //     city: 'Dubai',
  //     country: 'UAE',
  //     position: { top: '47%', left: '61.5%' },
  //     mapLink: 'https://www.google.com/maps/search/RareMinds+Dubai+UAE',
  //     email: 'dubai@rareminds.com',
  //     phone: '+971 xxx xxx xxxx',
  //   },
  //   {
  //     id: 'abudhabi',
  //     name: 'RareMinds Abu Dhabi',
  //     city: 'Abu Dhabi',
  //     country: 'UAE',
  //     position: { top: '47.9%', left: '61%' },
  //     mapLink: 'https://www.google.com/maps/search/RareMinds+Abu+Dhabi+UAE',
  //     email: 'abudhabi@rareminds.com',
  //     phone: '+971 xxx xxx xxxx',
  //   },
  //   {
  //     id: 'sharjah',
  //     name: 'RareMinds Sharjah',
  //     city: 'Sharjah',
  //     country: 'UAE',
  //     position: { top: '48.3%', left: '61.7%' },
  //     mapLink: 'https://www.google.com/maps/search/RareMinds+Sharjah+UAE',
  //     email: 'sharjah@rareminds.com',
  //     phone: '+971 xxx xxx xxxx',
  //   },
  //   // UK
  //   {
  //     id: 'uk',
  //     name: 'RareMinds UK',
  //     city: 'London',
  //     country: 'United Kingdom',
  //     position: { top: '22%', left: '42.8%' },
  //     mapLink: 'https://www.google.com/maps/search/RareMinds+London+UK',
  //     email: 'uk@rareminds.com',
  //     phone: '+44 xxx xxx xxxx',
  //   },
  //   // USA locations
  //   {
  //     id: 'newyork',
  //     name: 'RareMinds New York',
  //     city: 'New York, NY',
  //     country: 'United States',
  //     position: { top: '37%', left: '19%' },
  //     mapLink: 'https://www.google.com/maps/search/RareMinds+New+York+NY+USA',
  //     email: 'newyork@rareminds.com',
  //     phone: '+1 xxx xxx xxxx',
  //   },
  //   {
  //     id: 'portland',
  //     name: 'RareMinds Portland',
  //     city: 'Portland, OR',
  //     country: 'United States',
  //     position: { top: '26%', left: '4%' },
  //     mapLink: 'https://www.google.com/maps/search/RareMinds+Portland+OR+USA',
  //     email: 'portland@rareminds.com',
  //     phone: '+1 xxx xxx xxxx',
  //   },
  // ];

//   const handleMarkerClick = (location) => {
//     setSelectedLocation(location);
//     setShowPopup(true);
//   };

//   const handleClose = () => {
//     setShowPopup(false);
//     setSelectedLocation(null);
//   };

//   return (
//     <div className="bg-white py-8 md:py-20">
//       {/* Header */}
//       <div className="bg-white">
//         <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-8 text-center">
//           <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
//             Get in touch with our Global Team
//           </h1>
//           <p className="text-sm md:text-base text-gray-500">
//             We'd love to hear from you. Here's how you can reach us.
//           </p>
//         </div>
//       </div>

//       {/* Map Section */}
//       <div className="max-w-full mx-auto px-2 sm:px-4 md:px-6 py-6 md:py-12">
//         <div className="bg-white rounded-xl md:rounded-2xl p-2 sm:p-4 md:p-8 relative overflow-hidden">
//           {/* World Map */}
//           <div className="relative w-full aspect-[16/9] md:aspect-[2/1] bg-gray-50 rounded-lg md:rounded-xl overflow-hidden">
//             <ComposableMap
//               projection="geoMercator"
//               projectionConfig={{
//                 scale: 147,
//                 center: [20, 20]
//               }}
//               width={800}
//               height={400}
//               className="w-full h-full opacity-40"
//             >
//               <Geographies geography={geoUrl}>
//                 {({ geographies }) =>
//                   geographies.map((geo) => (
//                     <Geography
//                       key={geo.rsmKey}
//                       geography={geo}
//                       fill="#E5E7EB"
//                       stroke="#D1D5DB"
//                       strokeWidth={0.5}
//                       style={{
//                         default: { outline: 'none' },
//                         hover: { fill: '#D1D5DB', outline: 'none' },
//                         pressed: { outline: 'none' },
//                       }}
//                     />
//                   ))
//                 }
//               </Geographies>
//             </ComposableMap>

//             {/* Markers */}
//             {locations.map((location) => (
//               <div key={location.id}>
//                 <div
//                   className="absolute bg-blue-200 opacity-50 animate-pulse"
//                   style={{
//                     top: `calc(${location.position.top} - 10px)`,
//                     left: `calc(${location.position.left} - 8px)`,
//                     width: '25px',
//                     height: '35px',
//                     clipPath:
//                       'polygon(50% 0%, 70% 25%, 85% 50%, 80% 75%, 50% 100%, 20% 75%, 15% 50%, 30% 25%)',
//                     filter: 'blur(5px)',
//                   }}
//                 ></div>

//                 <div
//                   className="absolute cursor-pointer group"
//                   style={{
//                     top: location.position.top,
//                     left: location.position.left,
//                     transform: 'translate(-50%, -50%)',
//                     zIndex: hoveredLocation === location.id ? 20 : 10,
//                   }}
//                   onMouseEnter={() => setHoveredLocation(location.id)}
//                   onMouseLeave={() => setHoveredLocation(null)}
//                   onTouchStart={() => setHoveredLocation(location.id)}
//                   onClick={() => handleMarkerClick(location)}
//                 >
                  // <div className="absolute inset-0 -m-[1px] sm:-m-[2px] md:-m-[3px]">
                  //   <div className="w-1 h-1 sm:w-1 sm:h-1 md:w-1 md:h-1"></div>
                  // </div>

                  // <div className="relative">
                  //   <div className="bg-gray-600 rounded-full p-[-5px] sm:p-[1.2px] md:p-[1px] shadow-lg transition-all group-hover:bg-blue-700">
                  //     <MapPin className="w-[0px] h-[0px] sm:w-[-10px] sm:h-[-10px] md:w-[2px] md:h-[2px] text-white fill-white" />
                  //   </div>

//                     {/* Tooltip */}
//                     <div>
//                       {hoveredLocation === location.id && (
//                         <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-900 text-white px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap shadow-xl z-50">
//                           <div className="font-semibold">{location.name}</div>
//                           <div className="text-gray-300">{location.city}</div>
//                           <div className="text-blue-300 mt-1">Click for details</div>
//                           <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Popup Modal */}
//           {showPopup && selectedLocation && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
//               <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg p-4 sm:p-6 md:p-8 relative animate-in max-h-[90vh] overflow-y-auto">
//                 <button
//                   onClick={handleClose}
//                   className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
//                 >
//                   <X className="w-5 h-5 md:w-6 md:h-6" />
//                 </button>

//                 <div className="text-center mb-4 sm:mb-6">
//                   <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-blue-100 rounded-full mb-3 sm:mb-4">
//                     <MapPin className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-blue-600" />
//                   </div>
//                   <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
//                     {selectedLocation.name}
//                   </h2>
//                   <p className="text-xs sm:text-sm md:text-base text-gray-500">
//                     Our office in {selectedLocation.country}
//                   </p>
//                 </div>

//                 {/* Details */}
//                 <div className="space-y-2 sm:space-y-3 md:space-y-4 mb-4 sm:mb-6">
//                   <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 md:p-4 bg-gray-50 rounded-lg">
//                     <MapPin className="w-4 sm:w-5 text-blue-600 mt-0.5 flex-shrink-0" />
//                     <div>
//                       <p className="font-medium text-gray-900 mb-0.5 text-xs sm:text-sm md:text-base">
//                         Address
//                       </p>
//                       <p className="text-gray-600 text-xs sm:text-sm">
//                         RareMinds Technology Solutions<br />
//                         {selectedLocation.city}<br />
//                         {selectedLocation.country}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 md:p-4 bg-gray-50 rounded-lg">
//                     <Mail className="w-4 sm:w-5 text-blue-600 flex-shrink-0" />
//                     <div>
//                       <p className="font-medium text-gray-900 mb-0.5 text-xs sm:text-sm md:text-base">
//                         Email
//                       </p>
//                       <p className="text-gray-600 text-xs sm:text-sm">{selectedLocation.email}</p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 md:p-4 bg-gray-50 rounded-lg">
//                     <Phone className="w-4 sm:w-5 text-blue-600 flex-shrink-0" />
//                     <div>
//                       <p className="font-medium text-gray-900 mb-0.5 text-xs sm:text-sm md:text-base">
//                         Phone
//                       </p>
//                       <p className="text-gray-600 text-xs sm:text-sm">{selectedLocation.phone}</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Buttons */}
//                 <div className="space-y-2 sm:space-y-3">
//                   <a
//                     href={selectedLocation.mapLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white font-semibold py-2 sm:py-2.5 md:py-3 px-4 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base shadow-md"
//                   >
//                     View on Google Maps
//                     <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
//                   </a>

//                   <a
//                     href="https://rareminds.in"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex items-center justify-center gap-2 w-full bg-gray-100 text-gray-700 font-semibold py-2 sm:py-2.5 md:py-3 px-4 rounded-lg hover:bg-gray-200 transition text-sm sm:text-base"
//                   >
//                     Visit RareMinds Website
//                     <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
//                   </a>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         <p className="text-center text-gray-500 text-xs md:text-sm mt-4 md:mt-6 px-4">
//           Tap or hover over the location markers to see office names, then click to view full details.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default InteractiveWorldMap;


// import React, { useState } from 'react';
// import { MapPin, X, ExternalLink, Mail, Phone } from 'lucide-react';
// import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

// const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// const InteractiveWorldMap = () => {
//   const [showPopup, setShowPopup] = useState(false);
//   const [hoveredLocation, setHoveredLocation] = useState(null);
//   const [selectedLocation, setSelectedLocation] = useState(null);

//     const locations = [
//     // India locations
//     {
//       id: 'bangalore',
//       name: 'RareMinds Bangalore',
//       city: 'Bangalore, Karnataka',
//       country: 'India',
//       position: { top: '53.4%', left: '68.5%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+Bangalore+Karnataka+India',
//       email: 'bangalore@rareminds.com',
//       phone: '+91 xxx xxx xxxx',
//     },
//     {
//       id: 'goa',
//       name: 'RareMinds Goa',
//       city: 'Goa',
//       country: 'India',
//       position: { top: '53.5%', left: '67.3%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+Goa+India',
//       email: 'goa@rareminds.com',
//       phone: '+91 xxx xxx xxxx',
//     },
//     {
//       id: 'delhi',
//       name: 'RareMinds Delhi',
//       city: 'Delhi',
//       country: 'India',
//       position: { top: '45%', left: '68.1%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+Delhi+India',
//       email: 'delhi@rareminds.com',
//       phone: '+91 xxx xxx xxxx',
//     },
//     {
//       id: 'mumbai',
//       name: 'RareMinds Mumbai',
//       city: 'Mumbai, Maharashtra',
//       country: 'India',
//       position: { top: '49.9%', left: '67.1%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+Mumbai+India',
//       email: 'mumbai@rareminds.com',
//       phone: '+91 xxx xxx xxxx',
//     },
//     {
//       id: 'pune',
//       name: 'RareMinds Pune',
//       city: 'Pune, Maharashtra',
//       country: 'India',
//       position: { top: '51%', left: '67.1%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+Pune+India',
//       email: 'pune@rareminds.com',
//       phone: '+91 xxx xxx xxxx',
//     },
//     {
//       id: 'salem',
//       name: 'RareMinds Salem',
//       city: 'Salem, Tamil Nadu',
//       country: 'India',
//       position: { top: '56.8%', left: '68.2%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+Salem+Tamil+Nadu+India',
//       email: 'salem@rareminds.com',
//       phone: '+91 xxx xxx xxxx',
//     },
//     {
//       id: 'vellore',
//       name: 'RareMinds Vellore',
//       city: 'Vellore, Tamil Nadu',
//       country: 'India',
//       position: { top: '55.5%', left: '69%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+Vellore+Tamil+Nadu+India',
//       email: 'vellore@rareminds.com',
//       phone: '+91 xxx xxx xxxx',
//     },
//     {
//       id: 'coimbatore',
//       name: 'RareMinds Coimbatore',
//       city: 'Coimbatore, Tamil Nadu',
//       country: 'India',
//       position: { top: '54.9%', left: '69%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+Coimbatore+Tamil+Nadu+India',
//       email: 'coimbatore@rareminds.com',
//       phone: '+91 xxx xxx xxxx',
//     },
//     {
//       id: 'madurai',
//       name: 'RareMinds Madurai',
//       city: 'Madurai, Tamil Nadu',
//       country: 'India',
//       position: { top: '56.1%', left: '69%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+Madurai+Tamil+Nadu+India',
//       email: 'madurai@rareminds.com',
//       phone: '+91 xxx xxx xxxx',
//     },
//     {
//       id: 'tirunelveli',
//       name: 'RareMinds Tirunelveli',
//       city: 'Tirunelveli, Tamil Nadu',
//       country: 'India',
//       position: { top: '56.5%', left: '68.8%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+Tirunelveli+Tamil+Nadu+India',
//       email: 'tirunelveli@rareminds.com',
//       phone: '+91 xxx xxx xxxx',
//     },
//     {
//       id: 'karaikudi',
//       name: 'RareMinds Karaikudi',
//       city: 'Karaikudi, Tamil Nadu',
//       country: 'India',
//       position: { top: '55.2%', left: '69.2%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+Karaikudi+Tamil+Nadu+India',
//       email: 'karaikudi@rareminds.com',
//       phone: '+91 xxx xxx xxxx',
//     },
//     // UAE locations
//     {
//       id: 'dubai',
//       name: 'RareMinds Dubai',
//       city: 'Dubai',
//       country: 'UAE',
//       position: { top: '47%', left: '61.5%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+Dubai+UAE',
//       email: 'dubai@rareminds.com',
//       phone: '+971 xxx xxx xxxx',
//     },
//     {
//       id: 'abudhabi',
//       name: 'RareMinds Abu Dhabi',
//       city: 'Abu Dhabi',
//       country: 'UAE',
//       position: { top: '47.9%', left: '61%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+Abu+Dhabi+UAE',
//       email: 'abudhabi@rareminds.com',
//       phone: '+971 xxx xxx xxxx',
//     },
//     {
//       id: 'sharjah',
//       name: 'RareMinds Sharjah',
//       city: 'Sharjah',
//       country: 'UAE',
//       position: { top: '48.3%', left: '61.7%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+Sharjah+UAE',
//       email: 'sharjah@rareminds.com',
//       phone: '+971 xxx xxx xxxx',
//     },
//     // UK
//     {
//       id: 'uk',
//       name: 'RareMinds UK',
//       city: 'London',
//       country: 'United Kingdom',
//       position: { top: '22%', left: '42.8%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+London+UK',
//       email: 'uk@rareminds.com',
//       phone: '+44 xxx xxx xxxx',
//     },
//     // USA locations
//     {
//       id: 'newyork',
//       name: 'RareMinds New York',
//       city: 'New York, NY',
//       country: 'United States',
//       position: { top: '37%', left: '19%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+New+York+NY+USA',
//       email: 'newyork@rareminds.com',
//       phone: '+1 xxx xxx xxxx',
//     },
//     {
//       id: 'portland',
//       name: 'RareMinds Portland',
//       city: 'Portland, OR',
//       country: 'United States',
//       position: { top: '26%', left: '4%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+Portland+OR+USA',
//       email: 'portland@rareminds.com',
//       phone: '+1 xxx xxx xxxx',
//     },
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
    // <div className="bg-white py-8 md:py-20">
    //   {/* Header */}
    //   <div className="bg-white">
    //     <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-8 text-center">
    //       <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
    //         Get in touch with our Global Team
    //       </h1>
    //       <p className="text-sm md:text-base text-gray-500">
    //         We'd love to hear from you. Here's how you can reach us.
    //       </p>
    //     </div>
    //   </div>

//       {/* Map Section */}
//       <div className="max-w-full mx-auto px-2 sm:px-4 md:px-6 py-6 md:py-12">
//         <div className="bg-white rounded-xl md:rounded-2xl p-2 sm:p-4 md:p-8 relative overflow-hidden">
//           {/* World Map */}
//           <div className="relative w-full aspect-[16/9] md:aspect-[2/1] bg-gray-50 rounded-lg md:rounded-xl overflow-hidden">
//             <ComposableMap
//               projection="geoMercator"
//               projectionConfig={{
//                 scale: 147,
//                 center: [20, 20]
//               }}
//               width={800}
//               height={400}
//               className="w-full h-full opacity-40"
//             >
//               <Geographies geography={geoUrl}>
//                 {({ geographies }) =>
//                   geographies.map((geo) => (
//                     <Geography
//                       key={geo.rsmKey}
//                       geography={geo}
//                       fill="#E5E7EB"
//                       stroke="#D1D5DB"
//                       strokeWidth={0.5}
//                       style={{
//                         default: { outline: 'none' },
//                         hover: { fill: '#D1D5DB', outline: 'none' },
//                         pressed: { outline: 'none' },
//                       }}
//                     />
//                   ))
//                 }
//               </Geographies>
//             </ComposableMap>

//             {/* Markers */}
//             {locations.map((location) => (
//               <div key={location.id}>
//                 <div
//                   className="absolute cursor-pointer group"
//                   style={{
//                     top: location.position.top,
//                     left: location.position.left,
//                     transform: 'translate(-50%, -50%)',
//                     zIndex: hoveredLocation === location.id ? 20 : 10,
//                   }}
//                   onMouseEnter={() => setHoveredLocation(location.id)}
//                   onMouseLeave={() => setHoveredLocation(null)}
//                   onTouchStart={() => setHoveredLocation(location.id)}
//                   onClick={() => handleMarkerClick(location)}
//                 >
//                   <div className="absolute inset-0 -m-[1px] sm:-m-[2px] md:-m-[3px]">
//                     <div className="w-1 h-1 sm:w-1 sm:h-1 md:w-1 md:h-1"></div>
//                   </div>

//                   <div className="relative">
//                     <div className="bg-gray-600 rounded-full p-[-5px] sm:p-[1.2px] md:p-[1px] shadow-lg transition-all group-hover:bg-blue-700">
//                       <MapPin className="w-[0.5px] h-[0.5px] sm:w-[-10px] sm:h-[-10px] md:w-[2px] md:h-[2px] text-white fill-white" />
//                     </div>

//                     {/* Tooltip */}
//                     <div>
//                       {hoveredLocation === location.id && (
//                         <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-900 text-white px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap shadow-xl z-50">
//                           <div className="font-semibold">{location.name}</div>
//                           <div className="text-gray-300">{location.city}</div>
//                           <div className="text-blue-300 mt-1">Click for details</div>
//                           <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Popup Modal */}
          // {showPopup && selectedLocation && (
          //   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          //     <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg p-4 sm:p-6 md:p-8 relative animate-in max-h-[90vh] overflow-y-auto">
          //       <button
          //         onClick={handleClose}
          //         className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          //       >
          //         <X className="w-5 h-5 md:w-6 md:h-6" />
          //       </button>

          //       <div className="text-center mb-4 sm:mb-6">
          //         <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-blue-100 rounded-full mb-3 sm:mb-4">
          //           <MapPin className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-blue-600" />
          //         </div>
          //         <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
          //           {selectedLocation.name}
          //         </h2>
          //         <p className="text-xs sm:text-sm md:text-base text-gray-500">
          //           Our office in {selectedLocation.country}
          //         </p>
          //       </div>

          //       {/* Details */}
          //       <div className="space-y-2 sm:space-y-3 md:space-y-4 mb-4 sm:mb-6">
          //         <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 md:p-4 bg-gray-50 rounded-lg">
          //           <MapPin className="w-4 sm:w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          //           <div>
          //             <p className="font-medium text-gray-900 mb-0.5 text-xs sm:text-sm md:text-base">
          //               Address
          //             </p>
          //             <p className="text-gray-600 text-xs sm:text-sm">
          //               RareMinds Technology Solutions<br />
          //               {selectedLocation.city}<br />
          //               {selectedLocation.country}
          //             </p>
          //           </div>
          //         </div>

          //         <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 md:p-4 bg-gray-50 rounded-lg">
          //           <Mail className="w-4 sm:w-5 text-blue-600 flex-shrink-0" />
          //           <div>
          //             <p className="font-medium text-gray-900 mb-0.5 text-xs sm:text-sm md:text-base">
          //               Email
          //             </p>
          //             <p className="text-gray-600 text-xs sm:text-sm">{selectedLocation.email}</p>
          //           </div>
          //         </div>

          //         <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 md:p-4 bg-gray-50 rounded-lg">
          //           <Phone className="w-4 sm:w-5 text-blue-600 flex-shrink-0" />
          //           <div>
          //             <p className="font-medium text-gray-900 mb-0.5 text-xs sm:text-sm md:text-base">
          //               Phone
          //             </p>
          //             <p className="text-gray-600 text-xs sm:text-sm">{selectedLocation.phone}</p>
          //           </div>
          //         </div>
          //       </div>

          //       {/* Buttons */}
          //       <div className="space-y-2 sm:space-y-3">
          //         <a
          //           href={selectedLocation.mapLink}
          //           target="_blank"
          //           rel="noopener noreferrer"
          //           className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white font-semibold py-2 sm:py-2.5 md:py-3 px-4 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base shadow-md"
          //         >
          //           View on Google Maps
          //           <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
          //         </a>

          //         <a
          //           href="https://rareminds.in"
          //           target="_blank"
          //           rel="noopener noreferrer"
          //           className="flex items-center justify-center gap-2 w-full bg-gray-100 text-gray-700 font-semibold py-2 sm:py-2.5 md:py-3 px-4 rounded-lg hover:bg-gray-200 transition text-sm sm:text-base"
          //         >
          //           Visit RareMinds Website
          //           <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
          //         </a>
          //       </div>
          //     </div>
          //   </div>
          // )}
//         </div>

        // <p className="text-center text-gray-500 text-xs md:text-sm mt-4 md:mt-6 px-4">
        //   Tap or hover over the location markers to see office names, then click to view full details.
        // </p>
//       </div>
//     </div>
//   );
// };

// export default InteractiveWorldMap;


// import React, { useState, useEffect } from 'react';
// import { MapPin, X, ExternalLink, Mail, Phone } from 'lucide-react';
// import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

// const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// const InteractiveWorldMap = () => {
//   const [showPopup, setShowPopup] = useState(false);
//   const [hoveredLocation, setHoveredLocation] = useState(null);
//   const [selectedLocation, setSelectedLocation] = useState(null);

//   // 🆕 For animation loop
//   const [autoIndex, setAutoIndex] = useState(0);

//   const locations = [
//     // India locations
//     {
//       id: 'bangalore',
//       name: 'RareMinds Bangalore',
//       city: 'Bangalore, Karnataka',
//       country: 'India',
//       position: { top: '53.4%', left: '68.5%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+Bangalore+Karnataka+India',
//       email: 'bangalore@rareminds.com',
//       phone: '+91 xxx xxx xxxx',
//     },
//     {
//       id: 'goa',
//       name: 'RareMinds Goa',
//       city: 'Goa',
//       country: 'India',
//       position: { top: '53.5%', left: '67.3%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+Goa+India',
//       email: 'goa@rareminds.com',
//       phone: '+91 xxx xxx xxxx',
//     },
//     {
//       id: 'delhi',
//       name: 'RareMinds Delhi',
//       city: 'Delhi',
//       country: 'India',
//       position: { top: '45%', left: '68.1%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+Delhi+India',
//       email: 'delhi@rareminds.com',
//       phone: '+91 xxx xxx xxxx',
//     },
//     {
//       id: 'mumbai',
//       name: 'RareMinds Mumbai',
//       city: 'Mumbai, Maharashtra',
//       country: 'India',
//       position: { top: '49.9%', left: '67.1%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+Mumbai+India',
//       email: 'mumbai@rareminds.com',
//       phone: '+91 xxx xxx xxxx',
//     },
//     {
//       id: 'pune',
//       name: 'RareMinds Pune',
//       city: 'Pune, Maharashtra',
//       country: 'India',
//       position: { top: '51%', left: '67.1%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+Pune+India',
//       email: 'pune@rareminds.com',
//       phone: '+91 xxx xxx xxxx',
//     },
//     {
//       id: 'salem',
//       name: 'RareMinds Salem',
//       city: 'Salem, Tamil Nadu',
//       country: 'India',
//       position: { top: '56.8%', left: '68.2%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+Salem+Tamil+Nadu+India',
//       email: 'salem@rareminds.com',
//       phone: '+91 xxx xxx xxxx',
//     },
//     {
//       id: 'vellore',
//       name: 'RareMinds Vellore',
//       city: 'Vellore, Tamil Nadu',
//       country: 'India',
//       position: { top: '55.5%', left: '69%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+Vellore+Tamil+Nadu+India',
//       email: 'vellore@rareminds.com',
//       phone: '+91 xxx xxx xxxx',
//     },
//     {
//       id: 'coimbatore',
//       name: 'RareMinds Coimbatore',
//       city: 'Coimbatore, Tamil Nadu',
//       country: 'India',
//       position: { top: '54.9%', left: '69%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+Coimbatore+Tamil+Nadu+India',
//       email: 'coimbatore@rareminds.com',
//       phone: '+91 xxx xxx xxxx',
//     },
//     {
//       id: 'madurai',
//       name: 'RareMinds Madurai',
//       city: 'Madurai, Tamil Nadu',
//       country: 'India',
//       position: { top: '56.1%', left: '69%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+Madurai+Tamil+Nadu+India',
//       email: 'madurai@rareminds.com',
//       phone: '+91 xxx xxx xxxx',
//     },
//     {
//       id: 'tirunelveli',
//       name: 'RareMinds Tirunelveli',
//       city: 'Tirunelveli, Tamil Nadu',
//       country: 'India',
//       position: { top: '56.5%', left: '68.8%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+Tirunelveli+Tamil+Nadu+India',
//       email: 'tirunelveli@rareminds.com',
//       phone: '+91 xxx xxx xxxx',
//     },
//     {
//       id: 'karaikudi',
//       name: 'RareMinds Karaikudi',
//       city: 'Karaikudi, Tamil Nadu',
//       country: 'India',
//       position: { top: '55.2%', left: '69.2%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+Karaikudi+Tamil+Nadu+India',
//       email: 'karaikudi@rareminds.com',
//       phone: '+91 xxx xxx xxxx',
//     },
//     // UAE
//     {
//       id: 'dubai',
//       name: 'RareMinds Dubai',
//       city: 'Dubai',
//       country: 'UAE',
//       position: { top: '47%', left: '61.5%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+Dubai+UAE',
//       email: 'dubai@rareminds.com',
//       phone: '+971 xxx xxx xxxx',
//     },
//     {
//       id: 'abudhabi',
//       name: 'RareMinds Abu Dhabi',
//       city: 'Abu Dhabi',
//       country: 'UAE',
//       position: { top: '47.9%', left: '61%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+Abu+Dhabi+UAE',
//       email: 'abudhabi@rareminds.com',
//       phone: '+971 xxx xxx xxxx',
//     },
//     {
//       id: 'sharjah',
//       name: 'RareMinds Sharjah',
//       city: 'Sharjah',
//       country: 'UAE',
//       position: { top: '48.3%', left: '61.7%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+Sharjah+UAE',
//       email: 'sharjah@rareminds.com',
//       phone: '+971 xxx xxx xxxx',
//     },
//     // UK
//     {
//       id: 'uk',
//       name: 'RareMinds UK',
//       city: 'London',
//       country: 'United Kingdom',
//       position: { top: '22%', left: '42.8%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+London+UK',
//       email: 'uk@rareminds.com',
//       phone: '+44 xxx xxx xxxx',
//     },
//     // USA
//     {
//       id: 'newyork',
//       name: 'RareMinds New York',
//       city: 'New York, NY',
//       country: 'United States',
//       position: { top: '37%', left: '19%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+New+York+NY+USA',
//       email: 'newyork@rareminds.com',
//       phone: '+1 xxx xxx xxxx',
//     },
//     {
//       id: 'portland',
//       name: 'RareMinds Portland',
//       city: 'Portland, OR',
//       country: 'United States',
//       position: { top: '26%', left: '4%' },
//       mapLink: 'https://www.google.com/maps/search/RareMinds+Portland+OR+USA',
//       email: 'portland@rareminds.com',
//       phone: '+1 xxx xxx xxxx',
//     },
//   ];

//   // 🆕 Animate popups automatically one by one in loop
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setAutoIndex((prev) => (prev + 1) % locations.length);
//     }, 1500); // 1.5s per location
//     return () => clearInterval(interval);
//   }, [locations.length]);

//   const handleMarkerClick = (location) => {
//     setSelectedLocation(location);
//     setShowPopup(true);
//   };

//   const handleClose = () => {
//     setShowPopup(false);
//     setSelectedLocation(null);
//   };

//   return (
//     <div className="bg-white py-8 md:py-20">
//       {/* Header */}
//       <div className="bg-white">
//         <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-8 text-center">
//           <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
//             Get in touch with our Global Team
//           </h1>
//           <p className="text-sm md:text-base text-gray-500">
//             We'd love to hear from you. Here's how you can reach us.
//           </p>
//         </div>
//       </div>
//       {/* Map Section (your same code) */}
//       <div className="max-w-full mx-auto px-2 sm:px-4 md:px-6 py-6 md:py-12">
//         <div className="bg-white rounded-xl md:rounded-2xl p-2 sm:p-4 md:p-8 relative overflow-hidden">
//           <div className="relative w-full aspect-[16/9] md:aspect-[2/1] bg-gray-50 rounded-lg md:rounded-xl overflow-hidden">
//             <ComposableMap
//               projection="geoMercator"
//               projectionConfig={{ scale: 147, center: [20, 20] }}
//               width={800}
//               height={400}
//               className="w-full h-full opacity-40"
//             >
//               <Geographies geography={geoUrl}>
//                 {({ geographies }) =>
//                   geographies.map((geo) => (
//                     <Geography
//                       key={geo.rsmKey}
//                       geography={geo}
//                       fill="#E5E7EB"
//                       stroke="#D1D5DB"
//                       strokeWidth={0.5}
//                     />
//                   ))
//                 }
//               </Geographies>
//             </ComposableMap>

//             {/* Markers */}
//             {locations.map((location, index) => {
//               const isHovered = hoveredLocation === location.id;
//               const isAuto = autoIndex === index;

//               return (
//                 <div
//                   key={location.id}
//                   className="absolute cursor-pointer group transition-all"
//                   style={{
//                     top: location.position.top,
//                     left: location.position.left,
//                     transform: 'translate(-50%, -50%)',
//                   }}
//                   onMouseEnter={() => setHoveredLocation(location.id)}
//                   onMouseLeave={() => setHoveredLocation(null)}
//                   onClick={() => handleMarkerClick(location)}
//                 >
//                   <div className="relative">
//                     <div className="bg-gray-600 rounded-full p-[1px] sm:p-[1.2px] md:p-[1px] shadow-lg transition-all group-hover:bg-blue-700">
//                       <MapPin className="w-[2px] h-[2px] text-white fill-white" />
//                     </div>

//                     {/* 🆕 show tooltip during animation OR on hover */}
//                     {(isHovered || isAuto) && (
//                       <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-900 text-white px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap shadow-xl z-50 animate-fade">
//                         <div className="font-semibold">{location.name}</div>
//                         <div className="text-gray-300">{location.city}</div>
//                         <div className="text-blue-300 mt-1">Click for details</div>
//                         <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* Popup Modal (unchanged) */}
//        {showPopup && selectedLocation && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
//               <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg p-4 sm:p-6 md:p-8 relative animate-in max-h-[90vh] overflow-y-auto">
//                 <button
//                   onClick={handleClose}
//                   className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
//                 >
//                   <X className="w-5 h-5 md:w-6 md:h-6" />
//                 </button>

//                 <div className="text-center mb-4 sm:mb-6">
//                   <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-blue-100 rounded-full mb-3 sm:mb-4">
//                     <MapPin className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-blue-600" />
//                   </div>
//                   <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
//                     {selectedLocation.name}
//                   </h2>
//                   <p className="text-xs sm:text-sm md:text-base text-gray-500">
//                     Our office in {selectedLocation.country}
//                   </p>
//                 </div>

//                 {/* Details */}
//                 <div className="space-y-2 sm:space-y-3 md:space-y-4 mb-4 sm:mb-6">
//                   <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 md:p-4 bg-gray-50 rounded-lg">
//                     <MapPin className="w-4 sm:w-5 text-blue-600 mt-0.5 flex-shrink-0" />
//                     <div>
//                       <p className="font-medium text-gray-900 mb-0.5 text-xs sm:text-sm md:text-base">
//                         Address
//                       </p>
//                       <p className="text-gray-600 text-xs sm:text-sm">
//                         RareMinds Technology Solutions<br />
//                         {selectedLocation.city}<br />
//                         {selectedLocation.country}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 md:p-4 bg-gray-50 rounded-lg">
//                     <Mail className="w-4 sm:w-5 text-blue-600 flex-shrink-0" />
//                     <div>
//                       <p className="font-medium text-gray-900 mb-0.5 text-xs sm:text-sm md:text-base">
//                         Email
//                       </p>
//                       <p className="text-gray-600 text-xs sm:text-sm">{selectedLocation.email}</p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 md:p-4 bg-gray-50 rounded-lg">
//                     <Phone className="w-4 sm:w-5 text-blue-600 flex-shrink-0" />
//                     <div>
//                       <p className="font-medium text-gray-900 mb-0.5 text-xs sm:text-sm md:text-base">
//                         Phone
//                       </p>
//                       <p className="text-gray-600 text-xs sm:text-sm">{selectedLocation.phone}</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Buttons */}
//                 <div className="space-y-2 sm:space-y-3">
//                   <a
//                     href={selectedLocation.mapLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white font-semibold py-2 sm:py-2.5 md:py-3 px-4 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base shadow-md"
//                   >
//                     View on Google Maps
//                     <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
//                   </a>

//                   <a
//                     href="https://rareminds.in"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex items-center justify-center gap-2 w-full bg-gray-100 text-gray-700 font-semibold py-2 sm:py-2.5 md:py-3 px-4 rounded-lg hover:bg-gray-200 transition text-sm sm:text-base"
//                   >
//                     Visit RareMinds Website
//                     <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
//                   </a>
//                 </div>
//               </div>
//             </div>
//           )}
//           <div className = "mb-1">
//            <p className="text-center text-gray-500 text-xs md:text-sm mt-4 md:mt-6 px-4">
//           Tap or hover over the location markers to see office names, then click to view full details.
//         </p>
//           </div>
//     </div>
//   );
// };

// // 🆕 simple fade animation (add to global CSS)
// /// Add this once in your styles.css or tailwind layer:
// /// @keyframes fade {
// ///   from { opacity: 0; transform: translateY(5px); }
// ///   to { opacity: 1; transform: translateY(0); }
// /// }
// /// .animate-fade {
// ///   animation: fade 0.5s ease-in-out;
// /// }

// export default InteractiveWorldMap;


// import React, { useState, useEffect } from 'react';
// import { MapPin, X, ExternalLink, Mail, Phone } from 'lucide-react';
// import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

// const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// const InteractiveWorldMap = () => {
//   const [showPopup, setShowPopup] = useState(false);
//   const [hoveredLocation, setHoveredLocation] = useState(null);
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [autoIndex, setAutoIndex] = useState(0);

//   const locations = [
//     // India
//     { id: 'bangalore', name: 'RareMinds Bangalore', city: 'Bangalore, Karnataka', country: 'India', position: { top: '53.4%', left: '68.5%' }, mapLink: 'https://www.google.com/maps/search/RareMinds+Bangalore+Karnataka+India', email: 'bangalore@rareminds.com', phone: '+91 xxx xxx xxxx' },
//     { id: 'goa', name: 'RareMinds Goa', city: 'Goa', country: 'India', position: { top: '53.5%', left: '67.3%' }, mapLink: 'https://www.google.com/maps/search/RareMinds+Goa+India', email: 'goa@rareminds.com', phone: '+91 xxx xxx xxxx' },
//     { id: 'delhi', name: 'RareMinds Delhi', city: 'Delhi', country: 'India', position: { top: '45%', left: '68.1%' }, mapLink: 'https://www.google.com/maps/search/RareMinds+Delhi+India', email: 'delhi@rareminds.com', phone: '+91 xxx xxx xxxx' },
//     { id: 'mumbai', name: 'RareMinds Mumbai', city: 'Mumbai, Maharashtra', country: 'India', position: { top: '49.9%', left: '67.1%' }, mapLink: 'https://www.google.com/maps/search/RareMinds+Mumbai+India', email: 'mumbai@rareminds.com', phone: '+91 xxx xxx xxxx' },
//     { id: 'pune', name: 'RareMinds Pune', city: 'Pune, Maharashtra', country: 'India', position: { top: '51%', left: '67.1%' }, mapLink: 'https://www.google.com/maps/search/RareMinds+Pune+India', email: 'pune@rareminds.com', phone: '+91 xxx xxx xxxx' },
//     { id: 'salem', name: 'RareMinds Salem', city: 'Salem, Tamil Nadu', country: 'India', position: { top: '56.8%', left: '68.2%' }, mapLink: 'https://www.google.com/maps/search/RareMinds+Salem+Tamil+Nadu+India', email: 'salem@rareminds.com', phone: '+91 xxx xxx xxxx' },
//     { id: 'vellore', name: 'RareMinds Vellore', city: 'Vellore, Tamil Nadu', country: 'India', position: { top: '55.5%', left: '69%' }, mapLink: 'https://www.google.com/maps/search/RareMinds+Vellore+Tamil+Nadu+India', email: 'vellore@rareminds.com', phone: '+91 xxx xxx xxxx' },
//     { id: 'coimbatore', name: 'RareMinds Coimbatore', city: 'Coimbatore, Tamil Nadu', country: 'India', position: { top: '54.9%', left: '69%' }, mapLink: 'https://www.google.com/maps/search/RareMinds+Coimbatore+Tamil+Nadu+India', email: 'coimbatore@rareminds.com', phone: '+91 xxx xxx xxxx' },
//     { id: 'madurai', name: 'RareMinds Madurai', city: 'Madurai, Tamil Nadu', country: 'India', position: { top: '56.1%', left: '69%' }, mapLink: 'https://www.google.com/maps/search/RareMinds+Madurai+Tamil+Nadu+India', email: 'madurai@rareminds.com', phone: '+91 xxx xxx xxxx' },
//     { id: 'tirunelveli', name: 'RareMinds Tirunelveli', city: 'Tirunelveli, Tamil Nadu', country: 'India', position: { top: '56.5%', left: '68.8%' }, mapLink: 'https://www.google.com/maps/search/RareMinds+Tirunelveli+Tamil+Nadu+India', email: 'tirunelveli@rareminds.com', phone: '+91 xxx xxx xxxx' },
//     { id: 'karaikudi', name: 'RareMinds Karaikudi', city: 'Karaikudi, Tamil Nadu', country: 'India', position: { top: '55.2%', left: '69.2%' }, mapLink: 'https://www.google.com/maps/search/RareMinds+Karaikudi+Tamil+Nadu+India', email: 'karaikudi@rareminds.com', phone: '+91 xxx xxx xxxx' },
//     // UAE
//     { id: 'dubai', name: 'RareMinds Dubai', city: 'Dubai', country: 'UAE', position: { top: '47%', left: '61.5%' }, mapLink: 'https://www.google.com/maps/search/RareMinds+Dubai+UAE', email: 'dubai@rareminds.com', phone: '+971 xxx xxx xxxx' },
//     { id: 'abudhabi', name: 'RareMinds Abu Dhabi', city: 'Abu Dhabi', country: 'UAE', position: { top: '47.9%', left: '61%' }, mapLink: 'https://www.google.com/maps/search/RareMinds+Abu+Dhabi+UAE', email: 'abudhabi@rareminds.com', phone: '+971 xxx xxx xxxx' },
//     { id: 'sharjah', name: 'RareMinds Sharjah', city: 'Sharjah', country: 'UAE', position: { top: '48.3%', left: '61.7%' }, mapLink: 'https://www.google.com/maps/search/RareMinds+Sharjah+UAE', email: 'sharjah@rareminds.com', phone: '+971 xxx xxx xxxx' },
//     // UK
//     { id: 'uk', name: 'RareMinds UK', city: 'London', country: 'United Kingdom', position: { top: '22%', left: '42.8%' }, mapLink: 'https://www.google.com/maps/search/RareMinds+London+UK', email: 'uk@rareminds.com', phone: '+44 xxx xxx xxxx' },
//     // USA
//     { id: 'newyork', name: 'RareMinds New York', city: 'New York, NY', country: 'United States', position: { top: '37%', left: '19%' }, mapLink: 'https://www.google.com/maps/search/RareMinds+New+York+NY+USA', email: 'newyork@rareminds.com', phone: '+1 xxx xxx xxxx' },
//     { id: 'portland', name: 'RareMinds Portland', city: 'Portland, OR', country: 'United States', position: { top: '26%', left: '4%' }, mapLink: 'https://www.google.com/maps/search/RareMinds+Portland+OR+USA', email: 'portland@rareminds.com', phone: '+1 xxx xxx xxxx' },
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setAutoIndex((prev) => (prev + 1) % locations.length);
//     }, 1500);
//     return () => clearInterval(interval);
//   }, [locations.length]);

//   const handleMarkerClick = (location) => {
//     setSelectedLocation(location);
//     setShowPopup(true);
//   };

//   const handleClose = () => {
//     setShowPopup(false);
//     setSelectedLocation(null);
//   };

//   return (
//     <div className="bg-white py-5 md:py-18">
      // <div className="bg-white">
      //   <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-8 text-center">
      //     <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
      //       Get in touch with our Global Team
      //     </h1>
      //     <p className="text-sm md:text-base text-gray-500">
      //       We'd love to hear from you. Here's how you can reach us.
      //     </p>
      //   </div>
      // </div>

//       <div className="max-w-full mx-auto px-2 sm:px-4 md:px-6 py-6 md:py-12">
//         <div className="bg-white rounded-xl md:rounded-2xl p-2 sm:p-4 md:p-8 relative overflow-hidden">
//           <div className="relative w-full aspect-[16/9] md:aspect-[2/1] bg-gray-50 rounded-lg md:rounded-xl overflow-hidden">
//             <ComposableMap
//               projection="geoMercator"
//               projectionConfig={{ scale: 147, center: [20, 20] }}
//               width={800}
//               height={400}
//               className="w-full h-full opacity-40"
//             >
//               <Geographies geography={geoUrl}>
//                 {({ geographies }) =>
//                   geographies.map((geo) => (
//                     <Geography
//                       key={geo.rsmKey}
//                       geography={geo}
//                       fill="#E5E7EB"
//                       stroke="none"
//                       strokeWidth={0.5}
//                     />
//                   ))
//                 }
//               </Geographies>
//             </ComposableMap>

//             {/* Markers */}
//             {locations.map((location, index) => {
//               const isHovered = hoveredLocation === location.id;
//               const isAuto = autoIndex === index;

//               // ✅ Only these IDs get larger pins
//               const isMajor = ['portland', 'newyork', 'delhi', 'uk', 'dubai', 'abudhabi', 'sharjah'].includes(location.id);

//               return (
//                 <div
//                   key={location.id}
//                   className="absolute cursor-pointer group transition-all"
//                   style={{
//                     top: location.position.top,
//                     left: location.position.left,
//                     transform: 'translate(-50%, -50%)',
//                   }}
//                   onMouseEnter={() => setHoveredLocation(location.id)}
//                   onMouseLeave={() => setHoveredLocation(null)}
//                   onClick={() => handleMarkerClick(location)}
//                 >
//                   <div className="relative">
//                     <div className="bg-white rounded-full p-[2px] sm:p-[1.2px] md:p-[1px] shadow-lg transition-all group-hover:bg-blue-700">
//                       <MapPin
//                         className={`text-black fill-black transition-all duration-200 ${
//                           isMajor
//   ? "w-[4px] h-[4px] sm:w-[6px] sm:h-[6px] md:w-[8px] md:h-[8px] lg:w-[14px] lg:h-[14px]"
//   : "w-[2px] h-[2px] sm:w-[3px] sm:h-[3px] md:w-[4px] md:h-[4px]"


//                         }`}
//                       />
//                     </div>

//                     {(isHovered || isAuto) && (
//                       <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-900 text-white px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap shadow-xl z-50 animate-fade">
//                         <div className="font-semibold">{location.name}</div>
//                         <div className="text-gray-300">{location.city}</div>
//                         <div className="text-blue-300 mt-1">Click for details</div>
//                         <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>

      // {showPopup && selectedLocation && (
      //   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      //     <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg p-4 sm:p-6 md:p-8 relative animate-in max-h-[90vh] overflow-y-auto">
      //       <button
      //         onClick={handleClose}
      //         className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
      //       >
      //         <X className="w-5 h-5 md:w-6 md:h-6" />
      //       </button>

      //       <div className="text-center mb-4 sm:mb-6">
      //         <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-blue-100 rounded-full mb-3 sm:mb-4">
      //           <MapPin className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-blue-600" />
      //         </div>
      //         <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
      //           {selectedLocation.name}
      //         </h2>
      //         <p className="text-xs sm:text-sm md:text-base text-gray-500">
      //           Our office in {selectedLocation.country}
      //         </p>
      //       </div>

      //       <div className="space-y-2 sm:space-y-3 md:space-y-4 mb-4 sm:mb-6">
      //         <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 md:p-4 bg-gray-50 rounded-lg">
      //           <MapPin className="w-4 sm:w-5 text-blue-600 mt-0.5 flex-shrink-0" />
      //           <div>
      //             <p className="font-medium text-gray-900 mb-0.5 text-xs sm:text-sm md:text-base">
      //               Address
      //             </p>
      //             <p className="text-gray-600 text-xs sm:text-sm">
      //               RareMinds Technology Solutions<br />
      //               {selectedLocation.city}<br />
      //               {selectedLocation.country}
      //             </p>
      //           </div>
      //         </div>

      //         <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 md:p-4 bg-gray-50 rounded-lg">
      //           <Mail className="w-4 sm:w-5 text-blue-600 flex-shrink-0" />
      //           <div>
      //             <p className="font-medium text-gray-900 mb-0.5 text-xs sm:text-sm md:text-base">
      //               Email
      //             </p>
      //             <p className="text-gray-600 text-xs sm:text-sm">{selectedLocation.email}</p>
      //           </div>
      //         </div>

      //         <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 md:p-4 bg-gray-50 rounded-lg">
      //           <Phone className="w-4 sm:w-5 text-blue-600 flex-shrink-0" />
      //           <div>
      //             <p className="font-medium text-gray-900 mb-0.5 text-xs sm:text-sm md:text-base">
      //               Phone
      //             </p>
      //             <p className="text-gray-600 text-xs sm:text-sm">{selectedLocation.phone}</p>
      //           </div>
      //         </div>
      //       </div>

      //       <div className="space-y-2 sm:space-y-3">
      //         <a
      //           href={selectedLocation.mapLink}
      //           target="_blank"
      //           rel="noopener noreferrer"
      //           className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white font-semibold py-2 sm:py-2.5 md:py-3 px-4 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base shadow-md"
      //         >
      //           View on Google Maps
      //           <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
      //         </a>

      //         <a
      //           href="https://rareminds.in"
      //           target="_blank"
      //           rel="noopener noreferrer"
      //           className="flex items-center justify-center gap-2 w-full bg-gray-100 text-gray-700 font-semibold py-2 sm:py-2.5 md:py-3 px-4 rounded-lg hover:bg-gray-200 transition text-sm sm:text-base"
      //         >
      //           Visit RareMinds Website
      //           <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
      //         </a>
      //       </div>
      //     </div>
      //   </div>
      // )}

//       <div className="mb-0">
//         <p className="text-center text-gray-500 text-xs md:text-sm mt-4 md:mt-6 px-4">
//           Tap or hover over the location markers to see office names, then click to view full details.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default InteractiveWorldMap;


import React, { useState, useEffect, useRef } from 'react';
import { MapPin, X, ExternalLink, Mail, Phone } from 'lucide-react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

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
    { id: 'bangalore', name: 'RareMinds Bangalore', city: '231, 13th Cross Road, Hoysala Nagar, Indiranagar, Bangalore - 560038', country: 'India', position: { top: '53.4%', left: '68.5%' }, mapLink: 'https://www.google.com/maps/search/location+of+rareminds+in+bangalore/@12.9752479,77.631305,3232m/data=!3m2!1e3!4b1?entry=ttu&g_ep=EgoyMDI1MTAyOC4wIKXMDSoASAFQAw%3D%3D', email: 'marketing@rareminds.in', phone: '+91 9562481110' },
    { id: 'goa', name: 'RareMinds Goa', city: 'Goa', country: 'India', position: { top: '53.5%', left: '67.3%' }, mapLink: 'https://www.google.com/maps/search/RareMinds+Goa+India', email: 'marketing@rareminds.in', phone: '+91 xxx xxx xxxx' },
    { id: 'delhi', name: 'RareMinds Delhi', city: 'Delhi', country: 'India', position: { top: '50%', left: '68.6%' }, mapLink: 'https://www.google.com/maps/search/RareMinds+Delhi+India', email: 'marketing@rareminds.in', phone: '+91 xxx xxx xxxx' },
    { id: 'mumbai', name: 'RareMinds Mumbai', city: 'Mumbai, Maharashtra', country: 'India', position: { top: '49.9%', left: '67.1%' }, mapLink: 'https://www.google.com/maps/search/RareMinds+Mumbai+India', email: 'marketing@rareminds.in', phone: '+91 xxx xxx xxxx' },
    { id: 'pune', name: 'RareMinds Pune', city: 'Pune, Maharashtra', country: 'India', position: { top: '51%', left: '67.1%' }, mapLink: 'https://www.google.com/maps/search/RareMinds+Pune+India', email: 'marketing@rareminds.in', phone: '+91 xxx xxx xxxx' },
    { id: 'salem', name: 'RareMinds Salem', city: 'Salem, Tamil Nadu', country: 'India', position: { top: '56.8%', left: '68.2%' }, mapLink: 'https://www.google.com/maps/search/RareMinds+Salem+Tamil+Nadu+India', email: 'marketing@rareminds.in', phone: '+91 xxx xxx xxxx' },
    { id: 'vellore', name: 'RareMinds Vellore', city: 'Vellore, Tamil Nadu', country: 'India', position: { top: '55.5%', left: '69%' }, mapLink: 'https://www.google.com/maps/search/RareMinds+Vellore+Tamil+Nadu+India', email: 'marketing@rareminds.in', phone: '+91 xxx xxx xxxx' },
    { id: 'coimbatore', name: 'RareMinds Coimbatore', city: 'Coimbatore, Tamil Nadu', country: 'India', position: { top: '54.9%', left: '69%' }, mapLink: 'https://www.google.com/maps/search/RareMinds+Coimbatore+Tamil+Nadu+India', email: 'marketing@rareminds.in', phone: '+91 xxx xxx xxxx' },
    { id: 'madurai', name: 'RareMinds Madurai', city: 'Madurai, Tamil Nadu', country: 'India', position: { top: '56.1%', left: '69%' }, mapLink: 'https://www.google.com/maps/search/RareMinds+Madurai+Tamil+Nadu+India', email: 'marketing@rareminds.in', phone: '+91 xxx xxx xxxx' },
    { id: 'tirunelveli', name: 'RareMinds Tirunelveli', city: 'Tirunelveli, Tamil Nadu', country: 'India', position: { top: '56.5%', left: '68.8%' }, mapLink: 'https://www.google.com/maps/search/RareMinds+Tirunelveli+Tamil+Nadu+India', email: 'marketing@rareminds.in', phone: '+91 xxx xxx xxxx' },
    { id: 'karaikudi', name: 'RareMinds Karaikudi', city: 'Karaikudi, Tamil Nadu', country: 'India', position: { top: '55.2%', left: '69.2%' }, mapLink: 'https://www.google.com/maps/search/RareMinds+Karaikudi+Tamil+Nadu+India', email: 'marketing@rareminds.in', phone: '+91 xxx xxx xxxx' },
    { id: 'dubai', name: 'RareMinds Dubai', city: 'Dubai', country: 'UAE', position: { top: '47%', left: '61.5%' }, mapLink: 'https://www.google.com/maps/search/RareMinds+Dubai+UAE', email: 'dubai@rareminds.in', phone: '+971 xxx xxx xxxx' },
    { id: 'abudhabi', name: 'RareMinds Abu Dhabi', city: 'Abu Dhabi', country: 'UAE', position: { top: '47.2%', left: '61%' }, mapLink: 'https://www.google.com/maps/search/RareMinds+Abu+Dhabi+UAE', email: 'marketing@rareminds.in', phone: '+971 xxx xxx xxxx' },
    { id: 'sharjah', name: 'RareMinds Sharjah', city: 'Sharjah', country: 'UAE', position: { top: '48.3%', left: '61.7%' }, mapLink: 'https://www.google.com/maps/search/RareMinds+Sharjah+UAE', email: 'marketing@rareminds.in', phone: '+971 xxx xxx xxxx' },
    { id: 'uk', name: 'RareMinds UK', city: 'London', country: 'United Kingdom', position: { top: '22%', left: '42.8%' }, mapLink: 'https://www.google.com/maps/search/RareMinds+London+UK', email: 'marketing@rareminds.in', phone: '+44 xxx xxx xxxx' },
    { id: 'newyork', name: 'RareMinds New York', city: 'New York, NY', country: 'United States', position: { top: '37%', left: '19%' }, mapLink: 'https://www.google.com/maps/search/RareMinds+New+York+NY+USA', email: 'marketing@rareminds.in', phone: '+1 xxx xxx xxxx' },
    { id: 'portland', name: 'RareMinds Portland', city: 'Portland, OR', country: 'United States', position: { top: '30.5%', left: '4.5%' }, mapLink: 'https://www.google.com/maps/search/RareMinds+Portland+OR+USA', email: 'marketing@rareminds.in', phone: '+1 xxx xxx xxxx' },
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
    <div className="bg-white py-5 md:py-18">
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

      <div className="max-w-full mx-auto px-1 sm:px-4 md:px-6 py-6 md:py-12">
        <div className="bg-white rounded-xl md:rounded-2xl p-2 sm:p-4 md:p-8 relative overflow-hidden">
          <div className="relative w-full aspect-[16/9] md:aspect-[2/1] bg-gray-50 rounded-lg md:rounded-xl overflow-hidden">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{ scale: 147, center: [20, 20] }}
              width={800}
              height={400}
              className="w-full h-full opacity-40"
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
                    <div className="transition-all group-hover:bg-blue-700">
                      <MapPin
                        className={`text-black fill-black transition-all duration-200 ${
                          isMajor
                            ? "w-[4px] h-[4px] sm:w-[6px] sm:h-[6px] md:w-[8px] md:h-[8px] lg:w-[14px] lg:h-[14px]"
                            : "w-[2px] h-[2px] sm:w-[3px] sm:h-[3px] md:w-[4px] md:h-[4px]"
                        }`}
                      />
                    </div>

                    {/* ✅ Tooltip visible on hover OR during auto animation */}
{/* 
{(isHovered || (isAuto && showAutoPopup)) && (
  <div
    className={`absolute ${
      location.id === "portland"
        ? "top-[115%] left-[54.8%] lg:left-1/2  -translate-x-1/2 px-2 py-1.5 lg:px-2 lg:py-1.5 md:top-[100%] md:left-[54.8%] md-translate-x-1/2 md:px-4 md:py-1 max-sm:top[90] max-sm:left-[45%] max-sm:translate-x-0 max-sm:px-1 max-sm:py-0.5"
        : "top-full left-1/2 -translate-x-1/2 px-3 py-2 lg:px-3 lg:py-2 md:px-2 md:py-1 max-sm:px-1 max-sm:py-0.5"
    } mt-2 bg-gray-900 text-white rounded-lg max-sm:rounded-md text-xs lg:text-xs md:text-xs max-sm:text-[5px] font-medium whitespace-nowrap shadow-xl max-sm:shadow-md z-50 max-sm:z-40 animate-fade`}
  >

    
    <div
      className={`font-semibold ${
        location.id === "portland"
          ? "text-[11.5px] lg:text-[11.5px] md:text-[7.5px] max-sm:text-[5px]"
          : "text-[12px] lg:text-[12px] md:text-[11px] max-sm:text-[8px]"
      }`}
    >
      {location.name}
    </div>

    
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


    <div
      className={`text-blue-300 mt-1 ${
        location.id === "portland"
          ? "text-[10px] lg:text-[10px] md:text-[9px] max-sm:text-[8px]"
          : "text-[10.5px] lg:text-[10.5px] md:text-[9.5px] max-sm:text-[8.5px]"
      }`}
    >
      Click for details
    </div>


    <div
      className={`absolute -top-1 ${
        location.id === "portland"
          ? "left-[47%] max-sm:left-[5%]"
          : "left-1/2 -translate-x-1/2"
      } w-2 h-2 lg:w-2 lg:h-2 md:w-1.5 md:h-1.5 max-sm:w-1 max-sm:h-1 bg-gray-900 rotate-45`}
    ></div>
  </div>
)} */}
{(isHovered || (isAuto && showAutoPopup)) && (
  <div
    className={`absolute ${
      location.id === "portland"
        ? // ✅ PORTLAND fixed for all screens
          "top-[115%] left-1/2 -translate-x-1/2 px-2 py-1.5 md:top-[110%] md:left-1/2 md:-translate-x-1/2 sm:top-[108%] sm:left-1/2 sm:-translate-x-1/2 max-sm:top-[105%] max-sm:left-1/2 max-sm:-translate-x-1/2 max-sm:px-1 max-sm:py-0.5"
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
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-blue-600" />
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
        <p className="text-center text-gray-500 text-xs md:text-sm mt-4 md:mt-6 px-4">
          Tap or hover over the location markers to see office names, then click to view full details.
        </p>
        </div>
    </div>
  );
};

export default InteractiveWorldMap;

{/* 
{(isHovered || (isAuto && showAutoPopup)) && (
  <div
  className={`absolute ${
    location.id === "portland"
      ? "top-[115%] left-[54.8%] -translate-x-1/2 px-2 py-1.5 lg:px-2 lg:py-1.5 md:px-4 md:py-1 sm:left-[60%] sm:translate-x-0 sm:px-1 sm:py-0.5"
      : "top-full left-1/2 -translate-x-1/2 px-3 py-2 lg:px-3 lg:py-2 md:px-2 md:py-1 sm:px-1 sm:py-0.5"
  } mt-2 bg-gray-900 text-white rounded-lg sm:rounded-md text-xs lg:text-xs md:text-xs sm:text-[5px] font-medium whitespace-nowrap shadow-xl sm:shadow-md z-50 sm:z-40 animate-fade`}
>

    <div
  className={`font-semibold ${
    location.id === "portland"
      ? "text-[11.5px] lg:text-[11.5px] md:text-[10.5px] sm:text-[5.5px]"
      : "text-[12px] lg:text-[12px] md:text-[11px] sm:text-[5px]"
  }`}
>
  {location.name}
</div>

    <div
  className={`text-gray-300 ${
    location.id === "portland"
      ? "text-[10.5px] lg:text-[10.5px] md:text-[9.5px] sm:text-[5.5px]"
      : "text-[11px] lg:text-[11px] md:text-[10px] sm:text-[5px]"
  }`}
  style={
    location.id === "bangalore"
      ? { 
          whiteSpace: "normal", 
          width: "220px", 
          textAlign: "left",
          lineHeight: "1.2"
        }
      : {}
  }
>
  {location.id === "bangalore"
    ? `231, 13th Cross Road, Hoysala Nagar,
\nIndiranagar, Bangalore - 560038`
    : location.city}
</div>

    <div
  className={`text-blue-300 mt-1 ${
    location.id === "portland"
      ? "text-[10px] lg:text-[10px] md:text-[9px] sm:text-[5px]"
      : "text-[10.5px] lg:text-[10.5px] md:text-[9.5px] sm:text-[5.5px]"
  }`}
>
  Click for details
</div>

   <div
  className={`absolute -top-1 ${
    location.id === "portland"
      ? "left-[47%] sm:left-[15%]"
      : "left-1/2 -translate-x-1/2"
  } w-2 h-2 lg:w-2 lg:h-2 md:w-1.5 md:h-1.5 sm:w-1.5 sm:h-1.5 bg-gray-900 rotate-45`}
></div>
  </div>
)} */}