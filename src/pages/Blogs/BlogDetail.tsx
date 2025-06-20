import { useParams, Link, useLocation } from "react-router-dom";
import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import BlogCard from "./BlogCard";
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Share2, 
  AlertTriangle,
  Linkedin,
  Twitter,
  Github
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import styles from "./styles.module.css";

// Enhanced type definitions
interface BlogPost {
  readonly id: string;
  readonly title: string;
  readonly content: string;
  readonly excerpt: string;
  readonly featured_image: string | null;
  readonly category: string;
  readonly subcategory: string | null;
  readonly meta_description: string;
  readonly slug: string;
  readonly meta_title: string;
  readonly author_name: string | null;
  readonly author_bio: string | null;
  readonly author_avatar: string | null;
  readonly author_linkedin: string | null;
  readonly author_twitter: string | null;
  readonly author_github: string | null;
  readonly read_time: number | null;
  readonly tags: string[] | null;
  readonly key_points: string[] | null;
  readonly publish_date: string;
  readonly created_at: string;
  readonly updated_at: string;
}

// Loading states enum for better type safety
enum LoadingState {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

// Error types for better error handling
interface BlogError {
  type: 'NETWORK' | 'NOT_FOUND' | 'UNAUTHORIZED' | 'UNKNOWN';
  message: string;
  code?: string;
}

// Enhanced data fetching hook with proper error handling
const useBlogPost = (slug: string | undefined) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [error, setError] = useState<BlogError | null>(null);
  const { toast } = useToast();

  const fetchBlogPost = useCallback(async () => {
    if (!slug) {
      setError({ type: 'NOT_FOUND', message: 'Blog post slug is required' });
      setLoadingState(LoadingState.ERROR);
      return;
    }

    try {
      setLoadingState(LoadingState.LOADING);
      setError(null);

      // Build query with proper error handling
      let query = supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug);

      const { data: blogData, error: blogError } = await query.single();

      if (blogError) {
        const errorType = blogError.code === 'PGRST116' ? 'NOT_FOUND' : 'NETWORK';
        const errorMessage = errorType === 'NOT_FOUND' 
          ? 'Blog post not found' 
          : 'Failed to load blog post. Please try again.';
        
        setError({ type: errorType, message: errorMessage, code: blogError.code });
        setLoadingState(LoadingState.ERROR);
        
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
        return;
      }

      setPost(blogData);
      setLoadingState(LoadingState.SUCCESS);

    } catch (error) {
      console.error('Unexpected error fetching blog post:', error);
      const unexpectedError: BlogError = {
        type: 'UNKNOWN',
        message: 'An unexpected error occurred. Please try again later.'
      };
      setError(unexpectedError);
      setLoadingState(LoadingState.ERROR);
      
      toast({
        title: "Error",
        description: unexpectedError.message,
        variant: "destructive",
      });
    }
  }, [slug, toast]);

  useEffect(() => {
    fetchBlogPost();
  }, [fetchBlogPost]);

  return {
    post,
    loadingState,
    error,
    refetch: fetchBlogPost,
    isLoading: loadingState === LoadingState.LOADING,
    isError: loadingState === LoadingState.ERROR,
    isSuccess: loadingState === LoadingState.SUCCESS
  };
};

// Hook for fetching related posts
const useRelatedPosts = (post: BlogPost | null) => {
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRelatedPosts = useCallback(async () => {
    if (!post?.category || !post?.id) return;

    try {
      setLoading(true);

      let relatedQuery = supabase
        .from('blog_posts')
        .select('*')
        .neq('id', post.id)
        .limit(3);
      
      relatedQuery = relatedQuery.eq('category', post.category);

      const { data: relatedData, error: relatedError } = await relatedQuery
        .order('created_at', { ascending: false });

      if (!relatedError && relatedData) {
        setRelatedPosts(relatedData);
      }
    } catch (error) {
      console.error('Error fetching related posts:', error);
    } finally {
      setLoading(false);
    }
  }, [post?.category, post?.id]);

  useEffect(() => {
    fetchRelatedPosts();
  }, [fetchRelatedPosts]);

  return { relatedPosts, loading };
};

// Utility functions
const formatDate = (dateString: string): string => {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return 'Invalid date';
  }
};

const formatShortDate = (dateString: string): string => {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return 'Invalid date';
  }
};

// Enhanced component with proper error boundaries
const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  
  // Use custom hooks
  const { post, isLoading, isError, error } = useBlogPost(slug);
  const { relatedPosts, loading: relatedLoading } = useRelatedPosts(post);

  // Determine navigation path
  const backToPath = useMemo(() => {
    // Default to /blogs if no context
    return "/blogs";
  }, [location.pathname]);

  // Early returns for different states
  if (isLoading) {
    return <LoadingComponent />;
  }

  if (isError || !post) {
    return <ErrorComponent error={error} backToPath={backToPath} />;
  }

  return (
    <>
      <Helmet>
        <title>{post.meta_title}</title>
        <meta name="description" content={post.meta_description} />
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-white"
      >
        {/* Back Button Header */}
        <div className="w-full sticky top-0 z-[40] bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors group font-medium"
              aria-label="Back to previous page"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back
            </button>
          </div>
        </div>
        {/* Hero Section (image only) */}
        <BlogHeroSection post={post} hideTitle />
        {/* Blog Title and Category below image */}
        <div className="w-full bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
            <span className="inline-block px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-semibold mb-4 shadow-lg">
              {post.category}
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 mb-6 !leading-tight">
              {post.title}
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <main className="pb-16 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Article Content */}
              <BlogContentSection post={post} />

              {/* Sidebar */}
              <BlogSidebar post={post} />
            </div>
          </div>
        </main>

        {/* Related Posts */}
        <RelatedPostsSection 
          relatedPosts={relatedPosts} 
          loading={relatedLoading}
          backToPath={backToPath}
        />
      </motion.div>
    </>
  );
};

// Component subdivisions for better organization and reusability

// Loading component with better UX
const LoadingComponent = memo(() => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="text-center max-w-md mx-auto px-4">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-500 mx-auto mb-6"></div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">Loading article...</h2>
      <p className="text-gray-600">Please wait while we fetch the latest content for you.</p>
    </div>
  </div>
));

LoadingComponent.displayName = 'LoadingComponent';

// Enhanced error component with retry functionality
interface ErrorComponentProps {
  error: BlogError | null;
  backToPath: string;
}

const ErrorComponent = memo<ErrorComponentProps>(({ error, backToPath }) => (
  <div className="min-h-screen flex items-center justify-center bg-white px-4">
    <div className="text-center max-w-md mx-auto">
      <div className="mb-6">
        <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {error?.type === 'NOT_FOUND' ? 'Post Not Found' : 'Something Went Wrong'}
        </h2>
        <p className="text-gray-600 mb-6">
          {error?.message || 'We couldn\'t load this blog post. Please try again later.'}
        </p>
      </div>
      <div className="space-y-3">
        <Link to={backToPath}>
          <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to Blog
          </Button>
        </Link>
        <Button 
          variant="outline" 
          onClick={() => window.location.reload()}
          className="w-full border-red-200 text-red-600 hover:bg-red-50"
        >
          Try Again
        </Button>
      </div>
    </div>
  </div>
));

ErrorComponent.displayName = 'ErrorComponent';

// Navigation header component
interface BlogNavigationHeaderProps {
  backToPath: string;
  onShare: () => void;
  postTitle: string;
}

const BlogNavigationHeader = memo<BlogNavigationHeaderProps>(({ 
  backToPath, 
  onShare, 
  postTitle 
}) => (
  <motion.header 
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between">
        <Link 
          to={backToPath} 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Insights</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onShare}
            className="border-red-200 text-red-600 hover:bg-red-50"
            aria-label={`Share article: ${postTitle}`}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>
    </div>
  </motion.header>
));

BlogNavigationHeader.displayName = 'BlogNavigationHeader';

// Hero section component
interface BlogHeroSectionProps {
  post: BlogPost;
}

const BlogHeroSection = memo<BlogHeroSectionProps & { hideTitle?: boolean }>(({ post, hideTitle }) => (
  <motion.section 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    className="relative"
  >
    <div className="relative h-[40vh] sm:h-[45vh] md:h-[50vh] lg:h-[60vh] xl:h-[65vh] overflow-hidden flex items-center justify-center">
      <img
        src={post.featured_image || '/default-blog-image.jpg'}
        alt={post.title}
        className="w-full h-full object-cover absolute inset-0 z-0"
        loading="eager"
      />
      {/* Only show title/category if not hidden */}
      {!hideTitle && (
        <div className="relative z-20 w-full flex justify-center items-center h-full">
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="max-w-4xl"
            >
              <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-red-500 text-white rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 shadow-lg">
                {post.category}
              </span>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight sm:leading-snug md:leading-normal">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center justify-start gap-4 sm:gap-6 text-white/90 text-sm sm:text-base">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <time dateTime={post.publish_date} className="font-medium">
                    {formatDate(post.publish_date)}
                  </time>
                </div>
                {post.read_time && (
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="font-medium">{post.read_time} min read</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  </motion.section>
));

BlogHeroSection.displayName = 'BlogHeroSection';

// Blog content section component
interface BlogContentSectionProps {
  post: BlogPost;
}

const BlogContentSection = memo<BlogContentSectionProps>(({ post }) => (
  <motion.article 
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.4, duration: 0.6 }}
    className="lg:col-span-8"
  >
    {/* Article Content */}
    <div
      className={`${styles.blogContent} prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-red-500 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-blockquote:border-red-500 prose-blockquote:bg-red-50 prose-blockquote:text-gray-800 w-full break-words`}
      style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
      dangerouslySetInnerHTML={{ __html: post.content }}
    />
  </motion.article>
));

BlogContentSection.displayName = 'BlogContentSection';

// Blog sidebar component
interface BlogSidebarProps {
  post: BlogPost;
}

const BlogSidebar = memo<BlogSidebarProps>(({ post }) => (
  <motion.aside 
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.5, duration: 0.6 }}
    className="lg:col-span-4"
  >
    <div className="sticky top-24 space-y-8">
      {/* Author Info */}
      {(post.author_name || post.author_bio) && (
        <div className="relative overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-sm">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent opacity-50" 
            style={{ 
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(239, 68, 68, 0.1) 1px, transparent 0)`,
              backgroundSize: '24px 24px' 
            }}>
          </div>
          
          <div className="relative p-8">
            <div className="flex flex-col items-center text-center">
              {/* Avatar with decorative elements */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl blur-2xl opacity-10 transform -rotate-6"></div>
                <div className="relative">
                  <div className="w-28 h-28 rounded-2xl overflow-hidden ring-4 ring-white shadow-xl transform transition-transform duration-300 hover:scale-105">
                    <img 
                      src={post.author_avatar || "https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/general/RMLogo.webp"}
                      alt={post.author_name || 'Author'} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Decorative dots */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-red-500/10 rounded-full"></div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-red-500/10 rounded-full"></div>
                </div>
              </div>

              <div className="space-y-4 relative">
                {/* Title with decorative line */}
                <div className="flex items-center justify-center gap-3 mb-6">
                  <span className="h-px w-8 bg-red-200"></span>
                  <h4 className="font-bold text-gray-900 uppercase tracking-wider text-sm">About the Author</h4>
                  <span className="h-px w-8 bg-red-200"></span>
                </div>

                {post.author_name && (
                  <h5 className="text-2xl font-bold text-gray-900 mb-2">{post.author_name}</h5>
                )}
                {post.author_bio && (
                  <p className="text-gray-600 leading-relaxed max-w-sm mx-auto text-sm">{post.author_bio}</p>
                )}

                {/* Social links with enhanced styling */}
                {(post.author_linkedin || post.author_twitter || post.author_github) && (
                  <div className="pt-6 mt-6 border-t border-gray-100/50">
                    <div className="flex items-center justify-center gap-6">
                      {post.author_linkedin && (
                        <motion.a 
                          href={post.author_linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative"
                          aria-label={`${post.author_name}'s LinkedIn profile`}
                          whileHover={{ y: -2 }}
                        >
                          <div className="absolute inset-0 bg-red-100 rounded-lg blur-md opacity-0 group-hover:opacity-70 transition-opacity"></div>
                          <Linkedin className="w-5 h-5 text-gray-600 group-hover:text-red-500 transition-colors relative z-10" />
                        </motion.a>
                      )}
                      {post.author_twitter && (
                        <motion.a 
                          href={post.author_twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative"
                          aria-label={`${post.author_name}'s Twitter profile`}
                          whileHover={{ y: -2 }}
                        >
                          <div className="absolute inset-0 bg-red-100 rounded-lg blur-md opacity-0 group-hover:opacity-70 transition-opacity"></div>
                          <Twitter className="w-5 h-5 text-gray-600 group-hover:text-red-500 transition-colors relative z-10" />
                        </motion.a>
                      )}
                      {post.author_github && (
                        <motion.a 
                          href={post.author_github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative"
                          aria-label={`${post.author_name}'s GitHub profile`}
                          whileHover={{ y: -2 }}
                        >
                          <div className="absolute inset-0 bg-red-100 rounded-lg blur-md opacity-0 group-hover:opacity-70 transition-opacity"></div>
                          <Github className="w-5 h-5 text-gray-600 group-hover:text-red-500 transition-colors relative z-10" />
                        </motion.a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Article Stats */}
      <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <h4 className="font-bold text-gray-900 mb-4">Article Stats</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Published</span>
            <time 
              dateTime={post.publish_date}
              className="font-medium text-gray-900"
            >
              {formatShortDate(post.publish_date)}
            </time>
          </div>
          {post.read_time && (
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Read time</span>
              <span className="font-medium text-gray-900">{post.read_time} min</span>
            </div>
          )}
        </div>
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-900 mb-4">Tags</h4>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag: string, index: number) => (
              <span
                key={`${tag}-${index}`}
                className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium border border-blue-100"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  </motion.aside>
));

BlogSidebar.displayName = 'BlogSidebar';

// Related posts section component
interface RelatedPostsSectionProps {
  relatedPosts: BlogPost[];
  loading: boolean;
  backToPath: string;
}

const RelatedPostsSection = memo<RelatedPostsSectionProps>(({ 
  relatedPosts, 
  loading, 
}) => {
  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Related Articles</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="bg-gray-200 h-4 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <AnimatePresence>
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
            <div className="text-center mt-12">
                <Link
                  to={
                  location.pathname.startsWith("/corporate/recruitment/blogs")
                    ? "/corporate/recruitment/blogs"
                    : location.pathname.startsWith("/corporate/training/blogs")
                    ? "/corporate/training/blogs"
                    : "/blogs"
                  }
                  className="inline-block"
                >
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
    </AnimatePresence>
  );
});

RelatedPostsSection.displayName = 'RelatedPostsSection';
export default memo(BlogDetail);
