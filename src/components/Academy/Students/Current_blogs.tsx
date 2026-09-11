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
    const fetchStudentBlogs = async () => {
      try {
        setLoading(true);
        
        // Fetch blog posts from Supabase where subcategory is "Students"
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('subcategory', 'Students')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching Student blogs:', error);
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

    fetchStudentBlogs();
  }, []);
  return (
    <section className="w-full min-w-0 py-12 bg-white relative z-10" style={{ backdropFilter: 'none', WebkitBackdropFilter: 'none' }}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
         <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center mb-10 px-4 md:px-8 py-4 relative z-20">
            Current <span className="text-red-600">Student</span> Blogs
          </h2> 
        
        <div className="relative z-10">
          {loading ? (
            <div className="text-center py-10">Loading blogs...</div>
          ) : error ? (
            <div className="text-center py-10 text-red-500">{error}</div>
          ) : blogPosts.length === 0 ? (
            <div className="text-center py-10">No student blogs available at this time.</div>
          ) : (
            <div className="flex flex-wrap justify-center gap-8">
              {blogPosts.map((post) => (
                <div 
                  key={post.id} 
                  className={`w-full min-w-0 max-w-[500px] ${blogPosts.length > 1 ? 'md:w-[calc((100%_-_2rem)/2)] lg:w-[calc((100%_-_4rem)/3)]' : ''}`}
                >
                  <BlogCard post={post} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// BlogCard Component
const BlogCard = ({ post }: { post: BlogPost }) => {
  return (
    <Link to={`/school/student/blogs/${post.slug}`} className="block h-full min-w-0 group rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600">
      <article className="blog-card shadow-lg border rounded-2xl overflow-hidden bg-white hover:shadow-2xl transition-shadow duration-300 cursor-pointer h-full flex flex-col">
        <div className="relative overflow-hidden shrink-0">
          <img
            src={post.featured_image || '/default-blog-image.jpg'}
            alt={post.title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110 group-hover:brightness-90"
          />
        </div>
        <div className="p-5 sm:p-6 min-w-0 flex-grow flex flex-col">
          {Array.isArray(post.tags) && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag, idx) => (
                <span key={idx} className="max-w-full break-words bg-red-50 text-red-700 px-3 py-1 rounded-2xl text-xs font-semibold">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h3 className="font-playfair text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors duration-200 break-words">
            {post.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-3 break-words leading-relaxed flex-grow">
            {post.excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500 mt-auto">
            <div className="flex min-w-0 items-center gap-2">
              {post.author_name && (
                <>
                  <User className="w-3 h-3 shrink-0" />
                  <span className="break-words min-w-0">{post.author_name}</span>
                </>
              )}
            </div>
            {Boolean(post.read_time) && (
              <div className="flex items-center gap-2 whitespace-nowrap">
                <>
                  <Clock className="w-3 h-3" />
                  <span>{post.read_time} min</span>
                </>
              </div>
            )}
            <div className="flex items-center gap-1 whitespace-nowrap">
              <Calendar className="w-3 h-3 shrink-0" />
              <span>{new Date(post.publish_date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default CurrentBlogs;
