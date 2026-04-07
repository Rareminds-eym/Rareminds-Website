import { supabase } from '../supabaseClient';
import type { Program, ProgramWithTransformedSections, AboutSection } from '../../types/program';

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

    // Calculate offset for pagination
    const offset = (page - 1) * limit;

    // Build the query
    let query = supabase
      .from('programs')
      .select('id, title, slug, program_type, location, date, status, image_url, banner_url, short_description, display_order, is_active, created_at, updated_at', { count: 'exact' })
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

// Helper function to parse structured content from database text
function parseStructuredContent(content: string): { title: string; description: string; }[] {
  if (!content) return [];
  
  const lines = content.split('\n').map(l => l.trim()).filter(Boolean);
  const sections: { title: string; description: string; }[] = [];
  let current: { title: string; description: string[] } | null = null;
  
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    const isHeader = colonIndex > 0 && (
      line.includes('Students') || 
      line.includes('Staff') || 
      line.includes('Development') ||
      line.includes('Bootcamp') ||
      line.includes('Approach') ||
      line.includes('Assessment') ||
      line.includes('Metaverse') ||
      line.includes('Stack')
    );
    
    if (isHeader) {
      if (current) {
        sections.push({
          title: current.title,
          description: current.description.join(' ')
        });
      }
      
      const title = line.substring(0, colonIndex).trim();
      const restOfLine = line.substring(colonIndex + 1).trim();
      
      current = {
        title: title,
        description: restOfLine ? [restOfLine] : []
      };
    } else if (current) {
      current.description.push(line);
    }
  }
  
  if (current) {
    sections.push({
      title: current.title,
      description: current.description.join(' ')
    });
  }
  
  return sections;
}

// New function to get program with sections by slug
export async function getProgramWithSections(slug: string): Promise<{
  data: ProgramWithTransformedSections | null;
  error: any;
}> {
  try {
    // First, get the program
    const { data: program, error: programError } = await supabase
      .from('programs')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (programError) {
      console.error('❌ [API] Error fetching program:', programError);
      throw programError;
    }

    if (!program) {
      return { data: null, error: 'Program not found' };
    }

    // Then, get the sections for this program
    const { data: sections, error: sectionsError } = await supabase
      .from('program_sections')
      .select('*')
      .eq('program_id', program.id)
      .order('display_order', { ascending: true });

    if (sectionsError) {
      throw sectionsError;
    }

    // Transform sections to match the expected format
    const transformedSections: { [key: string]: { title: string; content: string } } = {};
    let aboutSection: AboutSection | undefined;
    
    sections?.forEach((section) => {
      // Store regular sections
      transformedSections[section.section_key] = {
        title: section.title || '',
        content: section.content || ''
      };
      
      // Special transformation for AboutProgramSection (expects array format)
      if (section.section_key === 'about') {
        const parsedContent = parseStructuredContent(section.content || '');
        
        aboutSection = {
          title: section.title || 'About the Program',
          content: parsedContent.length > 0 ? parsedContent : [
            {
              title: 'Program Overview',
              description: section.content || ''
            }
          ]
        };
      }
    });

    // Create the final program object with transformed sections
    const programWithSections: ProgramWithTransformedSections = {
      ...program,
      sections: transformedSections,
      aboutSection: aboutSection,
      bannerUrl: program.banner_url || program.image_url,
      // Legacy compatibility fields
      name: program.title,
      description: program.short_description,
      category: program.program_type,
      year: program.date ? new Date(program.date).getFullYear().toString() : '',
      timeline: program.date ? new Date(program.date).getFullYear().toString() : '',
      technologies: [],
      imageUrl: program.image_url
    };

    // Add video section data for all programs
    if (!transformedSections['video']) {
      transformedSections['video'] = {
        title: 'Program Videos',
        content: 'Explore our comprehensive training programs through these video testimonials showcasing student experiences, program highlights, and real-world applications of the skills learned.',
        videoUrl: [
          {
            item1: '/video1.mp4',
            item2: '/video2.mp4',
            item3: '/video3.mp4',
          },
          {
            item1: 'https://media.istockphoto.com/id/1752533608/video/high-five-business-people-and-teamwork-with-collaboration-and-celebration-in-a-office-with.jpg?s=640x640&k=20&c=JpFXT5qRc3TcAJae4yzXBTqos-sw5X2yTBseiM6o-qk=',
            item2: 'https://media.istockphoto.com/id/1473240473/video/high-five-team-building-and-business-men-in-office-building-for-partnership-goals-and-success.jpg?s=640x640&k=20&c=kYe2nLg23mmIlErv1vcuL5ZvrTS_3difGB-5IUcaijQ=',
            item3: 'https://media.istockphoto.com/id/612853934/photo/shared-vision-shared-success.jpg?s=612x612&w=0&k=20&c=CDAgRN1WdaARc5Q0CFnLac4-flGkeZjycG3R1IMrz54=',
          },
          {
            item1: '/video3.mp4',
            item2: '/video3.mp4',
            item3: '/video3.mp4',
          },
        ]
      };
    }

    return { data: programWithSections, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
}