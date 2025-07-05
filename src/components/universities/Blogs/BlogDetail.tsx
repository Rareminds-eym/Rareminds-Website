import { useParams, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "../UI/input";
import { Textarea } from "../UI/textarea";
import BlogCard from "./BlogCard";
import { Calendar, Clock, User, ArrowLeft, CheckCircle, Share2, Eye, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import AcademyHeader from "@/components/Header/AcademyHeader";
import styles from "./styles.module.css"; // Assuming you have a CSS module for styles

// Supabase blog post interface
interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  featured_image: string | null;
  category: string;
  subcategory: string | null;
  slug: string;
  author_name: string | null;
  author_bio: string | null;
  author_avatar: string | null;
  read_time: number | null;
  tags: string[] | null;
  key_points: string[] | null;
  publish_date: string;
  created_at: string;
  updated_at: string;
}

const BlogDetail = () => {
  const { slug } = useParams();
  const location = useLocation();
  const { toast } = useToast();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentName, setCommentName] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [commentText, setCommentText] = useState("");

  // Debug: Log the slug
  console.log('BlogDetail slug:', slug);
  
  // Determine which subcategory to fetch based on URL path
  const getSubcategoryFromPath = () => {
    if (location.pathname.includes("/institution/sdp/blogs")) {
      return "SDP";
    } else if (location.pathname.includes("/institution/fdp/blogs")) {
      return "FDP";
    }
    return null;
  };

  // Fetch blog post from Supabase
  useEffect(() => {
    const fetchBlogPost = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        
        // Get subcategory from URL path
        const subcategory = getSubcategoryFromPath();
        
        // Start building the query
        let query = supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug);
        
        // Add subcategory filter if applicable
        if (subcategory) {
          query = query.eq('subcategory', subcategory);
        }
        
        // Execute the query
        const { data: blogData, error: blogError } = await query.single();

        // Debug: Log the fetched data and error
        console.log('Supabase blogData:', blogData);
        console.log('Supabase blogError:', blogError);

        if (blogError) {
          console.error('Error fetching blog post:', blogError);
          toast({
            title: "Error",
            description: "Failed to load blog post. Please try again.",
            variant: "destructive",
          });
          return;
        }

        setPost(blogData);

        // Fetch related posts from the same category or subcategory
        if (blogData?.category) {
          // Get subcategory from URL path
          const subcategory = getSubcategoryFromPath();
          
          // Start building the query
          let relatedQuery = supabase
            .from('blog_posts')
            .select('*')
            .neq('id', blogData.id)
            .limit(3);
            
          // Filter by both category and subcategory
          if (subcategory) {
            relatedQuery = relatedQuery
              .eq('subcategory', subcategory)
              .eq('category', blogData.category);
          } else {
            // If no specific subcategory, use broader category matching
            relatedQuery = relatedQuery
              .or(`eq(category, ${blogData.category}),eq(subcategory, ${blogData.subcategory})`);
          }
          
          // Execute the query
          const { data: relatedData, error: relatedError } = await relatedQuery
            .order('created_at', { ascending: false });

          if (!relatedError && relatedData) {
            setRelatedPosts(relatedData);
          }
        }

      } catch (error) {
        console.error('Error:', error);
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [slug, toast]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900">Loading article...</h2>
        </div>
      </div>
    );
  }

  // Post not found state
  
  if (!post) {
    return (
      
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Link to="/" className="text-primary hover:underline">
            Return to Blog
          </Link>        </div>
      </div>
    );
  }

  const currentUrl = window.location.href;

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate comment submission
    toast({
      title: "Comment submitted!",
      description: "Thank you for your feedback. We'll review your comment shortly.",
    });
    
    // Clear form
    setCommentName("");
    setCommentEmail("");
    setCommentText("");
  };

  const renderContent = (content: string) => {
    const lines = content.trim().split('\n');
    
    return lines.map((line, index) => {
      const trimmedLine = line.trim();
      
      if (!trimmedLine) {
        return <br key={index} />;
      }
      
      // Headers
      if (trimmedLine.startsWith('# ')) {
        return (
          <h1 key={index} className="font-playfair text-4xl font-bold text-foreground mb-6 mt-8">
            {trimmedLine.substring(2)}
          </h1>
        );
      }
      
      if (trimmedLine.startsWith('## ')) {
        return (
          <h2 key={index} className="font-playfair text-3xl font-semibold text-foreground mb-4 mt-8">
            {trimmedLine.substring(3)}
          </h2>
        );
      }
      
      if (trimmedLine.startsWith('### ')) {
        return (
          <h3 key={index} className="font-playfair text-2xl font-semibold text-foreground mb-4 mt-6">
            {trimmedLine.substring(4)}
          </h3>
        );
      }
      
      // Blockquotes
      if (trimmedLine.startsWith('> ')) {
        return (
          <blockquote key={index} className="border-l-4 border-primary pl-6 py-2 my-6 italic text-lg text-muted-foreground bg-sage-50/50 rounded-r-lg">
            {trimmedLine.substring(2)}
          </blockquote>
        );
      }
      
      // Bold subheadings
      if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
        return (
          <h4 key={index} className="font-semibold text-lg text-foreground mb-3 mt-4">
            {trimmedLine.slice(2, -2)}
          </h4>
        );
      }
      
      // Bullet points
      if (trimmedLine.startsWith('• ') || trimmedLine.startsWith('- ')) {
        return (
          <li key={index} className="text-muted-foreground mb-2 ml-4">
            {trimmedLine.substring(2)}
          </li>
        );
      }
      
      // Numbered lists
      if (/^\d+\./.test(trimmedLine)) {
        const text = trimmedLine.replace(/^\d+\.\s*/, '');
        return (
          <li key={index} className="text-muted-foreground mb-2 ml-4 list-decimal">
            {text}
          </li>
        );
      }
      
      // Regular paragraphs
      return (
        <p key={index} className="text-muted-foreground mb-4 leading-relaxed">
          {trimmedLine}
        </p>
      );
    });
  };
  return (

    <>
      <AcademyHeader  />
    <div className="min-h-screen bg-white mt-[80px]">
      {/* Floating Share Bar */}
      <div className="fixed top-1/2 left-6 z-50 hidden xl:flex flex-col items-center -translate-y-1/2">
        {/* <FloatingShareBar title={post.title} url={currentUrl} /> */}
      </div>
      <div className="fixed bottom-8 left-1/2 z-50 hidden lg:flex xl:hidden -translate-x-1/2">
        {/* <FloatingShareBar title={post.title} url={currentUrl} horizontal /> */}
      </div>

      {/* Navigation Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              to={location.pathname.includes("/institutions/blogs") ? "/institutions/sdp/blogs" : "/institutions/fdp/blogs"}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Insights</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigator.share && navigator.share({ title: post.title, url: currentUrl })}
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <div className="relative h-[50vh] lg:h-[60vh] overflow-hidden flex items-center justify-center">
          <img
            src={post.featured_image || '/default-blog-image.jpg'}
            alt={post.title}
            className="w-full h-full object-cover absolute inset-0 z-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
          {/* Centered content starts here */}
          <div className="relative z-20 w-full flex justify-center items-center h-full">
            <div className=" w-full max-w-6xl mx-auto text-start ">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <span className="inline-block px-4 py-2 bg-red-500 text-white rounded-full text-sm font-semibold mb-6 shadow-lg">
                  {post.category}
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center justify-start gap-6 text-white/90">
                  <div className="flex items-center gap-2">
                    {/* <User className="w-4 h-4" /> */}
                    {/* <span className="font-medium">{post.author_name || 'Anonymous'}</span> */}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.publish_date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* <Clock className="w-4 h-4" /> */}
                    {/* <span>{post.read_time || 5} min read</span> */}
                  </div>
                  <div className="flex items-center gap-2">
                    {/* <Eye className="w-4 h-4" /> */}
                    {/* <span>2.4k views</span> */}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <main className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Article Content */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="lg:col-span-8"
            >
              {/* Key Points */}
              {/* <div className="mb-12 p-8 bg-gray-50 rounded-2xl border border-gray-100">
              
                <ul className="space-y-4">
                  {post.key_points?.map((point: string, index: number) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div> */}

              {/* Article Content */}
              <div
                className={`${styles.blogContent} prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-red-500 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-blockquote:border-red-500 prose-blockquote:bg-red-50 prose-blockquote:text-gray-800`}
                dangerouslySetInnerHTML={{ __html: post.content } }
              />

              {/* Author Profile */}
              {/* <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="mt-16 p-8 bg-gradient-to-r from-gray-50 to-red-50 rounded-2xl border border-gray-100"
              >                <div className="flex items-start gap-6">
                  <img
                    src={post.author_avatar || '/default-avatar.jpg'}
                    alt={post.author_name || 'Author'}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">
                      {post.author_name || 'Anonymous Author'}
                    </h4>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {post.author_bio || 'No bio available.'}
                    </p>
                    <div className="flex items-center gap-4">
                      <Button variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50">
                        Follow
                      </Button>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MessageCircle className="w-4 h-4" />
                        <span>Ask a question</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div> */}
            </motion.div>

            {/* Sidebar */}
            <motion.aside 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="lg:col-span-4"
            >
              {/* Article Stats */}
              <div className="sticky top-24 space-y-8">
                <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <h4 className="font-bold text-gray-900 mb-4">Article Stats</h4>
                  <div className="space-y-3">                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Published</span>
                      <span className="font-medium text-gray-900">
                        {new Date(post.publish_date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Read time</span>
                      <span className="font-medium text-gray-900">{post.read_time || 5} min</span>
                    </div>
                    {/* <div className="flex items-center justify-between">
                      <span className="text-gray-600">Views</span>
                      <span className="font-medium text-gray-900">2.4k</span>
                    </div> */}
                  </div>
                </div>

                {/* Tags */}
                <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <h4 className="font-bold text-gray-900 mb-4">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {post.tags?.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm font-medium border border-red-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Mobile Share */}
                <div className="lg:hidden p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <h4 className="font-bold text-gray-900 mb-4">Share this article</h4>
                  <div className="flex gap-3">
                    <Button size="sm" className="flex-1 bg-red-500 hover:bg-red-600">
                      LinkedIn
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 border-red-200 text-red-600 hover:bg-red-50">
                      WhatsApp
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 border-red-200 text-red-600 hover:bg-red-50">
                      Twitter
                    </Button>
                  </div>
                </div>              </div>
            </motion.aside>
          </div>
        </div>
      </main>

      {/* Comments Section */}
      {/* <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Join the conversation</h3>
            
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <form onSubmit={handleCommentSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2" htmlFor="name">
                      Name *
                    </label>
                    <Input
                      id="name"
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      required
                      className="border-gray-200 focus:border-red-500 focus:ring-red-500"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2" htmlFor="email">
                      Email *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={commentEmail}
                      onChange={(e) => setCommentEmail(e.target.value)}
                      required
                      className="border-gray-200 focus:border-red-500 focus:ring-red-500"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2" htmlFor="comment">
                    Comment *
                  </label>
                  <Textarea
                    id="comment"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    required
                    rows={5}
                    className="border-gray-200 focus:border-red-500 focus:ring-red-500"
                    placeholder="Share your thoughts on this article..."
                  />
                </div>
                <Button 
                  type="submit" 
                  className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 font-semibold"
                >
                  Submit Comment
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </section> */}

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Related Articles
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Discover more insights and expert perspectives on similar topics
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost, index) => (
                  <motion.div
                    key={relatedPost.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.1, duration: 0.6 }}
                  >
                    <BlogCard post={relatedPost} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Latest Articles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Latest Articles
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Stay up to date with our newest insights on sustainability, ESG frameworks, and environmental management
              </p>
            </div>            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((currentPost: BlogPost, index: number) => (
                <motion.div
                  key={currentPost.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + index * 0.1, duration: 0.6 }}
                >
                  <BlogCard post={currentPost} />
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link to="/universities/blogs">
                <Button 
                  variant="outline" 
                  className="border-red-200 text-red-600 hover:bg-red-50 px-8 py-3 font-semibold"
                >
                  View All Articles
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
};

export default BlogDetail;