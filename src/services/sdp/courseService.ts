// Course data and operations using Supabase
import { supabase } from '@/lib/supabaseClient';
import type { Course } from '@/types/sdp/course.types';

// Pagination configuration
export const COURSES_PER_PAGE = 15;

// Fetch services from Supabase
export const getServices = async (institutionType?: string) => {
  let query = supabase
    .from('courses')
    .select('*')
    .eq('category', 'service')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  // Filter by institution type if provided
  if (institutionType) {
    query = query.or(`institution_type.eq.${institutionType},institution_type.eq.both`);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching services:', error);
    return [];
  }

  return data || [];
};

// Get service by slug from Supabase
export const getServiceBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('category', 'service')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error) {
    console.error('Error fetching service:', error);
    return null;
  }

  return data;
};

// Fetch courses by service type with server-side pagination, search, filters, and sorting
export const getCoursesByServicePaginated = async (
  serviceType: string,
  page: number = 0,
  pageSize: number = COURSES_PER_PAGE,
  searchTerm: string = '',
  filters: {
    durations?: string[];
    modes?: string[];
    levels?: string[];
    priceRanges?: Array<{ min: number; max: number }>;
  } = {},
  sortBy: string = 'newest'
): Promise<{ courses: Course[]; totalCount: number; hasMore: boolean }> => {
  const from = page * pageSize;
  const to = from + pageSize - 1;

  console.log('📄 Fetching courses - Page:', page, 'Range:', from, '-', to, 'Service:', serviceType);

  try {
    const hasSearch = searchTerm && searchTerm.trim() !== '';
    const trimmedSearch = hasSearch ? searchTerm.trim().toLowerCase() : '';

    let query = supabase
      .from('courses')
      .select(`
        id,
        slug,
        title,
        subtitle,
        description,
        duration_hours,
        mode,
        level,
        price,
        currency,
        course_category,
        banner_url,
        is_featured,
        created_at
      `, { count: 'exact' })
      .eq('category', 'course')
      .ilike('course_category', serviceType)
      .eq('is_active', true);

    if (hasSearch) {
      const words = trimmedSearch.split(/\s+/).filter(w => w.length > 0);
      const searchConditions = words.flatMap(word => {
        const escaped = word.replace(/%/g, '\\%').replace(/_/g, '\\_');
        return [
          `title.ilike.*${escaped}*`,
          `description.ilike.*${escaped}*`
        ];
      }).join(',');
      query = query.or(searchConditions);
    }

    if (filters.durations && filters.durations.length > 0) {
      query = query.in('duration_hours', filters.durations);
    }

    if (filters.modes && filters.modes.length > 0) {
      query = query.in('mode', filters.modes);
    }

    if (filters.levels && filters.levels.length > 0) {
      query = query.in('level', filters.levels);
    }

    if (filters.priceRanges && filters.priceRanges.length > 0) {
      const priceFilters = filters.priceRanges.map(range => {
        if (range.max === Infinity) {
          return `price.gte.${range.min}`;
        }
        return `and(price.gte.${range.min},price.lt.${range.max})`;
      });
      query = query.or(priceFilters.join(','));
    }

    if (!hasSearch) {
      switch (sortBy) {
        case 'name-asc':
          query = query.order('title', { ascending: true });
          break;
        case 'name-desc':
          query = query.order('title', { ascending: false });
          break;
        case 'price-low':
          query = query.order('price', { ascending: true });
          break;
        case 'price-high':
          query = query.order('price', { ascending: false });
          break;
        case 'oldest':
          query = query.order('created_at', { ascending: true });
          break;
        case 'newest':
        default:
          query = query.order('created_at', { ascending: false });
          break;
      }
    } else {
      query = query.order('created_at', { ascending: false });
    }

    const { data, error, count } = await query.range(from, to);

    if (error) {
      console.error('❌ Error fetching courses:', error);
      return { courses: [], totalCount: 0, hasMore: false };
    }

    let courses = (data || []).map((course: any) => ({
      id: course.id,
      slug: course.slug,
      name: course.title,
      duration: course.duration_hours ? `${course.duration_hours} hours` : '',
      level: course.level || 'Beginner',
      mode: course.mode || 'Hybrid',
      price: course.price || 0,
      currency: course.currency || 'INR',
      category: 'course' as const,
      serviceType: serviceType,
      courseCategory: serviceType,
      description: course.description || '',
      overview: '',
      heroBannerImage: course.banner_url,
      programBenefits: [],
      whatYouLearn: [],
      whoShouldTake: [],
      outcomes: [],
      curriculum: [],
      instructors: [],
      brochureUrl: ''
    }));

    if (hasSearch) {
      courses.sort((a, b) => {
        const aTitle = a.name.toLowerCase();
        const bTitle = b.name.toLowerCase();
        const aExact = aTitle === trimmedSearch ? 0 : 1;
        const bExact = bTitle === trimmedSearch ? 0 : 1;
        return aExact - bExact;
      });
    }

    const totalCount = count || 0;
    const hasMore = to < totalCount - 1;

    console.log('✅ Fetched:', courses.length, 'courses. Total:', totalCount);

    return { courses, totalCount, hasMore };
  } catch (err) {
    console.error('❌ Exception fetching courses:', err);
    return { courses: [], totalCount: 0, hasMore: false };
  }
};

// Fetch courses by service type from Supabase
export const getCoursesByService = async (serviceType: string): Promise<Course[]> => {
  console.log('🔎 getCoursesByService called with:', serviceType);
  
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('category', 'course')
    .ilike('course_category', serviceType)  // Case-insensitive match
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  console.log('📦 Supabase response:', { data, error });

  if (error) {
    console.error('❌ Error fetching courses:', error);
    return [];
  }

  console.log('✨ Raw data from DB:', data);
  console.log('📝 Number of courses:', data?.length || 0);

  // Map database fields to Course interface
  const mappedCourses = (data || []).map(course => ({
    id: course.id,
    slug: course.slug,
    name: course.title,
    duration: course.duration_hours ? `${course.duration_hours} hr` : '',
    level: course.level || 'Beginner',
    mode: course.mode || 'Hybrid',
    price: course.price || 0,
    currency: course.currency || 'INR',
    category: course.category,
    serviceType: course.service_type || '',
    courseCategory: course.course_category || '',
    description: course.description || '',
    overview: course.overview || '',
    heroBannerImage: course.banner_url,
    programBenefits: course.benefits || [],
    whatYouLearn: course.what_you_learn || [],
    whoShouldTake: course.who_should_take || [],
    outcomes: course.outcomes || [],
    curriculum: course.curriculum || [],
    instructors: course.instructors || [],
    brochureUrl: course.brochure_url
  }));

  console.log('🎯 Mapped courses:', mappedCourses);
  
  return mappedCourses;
};

// Get course by slug from Supabase
export const getCourseBySlug = async (slug: string): Promise<Course | null> => {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('category', 'course')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error) {
    console.error('Error fetching course:', error);
    return null;
  }

  if (!data) return null;

  // Map database fields to Course interface
  return {
    id: data.id,
    slug: data.slug,
    name: data.title,
    duration: data.duration_hours ? `${data.duration_hours} hr` : '',
    level: data.level || 'Beginner',
    mode: data.mode || 'Hybrid',
    price: data.price || 0,
    currency: data.currency || 'INR',
    category: data.category,
    serviceType: data.service_type || '',
    courseCategory: data.course_category || '',
    description: data.description || '',
    overview: data.overview || '',
    heroBannerImage: data.banner_url,
    programBenefits: data.benefits || [],
    whatYouLearn: data.what_you_learn || [],
    whoShouldTake: data.who_should_take || [],
    outcomes: data.outcomes || [],
    curriculum: data.curriculum || [],
    instructors: data.instructors || [],
    brochureUrl: data.brochure_url
  };
};

// Get related courses (same courseCategory, exclude current)
export const getRelatedCourses = async (currentCourse: Course, limit: number = 3): Promise<Course[]> => {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('category', 'course')
    .eq('course_category', currentCourse.courseCategory)
    .neq('id', currentCourse.id)
    .eq('is_active', true)
    .limit(limit);

  if (error) {
    console.error('Error fetching related courses:', error);
    return [];
  }

  // Map database fields to Course interface
  return (data || []).map(course => ({
    id: course.id,
    slug: course.slug,
    name: course.title,
    duration: course.duration_hours ? `${course.duration_hours} hr` : '',
    level: course.level || 'Beginner',
    mode: course.mode || 'Hybrid',
    price: course.price || 0,
    currency: course.currency || 'INR',
    category: course.category,
    serviceType: course.service_type || '',
    courseCategory: course.course_category || '',
    description: course.description || '',
    overview: course.overview || '',
    heroBannerImage: course.banner_url,
    programBenefits: course.benefits || [],
    whatYouLearn: course.what_you_learn || [],
    whoShouldTake: course.who_should_take || [],
    outcomes: course.outcomes || [],
    curriculum: course.curriculum || [],
    instructors: course.instructors || [],
    brochureUrl: course.brochure_url
  }));
};

// Check if a service has courses (fully dynamic, no hardcoding)
export const serviceHasCourses = async (serviceSlug: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from('courses')
    .select('course_category')
    .eq('category', 'course')
    .eq('is_active', true);

  if (error || !data) return false;

  // Normalize both strings for comparison
  const normalize = (str: string) => 
    str.toLowerCase()
       .replace(/\s+/g, '')        // Remove spaces
       .replace(/[&]/g, 'and')     // Replace & with 'and'
       .replace(/[^a-z0-9]/g, ''); // Remove special chars

  const normalizedSlug = normalize(serviceSlug);

  // Check if any course matches this service
  return data.some(course => 
    normalize(course.course_category) === normalizedSlug
  );
};

// ============================================
// CORPORATE TRAINING FUNCTIONS
// ============================================

// Utility: Convert course_category to slug format
export const categoryToSlug = (category: string): string => {
  return category
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
};

// Utility: Convert slug back to course_category (for querying)
export const slugToCategory = (slug: string): string => {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Fetch unique corporate service categories (for Page 2)
export const getCorporateServiceCategories = async () => {
  try {
    // Get distinct course_category values with their first course's data
    const { data, error } = await supabase
      .from('courses')
      .select('course_category, subtitle, description, image_url, icon, color_gradient')
      .eq('institution_type', 'corporate')
      .eq('category', 'course')
      .eq('is_active', true)
      .order('course_category', { ascending: true })
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching corporate categories:', error);
      return [];
    }

    // Group by course_category and take first record for each
    const uniqueCategories = new Map();
    (data || []).forEach(course => {
      if (!uniqueCategories.has(course.course_category)) {
        uniqueCategories.set(course.course_category, {
          id: categoryToSlug(course.course_category),
          slug: categoryToSlug(course.course_category),
          name: course.course_category,
          subtitle: course.subtitle || '',
          description: course.description || '',
          image: course.image_url || '/Corporate/Images/Training/service-header.webp',
          icon: course.icon || 'BookOpen',
          color: course.color_gradient || 'from-blue-600 to-purple-600'
        });
      }
    });

    return Array.from(uniqueCategories.values());
  } catch (err) {
    console.error('Exception fetching corporate categories:', err);
    return [];
  }
};

// Fetch corporate courses by category with pagination and filters (for Page 3)
export const getCorporateCoursesByCategory = async (
  categorySlug: string,
  page: number = 0,
  pageSize: number = COURSES_PER_PAGE,
  searchTerm: string = '',
  filters: {
    durations?: string[];
    modes?: string[];
    levels?: string[];
  } = {},
  sortBy: string = 'newest'
): Promise<{ courses: any[]; totalCount: number; hasMore: boolean }> => {
  const from = page * pageSize;
  const to = from + pageSize - 1;

  // Convert slug back to category name for querying
  const categoryName = slugToCategory(categorySlug);

  console.log('📄 Fetching corporate courses - Category:', categoryName, 'Page:', page);

  try {
    const hasSearch = searchTerm && searchTerm.trim() !== '';
    const trimmedSearch = hasSearch ? searchTerm.trim().toLowerCase() : '';

    let query = supabase
      .from('courses')
      .select(`
        id,
        slug,
        title,
        subtitle,
        description,
        duration_hours,
        mode,
        level,
        price,
        currency,
        course_category,
        overview,
        created_at
      `, { count: 'exact' })
      .eq('category', 'course')
      .eq('institution_type', 'corporate')
      .ilike('course_category', categoryName)
      .eq('is_active', true);

    if (hasSearch) {
      const words = trimmedSearch.split(/\s+/).filter(w => w.length > 0);
      const searchConditions = words.flatMap(word => {
        const escaped = word.replace(/%/g, '\\%').replace(/_/g, '\\_');
        return [
          `title.ilike.*${escaped}*`,
          `description.ilike.*${escaped}*`
        ];
      }).join(',');
      query = query.or(searchConditions);
    }

    if (filters.durations && filters.durations.length > 0) {
      query = query.in('duration_hours', filters.durations);
    }

    if (filters.modes && filters.modes.length > 0) {
      query = query.in('mode', filters.modes);
    }

    if (filters.levels && filters.levels.length > 0) {
      query = query.in('level', filters.levels);
    }

    // Apply sorting
    switch (sortBy) {
      case 'name-asc':
        query = query.order('title', { ascending: true });
        break;
      case 'name-desc':
        query = query.order('title', { ascending: false });
        break;
      case 'oldest':
        query = query.order('created_at', { ascending: true });
        break;
      case 'newest':
      default:
        query = query.order('created_at', { ascending: false });
        break;
    }

    const { data, error, count } = await query.range(from, to);

    if (error) {
      console.error('❌ Error fetching corporate courses:', error);
      return { courses: [], totalCount: 0, hasMore: false };
    }

    const courses = (data || []).map((course: any) => ({
      id: course.id,
      slug: course.slug,
      title: course.title,
      overview: course.overview || course.description || '',
      duration: course.duration_hours ? `${course.duration_hours} hours` : '0 hours',
      level: course.level || 'Professional',
      mode: course.mode || 'Online',
      price: course.price || 0,
      category: course.course_category,
      modules: []
    }));

    const totalCount = count || 0;
    const hasMore = to < totalCount - 1;

    console.log('✅ Fetched:', courses.length, 'corporate courses. Total:', totalCount);

    return { courses, totalCount, hasMore };
  } catch (err) {
    console.error('❌ Exception fetching corporate courses:', err);
    return { courses: [], totalCount: 0, hasMore: false };
  }
};

// Fetch single corporate course by slug (for Page 4)
export const getCorporateCourseBySlug = async (slug: string) => {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('category', 'course')
      .eq('institution_type', 'corporate')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('Error fetching corporate course:', error);
      return null;
    }

    if (!data) return null;

    // Map to expected format
    return {
      id: data.id,
      slug: data.slug,
      title: data.title,
      overview: data.overview || data.description || '',
      duration: data.duration_hours ? `${data.duration_hours} hours` : '0 hours',
      level: data.level || 'Professional',
      mode: data.mode || 'Online',
      price: data.price || 0,
      category: data.course_category,
      whatWeCover: data.what_you_learn || [],
      delivery: data.who_should_take || [],
      modules: data.curriculum || [],
      whyChoose: data.benefits ? data.benefits.join('. ') : ''
    };
  } catch (err) {
    console.error('Exception fetching corporate course:', err);
    return null;
  }
};

// Fetch other courses in same category (for Page 4 sidebar)
export const getOtherCorporateCourses = async (categorySlug: string, currentCourseId: string) => {
  try {
    const categoryName = slugToCategory(categorySlug);

    const { data, error } = await supabase
      .from('courses')
      .select('id, slug, title, duration_hours, mode')
      .eq('category', 'course')
      .eq('institution_type', 'corporate')
      .ilike('course_category', categoryName)
      .neq('id', currentCourseId)
      .eq('is_active', true)
      .order('display_order', { ascending: true })
      .limit(10);

    if (error) {
      console.error('Error fetching other corporate courses:', error);
      return [];
    }

    return (data || []).map(course => ({
      id: course.id,
      slug: course.slug,
      title: course.title,
      duration: course.duration_hours ? `${course.duration_hours} hours` : '0 hours',
      mode: course.mode || 'Online',
      modules: []
    }));
  } catch (err) {
    console.error('Exception fetching other corporate courses:', err);
    return [];
  }
};


