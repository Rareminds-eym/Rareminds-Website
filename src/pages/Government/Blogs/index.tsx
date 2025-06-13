import { useParams } from "react-router-dom";
import BlogListing from "../../../components/Govt/Blogs/BlogListing";
import BlogDetailGov from "../../../components/Govt/Blogs/BlogDetail";

const Blogs: React.FC = () => {
  const { slug } = useParams();

  return slug ? (
    <BlogDetailGov />
  ) : (
    <BlogListing />
  );
};

export default Blogs;
