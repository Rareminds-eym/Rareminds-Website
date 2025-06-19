import { useParams, Link } from "react-router-dom";
import { Badge } from "../Academy/Project/ui/badge";
import { Button } from "../ui/button";
import { 
  ArrowLeft, 
  Calendar, 
  Share2, 
  BookOpen, 
  Users, 
  Target, 
  Award, 
  TrendingUp, 
  CheckCircle, 
  Star,
  MapPin,
  Clock,
  GraduationCap,
  Building,
  Lightbulb,
  BarChart3,
  ArrowRight,
  PlayCircle,
  Download
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/supabaseClient";

interface ProjectPost {
  id: string;
  title: string;
  meta_description: string | null;
  featured_image: string | null;
  project_tags: string | null;
  slug: string | null;
  created_at: string;
  content_json: any;
  conclusion: string | null;
  videos_url: string[] | null;
}

const ProjectDetail = () => {
  const { projectId } = useParams();
  
  const { data: project, isLoading, error } = useQuery({
    queryKey: ['project_post', projectId],
    queryFn: async () => {
      if (!projectId) {
        throw new Error('No project ID provided');
      }
      
      let query = supabase
        .from('project_posts')
        .select('id, title, meta_description, featured_image, project_tags, slug, created_at, content_json, conclusion, videos_url');
      
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(projectId);
      
      if (isUUID) {
        query = query.eq('id', projectId);
      } else {
        query = query.eq('slug', projectId);
      }
      
      const { data, error } = await query.maybeSingle();
      
      if (error) {
        throw new Error(`Failed to fetch project: ${error.message}`);
      }
      
      if (!data) {
        throw new Error(`Project not found with identifier: ${projectId}`);
      }
      
      return data as ProjectPost;
    },
    enabled: !!projectId
  });

  // Function to render text with marks (bold, italic, etc.)
  const renderTextWithMarks = (textNode: any) => {
    if (!textNode.marks || textNode.marks.length === 0) {
      return textNode.text;
    }

    let element = textNode.text;
    textNode.marks.forEach((mark: any) => {
      if (mark.type === 'bold') {
        element = <strong key={`bold-${Math.random()}`} className="font-semibold text-gray-900">{element}</strong>;
      } else if (mark.type === 'italic') {
        element = <em key={`italic-${Math.random()}`} className="italic text-gray-800">{element}</em>;
      }
    });

    return element;
  };

  // Function to render content recursively
  const renderNode = (node: any, index: number) => {
    if (!node.type) return null;

    switch (node.type) {
      case 'heading':
        const HeadingTag = `h${node.attrs?.level || 3}` as keyof JSX.IntrinsicElements;
        const headingClasses = {
          1: 'text-3xl font-bold text-gray-900 mb-6 leading-tight',
          2: 'text-2xl font-bold text-gray-900 mb-5 leading-tight',
          3: 'text-xl font-semibold text-gray-900 mb-4 leading-tight',
          4: 'text-lg font-semibold text-gray-900 mb-3 leading-tight',
          5: 'text-base font-semibold text-gray-900 mb-3 leading-tight',
          6: 'text-sm font-semibold text-gray-900 mb-2 leading-tight'
        };
        
        return (
          <HeadingTag key={index} className={headingClasses[node.attrs?.level as keyof typeof headingClasses] || headingClasses[3]}>
            {node.content?.map((child: any, childIndex: number) => 
              child.type === 'text' ? <span key={childIndex}>{renderTextWithMarks(child)}</span> : null
            )}
          </HeadingTag>
        );

      case 'paragraph':
        if (!node.content || node.content.length === 0) {
          return <div key={index} className="mb-4"></div>;
        }
        return (
          <p key={index} className="mb-4 leading-relaxed text-gray-700">
            {node.content?.map((child: any, childIndex: number) => {
              if (child.type === 'text') {
                return <span key={childIndex}>{renderTextWithMarks(child)}</span>;
              } else if (child.type === 'hardBreak') {
                return <br key={childIndex} />;
              }
              return null;
            })}
          </p>
        );

      case 'orderedList':
        return (
          <ol key={index} className="list-decimal list-inside space-y-2 mb-6 ml-4">
            {node.content?.map((listItem: any, listIndex: number) => (
              <li key={listIndex} className="text-gray-700 leading-relaxed">
                {listItem.content?.map((paragraph: any, pIndex: number) => (
                  <div key={pIndex} className="inline">
                    {paragraph.content?.map((child: any, childIndex: number) => {
                      if (child.type === 'text') {
                        return <span key={childIndex}>{renderTextWithMarks(child)}</span>;
                      } else if (child.type === 'hardBreak') {
                        return <br key={childIndex} />;
                      }
                      return null;
                    })}
                  </div>
                ))}
              </li>
            ))}
          </ol>
        );

      case 'bulletList':
        return (
          <ul key={index} className="list-disc list-inside space-y-2 mb-6 ml-4">
            {node.content?.map((listItem: any, listIndex: number) => (
              <li key={listIndex} className="text-gray-700 leading-relaxed">
                {listItem.content?.map((paragraph: any, pIndex: number) => (
                  <div key={pIndex} className="inline">
                    {paragraph.content?.map((child: any, childIndex: number) => {
                      if (child.type === 'text') {
                        return <span key={childIndex}>{renderTextWithMarks(child)}</span>;
                      } else if (child.type === 'hardBreak') {
                        return <br key={childIndex} />;
                      }
                      return null;
                    })}
                  </div>
                ))}
              </li>
            ))}
          </ul>
        );

      case 'blockquote':
        return (
          <blockquote key={index} className="border-l-4 border-blue-500 pl-6 mb-6 italic text-gray-600 bg-gray-50 py-4 rounded-r-lg">
            {node.content?.map((child: any, childIndex: number) => renderNode(child, childIndex))}
          </blockquote>
        );

      case 'codeBlock':
        return (
          <pre key={index} className="bg-gray-900 text-green-400 p-4 rounded-lg mb-6 overflow-x-auto text-sm">
            <code>{node.content?.[0]?.text || ''}</code>
          </pre>
        );

      default:
        return null;
    }
  };

  // Function to render structured content from TipTap/ProseMirror JSON
  const renderStructuredContent = (contentJson: any) => {
    if (!contentJson) return null;

    let content = contentJson;
    if (typeof contentJson === 'string') {
      try {
        content = JSON.parse(contentJson);
      } catch (e) {
        return (
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">{contentJson}</p>
          </div>
        );
      }
    }

    // Handle different content structures
    if (content.content && Array.isArray(content.content)) {
      return content.content.map((node: any, index: number) => renderNode(node, index));
    } else if (Array.isArray(content)) {
      return content.map((node: any, index: number) => renderNode(node, index));
    } else if (content.type) {
      return renderNode(content, 0);
    } else {
      return (
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed">{String(content)}</p>
        </div>
      );
    }
  };

  // Function to extract sections from content
  const extractSections = (contentJson: any) => {
    if (!contentJson) return { sections: [], remainingContent: null };

    let content = contentJson;
    if (typeof contentJson === 'string') {
      try {
        content = JSON.parse(contentJson);
      } catch (e) {
        return { sections: [], remainingContent: contentJson };
      }
    }

    const sections = {
      introduction: [],
      aboutProgram: [],
      keyOutcomes: [],
      strategicAlignment: [],
      other: []
    };

    let currentSection = 'other';
    let allContent = [];

    if (content.content && Array.isArray(content.content)) {
      allContent = content.content;
    } else if (Array.isArray(content)) {
      allContent = content;
    } else if (content.type) {
      allContent = [content];
    }

    allContent.forEach((node: any) => {
      if (node.type === 'heading' && node.content && node.content[0]?.text) {
        const headingText = node.content[0].text.toLowerCase();
        
        if (headingText.includes('introduction') || headingText.includes('overview')) {
          currentSection = 'introduction';
        } else if (headingText.includes('about') && headingText.includes('program')) {
          currentSection = 'aboutProgram';
        } else if (headingText.includes('outcome') || headingText.includes('impact')) {
          currentSection = 'keyOutcomes';
        } else if (headingText.includes('strategic') && headingText.includes('alignment')) {
          currentSection = 'strategicAlignment';
        }
      }
      
      sections[currentSection as keyof typeof sections].push(node);
    });

    return sections;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100">
        <div className="text-center max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg">
          <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
            <BookOpen className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold mb-4 text-gray-900">
            {error ? 'Error Loading Project' : 'Project Not Found'}
          </h1>
          <p className="text-gray-600 mb-6">
            {error 
              ? `There was an error loading the project: ${error.message}`
              : 'The requested project could not be found.'
            }
          </p>
          <Link to="/school/new-projects">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Parse tags and extract sections
  const tags = project.project_tags 
    ? project.project_tags.split(',').map((tag: string) => tag.trim()).filter(Boolean)
    : [];

  const sections = extractSections(project.content_json);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link 
              to="/school/new-projects" 
              className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Projects
            </Link>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </nav>      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-5xl">
            {/* Institution Badge */}
            <div className="flex flex-wrap gap-3 mb-6">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2">
                <Building className="h-4 w-4 mr-2" />
                VELS University Training Program
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2">
                <Calendar className="h-4 w-4 mr-2" />
                {formatDate(project.created_at)}
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {project.title}
            </h1>

            {/* Description */}
            {project.meta_description && (
              <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-4xl">
                {project.meta_description}
              </p>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">200+</div>
                <div className="text-white/80 text-sm">Students Trained</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">95%</div>
                <div className="text-white/80 text-sm">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">5 Days</div>
                <div className="text-white/80 text-sm">Program Duration</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">24/7</div>
                <div className="text-white/80 text-sm">Support Access</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              {project.videos_url && project.videos_url.length > 0 && (
                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 shadow-lg">
                  <PlayCircle className="h-5 w-5 mr-2" />
                  Watch Program Video
                </Button>
              )}
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 shadow-lg">
                <GraduationCap className="h-5 w-5 mr-2" />
                Enroll Now
              </Button>
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-8">
                {tags.slice(0, 6).map((tag, index) => (
                  <Badge key={index} variant="outline" className="bg-white/10 text-white border-white/30 backdrop-blur-sm">
                    {tag}
                  </Badge>
                ))}
                {tags.length > 6 && (
                  <Badge variant="outline" className="bg-white/10 text-white border-white/30 backdrop-blur-sm">
                    +{tags.length - 6} more
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-16 -mt-8 relative z-10">
        
        {/* Introduction Section */}
        {sections.introduction.length > 0 && (
          <section className="mb-16">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8">
                <div className="flex items-center mb-4">
                  <div className="bg-white/20 p-3 rounded-xl mr-4">
                    <Lightbulb className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">Introduction</h2>
                </div>
                <p className="text-white/90 text-lg">Discover the foundation and vision behind this transformative training program</p>
              </div>
              <div className="p-8">
                <div className="prose prose-lg max-w-none">
                  {sections.introduction.map((node: any, index: number) => renderNode(node, index))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* About the Program Section */}
        {sections.aboutProgram.length > 0 && (
          <section className="mb-16">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-teal-600 p-8">
                <div className="flex items-center mb-4">
                  <div className="bg-white/20 p-3 rounded-xl mr-4">
                    <GraduationCap className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">About the Program</h2>
                </div>
                <p className="text-white/90 text-lg">Comprehensive details about the curriculum, methodology, and learning approach</p>
              </div>
              <div className="p-8">
                <div className="prose prose-lg max-w-none">
                  {sections.aboutProgram.map((node: any, index: number) => renderNode(node, index))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Key Outcomes & Impact Section */}
        {sections.keyOutcomes.length > 0 && (
          <section className="mb-16">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-600 to-red-600 p-8">
                <div className="flex items-center mb-4">
                  <div className="bg-white/20 p-3 rounded-xl mr-4">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">Key Outcomes & Impact</h2>
                </div>
                <p className="text-white/90 text-lg">Measurable results and transformational impact achieved through this program</p>
              </div>
              <div className="p-8">
                <div className="prose prose-lg max-w-none">
                  {sections.keyOutcomes.map((node: any, index: number) => renderNode(node, index))}
                </div>
                
                {/* Impact Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-200">
                  <div className="text-center bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">200+</div>
                    <div className="text-gray-600">Students Impacted</div>
                  </div>
                  
                  <div className="text-center bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-2xl">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="h-8 w-8 text-green-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">95%</div>
                    <div className="text-gray-600">Success Rate</div>
                  </div>
                  
                  <div className="text-center bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl">
                    <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="h-8 w-8 text-purple-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">100%</div>
                    <div className="text-gray-600">Completion Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Strategic Alignment Section */}
        {sections.strategicAlignment.length > 0 && (
          <section className="mb-16">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8">
                <div className="flex items-center mb-4">
                  <div className="bg-white/20 p-3 rounded-xl mr-4">
                    <BarChart3 className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">Strategic Alignment with VELS University Goals</h2>
                </div>
                <p className="text-white/90 text-lg">How this program aligns with institutional objectives and strategic vision</p>
              </div>
              <div className="p-8">
                <div className="prose prose-lg max-w-none">
                  {sections.strategicAlignment.map((node: any, index: number) => renderNode(node, index))}
                </div>
                
                {/* Alignment Points */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-gray-200">
                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-100 p-3 rounded-xl">
                      <CheckCircle className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Academic Excellence</h4>
                      <p className="text-gray-600 text-sm">Enhancing educational quality and student outcomes through innovative teaching methodologies</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-indigo-100 p-3 rounded-xl">
                      <CheckCircle className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Industry Integration</h4>
                      <p className="text-gray-600 text-sm">Bridging the gap between academic learning and industry requirements</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-xl">
                      <CheckCircle className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Faculty Development</h4>
                      <p className="text-gray-600 text-sm">Empowering educators with modern tools and teaching techniques</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-3 rounded-xl">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Innovation Culture</h4>
                      <p className="text-gray-600 text-sm">Fostering a culture of innovation and continuous improvement</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Additional Content */}
        {sections.other.length > 0 && (
          <section className="mb-16">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
              <div className="prose prose-lg max-w-none">
                {sections.other.map((node: any, index: number) => renderNode(node, index))}
              </div>
            </div>
          </section>
        )}

        {/* Conclusion */}
        {project.conclusion && (
          <section className="mb-16">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 text-white">
              <div className="flex items-center mb-6">
                <div className="bg-white/20 p-3 rounded-xl mr-4">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold">Key Takeaways</h3>
              </div>
              <p className="text-xl leading-relaxed text-white/90">
                {project.conclusion}
              </p>
            </div>
          </section>
        )}

        {/* Videos Section */}
        {project.videos_url && project.videos_url.length > 0 && (
          <section className="mb-16">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                <PlayCircle className="h-6 w-6 mr-3 text-blue-600" />
                Program Videos
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.videos_url.map((videoUrl: string, index: number) => (
                  <div key={index} className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center">
                    <Button variant="outline" className="h-auto p-4">
                      <PlayCircle className="h-6 w-6 mr-2" />
                      Watch Video {index + 1}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        
        <div className="relative max-w-4xl mx-auto text-center px-6">
          <div className="bg-white/10 p-4 rounded-full inline-block mb-6">
            <Building className="h-12 w-12 text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Institution?</h2>
          <p className="text-white/90 mb-8 text-xl leading-relaxed max-w-3xl mx-auto">
            Join hundreds of educational institutions that have already transformed their approach to learning with our comprehensive training programs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/school/new-projects">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg shadow-xl">
                <BookOpen className="h-5 w-5 mr-2" />
                Explore More Programs
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg shadow-xl">
              <ArrowRight className="h-5 w-5 mr-2" />
              Get Started Today
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <MapPin className="h-8 w-8 text-white/80 mx-auto mb-3" />
              <div className="text-lg font-semibold mb-1">Location</div>
              <div className="text-white/80">VELS University Campus</div>
            </div>
            <div>
              <Clock className="h-8 w-8 text-white/80 mx-auto mb-3" />
              <div className="text-lg font-semibold mb-1">Duration</div>
              <div className="text-white/80">5-Day Intensive Program</div>
            </div>
            <div>
              <Users className="h-8 w-8 text-white/80 mx-auto mb-3" />
              <div className="text-lg font-semibold mb-1">Participants</div>
              <div className="text-white/80">200+ Students & Faculty</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
