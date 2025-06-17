import React, { useEffect, useRef } from 'react';
import StarRating from './StarRating';
import { cn } from '@/lib/utils';

interface TestimonialCardProps {
  quote: string;
  author: {
    name: string;
    role: string;
    company: string;
    image?: string;
  };
  rating: number;
  isActive?: boolean;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  rating,
  isActive = true
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Add a simple fade-in animation when the component mounts
    if (cardRef.current) {
      cardRef.current.style.opacity = '0';
      cardRef.current.style.transform = 'translateY(10px)';
      
      setTimeout(() => {
        if (cardRef.current) {
          cardRef.current.style.opacity = '1';
          cardRef.current.style.transform = 'translateY(0)';
        }
      }, 100);
    }
  }, []);

  return (
    <div 
      ref={cardRef}
      className={cn(
        "bg-white rounded-lg p-8 shadow-lg transition-all duration-500 h-full",
        isActive ? "opacity-100" : "opacity-80"
      )}
    >
      <div className="mb-4">
        <StarRating rating={rating} />
      </div>
      <blockquote className="text-gray-800 text-lg mb-6">
        <span className="text-gray-400 text-3xl font-serif">"</span>
        {quote}
        <span className="text-gray-400 text-3xl font-serif">"</span>
      </blockquote>
      <div className="flex items-center">
        {author.image && (
          <div className="mr-4">
            <img 
              src={author.image} 
              alt={author.name}
              className="w-12 h-12 rounded-full object-cover" 
            />
          </div>
        )}
        <div>
          <p className="font-bold text-gray-900">
            {author.name}
            {author.role && <span className="font-normal text-gray-600">, {author.role}</span>}
          </p>
          <p className="text-gray-600 text-sm">{author.company}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;