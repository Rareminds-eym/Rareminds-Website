import { useState } from "react";
import BlogListing from "../../../components/Academy/Blogs/BlogListing";
import BlogDetail from "../../../components/Academy/Blogs/BlogDetail";

const Blogs: React.FC = () => {
  const [showDetail, setShowDetail] = useState(false);

  // NOTE: Since BlogListing doesn't accept an onSelectBlog prop, you need to:
  // Option 1: Use React Router to navigate between listing and detail pages
  // e.g., If using React Router:
  // - BlogListing would use Link or useNavigate to redirect to /blogs/:slug
  // - This component would check for slug param and conditionally render BlogDetail

  // Option 2: Modify BlogListing.tsx to accept an onSelectBlog prop

  // For demonstration, using simple state toggle:
  return showDetail ? (
    <BlogDetail />
  ) : (
    // BlogListing needs to be modified to emit an event when a blog is selected
    <BlogListing />
  );
};

export default Blogs;
