import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import { Blog } from "@/types/Blog";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Clock, Share2, Tag } from "lucide-react";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) throw error;
      setBlog(data);
    } catch (error: any) {
      console.error("Error fetching blog:", error);
      toast({
        title: "Error",
        description: "Failed to load blog post. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
        <Link
          to="/corporate/recruitment/blogs"
          className="text-blue-600 hover:underline flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Link */}
        <Link
          to="/corporate/recruitment/blogs"
          className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blogs
        </Link>

        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-72 object-cover rounded-2xl mb-8"
          />
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              {blog.category}
            </span>
            <div className="flex items-center text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              {blog.readTime} min read
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {blog.title}
          </h1>
          
          {/* Author Info */}
          <div className="flex items-center gap-4 mb-8">
            <img
              src={blog.author.avatar}
              alt={blog.author.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-medium text-gray-900">{blog.author.name}</p>
              <p className="text-sm text-gray-500">
                {new Date(blog.publishedAt).toLocaleDateString()} • {blog.author.role}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="border-t border-gray-200 pt-8">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-4 h-4 text-gray-500" />
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Share Button */}
        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            toast({
              title: "Link Copied!",
              description: "The blog post link has been copied to your clipboard.",
            });
          }}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>
    </article>
  );
};

export default BlogPost;
