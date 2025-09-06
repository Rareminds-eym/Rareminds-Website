import React from 'react';

const Careers: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          Careers
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Join our team and make a difference
        </p>
        <div className="max-w-2xl mx-auto text-gray-500">
          <p>Exciting career opportunities await! Check back soon for open positions.</p>
        </div>
      </div>
    </div>
  );
};

export default Careers;
