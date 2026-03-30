import { supabase } from '../supabaseClient';
import type { Program } from '../../types/program';

interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  filters?: {
    category?: string;
    name?: string;
    year?: string;
    location?: string;
  };
}

interface PaginatedResponse {
  data: Program[] | null;
  error: any;
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export async function getPrograms(params: PaginationParams = {}): Promise<PaginatedResponse> {
  try {
    const {
      page = 1,
      limit = 6,
      search = '',
      filters = {}
    } = params;

    console.log('🔄 Making paginated API call to Supabase...');
    console.log('📊 Pagination params:', { page, limit, search, filters });

    // Calculate offset for pagination
    const offset = (page - 1) * limit;

    // Build the query
    let query = supabase
      .from('programs')
      .select('id, title, slug, program_type, location, date, status, image_url, short_description, display_order, is_active, created_at, updated_at', { count: 'exact' })
      .eq('is_active', true);

    // Apply search filter
    if (search) {
      query = query.or(`title.ilike.%${search}%,short_description.ilike.%${search}%,program_type.ilike.%${search}%,location.ilike.%${search}%`);
    }

    // Apply category filter
    if (filters.category && filters.category !== 'All') {
      query = query.eq('program_type', filters.category);
    }

    // Apply name filter
    if (filters.name && filters.name !== 'All') {
      query = query.eq('title', filters.name);
    }

    // Apply location filter
    if (filters.location && filters.location !== 'All') {
      query = query.eq('location', filters.location);
    }

    // Apply year filter
    if (filters.year && filters.year !== 'All') {
      query = query.gte('date', `${filters.year}-01-01`).lt('date', `${parseInt(filters.year) + 1}-01-01`);
    }

    // Apply pagination and ordering
    const { data, error, count } = await query
      .order('display_order', { ascending: true })
      .range(offset, offset + limit - 1);

    console.log('📊 Supabase response:', { 
      dataCount: data?.length, 
      totalCount: count,
      error: error,
      page,
      limit
    });
    
    if (error) {
      console.error('❌ Supabase error:', error);
      throw error;
    }

    const totalCount = count || 0;
    const totalPages = Math.ceil(totalCount / limit);
    
    console.log('✅ API call successful, returning', data?.length, 'programs, page', page, 'of', totalPages);
    
    return { 
      data: data as Program[], 
      error: null,
      totalCount,
      totalPages,
      currentPage: page,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    };
  } catch (error) {
    console.error('💥 API function error:', error);
    return { 
      data: null, 
      error,
      totalCount: 0,
      totalPages: 0,
      currentPage: 1,
      hasNextPage: false,
      hasPrevPage: false
    };
  }
}

export async function getProgramFilterOptions(): Promise<{
  categories: string[];
  names: string[];
  years: string[];
  locations: string[];
}> {
  try {
    const { data, error } = await supabase
      .from('programs')
      .select('title, program_type, location, date')
      .eq('is_active', true);

    if (error) throw error;

    const categories = ['All', ...Array.from(new Set(data?.map(p => p.program_type).filter(Boolean) || []))];
    const names = ['All', ...Array.from(new Set(data?.map(p => p.title).filter(Boolean) || []))];
    const locations = ['All', ...Array.from(new Set(data?.map(p => p.location).filter(Boolean) || []))];
    
    // Generate years from dates
    const years = ['All', ...Array.from(new Set(data?.map(p => {
      if (p.date) {
        return new Date(p.date).getFullYear().toString();
      }
      return null;
    }).filter(Boolean) as string[]))].sort();

    return { categories, names, years, locations };
  } catch (error) {
    console.error('Error fetching filter options:', error);
    return { categories: ['All'], names: ['All'], years: ['All'], locations: ['All'] };
  }
}

export async function getProgramBySlug(slug: string): Promise<{ data: Program | null; error: any }> {
  try {
    const { data, error } = await supabase
      .from('programs')
      .select(`
        *,
        program_sections (
          id,
          section_key,
          title,
          content,
          display_order
        )
      `)
      .eq('slug', slug)
      .eq('is_active', true)
      .order('display_order', { foreignTable: 'program_sections', ascending: true })
      .single();

    if (error) throw error;
    return { data: data as Program, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function getProgramsWithSections(): Promise<{ data: Program[] | null; error: any }> {
  try {
    const { data, error } = await supabase
      .from('programs')
      .select(`
        *,
        program_sections (
          id,
          section_key,
          title,
          content,
          display_order
        )
      `)
      .eq('is_active', true)
      .order('display_order', { ascending: true })
      .order('display_order', { foreignTable: 'program_sections', ascending: true });

    if (error) throw error;
    return { data: data as Program[], error: null };
  } catch (error) {
    return { data: null, error };
  }
}