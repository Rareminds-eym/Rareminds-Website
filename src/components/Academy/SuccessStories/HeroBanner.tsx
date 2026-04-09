
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { ProgramWithTransformedSections } from '../../../types/program';

interface HeroBannerProps {
  project: ProgramWithTransformedSections;
}

function HeroBanner({ project }: HeroBannerProps) {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Implement proper banner URL fallback logic
  const bannerUrl = project.bannerUrl || project.image_url || '/academy/Projects/default-banner.jpg';
  
  return (
    <div className="w-full mt-16 relative">
      {/* Back Button */}
      <button
        onClick={() => navigate('/SuccessStories')}
        className={`absolute z-10 flex items-center bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all shadow-md hover:shadow-lg font-medium ${
          isMobile
            ? 'top-6 left-4 px-2 py-1 text-xs gap-1'
            : 'top-16 left-4 px-5 py-2 gap-2'
        }`}
      >
        <ArrowLeft className={isMobile ? 'w-3 h-3' : 'w-4 h-4'} />
        <span>{isMobile ? 'Back' : 'Back to Success Stories'}</span>
      </button>
      
      <img
        src={bannerUrl}
        alt={project.name || project.title}
        className="block w-full object-cover md:aspect-[1666/720]"
      />
    </div>
  );
}

export default HeroBanner;