import { Link, useLocation } from "react-router-dom";
import { Calendar } from "lucide-react";

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
  // author_name: string | null;
  author_bio: string | null;
  author_avatar: string | null;
  read_time: number | null;
  tags: string[] | null;
  key_points: string[] | null;
  publish_date: string;
  created_at: string;
  updated_at: string;
}

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  const location = useLocation();
  
  // Determine if we're in the teacher or student section
  const isTeacherSection = location.pathname.includes('/school/teacher');
  
  // Set the link based on the current section
  const blogDetailLink = isTeacherSection 
    ? `/school/teacher/blogs/${post.slug}` 
    : `/school/student/blogs/${post.slug}`;
  return (
    <Link to={blogDetailLink} className="block group focus:outline-none h-full">
      <article className="blog-card shadow-lg border rounded-2xl overflow-hidden bg-white/90 hover:shadow-2xl transition-shadow duration-300 cursor-pointer h-full flex flex-col">
        <div className="relative overflow-hidden flex-shrink-0">
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
            <div className="flex items-center gap-4">
              {/* Optionally add author or read time here */}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.publish_date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
