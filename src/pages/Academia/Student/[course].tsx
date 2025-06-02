// import { useParams } from "react-router-dom";
// // import Course from "../../../components/Academy/Students/courses/course";
// import Courses from "../../../components/Academy/Students/Courses"
// const CoursePage = () => {
//   const { name } = useParams(); 

//   return <Courses coursetocontact={name} />;  
// };

// export default CoursePage;

import { useParams } from "react-router-dom";
import CourseDetail from "../../../components/Academy/Students/CourseDetail";

const CoursePage = () => {
  const { courseId } = useParams<{ courseId: string }>(); 

  return <CourseDetail />; // CourseDetail will get courseId from useParams internally
};

export default CoursePage;
