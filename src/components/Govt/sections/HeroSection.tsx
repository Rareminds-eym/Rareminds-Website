interface Project {
  id: string;
  name: string;
  description: string;
  category: string;
  status: string;
  year: string;
  location: string;
  technologies: string[];
  imageUrl: string;
  bannerUrl: string;
  timeline: string;
}
 
interface HeroSectionProps {
  project: Project;
}
 
function HeroSection({ project }: HeroSectionProps) {
  return (
    <div className="w-full">
      {/* Banner Image */}
      <div className="w-full overflow-hidden">
        <img
          src={project.bannerUrl}
          alt={project.name}
          className="w-full h-auto object-cover object-center"
        />
      </div>
     
      {/* Title Section Below Banner */}
      <div className="bg-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-xl lg:text-4xl font-bold text-gray-900 mb-4">
            {project.name}
          </h1>
        </div>
      </div>
    </div>
  );
}
 
export default HeroSection;