
import type { ProgramWithTransformedSections } from '../../../types/program';

interface HeroBannerProps {
  project: ProgramWithTransformedSections;
}

function HeroBanner({ project }: HeroBannerProps) {
  // Implement proper banner URL fallback logic
  const bannerUrl = project.bannerUrl || project.image_url || '/academy/Projects/default-banner.jpg';
  
  return (
    <div className="w-full mt-16">
      <img
        src={bannerUrl}
        alt={project.name || project.title}
        className="block w-full object-cover md:aspect-[1666/720]"
      />
    </div>
  );
}

export default HeroBanner;