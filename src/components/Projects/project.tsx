import { useState, useEffect } from "react";
import { Badge } from "../Academy/Project/ui/badge";
import { Button } from "../ui/button";
import { ArrowRight, Filter } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import ProjectCard from "./ProjectCard";

interface ProjectPost {
  id: string;
  title: string;
  meta_description: string | null;
  featured_image: string | null;
  project_tags: string | null;
  slug: string | null;
  created_at: string;
}

const Index = () => {
  const [activeFilter, setActiveFilter] = useState("All");  const { data: projects = [], isLoading, error } = useQuery({
    queryKey: ['project_posts'],
    queryFn: async () => {
      console.log('Fetching project posts from Supabase...');
      
      const { data, error } = await supabase
        .from('project_posts')
        .select('id, title, meta_description, featured_image, project_tags, slug, created_at')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Supabase error:', error);
        throw new Error(`Failed to fetch projects: ${error.message}`);
      }
      
      console.log('Fetched projects:', data);
      return data as ProjectPost[];
    },
  });

  // Set up real-time subscription
  useEffect(() => {
    console.log('Setting up real-time subscription for project_posts...');
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'project_posts'
        },
        (payload) => {
          console.log('Real-time update received:', payload);
          // Refetch data when changes occur
          window.location.reload();
        }
      )
      .subscribe();

    return () => {
      console.log('Cleaning up real-time subscription...');
      supabase.removeChannel(channel);
    };
  }, []);

  const filters = ["All", "Recent", "Featured"];

  const handleFilter = (filter: string) => {
    setActiveFilter(filter);
    // For now, we'll just update the active filter
    // In the future, you could implement actual filtering logic
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-destructive">Error Loading Projects</h1>
          <p className="text-muted-foreground mb-4">There was an issue fetching the projects.</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Mock data for development when Supabase is not configured
  const mockProjects: ProjectPost[] = [
    {
      id: "mock-1",
      title: "Smart City Water Management System",
      meta_description: "An innovative IoT-based water management system that helps cities monitor and optimize water usage in real-time.",
      featured_image: "/api/placeholder/400/300",
      project_tags: "IoT, Smart City, Water Management, Sustainability",
      slug: "smart-city-water-management",
      created_at: "2024-01-15T10:00:00Z"
    },
    {
      id: "mock-2", 
      title: "AI-Powered Educational Platform",
      meta_description: "A machine learning platform that personalizes learning experiences for students based on their learning patterns.",
      featured_image: "/api/placeholder/400/300",
      project_tags: "AI, Education, Machine Learning, Personalization",
      slug: "ai-educational-platform",
      created_at: "2024-01-20T14:30:00Z"
    },
    {
      id: "mock-3",
      title: "Renewable Energy Monitoring Dashboard",
      meta_description: "A comprehensive dashboard for monitoring and analyzing renewable energy production and consumption patterns.",
      featured_image: "/api/placeholder/400/300", 
      project_tags: "Renewable Energy, Dashboard, Analytics, Sustainability",
      slug: "renewable-energy-dashboard",
      created_at: "2024-01-25T09:15:00Z"
    }
  ];

  const displayedProjects = projects.length > 0 ? projects : mockProjects;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Our Work, Our Impact
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Explore how we drive change through purposeful projects across industries, 
              creating lasting impact in communities worldwide.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                {displayedProjects.length}+ Projects
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                Real-time Updates
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                Live Data
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 px-6 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">Filter by:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {filters.map((filter) => (
                <Button
                  key={filter}
                  variant={activeFilter === filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilter(filter)}
                  className="transition-all duration-200 hover-scale"
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {displayedProjects.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold mb-4">No Projects Yet</h2>
              <p className="text-muted-foreground text-lg mb-8">
                Projects will appear here once they are added to the database.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {displayedProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="animate-fade-in opacity-0"
                  style={{
                    animationDelay: `${index * 150}ms`,
                    animationFillMode: "forwards"
                  }}
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Create Impact Together?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join us in building a better tomorrow through innovative solutions and meaningful partnerships.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="group">
              Start a Partnership
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg">
              Learn More About Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
