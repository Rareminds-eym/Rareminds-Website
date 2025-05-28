import { useParams } from "react-router-dom";
import Course from "../../../components/Academy/Students/courses/course";

const CoursePage = () => {
  const { name } = useParams(); 

  return <Course courseName={name} />;  
};

export default CoursePage;
