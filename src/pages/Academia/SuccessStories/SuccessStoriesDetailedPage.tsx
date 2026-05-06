import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getProgramWithSections } from '../../../lib/api/programs';
import type { ProgramWithTransformedSections, SectionContent, TextContent, TransformedSection } from '../../../types/program';
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

// ── JSONB content unwrappers ──────────────────────────────────────────────────

function extractText(content: SectionContent | string | undefined | null): string {
  if (!content) return '';
  if (typeof content === 'string') return content;
  if ('text' in content) return (content as TextContent).text;
  return '';
}

function extractItems(content: SectionContent | string | undefined | null): { id: string; title: string; description: string }[] {
  if (!content || typeof content === 'string') return [];
  if ('items' in content) return (content as { items: { id: string; title: string; description: string }[] }).items;
  return [];
}

function extractStats(content: SectionContent | string | undefined | null): { id: string; value: string; label: string }[] {
  if (!content || typeof content === 'string') return [];
  if ('items' in content) return (content as { items: { id: string; value: string; label: string }[] }).items;
  return [];
}
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
              to="/success-stories"
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
    imageUrl: project.imageUrl,
    bannerUrl: project.bannerUrl || project.imageUrl
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
  const renderSection = (key: string, section: TransformedSection) => {
    // Skip sections handled above the dynamic block
    if (HANDLED_ABOVE_KEYS.includes(key)) return null;

    if (key === 'about') {
      if (transformedProject.aboutSection) {
        if (transformedProject.slug === 'dsatm') {
          return (
            <DSATMAboutSection
              key={key}
              section={{
                title: transformedProject.aboutSection.title,
                content: extractItems(transformedProject.sections?.about?.content),
                preamble: transformedProject.sections?.about?.preamble,
              }}
            />
          );
        }
        return (
          <AboutProgramSection
            section={{
              title: transformedProject.aboutSection.title,
              content: extractItems(transformedProject.sections?.about?.content),
              // ↑ now goes through your extractor which already handles id correctly
            }}
          />
        );
      }
      return (
        <div key={key} className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{section.title}</h2>
          <p className="text-gray-700 leading-relaxed">{extractText(section.content)}</p>
        </div>
      );
    }

    if (key === 'impact') {
      return (
        <ImpactSection
          key={key}
          section={{
            title: section.title,
            items: extractStats(section.content),
          }}
        />
      );
    }

    if (key === 'strategic_alignment') {
      return (
        <StratageticSection
          key={key}
          section={{
            title: section.title,
            content: extractItems(section.content),
          }}
        />
      );
    }

    if (key === 'conclusion') {
      return (
        <ConclusionSection
          key={key}
          section={{
            title: section.title,
            content: extractText(section.content),
            image: (() => {
              const content = section.content;
              if (content && typeof content === 'object' && 'image' in content) {
                return (content as { image?: { id: string; url: string } }).image;
              }
              return undefined;
            })(),
          }}
        />
      );
    }

    // Default section rendering — extract text from JSONB
    const text = extractText(section.content);
    return (
      <div key={key} className="bg-white rounded-lg shadow-sm p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{section.title}</h2>
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          <p className="mb-4">
            {text}
          </p>
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
        <HeaderSection
          section={{
            title: transformedProject.sections.header.title,
            content: extractText(transformedProject.sections.header.content),
          }}
        />
      )}

      {/* Introduction Section - Full Width */}
      {transformedProject.sections?.introduction && (
        <IntroductionSection
          title={transformedProject.sections.introduction.title}
          content={extractText(transformedProject.sections.introduction.content)}
          images={(() => {
            const content = transformedProject.sections.introduction.content;
            if (content && typeof content === 'object' && 'images' in content) {
              return (content as { images?: { id: string; url: string }[] }).images || [];
            }
            return [];
          })()}
        />
      )}

      {/* Modules Section - Full Width */}
      {transformedProject.sections?.modules && transformedProject.sections?.approaches && (
        <ModulesSection
          modules={{
            title: transformedProject.sections.modules.title,
            items: extractItems(transformedProject.sections.modules.content),
          }}
          approaches={{
            title: transformedProject.sections.approaches.title,
            items: extractItems(transformedProject.sections.approaches.content),
          }}
          intervention={transformedProject.sections.intervention ? {
            title: transformedProject.sections.intervention.title,
            content: extractText(transformedProject.sections.intervention.content),
          } : undefined}
        />
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
                    {(() => {
                      const videoSection = transformedProject.sections['video'];
                      if (!videoSection?.videoUrl?.length) return null;
                      return (
                        <MediaGallery
                          media={videoSection.videoUrl.map((item, index) => ({
                            ...item,
                            id: item.item1 || `video-${index}`,
                          }))}
                          title={videoSection.title || 'Program Videos'}
                        />
                      );
                    })()}
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