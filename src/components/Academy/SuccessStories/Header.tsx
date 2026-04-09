

import React from 'react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export const Header = ({ searchQuery, onSearchChange }: HeaderProps) => {
  const clearSearch = () => {
    onSearchChange('');
  };

  return (
    <div className="relative h-[690px] w-full overflow-hidden">
      {/* Mobile Image */}
      <img
        src="/success_banner_mobile_390x844.png"
        alt="Success Stories Banner"
        className="md:hidden w-full h-full object-cover object-center"
      />
      {/* Desktop & Tablet Image */}
      <img
        src="/Success Stories Banner copy.jpg"
        alt="Success Stories Banner"
        className="hidden md:block w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0">
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center max-w-6xl">
          <div className="w-full flex justify-between items-center">
            {/* Content — center on mobile/tab, left-aligned on desktop */}
            <div className="max-w-lg lg:ml-10 lg:mt-12 w-full lg:w-auto flex flex-col items-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-10 text-gray-900 text-center">
                Success Stories
              </h1>
              <p className="text-base sm:text-lg lg:text-xl mb-10 lg:ml-5 font-normal text-gray-700 leading-relaxed text-center lg:text-left w-full px-6 lg:px-0">
                Explore innovative projects from top universities and talented teams around the world
              </p>
              <div className="w-full px-6 lg:px-0 lg:max-w-2xl">
                <div className="relative w-full">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search Projects"
                    className="w-full px-4 py-3 pr-20 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                  />
                  {searchQuery && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 w-5 h-5"
                    >
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                  <svg
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex-1 hidden lg:block"></div>
          </div>
        </div>
      </div>
    </div>
  );
};