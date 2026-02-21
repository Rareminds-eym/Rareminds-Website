// Course data and operations using Supabase
import { supabase } from '@/lib/supabaseClient';
import type { Course } from '@/types/sdp/course.types';

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

// Fetch courses by service type from Supabase
export const getCoursesByService = async (serviceType: string): Promise<Course[]> => {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('category', 'course')
    .eq('service_type', serviceType)
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching courses:', error);
    return [];
  }

  // Map database fields to Course interface
  return (data || []).map(course => ({
    id: course.id,
    slug: course.slug,
    name: course.title,
    duration: course.duration || '',
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
    duration: data.duration || '',
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
    duration: course.duration || '',
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

// Service names mapping
export const serviceNames: Record<string, string> = {
  'engineering': 'Engineering Programs',
  'arts-science': 'Arts & Science',
  'management-business': 'Management / Business',
  'corporate-faculty-training': 'Corporate / Faculty Training',
  'bsc-level': 'BSc Level',
  'skill-based': 'Skill-Based'
};
