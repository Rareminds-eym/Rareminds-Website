    // import React from "react";
    // import { useParams, Link } from "react-router-dom";
    // import { Badge } from "../Academy/Project/ui/badge";
    // import { Button } from "../ui/button";
    // import { 
    //   ArrowLeft, 
    //   Calendar, 
    //   Share2, 
    //   BookOpen, 
    //   Users, 
    //   Target, 
    //   TrendingUp,
    //   Award,
    //   CheckCircle,
    //   GraduationCap,
    //   Building,
    //   Star,
    //   Zap,
    //   Globe,
    //   Code,
    //   Cpu
    // } from "lucide-react";
    // import { useQuery } from "@tanstack/react-query";
    // import { supabase } from "../../lib/supabaseClient";

    // interface ProjectPost {
    //   id: string;
    //   title: string;
    //   meta_description: string | null;
    //   featured_image: string | null;
    //   project_tags: string | null;
    //   slug: string | null;
    //   created_at: string;
    //   content_json: any;
    //   conclusion: string | null;
    //   videos_url: string[] | null;
    // }

    // const ProjectDetail = () => {
    //   const { projectId } = useParams();
    
    //   const { data: project, isLoading, error } = useQuery({
    //     queryKey: ['project_post', projectId],
    //     queryFn: async () => {
    //       if (!projectId) {
    //         throw new Error('No project ID provided');
    //       }
        
    //       let query = supabase
    //         .from('project_posts')
    //         .select('id, title, meta_description, featured_image, project_tags, slug, created_at, content_json, conclusion, videos_url');
        
    //       const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(projectId);
        
    //       if (isUUID) {
    //         query = query.eq('id', projectId);
    //       } else {
    //         query = query.eq('slug', projectId);
    //       }
        
    //       const { data, error } = await query.maybeSingle();
        
    //       if (error) {
    //         throw new Error(`Failed to fetch project: ${error.message}`);
    //       }
        
    //       if (!data) {
    //         throw new Error(`Project not found with identifier: ${projectId}`);
    //       }
        
    //       return data;
    //     },
    //     enabled: !!projectId
    //   });

    //   // Function to render text with marks (bold, italic, etc.)
    //   const renderTextWithMarks = (textNode: any) => {
    //     if (!textNode.marks || textNode.marks.length === 0) {
    //       return textNode.text;
    //     }

    //     let element = textNode.text;
    //     textNode.marks.forEach((mark: any) => {
    //       if (mark.type === 'bold') {
    //         element = <strong className="font-semibold text-gray-900">{element}</strong>;
    //       } else if (mark.type === 'italic') {
    //         element = <em className="italic text-gray-800">{element}</em>;
    //       }
    //     });

    //     return element;
    //   };

    //   // Function to render content recursively
    //   const renderNode = (node: any, index: number) => {
    //     if (!node.type) return null;

    //     switch (node.type) {
    //       case 'heading':
    //         const HeadingTag = `h${node.attrs?.level || 3}`;
    //         const headingClasses = {
    //           1: 'text-4xl font-bold text-gray-900 mb-8 mt-12 leading-tight',
    //           2: 'text-3xl font-bold text-gray-900 mb-6 mt-10 leading-tight',
    //           3: 'text-2xl font-semibold text-gray-900 mb-5 mt-8 leading-tight',
    //           4: 'text-xl font-semibold text-gray-900 mb-4 mt-6 leading-tight',
    //           5: 'text-lg font-semibold text-gray-900 mb-3 mt-5 leading-tight',
    //           6: 'text-base font-semibold text-gray-900 mb-3 mt-4 leading-tight'
    //         };
            
    //         return React.createElement(
    //           HeadingTag,
    //           { key: index, className: headingClasses[node.attrs?.level] || headingClasses[3] },
    //           node.content?.map((child: any, childIndex: number) => 
    //             child.type === 'text' ? 
    //               <span key={childIndex}>{renderTextWithMarks(child)}</span> : 
    //               null
    //           )
    //         );

    //       case 'paragraph':
    //         if (!node.content || node.content.length === 0) {
    //           return <div key={index} className="mb-4"></div>;
    //         }
    //         return (
    //           <p key={index} className="mb-6 leading-relaxed text-gray-700 text-lg">
    //             {node.content?.map((child: any, childIndex: number) => {
    //               if (child.type === 'text') {
    //                 return <span key={childIndex}>{renderTextWithMarks(child)}</span>;
    //               } else if (child.type === 'hardBreak') {
    //                 return <br key={childIndex} />;
    //               }
    //               return null;
    //             })}
    //           </p>
    //         );

    //       case 'orderedList':
    //         return (
    //           <ol key={index} className="list-decimal list-inside space-y-3 mb-8 ml-6 text-lg">
    //             {node.content?.map((listItem: any, listIndex: number) => (
    //               <li key={listIndex} className="text-gray-700 leading-relaxed">
    //                 {listItem.content?.map((paragraph: any, pIndex: number) => (
    //                   <div key={pIndex} className="inline">
    //                     {paragraph.content?.map((child: any, childIndex: number) => {
    //                       if (child.type === 'text') {
    //                         return <span key={childIndex}>{renderTextWithMarks(child)}</span>;
    //                       } else if (child.type === 'hardBreak') {
    //                         return <br key={childIndex} />;
    //                       }
    //                       return null;
    //                     })}
    //                   </div>
    //                 ))}
    //               </li>
    //             ))}
    //           </ol>
    //         );

    //       case 'bulletList':
    //         return (
    //           <ul key={index} className="list-disc list-inside space-y-3 mb-8 ml-6 text-lg">
    //             {node.content?.map((listItem: any, listIndex: number) => (
    //               <li key={listIndex} className="text-gray-700 leading-relaxed">
    //                 {listItem.content?.map((paragraph: any, pIndex: number) => (
    //                   <div key={pIndex} className="inline">
    //                     {paragraph.content?.map((child: any, childIndex: number) => {
    //                       if (child.type === 'text') {
    //                         return <span key={childIndex}>{renderTextWithMarks(child)}</span>;
    //                       } else if (child.type === 'hardBreak') {
    //                         return <br key={childIndex} />;
    //                       }
    //                       return null;
    //                     })}
    //                   </div>
    //                 ))}
    //               </li>
    //             ))}
    //           </ul>
    //         );

    //       default:
    //         return null;
    //     }
    //   };

    //   // Function to render structured content from TipTap/ProseMirror JSON
    //   const renderStructuredContent = (contentJson: any) => {
    //     if (!contentJson) {
    //       return <p className="text-gray-500 text-center py-8">No content available for this project.</p>;
    //     }

    //     let content = contentJson;
    //     if (typeof contentJson === 'string') {
    //       try {
    //         content = JSON.parse(contentJson);
    //       } catch (e) {
    //         return <p className="text-gray-700 leading-relaxed text-lg">{contentJson}</p>;
    //       }
    //     }

    //     if (content.content && Array.isArray(content.content)) {
    //       return content.content.map((node: any, index: number) => renderNode(node, index));
    //     } else if (Array.isArray(content)) {
    //       return content.map((node: any, index: number) => renderNode(node, index));
    //     } else if (content.type) {
    //       return renderNode(content, 0);
    //     } else {
    //       return <p className="text-gray-700 leading-relaxed text-lg">{String(content)}</p>;
    //     }
    //   };

    //   if (isLoading) {
    //     return (
    //       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
    //         <div className="text-center">
    //           <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-600 border-t-transparent mx-auto mb-6"></div>
    //           <p className="text-blue-700 text-xl font-medium">Loading project details...</p>
    //         </div>
    //       </div>
    //     );
    //   }

    //   if (error || !project) {
    //     return (
    //       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100">
    //         <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-xl">
    //           <BookOpen className="h-20 w-20 text-red-400 mx-auto mb-6" />
    //           <h1 className="text-3xl font-bold mb-4 text-gray-900">
    //             {error ? 'Error Loading Project' : 'Project Not Found'}
    //           </h1>
    //           <p className="text-gray-600 mb-6 leading-relaxed">
    //             {error 
    //               ? `There was an error loading the project: ${error.message}`
    //               : 'The requested project could not be found.'
    //             }
    //           </p>
    //           <Link to="/school/new-projects">
    //             <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl text-lg font-medium shadow-lg hover:shadow-xl transition-all">
    //               <ArrowLeft className="h-5 w-5 mr-2" />
    //               Back to Projects
    //             </Button>
    //           </Link>
    //         </div>
    //       </div>
    //     );
    //   }

    //   // Parse tags
    //   const tags = project.project_tags 
    //     ? project.project_tags.split(',').map(tag => tag.trim()).filter(Boolean)
    //     : [];

    //   // Format date
    //   const formatDate = (dateString: string) => {
    //     const date = new Date(dateString);
    //     return date.toLocaleDateString('en-US', {
    //       year: 'numeric',
    //       month: 'long',
    //       day: 'numeric'
    //     });
    //   };

    //   return (
    //     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    //       {/* Navigation Header */}
    //       <div className="bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20 sticky top-0 z-50">
    //         <div className="max-w-7xl mx-auto px-6 py-4">
    //           <Link 
    //             to="/school/new-projects" 
    //             className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-all duration-300 font-medium"
    //           >
    //             <ArrowLeft className="h-5 w-5 mr-2" />
    //             Back to Projects
    //           </Link>
    //         </div>
    //       </div>

    //       {/* Hero Section */}
    //       <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
    //         {/* Background Pattern */}
    //         <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
            
    //         <div className="relative max-w-7xl mx-auto px-6 py-20">
    //           <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
    //             {/* Left Column - Content */}
    //             <div className="lg:col-span-3 text-white">
    //               {/* Tags */}
    //               {tags.length > 0 && (
    //                 <div className="flex flex-wrap gap-3 mb-8">
    //                   {tags.slice(0, 4).map((tag, index) => (
    //                     <Badge key={index} className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm font-medium rounded-full">
    //                       {tag}
    //                     </Badge>
    //                   ))}
    //                   {tags.length > 4 && (
    //                     <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm font-medium rounded-full">
    //                       +{tags.length - 4} more
    //                     </Badge>
    //                   )}
    //                 </div>
    //               )}

    //               {/* Title */}
    //               <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
    //                 {project.title}
    //               </h1>

    //               {/* Description */}
    //               {project.meta_description && (
    //                 <p className="text-xl md:text-2xl opacity-90 leading-relaxed mb-10 max-w-4xl">
    //                   {project.meta_description}
    //                 </p>
    //               )}

    //               {/* Meta Information */}
    //               <div className="flex flex-wrap items-center gap-8 text-white/90">
    //                 <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
    //                   <Calendar className="h-5 w-5 mr-3" />
    //                   <span className="font-medium">{formatDate(project.created_at)}</span>
    //                 </div>
    //                 <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
    //                   <Building className="h-5 w-5 mr-3" />
    //                   <span className="font-medium">VELS University</span>
    //                 </div>
    //                 <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
    //                   <Users className="h-5 w-5 mr-3" />
    //                   <span className="font-medium">200+ Students</span>
    //                 </div>
    //               </div>
    //             </div>

    //             {/* Right Column - Visual Elements */}
    //             <div className="lg:col-span-2">
    //               <div className="relative">
    //                 {/* Stats Cards */}
    //                 <div className="grid grid-cols-2 gap-4 mb-6">
    //                   <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
    //                     <TrendingUp className="h-8 w-8 text-green-300 mx-auto mb-2" />
    //                     <div className="text-3xl font-bold text-white">95%</div>
    //                     <div className="text-white/80 text-sm">Satisfaction Rate</div>
    //                   </div>
    //                   <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
    //                     <Award className="h-8 w-8 text-yellow-300 mx-auto mb-2" />
    //                     <div className="text-3xl font-bold text-white">200+</div>
    //                     <div className="text-white/80 text-sm">Students Trained</div>
    //                   </div>
    //                 </div>

    //                 {/* Featured Image */}
    //                 {project.featured_image && (
    //                   <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6">
    //                     <img
    //                       src={project.featured_image}
    //                       alt={project.title}
    //                       className="w-full h-48 object-cover rounded-2xl shadow-2xl"
    //                       onError={(e) => {
    //                         const target = e.target as HTMLImageElement;
    //                         target.style.display = 'none';
    //                       }}
    //                     />
    //                   </div>
    //                 )}
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       {/* Main Content */}
    //       <div className="max-w-6xl mx-auto px-6 py-16">
    //         {/* Introduction Section */}
    //         <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
    //           <div className="flex items-center mb-8">
    //             <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-4 mr-6">
    //               <GraduationCap className="h-8 w-8 text-white" />
    //             </div>
    //             <div>
    //               <h2 className="text-3xl font-bold text-gray-900 mb-2">Introduction</h2>
    //               <p className="text-gray-600">Transforming Technical Education</p>
    //             </div>
    //           </div>
            
    //           <div className="prose prose-lg max-w-none">
    //             <p className="text-xl leading-relaxed text-gray-700 mb-6">
    //               Rareminds training programs at VELS University to reshape technical education for first-year students, 
    //               delivering high-impact, project-based training in emerging technologies. The initiative successfully 
    //               bridged classroom learning with real-world application, equipping students with future-ready skills 
    //               and confidence for the evolving digital workplace.
    //             </p>
    //           </div>
    //         </div>

    //         {/* About the Program */}
    //         <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl shadow-xl p-8 md:p-12 mb-12">
    //           <div className="flex items-center mb-8">
    //             <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-4 mr-6">
    //               <Code className="h-8 w-8 text-white" />
    //             </div>
    //             <div>
    //               <h2 className="text-3xl font-bold text-gray-900 mb-2">About the Program</h2>
    //               <p className="text-gray-600">Innovative Learning Experience</p>
    //             </div>
    //           </div>

    //           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
    //             <div className="bg-white rounded-2xl p-6 shadow-lg">
    //               <div className="flex items-center mb-4">
    //                 <Cpu className="h-6 w-6 text-indigo-600 mr-3" />
    //                 <h3 className="text-xl font-semibold text-gray-900">Industrial Metaverse</h3>
    //               </div>
    //               <p className="text-gray-700">45-hour experiential training combining VR, AI, and immersive technologies</p>
    //             </div>
    //             <div className="bg-white rounded-2xl p-6 shadow-lg">
    //               <div className="flex items-center mb-4">
    //                 <Globe className="h-6 w-6 text-purple-600 mr-3" />
    //                 <h3 className="text-xl font-semibold text-gray-900">Web Full Stack Development</h3>
    //               </div>
    //               <p className="text-gray-700">45-hour intensive program using MERN stack and modern frameworks</p>
    //             </div>
    //           </div>

    //           <p className="text-lg leading-relaxed text-gray-700">
    //             These programs combined cutting-edge tools like VR, AI, and the MERN stack with hands-on projects, 
    //             enabling students to code, build, simulate, and deploy real-world applications from day one.
    //           </p>
    //         </div>

    //         {/* Key Outcomes & Impact */}
    //         <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
    //           <div className="flex items-center mb-8">
    //             <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-4 mr-6">
    //               <Target className="h-8 w-8 text-white" />
    //             </div>
    //             <div>
    //               <h2 className="text-3xl font-bold text-gray-900 mb-2">Key Outcomes & Impact</h2>
    //               <p className="text-gray-600">Measurable Success Metrics</p>
    //             </div>
    //           </div>

    //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
    //             {[
    //               { icon: Users, stat: "200+", label: "Students Trained", desc: "through structured, mentor-led sessions" },
    //               { icon: CheckCircle, stat: "90%", label: "Built Applications", desc: "deployable full-stack applications using modern frameworks" },
    //               { icon: Star, stat: "95%", label: "High Satisfaction", desc: "rated the training 8/10 or higher for content and delivery" },
    //               { icon: TrendingUp, stat: "85%", label: "Career Confidence", desc: "improved confidence in applying skills to internships" },
    //               { icon: Zap, stat: "100%", label: "Active Participation", desc: "enhanced critical thinking and teamwork skills" },
    //               { icon: Award, stat: "Positive", label: "Faculty Feedback", desc: "increased engagement, curiosity, and understanding" }
    //             ].map((item, index) => (
    //               <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
    //                 <div className="flex items-center mb-4">
    //                   <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-xl p-3 mr-4">
    //                     <item.icon className="h-6 w-6 text-white" />
    //                   </div>
    //                   <div>
    //                     <div className="text-2xl font-bold text-gray-900">{item.stat}</div>
    //                     <div className="text-sm font-semibold text-gray-600">{item.label}</div>
    //                   </div>
    //                 </div>
    //                 <p className="text-gray-700 text-sm leading-relaxed">{item.desc}</p>
    //               </div>
    //             ))}
    //           </div>
    //         </div>

    //         {/* Strategic Alignment */}
    //         <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl shadow-xl p-8 md:p-12 mb-12">
    //           <div className="flex items-center mb-8">
    //             <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-4 mr-6">
    //               <Building className="h-8 w-8 text-white" />
    //             </div>
    //             <div>
    //               <h2 className="text-3xl font-bold text-gray-900 mb-2">Strategic Alignment with VELS University Goals</h2>
    //               <p className="text-gray-600">Supporting Institutional Excellence</p>
    //             </div>
    //           </div>

    //           <p className="text-lg leading-relaxed text-gray-700 mb-8">
    //             This initiative supported key institutional objectives such as:
    //           </p>

    //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //             {[
    //               { title: "NAAC & NIRF Enhancement", desc: "through experiential learning and tech integration", icon: Award },
    //               { title: "Improved Employability Outcomes", desc: "via skill-based, industry-aligned content", icon: TrendingUp },
    //               { title: "Curriculum Innovation", desc: "aligned with NEP 2020 and industry expectations", icon: BookOpen },
    //               { title: "Higher Student Engagement", desc: "contributes to improved retention and satisfaction", icon: Users }
    //             ].map((goal, index) => (
    //               <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
    //                 <div className="flex items-start">
    //                   <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-3 mr-4 mt-1">
    //                     <goal.icon className="h-5 w-5 text-white" />
    //                   </div>
    //                   <div>
    //                     <h3 className="text-lg font-semibold text-gray-900 mb-2">{goal.title}</h3>
    //                     <p className="text-gray-700">{goal.desc}</p>
    //                   </div>
    //                 </div>
    //               </div>
    //             ))}
    //           </div>
    //         </div>

    //         {/* Dynamic Content from Supabase */}
    //         {project.content_json && (
    //           <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
    //             <div className="prose prose-lg max-w-none">
    //               {renderStructuredContent(project.content_json)}
    //             </div>
    //           </div>
    //         )}

    //         {/* Conclusion */}
    //         {project.conclusion && (
    //           <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-3xl shadow-xl p-8 md:p-12 mb-12">
    //             <div className="flex items-start">
    //               <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl p-4 mr-6 mt-1">
    //                 <Target className="h-8 w-8 text-white" />
    //               </div>
    //               <div>
    //                 <h3 className="text-3xl font-bold mb-6 text-gray-900">Key Takeaway</h3>
    //                 <p className="text-xl leading-relaxed text-gray-700">
    //                   {project.conclusion}
    //                 </p>
    //               </div>
    //             </div>
    //           </div>
    //         )}

    //         {/* Share Section */}
    //         <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
    //           <div className="flex items-center justify-between flex-wrap gap-6">
    //             <div>
    //               <h4 className="text-2xl font-bold text-gray-900 mb-3">Share this Case Study</h4>
    //               <p className="text-gray-600 text-lg">Help others learn from this educational transformation</p>
    //             </div>
    //             <Button 
    //               className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
    //               onClick={() => {
    //                 if (navigator.share) {
    //                   navigator.share({
    //                     title: project.title,
    //                     text: project.meta_description || 'Check out this educational case study',
    //                     url: window.location.href,
    //                   });
    //                 }
    //               }}
    //             >
    //               <Share2 className="h-5 w-5 mr-3" />
    //               Share Project
    //             </Button>
    //           </div>
    //         </div>
    //       </div>

    //       {/* Call to Action */}
    //       <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 py-20">
    //         <div className="max-w-4xl mx-auto text-center px-6">
    //           <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Explore More Impact Stories</h2>
    //           <p className="text-xl text-blue-200 mb-10 max-w-3xl mx-auto leading-relaxed">
    //             Discover how we're transforming education and creating meaningful impact across institutions and communities through innovative solutions.
    //           </p>
    //           <Link to="/school/new-projects">
    //             <Button className="bg-white text-blue-900 hover:bg-blue-50 px-10 py-4 text-xl font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
    //               <BookOpen className="h-6 w-6 mr-3" />
    //               View All Projects
    //             </Button>
    //           </Link>
    //         </div>
    //       </div>
    //     </div>
    //   );
    // };

    // export default ProjectDetail;
