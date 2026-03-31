
import { Project } from './types';

interface HeroBannerProps {
  project: Project;
}

function HeroBanner({ project }: HeroBannerProps) {
  return (
    <div className="w-full mt-16">
      <img
        src={project.bannerUrl}
        alt={project.name}
        className="block w-full object-cover md:aspect-[1666/720]"
      />
    </div>
  );
}

export default HeroBanner;