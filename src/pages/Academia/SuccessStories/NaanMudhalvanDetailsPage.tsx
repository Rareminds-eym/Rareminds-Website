import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getProgramWithSections } from '../../../lib/api/programs';
import type { ProgramWithTransformedSections, SectionContent, TextContent, CardsContent, StatsContent, CoursesContent, TransformedSection } from '../../../types/program';
import AcademyHeader from '../../../components/Header/AcademyHeader';
import HeroSection from '../../../components/Academy/SuccessStories/NaanMudhulvan/HeroSection';
import NaanIntroduction from '../../../components/Academy/SuccessStories/NaanMudhulvan/NaanIntroduction';
import NaanAboutProgramme from '../../../components/Academy/SuccessStories/NaanMudhulvan/NaanAboutProgramme';
import NaanCourseEnrollment from '../../../components/Academy/SuccessStories/NaanMudhulvan/NaanCourseEnrollment';
import NaanImpactSection from '../../../components/Academy/SuccessStories/NaanMudhulvan/NaanImpactSection';
import NaanStrategicAlignment from '../../../components/Academy/SuccessStories/NaanMudhulvan/NaanStrategicAlignment';
import NaanConclusion from '../../../components/Academy/SuccessStories/NaanMudhulvan/NaanConclusion';
import MediaGallery from '../../../components/Academy/SuccessStories/MediaGallery';
// ── JSONB content unwrappers ──────────────────────────────────────────────────
// The API returns content as typed JSONB objects. Components expect plain strings
// or structured arrays. These helpers bridge that gap.

function extractText(content: SectionContent | string | undefined | null): string {
  if (!content) return '';
  if (typeof content === 'string') return content;
  if ('text' in content) return (content as TextContent).text;
  return '';
}

function extractItems(content: SectionContent | string | undefined | null): { id: string; title: string; description: string }[] {
  if (!content || typeof content === 'string') return [];
  if ('items' in content) return (content as CardsContent | StatsContent).items as { id: string; title: string; description: string }[];
  return [];
}

function extractStats(content: SectionContent | string | undefined | null): { id: string; value: string; label: string }[] {
  if (!content || typeof content === 'string') return [];
  if ('items' in content) return (content as StatsContent).items as { id: string; value: string; label: string }[];
  return [];
}

function extractCourses(content: SectionContent | string | undefined | null) {
  if (!content || typeof content === 'string') return [];
  if ('courses' in content) return (content as CoursesContent).courses;
  return [];
}
function NaanMudhalvanDetailsPage() {
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
          setError('Failed to load Naan Mudhalvan program data');
          setProject(null);
        } else if (data) {
          setProject(data);
          setError(null);
        } else {
          setError('Naan Mudhalvan program not found');
          setProject(null);
        }
      } catch (err) {
        setError(`Failed to load Naan Mudhalvan program data: ${err instanceof Error ? err.message : String(err)}`);
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
      <div className="min-h-screen bg-white">
        <AcademyHeader />
        <div className="container mx-auto px-4 pt-32 pb-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading Naan Mudhalvan program details...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !project) {
    return (
      <div className="min-h-screen bg-white">
        <AcademyHeader />
        <div className="container mx-auto px-4 pt-32 pb-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {error || 'Naan Mudhalvan Program Not Found'}
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

  // Transform sections — unwrap JSONB content objects into the plain strings/arrays
  // that each Naan Mudhalvan component expects.
  const transformedSections = {
    // NaanIntroduction expects { title: string; content: string }
    introduction: project.sections?.introduction ? {
      title: project.sections.introduction.title,
      content: extractText(project.sections.introduction.content),
    } : null,

    // NaanAboutProgramme expects { title: string; content: string } for about
    // and { title: string; courses: CourseItem[] } for courseEnrollment
    about: project.sections?.about ? {
      title: project.sections.about.title,
      content: extractText(project.sections.about.content),
    } : null,

    courseEnrollment: project.sections?.course_enrollment ? {
      title: project.sections.course_enrollment.title,
      courses: extractCourses(project.sections.course_enrollment.content),
    } : null,

    // NaanImpactSection expects { title: string; items: StatItem[] }
    impact: project.sections?.impact ? {
      title: project.sections.impact.title,
      items: extractStats(project.sections.impact.content),
    } : null,

    // NaanStrategicAlignment expects { title, description, content: ContentItem[] }
    strategicAlignment: (() => {
      // Single guard at the top — clean, readable, production-grade
      const strategicSection = project.sections?.strategic_alignment;
      if (!strategicSection) return null;

      // Below this line, TypeScript KNOWS it's safe — no ! needed
      const content = strategicSection.content;
      const description =
        content && typeof content === 'object' && 'description' in content
          ? (content as { description: string }).description
          : '';

      return {
        title: strategicSection.title,
        description,
        content: extractItems(strategicSection.content),
      };
    })(),

    // NaanConclusion expects { title: string; content: string; image?: ImageItem }
    conclusion: (() => {
      const conclusionSection = project.sections?.conclusion;
      if (!conclusionSection) return null;          // ← single guard

      const content = conclusionSection.content;
      const image =
        content && typeof content === 'object' && 'image' in content
          ? (content as { image?: { id: string; url: string } }).image
          : undefined;

      return {
        title: conclusionSection.title,
        content: extractText(content),
        image,
      };
    })(),
  };

  return (
    <div className="min-h-screen bg-white">
      <AcademyHeader />

      {/* Naan Mudhalvan Hero Banner */}
      <div className="pt-20">
        <HeroSection project={project} />
      </div>

      {/* Naan Mudhalvan Introduction Section */}
      {transformedSections.introduction && (
        <NaanIntroduction section={transformedSections.introduction} />
      )}

      {/* Naan Mudhalvan About Programme Section */}
      {transformedSections.about && transformedSections.courseEnrollment && (
        <NaanAboutProgramme
          aboutSection={transformedSections.about}
          courseEnrollmentSection={transformedSections.courseEnrollment}
        />
      )}

      {/* Video Section - After About section */}
      {(() => {
        const videoSection = project.sections?.['video'];
        if (!videoSection?.videoUrl?.length) return null;
        return (
          <MediaGallery
            media={videoSection.videoUrl.map((item, index) => ({
              ...item,
              id: item.item1 || `video-${index}`,
            }))}
            title={videoSection.title || 'Program Videos'}
            compact={true}
          />
        );
      })()}

      {/* Naan Mudhalvan Course Enrollment Section */}
      {transformedSections.courseEnrollment && (
        <NaanCourseEnrollment
          courseEnrollmentSection={transformedSections.courseEnrollment}
        />
      )}

      {/* Naan Mudhalvan Impact Section */}
      {transformedSections.impact && (
        <NaanImpactSection
          impactSection={transformedSections.impact}
        />
      )}

      {/* Naan Mudhalvan Strategic Alignment Section */}
      {transformedSections.strategicAlignment && (
        <NaanStrategicAlignment
          strategicAlignmentSection={transformedSections.strategicAlignment}
        />
      )}

      {/* Naan Mudhalvan Conclusion Section */}
      {transformedSections.conclusion && (
        <NaanConclusion
          section={transformedSections.conclusion}
        />
      )}

      {/* Naan Mudhalvan Content Sections */}

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Detailed Sections for Naan Mudhalvan - Using API data only */}
          {project.sections && (
            <div className="space-y-16">
              {(() => {
                const entries = Object.entries(project.sections || {});
                const renderableEntries = entries.filter(([key]) =>
                  key !== 'video' &&
                  key !== 'introduction' &&
                  key !== 'about' &&
                  key !== 'course_enrollment' &&
                  key !== 'impact' &&
                  key !== 'strategic_alignment' &&
                  key !== 'conclusion'
                );

                const renderFallbackSection = (key: string, section: TransformedSection, index: number, numberLabel: number) => {
                  const text = extractText(section.content);
                  return (
                    <div key={key} className="relative">
                      <div className="absolute -left-4 top-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                        {numberLabel}
                      </div>
                      <div className={`ml-12 ${index % 2 === 0 ? 'bg-white' : 'bg-blue-50'} rounded-2xl p-10 shadow-sm`}>
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">{section.title}</h2>
                        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                          <p className="mb-6 text-lg leading-relaxed">
                            {text}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                };

                return (
                  <>
                    {renderableEntries.slice(0, 2).map(([key, section], index) =>
                      renderFallbackSection(key, section, index, index + 1)
                    )}

                    {renderableEntries.slice(2).map(([key, section], index) =>
                      renderFallbackSection(key, section, index + 3, index + 4)
                    )}
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

export default NaanMudhalvanDetailsPage;