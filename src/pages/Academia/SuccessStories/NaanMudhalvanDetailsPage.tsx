import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getProgramWithSections } from '../../../lib/api/programs';
import type { ProgramWithTransformedSections } from '../../../types/program';
import AcademyHeader from '../../../components/Header/AcademyHeader';
import HeroSection from '../../../components/Academy/SuccessStories/NaanMudhulvan/HeroSection';
import NaanIntroduction from '../../../components/Academy/SuccessStories/NaanMudhulvan/NaanIntroduction';
import NaanAboutProgramme from '../../../components/Academy/SuccessStories/NaanMudhulvan/NaanAboutProgramme';
import NaanCourseEnrollment from '../../../components/Academy/SuccessStories/NaanMudhulvan/NaanCourseEnrollment';
import NaanImpactSection from '../../../components/Academy/SuccessStories/NaanMudhulvan/NaanImpactSection';
import NaanStrategicAlignment from '../../../components/Academy/SuccessStories/NaanMudhulvan/NaanStrategicAlignment';
import NaanConclusion from '../../../components/Academy/SuccessStories/NaanMudhulvan/NaanConclusion';

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
          console.error('❌ [NAAN MUDHALVAN] API Error:', apiError);
          setError('Failed to load Naan Mudhalvan program data');
          setProject(null);
        } else if (data) {
          setProject(data);
          setError(null);
        } else {
          console.log('❌ [NAAN MUDHALVAN] No project found for slug:', name);
          setError('Naan Mudhalvan program not found');
          setProject(null);
        }
      } catch (err) {
        setError('Failed to load Naan Mudhalvan program data');
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

  // Fix banner logic using exact logic as specified
  const banner = 
    project?.bannerUrl ||
    (project as any)?.banner_url ||
    project?.image_url ||
    "/default-banner.png";

  // Transform project data to match expected format for components
  const transformedProject = {
    // Required Project interface fields for HeroSection
    id: project.id,
    name: project.title,
    description: project.short_description || '',
    category: project.program_type,
    status: project.status,
    year: project.date ? new Date(project.date).getFullYear().toString() : '',
    location: project.location,
    technologies: [] as string[], // Default empty array
    imageUrl: project.image_url,
    bannerUrl: banner, // Use the fixed banner logic
    timeline: project.date ? new Date(project.date).getFullYear().toString() : ''
  };

  // Transform sections for components that need specific formats
  // ✅ Using API response directly: project.sections (already filtered by program_id)
  const transformedSections = {
    // For NaanIntroduction - expects { title: string; content: string }
    introduction: project.sections?.introduction ? {
      title: project.sections.introduction.title,
      content: project.sections.introduction.content
    } : null,

    // For NaanAboutProgramme - expects AboutSection and CourseEnrollmentSection
    about: project.sections?.about ? {
      title: project.sections.about.title,
      content: project.sections.about.content
    } : null,

    courseEnrollment: project.sections?.course_enrollment ? {
      title: project.sections.course_enrollment.title,
      content: project.sections.course_enrollment.content
    } : null,

    // For NaanImpactSection - expects { title: string; content: string }
    impact: project.sections?.impact ? {
      title: project.sections.impact.title,
      content: project.sections.impact.content
    } : null,

    // For NaanStrategicAlignment - expects { title: string; description: string; content: ContentItem[] }
    strategicAlignment: project.sections?.strategic_alignment ? {
      title: project.sections.strategic_alignment.title,
      description: (() => {
        // Set appropriate description based on program slug
        if (project.slug === 'naan-mudhalvan-2024') {
          return 'This initiative directly advanced the mission of the Tamil Nadu Skill Development Corporation through:';
        } else if (project.slug === 'naan-mudhalvan-2023') {
          return 'This initiative directly contributed to the Tamil Nadu Skill Development Corporation\'s mission through:';
        } else if (project.slug === 'naan-mudhalvan-6th-sem-2025') {
          return 'The Rareminds–TNSDC collaboration under the Naan Mudhalvan initiative exemplifies impactful industry-academia synergy:';
        } else if (project.slug === 'naan-mudhalvan-2025') {
          return 'This initiative aligned seamlessly with TNSDC and Naan Mudhalvan objectives:';
        } else if (project.slug === 'naan-mudhalvan-4th-sem-2025') {
          return 'This initiative aligned seamlessly with TNSDC and Naan Mudhalvan objectives:';
        }
        return 'Strategic alignment with organizational goals:';
      })(),
      content: project.sections.strategic_alignment.content
        .split(/\.\s+(?=[A-Z])/) // Split on ". " followed by capital letter (start of new section)
        .filter(section => section.trim().length > 0)
        .map((section) => {
          const trimmed = section.trim();
          // Look for pattern "Title: Description"
          const colonIndex = trimmed.indexOf(':');
          if (colonIndex > 0 && colonIndex < trimmed.length - 1) {
            const title = trimmed.substring(0, colonIndex).trim();
            let description = trimmed.substring(colonIndex + 1).trim();
            
            // Ensure description ends with period
            if (!description.endsWith('.')) {
              description += '.';
            }
            
            return { title, description };
          }
          
          // Fallback: return the whole section as description with generic title
          return {
            title: 'Strategic Goal',
            description: trimmed.endsWith('.') ? trimmed : trimmed + '.'
          };
        })
        .filter(item => item.title.length > 3 && item.description.length > 10) // Filter out invalid items
    } : null,

    // For NaanConclusion - expects { title: string; content: string }
    conclusion: project.sections?.conclusion ? {
      title: project.sections.conclusion.title,
      content: project.sections.conclusion.content
    } : null
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
      <div className="">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Detailed Sections for Naan Mudhalvan - Using API data only */}
            {project.sections && (
              <div className="space-y-16">
                {Object.entries(project.sections).map(([key, section], index) => {
                  // Skip sections that are handled by special components
                  if (key === 'introduction' || key === 'about' || key === 'course_enrollment' || key === 'impact' || key === 'strategic_alignment' || key === 'conclusion') return null;
                  
                  return (
                    <div key={key} className="relative">
                      {/* Section Number */}
                      <div className="absolute -left-4 top-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                        {index - 2}
                      </div>
                      
                      <div className={`ml-12 ${(index - 3) % 2 === 0 ? 'bg-white' : 'bg-blue-50'} rounded-2xl p-10 shadow-sm`}>
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">
                          {section.title}
                        </h2>
                        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                          {section.content.split('. ').map((sentence: string, sentenceIndex: number) => {
                            const trimmedSentence = sentence.trim();
                            if (!trimmedSentence) return null;
                            
                            return (
                              <p key={sentenceIndex} className="mb-6 text-lg leading-relaxed">
                                {trimmedSentence && !trimmedSentence.endsWith('.') ? trimmedSentence + '.' : trimmedSentence}
                              </p>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NaanMudhalvanDetailsPage;