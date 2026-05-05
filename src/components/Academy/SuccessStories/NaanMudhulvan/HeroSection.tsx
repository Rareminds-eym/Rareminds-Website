import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { PLACEHOLDER_BANNER_IMAGE } from '../../../../constants/images';
import type { ProgramWithTransformedSections } from '../../../../types/program';

// ── Constants ────────────────────────────────────────────────────────────────

// Mobile breakpoint for responsive layout
const MOBILE_BREAKPOINT = 768; // pixels

// Placeholder image for missing banners
const PLACEHOLDER_IMAGE = PLACEHOLDER_BANNER_IMAGE;

interface HeroSectionProps {
  project: ProgramWithTransformedSections;
}

function HeroSection({ project }: HeroSectionProps) {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  
  /**
   * Handle mobile breakpoint detection for responsive UI
   * Production-level implementation with proper cleanup and documentation
   */
  useEffect(() => {
    const handleMobileCheck = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Set initial value
    handleMobileCheck();

    // Add event listener
    window.addEventListener('resize', handleMobileCheck);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleMobileCheck);
    };
  }, []); // Empty dependency array is correct - we only want to set up the listener once
  
  /**
   * Get banner URL with proper fallback chain
   * Production-level type-safe implementation without any type assertions
   */
  const getBannerUrl = (projectData: ProgramWithTransformedSections): string => {
    // Primary: Use the transformed camelCase field (guaranteed to exist per type definition)
    if (projectData.bannerUrl) {
      return projectData.bannerUrl;
    }
    
    // Secondary: Use imageUrl as fallback
    if (projectData.imageUrl) {
      return projectData.imageUrl;
    }
    
    // Tertiary: Use placeholder image
    return PLACEHOLDER_IMAGE;
  };
  
  const banner = getBannerUrl(project);
  
  return (
    <div className="w-full">
      {/* Banner Image - Use banner directly without encoding */}
      <div className="w-full overflow-hidden relative">
        {/* Back Button */}
        <button
          onClick={() => navigate('/success-stories')}
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
          alt={project?.name || project?.title || "Program banner image"} 
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