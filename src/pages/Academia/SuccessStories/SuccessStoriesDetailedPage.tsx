import { useParams, Link } from 'react-router-dom';
import { projects } from '../../../components/Academy/SuccessStories/SuccessStorieslistings';
import AcademyHeader from '../../../components/Header/AcademyHeader';
import HeroBanner from '../../../components/Academy/SuccessStories/HeroBanner';
import HeaderSection from '../../../components/Academy/SuccessStories/HeaderSection';
import IntroductionSection from '../../../components/Academy/SuccessStories/IntroductionSection';
import ModulesSection from '../../../components/Academy/SuccessStories/ModulesSection';
import AboutProgramSection from '../../../components/Academy/SuccessStories/AboutProgramSection';
import DSATMAboutSection from '../../../components/Academy/SuccessStories/DSATMAboutSection';
import ImpactSection from "../../../components/Academy/SuccessStories/ImpactSection";
import StratageticSection from "../../../components/Academy/SuccessStories/StratageticSection";
import ConclusionSection from "../../../components/Academy/SuccessStories/ConclusionSection";
function SuccessStoriesDetailedPage() {
  const { name } = useParams<{ name: string }>();
  
  const urlToName = (urlSlug: string) => {
    const specialCases: { [key: string]: string } = {
      'acharya': 'Acharya',
      'pes': 'PES',
      'bldea': 'BLDEA',
      'vels': 'VELS',
      'tripura': 'Tripura',
      'dsatm': 'DSATM',
      'aicte': 'AICTE',
      'ksdc': 'KSDC',
      'visvesvaraya-technological-university': 'Visvesvaraya Technological University',
      'global-international-school': 'Global International School',
      'tnsdc-iti-spoken-english': 'TNSDC ITI (Spoken English)',
      'tnsdc-schools': 'TNSDC Schools'
    };
    
    if (specialCases[urlSlug]) {
      return specialCases[urlSlug];
    }
    
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
      <div className="min-h-screen bg-gray-50">
        <AcademyHeader />
        <div className="container mx-auto px-4 pt-32 pb-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Success Story Not Found</h1>
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
    <div className="">
      <AcademyHeader />
      
      {/* Hero Section */}
      <HeroBanner project={project} />

      {/* Header Section - Full Width */}
      {project.sections && project.sections['header'] && (
        <HeaderSection 
          section={project.sections['header']}
        />
      )}

      {/* Introduction Section - Full Width */}
      {project.sections && project.sections['introduction'] && (
        <IntroductionSection 
          title={project.sections['introduction'].title}
          content={project.sections['introduction'].content}
        />
      )}

      {/* Modules Section - Full Width */}
      {project.sections && project.sections['modules'] && project.sections['approaches'] && project.name !== 'Tripura' && (
        <ModulesSection 
          modules={project.sections['modules']}
          approaches={project.sections['approaches']}
          projectName={project.name}
          intervention={project.sections['Inventions']}
        />
      )}

      {/* Special Tripura Section - Use DSATMAboutSection for Programs, Modules, and Approaches */}
      {project.name === 'Tripura' && project.sections && project.sections['Programs'] && project.sections['modules'] && project.sections['approaches'] && (
        <DSATMAboutSection 
          section={{
            title: 'Program Details & Training Modules',
            content: [
              {
                title: 'Program Delivery',
                description: project.sections['Programs'].content
              },
              {
                title: 'Modules Covered',
                description: project.sections['modules'].content
              },
              {
                title: 'Multiple Approaches Used',
                description: project.sections['approaches'].content
              }
            ]
          }}
        />
      )}

      {/* Remaining Content Sections */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">

          {project.sections && (
            <div className="space-y-0">
              {Object.entries(project.sections).map(([key, section]) => {
                // Skip these sections as they're handled above
                if (key === 'introduction' || key === 'header' || key === 'modules' || key === 'approaches' || key === 'Inventions') return null;
                
                // For Tripura, also skip Programs section as it's handled in DSATMAboutSection
                if (project.name === 'Tripura' && key === 'Programs') return null;
                
                // Use AboutProgramSection for 'about' section
                if (key === 'about') {
                  // Use special DSATM component for DSATM project
                  if (project.name === 'DSATM') {
                    return (
                      <DSATMAboutSection 
                        key={key} 
                        section={section}
                      />
                    );
                  }
                  
                  return (
                    <AboutProgramSection 
                      key={key}
                      section={section}
                      technologies={project.technologies}
                    />
                  );
                }
                                // KeyOutcomesSection for 'impact'
                if (key === 'impact') {
                  return (
                    <ImpactSection
                      key={key}
                      section={section}
                    />
                  );
                }
                if (key === 'strategic_alignment') {
                  return (
                    <StratageticSection
                      key={key}
                      section={section}
                    />
                  );
                }
                if (key === 'conclusion') {
                  return (
                    <ConclusionSection
                      key={key}
                      section={section}
                    />
                  );
                }
                
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