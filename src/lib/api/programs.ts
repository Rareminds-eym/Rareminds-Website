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
  SectionKey,
} from '@/types/program';
import { SECTION_KEYS as SK, SECTION_DEFAULTS as SD } from '@/types/program';

// =====================================================
// Constants
// =====================================================

// FIX: Extracted magic numbers to named constants for clarity and maintainability
const DEFAULT_PAGE_LIMIT = 6;
const MAX_SEARCH_LENGTH = 100;

// FIX (issue #1): Frozen allowlist of searchable columns — never sourced from
// external input. Prevents PostgREST filter injection if this function is
// ever refactored to accept dynamic column configuration.
const SEARCH_COLUMNS = ['title', 'short_description', 'program_type', 'location'] as const;

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
      limit = DEFAULT_PAGE_LIMIT, // FIX: was magic number 6
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
      const trimmed = search.trim().slice(0, MAX_SEARCH_LENGTH);
      if (trimmed) {
        const sanitized = sanitizeSearchInput(trimmed);
        // FIX (issue #1): Build OR filter exclusively from the frozen SEARCH_COLUMNS
        // allowlist — never from a variable or externally supplied array.
        const searchPattern = `%${sanitized}%`;
        const orConditions = SEARCH_COLUMNS.map(col => `${col}.ilike.${searchPattern}`).join(',');
        query = query.or(orConditions);
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
    // Use database RPC for efficient server-side distinct value extraction
    const { data, error } = await supabase.rpc('get_program_filter_options');

    if (error) throw error;

    // RPC returns single row with arrays, extract and prepend 'All'
    const result = data?.[0];
    
    return {
      categories: ['All', ...(result?.categories || [])],
      names: ['All', ...(result?.names || [])],
      years: ['All', ...(result?.years || [])].sort((a, b) => 
        a === 'All' ? -1 : b === 'All' ? 1 : Number(a) - Number(b)
      ),
      locations: ['All', ...(result?.locations || [])]
    };
  } catch (error) {
    // Log error to monitoring service in production (e.g., Sentry)
    // For now, silently fail and return defaults to avoid console pollution
    if (process.env.NODE_ENV === 'development') {
      console.error('getProgramFilterOptions failed:', error);
    }
    return { categories: ['All'], names: ['All'], years: ['All'], locations: ['All'] };
  }
}

export async function getProgramWithSections(slug: string): Promise<{
  data: ProgramWithTransformedSections | null;
  error: Error | null;
}> {
  try {
    // Validate slug parameter
    if (!slug || typeof slug !== 'string' || slug.length > 200 || !/^[a-z0-9-]+$/.test(slug)) {
      return { data: null, error: new Error('Invalid slug') };
    }

    // Fetch program with nested sections in a single query
    const { data: result, error: queryError } = await supabase
      .from('programs')
      .select(`
        id, title, slug, program_type, location, date, status, image_url, banner_url, 
        short_description, display_order, is_active, created_at, updated_at,
        program_sections (
          id, program_id, section_key, content_type, title, preamble, content, 
          display_order, created_at, updated_at
        )
      `)
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (queryError) throw queryError;

    if (!result) {
      return { data: null, error: new Error('Program not found') };
    }

    const program = result as any;
    const sections = (program.program_sections || []) as ProgramSection[];

    const transformedSections: Partial<Record<SectionKey, TransformedSection>> = {};
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

      // Parse video section — comma-separated URLs stored as plain text in preamble.
      // FIX: Use || (not ??) intentionally: an empty string preamble is also useless,
      // so fall through to content.text in that case too. filter(Boolean) downstream
      // ensures a blank rawUrls string produces an empty array, not [''].
      if (section.section_key === SK.VIDEO) {
        const rawUrls = section.preamble || (isTextContent(section.content) ? section.content.text : '');
        const videoUrl = rawUrls
          .split(',')
          .map((url: string) => url.trim())
          .filter(Boolean)
          .filter((url: string) => {
            // FIX (issue #2): Only allow HTTPS video URLs. Plain HTTP URLs are blocked
            // by browsers under HTTPS (mixed-content policy) causing silent media failures.
            try {
              const parsed = new URL(url);
              return parsed.protocol === 'https:';
            } catch {
              return false;
            }
          })
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