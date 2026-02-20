// Course data and operations
import type { Course } from '@/types/sdp/course.types';

// Re-export from coursesData for now (can be replaced with API calls later)
export { 
  getCoursesByService, 
  getCourseBySlug, 
  getRelatedCourses,
  serviceNames 
} from '@/data/coursesData';

// Future: Add API-based course fetching
// export const fetchCourses = async (serviceType: string): Promise<Course[]> => {
//   const response = await fetch(`/api/courses?serviceType=${serviceType}`);
//   return response.json();
// };

// Future: Search courses
// export const searchCourses = async (query: string): Promise<Course[]> => {
//   const response = await fetch(`/api/courses/search?q=${query}`);
//   return response.json();
// };
