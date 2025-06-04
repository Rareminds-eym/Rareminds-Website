  // import React, { useEffect, useState } from 'react';
  // import { Header } from '../../../components/Academy/Project/Project/Header';
  // import { Filters } from '../../../components/Academy/Project/Project/Filters';
  // import { ProjectCard } from '../../../components/Academy/Project/Project/ProjectCard';
  // import { ProjectModal } from '../../../components/Academy/Project/Project/ProjectModal';
  // import { projects } from '../../../components/Academy/Project/Data/projects';
  // import { useProjectSearch } from '../../../components/Academy/Project/hooks/useProjectSearch';
  // import AcademyHeader from '../../../components/Header/AcademyHeader'
  // // Define Project type locally if not available from '../../types/index'
  // export type Project = {
  //   id: string;
  //   title: string;
  //   description: string;
  //   // Add other fields as needed
  // };

  // function Projectlist() {
  //   const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  //   const {
  //     searchQuery,
  //     setSearchQuery, 
  //     filters,
  //     handleFilterChange,
  //     filteredProjects
  //   } = useProjectSearch(projects);

  //   // Pagination state
  //   const [currentPage, setCurrentPage] = useState(1);
  //   const itemsPerPage = 10;
  //   const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  //   const paginatedProjects = filteredProjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  //   return (
  //     <div className="min-h-screen bg-gray-50">
  //       <AcademyHeader/>
  //       <Header
  //         searchQuery={searchQuery}
  //         onSearchChange={setSearchQuery}
  //       />
        
  //       <main className="container mx-auto px-4 py-8">
  //         <Filters onFilterChange={handleFilterChange} />
          
  //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  //           {paginatedProjects.map((project) => (
  //             <ProjectCard
  //               key={project.id}
  //               project={project}
  //               onClick={setSelectedProject}
  //             />
  //           ))}
  //         </div>
  //         {filteredProjects.length > itemsPerPage && (
  //           <div className="flex justify-center mt-8 gap-2">
  //             <button
  //               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
  //               disabled={currentPage === 1}
  //               className={`px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
  //             >
  //               Previous
  //             </button>
  //             {[...Array(totalPages)].map((_, idx) => (
  //               <button
  //                 key={idx + 1}
  //                 onClick={() => setCurrentPage(idx + 1)}
  //                 className={`px-3 py-2 rounded ${currentPage === idx + 1 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-blue-100'}`}
  //               >
  //                 {idx + 1}
  //               </button>
  //             ))}
  //             <button
  //               onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
  //               disabled={currentPage === totalPages}
  //               className={`px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
  //             >
  //               Next
  //             </button>
  //           </div>
  //         )}

  //         {/* {selectedProject && (
  //           <ProjectModal
  //             project={selectedProject}
  //             onClose={() => setSelectedProject(null)}
  //           />
  //         )} */}
  //       </main>
  //     </div>
  //   );
  // }
import React, { useEffect, useState } from 'react';
import { Header } from '../../../components/Academy/Project/Project/Header';
import { Filters } from '../../../components/Academy/Project/Project/Filters';
import { ProjectCard } from '../../../components/Academy/Project/Project/ProjectCard';
import { ProjectModal } from '../../../components/Academy/Project/Project/ProjectModal';
import { projects } from '../../../components/Academy/Project/Data/projects';
import { useProjectSearch } from '../../../components/Academy/Project/hooks/useProjectSearch';
import AcademyHeader from '../../../components/Header/AcademyHeader';

// Define Project type locally if not available
export type Project = {
  id: string;
  title: string;
  description: string;
  // Add other fields as needed
};

function Projectlist() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const {
    searchQuery,
    setSearchQuery,
    filters,
    handleFilterChange,
    filteredProjects
  } = useProjectSearch(projects);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  // Reverse and paginate projects
  const paginatedProjects = [...filteredProjects]
    .reverse()
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-gray-50">
      <AcademyHeader />
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="container mx-auto px-4 py-8">
        <Filters onFilterChange={handleFilterChange} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={setSelectedProject}
            />
          ))}
        </div>

        {filteredProjects.length > itemsPerPage && (
          <div className="flex justify-center mt-8 gap-2 flex-wrap">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx + 1}
                onClick={() => setCurrentPage(idx + 1)}
                className={`px-3 py-2 rounded ${currentPage === idx + 1 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-blue-100'}`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Next
            </button>
          </div>
        )}

        {/* Uncomment if modal is needed */}
        {/* {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )} */}
      </main>
    </div>
  );
}

export default Projectlist;
