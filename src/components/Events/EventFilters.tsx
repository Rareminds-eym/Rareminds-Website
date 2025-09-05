import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Event } from '../../types/Events/event';

interface EventFiltersProps {
  events: Event[];
  onFilteredEvents: (filteredEvents: Event[]) => void;
}

const EventFilters: React.FC<EventFiltersProps> = ({ events, onFilteredEvents }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  // Get unique values for filters
  const categories = [...new Set(events.map(event => event.category))];
  const locations = [...new Set(events.map(event => event.location))];
  const statuses = ['upcoming', 'ongoing', 'completed', 'cancelled'];

  React.useEffect(() => {
    let filtered = events;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.organizer_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(event => event.status === selectedStatus);
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    // Location filter
    if (selectedLocation !== 'all') {
      filtered = filtered.filter(event => event.location === selectedLocation);
    }

    onFilteredEvents(filtered);
  }, [searchTerm, selectedStatus, selectedCategory, selectedLocation, events, onFilteredEvents]);

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedStatus('all');
    setSelectedCategory('all');
    setSelectedLocation('all');
  };

  const hasActiveFilters = searchTerm || selectedStatus !== 'all' || selectedCategory !== 'all' || selectedLocation !== 'all';

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          Filters
        </h3>
      </div>

      {/* Search Bar and Filters Row */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        {/* Search Bar - Reduced Width */}
        <div className="relative flex-1 md:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search events by title, description, or organizer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap gap-3 items-center">
          {/* Status Dropdown */}
          <div className="min-w-[140px]">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full py-3 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="all">All Events</option>
              {statuses.map(status => (
                <option key={status} value={status} className="capitalize">
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Category Dropdown */}
          <div className="min-w-[140px]">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full py-3 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Location Dropdown */}
          <div className="min-w-[140px]">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full py-3 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="all">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button
            onClick={clearAllFilters}
            className="flex items-center text-red-600 hover:text-red-700 text-sm font-medium"
          >
            <X className="w-4 h-4 mr-1" />
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default EventFilters;
