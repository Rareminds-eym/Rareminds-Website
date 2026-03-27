import React, { useState } from 'react';
import { Header } from '../../../components/Academy/SuccessStories/Header';
import { Filters } from '../../../components/Academy/SuccessStories/Filters';
import { ProjectsGrid } from '../../../components/Academy/SuccessStories/ProjectsGrid';
import { projects } from '../../../components/Academy/SuccessStories/SuccessStorieslistings';
import AcademyHeader from '../../../components/Header/AcademyHeader';

function SuccessStoriesDisplay() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: 'All',
    name: 'All',
    year: 'All',
    location: 'All'
  });

  const handleFilterChange = (type: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      category: 'All',
      name: 'All',
      year: 'All',
      location: 'All'
    });
    setSearchQuery('');
  };

  // Filter projects based on search query and filters
  const filteredProjects = projects.filter(project => {
    // Search filter
    const matchesSearch = searchQuery === '' || 
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase());

    // Category filter
    const matchesCategory = filters.category === 'All' || 
      project.category === filters.category;

    // Name filter
    const matchesName = filters.name === 'All' || 
      project.name === filters.name;

    // Year filter
    const matchesYear = filters.year === 'All' || 
      project.timeline.includes(filters.year);

    // Location filter
    const matchesLocation = filters.location === 'All' || 
      project.location === filters.location;

    return matchesSearch && matchesCategory && matchesName && matchesYear && matchesLocation;
  });

  // Check if any filters are active
  const hasActiveFilters = Object.values(filters).some(value => value !== 'All') || searchQuery !== '';

  return (
    <div className="min-h-screen bg-gray-50">
      <AcademyHeader />
      
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="container mx-auto px-4 pt-16 pb-8">
        <Filters 
          onFilterChange={handleFilterChange} 
          onMenuToggle={setIsFilterMenuOpen}
          onClearFilters={handleClearFilters}
          filters={filters}
        />
        
        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <div className="flex justify-center mt-4">
            <button
              onClick={handleClearFilters}
              className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors text-sm font-medium"
            >
              Clear All Filters
            </button>
          </div>
        )}
        
        {/* Consistent spacing to match hero-to-filters spacing */}
        <div className="mt-16">
          <ProjectsGrid 
            projects={filteredProjects}
            searchQuery={searchQuery}
            onClearSearch={() => setSearchQuery('')}
          />
        </div>
      </main>
    </div>
  );
}

export default SuccessStoriesDisplay;