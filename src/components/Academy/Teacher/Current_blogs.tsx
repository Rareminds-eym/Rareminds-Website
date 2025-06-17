import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Link } from "react-router-dom";
import { Calendar, Clock, User } from "lucide-react";

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

const CurrentBlogs = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchTeacherBlogs = async () => {
      try {
        setLoading(true);
        
        // Fetch blog posts from Supabase where subcategory is "Teachers"
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('subcategory', 'Teachers')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching Teacher blogs:', error);
          setError("Failed to load blog posts. Please try again.");
          return;
        }

        setBlogPosts(data || []);
      } catch (error) {
        console.error('Error:', error);
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherBlogs();
  }, []);
  // If loading, error, or no blogs, return null (don't render anything)
  if (loading || error || blogPosts.length === 0) {
    return null;
  }  return (
    <section className="py-12 bg-white relative z-10" style={{ backdropFilter: 'none', WebkitBackdropFilter: 'none' }}>
      <div className="container mx-auto px-4 relative z-10">
        <div className="absolute inset-0 bg-white opacity-100 z-5"></div>
        <div className="relative z-10 ">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center mb-10 px-4 md:px-8 py-4">
            Current <span className="">Teacher</span> Blogs
          </h2>
          <div className="flex flex-wrap justify-center gap-8 mt-8 ">
            {blogPosts.map((post) => (
              <div 
                key={post.id} 
                className={`w-full ${blogPosts.length === 1 ? 'md:w-2/3 lg:w-1/2' : 'md:w-[calc(50%-1rem)] lg:w-[calc(40%-1.33rem)]'}`}
                style={{
                  maxWidth: blogPosts.length === 1 ? '700px' : undefined
                }}
              >
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// BlogCard Component
const BlogCard = ({ post }: { post: BlogPost }) => {
  return (
    <Link to={`/school/teacher/blogs/${post.slug}`} className="block group focus:outline-none  ">
      <article className="blog-card shadow-lg border rounded-2xl overflow-hidden bg-white hover:shadow-2xl transition-shadow duration-300 cursor-pointer h-full flex flex-col">
        <div className="relative overflow-hidden">
          <img
            src={post.featured_image || '/default-blog-image.jpg'}
            alt={post.title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110 group-hover:brightness-90"
          />
          <div className="absolute top-4 left-4">
            <span className="category-badge flex flex-wrap gap-1">
              {Array.isArray(post.tags) && post.tags.length > 0
                ? post.tags.map((tag, idx) => (
                    <span key={idx} className="bg-red-500/80 text-white px-2 py-1 rounded-3xl mr-1 mb-1 text-xs font-semibold shadow">
                      {tag}
                    </span>
                  ))
                : null}
            </span>
          </div>
        </div>
        <div className="p-6 flex-grow flex flex-col">
          <h3 className="font-playfair text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors duration-200 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed flex-grow">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
            <div className="flex items-center gap-2">
              {post.author_name && (
                <>
                  <User className="w-3 h-3" />
                  <span>{post.author_name}</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              {post.read_time && (
                <>
                  <Clock className="w-3 h-3" />
                  <span>{post.read_time} min</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{new Date(post.publish_date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default CurrentBlogs;
