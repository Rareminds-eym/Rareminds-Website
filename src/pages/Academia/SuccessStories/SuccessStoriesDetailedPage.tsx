import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getProgramWithSections } from '../../../lib/api/programs';
import type { ProgramWithTransformedSections } from '../../../types/program';

// Import generic components for layout
import AcademyHeader from '../../../components/Header/AcademyHeader';
import HeroBanner from '../../../components/Academy/SuccessStories/HeroBanner';
import HeaderSection from '../../../components/Academy/SuccessStories/HeaderSection';
import IntroductionSection from '../../../components/Academy/SuccessStories/IntroductionSection';
import ModulesSection from '../../../components/Academy/SuccessStories/ModulesSection';
import AboutProgramSection from '../../../components/Academy/SuccessStories/AboutProgramSection';
import ImpactSection from "../../../components/Academy/SuccessStories/ImpactSection";
import StratageticSection from "../../../components/Academy/SuccessStories/StratageticSection";
import ConclusionSection from "../../../components/Academy/SuccessStories/ConclusionSection";
import DSATMAboutSection from '../../../components/Academy/SuccessStories/DSATMAboutSection';
function SuccessStoriesDetailedPage() {
  const { name } = useParams<{ name: string }>();
  const [project, setProject] = useState<ProgramWithTransformedSections | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      if (!name) {
        setError('No project name provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log('🔄 Fetching project data for URL param name:', name);
        
        const { data, error: apiError } = await getProgramWithSections(name);
        
        if (apiError) {
          console.error('❌ [COMPONENT] API Error:', apiError);
          setError('Failed to load project data');
          setProject(null);
        } else if (data) {
          setProject(data);
          setError(null);
        } else {
          console.log('❌ [COMPONENT] No project found for slug:', name);
          setError('Project not found');
          setProject(null);
        }
      } catch (err) {
        console.error('💥 Fetch error:', err);
        setError('Failed to load project data');
        setProject(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [name]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AcademyHeader />
        <div className="container mx-auto px-4 pt-32 pb-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading project details...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AcademyHeader />
        <div className="container mx-auto px-4 pt-32 pb-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {error || 'Success Story Not Found'}
            </h1>
            <Link 
              to="/SuccessStories" 
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Success Stories
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Transform project data to match the expected format for components
  const transformedProject = {
    ...project,
    name: project.title, // Map title to name for compatibility
    imageUrl: project.image_url,
    bannerUrl: project.bannerUrl || project.image_url
  };

  // Debug logging to see actual slug values
  console.log('🔍 [ROUTING DEBUG] Project slug:', transformedProject.slug);
  console.log('🔍 [ROUTING DEBUG] Project title:', transformedProject.title);
  console.log('🔍 [ROUTING DEBUG] Project name:', transformedProject.name);
  
  // **USE GENERIC LAYOUT FOR ALL PROGRAMS**
  // All programs now use the unified generic layout

  // **GENERIC LAYOUT FOR ALL PROGRAMS**

  return (
    <div className="min-h-screen bg-gray-50">
      <AcademyHeader />
      
      {/* Hero Section */}
      <HeroBanner project={transformedProject} />

      {/* Header Section - Full Width */}
      {transformedProject.sections?.header && (
        <HeaderSection 
          section={transformedProject.sections.header}
        />
      )}

      {/* Introduction Section - Full Width */}
      {transformedProject.sections?.introduction && (
        <IntroductionSection 
          title={transformedProject.sections.introduction.title}
          content={transformedProject.sections.introduction.content}
        />
      )}

      {/* Modules Section - Full Width */}
      {transformedProject.sections?.modules && transformedProject.sections?.approaches && (
        <>
          {/* Use DSATMAboutSection for Tripura to get the three-column layout */}
          {transformedProject.slug === 'tripura' ? (
            <DSATMAboutSection 
              section={{
                title: "Program Details & Training Modules",
                content: [
                  {
                    title: "Program Delivery",
                    description: transformedProject.sections.programs?.content || ""
                  },
                  {
                    title: "Modules Covered", 
                    description: transformedProject.sections.modules.content
                  },
                  {
                    title: "Multiple Approaches Used",
                    description: transformedProject.sections.approaches.content
                  }
                ]
              }}
            />
          ) : (
            <ModulesSection 
              modules={transformedProject.sections.modules}
              approaches={transformedProject.sections.approaches}
              projectName={transformedProject.name}
              intervention={transformedProject.sections.inventions}
            />
          )}
        </>
      )}

      {/* Remaining Content Sections */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">

          {transformedProject.sections && (
            <div className="space-y-0">
              {Object.entries(transformedProject.sections).map(([key, section]) => {
                // Skip these sections as they're handled above
                if (key === 'introduction' || key === 'header' || key === 'modules' || key === 'approaches' || key === 'inventions' || key === 'programs') return null;
                
                // Use AboutProgramSection for 'about' section (original UI design)
                if (key === 'about') {
                  // Use the specially formatted aboutSection if available
                  if (transformedProject.aboutSection) {
                    // Use DSATMAboutSection for DSATM to get the three-column layout
                    if (transformedProject.slug === 'dsatm') {
                      return (
                        <DSATMAboutSection 
                          key={key}
                          section={transformedProject.aboutSection}
                        />
                      );
                    } else {
                      // Use regular AboutProgramSection for other programs
                      return (
                        <AboutProgramSection 
                          key={key}
                          section={transformedProject.aboutSection}
                          technologies={transformedProject.technologies || []}
                          programData={{
                            slug: transformedProject.slug,
                            sections: transformedProject.sections
                          }}
                        />
                      );
                    }
                  }
                  
                  // Fallback to regular section (shouldn't happen with our transformation)
                  return (
                    <div key={key} className="bg-white rounded-lg shadow-sm p-8 mb-12">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        {section.title}
                      </h2>
                      <p className="text-gray-700 leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  );
                }
                
                // ImpactSection for 'impact' - using API data directly
                if (key === 'impact') {
                  return (
                    <ImpactSection
                      key={key}
                      section={section}
                    />
                  );
                }
                
                // StrategicSection for 'strategic_alignment' - using API data directly
                if (key === 'strategic_alignment') {
                  return (
                    <StratageticSection
                      key={key}
                      section={section}
                    />
                  );
                }
                
                // ConclusionSection for 'conclusion' - using API data directly
                if (key === 'conclusion') {
                  return (
                    <ConclusionSection
                      key={key}
                      section={section}
                    />
                  );
                }
                
                // Default section rendering - using API data directly
                return (
                  <div key={key} className="bg-white rounded-lg shadow-sm p-8 mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      {section.title}
                    </h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                      {section.content.split('. ').map((sentence: string, index: number) => (
                        <p key={index} className="mb-4">
                          {sentence.trim() && !sentence.endsWith('.') ? sentence + '.' : sentence}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SuccessStoriesDetailedPage;