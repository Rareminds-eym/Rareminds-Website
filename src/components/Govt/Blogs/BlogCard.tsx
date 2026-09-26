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

// Some posts have `tags` stored as a single long keyword-dump string
// (comma- or multi-space-separated) instead of separate array entries,
// e.g. ["Future of Jobs India, Hybrid Careers, AI and Employment, ..."].
// Split any such entry into individual short tags before display, so a
// card never renders one oversized pill regardless of how the data was
// saved. Already-clean tags pass through unchanged.
const getDisplayTags = (tags: string[] | null | undefined, max = 2): string[] => {
  if (!Array.isArray(tags) || tags.length === 0) return [];

  return tags
    .flatMap((tag) => tag.split(/\s*,\s*|\s{2,}/))
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, max);
};

const BlogCard = ({ post }: BlogCardProps) => {
  const location = useLocation();
  const displayTags = getDisplayTags(post.tags);
  
  // Determine which section we're in
  const isTeacherSection = location.pathname.includes('/school/teacher');
  const isStudentSection = location.pathname.includes('/school/student');
  const isGovernmentSection = location.pathname.includes('/government');
  
  // Set the link based on the current section
  let blogDetailLink = '';
  
  if (isTeacherSection) {
    blogDetailLink = `/school/teacher/blogs/${post.slug}`;
  } else if (isStudentSection) {
    blogDetailLink = `/school/student/blogs/${post.slug}`;
  } else if (isGovernmentSection) {
    blogDetailLink = `/government/blogs/${post.slug}`;
  } else {
    // Default fallback
    blogDetailLink = `/blogs/${post.slug}`;
  }

  return (
    <article className="blog-card group shadow-lg border rounded-2xl">
      <div className="relative overflow-hidden">        <img
          src={post.featured_image || '/default-blog-image.jpg'}
          alt={post.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="category-badge  flex flex-wrap gap-1">
            {displayTags.map((tag, idx) => (
              <span key={idx} className=" bg-black/50  text-white px-2 py-1 rounded-3xl mb-1 text-xs font-medium max-w-full truncate inline-block">
                {tag}
              </span>
            ))}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <Link to={blogDetailLink}>
          <h3 className="font-playfair text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-200 line-clamp-2">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            {/* <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{post.author_name || 'Anonymous'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{post.read_time || 5} min read</span>
            </div> */}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(post.publish_date).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
