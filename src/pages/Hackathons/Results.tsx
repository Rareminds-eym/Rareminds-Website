import { Link, useParams } from 'react-router-dom';
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { ArrowLeft, Search, Filter, Users, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { gmpStats, gmpLevel2Stats, calculateGMPLevel2Stats, type CourseStats, type UniversityStats } from './data/gmp-results';
import { fsqmStats, fsqmLevel2Stats, calculateFSQMLevel2Stats } from './data/fsqm-results';
import { mcStats, mcLevel2Stats, calculateMCLevel2Stats } from './data/mc-results';
import { useHackathonResults } from '../../hooks/useHackathonResults';

import type { College } from './data/mc-results';

const HackathonResults: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedCollege, setSelectedCollege] = useState('');
  const [selectedCollegeCode, setSelectedCollegeCode] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('Level2'); // New: Level filter state - Default to Level2
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [sortOption, setSortOption] = useState<'none' | 'university' | 'college_name' | 'team_name'>('none'); // New: Sort state
  const [currentPage, setCurrentPage] = useState(1);
  const [dynamicLevel2Stats, setDynamicLevel2Stats] = useState<CourseStats | null>(null); // State for dynamic Level 2 stats
  const itemsPerPage = 9;
  const resultsSummaryRef = useRef<HTMLDivElement>(null);

  // Use the custom hook to fetch data
  const { colleges, loading, error } = useHackathonResults(slug, selectedLevel);

  // Set default course based on route
  useEffect(() => {
    if (slug === 'capathon') {
      setSelectedCourse('GMP');
      console.log('Route: /capathon/results - Will fetch from gmp_results table only');
    } else if (slug === 'codecare-2-0') {
      setSelectedCourse('MC');
      console.log('Route: /codecare-2-0/results - Will fetch from mc_results table only');
    } else if (slug === 'safe-bite-2-0') {
      setSelectedCourse('FSQM');
      console.log('Route: /safe-bite-2-0/results - Will use static FSQM data');
    }
  }, [slug]);

  // Calculate dynamic Level 2 stats when Level 2 is selected
  useEffect(() => {
    const calculateLevel2Stats = async () => {
      if (selectedLevel === 'Level2' && slug) {
        try {
          let stats = null;
          if (slug === 'capathon') {
            stats = await calculateGMPLevel2Stats();
          } else if (slug === 'codecare-2-0') {
            stats = await calculateMCLevel2Stats();
          } else if (slug === 'safe-bite-2-0') {
            stats = await calculateFSQMLevel2Stats();
          }
          setDynamicLevel2Stats(stats);
        } catch (error) {
          console.error('Error calculating Level 2 stats:', error);
          setDynamicLevel2Stats(null);
        }
      } else {
        setDynamicLevel2Stats(null);
      }
    };

    calculateLevel2Stats();
  }, [selectedLevel, slug, colleges]); // Re-calculate when colleges data changes

  // Filter colleges based on search and filters
  const filteredColleges = useMemo(() => {
    let filtered = colleges;
 
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(college =>
        college.college_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        college.college_code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        college.university?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply university filter
    if (selectedUniversity) {
      filtered = filtered.filter(college => college.university === selectedUniversity);
    }

    // Apply college filter
    if (selectedCollege) {
      filtered = filtered.filter(college => college.college_code === selectedCollege);
    }

    // Apply college code filter
    if (selectedCollegeCode) {
      filtered = filtered.filter(college => college.college_code === selectedCollegeCode);
    }

    // Apply course filter
    if (selectedCourse) {
      filtered = filtered.filter(college => college.course_name === selectedCourse);
    }

    // Apply level filter - now handled by the hook, but keep this for any additional Level2-specific filtering if needed
    // The hook will fetch Level1 data from fsqm_results or Level2 data from fsqm_h2_results
    // No additional filtering needed here since the data source changes based on level

    return filtered;
  }, [colleges, searchTerm, selectedUniversity, selectedCollege, selectedCollegeCode, selectedCourse, selectedLevel]);

  // Apply sorting to filtered colleges
  const sortedAndFilteredColleges = useMemo(() => {
    let result = [...filteredColleges];

    if (sortOption === 'university') {
      result.sort((a, b) =>
        (a.university || '').localeCompare(b.university || '')
      );
    } else if (sortOption === 'college_name') {
      result.sort((a, b) =>
        (a.college_name || '').localeCompare(b.college_name || '')
      );
    } else if (sortOption === 'team_name') {
      result.sort((a, b) =>
        (a.team_name || '').localeCompare(b.team_name || '')
      );
    }

    return result;
  }, [filteredColleges, sortOption]);

  // Get unique values for filters
  const universities = useMemo(() => {
    return Array.from(new Set(colleges.map(college => college.university).filter(Boolean))).sort();
  }, [colleges]);

  // Get colleges for selected university
  const availableColleges = useMemo(() => {
    if (!selectedUniversity) return [];
    return colleges.filter(college => college.university === selectedUniversity);
  }, [colleges, selectedUniversity]);

  // Get unique college codes for dropdown based on selected university and college
  const collegeCodes = useMemo(() => {
    let filteredColleges = colleges;

    // Filter by selected university
    if (selectedUniversity) {
      filteredColleges = filteredColleges.filter(college => college.university === selectedUniversity);
    }

    // Filter by selected college name
    if (selectedCollege) {
      filteredColleges = filteredColleges.filter(college => college.college_code === selectedCollege);
    }

    return Array.from(new Set(filteredColleges.map(college => college.college_code).filter(Boolean))).sort();
  }, [colleges, selectedUniversity, selectedCollege]);

  const courses = useMemo(() => {
    // For specific hackathon routes, only show their respective courses
    if (slug === 'capathon') {
      return ['GMP'];
    } else if (slug === 'codecare-2-0') {
      return ['MC'];
    } else if (slug === 'safe-bite-2-0') {
      return ['FSQM'];
    }

    // Filter courses based on selected college
    const filteredColleges = selectedCollege
      ? colleges.filter(college => college.college_code === selectedCollege)
      : selectedUniversity
        ? colleges.filter(college => college.university === selectedUniversity)
        : colleges;
    return Array.from(new Set(filteredColleges.map(college => college.course_name).filter(Boolean))).sort();
  }, [colleges, selectedUniversity, selectedCollege, slug]);

  // Get search suggestions
  const searchSuggestions = useMemo(() => {
    if (searchTerm.length < 2) return [];

    return colleges.filter(college => {
      const matchesSearch = (college.college_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (college.college_code?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (college.university?.toLowerCase() || '').includes(searchTerm.toLowerCase());
      return matchesSearch;
    }).slice(0, 8); // Limit to 8 suggestions
  }, [colleges, searchTerm]);

  const handleSearchSelect = (college: College) => {
    setSearchTerm(college.college_name);
    setSelectedUniversity(college.university);
    setSelectedCollege(college.college_code);
    setSelectedCourse(college.course_name);
    setShowSearchDropdown(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowSearchDropdown(e.target.value.length >= 2);
  };

  const handleUniversityChange = (university: string) => {
    setSelectedUniversity(university);
    setSelectedCollege(''); // Reset college when university changes
    setSelectedCollegeCode(''); // Reset college code when university changes
    // For specific hackathon routes, keep their default course selected, otherwise reset
    if (!['capathon', 'codecare-2-0', 'safe-bite-2-0'].includes(slug || '')) {
      setSelectedCourse('');
    }
  };

  const handleCollegeChange = (collegeCode: string) => {
    setSelectedCollege(collegeCode);
    setSelectedCollegeCode(''); // Reset college code when college changes
    // For specific hackathon routes, keep their default course selected, otherwise reset
    if (!['capathon', 'codecare-2-0', 'safe-bite-2-0'].includes(slug || '')) {
      setSelectedCourse('');
    }
  };

  const handleCollegeCodeChange = (collegeCode: string) => {
    setSelectedCollegeCode(collegeCode);
    // For specific hackathon routes, keep their default course selected, otherwise reset
    if (!['capathon', 'codecare-2-0', 'safe-bite-2-0'].includes(slug || '')) {
      setSelectedCourse('');
    }
  };

  // Function to get full course name from course code
  const getCourseName = (courseCode: string): string => {
    switch (courseCode) {
      case 'GMP':
        return 'Good Manufacturing Practices';
      case 'MC':
        return 'Medical Coding';
      case 'FSQM':
        return 'Food Safety & Quality Management';
      default:
        return courseCode;
    }
  };

  // Get current course stats based on route and level
  const currentCourseStats = useMemo(() => {
    if (slug === 'capathon') {
      // Return dynamic Level 2 stats if Level 2 is selected and available, otherwise use static stats
      return selectedLevel === 'Level2' ? (dynamicLevel2Stats || gmpLevel2Stats) : gmpStats;
    } else if (slug === 'codecare-2-0') {
      // Return dynamic Level 2 stats if Level 2 is selected and available, otherwise use static stats
      return selectedLevel === 'Level2' ? (dynamicLevel2Stats || mcLevel2Stats) : mcStats;
    } else if (slug === 'safe-bite-2-0') {
      // Return dynamic Level 2 stats if Level 2 is selected and available, otherwise use static stats
      return selectedLevel === 'Level2' ? (dynamicLevel2Stats || fsqmLevel2Stats) : fsqmStats;
    }
    return null;
  }, [slug, selectedLevel, dynamicLevel2Stats]);

  // Filter university stats based on selected university
  const filteredUniversityStats = useMemo(() => {
    if (!currentCourseStats) return null;

    if (!selectedUniversity) return currentCourseStats;

    return {
      ...currentCourseStats,
      universities: currentCourseStats.universities.filter((uni: UniversityStats) => uni.name === selectedUniversity),
      total: currentCourseStats.universities
        .filter((uni: UniversityStats) => uni.name === selectedUniversity)
        .reduce((sum: number, uni: UniversityStats) => sum + uni.hl1_attempts, 0)
    };
  }, [currentCourseStats, selectedUniversity]);

  // Pagination calculations
  const totalResults = sortedAndFilteredColleges.length;
  const totalPages = Math.ceil(totalResults / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentResults = sortedAndFilteredColleges.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedUniversity, selectedCollege, selectedCollegeCode, selectedCourse, selectedLevel, sortOption]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to results summary section
    if (resultsSummaryRef.current) {
      resultsSummaryRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Back Button */}
        <div className="mb-6 sm:mb-8">
          <Link
            to="/hackathons"
            className="group inline-flex items-center px-3 sm:px-4 py-2 bg-white/80 backdrop-blur-sm text-slate-700 hover:text-blue-600 rounded-full shadow-sm hover:shadow-md transition-all duration-200 border border-white/50 text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Hackathons
          </Link>
        </div>

        {/* Banner */}
        {slug && (
          <div className="mb-6 sm:mb-8">
            <div className="relative w-full h-32 sm:h-48 md:h-64 lg:h-80 rounded-2xl overflow-hidden shadow-lg">
              <img
                src={
                  slug === 'capathon' ? '/Hackathon/banner_gmp.jpg' :
                    slug === 'codecare-2-0' ? '/Hackathon/banner_mc.jpg' :
                      slug === 'safe-bite-2-0' ? '/Hackathon/banner_fsqm.jpg' :
                        '/Hackathon/banner.jpg'
                }
                alt={`${slug} hackathon banner`}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black stroke-red-500 mb-4 px-2">
            {slug === 'capathon' ? 'CAPAthon' :
             slug === 'codecare-2-0' ? 'CodeCare' :
             slug === 'safe-bite-2-0' ? 'SafeBite' :
             'CodeCare'}
              <span className='ml-2'>2.0 - Results</span>
          </h1>
          <h3 className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-bold text-black mb-4 px-2">
           Hackathon 2025
          </h3>
          {selectedCourse && (
            <div className="mt-4">
              <span className="inline-flex items-center px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm sm:text-base lg:text-lg font-semibold rounded-full border border-blue-200">
                Course Name : {getCourseName(selectedCourse)}
              </span>
            </div>
          )}
        </div>

        {/* Filters Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
          <div className="flex items-center space-x-3 mb-6 sm:mb-8">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
              <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-800">Filter Results</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-blue-200 to-purple-200"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 sm:gap-4">
            {/* Search */}
            <div className="relative sm:col-span-2 lg:col-span-2">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search colleges..."
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={() => searchTerm.length >= 2 && setShowSearchDropdown(true)}
                onBlur={() => setTimeout(() => setShowSearchDropdown(false), 200)}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-white/70 backdrop-blur-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 placeholder-slate-400 text-sm sm:text-base"
              />

              {/* Search Dropdown */}
              {showSearchDropdown && searchSuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-2 bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl shadow-xl max-h-48 sm:max-h-64 overflow-y-auto">
                  {searchSuggestions.map((college) => (
                    <div
                      key={college.id}
                      onClick={() => handleSearchSelect(college)}
                      className="px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-b-0 transition-colors duration-150"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-1 sm:space-x-2 mb-1 flex-wrap">
                            <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 text-xs font-medium rounded-full">
                              {college.college_code?.toUpperCase()}
                            </span>
                            <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 text-xs font-medium rounded-full">
                              {getCourseName(college.course_name)}
                            </span>
                          </div>
                          <p className="font-semibold text-slate-900 text-xs sm:text-sm truncate">{college.college_name}</p>
                          <p className="text-slate-500 text-xs truncate">{college.university}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* University Filter */}
            <select
              value={selectedUniversity}
              onChange={(e) => handleUniversityChange(e.target.value)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/70 backdrop-blur-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 appearance-none cursor-pointer text-sm sm:text-base"
            >
              <option value="">All Universities</option>
              {universities.map(university => (
                <option key={university} value={university}>{university}</option>
              ))}
            </select>

            {/* College Filter */}
            <select
              value={selectedCollege}
              onChange={(e) => handleCollegeChange(e.target.value)}
              disabled={!selectedUniversity}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/70 backdrop-blur-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 appearance-none cursor-pointer disabled:bg-slate-100 disabled:cursor-not-allowed disabled:text-slate-400 text-sm sm:text-base"
            >
              <option value="">
                {selectedUniversity ? 'Select College' : 'Select University First'}
              </option>
              {
                (() => {
                  const seen = new Set();
                  return availableColleges.filter(college => {
                    const code = (college.college_code || '').toLowerCase();
                    if (seen.has(code)) return false;
                    seen.add(code);
                    return true;
                  }).map(college => (
                    <option key={college.id} value={college.college_code}>
                      {college.college_name}
                    </option>
                  ));
                })()
              }
            </select>

            {/* College Code Filter */}
            <select
              value={selectedCollegeCode}
              onChange={(e) => handleCollegeCodeChange(e.target.value)}
              disabled={!selectedUniversity}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/70 backdrop-blur-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 appearance-none cursor-pointer disabled:bg-slate-100 disabled:cursor-not-allowed disabled:text-slate-400 text-sm sm:text-base"
            >
              <option value="">
                {selectedUniversity ?
                  (selectedCollege ? 'Selected College Code' : 'All College Codes') :
                  'Select University First'
                }
              </option>
              {collegeCodes.map(code => (
                <option key={code} value={code}>{code?.toUpperCase()}</option>
              ))}
            </select>

            {/* Course Filter */}
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              disabled={['capathon', 'codecare-2-0', 'safe-bite-2-0'].includes(slug || '') || !selectedUniversity}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/70 backdrop-blur-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 appearance-none cursor-pointer disabled:bg-slate-100 disabled:cursor-not-allowed disabled:text-slate-400 text-sm sm:text-base"
            >
              <option value="">
                {slug === 'capathon' ? getCourseName('GMP') :
                  slug === 'codecare-2-0' ? getCourseName('MC') :
                    slug === 'safe-bite-2-0' ? getCourseName('FSQM') :
                      selectedUniversity ? 'All Courses' : 'Select University First'}
              </option>
              {courses.map(course => (
                <option key={course} value={course}>{getCourseName(course)}</option>
              ))}
            </select>

            {/* Level Filter */}
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/70 backdrop-blur-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 appearance-none cursor-pointer text-sm sm:text-base"
            >
              <option value="Level1">Level 1</option>
              <option value="Level2">Level 2</option>
            </select>

           
          </div>

          <div className="mt-4 sm:mt-6 flex space-x-4">
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedUniversity('');
                setSelectedCollege('');
                setSelectedCollegeCode('');
                setSortOption('none');
                setSelectedLevel('Level2'); // Reset level to default (Level2)
                // For specific hackathon routes, keep their default course selected, otherwise clear
                if (!['capathon', 'codecare-2-0', 'safe-bite-2-0'].includes(slug || '')) {
                  setSelectedCourse('');
                }
              }}
              className="group px-4 sm:px-6 py-2.5 sm:py-3 bg-slate-500 text-white rounded-xl hover:bg-slate-600 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
            >
              <span className="flex items-center justify-center">
                Clear Filters
                <Filter className="w-4 h-4 ml-2 group-hover:rotate-180 transition-transform duration-300" />
              </span>
            </button>
          </div>
        </div>

        {/* University Participation Statistics - Only show for Level1 */}
        {filteredUniversityStats && selectedLevel === 'Level1' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h2 className="text-lg sm:text-lg font-bold text-slate-800">University Participation - {filteredUniversityStats.course_name}</h2>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-emerald-200 to-teal-200 hidden sm:block"></div>
              <div className="flex items-center space-x-2">
                <div className="px-3 sm:px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 text-xs sm:text-sm font-semibold rounded-full">
                  Total: {filteredUniversityStats.total.toLocaleString()} Participants
                </div>
                {filteredUniversityStats.total_qualified_level1 && (
                  <div className="px-3 sm:px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 text-xs sm:text-sm font-semibold rounded-full">
                    Total Level 1 Qualified: {filteredUniversityStats.total_qualified_level1.toLocaleString()}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {filteredUniversityStats.universities
                .sort((a: UniversityStats, b: UniversityStats) => b.hl1_attempts - a.hl1_attempts)
                .map((university: UniversityStats) => (
                  <div
                    key={university.name}
                    className="group bg-gradient-to-br from-white to-slate-50 rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-all duration-200 border border-slate-100 hover:border-emerald-200"
                  >
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="p-2 rounded-full w-10 h-10 text-xs flex items-center text-white font-bold bg-gradient-to-r from-blue-400 to-blue-500">
                          {`${(university.percentage ?? 0) >= 1 ? `${university.percentage}%+` : 0}`}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl sm:text-2xl font-bold text-emerald-600">
                          {university.hl1_attempts.toLocaleString()}
                        </div>
                        <div className="text-xs text-slate-500">Participants</div>
                        {/* Qualified Level 1 Display */}
                        {university.qualified_level1 && (
                          <div className="mt-2">
                            <div className="inline-flex items-center px-2 py-1 bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 text-xs font-semibold rounded-full border border-orange-200">
                               Qualified Level 1 Participants: {university.qualified_level1.toLocaleString()}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <h3 className="font-semibold text-slate-800 text-xs sm:text-sm leading-tight group-hover:text-emerald-600 transition-colors duration-200">
                      {university.name}
                    </h3>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-3">
              <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
              <span className="text-slate-600">Loading results...</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 font-bold">!</span>
              </div>
              <div>
                <h3 className="font-semibold text-red-800">Error Loading Results</h3>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Congratulations Banner - Only show for Level1 */}
        {!loading && !error && selectedLevel === 'Level1' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg border border-white/50 p-3 sm:p-6 lg:p-8 mb-4 sm:mb-6 lg:mb-8">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="inline-flex items-center px-3 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs sm:text-base lg:text-lg font-bold rounded-full shadow-lg border-2 border-white/50">
                  <Users className="w-3 h-3 sm:w-5 sm:h-5 mr-1 sm:mr-3" />
                  <span className="text-center leading-tight">
                    🎉 Congratulations to Our Level 1 Hackathon Achievers! 🎉
                  </span>
                </div>
                {/* Total Level 1 Display */}
                {currentCourseStats && currentCourseStats.total_qualified_level1 && (
                  <div className="mt-3 sm:mt-6">
                    <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 text-xs sm:text-sm lg:text-base font-semibold rounded-full border border-emerald-200">
                      <span className="mr-1 sm:mr-2">🏆</span>
                      <span className="whitespace-nowrap">Total Level 1 Qualified Paticipants: <span className="ml-1 font-bold">{currentCourseStats.total_qualified_level1.toLocaleString()}</span></span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Congratulations Banner - Only show for Level2 when there are results */}
        {!loading && !error && selectedLevel === 'Level2' && totalResults > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg border border-white/50 p-3 sm:p-6 lg:p-8 mb-4 sm:mb-6 lg:mb-8">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="inline-flex items-center px-3 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs sm:text-base lg:text-lg font-bold rounded-full shadow-lg border-2 border-white/50">
                  <Users className="w-3 h-3 sm:w-5 sm:h-5 mr-1 sm:mr-3" />
                  <span className="text-center leading-tight">
                    🎉 Congratulations to Our Level 2 Hackathon Achievers! 🎉
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Section */}
        {!loading && !error && (
          <div className="space-y-6">
            {/* Sort and Results Summary - Show for both Level1 and Level2 when there are results */}
            {totalResults > 0 && (
              <div ref={resultsSummaryRef} className="p-2">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
                  {/* Sort Filter - Left side */}
                  <div className="flex items-center space-x-0 p-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/50">
                    <span className="text-slate-700 font-medium whitespace-nowrap">Sort :</span>
                    <select
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value as any)}
                      className="px-3 py-2 bg-white/70 backdrop-blur-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 appearance-none cursor-pointer text-sm min-w-0 flex-1 lg:w-auto"
                    >
                      <option value="none">None</option>
                      <option value="university">University (A-Z)</option>
                      <option value="college_name">College Name (A-Z)</option>
                      <option value="team_name">Team Name (A-Z)</option>
                    </select>
                  </div>
                  
                  {/* Results Summary - Right side */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between lg:justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                    <div className="text-slate-700 text-sm sm:text-base">
                      Showing <span className="font-semibold">{startIndex + 1}</span> to <span className="font-semibold">{Math.min(endIndex, totalResults)}</span> of <span className="font-semibold">{totalResults}</span> results
                    </div>
                    <div className="text-slate-600 text-xs sm:text-sm whitespace-nowrap">
                      Page {currentPage} of {totalPages}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Results Grid */}
            {selectedLevel === 'Level2' ? (
              // Level 2 Results Display
              currentResults.length > 0 ? (
                // Show Level 2 results if data is available
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentResults.map((college) => (
                      <div
                        key={college.id}
                        className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 p-6 hover:shadow-xl transition-all duration-200"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                {college.college_code?.toUpperCase()}
                              </span>
                              <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                                {getCourseName(college.course_name)}
                              </span>
                            </div>
                            <h3 className="font-bold text-slate-900 text-sm leading-tight mb-1">
                              College Name : {college.college_name}
                            </h3>
                            <p className="text-slate-600 text-xs">
                              {college.university}
                            </p>
                            {college.team_name && (
                              <p className="text-slate-500 text-xs mt-1">
                                <span className="font-semibold">Team:</span> {college.team_name}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Pagination Controls for Level 2 */}
                  {totalPages > 1 && (
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 p-4 mt-6">
                      <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                        {/* Previous Button */}
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="flex items-center space-x-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:bg-slate-50 disabled:text-slate-400 text-slate-700 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <span>Previous</span>
                        </button>

                        {/* Page Numbers */}
                        <div className="flex items-center space-x-2">
                          {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                            let pageNum;
                            if (totalPages <= 7) {
                              pageNum = i + 1;
                            } else {
                              if (currentPage <= 4) {
                                pageNum = i + 1;
                              } else if (currentPage >= totalPages - 3) {
                                pageNum = totalPages - 6 + i;
                              } else {
                                pageNum = currentPage - 3 + i;
                              }
                            }
                            
                            return (
                              <button
                                key={pageNum}
                                onClick={() => handlePageChange(pageNum)}
                                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors duration-200 ${
                                  pageNum === currentPage
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          })}
                          
                          {totalPages > 7 && currentPage < totalPages - 3 && (
                            <>
                              <span className="text-slate-400">...</span>
                              <button
                                onClick={() => handlePageChange(totalPages)}
                                className="w-8 h-8 rounded-lg text-sm font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors duration-200"
                              >
                                {totalPages}
                              </button>
                            </>
                          )}
                        </div>

                        {/* Next Button */}
                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="flex items-center space-x-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:bg-slate-50 disabled:text-slate-400 text-slate-700 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
                        >
                          <span>Next</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                // Level 2 Coming Soon Message when no data
                <div className="text-center py-16">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-8 sm:p-12 max-w-2xl mx-auto">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Users className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4">
                      Level 2 Results
                    </h3>
                    <p className="text-lg sm:text-xl text-slate-600 mb-6">
                      Results will be announced soon
                    </p>
                    <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm font-semibold rounded-full border border-blue-200">
                      <span className="mr-2">🏆</span>
                      Stay tuned for Level 2 qualified participants
                    </div>
                  </div>
                </div>
              )
            ) : currentResults.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentResults.map((college) => (
                    <div
                      key={college.id}
                      className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 p-6 hover:shadow-xl transition-all duration-200"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                              {college.college_code?.toUpperCase()}
                            </span>
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                              {getCourseName(college.course_name)}
                            </span>
                          </div>
                          <h3 className="font-bold text-slate-900 text-sm leading-tight mb-1">
                            College Name : {college.college_name}
                          </h3>
                          <p className="text-slate-600 text-xs">
                            {college.university}
                          </p>
                          {college.team_name && (
                            <p className="text-slate-500 text-xs mt-1">
                              <span className="font-semibold">Team:</span> {college.team_name}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Pagination Controls - Show for both Level1 and Level2 when there are results */}
                {totalPages > 1 && (
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 p-4 mt-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                      {/* Previous Button */}
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="flex items-center space-x-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:bg-slate-50 disabled:text-slate-400 text-slate-700 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Previous</span>
                      </button>

                      {/* Page Numbers */}
                      <div className="flex items-center space-x-2">
                        {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                          let pageNum;
                          if (totalPages <= 7) {
                            pageNum = i + 1;
                          } else {
                            if (currentPage <= 4) {
                              pageNum = i + 1;
                            } else if (currentPage >= totalPages - 3) {
                              pageNum = totalPages - 6 + i;
                            } else {
                              pageNum = currentPage - 3 + i;
                            }
                          }
                          
                          return (
                            <button
                              key={pageNum}
                              onClick={() => handlePageChange(pageNum)}
                              className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors duration-200 ${
                                pageNum === currentPage
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                        
                        {totalPages > 7 && currentPage < totalPages - 3 && (
                          <>
                            <span className="text-slate-400">...</span>
                            <button
                              onClick={() => handlePageChange(totalPages)}
                              className="w-8 h-8 rounded-lg text-sm font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors duration-200"
                            >
                              {totalPages}
                            </button>
                          </>
                        )}
                      </div>

                      {/* Next Button */}
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="flex items-center space-x-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:bg-slate-50 disabled:text-slate-400 text-slate-700 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
                      >
                        <span>Next</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">No Results Found</h3>
                <p className="text-slate-600">
                  Try adjusting your search criteria or clear the filters.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HackathonResults;