import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { hackathons, Hackathon } from '../../data/hackathons';

const HackathonCard: React.FC<{ hackathon: Hackathon }> = ({ hackathon }) => {
  return (
    <div className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-out">
      {/* Gradient accent border */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>

      {/* Card content */}
      <div className="relative bg-white rounded-2xl m-0.5 overflow-hidden">
        {/* Image section */}
        {hackathon.image && (
          <div className="w-full h-52 sm:h-64 lg:h-72 overflow-hidden rounded-t-2xl">
            <img
              src={hackathon.image}
              alt={hackathon.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        <div className="p-4 sm:p-6 lg:p-8">
          {/* Header with decorative element */}
          <div className="flex items-start justify-between mb-4 sm:mb-6">
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                {hackathon.name}
              </h3>
              <div className="w-8 sm:w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg"></div>
            </div>
          </div>

          {/* Description */}
          {hackathon.description && (
            <p className="text-gray-600 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg">
              {hackathon.description}
            </p>
          )}

          {/* Button */}
          <Link
            to={`/hackathons/${hackathon.slug}/results`}
            className="group/btn relative w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
          >
            <span className="relative z-10">Results</span>
            <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 ml-2 relative z-10 group-hover/btn:translate-x-1 transition-transform duration-200" />

            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out"></div>
          </Link>
        </div>
      </div>
    </div>
  );
};

const Hackathons: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">RareMinds Hackathons</h1>
          <p className="text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed px-2">
            Join our exciting hackathons designed for college students! Showcase your skills, collaborate with peers, and solve real-world problems.
            Compete with fellow students, learn new technologies, and win amazing prizes!
          </p>
        </div>
      </div>

      {/* Hackathons Grid */}
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Hackathon</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {hackathons.map((hackathon) => (
            <HackathonCard key={hackathon.id} hackathon={hackathon} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8 sm:mt-12 lg:mt-16">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Ready to Innovate?</h3>
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
              Don't miss out on these amazing opportunities to showcase your academic skills, collaborate with fellow students, and win exciting prizes while building your portfolio.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-3 px-6 sm:px-8 rounded-lg font-medium hover:from-blue-700 hover:to-purple-800 transition-all duration-200 text-sm sm:text-base">
              Get Notified About New Hackathons
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hackathons;
