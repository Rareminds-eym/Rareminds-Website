// import { useParams, Link } from "react-router-dom";
// import { Badge } from "../Academy/Project/ui/badge";
// import { Button } from "../ui/button";
// import { ArrowLeft, Calendar, Share2, BookOpen, Users, Target } from "lucide-react";
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
      
//       return data as ProjectPost;
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
//         element = <strong key={`bold-${Math.random()}`} className="font-semibold text-gray-900">{element}</strong>;
//       } else if (mark.type === 'italic') {
//         element = <em key={`italic-${Math.random()}`} className="italic text-gray-800">{element}</em>;
//       }
//     });

//     return element;
//   };

//   // Function to render content recursively
//   const renderNode = (node: any, index: number) => {
//     if (!node.type) return null;

//     switch (node.type) {
//       case 'heading':
//         const HeadingTag = `h${node.attrs?.level || 3}` as keyof JSX.IntrinsicElements;
//         const headingClasses = {
//           1: 'text-4xl font-bold text-gray-900 mb-8 mt-12 leading-tight',
//           2: 'text-3xl font-bold text-gray-900 mb-6 mt-10 leading-tight',
//           3: 'text-2xl font-semibold text-gray-900 mb-5 mt-8 leading-tight',
//           4: 'text-xl font-semibold text-gray-900 mb-4 mt-6 leading-tight',
//           5: 'text-lg font-semibold text-gray-900 mb-3 mt-5 leading-tight',
//           6: 'text-base font-semibold text-gray-900 mb-3 mt-4 leading-tight'
//         };
        
//         return (
//           <HeadingTag key={index} className={headingClasses[node.attrs?.level as keyof typeof headingClasses] || headingClasses[3]}>
//             {node.content?.map((child: any, childIndex: number) => 
//               child.type === 'text' ? <span key={childIndex}>{renderTextWithMarks(child)}</span> : null
//             )}
//           </HeadingTag>
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

//       case 'blockquote':
//         return (
//           <blockquote key={index} className="border-l-4 border-blue-500 pl-6 mb-8 italic text-gray-600 text-lg bg-gray-50 py-4">
//             {node.content?.map((child: any, childIndex: number) => renderNode(child, childIndex))}
//           </blockquote>
//         );

//       case 'codeBlock':
//         return (
//           <pre key={index} className="bg-gray-900 text-green-400 p-6 rounded-lg mb-8 overflow-x-auto text-sm">
//             <code>{node.content?.[0]?.text || ''}</code>
//           </pre>
//         );

//       default:
//         return null;
//     }
//   };

//   // Function to render structured content from TipTap/ProseMirror JSON
//   const renderStructuredContent = (contentJson: any) => {
//     if (!contentJson) return null;

//     let content = contentJson;
//     if (typeof contentJson === 'string') {
//       try {
//         content = JSON.parse(contentJson);
//       } catch (e) {
//         return (
//           <div className="prose prose-lg max-w-none">
//             <p className="text-gray-700 leading-relaxed text-lg">{contentJson}</p>
//           </div>
//         );
//       }
//     }

//     // Handle different content structures
//     if (content.content && Array.isArray(content.content)) {
//       return content.content.map((node: any, index: number) => renderNode(node, index));
//     } else if (Array.isArray(content)) {
//       return content.map((node: any, index: number) => renderNode(node, index));
//     } else if (content.type) {
//       return renderNode(content, 0);
//     } else {
//       return (
//         <div className="prose prose-lg max-w-none">
//           <p className="text-gray-700 leading-relaxed text-lg">{String(content)}</p>
//         </div>
//       );
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-6"></div>
//           <p className="text-gray-600 text-lg">Loading project details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !project) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100">
//         <div className="text-center max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg">
//           <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
//             <BookOpen className="h-8 w-8 text-red-600" />
//           </div>
//           <h1 className="text-2xl font-bold mb-4 text-gray-900">
//             {error ? 'Error Loading Project' : 'Project Not Found'}
//           </h1>
//           <p className="text-gray-600 mb-6">
//             {error 
//               ? `There was an error loading the project: ${error.message}`
//               : 'The requested project could not be found.'
//             }
//           </p>
//           <Link to="/school/new-projects">
//             <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
//               <ArrowLeft className="h-4 w-4 mr-2" />
//               Back to Projects
//             </Button>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   // Parse tags
//   const tags = project.project_tags 
//     ? project.project_tags.split(',').map((tag: string) => tag.trim()).filter(Boolean)
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
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
//       {/* Navigation Bar */}
//       <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <Link 
//             to="/school/new-projects" 
//             className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors"
//           >
//             <ArrowLeft className="h-5 w-5 mr-2" />
//             Back to Projects
//           </Link>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
//         <div className="absolute inset-0 bg-black/20"></div>
//         <div className="relative max-w-7xl mx-auto px-6 py-20">
//           <div className="max-w-4xl">
//             {/* Tags */}
//             {tags.length > 0 && (
//               <div className="flex flex-wrap gap-3 mb-6">
//                 <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
//                   <Calendar className="h-3 w-3 mr-1" />
//                   {formatDate(project.created_at)}
//                 </Badge>
//                 {tags.slice(0, 4).map((tag, index) => (
//                   <Badge key={index} variant="outline" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
//                     {tag}
//                   </Badge>
//                 ))}
//                 {tags.length > 4 && (
//                   <Badge variant="outline" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
//                     +{tags.length - 4} more
//                   </Badge>
//                 )}
//               </div>
//             )}

//             {/* Title */}
//             <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
//               {project.title}
//             </h1>

//             {/* Description */}
//             {project.meta_description && (
//               <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl">
//                 {project.meta_description}
//               </p>
//             )}

//             {/* Action Buttons */}
//             <div className="flex flex-wrap gap-4">
//               <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
//                 <Share2 className="h-5 w-5 mr-2" />
//                 Share Project
//               </Button>
//               <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
//                 <BookOpen className="h-5 w-5 mr-2" />
//                 Save for Later
//               </Button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Main Content */}
//       <main className="max-w-4xl mx-auto px-6 py-16">
//         {/* Project Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
//           <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//             <div className="flex items-center mb-3">
//               <Users className="h-6 w-6 text-blue-600 mr-3" />
//               <h3 className="font-semibold text-gray-900">Impact Reach</h3>
//             </div>
//             <p className="text-2xl font-bold text-gray-900">200+</p>
//             <p className="text-sm text-gray-600">Students Trained</p>
//           </div>
          
//           <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//             <div className="flex items-center mb-3">
//               <Target className="h-6 w-6 text-green-600 mr-3" />
//               <h3 className="font-semibold text-gray-900">Success Rate</h3>
//             </div>
//             <p className="text-2xl font-bold text-gray-900">95%</p>
//             <p className="text-sm text-gray-600">Satisfaction Rating</p>
//           </div>
          
//           <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//             <div className="flex items-center mb-3">
//               <BookOpen className="h-6 w-6 text-purple-600 mr-3" />
//               <h3 className="font-semibold text-gray-900">Completion</h3>
//             </div>
//             <p className="text-2xl font-bold text-gray-900">90%</p>
//             <p className="text-sm text-gray-600">Project Completion</p>
//           </div>
//         </div>

//         {/* Content Section */}
//         <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-12">
//           <div className="prose prose-lg max-w-none">
//             {project.content_json ? (
//               renderStructuredContent(project.content_json)
//             ) : (
//               <div className="text-center py-12">
//                 <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//                 <p className="text-gray-500 text-lg">No content available for this project.</p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Conclusion */}
//         {project.conclusion && (
//           <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 mb-12">
//             <h3 className="text-2xl font-bold mb-4 text-gray-900 flex items-center">
//               <Target className="h-6 w-6 mr-3 text-blue-600" />
//               Key Takeaways
//             </h3>
//             <p className="text-lg leading-relaxed text-gray-700">
//               {project.conclusion}
//             </p>
//           </div>
//         )}
//       </main>

//       {/* Call to Action */}
//       <section className="bg-gray-900 text-white py-20">
//         <div className="max-w-4xl mx-auto text-center px-6">
//           <h2 className="text-3xl font-bold mb-4">Explore More Impact Stories</h2>
//           <p className="text-gray-300 mb-8 text-lg">
//             Discover how we're creating meaningful change across different sectors and communities.
//           </p>
//           <Link to="/school/new-projects">
//             <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
//               <BookOpen className="h-5 w-5 mr-2" />
//               View All Projects
//             </Button>
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default ProjectDetail;
