import React, { useEffect } from 'react';

const ZOHO_RECRUIT_CAREERS_URL = 'https://rareminds.zohorecruit.in/jobs/Careers';

const Careers: React.FC = () => {
  useEffect(() => {
    window.location.replace(ZOHO_RECRUIT_CAREERS_URL);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          Careers
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Redirecting you to our open positions...
        </p>
      </div>
    </div>
  );
};

export default Careers;
