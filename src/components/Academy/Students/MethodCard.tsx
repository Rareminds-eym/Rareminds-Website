import React from 'react';
import { LightbulbIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

const MethodCard = () => {
  const newMethodPoints = [
    "Interactive, collaborative learning", 
    "AI-enhanced teaching tools",
    "Student-driven exploration", 
    "Adaptive learning pathways"
  ];

  return (
    <div className="flex items-center  justify-start bg-white  mt-8 mb-8">
      <Card className="w-full max-w-md p-6 space-y-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border-yellow-100">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-full bg-yellow-50">
            <LightbulbIcon className="w-5 h-5 text-yellow-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">New Method</h3>
        </div>
        
        <ul className="space-y-4">
          {newMethodPoints.map((point, index) => (
            <li key={index} className="flex items-center space-x-3">
              <span className="flex-shrink-0 w-2 h-2 rounded-full bg-yellow-400" />
              <span className="text-gray-600 text-sm">{point}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default MethodCard;