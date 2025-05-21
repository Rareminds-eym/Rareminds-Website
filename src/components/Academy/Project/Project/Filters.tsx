import React from 'react';

const categories = ['All', 'Naan Mudhalvan', 'KSDC'];
// const statuses = ['All', 'Active', 'Completed', 'In Progress'];
const year = ['All', '2024', '2025'];
const locations = ['All', 'TamilNadu', 'Karnataka'];

interface FiltersProps {
  onFilterChange: (type: string, value: string) => void;
}

export const Filters = ({ onFilterChange }: FiltersProps) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Category</label>
          <select
            onChange={(e) => onFilterChange('category', e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Status</label>
          <select
            onChange={(e) => onFilterChange('status', e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div> */}

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Year</label>
          <select
            onChange={(e) => onFilterChange('year', e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {year.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Location</label>
          <select
            onChange={(e) => onFilterChange('location', e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {locations.map((location) => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};