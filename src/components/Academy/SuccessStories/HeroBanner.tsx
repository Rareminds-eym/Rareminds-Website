
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { PLACEHOLDER_BANNER_IMAGE } from '../../../constants/images';
import type { ProgramWithTransformedSections } from '../../../types/program';

// ── Constants ────────────────────────────────────────────────────────────────

// Placeholder image for missing banners
const PLACEHOLDER_IMAGE = PLACEHOLDER_BANNER_IMAGE;

interface HeroBannerProps {
  project: ProgramWithTransformedSections;
}

function HeroBanner({ project }: HeroBannerProps) {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  /**
   * Handle mobile breakpoint detection for responsive UI
   * Production-level implementation with guaranteed cleanup
   */
  useEffect(() => {
    const handleMobileCheck = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    handleMobileCheck();

    // Add event listener
    window.addEventListener('resize', handleMobileCheck);

    // Cleanup function - guaranteed to remove the exact same function reference
    return () => {
      window.removeEventListener('resize', handleMobileCheck);
    };
  }, []); // Empty dependency array is correct - we only want to set up the listener once
  
  // Use placeholder image when no image in database
  const bannerUrl = project.bannerUrl || project.imageUrl || PLACEHOLDER_IMAGE;
  
  return (
    <div className="w-full mt-16 relative">
      {/* Back Button */}
      <button
        onClick={() => navigate('/success-stories')}
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
        alt={project.name || project.title || 'Success story banner image'}
        className="block w-full object-cover md:aspect-banner"
      />
    </div>
  );
}

export default HeroBanner;