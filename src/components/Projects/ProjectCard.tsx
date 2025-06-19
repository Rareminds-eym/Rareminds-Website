import { Link } from "react-router-dom";
import { Badge } from "../Academy/Project/ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { ArrowRight, Calendar, Image as ImageIcon } from "lucide-react";

interface ProjectPost {
  id: string;
  title: string;
  meta_description: string | null;
  featured_image: string | null;
  project_tags: string | null;
  slug: string | null;
  created_at: string;
}

interface ProjectCardProps {
  project: ProjectPost;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  // Parse tags from the project_tags string
  const tags = project.project_tags 
    ? project.project_tags.split(',').map(tag => tag.trim()).filter(Boolean)
    : [];

  // Format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };  // Create the project URL - use slug if available, otherwise fall back to ID
  const projectUrl = `/school/new-projects/${project.slug || project.id}`;

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden h-full">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden">
          {project.featured_image ? (
            <img
              src={project.featured_image}
              alt={project.title}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                // Fallback if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          
          {/* Fallback placeholder when no image or image fails */}
          <div className={`w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center ${project.featured_image ? 'hidden' : ''}`}>
            <ImageIcon className="h-12 w-12 text-muted-foreground" />
          </div>

          <div className="absolute top-4 left-4 flex gap-2">
            <Badge variant="secondary" className="bg-white/90 text-primary">
              <Calendar className="h-3 w-3 mr-1" />
              {formatDate(project.created_at)}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 flex-1">
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{tags.length - 3} more
              </Badge>
            )}
          </div>
        )}

        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
          {project.title}
        </h3>

        <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
          {project.meta_description || 'Discover more about this impactful project and the positive change it brings to communities.'}
        </p>

        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4 mb-4">
          <p className="font-semibold text-primary text-sm">
            Project ID: {project.id.slice(0, 8)}...
          </p>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Link to={projectUrl} className="w-full">
          <Button className="w-full group">
            View Details
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
