import { useParams, Link } from "react-router-dom";
import { Badge } from "../Academy/Project/ui/badge";
import { Button } from "../ui/button";
import { ArrowLeft, Calendar, Share2, BookOpen, Target, Sparkles, Play, AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/supabaseClient";
import { motion, useScroll, useTransform } from "framer-motion";

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
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 200]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const { data: project, isLoading, error } = useQuery({
    queryKey: ['project_post', projectId],
    queryFn: async () => {
      if (!projectId) {
        throw new Error('No project ID provided');
      }
      
      console.log('Fetching project details for:', projectId);
      
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
        console.error('Supabase error:', error);
        throw new Error(`Failed to fetch project: ${error.message}`);
      }
      
      if (!data) {
        throw new Error(`Project not found with identifier: ${projectId}`);
      }
      
      console.log('Successfully fetched project from Supabase:', data);
      return data as ProjectPost;
    },
    enabled: !!projectId,
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Enhanced content rendering function - ensures consistent design regardless of content
  const renderStructuredContent = (contentJson: any) => {
    if (!contentJson) {
      console.log('No content_json provided');
      return (
        <motion.div 
          className="text-center py-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-6" />
          </motion.div>
          <p className="text-gray-500 text-xl font-light">Content will be displayed here when available.</p>
        </motion.div>
      );
    }

    let content = contentJson;
    if (typeof contentJson === 'string') {
      console.log('Content is string, attempting to parse...');
      try {
        content = JSON.parse(contentJson);
        console.log('Successfully parsed JSON content');
      } catch (e) {
        console.log('Failed to parse JSON, treating as plain text');
        return (
          <motion.div 
            className="prose prose-xl max-w-none"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-lg leading-8 text-gray-700">{contentJson}</p>
          </motion.div>
        );
      }
    }

    const renderTextWithMarks = (textNode: any) => {
      if (!textNode?.text) return '';
      
      if (!textNode.marks || textNode.marks.length === 0) {
        return textNode.text;
      }

      let element = textNode.text;
      textNode.marks.forEach((mark: any) => {
        if (mark.type === 'bold') {
          element = <strong className="font-semibold text-gray-900">{element}</strong>;
        } else if (mark.type === 'italic') {
          element = <em className="italic text-gray-700">{element}</em>;
        }
      });
      return element;
    };

    const renderNode = (node: any, index: number) => {
      if (!node?.type) return null;

      // Consistent animation delay pattern
      const animationDelay = index * 0.1;

      switch (node.type) {
        case 'heading':
          const level = node.attrs?.level || 3;
          const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
          const headingClasses = {
            1: 'text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 mb-12 mt-20 leading-tight',
            2: 'text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-8 mt-16 leading-tight',
            3: 'text-4xl font-bold text-gray-900 mb-6 mt-12 leading-tight relative before:absolute before:-left-6 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-blue-500 before:to-purple-500 before:rounded-full pl-8',
            4: 'text-3xl font-semibold text-gray-800 mb-5 mt-10 leading-tight',
            5: 'text-2xl font-semibold text-gray-800 mb-4 mt-8 leading-tight',
            6: 'text-xl font-semibold text-gray-800 mb-3 mt-6 leading-tight'
          };
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: animationDelay }}
              viewport={{ once: true }}
            >
              <HeadingTag className={headingClasses[level as keyof typeof headingClasses] || headingClasses[3]}>
                {node.content?.map((child: any, childIndex: number) => 
                  child.type === 'text' ? 
                    <span key={childIndex}>{renderTextWithMarks(child)}</span> : 
                    child.text || ''
                )}
              </HeadingTag>
            </motion.div>
          );

        case 'paragraph':
          // Always render paragraph container for consistent spacing
          return (
            <motion.p 
              key={index} 
              className="mb-8 leading-9 text-gray-700 text-lg relative z-10 min-h-[2rem]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: animationDelay }}
              viewport={{ once: true }}
            >
              {node.content?.length ? (
                node.content.map((child: any, childIndex: number) => {
                  if (child.type === 'text') {
                    return <span key={childIndex}>{renderTextWithMarks(child)}</span>;
                  } else if (child.type === 'hardBreak') {
                    return <br key={childIndex} />;
                  }
                  return null;
                })
              ) : (
                // Empty paragraph gets consistent spacing
                <span className="opacity-0">.</span>
              )}
            </motion.p>
          );

        case 'orderedList':
          return (
            <motion.div 
              key={index} 
              className="mb-12 relative min-h-[8rem]"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: animationDelay }}
              viewport={{ once: true }}
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-3xl opacity-60 blur-xl"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
                <div className="absolute top-6 left-6 w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                <ol className="list-decimal list-inside space-y-6 text-lg pl-6">
                  {node.content?.length ? (
                    node.content.map((listItem: any, listIndex: number) => (
                      <motion.li 
                        key={listIndex} 
                        className="text-gray-700 leading-8 relative min-h-[2rem]"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: listIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <span className="ml-4 relative">
                          {listItem.content?.map((paragraph: any, pIndex: number) => (
                            <span key={pIndex}>
                              {paragraph.content?.map((child: any, childIndex: number) => {
                                if (child.type === 'text') {
                                  return <span key={childIndex}>{renderTextWithMarks(child)}</span>;
                                } else if (child.type === 'hardBreak') {
                                  return <br key={childIndex} />;
                                }
                                return null;
                              }) || 'List item'}
                            </span>
                          )) || 'List item content'}
                        </span>
                      </motion.li>
                    ))
                  ) : (
                    <li className="text-gray-500 italic">No list items available</li>
                  )}
                </ol>
              </div>
            </motion.div>
          );

        case 'bulletList':
          return (
            <motion.div 
              key={index} 
              className="mb-12 relative min-h-[8rem]"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: animationDelay }}
              viewport={{ once: true }}
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 rounded-3xl opacity-60 blur-xl"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
                <div className="absolute top-6 left-6 w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
                <ul className="space-y-6 text-lg pl-6">
                  {node.content?.length ? (
                    node.content.map((listItem: any, listIndex: number) => (
                      <motion.li 
                        key={listIndex} 
                        className="text-gray-700 leading-8 flex items-start relative min-h-[2rem]"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: listIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <motion.span 
                          className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mt-3 mr-4 flex-shrink-0"
                          animate={{ 
                            scale: [1, 1.2, 1],
                            rotate: [0, 180, 360]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            delay: listIndex * 0.2
                          }}
                        ></motion.span>
                        <span>
                          {listItem.content?.map((paragraph: any, pIndex: number) => (
                            <span key={pIndex}>
                              {paragraph.content?.map((child: any, childIndex: number) => {
                                if (child.type === 'text') {
                                  return <span key={childIndex}>{renderTextWithMarks(child)}</span>;
                                } else if (child.type === 'hardBreak') {
                                  return <br key={childIndex} />;
                                }
                                return null;
                              }) || 'List item'}
                            </span>
                          )) || 'List item content'}
                        </span>
                      </motion.li>
                    ))
                  ) : (
                    <li className="text-gray-500 italic flex items-start">
                      <span className="w-2 h-2 bg-gray-300 rounded-full mt-3 mr-4 flex-shrink-0"></span>
                      <span>No list items available</span>
                    </li>
                  )}
                </ul>
              </div>
            </motion.div>
          );

        default:
          // Unknown node types get consistent treatment
          console.log('Unknown node type:', node.type);
          return (
            <motion.div
              key={index}
              className="mb-8 p-4 bg-gray-50 rounded-lg border-l-4 border-gray-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: animationDelay }}
              viewport={{ once: true }}
            >
              <p className="text-gray-600 italic">Unsupported content type: {node.type}</p>
            </motion.div>
          );
      }
    };

    // Handle different content structures consistently
    let contentNodes = [];
    
    if (content.content && Array.isArray(content.content)) {
      contentNodes = content.content;
    } else if (Array.isArray(content)) {
      contentNodes = content;
    } else if (content.type) {
      contentNodes = [content];
    } else {
      // Fallback for unknown formats
      return (
        <motion.div 
          className="prose prose-xl max-w-none p-8 bg-gray-50 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-700 leading-8 text-lg">{String(content)}</p>
        </motion.div>
      );
    }

    // Always ensure minimum content structure for consistent design
    if (contentNodes.length === 0) {
      return (
        <motion.div 
          className="text-center py-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-6" />
          </motion.div>
          <p className="text-gray-500 text-xl font-light">Content structure is being processed...</p>
        </motion.div>
      );
    }

    return contentNodes.map((node: any, index: number) => renderNode(node, index));
  };

  // Consistent helper functions
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'Date not available';
    }
  };

  const parseTags = (tagString: string | null) => {
    if (!tagString) return [];
    try {
      return tagString.split(',').map(tag => tag.trim()).filter(Boolean);
    } catch (error) {
      return [];
    }
  };

  // Loading state with consistent design
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, -30, 0]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"
            animate={{ 
              scale: [1.2, 1, 1.2],
              x: [0, -30, 0],
              y: [0, 50, 0]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>
        
        <div className="flex items-center justify-center min-h-screen relative z-10">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="relative mb-8"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto"></div>
              <motion.div 
                className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-purple-400 rounded-full mx-auto"
                animate={{ rotate: -360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
            <motion.p 
              className="text-gray-700 text-xl font-medium"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Loading amazing content...
            </motion.p>
          </motion.div>
        </div>
      </div>
    );
  }

  // Error state with consistent design
  if (error || !project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center">
        <motion.div 
          className="text-center max-w-md mx-auto p-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <BookOpen className="w-8 h-8 text-red-600" />
          </motion.div>
          <h1 className="text-3xl font-bold mb-4 text-gray-900">
            {error ? 'Error Loading Project' : 'Project Not Found'}
          </h1>
          <p className="text-gray-600 mb-6 text-lg">
            {error 
              ? `There was an error loading the project: ${error.message}`
              : 'The requested project could not be found.'
            }
          </p>
          <Link to="/school/new-projects">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  // Safely extract data with fallbacks
  const tags = parseTags(project.project_tags);
  const title = project.title || 'Untitled Project';
  const description = project.meta_description || '';
  const createdAt = project.created_at || new Date().toISOString();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Floating background elements */}
      <motion.div 
        className="absolute top-20 left-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"
        animate={{ 
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 15, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"
        animate={{ 
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1.1, 1, 1.1]
        }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      {/* Navigation Bar - Always consistent */}
      <motion.nav 
        className="bg-white/70 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 shadow-lg"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <motion.div
            whileHover={{ x: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link 
              to="/school/new-projects" 
              className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Projects</span>
            </Link>
          </motion.div>
        </div>
      </motion.nav>

      {/* Hero Section - Consistent regardless of data */}
      <section className="relative py-32 overflow-hidden min-h-[60vh]">
        {/* Animated background */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800"
          style={{ y: y1 }}
        >
          {/* Background Image - handles missing images gracefully */}
          {project.featured_image && (
            <motion.div 
              className="absolute inset-0"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5 }}
            >
              <img 
                src={project.featured_image} 
                alt={title}
                className="w-full h-full object-cover opacity-20"
                onError={(e) => {
                  // Hide broken images gracefully
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-800/90"></div>
            </motion.div>
          )}
          
          {/* Animated particles - always present */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, -100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>

        <motion.div 
          className="relative max-w-6xl mx-auto px-6 text-center z-10"
          style={{ opacity }}
        >
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Tags and Date - always show container for consistency */}
            <div className="flex flex-wrap justify-center gap-4 mb-8 min-h-[3rem]">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-6 py-3 text-base">
                  <Calendar className="w-5 h-5 mr-2" />
                  {formatDate(createdAt)}
                </Badge>
              </motion.div>
              {tags.length > 0 ? (
                tags.slice(0, 3).map((tag, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2">
                      {tag}
                    </Badge>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Badge className="bg-white/10 text-white/70 border-white/20 backdrop-blur-sm px-4 py-2">
                    General Project
                  </Badge>
                </motion.div>
              )}
            </div>
          </motion.div>
          
          {/* Title - always present */}
          <motion.h1 
            className="text-6xl md:text-7xl font-black mb-8 text-white leading-tight min-h-[8rem] flex items-center justify-center"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <span className="inline-block transform hover:scale-105 transition-transform duration-300 text-center">
              {title}
            </span>
          </motion.h1>
          
          {/* Description - always show container */}
          <div className="min-h-[6rem] flex items-center justify-center">
            {description ? (
              <motion.p 
                className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed font-light mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {description}
              </motion.p>
            ) : (
              <motion.p 
                className="text-xl md:text-2xl text-blue-200/70 max-w-4xl mx-auto leading-relaxed font-light mb-12 italic"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Detailed project information and insights
              </motion.p>
            )}
          </div>

          {/* Action Buttons - always present */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg rounded-full shadow-2xl">
                <Share2 className="w-5 h-5 mr-2" />
                Share Project
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-full backdrop-blur-sm">
                <BookOpen className="w-5 h-5 mr-2" />
                Download Report
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Main Content - Always consistent structure */}
      <main className="relative max-w-6xl mx-auto px-6 py-20 min-h-[50vh]">
        <motion.div 
          className="relative z-10"
          style={{ y: y2 }}
        >
          <motion.div 
            className="prose prose-xl max-w-none relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            {/* Floating decorative elements - always present */}
            <motion.div
              className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-xl"
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [360, 180, 0]
              }}
              transition={{ duration: 10, repeat: Infinity }}
            />
            
            <div className="relative backdrop-blur-sm bg-white/60 rounded-3xl p-12 shadow-2xl border border-white/30 min-h-[40vh]">
              {renderStructuredContent(project.content_json)}
            </div>
          </motion.div>
        </motion.div>

        {/* Conclusion Section - Always show if content exists */}
        {project.conclusion && (
          <motion.section 
            className="mt-20 relative"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Dynamic background shapes */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full blur-2xl"
                animate={{
                  x: [0, 50, 0],
                  y: [0, -30, 0],
                  scale: [1, 1.3, 1]
                }}
                transition={{ duration: 6, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-20 -right-20 w-60 h-60 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl"
                animate={{
                  x: [0, -40, 0],
                  y: [0, 40, 0],
                  scale: [1.2, 1, 1.2]
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />            </div>
            
            {/* Modern Hexagonal Design with Interactive Elements */}
            <div className="relative">
              {/* Floating geometric shapes */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  className="absolute top-1/4 left-1/4 w-24 h-24 border-4 border-emerald-400/30 rounded-lg rotate-45"
                  animate={{ 
                    rotate: [45, 225, 45],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                />
                <motion.div
                  className="absolute top-3/4 right-1/4 w-16 h-16 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full"
                  animate={{ 
                    y: [0, -30, 0],
                    x: [0, 20, 0]
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                  className="absolute top-1/2 right-1/3 w-8 h-8 bg-blue-400/40 transform rotate-45"
                  animate={{ 
                    rotate: [45, 405, 45],
                    scale: [1, 1.5, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </div>

              {/* Main Content Container with Hexagonal Clips */}
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden" 
                   style={{
                     clipPath: 'polygon(0 15%, 15% 0, 85% 0, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0 85%)'
                   }}>
                
                {/* Animated gradient overlay */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-indigo-600/90 via-purple-700/90 to-pink-600/90"
                  animate={{
                    background: [
                      'linear-gradient(135deg, rgba(79, 70, 229, 0.9) 0%, rgba(126, 34, 206, 0.9) 50%, rgba(219, 39, 119, 0.9) 100%)',
                      'linear-gradient(135deg, rgba(126, 34, 206, 0.9) 0%, rgba(219, 39, 119, 0.9) 50%, rgba(79, 70, 229, 0.9) 100%)',
                      'linear-gradient(135deg, rgba(219, 39, 119, 0.9) 0%, rgba(79, 70, 229, 0.9) 50%, rgba(126, 34, 206, 0.9) 100%)'
                    ]
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                />

                <div className="relative p-12 lg:p-16">
                  {/* Header with Icon Animation */}
                  <motion.div 
                    className="flex items-center justify-center mb-12"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="relative">
                      <motion.div
                        className="absolute -inset-4 bg-white/20 rounded-full blur-xl"
                        animate={{ 
                          scale: [1, 1.3, 1],
                          opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                      <motion.div
                        className="relative bg-white/10 p-6 rounded-full border border-white/30"
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Target className="w-12 h-12 text-white drop-shadow-lg" />
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Title with Staggered Letter Animation */}
                  <motion.div 
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <motion.h3 
                      className="text-5xl lg:text-6xl font-black text-white mb-4 leading-tight"
                      style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
                    >
                      {"Key Outcomes & Impact".split("").map((char, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, y: 50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ 
                            duration: 0.3, 
                            delay: index * 0.05,
                            type: "spring",
                            bounce: 0.4
                          }}
                          viewport={{ once: true }}
                          className="inline-block"
                        >
                          {char === " " ? "\u00A0" : char}
                        </motion.span>
                      ))}
                    </motion.h3>
                  </motion.div>

                  {/* Content with Creative Layout */}
                  <motion.div
                    className="max-w-4xl mx-auto"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    {/* Decorative quotation marks */}
                    <div className="relative">
                      <motion.div
                        className="absolute -top-4 -left-4 text-6xl text-white/30 font-bold"
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        "
                      </motion.div>
                      <motion.div
                        className="absolute -bottom-4 -right-4 text-6xl text-white/30 font-bold rotate-180"
                        animate={{ rotate: [180, 185, 175, 180] }}
                        transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                      >
                        "
                      </motion.div>

                      <motion.div 
                        className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/30"
                        whileHover={{ scale: 1.02, y: -5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.p 
                          className="text-xl lg:text-2xl leading-relaxed text-white font-light text-center"
                          style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 1, delay: 0.5 }}
                          viewport={{ once: true }}
                        >
                          {project.conclusion}
                        </motion.p>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Interactive Accent Elements */}
                  <div className="mt-12 flex justify-center space-x-8">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-3 h-3 bg-white/40 rounded-full"
                        animate={{ 
                          scale: [1, 1.5, 1],
                          opacity: [0.4, 1, 0.4]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                        whileHover={{ scale: 2, backgroundColor: 'rgba(255,255,255,0.8)' }}
                      />
                    ))}
                  </div>

                  {/* Bottom decorative wave */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                    animate={{ 
                      x: ['-100%', '100%'],
                      opacity: [0, 1, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Videos Section - Always show consistent structure */}
        {project.videos_url && project.videos_url.length > 0 && (
          <motion.section 
            className="mt-20 relative"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Floating background decorations */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-red-400/20 to-orange-400/20 rounded-full blur-2xl"
                animate={{
                  x: [0, 60, 0],
                  y: [0, -40, 0],
                  scale: [1, 1.4, 1]
                }}
                transition={{ duration: 7, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-10 right-10 w-48 h-48 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-2xl"
                animate={{
                  x: [0, -50, 0],
                  y: [0, 30, 0],
                  scale: [1.3, 1, 1.3]
                }}
                transition={{ duration: 9, repeat: Infinity }}
              />
            </div>

            <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/30">
              <motion.h3 
                className="text-4xl font-black mb-12 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 flex items-center"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Play className="w-10 h-10 mr-4 text-red-500" />
                </motion.div>
                Project Videos
              </motion.h3>
              
              <div className="grid gap-8 md:grid-cols-2">
                {project.videos_url.map((videoUrl, index) => (
                  <motion.div 
                    key={index} 
                    className="group relative"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="absolute -inset-2 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                    <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-xl">
                      <iframe
                        src={videoUrl}
                        className="w-full h-full"
                        frameBorder="0"
                        allowFullScreen
                        title={`${title} - Video ${index + 1}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>        )}

        {/* Project Impact Statistics - Modern Design */}
        <motion.section 
          className="mt-20 relative"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Background decorations */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-10 left-1/4 w-64 h-64 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl"
              animate={{
                x: [0, 80, 0],
                y: [0, -40, 0],
                scale: [1, 1.3, 1]
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-10 right-1/4 w-80 h-80 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-3xl"
              animate={{
                x: [0, -60, 0],
                y: [0, 50, 0],
                scale: [1.2, 1, 1.2]
              }}
              transition={{ duration: 10, repeat: Infinity }}
            />
          </div>

          <div className="relative max-w-7xl mx-auto px-6">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600">
                Project Impact & Results
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Measurable outcomes and transformative results from our comprehensive training program
              </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Statistic 1 - Students Trained */}
              <motion.div
                className="group relative"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-white/40 shadow-xl">
                  <div className="text-center">
                    <motion.div
                      className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 mb-4"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      100+
                    </motion.div>
                    <h3 className="text-lg font-bold text-gray-800 mb-3">Students Trained</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Trained through immersive bootcamp sessions combining technical depth and collaborative learning
                    </p>
                  </div>
                  <div className="mt-6 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Statistic 2 - Web Applications Built */}
              <motion.div
                className="group relative"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-white/40 shadow-xl">
                  <div className="text-center">
                    <motion.div
                      className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                    >
                      70%
                    </motion.div>
                    <h3 className="text-lg font-bold text-gray-800 mb-3">Built Web Applications</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Of students built fully functional web applications from scratch
                    </p>
                  </div>
                  <div className="mt-6 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: "70%" }}
                      transition={{ duration: 1.5, delay: 0.7 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Statistic 3 - Active Participation */}
              <motion.div
                className="group relative"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-white/40 shadow-xl">
                  <div className="text-center">
                    <motion.div
                      className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                    >
                      90%
                    </motion.div>
                    <h3 className="text-lg font-bold text-gray-800 mb-3">Active Participation</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Actively participated in hands-on coding exercises and real-time problem-solving
                    </p>
                  </div>
                  <div className="mt-6 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: "90%" }}
                      transition={{ duration: 1.5, delay: 0.9 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Statistic 4 - Confidence in Development */}
              <motion.div
                className="group relative"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-white/40 shadow-xl">
                  <div className="text-center">
                    <motion.div
                      className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 mb-4"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.9 }}
                    >
                      100%
                    </motion.div>
                    <h3 className="text-lg font-bold text-gray-800 mb-3">Development Confidence</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Expressed confidence in building, securing, and deploying full-stack web applications
                    </p>
                  </div>
                  <div className="mt-6 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-orange-500 to-red-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1.5, delay: 1.1 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Statistic 5 - Critical Thinking Skills */}
              <motion.div
                className="group relative"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 via-green-500 to-emerald-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-white/40 shadow-xl">
                  <div className="text-center">
                    <motion.div
                      className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600 mb-4"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
                    >
                      85%
                    </motion.div>
                    <h3 className="text-lg font-bold text-gray-800 mb-3">Critical Thinking</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Reported improved critical thinking and collaboration skills applicable across settings
                    </p>
                  </div>
                  <div className="mt-6 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-teal-500 to-emerald-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: "85%" }}
                      transition={{ duration: 1.5, delay: 1.3 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Statistic 6 - Communication Growth */}
              <motion.div
                className="group relative"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-white/40 shadow-xl">
                  <div className="text-center">
                    <motion.div
                      className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 mb-4"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                    >
                      92%
                    </motion.div>
                    <h3 className="text-lg font-bold text-gray-800 mb-3">Communication Growth</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Experienced growth in communication and teamwork through pair programming and group challenges
                    </p>
                  </div>
                  <div className="mt-6 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: "92%" }}
                      transition={{ duration: 1.5, delay: 1.5 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Statistic 7 - Technical Articulation */}
              <motion.div
                className="group relative md:col-span-2 lg:col-span-3"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.01 }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-xl p-12 border border-white/40 shadow-xl">
                  <div className="text-center max-w-4xl mx-auto">
                    <motion.div
                      className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600 mb-6"
                      animate={{ scale: [1, 1.03, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1.8 }}
                    >
                      88%
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Technical Communication Masters</h3>
                    <p className="text-xl text-gray-600 leading-relaxed mb-8">
                      Said they could now clearly articulate technical ideas, preparing them for interviews and presentations
                    </p>
                    <div className="max-w-2xl mx-auto">
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                          initial={{ width: 0 }}
                          whileInView={{ width: "88%" }}
                          transition={{ duration: 2, delay: 1.7 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Summary Banner */}
            <motion.div
              className="mt-16 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-12 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <motion.div
                  className="relative text-white"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <h3 className="text-3xl font-black mb-4">
                    🚀 Transforming Futures Through Technology Education
                  </h3>
                  <p className="text-xl opacity-90 max-w-3xl mx-auto">
                    Our comprehensive bootcamp program delivers measurable results, empowering students with both technical expertise and essential soft skills for professional success.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* More Projects CTA - Always present and consistent */}
        <motion.section 
          className="mt-24 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          {/* Dynamic background shapes */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-br from-blue-400/30 to-indigo-400/30 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 120, 240, 360],
                x: [0, 50, -50, 0]
              }}
              transition={{ duration: 20, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [360, 240, 120, 0],
                x: [0, -60, 60, 0]
              }}
              transition={{ duration: 25, repeat: Infinity }}
            />
          </div>

          <div className="relative bg-white/40 backdrop-blur-2xl rounded-3xl p-16 shadow-2xl border border-white/40 max-w-4xl mx-auto">
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Sparkles className="w-16 h-16 text-blue-600 mx-auto mb-8" />
            </motion.div>
            
            <motion.h2 
              className="text-5xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Explore More Projects
            </motion.h2>
            
            <motion.p 
              className="text-gray-700 mb-12 text-xl leading-relaxed max-w-2xl mx-auto"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Discover how we're creating impact across different sectors and regions with innovative solutions and transformative initiatives.
            </motion.p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/school/new-projects">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-6 text-xl rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 group">
                  View All Projects
                  <motion.div
                    className="ml-3"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ArrowLeft className="w-6 h-6 rotate-180 group-hover:translate-x-1 transition-transform" />
                  </motion.div>
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default ProjectDetail;
//   const renderStructuredContent = (contentJson: any) => {
//     if (!contentJson) {
//       console.log('No content_json provided');
//       return null;
//     }

//     let content = contentJson;
//     if (typeof contentJson === 'string') {
//       console.log('Content is string, attempting to parse...');
//       try {
//         content = JSON.parse(contentJson);
//         console.log('Successfully parsed JSON content');
//       } catch (e) {
//         console.log('Failed to parse JSON, treating as plain text');
//         return <div className="prose prose-xl max-w-none">{contentJson}</div>;
//       }
//     }

//     const renderTextWithMarks = (textNode: any) => {
//       if (!textNode.marks || textNode.marks.length === 0) {
//         return textNode.text;
//       }

//       let element = textNode.text;
//       textNode.marks.forEach((mark: any) => {
//         if (mark.type === 'bold') {
//           element = <strong className="font-semibold text-gray-900">{element}</strong>;
//         } else if (mark.type === 'italic') {
//           element = <em className="italic text-gray-700">{element}</em>;
//         }
//       });
//       return element;
//     };

//     const renderNode = (node: any, index: number) => {
//       if (!node.type) return null;

//       switch (node.type) {        case 'heading':
//           const level = node.attrs?.level || 3;
//           const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
//           const headingClasses = {
//             1: 'text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 mb-12 mt-20 leading-tight',
//             2: 'text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-8 mt-16 leading-tight',
//             3: 'text-4xl font-bold text-gray-900 mb-6 mt-12 leading-tight relative before:absolute before:-left-6 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-blue-500 before:to-purple-500 before:rounded-full pl-8',
//             4: 'text-3xl font-semibold text-gray-800 mb-5 mt-10 leading-tight',
//             5: 'text-2xl font-semibold text-gray-800 mb-4 mt-8 leading-tight',
//             6: 'text-xl font-semibold text-gray-800 mb-3 mt-6 leading-tight'
//           };
          
//           return (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: index * 0.1 }}
//               viewport={{ once: true }}
//             >
//               <HeadingTag className={headingClasses[level as keyof typeof headingClasses] || headingClasses[3]}>
//                 {node.content?.map((child: any, childIndex: number) => 
//                   child.type === 'text' ? 
//                     <span key={childIndex}>{renderTextWithMarks(child)}</span> : 
//                     null
//                 )}
//               </HeadingTag>
//             </motion.div>
//           );        case 'paragraph':
//           if (!node.content || node.content.length === 0) {
//             return <div key={index} className="mb-8"></div>;
//           }
//           return (
//             <motion.p 
//               key={index} 
//               className="mb-8 leading-9 text-gray-700 text-lg relative z-10"
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.05 }}
//               viewport={{ once: true }}
//             >
//               {node.content?.map((child: any, childIndex: number) => {
//                 if (child.type === 'text') {
//                   return <span key={childIndex}>{renderTextWithMarks(child)}</span>;
//                 } else if (child.type === 'hardBreak') {
//                   return <br key={childIndex} />;
//                 }
//                 return null;
//               })}
//             </motion.p>
//           );        case 'orderedList':
//           return (
//             <motion.div 
//               key={index} 
//               className="mb-12 relative"
//               initial={{ opacity: 0, x: -50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6, delay: index * 0.1 }}
//               viewport={{ once: true }}
//             >
//               <div className="absolute -inset-4 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-3xl opacity-60 blur-xl"></div>
//               <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
//                 <div className="absolute top-6 left-6 w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
//                 <ol className="list-decimal list-inside space-y-6 text-lg pl-6">
//                   {node.content?.map((listItem: any, listIndex: number) => (
//                     <motion.li 
//                       key={listIndex} 
//                       className="text-gray-700 leading-8 relative"
//                       initial={{ opacity: 0, y: 20 }}
//                       whileInView={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.4, delay: listIndex * 0.1 }}
//                       viewport={{ once: true }}
//                     >
//                       <span className="ml-4 relative">
//                         {listItem.content?.map((paragraph: any, pIndex: number) => (
//                           <span key={pIndex}>
//                             {paragraph.content?.map((child: any, childIndex: number) => {
//                               if (child.type === 'text') {
//                                 return <span key={childIndex}>{renderTextWithMarks(child)}</span>;
//                               } else if (child.type === 'hardBreak') {
//                                 return <br key={childIndex} />;
//                               }
//                               return null;
//                             })}
//                           </span>
//                         ))}
//                       </span>
//                     </motion.li>
//                   ))}
//                 </ol>
//               </div>
//             </motion.div>
//           );        case 'bulletList':
//           return (
//             <motion.div 
//               key={index} 
//               className="mb-12 relative"
//               initial={{ opacity: 0, x: 50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6, delay: index * 0.1 }}
//               viewport={{ once: true }}
//             >
//               <div className="absolute -inset-4 bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 rounded-3xl opacity-60 blur-xl"></div>
//               <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
//                 <div className="absolute top-6 left-6 w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
//                 <ul className="space-y-6 text-lg pl-6">
//                   {node.content?.map((listItem: any, listIndex: number) => (
//                     <motion.li 
//                       key={listIndex} 
//                       className="text-gray-700 leading-8 flex items-start relative"
//                       initial={{ opacity: 0, scale: 0.8 }}
//                       whileInView={{ opacity: 1, scale: 1 }}
//                       transition={{ duration: 0.4, delay: listIndex * 0.1 }}
//                       viewport={{ once: true }}
//                     >
//                       <motion.span 
//                         className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mt-3 mr-4 flex-shrink-0"
//                         animate={{ 
//                           scale: [1, 1.2, 1],
//                           rotate: [0, 180, 360]
//                         }}
//                         transition={{ 
//                           duration: 2,
//                           repeat: Infinity,
//                           delay: listIndex * 0.2
//                         }}
//                       ></motion.span>
//                       <span>
//                         {listItem.content?.map((paragraph: any, pIndex: number) => (
//                           <span key={pIndex}>
//                             {paragraph.content?.map((child: any, childIndex: number) => {
//                               if (child.type === 'text') {
//                                 return <span key={childIndex}>{renderTextWithMarks(child)}</span>;
//                               } else if (child.type === 'hardBreak') {
//                                 return <br key={childIndex} />;
//                               }
//                               return null;
//                             })}
//                           </span>
//                         ))}
//                       </span>
//                     </motion.li>
//                   ))}
//                 </ul>
//               </div>
//             </motion.div>
//           );

//         default:
//           console.log('Unknown node type:', node.type);
//           return null;
//       }
//     };

//     // Handle different content structures from Supabase
//     if (content.content && Array.isArray(content.content)) {
//       // Standard ProseMirror/TipTap format
//       console.log('Rendering ProseMirror format with', content.content.length, 'nodes');
//       return content.content.map((node: any, index: number) => renderNode(node, index));
//     } else if (Array.isArray(content)) {
//       // Direct array of content nodes
//       console.log('Rendering direct array format with', content.length, 'nodes');
//       return content.map((node: any, index: number) => renderNode(node, index));
//     } else if (content.type) {
//       // Single node
//       console.log('Rendering single node:', content.type);
//       return renderNode(content, 0);
//     } else {
//       // Fallback for other formats
//       console.log('Unknown content format, rendering as string');
//       return <p className="text-gray-700 leading-8 text-lg">{String(content)}</p>;
//     }
//   };
//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 relative overflow-hidden">
//         {/* Animated background elements */}
//         <div className="absolute inset-0">
//           <motion.div 
//             className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"
//             animate={{ 
//               scale: [1, 1.2, 1],
//               x: [0, 50, 0],
//               y: [0, -30, 0]
//             }}
//             transition={{ duration: 8, repeat: Infinity }}
//           />
//           <motion.div 
//             className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"
//             animate={{ 
//               scale: [1.2, 1, 1.2],
//               x: [0, -30, 0],
//               y: [0, 50, 0]
//             }}
//             transition={{ duration: 10, repeat: Infinity }}
//           />
//         </div>
        
//         <div className="flex items-center justify-center min-h-screen relative z-10">
//           <motion.div 
//             className="text-center"
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             <motion.div 
//               className="relative mb-8"
//               animate={{ rotate: 360 }}
//               transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//             >
//               <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto"></div>
//               <motion.div 
//                 className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-purple-400 rounded-full mx-auto"
//                 animate={{ rotate: -360 }}
//                 transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
//               />
//             </motion.div>
//             <motion.p 
//               className="text-gray-700 text-xl font-medium"
//               animate={{ opacity: [0.5, 1, 0.5] }}
//               transition={{ duration: 2, repeat: Infinity }}
//             >
//               Loading amazing content...
//             </motion.p>
//           </motion.div>
//         </div>
//       </div>
//     );
//   }

//   if (error || !project) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center">
//         <div className="text-center max-w-md mx-auto p-8">
//           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
//             <BookOpen className="w-8 h-8 text-red-600" />
//           </div>
//           <h1 className="text-3xl font-bold mb-4 text-gray-900">
//             {error ? 'Error Loading Project' : 'Project Not Found'}
//           </h1>
//           <p className="text-gray-600 mb-6 text-lg">
//             {error 
//               ? `There was an error loading the project: ${error.message}`
//               : 'The requested project could not be found.'
//             }
//           </p>
//           <Link to="/school/new-projects">
//             <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3">
//               <ArrowLeft className="w-4 h-4 mr-2" />
//               Back to Projects
//             </Button>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const tags = project.project_tags 
//     ? project.project_tags.split(',').map(tag => tag.trim()).filter(Boolean)
//     : [];

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
//       {/* Floating background elements */}
//       <motion.div 
//         className="absolute top-20 left-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"
//         animate={{ 
//           x: [0, 100, 0],
//           y: [0, -50, 0],
//           scale: [1, 1.1, 1]
//         }}
//         transition={{ duration: 15, repeat: Infinity }}
//       />
//       <motion.div 
//         className="absolute bottom-20 right-10 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"
//         animate={{ 
//           x: [0, -80, 0],
//           y: [0, 60, 0],
//           scale: [1.1, 1, 1.1]
//         }}
//         transition={{ duration: 12, repeat: Infinity }}
//       />

//       {/* Navigation Bar */}
//       <motion.nav 
//         className="bg-white/70 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 shadow-lg"
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <motion.div
//             whileHover={{ x: -5 }}
//             transition={{ type: "spring", stiffness: 300 }}
//           >
//             <Link 
//               to="/school/new-projects" 
//               className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors group"
//             >
//               <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
//               <span className="font-medium">Back to Projects</span>
//             </Link>
//           </motion.div>
//         </div>
//       </motion.nav>

//       {/* Hero Section */}
//       <section className="relative py-32 overflow-hidden">
//         {/* Animated background */}
//         <motion.div 
//           className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800"
//           style={{ y: y1 }}
//         >
//           {/* Background Image */}
//           {project.featured_image && (
//             <motion.div 
//               className="absolute inset-0"
//               initial={{ scale: 1.1 }}
//               animate={{ scale: 1 }}
//               transition={{ duration: 1.5 }}
//             >
//               <img 
//                 src={project.featured_image} 
//                 alt={project.title}
//                 className="w-full h-full object-cover opacity-20"
//               />
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-800/90"></div>
//             </motion.div>
//           )}
          
//           {/* Animated particles */}
//           {[...Array(20)].map((_, i) => (
//             <motion.div
//               key={i}
//               className="absolute w-2 h-2 bg-white/20 rounded-full"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//               }}
//               animate={{
//                 y: [-20, -100],
//                 opacity: [0, 1, 0],
//               }}
//               transition={{
//                 duration: 3 + Math.random() * 2,
//                 repeat: Infinity,
//                 delay: Math.random() * 2,
//               }}
//             />
//           ))}
//         </motion.div>

//         <motion.div 
//           className="relative max-w-6xl mx-auto px-6 text-center z-10"
//           style={{ opacity }}
//         >
//           <motion.div 
//             className="mb-8"
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//           >
//             <div className="flex flex-wrap justify-center gap-4 mb-8">
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-6 py-3 text-base">
//                   <Calendar className="w-5 h-5 mr-2" />
//                   {formatDate(project.created_at)}
//                 </Badge>
//               </motion.div>
//               {tags.slice(0, 3).map((tag, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
//                   whileHover={{ scale: 1.05 }}
//                 >
//                   <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2">
//                     {tag}
//                   </Badge>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
          
//           <motion.h1 
//             className="text-6xl md:text-7xl font-black mb-8 text-white leading-tight"
//             initial={{ opacity: 0, y: 50, scale: 0.9 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             transition={{ duration: 1, delay: 0.4 }}
//           >
//             <span className="inline-block transform hover:scale-105 transition-transform duration-300">
//               {project.title}
//             </span>
//           </motion.h1>
          
//           {project.meta_description && (
//             <motion.p 
//               className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed font-light mb-12"
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.6 }}
//             >
//               {project.meta_description}
//             </motion.p>
//           )}

//           {/* Action Buttons */}
//           <motion.div 
//             className="flex flex-wrap justify-center gap-6"
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.8 }}
//           >
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <Button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg rounded-full shadow-2xl">
//                 <Share2 className="w-5 h-5 mr-2" />
//                 Share Project
//               </Button>
//             </motion.div>
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-full backdrop-blur-sm">
//                 <BookOpen className="w-5 h-5 mr-2" />
//                 Download Report
//               </Button>
//             </motion.div>
//           </motion.div>
//         </motion.div>
//       </section>      {/* Main Content */}
//       <main className="relative max-w-6xl mx-auto px-6 py-20">
//         {/* Content Section */}
//         <motion.div 
//           className="relative z-10"
//           style={{ y: y2 }}
//         >
//           {project.content_json ? (
//             <motion.div 
//               className="prose prose-xl max-w-none relative"
//               initial={{ opacity: 0 }}
//               whileInView={{ opacity: 1 }}
//               transition={{ duration: 1 }}
//               viewport={{ once: true }}
//             >
//               {/* Floating decorative elements */}
//               <motion.div
//                 className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
//                 animate={{
//                   scale: [1, 1.2, 1],
//                   rotate: [0, 180, 360]
//                 }}
//                 transition={{ duration: 8, repeat: Infinity }}
//               />
//               <motion.div
//                 className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-xl"
//                 animate={{
//                   scale: [1.2, 1, 1.2],
//                   rotate: [360, 180, 0]
//                 }}
//                 transition={{ duration: 10, repeat: Infinity }}
//               />
              
//               <div className="relative backdrop-blur-sm bg-white/60 rounded-3xl p-12 shadow-2xl border border-white/30">
//                 {renderStructuredContent(project.content_json)}
//               </div>
//             </motion.div>
//           ) : (
//             <motion.div 
//               className="text-center py-20"
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.8 }}
//             >
//               <motion.div
//                 animate={{ 
//                   rotate: [0, 10, -10, 0],
//                   scale: [1, 1.1, 1]
//                 }}
//                 transition={{ duration: 3, repeat: Infinity }}
//               >
//                 <BookOpen className="w-20 h-20 text-gray-300 mx-auto mb-6" />
//               </motion.div>
//               <p className="text-gray-500 text-2xl font-light">No content available for this project.</p>
//             </motion.div>
//           )}
//         </motion.div>

//         {/* Conclusion Section */}
//         {project.conclusion && (
//           <motion.section 
//             className="mt-20 relative"
//             initial={{ opacity: 0, y: 100 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             viewport={{ once: true }}
//           >
//             {/* Dynamic background shapes */}
//             <div className="absolute inset-0 overflow-hidden">
//               <motion.div
//                 className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full blur-2xl"
//                 animate={{
//                   x: [0, 50, 0],
//                   y: [0, -30, 0],
//                   scale: [1, 1.3, 1]
//                 }}
//                 transition={{ duration: 6, repeat: Infinity }}
//               />
//               <motion.div
//                 className="absolute -bottom-20 -right-20 w-60 h-60 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl"
//                 animate={{
//                   x: [0, -40, 0],
//                   y: [0, 40, 0],
//                   scale: [1.2, 1, 1.2]
//                 }}
//                 transition={{ duration: 8, repeat: Infinity }}
//               />
//             </div>
            
//             <div className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 rounded-3xl overflow-hidden shadow-2xl">
//               <div className="absolute inset-0 bg-black/10"></div>
//               <div className="relative p-12 text-white">
//                 <motion.div 
//                   className="flex items-center mb-8"
//                   initial={{ x: -50, opacity: 0 }}
//                   whileInView={{ x: 0, opacity: 1 }}
//                   transition={{ duration: 0.6 }}
//                   viewport={{ once: true }}
//                 >
//                   <motion.div
//                     animate={{ rotate: [0, 15, -15, 0] }}
//                     transition={{ duration: 4, repeat: Infinity }}
//                   >
//                     <Target className="w-10 h-10 mr-4 text-blue-200" />
//                   </motion.div>
//                   <h3 className="text-4xl font-black bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
//                     Key Takeaways
//                   </h3>
//                 </motion.div>
//                 <motion.p 
//                   className="text-xl leading-10 text-blue-100 font-light"
//                   initial={{ y: 30, opacity: 0 }}
//                   whileInView={{ y: 0, opacity: 1 }}
//                   transition={{ duration: 0.8, delay: 0.2 }}
//                   viewport={{ once: true }}
//                 >
//                   {project.conclusion}
//                 </motion.p>
//               </div>
//             </div>
//           </motion.section>
//         )}        {/* Videos Section */}
//         {project.videos_url && project.videos_url.length > 0 && (
//           <motion.section 
//             className="mt-20 relative"
//             initial={{ opacity: 0, y: 100 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             viewport={{ once: true }}
//           >
//             {/* Floating background decorations */}
//             <div className="absolute inset-0 overflow-hidden">
//               <motion.div
//                 className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-red-400/20 to-orange-400/20 rounded-full blur-2xl"
//                 animate={{
//                   x: [0, 60, 0],
//                   y: [0, -40, 0],
//                   scale: [1, 1.4, 1]
//                 }}
//                 transition={{ duration: 7, repeat: Infinity }}
//               />
//               <motion.div
//                 className="absolute bottom-10 right-10 w-48 h-48 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-2xl"
//                 animate={{
//                   x: [0, -50, 0],
//                   y: [0, 30, 0],
//                   scale: [1.3, 1, 1.3]
//                 }}
//                 transition={{ duration: 9, repeat: Infinity }}
//               />
//             </div>

//             <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/30">
//               <motion.h3 
//                 className="text-4xl font-black mb-12 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 flex items-center"
//                 initial={{ x: -50, opacity: 0 }}
//                 whileInView={{ x: 0, opacity: 1 }}
//                 transition={{ duration: 0.6 }}
//                 viewport={{ once: true }}
//               >
//                 <motion.div
//                   animate={{ 
//                     scale: [1, 1.2, 1],
//                     rotate: [0, 10, -10, 0]
//                   }}
//                   transition={{ duration: 3, repeat: Infinity }}
//                 >
//                   <Play className="w-10 h-10 mr-4 text-red-500" />
//                 </motion.div>
//                 Project Videos
//               </motion.h3>
              
//               <div className="grid gap-8 md:grid-cols-2">
//                 {project.videos_url.map((videoUrl, index) => (
//                   <motion.div 
//                     key={index} 
//                     className="group relative"
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     whileInView={{ opacity: 1, scale: 1 }}
//                     transition={{ duration: 0.6, delay: index * 0.2 }}
//                     viewport={{ once: true }}
//                     whileHover={{ scale: 1.02 }}
//                   >
//                     <div className="absolute -inset-2 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
//                     <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-xl">
//                       <iframe
//                         src={videoUrl}
//                         className="w-full h-full"
//                         frameBorder="0"
//                         allowFullScreen
//                         title={`${project.title} - Video ${index + 1}`}
//                       />
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           </motion.section>
//         )}

//         {/* More Projects CTA */}
//         <motion.section 
//           className="mt-24 text-center relative overflow-hidden"
//           initial={{ opacity: 0, y: 100 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//           viewport={{ once: true }}
//         >
//           {/* Dynamic background shapes */}
//           <div className="absolute inset-0">
//             <motion.div
//               className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-br from-blue-400/30 to-indigo-400/30 rounded-full blur-3xl"
//               animate={{
//                 scale: [1, 1.2, 1],
//                 rotate: [0, 120, 240, 360],
//                 x: [0, 50, -50, 0]
//               }}
//               transition={{ duration: 20, repeat: Infinity }}
//             />
//             <motion.div
//               className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl"
//               animate={{
//                 scale: [1.2, 1, 1.2],
//                 rotate: [360, 240, 120, 0],
//                 x: [0, -60, 60, 0]
//               }}
//               transition={{ duration: 25, repeat: Infinity }}
//             />
//           </div>

//           <div className="relative bg-white/40 backdrop-blur-2xl rounded-3xl p-16 shadow-2xl border border-white/40 max-w-4xl mx-auto">
//             <motion.div
//               animate={{ 
//                 y: [0, -10, 0],
//                 rotate: [0, 5, -5, 0]
//               }}
//               transition={{ duration: 4, repeat: Infinity }}
//             >
//               <Sparkles className="w-16 h-16 text-blue-600 mx-auto mb-8" />
//             </motion.div>
            
//             <motion.h2 
//               className="text-5xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"
//               initial={{ scale: 0.8, opacity: 0 }}
//               whileInView={{ scale: 1, opacity: 1 }}
//               transition={{ duration: 0.8 }}
//               viewport={{ once: true }}
//             >
//               Explore More Projects
//             </motion.h2>
            
//             <motion.p 
//               className="text-gray-700 mb-12 text-xl leading-relaxed max-w-2xl mx-auto"
//               initial={{ y: 30, opacity: 0 }}
//               whileInView={{ y: 0, opacity: 1 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               viewport={{ once: true }}
//             >
//               Discover how we're creating impact across different sectors and regions with innovative solutions and transformative initiatives.
//             </motion.p>
            
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <Link to="/school/new-projects">
//                 <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-6 text-xl rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 group">
//                   View All Projects
//                   <motion.div
//                     className="ml-3"
//                     animate={{ x: [0, 5, 0] }}
//                     transition={{ duration: 2, repeat: Infinity }}
//                   >
//                     <ArrowLeft className="w-6 h-6 rotate-180 group-hover:translate-x-1 transition-transform" />
//                   </motion.div>
//                 </Button>
//               </Link>
//             </motion.div>
//           </div>
//         </motion.section>
//       </main>
//     </div>
//   );
// };

// export default ProjectDetail;
