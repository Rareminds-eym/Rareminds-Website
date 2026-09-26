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

// `publish_date` is sometimes missing/empty on older posts. Guard against
// rendering "Invalid Date" (or the 1/1/1970 epoch from a null/empty string)
// so a card with no real date shows nothing instead of garbage text.
const getFormattedPublishDate = (publishDate: string | null | undefined): string | null => {
  if (!publishDate) return null;
  const parsed = new Date(publishDate);
  return Number.isNaN(parsed.getTime()) ? null : parsed.toLocaleDateString();
};

const BlogCard = ({ post }: BlogCardProps) => {
  const displayTags = getDisplayTags(post.tags);
  const formattedDate = getFormattedPublishDate(post.publish_date);
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
      {displayTags.length > 0 && (
        <div className="px-6 pt-3 pb-1">
          <span className="category-badge flex flex-wrap gap-2">
            {displayTags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-red-500/80 text-white px-3 py-1 rounded-3xl text-xs font-semibold shadow max-w-full truncate inline-block"
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
        <div className="flex items-center justify-between text-xs text-gray-500 flex-shrink-0 mt-auto pt-2 min-h-[1.5rem]">
        <div className="flex items-center gap-4">
          {/* Optionally add author or read time here */}
        </div>
        {formattedDate && (
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>
        )}
        </div>
      </div>
      </article>
    </Link>
  );
};

export default BlogCard;
