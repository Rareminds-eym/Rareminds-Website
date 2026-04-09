import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { ProgramWithTransformedSections } from '../../../../types/program';

interface HeroSectionProps {
  project: ProgramWithTransformedSections;
}

function HeroSection({ project }: HeroSectionProps) {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Use exact banner logic as specified - NO ENCODING
  const banner = 
    project?.bannerUrl ||
    (project as any)?.banner_url ||
    project?.image_url ||
    "/default-banner.png";
  
  return (
    <div className="w-full">
      {/* Banner Image - Use banner directly without encoding */}
      <div className="w-full overflow-hidden relative">
        {/* Back Button */}
        <button
          onClick={() => navigate('/SuccessStories')}
          className={`absolute left-4 z-10 flex items-center bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all shadow-md hover:shadow-lg font-medium ${
            isMobile 
              ? 'top-2 px-2 py-1 text-xs gap-1' 
              : 'top-10 px-5 py-2 gap-2'
          }`}
        >
          <ArrowLeft className={isMobile ? 'w-3 h-3' : 'w-4 h-4'} />
          <span>{isMobile ? 'Back' : 'Back to SuccessStories'}</span>
        </button>
        
        <img 
          src={banner} 
          alt={project?.name || project?.title || "banner"} 
          className="w-full h-auto object-cover object-center"
        />
      </div>
      
      {/* Title Section Below Banner */}
      <div className="bg-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-xl lg:text-4xl font-bold text-gray-900 mb-4">
            {project?.name || project?.title}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;