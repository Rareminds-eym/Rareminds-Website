import { useState, useEffect } from 'react';
import { Header } from '../../../components/Academy/SuccessStories/Header';
import { Filters } from '../../../components/Academy/SuccessStories/Filters';
import { ProjectsGrid } from '../../../components/Academy/SuccessStories/ProjectsGrid';
import { getPrograms, getProgramFilterOptions } from '../../../lib/api/programs';
import AcademyHeader from '../../../components/Header/AcademyHeader';
import type { Program, TransformedProgram, FilterState } from '../../../types/program';

function SuccessStoriesDisplay() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [filterOptions, setFilterOptions] = useState({
    categories: ['All'],
    names: ['All'],
    years: ['All'],
    locations: ['All']
  });
  const [filters, setFilters] = useState<FilterState>({
    category: 'All',
    name: 'All',
    year: 'All',
    location: 'All'
  });

  const itemsPerPage = 6;

  // Fetch programs with pagination and filters
  useEffect(() => {
    async function fetchPrograms() {
      try {
        setLoading(true);
        setError(null);
        console.log('🔄 Fetching programs with pagination...');
        
        const response = await getPrograms({
          page: currentPage,
          limit: itemsPerPage,
          search: searchQuery,
          filters: filters
        });
        
        console.log('📊 Paginated API Response:', response);
        
        if (response.error) {
          const errorMsg = `Database connection failed: ${JSON.stringify(response.error)}`;
          setError(errorMsg);
          console.error('❌ Error fetching programs:', response.error);
          setPrograms([]);
          setTotalPages(0);
          setTotalCount(0);
        } else if (response.data) {
          console.log('✅ Programs fetched successfully:', response.data.length, 'programs, page', response.currentPage, 'of', response.totalPages);
          setPrograms(response.data);
          setTotalPages(response.totalPages);
          setTotalCount(response.totalCount);
          setError(null);
        } else {
          setPrograms([]);
          setTotalPages(0);
          setTotalCount(0);
          setError('No programs found in database');
        }
      } catch (err: any) {
        const errorMsg = `Failed to connect to database: ${err.message}`;
        setError(errorMsg);
        console.error('💥 Fetch error:', err);
        setPrograms([]);
        setTotalPages(0);
        setTotalCount(0);
      } finally {
        setLoading(false);
      }
    }

    fetchPrograms();
  }, [currentPage, searchQuery, filters]); // Re-fetch when page, search, or filters change

  // Fetch filter options on component mount
  useEffect(() => {
    async function fetchFilterOptions() {
      try {
        const options = await getProgramFilterOptions();
        setFilterOptions(options);
      } catch (error) {
        console.error('Error fetching filter options:', error);
      }
    }

    fetchFilterOptions();
  }, []);

  const handleFilterChange = (type: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: value
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleClearFilters = () => {
    setFilters({
      category: 'All',
      name: 'All',
      year: 'All',
      location: 'All'
    });
    setSearchQuery('');
    setCurrentPage(1); // Reset to first page when clearing filters
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when search changes
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  // Transform programs to match the expected Project interface
  const transformedPrograms: TransformedProgram[] = programs.map(program => ({
    id: program.id,
    name: program.title,
    description: program.short_description,
    category: program.program_type,
    location: program.location,
    timeline: formatDate(program.date),
    imageUrl: program.image_url,
    status: program.status,
    slug: program.slug
  }));

  // Check if any filters are active
  const hasActiveFilters = Object.values(filters).some(value => value !== 'All') || searchQuery !== '';

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AcademyHeader />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading success stories...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AcademyHeader />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-2xl mx-auto p-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-4">
              <h3 className="text-lg font-semibold text-red-800 mb-2">Database Connection Error</h3>
              <p className="text-red-600 mb-4 text-sm">{error}</p>
              <div className="text-left bg-red-100 p-3 rounded text-xs font-mono">
                <p><strong>Supabase URL:</strong> {import.meta.env.VITE_SUPABASE_URL}</p>
                <p><strong>Has API Key:</strong> {!!import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Yes' : 'No'}</p>
              </div>
            </div>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show debug info if no programs
  if (programs.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AcademyHeader />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-2xl mx-auto p-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-4">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">No Programs Found</h3>
              <p className="text-yellow-600 mb-4">The database connection is working, but no programs were returned for the current filters.</p>
              <div className="text-left bg-yellow-100 p-3 rounded text-xs font-mono">
                <p><strong>API Status:</strong> Connected ✅</p>
                <p><strong>Current Page:</strong> {currentPage}</p>
                <p><strong>Total Count:</strong> {totalCount}</p>
                <p><strong>Programs on Page:</strong> {programs.length}</p>
                <p><strong>Error:</strong> {error || 'None'}</p>
              </div>
            </div>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AcademyHeader />
      
      <Header
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      <main className="container mx-auto px-4 pt-16 pb-8">
        <Filters 
          onFilterChange={handleFilterChange} 
          onClearFilters={handleClearFilters}
          filters={filters}
          filterOptions={filterOptions}
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
            projects={transformedPrograms}
            onClearSearch={() => setSearchQuery('')}
            currentPage={currentPage}
            totalPages={totalPages}
            totalCount={totalCount}
            onPageChange={handlePageChange}
          />
        </div>
      </main>
    </div>
  );
}

export default SuccessStoriesDisplay;