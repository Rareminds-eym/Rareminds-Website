import { supabase } from '@/lib/supabaseClient';
import type { Program, ProgramWithTransformedSections, AboutSection, TransformedSection, PaginationParams, PaginatedResponse } from '@/types/program';
import { SECTION_KEYS as SK } from '@/types/program';

const DEFAULT_ABOUT_TITLE = 'About the Program';
const DEFAULT_VIDEO_TITLE = 'Program Videos';
const DEFAULT_OVERVIEW_TITLE = 'Program Overview';

// Sanitize search input to prevent PostgREST filter injection
function sanitizeSearchInput(input: string): string {
  const specialChars = ['%', '_', '\\', ',', '(', ')', '.'];
  return specialChars.reduce((str, char) => str.split(char).join('\\' + char), input);
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
      const sanitized = sanitizeSearchInput(search);
      query = query.or(`title.ilike.%${sanitized}%,short_description.ilike.%${sanitized}%,program_type.ilike.%${sanitized}%,location.ilike.%${sanitized}%`);
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
      const parsedYear = parseInt(filters.year);
      if (!isNaN(parsedYear)) {
        query = query.gte('date', `${parsedYear}-01-01`).lt('date', `${parsedYear + 1}-01-01`);
      }
    }

    // Apply pagination and ordering
    const { data, error, count } = await query
      .order('display_order', { ascending: true })
      .range(offset, offset + limit - 1);
    
    if (error) {
      throw error;
    }

    const totalCount = count || 0;
    const totalPages = Math.ceil(totalCount / limit);
    
    return { 
      data: (data ?? []) as Program[], 
      error: null,
      totalCount,
      totalPages,
      currentPage: page,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    };
  } catch (error) {
    const typedError = error instanceof Error ? error : new Error(String(error));
    return { 
      data: null, 
      error: typedError,
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
    }).filter((year): year is string => year !== null) || []))].sort();

    return { categories, names, years, locations };
  } catch (error) {
    return { categories: ['All'], names: ['All'], years: ['All'], locations: ['All'] };
  }
}

function isSectionHeader(line: string): boolean {
  const colonIndex = line.indexOf(':');
  if (colonIndex <= 0) return false;

  const candidate = line.substring(0, colonIndex).trim();
  if (!candidate) return false;

  const words = candidate.split(/\s+/);

  if (words.length > 6) return false;

  if (/[.!?]$/.test(candidate)) return false;

  return words.every(word => /^[A-Z]/.test(word));
}

// Helper function to parse structured content from database text
function parseStructuredContent(content: string): { title: string; description: string; }[] {
  if (!content) return [];

  const lines = content.split('\n').map(l => l.trim()).filter(Boolean);
  const sections: { title: string; description: string; }[] = [];
  let current: { title: string; description: string[] } | null = null;

  for (const line of lines) {
    if (isSectionHeader(line)) {
      if (current) {
        sections.push({ title: current.title, description: current.description.join(' ') });
      }

      const colonIndex = line.indexOf(':');
      const title = line.substring(0, colonIndex).trim();
      const restOfLine = line.substring(colonIndex + 1).trim();

      current = { title, description: restOfLine ? [restOfLine] : [] };
    } else if (current) {
      current.description.push(line);
    }
  }

  if (current) {
    sections.push({ title: current.title, description: current.description.join(' ') });
  }

  return sections;
}

// New function to get program with sections by slug
export async function getProgramWithSections(slug: string): Promise<{
  data: ProgramWithTransformedSections | null;
  error: Error | null;
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
      throw programError;
    }

    if (!program) {
      return { data: null, error: new Error('Program not found') };
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
    const transformedSections: { [key: string]: TransformedSection } = {};
    let aboutSection: AboutSection | undefined;
    
    (sections || []).forEach((section) => {
      // Store regular sections
      transformedSections[section.section_key] = {
        title: section.title || '',
        content: section.content || ''
      };
      
      // Special transformation for AboutProgramSection (expects array format)
      if (section.section_key === SK.ABOUT) {
        const parsedContent = parseStructuredContent(section.content || '');
        
        aboutSection = {
          title: section.title || DEFAULT_ABOUT_TITLE,
          content: parsedContent.length > 0 ? parsedContent : [
            {
              title: DEFAULT_OVERVIEW_TITLE,
              description: section.content || ''
            }
          ]
        };
      }

      // Parse video section - comma-separated URLs stored as plain text
      if (section.section_key === SK.VIDEO) {
        const videoUrl = (section.content || '')
          .split(',')
          .filter(Boolean)
          .map((url: string) => ({ item1: url.trim() }));
        transformedSections[SK.VIDEO] = {
          title: section.title || DEFAULT_VIDEO_TITLE,
          content: section.content || '',
          videoUrl
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

    return { data: programWithSections, error: null };
  } catch (error) {
    const typedError = error instanceof Error ? error : new Error(String(error));
    return { data: null, error: typedError };
  }
}

