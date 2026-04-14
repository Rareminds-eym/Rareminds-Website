// Database Program type (matches Supabase schema exactly — uses snake_case to mirror DB column names.
// Transformation to camelCase happens in TransformedProgram for UI components.)
export interface Program {
  id: string;
  title: string;
  slug: string;
  program_type: string;
  location: string;
  date: string;
  status: string;
  image_url: string;
  banner_url: string; 
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

// Program Section type (matches database schema)
export interface ProgramSection {
  id: string;
  program_id: string;
  section_key: SectionKey;
  title: string;
  content: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

// Program with sections for detail pages
export interface ProgramWithSections extends Program {
  sections: ProgramSection[];
}

// Transformed section for UI (matches static data structure)
export interface TransformedSection {
  title: string;
  content: string;
  videoUrl?: Array<{
    url: string;
  }>; // Optional video URLs for MediaGallery
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
// Extends TransformedProgram to avoid field duplication
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
  aboutSection?: AboutSection; // Special handling for about section
  enhancedSections?: { [key: string]: EnhancedSection }; // For special components
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

// Section key constants — avoids magic strings in API and component code
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
