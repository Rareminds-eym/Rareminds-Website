import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import placeholderBanner from '/academy/Projects/nanmudhalvan.jpg';
import type { ProgramWithTransformedSections } from '../../../../types/program';

// ── Constants ────────────────────────────────────────────────────────────────
interface HeroSectionProps {
  project: ProgramWithTransformedSections;
}

function HeroSection({ project }: HeroSectionProps) {
  const navigate = useNavigate();
  
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
    return placeholderBanner;
  };
  
  const banner = getBannerUrl(project);
  
  return (
    <div className="w-full">
      {/* Banner Image - Use banner directly without encoding */}
      <div className="w-full overflow-hidden relative">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate('/success-stories')}
          className="absolute left-4 z-10 flex items-center bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all shadow-md hover:shadow-lg font-medium top-2 px-2 py-1 text-xs gap-1 md:top-10 md:px-5 md:py-2 md:gap-2"
        >
          <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" />
          <span className="inline md:hidden">Back</span>
          <span className="hidden md:inline">Back to SuccessStories</span>
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