import { Link, useParams } from 'react-router-dom';
import React, { useState, useMemo, useEffect } from 'react';
import { ArrowLeft, Search, Filter, Users, Loader2 } from 'lucide-react';
import { gmpStats } from './data/gmp-results';
import { fsqmStats } from './data/fsqm-results';
import { mcStats } from './data/mc-results';
import { useHackathonResults } from '../../hooks/useHackathonResults';


import type { College } from './data/mc-results';

const HackathonResults: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedCollege, setSelectedCollege] = useState('');
  const [selectedCollegeCode, setSelectedCollegeCode] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  // Use the custom hook to fetch data
  const { colleges, loading, error } = useHackathonResults(slug);

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

    return filtered;
  }, [colleges, searchTerm, selectedUniversity, selectedCollege, selectedCollegeCode, selectedCourse]);

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



  // Get current course stats based on route
  const currentCourseStats = useMemo(() => {
    if (slug === 'capathon') {
      return gmpStats;
    } else if (slug === 'codecare-2-0') {
      return mcStats;
    } else if (slug === 'safe-bite-2-0') {
      return fsqmStats;
    }
    return null;
  }, [slug]);

  // Filter university stats based on selected university
  const filteredUniversityStats = useMemo(() => {
    if (!currentCourseStats) return null;

    if (!selectedUniversity) return currentCourseStats;

    return {
      ...currentCourseStats,
      universities: currentCourseStats.universities.filter(uni => uni.name === selectedUniversity),
      total: currentCourseStats.universities
        .filter(uni => uni.name === selectedUniversity)
        .reduce((sum, uni) => sum + uni.hl1_attempts, 0)
    };
  }, [currentCourseStats, selectedUniversity]);

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
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold   text-black mb-4 px-2">
            Hackathon 2025
          </h1>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
            {/* Search */}
            <div className="relative sm:col-span-2 lg:col-span-1">
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
                              {college.college_code}
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
                <option key={code} value={code}>{code}</option>
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
          </div>

          <div className="mt-4 sm:mt-6 flex space-x-4">
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedUniversity('');
                setSelectedCollege('');
                setSelectedCollegeCode('');
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

            {/* Test Connection Button - Remove this in production */}
            {/* <button
              onClick={handleTestConnection}
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
            >
              Test DB Connection
            </button> */}

            {/* Route-specific test buttons - Remove these in production */}
            {/* {slug === 'codecare-2-0' && (
              <button
                onClick={handleTestMcTable}
                className="px-4 sm:px-6 py-2.5 sm:py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
              >
                Test MC Table
              </button>
            )} */}

            {/* {slug === 'capathon' && (
              <button
                onClick={handleTestGmpTable}
                className="px-4 sm:px-6 py-2.5 sm:py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
              >
                Test GMP Table
              </button>
            )} */}
          </div>
        </div>

        {/* University Participation Statistics */}
        {filteredUniversityStats && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-800">University Participation - {filteredUniversityStats.course_name}</h2>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-emerald-200 to-teal-200 hidden sm:block"></div>
              <div className="px-3 sm:px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 text-xs sm:text-sm font-semibold rounded-full">
                Total: {filteredUniversityStats.total.toLocaleString()} Participants
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {filteredUniversityStats.universities
                .sort((a, b) => b.hl1_attempts - a.hl1_attempts)
                .map((university) => (
                  <div
                    key={university.name}
                    className="group bg-gradient-to-br from-white to-slate-50 rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-all duration-200 border border-slate-100 hover:border-emerald-200"
                  >
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm bg-gradient-to-r from-blue-400 to-blue-500">
                          { }
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl sm:text-2xl font-bold text-emerald-600">
                          {university.hl1_attempts.toLocaleString()}
                        </div>
                        <div className="text-xs text-slate-500">Participants</div>
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

        {/* Results Section */}
        {!loading && !error && (
          <div className="space-y-6">
            {/* Results Count Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-4 sm:p-6">
              <div className="flex items-center justify-center">
                <div className="text-center">
                  {/* <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">
                    Teams : {filteredColleges.length}
                  </h2> */}
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm font-semibold rounded-full border border-blue-200">
                    <Users className="w-4 h-4 mr-2" />
                    Congratulations to Our Level 1 Hackathon Achievers!
                  </div>
                </div>
              </div>
            </div>

            {/* Results Grid */}
            {filteredColleges.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredColleges.map((college) => (
                  <div
                    key={college.id}
                    className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 p-6 hover:shadow-xl transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                            {college.college_code}
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
                            <span className="font-medium">Team:</span> {college.team_name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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