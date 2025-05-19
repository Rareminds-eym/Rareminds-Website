import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../UI/button';
import { useToast } from '@/hooks/use-toast';

interface SessionItem {
  title: string;
  description: string;
  time?: string;
}

interface DayCardProps {
  day: number;
  theme: string;
  title: string;
  morning: SessionItem[];
  afternoon: SessionItem[];
  color: string;
}

const DayCard: React.FC<DayCardProps> = ({
  day,
  theme,
  title,
  morning,
  afternoon,
  color
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();
  
  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    
    if (!isExpanded) {
      toast({
        title: `Day ${day}: ${title}`,
        description: `You're viewing the details for ${theme}`,
      });
    }
  };

  return (
    <div 
      className={cn(
        "day-card animate-fade-in",
        isExpanded ? "md:col-span-2 lg:col-span-3" : ""
      )}
      style={{ animationDelay: `${day * 0.1}s` }}
    >
      <div 
        className="day-card-header"
        style={{ backgroundColor: color, color: 'white' }}
      >
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          <h3 className="text-lg font-bold">Day {day}</h3>
        </div>
        <Button 
          variant="outline"
          onClick={handleExpand} 
          className="bg-white/20 hover:bg-white/30 text-white border-white/40"
        >
          {isExpanded ? "Collapse" : "Expand"}
        </Button>
      </div>
      
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 italic mb-4">Theme: "{theme}"</p>
        
        {isExpanded ? (
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                <span className="bg-education-primary/10 text-education-primary px-3 py-1 rounded-full text-sm">
                  Morning Sessions
                </span>
              </h4>
              <div className="space-y-2">
                {morning.map((session, idx) => (
                  <div key={idx} className="session-item">
                    <div className="flex justify-between">
                      <h5 className="font-medium">{session.title}</h5>
                      {session.time && (
                        <span className="text-sm text-gray-500">{session.time}</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{session.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                <span className="bg-education-secondary/10 text-education-secondary px-3 py-1 rounded-full text-sm">
                  Afternoon Workshops
                </span>
              </h4>
              <div className="space-y-2">
                {afternoon.map((session, idx) => (
                  <div key={idx} className="session-item">
                    <div className="flex justify-between">
                      <h5 className="font-medium">{session.title}</h5>
                      {session.time && (
                        <span className="text-sm text-gray-500">{session.time}</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{session.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <Button 
              className="w-full"
              style={{ backgroundColor: color }}
            >
              Register for Day {day}
            </Button>
          </div>
        ) : (
          <Button 
            onClick={handleExpand}
            variant="outline"
            className="w-full mt-4 border-dashed border-2"
          >
            View Schedule
          </Button>
        )}
      </div>
    </div>
  );
};

export default DayCard;
