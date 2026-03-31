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
