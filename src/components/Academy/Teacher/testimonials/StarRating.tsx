import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ 
  rating, 
  maxStars = 5 
}) => {
  return (
    <div className="flex">
      {[...Array(maxStars)].map((_, index) => (
        <Star
          key={index}
          size={20}
          className={index < rating ? "text-amber-400 fill-amber-400" : "text-gray-300"}
        />
      ))}
    </div>
  );
};

export default StarRating;