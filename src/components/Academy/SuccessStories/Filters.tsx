
import { useState, useEffect } from 'react';
import type { FilterState } from '../../../types/program';


interface FilterOptions {
  categories: string[];
  names: string[];
  years: string[];
  locations: string[];
}

interface FiltersProps {
  onFilterChange?: (type: string, value: string) => void;
  onClearFilters?: () => void;
  filters?: FilterState;
  filterOptions?: FilterOptions;
}

const SelectField = ({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2 flex-1">
      <label className="text-sm font-semibold text-gray-800 tracking-wide">
        {label}
      </label>
      <div className="relative">

        {/* Mobile only: custom scrollable dropdown */}
        <div className="sm:hidden">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full px-3 py-2 pr-3 rounded-xl border border-gray-300 bg-white text-gray-700 text-xs font-normal cursor-pointer outline-none shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200 flex items-center justify-between"
          >
            <span className="truncate">{value}</span>
            <svg
              width="18" height="18" viewBox="0 0 24 24"
              fill="none" stroke="#6b7280" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
              className={`shrink-0 ml-auto transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {isOpen && (
            <ul className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-xl shadow-sm max-h-40 overflow-y-auto">
              {options.map((item) => (
                <li
                  key={item}
                  onClick={() => { onChange(item); setIsOpen(false); }}
                  className={`px-3 py-2 text-xs cursor-pointer hover:bg-blue-50 ${
                    item === value ? 'bg-blue-100 font-semibold text-blue-700' : 'text-gray-700'
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Desktop only: original — zero changes */}
        <div className="hidden sm:block">
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-300 bg-white text-gray-700 text-sm font-normal appearance-none cursor-pointer outline-none shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
          >
            {options.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
};

export const Filters = ({ onFilterChange, onClearFilters, filters, filterOptions }: FiltersProps) => {
  const [category, setCategory] = useState(filters?.category || 'All');
  const [name, setName] = useState(filters?.name || 'All');
  const [year, setYear] = useState(filters?.year || 'All');
  const [location, setLocation] = useState(filters?.location || 'All');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Use filter options from props or fallback to defaults
  const categories = filterOptions?.categories || ['All'];
  const names = filterOptions?.names || ['All'];
  const years = filterOptions?.years || ['All'];
  const locations = filterOptions?.locations || ['All'];

  // Update local state when filters prop changes
  useEffect(() => {
    if (filters) {
      setCategory(filters.category);
      setName(filters.name);
      setYear(filters.year);
      setLocation(filters.location);
    }
  }, [filters]);

  const handle = (type: string, val: string) => {
    if (type === 'category') setCategory(val);
    if (type === 'name') setName(val);
    if (type === 'year') setYear(val);
    if (type === 'location') setLocation(val);
  };
  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleClearFilters = () => {
    setCategory('All');
    setName('All');
    setYear('All');
    setLocation('All');
    onClearFilters?.();
    closeMenu();
  };

  const handleApplyFilters = () => {
    onFilterChange?.('category', category);
    onFilterChange?.('name', name);
    onFilterChange?.('year', year);
    onFilterChange?.('location', location);
    closeMenu();
  };

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="sm:hidden relative flex justify-center">
        <button
          onClick={toggleMenu}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-white rounded-lg shadow-sm w-full max-w-xs"
        >
          <span className="text-sm sm:text-lg font-semibold text-gray-700">Filters</span>
          <svg 
            className="w-4 h-4 text-gray-600 ml-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Mobile Side Modal */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="sm:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeMenu}
          />
          
          {/* Side Modal */}
        <div className="sm:hidden fixed top-24 bottom-4 right-4 left-4 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out rounded-lg flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              <button
                onClick={closeMenu}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="flex flex-col h-full">
              <div 
                className="flex-1 p-3 space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
              >
                <SelectField
                  label="Categories"
                  options={categories}
                  value={category}
                  onChange={(val) => handle('category', val)}
                />
                <SelectField
                  label="Names"
                  options={names}
                  value={name}
                  onChange={(val) => handle('name', val)}
                />
                <SelectField
                  label="Years"
                  options={years}
                  value={year}
                  onChange={(val) => handle('year', val)}
                />
                <SelectField
                  label="Locations"
                  options={locations}
                  value={location}
                  onChange={(val) => handle('location', val)}
                />
              </div>
              
              {/* Fixed buttons at bottom */}
              <div className="shrink-0 border-t border-gray-200 p-3 space-y-2 bg-white">
                <button
                  type="button"
                  onClick={handleApplyFilters}
                  className="w-full bg-blue-500 text-white py-2 px-3 rounded-lg font-medium hover:bg-blue-600 transition-colors text-xs"
                >
                  Apply Filters
                </button>
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="w-full bg-gray-100 text-gray-700 py-2 px-3 rounded-lg font-medium hover:bg-gray-200 transition-colors text-xs"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Desktop Filter Grid */}
      <div className="hidden sm:block bg-white rounded-xl px-8 py-7 shadow-md border border-white w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SelectField
            label="Categories"
            options={categories}
            value={category}
            onChange={(val) => handle('category', val)}
          />
          <SelectField
            label="Names"
            options={names}
            value={name}
            onChange={(val) => handle('name', val)}
          />
          <SelectField
            label="Years"
            options={years}
            value={year}
            onChange={(val) => handle('year', val)}
          />
          <SelectField
            label="Locations"
            options={locations}
            value={location}
            onChange={(val) => handle('location', val)}
          />
        </div>
      </div>
      {/* Desktop Apply Button */}
        <div className={`hidden mt-4 justify-center ${category !== 'All' || name !== 'All' || year !== 'All' || location !== 'All' ? 'sm:flex' : 'sm:hidden'}`}>
        <button
          onClick={handleApplyFilters}
          className="bg-blue-500 text-white py-2 px-8 rounded-full font-medium hover:bg-blue-600 transition-colors text-sm"
        >
          Apply Filters
        </button>
      </div>
    </>
  );
};