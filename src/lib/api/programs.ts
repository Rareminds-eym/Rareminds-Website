import { supabase } from '@/lib/supabaseClient';
import type {
  Program,
  ProgramSection,
  ProgramWithTransformedSections,
  AboutSection,
  TransformedSection,
  SectionContent,
  ContentType,
  CardsContent,
  TextContent,
  PaginationParams,
  PaginatedResponse,
} from '@/types/program';
import { SECTION_KEYS as SK, SECTION_DEFAULTS as SD } from '@/types/program';

// =====================================================
// Type Guards (for JSONB content)
// =====================================================

function isTextContent(content: SectionContent): content is TextContent {
  return 'text' in content;
}

function isCardsContent(content: SectionContent): content is CardsContent {
  return 'items' in content && Array.isArray((content as CardsContent).items);
}

// =====================================================
// Security Helpers
// =====================================================

// Sanitize search input to prevent PostgREST filter injection
function sanitizeSearchInput(input: string): string {
  // Backslash must be escaped first to avoid double-escaping
  const specialChars = ['\\', '%', '_', ',', '(', ')', '.', ':', '&', '|', '*', '~', '!', '"', "'", '{', '}', '[', ']', '<', '>', '='];
  return specialChars.reduce((str, char) => str.split(char).join('\\' + char), input);
}

// =====================================================
// Content Parsing Helpers (for legacy text sections)
// =====================================================

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

function parseStructuredContent(content: string | null | undefined): { title: string; description: string }[] {
  if (!content) return [];

  const lines = content.split('\n').map(l => l.trim()).filter(Boolean);
  const sections: { title: string; description: string }[] = [];
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

// =====================================================
// API Functions
// =====================================================

export async function getPrograms(params: PaginationParams = {}): Promise<PaginatedResponse> {
  try {
    const {
      page = 1,
      limit = 6,
      search = '',
      filters = {}
    } = params;

    const offset = (page - 1) * limit;

    let query = supabase
      .from('programs')
      .select(
        'id, title, slug, program_type, location, date, status, image_url, banner_url, short_description, display_order, is_active, created_at, updated_at',
        { count: 'exact' }
      )
      .eq('is_active', true);

    // Apply search filter with sanitization
    if (search) {
      const trimmed = search.trim().slice(0, 100);
      if (trimmed) {
        const sanitized = sanitizeSearchInput(trimmed);
        query = query.or(
          `title.ilike.%${sanitized}%,short_description.ilike.%${sanitized}%,program_type.ilike.%${sanitized}%,location.ilike.%${sanitized}%`
        );
      }
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

    // Apply year filter with validation
    if (filters.year && filters.year !== 'All') {
      const parsedYear = parseInt(filters.year);
      const currentYear = new Date().getFullYear();
      if (!isNaN(parsedYear) && parsedYear >= 2000 && parsedYear <= currentYear + 1) {
        query = query
          .gte('date', `${parsedYear}-01-01`)
          .lt('date', `${parsedYear + 1}-01-01`);
      }
    }

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

    const years = [
      'All',
      ...Array.from(
        new Set(
          data
            ?.map(p => (p.date ? new Date(p.date).getFullYear().toString() : null))
            .filter((year): year is string => year !== null) || []
        )
      )
    ].sort((a, b) => (a === 'All' ? -1 : b === 'All' ? 1 : Number(a) - Number(b)));

    return { categories, names, years, locations };
  } catch {
    return { categories: ['All'], names: ['All'], years: ['All'], locations: ['All'] };
  }
}

export async function getProgramWithSections(slug: string): Promise<{
  data: ProgramWithTransformedSections | null;
  error: Error | null;
}> {
  try {
    // Fetch the program
    const { data: program, error: programError } = await supabase
      .from('programs')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (programError) throw programError;

    if (!program) {
      return { data: null, error: new Error('Program not found') };
    }

    // Fetch sections for this program
    const { data: sections, error: sectionsError } = await supabase
      .from('program_sections')
      .select('id, program_id, section_key, content_type, title, preamble, content, display_order, created_at, updated_at')
      .eq('program_id', program.id)
      .order('display_order', { ascending: true });

    if (sectionsError) throw sectionsError;

    const transformedSections: Partial<Record<string, TransformedSection>> = {};
    let aboutSection: AboutSection | undefined;

    ((sections || []) as ProgramSection[]).forEach((section) => {
      // Null safety guard — skip malformed or incomplete section items
      if (!section || !section.section_key) return;

      // Store section with JSONB content
      transformedSections[section.section_key] = {
        title: section.title || '',
        content: section.content,
        content_type: section.content_type as ContentType,
        preamble: section.preamble,
      };

      // Special transformation for AboutProgramSection (expects array format)
      if (section.section_key === SK.ABOUT) {
        // Cards format (non-Naan Mudhalvan): use items array directly
        if (section.content_type === 'cards' && isCardsContent(section.content)) {
          aboutSection = {
            title: section.title || SD.ABOUT_TITLE,
            content: section.content.items.map(item => ({
              title: item.title,
              description: item.description,
            })),
          };
        }
        // Text format (Naan Mudhalvan): parse structured text or fall back to overview
        else if (section.content_type === 'text' && isTextContent(section.content)) {
          const parsedContent = parseStructuredContent(section.content.text);
          aboutSection = {
            title: section.title || SD.ABOUT_TITLE,
            content: parsedContent.length > 0
              ? parsedContent
              : [{ title: SD.OVERVIEW_TITLE, description: section.content.text }],
          };
        }
      }

      // Parse video section — comma-separated URLs stored as plain text in preamble
      if (section.section_key === SK.VIDEO) {
        const rawUrls = section.preamble || (isTextContent(section.content) ? section.content.text : '');
        const videoUrl = rawUrls
          .split(',')
          .map((url: string) => url.trim())
          .filter(Boolean)
          .map((url: string) => ({ item1: url }));

        transformedSections[SK.VIDEO] = {
          title: section.title || SD.VIDEO_TITLE,
          content: section.content,
          content_type: section.content_type as ContentType,
          preamble: section.preamble,
          videoUrl,
        };
      }
    });

    const programYear = program.date ? new Date(program.date).getFullYear().toString() : '';

    const programWithSections: ProgramWithTransformedSections = {
      ...program,
      sections: transformedSections,
      aboutSection,
      bannerUrl: program.banner_url || program.image_url,
      // Legacy compatibility fields for Naan Mudhalvan components
      name: program.title,
      description: program.short_description,
      category: program.program_type,
      year: programYear,
      timeline: programYear,
      technologies: [],
      imageUrl: program.image_url,
    };

    return { data: programWithSections, error: null };
  } catch (error) {
    const typedError = error instanceof Error ? error : new Error(String(error));
    return { data: null, error: typedError };
  }
}