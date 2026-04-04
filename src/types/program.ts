// Database Program type (matches Supabase schema)
export interface Program {
  id: string;
  title: string;
  slug: string;
  program_type: string;
  location: string;
  date: string;
  status: string;
  image_url: string;
  banner_url?: string; // Optional banner URL field
  short_description: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Transformed Program type for UI components save
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
  section_key: string;
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
}

// Special section for AboutProgramSection (array format)
export interface AboutSection {
  title: string;
  content: { title: string; description: string; }[];
}

// Enhanced section for components that need array format
export interface EnhancedSection {
  title: string;
  content: { title: string; description: string; }[];
}

// Legacy Project interface for Naan Mudhalvan components compatibility
export interface LegacyProject {
  id: string;
  name: string;
  description: string;
  category: string;
  status: string;
  year: string;
  location: string;
  technologies: string[];
  imageUrl: string;
  bannerUrl: string;
  timeline: string;
}

// Program with transformed sections (matches current detail page expectations)
export interface ProgramWithTransformedSections extends Program {
  sections: { [key: string]: TransformedSection };
  aboutSection?: AboutSection; // Special handling for about section
  enhancedSections?: { [key: string]: EnhancedSection }; // For special components
  technologies?: string[];
  bannerUrl?: string;
  // Legacy compatibility fields for Naan Mudhalvan components
  name?: string;
  description?: string;
  category?: string;
  year?: string;
  timeline?: string;
}

// Paginated API response
export interface PaginatedResponse {
  data: Program[] | null;
  error: string | Error | null; 
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
