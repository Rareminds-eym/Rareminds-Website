import React from 'react';
import { Calendar } from '../../UI/calendar';

const Schedule: React.FC = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  // Example schedule data
  const scheduleItems = [
    { day: "Mon", time: "10:00", topic: "Intro Session" },
    { day: "Wed", time: "14:00", topic: "Workshop" },
    { day: "Fri", time: "11:30", topic: "Q&A" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-md mx-auto">
      <h3 className="text-lg font-medium mb-3 text-center">Upcoming Sessions</h3>
      <div className="space-y-2">
        {scheduleItems.map((item, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <span className="font-medium text-blue-600">{item.day}</span>
              </div>
              <span className="text-sm font-medium">{item.time}</span>
            </div>
            <span className="text-sm text-gray-600">{item.topic}</span>
          </div>
        ))}
      </div>
      <div className="mt-3">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </div>
    </div>
  );
};

export default Schedule;