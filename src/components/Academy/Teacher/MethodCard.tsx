
import React from 'react';
import { Clock } from 'lucide-react';
import { Card } from '../UI/card';
import 'aos/dist/aos.css';

const MethodCard = () => {
  const methodPoints = [
    "One-way lecture delivery",
    "Rote learning and memorization",
    "Minimal technology integration",
    "Static curriculum for years"
  ];

  return (
    <div className="flex items-center justify-end  bg-white mt-8 mb-8">
      <Card className="w-full max-w-md p-6 space-y-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow" >
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-full bg-gray-100">
            <Clock className="w-5 h-5 text-gray-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Old Method</h3>
        </div>
        
        <ul className="space-y-4">
          {methodPoints.map((point, index) => (
            <li key={index} className="flex items-center space-x-3">
              <span className="flex-shrink-0 w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-gray-600 text-sm">{point}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default MethodCard;
