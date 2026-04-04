import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Pagination } from './Pagination';
import type { TransformedProgram } from '../../../types/program';

interface ProjectsGridProps {
  projects: TransformedProgram[];
  onClearSearch: () => void;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  onPageChange: (page: number) => void;
}

export const ProjectsGrid = ({ 
  projects, 
  onClearSearch, 
  currentPage, 
  totalPages, 
  totalCount, 
  onPageChange 
}: ProjectsGridProps) => {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const toggleExpanded = (projectId: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(projectId)) {
      newExpanded.delete(projectId);
    } else {
      newExpanded.add(projectId);
    }
    setExpandedCards(newExpanded);
  };

  // Auto-collapse on scroll for mobile only
  useEffect(() => {
    const handleScroll = () => {
      // Only on mobile (screen width < 640px) and if there are expanded cards
      if (window.innerWidth < 640 && expandedCards.size > 0) {
        setExpandedCards(new Set());
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [expandedCards]);

  return (
    <>
      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-16">
        {projects.map((project) => (
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
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5 sm:mt-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h4M9 21v-4a2 2 0 012-2h2a2 2 0 012 2v4" />
                  </svg>
                  <span className="text-xs sm:text-sm leading-tight font-normal text-gray-900 text-center sm:text-left break-words sm:truncate">{project.category}</span>
                </div>

                {/* Location */}
                <div className="flex items-start sm:items-center gap-1 sm:gap-1.5 flex-1 sm:flex-none justify-center sm:justify-start">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5 sm:mt-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-xs sm:text-sm leading-tight font-normal text-gray-900 text-center sm:text-left break-words sm:truncate">{project.location}</span>
                </div>

                {/* Timeline */}
                <div className="flex items-start sm:items-center gap-1 sm:gap-1.5 flex-1 sm:flex-none justify-center sm:justify-start">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5 sm:mt-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs sm:text-sm leading-tight font-normal text-gray-900 text-center sm:text-left break-words sm:truncate">{project.timeline}</span>
                </div>

              </div>

              {/* View Details Button */}
              <div className="mt-auto flex justify-center">
                <Link 
                  to={
                    project.category === 'Naan Mudhalvan' 
                      ? `/SuccessStories/naan-mudhalvan/${project.slug}`
                      : `/SuccessStories/${project.slug}`
                  }
                  className={
                    project.id % 3 === 2 
                      ? "w-[139px] h-[27px] flex items-center justify-center border-2 border-blue-500 hover:bg-blue-50 text-blue-500 text-xs sm:text-sm font-semibold rounded-full transition-colors duration-200"
                      : "w-[139px] h-[27px] flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-sm font-semibold rounded-full transition-colors duration-200"
                  }
                >
                  View Details
                </Link>
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
          onPageChange={onPageChange}
        />
      )}

      {/* Results Summary */}
      {totalCount > 0 && (
        <div className="text-center text-sm text-gray-600 mt-4">
          Showing {projects.length} of {totalCount} programs (Page {currentPage} of {totalPages})
        </div>
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