import type { ProgramWithTransformedSections } from '../../../../types/program';

interface HeroSectionProps {
  project: ProgramWithTransformedSections;
}

function HeroSection({ project }: HeroSectionProps) {
  // Use exact banner logic as specified - NO ENCODING
  const banner = 
    project?.bannerUrl ||
    (project as any)?.banner_url ||
    project?.image_url ||
    "/default-banner.png";
  
  return (
    <div className="w-full">
      {/* Banner Image - Use banner directly without encoding */}
      <div className="w-full overflow-hidden">
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