import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';

const HackathonResults: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              to="/hackathons"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Hackathons
            </Link>
          </div>

          {/* Coming Soon Icon */}
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto bg-gradient-to-r from-blue-600 to-purple-700 rounded-full flex items-center justify-center">
              <Clock className="w-16 h-16 text-white" />
            </div>
          </div>

          {/* Main Content */}
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            CAPAthon Results Coming Soon!
          </h1>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            We're currently evaluating all the amazing submissions from our college students who participated in CAPAthon.
            The results will be announced soon with detailed winner information and project showcases.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HackathonResults;
