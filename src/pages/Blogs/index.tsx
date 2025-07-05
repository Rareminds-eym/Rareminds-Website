import { useState, useMemo, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
import BlogCard from "./BlogCard";
import SearchAndFilter from "./SearchAndFilter";
import Pagination from "./Pagination";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

/**
 * Blog post interface matching Supabase schema
 */
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

/**
 * Filter configuration based on URL paths
 */
const URL_FILTERS = {
  STUDENT: "/school/student/blogs",
  TEACHER: "/school/teacher/blogs",
} as const;

const SUBCATEGORIES = {
  STUDENTS: "Students",
  TEACHERS: "Teachers",
  ALL: "all",
} as const;

const POSTS_PER_PAGE = 9;

/**
 * Blogs component - Professional blog listing with search, filtering, and pagination
 * Features:
 * - URL-based routing and filtering
 * - Search functionality across title, excerpt, and content
 * - Category and subcategory filtering
 * - Responsive pagination
 * - Error handling and loading states
 * - Performance optimizations with memoization
 */
const Blogs: React.FC = () => {
  // State management
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Hooks
  const { toast } = useToast();
  const location = useLocation();
  
  /**
   * Determines subcategory based on URL path
   */
  const getSubcategoryFromPath = useCallback((pathname: string): string => {
    if (pathname.startsWith("/corporate")) {
      return "__CORPORATE__";
    }
    if (pathname.includes(URL_FILTERS.STUDENT)) {
      return SUBCATEGORIES.STUDENTS;
    }
    if (pathname.includes(URL_FILTERS.TEACHER)) {
      return SUBCATEGORIES.TEACHERS;
    }
    return SUBCATEGORIES.ALL;
  }, []);
  
  /**
   * Handles category filter with subcategory reset
   */
  const handleCategoryFilter = useCallback((category: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory(SUBCATEGORIES.ALL);
    setCurrentPage(1);
  }, []);

  /**
   * Handles subcategory filter with page reset
   */
  const handleSubcategoryFilter = useCallback((subcategory: string) => {
    setSelectedSubcategory(subcategory);
    setCurrentPage(1);
  }, []);
  
  /**
   * Fetches blog posts from Supabase with error handling
   */
  const fetchBlogPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: supabaseError } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }

      setBlogPosts(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load blog posts';
      setError(errorMessage);
      console.error('Error fetching blog posts:', err);
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);
  
  // Set subcategory based on URL path
  useEffect(() => {
    const subcategory = getSubcategoryFromPath(location.pathname);
    setSelectedSubcategory(subcategory);
  }, [location.pathname, getSubcategoryFromPath]);
  
  // Fetch blog posts on component mount
  useEffect(() => {
    fetchBlogPosts();
  }, [fetchBlogPosts]);

  
  /**
   * Memoized filtered posts with improved search algorithm
   */
  const filteredPosts = useMemo(() => {
    const enforceSubcategory = getSubcategoryFromPath(location.pathname);
    const isCorporate = enforceSubcategory === "__CORPORATE__";

    return blogPosts.filter((post: BlogPost) => {
      // Optimized search with case-insensitive matching
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery || [
        post.title,
        post.excerpt,
        post.content,
        ...(post.tags || [])
      ].some(field => field?.toLowerCase().includes(searchLower));

      // Category matching
      const matchesCategory = isCorporate
        ? post.category.toLowerCase() === "corporate"
        : selectedCategory === "all" || post.category.toLowerCase() === selectedCategory.toLowerCase();

      // Subcategory matching with URL enforcement
      const effectiveSubcategory = isCorporate
        ? SUBCATEGORIES.ALL
        : enforceSubcategory !== SUBCATEGORIES.ALL 
          ? enforceSubcategory 
          : selectedSubcategory;
      const matchesSubcategory = effectiveSubcategory === SUBCATEGORIES.ALL || 
        post.subcategory === effectiveSubcategory;

      return matchesSearch && matchesCategory && matchesSubcategory;
    });
  }, [searchQuery, selectedCategory, selectedSubcategory, blogPosts, location.pathname, getSubcategoryFromPath]);

  /**
   * Memoized sorted posts with improved sorting logic
   */
  const sortedPosts = useMemo(() => {
    return [...filteredPosts].sort((a, b) => {
      // Primary sort by first tag, fallback to title
      const tagA = a.tags?.[0]?.toLowerCase() || a.title.toLowerCase();
      const tagB = b.tags?.[0]?.toLowerCase() || b.title.toLowerCase();
      return tagA.localeCompare(tagB);
    });
  }, [filteredPosts]);

  /**
   * Memoized pagination calculations
   */
  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const currentPosts = sortedPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
    
    return {
      totalPages,
      currentPosts,
      totalResults: sortedPosts.length
    };
  }, [sortedPosts, currentPage]);

  /**
   * Memoized subcategory statistics
   */
  const subcategoryStats = useMemo(() => {
    const total = selectedSubcategory === SUBCATEGORIES.ALL
      ? blogPosts.length
      : blogPosts.filter(post => post.subcategory === selectedSubcategory).length;
      
    return { total };
  }, [blogPosts, selectedSubcategory]);

  // Early return for error state
  if (error && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchBlogPosts}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Rareminds Blog | Talent & Hiring Insights</title>
        <meta name="description" content="Stay updated with data-driven insights on recruitment, talent strategy, culture fit, leadership hiring & workforce trends from the Rareminds team." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-sage-50 via-background to-olive-50">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-olive-600/20 to-sage-600/20" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3')] bg-cover bg-center opacity-10" />
          
          <div className="relative max-w-7xl mx-auto text-center">
            <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Insights & Knowledge Hub
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Explore expert insights on sustainability, ESG frameworks, and environmental management. 
              Stay informed with the latest trends and best practices in corporate sustainability.
            </p>
            
            <SearchAndFilter
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onCategoryFilter={handleCategoryFilter}
              onSubcategoryFilter={handleSubcategoryFilter}
              selectedCategory={selectedCategory}
              selectedSubcategory={selectedSubcategory}
            />
          </div>
        </section>

        {/* Main Content Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Results Header */}
            <div className="mb-8">
              <p className="text-muted-foreground">
                Showing {paginationData.totalResults} of {subcategoryStats.total} articles
                {selectedSubcategory !== SUBCATEGORIES.ALL && selectedSubcategory !== "__CORPORATE__" && (
                  <span className="ml-2">
                    in <span className="font-semibold text-foreground">
                      {selectedSubcategory.charAt(0).toUpperCase() + selectedSubcategory.slice(1)}
                    </span>
                  </span>
                )}
                {selectedSubcategory === "__CORPORATE__" && (
                  <span className="ml-2">
                    in <span className="font-semibold text-foreground">Corporate</span>
                  </span>
                )}
                {searchQuery && (
                  <span className="ml-2">
                    for "<span className="font-medium text-foreground">{searchQuery}</span>"
                  </span>
                )}
              </p>
            </div>

            {/* Content Area */}
            {loading ? (
              <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent" />
                <p className="text-gray-600 animate-pulse">Loading articles...</p>
              </div>
            ) : paginationData.currentPosts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                  {paginationData.currentPosts.map((post: BlogPost) => (
                    <div key={post.id} className="h-[400px] flex">
                      <BlogCard post={post} />
                    </div>
                  ))}
                </div>
                
                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={paginationData.totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            ) : (
              <div className="text-center py-16">
                <h3 className="font-playfair text-2xl font-semibold text-foreground mb-4">
                  No articles found
                </h3>
                <p className="text-muted-foreground mb-8">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Blogs;
