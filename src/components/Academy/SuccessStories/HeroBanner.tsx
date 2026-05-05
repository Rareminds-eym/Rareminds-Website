
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import placeholderBanner from '/academy/Projects/nanmudhalvan.jpg';
import type { ProgramWithTransformedSections } from '../../../types/program';

// ── Constants ────────────────────────────────────────────────────────────────

interface HeroBannerProps {
  project: ProgramWithTransformedSections;
}

function HeroBanner({ project }: HeroBannerProps) {
  const navigate = useNavigate();
  
  // Use placeholder image when no image in database
  const bannerUrl = project.bannerUrl || project.imageUrl || placeholderBanner;
  
  return (
    <div className="w-full mt-16 relative">
      {/* Back Button */}
      <button
        onClick={() => navigate('/success-stories')}
        className="absolute left-4 z-10 flex items-center bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all shadow-md hover:shadow-lg font-medium top-6 px-2 py-1 text-xs gap-1 md:top-16 md:px-5 md:py-2 md:gap-2"
      >
        <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" />
        <span className="inline md:hidden">Back</span>
        <span className="hidden md:inline">Back to Success Stories</span>
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