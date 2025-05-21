import React, { useEffect, useState } from 'react';
import { Header } from '../../../components/Academy/Project/Project/Header';
import { Filters } from '../../../components/Academy/Project/Project/Filters';
import { ProjectCard } from '../../../components/Academy/Project/Project/ProjectCard';
import { ProjectModal } from '../../../components/Academy/Project/Project/ProjectModal';
import { projects } from '../../../components/Academy/Project/Data/projects';
import { useProjectSearch } from '../../../components/Academy/Project/hooks/useProjectSearch';
import  AcademyHeader from '../../../components/Header/AcademyHeader'
// Define Project type locally if not available from '../../types/index'
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

  return (
    <div className="min-h-screen bg-gray-50">
      < AcademyHeader/>
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <main className="container mx-auto px-4 py-8">
        <Filters onFilterChange={handleFilterChange} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={setSelectedProject}
            />
          ))}
        </div>

        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </main>
    </div>
  );
}

export default Projectlist;