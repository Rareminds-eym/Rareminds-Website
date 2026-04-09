
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
import MediaGallery from '../../../components/Academy/SuccessStories/MediaGallery';
import ComingSoonSection from '../../../components/Academy/SuccessStories/ComingSoonSection';

// Programs that show coming soon
const COMING_SOON_SLUGS = ['vtu', 'aicte', 'ksdc', 'visvesvaraya-technological-university', 'visvesvaraya', 'vtu-karnataka'];

// Sections that should ALWAYS appear after the video — never in the first 2 slots
const ALWAYS_AFTER_VIDEO_KEYS = ['impact', 'strategic_alignment', 'conclusion'];

// Sections handled individually above the dynamic block
const HANDLED_ABOVE_KEYS = ['introduction', 'header', 'modules', 'approaches', 'inventions', 'programs'];

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
        
        const { data, error: apiError } = await getProgramWithSections(name);
        
        if (apiError) {
          setError('Failed to load project data');
          setProject(null);
        } else if (data) {
          setProject(data);
          setError(null);
        } else {
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
    name: project.title,
    imageUrl: project.image_url,
    bannerUrl: project.bannerUrl || project.image_url
  };

  // Check if this is a coming soon program
  
  if (COMING_SOON_SLUGS.includes(project.slug.toLowerCase())) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AcademyHeader />
        <ComingSoonSection programName={project.title} />
      </div>
    );
  }


  // Helper: render a section by key
  const renderSection = (key: string, section: any) => {
    // Skip sections handled above the dynamic block
    if (HANDLED_ABOVE_KEYS.includes(key)) return null;

    if (key === 'about') {
      if (transformedProject.aboutSection) {
        if (transformedProject.slug === 'dsatm') {
          return (
            <DSATMAboutSection
              key={key}
              section={transformedProject.aboutSection}
            />
          );
        }
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
      return (
        <div key={key} className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{section.title}</h2>
          <p className="text-gray-700 leading-relaxed">{section.content}</p>
        </div>
      );
    }

    if (key === 'impact') {
      return <ImpactSection key={key} section={section} />;
    }

    if (key === 'strategic_alignment') {
      return <StratageticSection key={key} section={section} />;
    }

    if (key === 'conclusion') {
      return <ConclusionSection key={key} section={section} />;
    }

    // Default section rendering
    return (
      <div key={key} className="bg-white rounded-lg shadow-sm p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{section.title}</h2>
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          {section.content.split('. ').map((sentence: string, index: number) => (
            <p key={index} className="mb-4">
              {sentence.trim() && !sentence.endsWith('.') ? sentence + '.' : sentence}
            </p>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <AcademyHeader />
      
      {/* Hero Section */}
      <HeroBanner project={transformedProject} />

      {/* Header Section - Full Width */}
      {transformedProject.sections?.header && (
        <HeaderSection section={transformedProject.sections.header} />
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
              {(() => {
                const entries = Object.entries(transformedProject.sections).filter(([key]) => key !== 'video');

                // Define the correct section order
                const sectionOrder = [
                  'introduction', 'header', 'about', 'modules', 'approaches',
                  'inventions', 'programs', 'course_enrollment',
                  'impact', 'strategic_alignment', 'conclusion'
                ];

                // Sort entries by the defined order
                const sortedEntries = entries.sort((a, b) => {
                  const indexA = sectionOrder.indexOf(a[0]);
                  const indexB = sectionOrder.indexOf(b[0]);
                  return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
                });

                // Split into: before-video sections and always-after-video sections
                const beforeVideoEntries = sortedEntries.filter(
                  ([key]) => !HANDLED_ABOVE_KEYS.includes(key) && !ALWAYS_AFTER_VIDEO_KEYS.includes(key)
                );

                const afterVideoEntries = sortedEntries.filter(
                  ([key]) => ALWAYS_AFTER_VIDEO_KEYS.includes(key)
                );

                return (
                  <>
                    {/* Sections before video (e.g. about, course_enrollment) */}
                    {beforeVideoEntries.map(([key, section]) => renderSection(key, section))}

                    {/* Video Section - Always after before-video sections */}
                    {transformedProject.sections && (transformedProject.sections['video'] as any)?.videoUrl &&
                      (transformedProject.sections['video'] as any)?.videoUrl.length > 0 && (
                        <MediaGallery
                          media={(transformedProject.sections['video'] as any).videoUrl}
                          title={(transformedProject.sections['video'] as any).title || 'Program Videos'}
                        />
                    )}

                    {/* Sections always after video: impact → strategic_alignment → conclusion */}
                    {afterVideoEntries.map(([key, section]) => renderSection(key, section))}
                  </>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SuccessStoriesDetailedPage;