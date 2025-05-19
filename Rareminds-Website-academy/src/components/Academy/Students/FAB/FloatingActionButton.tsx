import React, { useState, useEffect } from 'react';
import { Calendar, MessageSquare, Download, MessageCircle } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import ActionButton from './ActionButton';

const FloatingActionButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Start the animation after component mounts
    const animationTimer = setTimeout(() => {
      setIsAnimating(true);
      
      // Reset the animation after it completes
      const resetTimer = setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
      
      return () => clearTimeout(resetTimer);
    }, 1000);
    
    // Set up periodic animation
    const intervalId = setInterval(() => {
      setIsAnimating(true);
      
      // Reset the animation after it completes
      const resetTimer = setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
      
      return () => clearTimeout(resetTimer);
    }, 8000); // Repeat animation every 8 seconds
    
    return () => {
      clearTimeout(animationTimer);
      clearInterval(intervalId);
    };
  }, []);

  const actions = [
    { 
      id: 'schedule', 
      label: 'Schedule', 
      icon: <Calendar size={20} />, 
      onClick: () => console.log('Schedule clicked') 
    },
    { 
      id: 'enquiry', 
      label: 'Enquiry', 
      icon: <MessageSquare size={20} />, 
      onClick: () => console.log('Enquiry clicked') 
    },
    { 
      id: 'download', 
      label: 'Download Brochure', 
      icon: <Download size={20} />, 
      onClick: () => console.log('Download clicked') 
    },
    { 
      id: 'chat', 
      label: 'Chat', 
      icon: <MessageCircle size={20} />, 
      onClick: () => console.log('Chat clicked') 
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse items-end gap-3">
      {isExpanded && (
        <div 
          className="flex flex-col gap-3 mb-2 transition-all duration-300 ease-out"
          style={{ 
            opacity: isExpanded ? 1 : 0,
            transform: isExpanded ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          {actions.map((action, index) => (
            <ActionButton
              key={action.id}
              icon={action.icon}
              label={action.label}
              onClick={action.onClick}
              delay={index * 50}
            />
          ))}
        </div>
      )}
      
      <button
        aria-label="Open actions menu"
        className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300",
          "bg-gradient-to-r from-indigo-600 to-purple-600",
          "shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2",
          "transform hover:scale-105 active:scale-95",
          isAnimating && "animate-pulse scale-[1.05]",
          isExpanded && "rotate-45"
        )}
        onClick={() => setIsExpanded(!isExpanded)}
        onMouseEnter={() => setIsExpanded(true)}
        onKeyDown={(e) => {
          if (e.key === 'Escape' && isExpanded) {
            setIsExpanded(false);
          }
        }}
      >
        <span className="text-white text-2xl font-semibold transition-transform">
          {isExpanded ? "×" : "+"}
        </span>
      </button>
    </div>
  );
};

export default FloatingActionButton;
