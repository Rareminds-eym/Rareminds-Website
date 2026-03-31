import { useParams, Link } from 'react-router-dom';
import { projects } from '../../../components/Academy/SuccessStories/SuccessStorieslistings';
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
  
  // Function to convert URL slug back to project name for matching
  const urlToName = (urlSlug: string) => {
    // Handle special cases for better matching
    const specialCases: { [key: string]: string } = {
      'naan-mudhalvan-2023-upskilling-program-powered-by-rareminds': 'Naan Mudhalvan 2023 Upskilling Program (Powered by Rareminds)',
      'naan-mudhalvan-2024-upskilling-program-powered-by-rareminds': 'Naan Mudhalvan 2024 Upskilling Program (Powered by Rareminds)',
      'naan-mudhalvan-4th-sem-2025-upskilling-program-powered-by-rareminds': 'Naan Mudhalvan 4th sem 2025 Upskilling Program (Powered by Rareminds)',
      'naan-mudhalvan-6th-sem-2025-upskilling-program-powered-by-rareminds': 'Naan Mudhalvan 6th sem 2025 Upskilling Program (Powered by Rareminds)',
      'naan-mudhalvan-2025-upskilling-program-powered-by-rareminds': 'Naan Mudhalvan 2025 Upskilling Program (Powered by Rareminds)'
    };
    
    if (specialCases[urlSlug]) {
      return specialCases[urlSlug];
    }
    
    // For other projects, try to match by converting back
    return urlSlug.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };
  
  const project = projects.find(p => {
    const projectSlug = p.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    return projectSlug === name || p.name === urlToName(name || '');
  });

  if (!project) {
    return (
      <div className="min-h-screen bg-white">
        <AcademyHeader />
        <div className="container mx-auto px-4 pt-32 pb-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Naan Mudhalvan Program Not Found</h1>
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

  return (
    <div className="min-h-screen bg-white">
      <AcademyHeader />
      
      {/* Naan Mudhalvan Hero Banner */}
      <div className="pt-20">
        <HeroSection project={project} />
      </div>

      {/* Naan Mudhalvan Introduction Section */}
      {project.sections && project.sections['introduction'] && (
        <NaanIntroduction section={project.sections['introduction']} />
      )}

      {/* Naan Mudhalvan About Programme Section */}
      {project.sections && project.sections['about'] && project.sections['course_enrollment'] && (
        <NaanAboutProgramme 
          aboutSection={project.sections['about']} 
          courseEnrollmentSection={project.sections['course_enrollment']} 
        />
      )}

      {/* Naan Mudhalvan Course Enrollment Section */}
      {project.sections && project.sections['course_enrollment'] && (
        <NaanCourseEnrollment 
          courseEnrollmentSection={project.sections['course_enrollment']} 
        />
      )}

      {/* Naan Mudhalvan Impact Section */}
      {project.sections && project.sections['impact'] && (
        <NaanImpactSection 
          impactSection={project.sections['impact']} 
        />
      )}

      {/* Naan Mudhalvan Strategic Alignment Section */}
      {project.sections && project.sections['strategic_alignment'] && (
        <NaanStrategicAlignment 
          strategicAlignmentSection={project.sections['strategic_alignment']} 
        />
      )}

      {/* Naan Mudhalvan Conclusion Section */}
      {project.sections && project.sections['conclusion'] && (
        <NaanConclusion 
          section={project.sections['conclusion']} 
        />
      )}

      {/* Naan Mudhalvan Content Sections */}
      <div className="">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Detailed Sections for Naan Mudhalvan */}
            {project.sections && (
              <div className="space-y-16">
                {Object.entries(project.sections).map(([key, section], index) => {
                  // Skip introduction, about, course_enrollment, impact, strategic_alignment, and conclusion as they're handled by special components
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