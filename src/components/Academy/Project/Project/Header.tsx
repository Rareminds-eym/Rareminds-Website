import React from 'react';
import { SearchBar } from './SearchBar';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export const Header = ({ searchQuery, onSearchChange }: HeaderProps) => {
  return (
    <div className="relative h-[350px] w-full overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa"
        alt="Header Banner"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80">
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-white">
          <h1 className="text-5xl font-bold mb-6"></h1>
          <p className="text-xl mb-8 max-w-2xl text-center">
            Explore innovative projects from top universities and talented teams around the world
          </p>
          <SearchBar value={searchQuery} onChange={onSearchChange} />
        </div>
      </div>
    </div>
  );
};