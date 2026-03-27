// import React from 'react';

// interface Project {
//   id: number;
//   name: string;
//   description: string;
//   category: string;
//   location: string;
//   timeline: string;
//   imageUrl: string;
// }

// interface ProjectsGridProps {
//   projects: Project[];
//   searchQuery: string;
//   onClearSearch: () => void;
// }

// export const ProjectsGrid = ({ projects, searchQuery, onClearSearch }: ProjectsGridProps) => {
//   return (
//     <>
//       {/* Projects Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {projects.map((project) => (
//           <div key={project.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-[1.02] flex flex-col h-full">
//             {/* Image Section */}
//             <div className="h-48 overflow-hidden">
//               <img
//                 src={project.imageUrl}
//                 alt={project.name}
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             {/* Content Section */}
//             <div className="p-6 flex flex-col flex-1">
//               <div className="flex justify-between items-start mb-4">
//                 <h3 className="text-xl font-bold text-gray-900">{project.name}</h3>
//                 <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
//                   {project.category}
//                 </span>
//               </div>

//               <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>

//               <div className="space-y-2 mb-4">
//                 <div className="flex items-center text-gray-600">
//                   <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h4M9 21v-4a2 2 0 012-2h2a2 2 0 012 2v4" />
//                   </svg>
//                   <span className="text-sm">{project.category}</span>
//                 </div>
//                 <div className="flex items-center text-gray-600">
//                   <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                   </svg>
//                   <span className="text-sm">{project.location}</span>
//                 </div>
//                 <div className="flex items-center text-gray-600">
//                   <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   <span className="text-sm">{project.timeline}</span>
//                 </div>
//               </div>

//               {/* Button at Bottom */}
//               <div className="mt-auto">
//                 <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors">
//                   View Details
//                   <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Empty State */}
//       {projects.length === 0 && (
//         <div className="text-center py-16">
//           <h2 className="text-2xl font-semibold mb-4 text-gray-700">No Success Stories Found</h2>
//           <p className="text-gray-500 text-lg mb-8">
//             Try adjusting your search terms to find more stories.
//           </p>
//           <button 
//             onClick={onClearSearch}
//             className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Clear Search
//           </button>
//         </div>
//       )}
//     </>
//   );
// };


import React from 'react';
import { Pagination } from './Pagination';
import { BuildingLibraryIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';

interface Project {
  id: number;
  name: string;
  description: string;
  category: string;
  location: string;
  timeline: string;
  imageUrl: string;
}

interface ProjectsGridProps {
  projects: Project[];
  searchQuery: string;
  onClearSearch: () => void;
}

export const ProjectsGrid = ({ projects, searchQuery, onClearSearch }: ProjectsGridProps) => {
  const [expandedCards, setExpandedCards] = React.useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 6; // Show 6 cards per page (2 rows of 3)

  const toggleExpanded = (projectId: number) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(projectId)) {
      newExpanded.delete(projectId);
    } else {
      newExpanded.add(projectId);
    }
    setExpandedCards(newExpanded);
  };

  // Auto-collapse on scroll for mobile only
  React.useEffect(() => {
    const handleScroll = () => {
      // Only on mobile (screen width < 640px) and if there are expanded cards
      if (window.innerWidth < 640 && expandedCards.size > 0) {
        setExpandedCards(new Set());
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [expandedCards]);

  // Calculate pagination
  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = projects.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of grid when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-16">
        {currentProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-xl border border-gray-400 shadow-sm overflow-hidden flex flex-col h-full transition-shadow hover:shadow-md"
          >
            {/* Content Section */}
            <div className="p-4 sm:p-6 flex flex-col flex-1">

              {/* Centered Title */}
              <h3 className="text-sm sm:text-lg font-bold text-gray-900 text-center mb-3 min-h-[3.5rem] flex items-center justify-center">
                {project.name}
              </h3>

              {/* Logo + Description Row */}
              <div className="flex items-start gap-4 mb-3 h-24 sm:h-32">
                {/* Logo */}
                <div className="w-20 h-20 sm:w-32 sm:h-32 flex-shrink-0 flex items-center justify-center">
                  <img
                    src={project.imageUrl}
                    alt={project.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                {/* Description */}
                <div className="flex-1 h-full flex items-start">
                  <div className="w-full">
                    <p className={`text-gray-900 font-normal text-xs sm:text-sm leading-relaxed sm:leading-relaxed ${
                      expandedCards.has(project.id) ? '' : 'line-clamp-4'
                    }`}>
                      {project.description}
                    </p>
                    {project.description.length > 150 && (
                      <button
                        onClick={() => toggleExpanded(project.id)}
                        className="text-blue-500 text-xs mt-1 hover:text-blue-700 transition-colors"
                      >
                        {expandedCards.has(project.id) ? 'Show less' : 'Show more...'}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 mb-3" />

              {/* Meta Info Row — category, location, timeline */}
              <div className="flex flex-row items-start sm:items-center justify-between text-gray-500 text-xs sm:text-sm mb-6 gap-2 sm:gap-0">

                {/* Category */}
                <div className="flex items-start sm:items-center gap-1 sm:gap-1.5 flex-1 sm:flex-none justify-center sm:justify-start">
                  <BuildingLibraryIcon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5 sm:mt-0" />
                  <span className="text-xs sm:text-sm leading-tight font-normal text-gray-900 text-center sm:text-left break-words sm:truncate">{project.category}</span>
                </div>

                {/* Location */}
                <div className="flex items-start sm:items-center gap-1 sm:gap-1.5 flex-1 sm:flex-none justify-center sm:justify-start">
                  <MapPinIcon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5 sm:mt-0" />
                  <span className="text-xs sm:text-sm leading-tight font-normal text-gray-900 text-center sm:text-left break-words sm:truncate">{project.location}</span>
                </div>

                {/* Timeline */}
                <div className="flex items-start sm:items-center gap-1 sm:gap-1.5 flex-1 sm:flex-none justify-center sm:justify-start">
                  <ClockIcon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5 sm:mt-0" />
                  <span className="text-xs sm:text-sm leading-tight font-normal text-gray-900 text-center sm:text-left break-words sm:truncate">{project.timeline}</span>
                </div>

              </div>

              {/* View Details Button */}
              {/* <div className="mt-auto flex justify-center">
                <button 
                  className={
                    project.id % 3 === 2 
                      ? "border-2 border-blue-500 hover:bg-blue-50 text-blue-500 text-xs sm:text-sm font-semibold px-4 sm:px-8 py-1.5 sm:py-2.5 rounded-full transition-colors duration-200"
                      : "bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-sm font-semibold px-4 sm:px-8 py-1.5 sm:py-2.5 rounded-full transition-colors duration-200"
                  }
                >
                  View Details
                </button>
              </div> */}
              <div className="mt-auto flex justify-center">
  <button 
    className={
      project.id % 3 === 2 
        ? "w-[139px] h-[27px] flex items-center justify-center border-2 border-blue-500 hover:bg-blue-50 text-blue-500 text-xs sm:text-sm font-semibold rounded-full transition-colors duration-200"
        : "w-[139px] h-[27px] flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-sm font-semibold rounded-full transition-colors duration-200"
    }
  >
    View Details
  </button>
</div>

            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* Empty State */}
      {projects.length === 0 && (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">No Success Stories Found</h2>
          <p className="text-gray-500 text-lg mb-8">
            Try adjusting your search terms to find more stories.
          </p>
          <button
            onClick={onClearSearch}
            className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors"
          >
            Clear Search
          </button>
        </div>
      )}
    </>
  );
};

