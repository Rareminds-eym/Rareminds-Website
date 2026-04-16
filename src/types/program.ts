// =====================================================
// Section Key Constants — avoids magic strings in API and component code
// =====================================================

export const SECTION_KEYS = {
  ABOUT: 'about',
  VIDEO: 'video',
  INTRODUCTION: 'introduction',
  HEADER: 'header',
  MODULES: 'modules',
  APPROACHES: 'approaches',
  IMPACT: 'impact',
  STRATEGIC_ALIGNMENT: 'strategic_alignment',
  CONCLUSION: 'conclusion',
  COURSE_ENROLLMENT: 'course_enrollment',
  PROGRAM_DELIVERY: 'program_delivery',
  INTERVENTION: 'intervention',
} as const;

// Derived type from SECTION_KEYS — ensures section_key values are always valid
export type SectionKey = typeof SECTION_KEYS[keyof typeof SECTION_KEYS];

// Default fallback titles for sections when DB title is empty or null
export const SECTION_DEFAULTS = {
  ABOUT_TITLE: 'About the Program',
  VIDEO_TITLE: 'Program Videos',
  OVERVIEW_TITLE: 'Program Overview',
} as const;

// =====================================================
// JSONB Content Type Definitions
// =====================================================

export type ContentType = 'text' | 'cards' | 'stats' | 'courses';

// Text content structure
export interface TextContent {
  text: string;
}

// Card item structure (for about, modules, approaches, strategic_alignment sections)
export interface CardItem {
  title: string;
  description: string;
  tags?: string[];
}

export interface CardsContent {
  items: CardItem[];
}

// Stat item structure (for impact sections)
export interface StatItem {
  value: string;
  label: string;
}

export interface StatsContent {
  items: StatItem[];
}

// Course enrollment structures
export interface University {
  id: string;  // UUID from database
  name: string;
  students: number;
}

export interface Course {
  id: string;  // UUID from database
  title: string;
  total: number;
  universities: University[];
}

export interface CoursesContent {
  courses: Course[];
}

// Union type for all content types
export type SectionContent = TextContent | CardsContent | StatsContent | CoursesContent;

// =====================================================
// Database Program type (matches Supabase schema)
// =====================================================

export interface Program {
  id: string;
  title: string;
  slug: string;
  program_type: string;
  location: string;
  date: string;
  status: string;
  image_url: string;
  banner_url: string | null;
  short_description: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Transformed Program type for UI components (camelCase convention for React/TypeScript frontend)
export interface TransformedProgram {
  id: string;
  name: string;
  description: string;
  category: string;
  location: string;
  timeline: string;
  imageUrl: string;
  status: string;
  slug: string;
}

// Filter state type
export interface FilterState {
  category: string;
  name: string;
  year: string;
  location: string;
}

// Pagination parameters for API calls
export interface PaginationParams {
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

// Program Section type (matches database schema with JSONB)
export interface ProgramSection {
  id: string;
  program_id: string;
  section_key: SectionKey;
  content_type: ContentType;
  title: string;
  preamble?: string;
  content: SectionContent;  // JSONB content
  display_order: number;
  created_at: string;
  updated_at: string;
}

// Program with sections for detail pages
export interface ProgramWithSections extends Program {
  sections: ProgramSection[];
}

// Transformed section for UI
export interface TransformedSection {
  title: string;
  content: SectionContent | string;  // Support both JSONB and legacy string
  content_type?: ContentType;
  preamble?: string;
  videoUrl?: Array<{
    item1?: string;
    item2?: string;
    item3?: string;
  }>; // Optional video URLs for MediaGallery (matches MediaItem interface)
}

// Section with structured content array (used by AboutProgramSection and enhanced components)
export interface StructuredSection {
  title: string;
  content: { title: string; description: string; }[];
}

// Type aliases for semantic clarity
export type AboutSection = StructuredSection;
export type EnhancedSection = StructuredSection;

// Legacy Project interface for Naan Mudhalvan components compatibility
export interface LegacyProject extends TransformedProgram {
  year: string;
  technologies: string[];
  bannerUrl: string;
}

// Program with transformed sections (matches current detail page expectations).
// Intentionally extends Program (snake_case DB fields) with camelCase legacy fields
// to maintain backward compatibility with Naan Mudhalvan components.
export interface ProgramWithTransformedSections extends Program {
  sections: Partial<Record<SectionKey, TransformedSection>>;
  aboutSection?: AboutSection;
  enhancedSections?: { [key: string]: EnhancedSection };
  technologies?: string[];
  bannerUrl: string;
  // Legacy compatibility fields for Naan Mudhalvan components
  name: string;
  description: string;
  category: string;
  year: string;
  timeline: string;
  imageUrl: string;
}

// Paginated API response
export interface PaginatedResponse {
  data: Program[] | null;
  error: Error | null;
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

