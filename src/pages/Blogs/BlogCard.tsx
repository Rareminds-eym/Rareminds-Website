import { Link, useLocation } from "react-router-dom";
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
  return (
    <Link
      to={
      window.location.pathname.startsWith("/corporate/recruitment/")
        ? `/corporate/recruitment/blogs/${post.slug}`
        : window.location.pathname.startsWith("/corporate/training/")
        ? `/corporate/training/blogs/${post.slug}`
        : `/blogs/${post.slug}`
      }
      className="block group focus:outline-none w-full h-full"
    >
      <article className="blog-card shadow-lg border rounded-2xl overflow-hidden bg-white/90 hover:shadow-2xl transition-shadow duration-300 cursor-pointer h-full flex flex-col">
      <div className="relative overflow-hidden flex-shrink-0">
        <img
        src={post.featured_image || "/default-blog-image.jpg"}
        alt={post.title}
        className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110 group-hover:brightness-90"
        />
      </div>
      {/* Tags below the image */}
      {Array.isArray(post.tags) && post.tags.length > 0 && (
        <div className="px-6 pt-3 pb-1">
          <span
            className="category-badge flex flex-nowrap gap-2 overflow-x-auto hide-scrollbar"
            style={{ cursor: 'grab' }}
            onMouseDown={e => {
              const el = e.currentTarget;
              let startX = e.pageX;
              let scrollLeft = el.scrollLeft;
              let isDragging = false;

              const onMouseMove = (moveEvent: MouseEvent) => {
                isDragging = true;
                const x = moveEvent.pageX;
                el.scrollLeft = scrollLeft - (x - startX);
              };
              const onMouseUp = () => {
                el.style.cursor = 'grab';
                window.removeEventListener('mousemove', onMouseMove);
                window.removeEventListener('mouseup', onMouseUp);
                setTimeout(() => { isDragging = false; }, 0);
              };
              el.style.cursor = 'grabbing';
              window.addEventListener('mousemove', onMouseMove);
              window.addEventListener('mouseup', onMouseUp);
            }}
            onClick={e => {
              // Prevent click event if it was a drag
              if (typeof window !== 'undefined' && window.getSelection()?.toString() === '') {
                e.preventDefault();
              }
            }}
          >
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-red-500/80 text-white px-3 py-1 rounded-3xl text-xs font-semibold shadow whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
          </span>
        </div>
      )}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="font-playfair text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors duration-200 line-clamp-2 flex-shrink-0">
        {post.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed flex-1">
        {post.excerpt.length > 140 ? post.excerpt.slice(0, 140) + '...' : post.excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500 flex-shrink-0 mt-auto">
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
