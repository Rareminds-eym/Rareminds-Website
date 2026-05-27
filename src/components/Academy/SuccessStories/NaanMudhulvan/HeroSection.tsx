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
   const desktopBanner = project.bannerUrl?.desktop ?? project.imageUrl ?? placeholderBanner;
  const mobileBanner = project.bannerUrl?.mobile ?? project.imageUrl ?? placeholderBanner;
  const heroTitle = project?.hero_title || project?.name || project?.title;
  const heroDescription = project?.hero_description || project?.description || project?.short_description;
  
  return (
    <div className="w-full">
      {/* Banner Image - Use banner directly without encoding */}
      <div className="w-full overflow-hidden relative mb-32 md:mb-36 h-auto md:h-auto">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate('/success-stories')}
          className="fixed left-4 z-50 flex items-center bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all shadow-md hover:shadow-lg font-medium top-24 px-2 py-1 text-xs gap-1 md:top-28 md:px-5 md:py-2 md:gap-2"
        >
          <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" />
          <span className="inline md:hidden">Back</span>
          <span className="hidden md:inline">Back to SuccessStories</span>
        </button>
        
         <img
          src={mobileBanner}
          alt={project?.name || project?.title || "Program banner image"}
          className="block md:hidden w-full object-cover object-center"
        />
        {/* Desktop banner */}
        <img
          src={desktopBanner}
          alt={project?.name || project?.title || "Program banner image"}
          className="hidden md:block w-full md:h-auto object-cover object-center"
        />

        {/* Text overlay on banner */}
        {(heroTitle || heroDescription) && (
          <div className="absolute inset-0 flex flex-col justify-start items-center md:items-start lg:items-start px-6 md:px-10 lg:px-16 md:max-w-xs lg:max-w-md xl:max-w-3xl pt-44 md:pt-44 lg:pt-64 xl:pt-0 xl:pb-24 xl:justify-end text-center md:text-left lg:text-left overflow-hidden">

            {heroTitle && (
              <h1 className="text-black text-xl md:text-base lg:text-xl xl:text-4xl font-bold leading-snug w-full">
                {heroTitle}
              </h1>
            )}

            {heroDescription && (
              <p className="text-black text-xs md:text-xs lg:text-xs xl:text-base max-w-full xl:max-w-none mx-auto xl:mx-0 w-full mt-4 leading-relaxed md:line-clamp-3 lg:line-clamp-4 xl:line-clamp-none">
                {heroDescription}
              </p>
            )}

          </div>
        )}
      </div>
    </div>
  );
}

export default HeroSection;
