import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import { Blog } from "@/types/Blog";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Search, Tag, TrendingUp, Filter, Calendar } from "lucide-react";
import useDebounce from "@/hooks/use-debounce";

const BlogsPage = () => {
  const { toast } = useToast();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"latest" | "popular">("latest");
  const [featuredBlog, setFeaturedBlog] = useState<Blog | null>(null);
  const debouncedSearch = useDebounce(searchQuery, 500);

  const categories = [
    "Recruitment",
    "HR Technology",
    "Talent Management",
    "Industry Insights",
    "Case Studies",
  ];

  useEffect(() => {
    fetchBlogs();
  }, [debouncedSearch, selectedCategory, sortBy]);

  const fetchBlogs = async () => {
    try {
      let query = supabase
        .from("blogs")
        .select("*")
        .order(sortBy === "latest" ? "publishedAt" : "views", { ascending: false });

      if (debouncedSearch) {
        query = query.or(
          `title.ilike.%${debouncedSearch}%,content.ilike.%${debouncedSearch}%`
        );
      }

      if (selectedCategory) {
        query = query.eq("category", selectedCategory);
      }

      const { data, error } = await query;

      if (error) throw error;
      
      // Set featured blog (most recent or most viewed)
      if (data && data.length > 0) {
        setFeaturedBlog(data[0]);
        setBlogs(data.slice(1));
      } else {
        setBlogs([]);
        setFeaturedBlog(null);
      }
    } catch (error: any) {
      console.error("Error fetching blogs:", error);
      toast({
        title: "Error",
        description: "Failed to load blog posts. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-blue-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-800 opacity-90" />
        <div className="absolute inset-0 bg-[url('/path/to/pattern.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Rareminds Insights
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
              Explore expert insights on recruitment, talent management, and HR technology
              to build and nurture exceptional teams.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filters */}
        <div className="mb-12 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="w-full lg:w-96">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Filter by:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all
                      ${category === selectedCategory
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-4 ml-4 border-l pl-4">
                <span className="text-sm font-medium text-gray-700">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "latest" | "popular")}
                  className="bg-white border-2 border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="latest">Latest</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Blog */}
        {!loading && featuredBlog && (
          <motion.div {...fadeInUp} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              {sortBy === "latest" ? "Latest Article" : "Featured Article"}
            </h2>
            <Link
              to={`/corporate/recruitment/blogs/${featuredBlog.slug}`}
              className="block group"
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative overflow-hidden">
                    <img
                      src={featuredBlog.coverImage}
                      alt={featuredBlog.title}
                      className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-lg">
                        {featuredBlog.category}
                      </span>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        {featuredBlog.readTime} min read
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors">
                      {featuredBlog.title}
                    </h3>
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {featuredBlog.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center">
                        <img
                          src={featuredBlog.author.avatar}
                          alt={featuredBlog.author.name}
                          className="w-10 h-10 rounded-full mr-3 border-2 border-white shadow"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {featuredBlog.author.name}
                          </p>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(featuredBlog.publishedAt).toLocaleDateString(undefined, {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="group-hover:translate-x-2 transition-transform">
                        <ArrowRight className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Blog Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            <p className="text-gray-600 animate-pulse">Loading amazing content...</p>
          </div>
        ) : (
          <AnimatePresence>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <motion.article
                  key={blog.id}
                  {...fadeInUp}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <Link to={`/corporate/recruitment/blogs/${blog.slug}`}>
                    <div className="relative overflow-hidden">
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-lg">
                          {blog.category}
                        </span>
                        <div className="flex items-center text-gray-500 text-sm">
                          <Clock className="w-4 h-4 mr-1" />
                          {blog.readTime} min read
                        </div>
                      </div>
                      <h2 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {blog.title}
                      </h2>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {blog.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center">
                          <img
                            src={blog.author.avatar}
                            alt={blog.author.name}
                            className="w-8 h-8 rounded-full mr-2 border-2 border-white shadow"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {blog.author.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(blog.publishedAt).toLocaleDateString(undefined, {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="group-hover:translate-x-2 transition-transform">
                          <ArrowRight className="w-5 h-5 text-blue-600" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </AnimatePresence>
        )}

        {!loading && blogs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white rounded-2xl shadow-lg"
          >
            <div className="max-w-md mx-auto">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No blog posts found
              </h3>
              <p className="text-gray-600">
                {selectedCategory
                  ? `No articles found in the "${selectedCategory}" category.`
                  : "No articles match your search criteria."}
                {" "}Try adjusting your filters or search terms.
              </p>
              {(selectedCategory || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setSearchQuery("");
                  }}
                  className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BlogsPage;