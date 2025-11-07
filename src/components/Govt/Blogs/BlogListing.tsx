import { useState, useMemo, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import BlogCard from "./BlogCard";
import SearchAndFilter from "./SearchAndFilter";
import Pagination from "./Pagination";
import GovernmentHeader from "@/components/Header/GovernmentHeader";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "react-router-dom";

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

const BlogListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const location = useLocation();
    // Determine default category and subcategory based on URL path
  useEffect(() => {
    let subcategory = "all";
    
    if (location.pathname.includes("/school/student/blogs")) {
      subcategory = "Students";
    } else if (location.pathname.includes("/school/teacher/blogs")) {
      subcategory = "Teachers";
    } else if (location.pathname.includes("/government/blogs")) {
      // For government blogs, we want to set the category to Government
      setSelectedCategory("government");
    }
    
    setSelectedSubcategory(subcategory);
  }, [location.pathname]);
  
  const postsPerPage = 9;  // Fetch blog posts from Supabase
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        
        // Start building the query
        let query = supabase
          .from('blog_posts')
          .select('*');
        
        // If we're on the government blogs page, filter by Government category OR wildcard
        if (location.pathname.includes("/government/blogs")) {
          query = query.or('category.eq.Government,category.eq.*');
        } else if (location.pathname.includes("/school/student/blogs")) {
          query = query.eq('subcategory', 'Students');
        } else if (location.pathname.includes("/school/teacher/blogs")) {
          query = query.eq('subcategory', 'Teachers');
        }
        
        // Execute the query with ordering
        const { data, error } = await query.order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching blog posts:', error);
          toast({
            title: "Error",
            description: "Failed to load blog posts. Please try again.",
            variant: "destructive",
          });
          return;
        }

        setBlogPosts(data || []);
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

    fetchBlogPosts();
  }, [toast, location.pathname]);
  // We've replaced this with the URL-based filtering in the useEffect at the beginning
  const filteredPosts = useMemo(() => {
    // Determine if we need to enforce specific filters based on URL path
    let enforceSubcategory: string | null = null;
    let enforceCategory: string | null = null;
    
    if (location.pathname.includes("/school/student/blogs")) {
      enforceSubcategory = "Students";
    } else if (location.pathname.includes("/school/teacher/blogs")) {
      enforceSubcategory = "Teachers";
    } else if (location.pathname.includes("/government/blogs")) {
      enforceCategory = "government";
    }
    
    return blogPosts.filter((post: BlogPost) => {
      // Wildcard category "*" shows on all pages
      if (post.category === "*") {
        // Only filter by search query for wildcard posts
        const matchesSearch = searchQuery === "" || 
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.content.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
      }
      
      const matchesSearch = searchQuery === "" || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Handle category matching - enforce Government category if on government pages
      const matchesCategory = enforceCategory 
        ? post.category.toLowerCase() === enforceCategory.toLowerCase()
        : selectedCategory === "all" || post.category.toLowerCase() === selectedCategory.toLowerCase();
      
      // Use enforced subcategory if we're on a specific path
      const matchesSubcategory = enforceSubcategory 
        ? post.subcategory === enforceSubcategory
        : selectedSubcategory === "all" || post.subcategory === selectedSubcategory;
      
      return matchesSearch && matchesCategory && matchesSubcategory;
    });
  }, [searchQuery, selectedCategory, selectedSubcategory, blogPosts, location.pathname]);

  // Sort posts by first tag alphabetically (if tags exist)
  const sortedPosts = filteredPosts.slice().sort((a, b) => {
    const tagA = a.tags?.[0] || '';
    const tagB = b.tags?.[0] || '';
    return tagA.localeCompare(tagB);
  });

  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = sortedPosts.slice(startIndex, startIndex + postsPerPage);

  // Count of all posts in the selected subcategory (from all blogPosts)
  const subcategoryTotal = selectedSubcategory === "all"
    ? blogPosts.length
    : blogPosts.filter(post => post.subcategory === selectedSubcategory).length;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory("all");
    setCurrentPage(1);
  };

  const handleSubcategoryFilter = (subcategory: string) => {
    setSelectedSubcategory(subcategory);
    setCurrentPage(1);
  };

  return (
    <>
    <GovernmentHeader />
    
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-background to-olive-50 mt-[80px]">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-olive-600/20 to-sage-600/20"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3')] bg-cover bg-center opacity-10"></div>
          <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-foreground mb-6">
            {location.pathname.includes("/government/blogs") 
              ? "Government Insights Hub" 
              : "Insights & Knowledge Hub"}
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            {location.pathname.includes("/government/blogs") 
              ? "Discover research-backed articles and insights on government initiatives, policy frameworks, and public sector innovations. Stay informed with our curated content for government professionals."
              : "Explore expert insights on sustainability, ESG frameworks, and environmental management. Stay informed with the latest trends and best practices in corporate sustainability."}
          </p>
          
          <SearchAndFilter
            onSearch={handleSearch}
            onCategoryFilter={handleCategoryFilter}
            onSubcategoryFilter={handleSubcategoryFilter}
            selectedCategory={selectedCategory}
            selectedSubcategory={selectedSubcategory}
          />
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Results Header */}
          <div className="mb-8">
            <p className="text-muted-foreground">
              Showing {filteredPosts.length} of {subcategoryTotal} articles
              {selectedSubcategory !== "all" && (
                <span className="ml-2">
                  in <span className="font-semibold text-foreground">{selectedSubcategory.charAt(0).toUpperCase() + selectedSubcategory.slice(1)}</span>
                </span>
              )}
              {searchQuery && (
                <span className="ml-2">
                  for "<span className="font-medium text-foreground">{searchQuery}</span>"
                </span>
              )}
            </p>
          </div>          {/* Blog Grid */}
          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent"></div>
              <p className="text-gray-600 animate-pulse">Loading articles...</p>
            </div>
          ) : currentPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {currentPosts.map((post: BlogPost) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="font-playfair text-2xl font-semibold text-foreground mb-4">
                No articles found
              </h3>
              <p className="text-muted-foreground mb-8">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
            </div>
          )}

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </section>
    </div>
    </>
  );
};

export default BlogListing;
