// School course data and operations using Supabase
import { supabase } from '@/lib/supabaseClient';

// Pagination configuration
export const COURSES_PER_PAGE = 15;

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Convert course_category to slug format
export const categoryToSlug = (category: string): string => {
  return category
    .toLowerCase()
    .replace(/\s*&\s*/g, '-and-')  // Convert & to -and-
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
};

// Convert slug back to course_category (for querying)
export const slugToCategory = (slug: string): string => {
  return slug
    .replace(/-and-/g, ' & ')  // Convert -and- back to &
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// ============================================
// SCHOOL SERVICE CATEGORIES (Page 1)
// ============================================

export const getSchoolServiceCategories = async (educationLevel?: string) => {
  try {
    // Get distinct course_category values with their first course's data
    const { data, error } = await supabase
      .from('courses')
      .select('course_category, subtitle, description, image_url, icon, color_gradient')
      .eq('institution_type', 'school')
      .eq('category', 'course')
      .eq('is_active', true)
      .order('course_category', { ascending: true })
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching school categories:', error);
      return [];
    }

    // Filter by education level if provided
    let filteredData = data || [];
    if (educationLevel) {
      filteredData = filteredData.filter(course => 
        course.subtitle && course.subtitle.toLowerCase().includes(educationLevel.toLowerCase())
      );
    }

    // Group by course_category and take first record for each
    const uniqueCategories = new Map();
    filteredData.forEach(course => {
      if (!uniqueCategories.has(course.course_category)) {
        uniqueCategories.set(course.course_category, {
          id: categoryToSlug(course.course_category),
          slug: categoryToSlug(course.course_category),
          name: course.course_category,
          subtitle: course.subtitle || '',
          description: course.description || '',
          image: course.image_url || '/institutions/images/services/1.png',
          icon: course.icon || 'BookOpen',
          color: course.color_gradient || 'from-blue-600 to-purple-600'
        });
      }
    });

    return Array.from(uniqueCategories.values());
  } catch (err) {
    console.error('Exception fetching school categories:', err);
    return [];
  }
};

// ============================================
// SCHOOL COURSES LISTING (Page 2)
// ============================================

export const getSchoolCoursesByCategory = async (
  categorySlug: string,
  page: number = 0,
  pageSize: number = COURSES_PER_PAGE,
  searchTerm: string = '',
  filters: {
    durations?: string[];
    modes?: string[];
    levels?: string[];
    priceRanges?: Array<{ min: number; max: number }>;
    educationLevel?: string;
  } = {},
  sortBy: string = 'newest'
): Promise<{ courses: any[]; totalCount: number; hasMore: boolean }> => {
  const from = page * pageSize;
  const to = from + pageSize - 1;

  // Convert slug back to category name for querying
  const categoryName = slugToCategory(categorySlug);

  console.log('📄 Fetching school courses - Category:', categoryName, 'Page:', page);

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
      .eq('institution_type', 'school')
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

    // Filter by education level if provided
    if (filters.educationLevel) {
      query = query.ilike('subtitle', `%${filters.educationLevel}%`);
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

    // Apply sorting
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

    const { data, error, count } = await query.range(from, to);

    if (error) {
      console.error('❌ Error fetching school courses:', error);
      return { courses: [], totalCount: 0, hasMore: false };
    }

    let courses = (data || []).map((course: any) => ({
      id: course.id,
      slug: course.slug,
      name: course.title,
      description: course.description || '',
      courseCategory: course.course_category,
      serviceSlug: categorySlug,
      duration: course.duration_hours ? `${course.duration_hours} hours` : '0 hours',
      level: course.level || 'Beginner',
      mode: course.mode || 'Hybrid',
      price: course.price || 0
    }));

    // Apply relevance-based sorting when searching
    if (hasSearch) {
      const coursesWithScore = courses.map(course => {
        const titleLower = course.name.toLowerCase();
        const descriptionLower = course.description.toLowerCase();
        let relevanceScore = 0;

        // Exact title match (highest priority)
        if (titleLower === trimmedSearch) {
          relevanceScore += 1000;
        }
        // Title starts with search term
        else if (titleLower.startsWith(trimmedSearch)) {
          relevanceScore += 500;
        }
        // Title contains exact search term
        else if (titleLower.includes(trimmedSearch)) {
          relevanceScore += 300;
        }

        // Count matching words in title
        const searchWords = trimmedSearch.split(/\s+/);
        searchWords.forEach(word => {
          if (titleLower.includes(word)) {
            relevanceScore += 50;
          }
          if (descriptionLower.includes(word)) {
            relevanceScore += 10;
          }
        });

        return { ...course, relevanceScore };
      });

      // Sort by relevance score (highest first), then by user's sort preference
      coursesWithScore.sort((a, b) => {
        if (b.relevanceScore !== a.relevanceScore) {
          return b.relevanceScore - a.relevanceScore;
        }
        // If same relevance, apply user's sort
        switch (sortBy) {
          case 'name-asc':
            return a.name.localeCompare(b.name);
          case 'name-desc':
            return b.name.localeCompare(a.name);
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          case 'oldest':
            return 0; // Keep order
          case 'newest':
          default:
            return 0; // Keep order
        }
      });

      // Remove relevanceScore from final results
      courses = coursesWithScore.map(({ relevanceScore, ...course }) => course);
    }

    const totalCount = count || 0;
    const hasMore = to < totalCount - 1;

    console.log('✅ Fetched:', courses.length, 'school courses. Total:', totalCount);

    return { courses, totalCount, hasMore };
  } catch (err) {
    console.error('❌ Exception fetching school courses:', err);
    return { courses: [], totalCount: 0, hasMore: false };
  }
};

// ============================================
// SCHOOL COURSE DETAIL (Page 3)
// ============================================

export const getSchoolCourseBySlug = async (slug: string) => {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('category', 'course')
      .eq('institution_type', 'school')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('Error fetching school course:', error);
      return null;
    }

    if (!data) return null;

    // Map to expected format
    return {
      id: data.id,
      slug: data.slug,
      name: data.title,
      subtitle: data.subtitle || '',
      courseCategory: data.course_category,
      serviceSlug: categoryToSlug(data.course_category),
      duration: data.duration_hours ? `${data.duration_hours} hours` : '0 hours',
      mode: data.mode || 'Hybrid',
      level: data.level || 'Beginner',
      price: data.price || 0,
      overview: data.overview || data.description || '',
      whatYouLearn: data.what_you_learn || [],
      whoShouldTake: data.who_should_take || [],
      outcomes: data.outcomes || [],
      benefits: data.benefits || [],
      modules: data.curriculum || []
    };
  } catch (err) {
    console.error('Exception fetching school course:', err);
    return null;
  }
};

// ============================================
// OTHER SCHOOL COURSES (Page 3 Sidebar)
// ============================================

export const getOtherSchoolCourses = async (categorySlug: string, currentCourseId: string, educationLevel?: string) => {
  try {
    const categoryName = slugToCategory(categorySlug);
    console.log('🔍 Fetching other courses - Category:', categoryName, 'Current ID:', currentCourseId, 'Level:', educationLevel);

    let query = supabase
      .from('courses')
      .select('id, slug, title, subtitle, duration_hours, mode')
      .eq('category', 'course')
      .eq('institution_type', 'school')
      .ilike('course_category', categoryName)
      .neq('id', currentCourseId)
      .eq('is_active', true);

    // Filter by education level in the database query if provided
    if (educationLevel) {
      query = query.ilike('subtitle', `%${educationLevel}%`);
    }

    const { data, error } = await query
      .order('display_order', { ascending: true })
      .limit(10);

    if (error) {
      console.error('❌ Error fetching other school courses:', error);
      return [];
    }

    console.log('📦 Raw data from DB:', data);
    
    const result = (data || []).map(course => ({
      id: course.id,
      slug: course.slug,
      name: course.title,
      duration: course.duration_hours ? `${course.duration_hours} hours` : '0 hours',
      mode: course.mode || 'Hybrid'
    }));
    
    console.log('✅ Final other courses result:', result);
    return result;
  } catch (err) {
    console.error('❌ Exception fetching other school courses:', err);
    return [];
  }
};
