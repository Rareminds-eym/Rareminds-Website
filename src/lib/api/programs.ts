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

// Helper function to transform string content to array format for specific components
function transformContentForComponent(section: { title: string; content: string }, componentType: 'dsatm' | 'multi-card'): { title: string; content: { title: string; description: string; }[] } {
  if (componentType === 'dsatm' || componentType === 'multi-card') {
    // For components that expect array format, wrap string content as single item
    return {
      title: section.title,
      content: [{
        title: section.title,
        description: section.content
      }]
    };
  }
  
  // Default: return as-is for regular components
  return section as any;
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
    const enhancedSections: { [key: string]: { title: string; content: { title: string; description: string; }[] } } = {};
    let aboutSection: AboutSection | undefined;
    
    sections?.forEach((section, index) => {
      // Special transformation for AboutProgramSection (expects array format)
      if (section.section_key === 'about') {
        
        // Special handling for DSATM - use original structured content
        if (program.slug === 'dsatm') {
          aboutSection = {
            title: section.title || 'About the Program',
            content: [
              {
                title: 'MBA Students',
                description: '5-Day Advanced Excel Workshop (Sept–Oct 2019). Focused on business analytics and reporting through practical spreadsheet applications.'
              },
              {
                title: 'Non-Teaching Staff',
                description: 'MS Office & Email Etiquette (Feb 2019) – 3-day session introducing essential digital tools and workplace communication. Advanced Excel, Time Management & Personal Branding via Social Media (July 2019) – A holistic 3-day program to enhance productivity and professional presence.'
              },
              {
                title: 'Civil Engineering Students',
                description: '3-Day Experiential Workshop for 4th & 6th Semester Students. Day 1: Surveying & geospatial analysis using Total Station & GIS. Day 2: Construction Project Management tools and methodologies (PERT, CPM, EVM). Day 3: BIM, Risk Management, and digital modeling exposure Participation, 60 students.'
              }
            ]
          };
        } else if (program.slug === 'pes') {
          // Parse the structured content with colon separators
          const content = section.content || '';
          
          // Try multiple splitting approaches to handle different line endings
          let parts = content.split('\n\n').filter(part => part.trim().length > 0);
          
          // If that didn't work, try splitting on "Learning Approach:" directly
          if (parts.length === 1) {
            const learningApproachIndex = content.indexOf('Learning Approach:');
            if (learningApproachIndex > 0) {
              parts = [
                content.substring(0, learningApproachIndex).trim(),
                content.substring(learningApproachIndex).trim()
              ];
            }
          }
          
          const parsedContent = parts.map((part, index) => {
            const colonIndex = part.indexOf(':');
            
            if (colonIndex > 0 && colonIndex < 50) {
              const title = part.substring(0, colonIndex).trim();
              const description = part.substring(colonIndex + 1).trim();
              return {
                title: title,
                description: description
              };
            }
            return {
              title: 'Program Details',
              description: part.trim()
            };
          });
          
          aboutSection = {
            title: section.title || 'About the Program',
            content: parsedContent.length > 0 ? parsedContent : [
              {
                title: 'Web Development Bootcamp',
                description: 'From July 24th to 29th, 2023, Rareminds delivered a comprehensive Web Development Bootcamp focused on Full Stack skills. The program immersed students in practical learning, from HTML, CSS, and JavaScript to React, backend integration, APIs, and deployment techniques.'
              },
              {
                title: 'Learning Approach',
                description: 'Designed around active problem-solving, teamwork, and real-time feedback, this initiative gave students the tools to think like developers and build like professionals.'
              }
            ]
          };
        } else if (program.slug === 'vels') {
          // VELS has specific program structure: Industrial Metaverse and Web Full Stack Development
          aboutSection = {
            title: section.title || 'About the Program',
            content: [
              {
                title: 'Industrial Metaverse',
                description: 'Two 45-hour experiential training programs were delivered to undergraduate students as part of this collaboration. This program combined cutting-edge tools like VR and AI with hands-on projects, enabling students to simulate real-world environments from day one.'
              },
              {
                title: 'Web Full Stack Development',
                description: 'Two 45-hour experiential training programs were delivered to undergraduate students as part of this collaboration. This program combined the MERN stack with hands-on projects, enabling students to code, build, and deploy real-world applications from day one.'
              }
            ]
          };
        } else {
          // Generic content splitting for other programs
          const content = section.content || '';
          
          // Intelligent content splitting for meaningful cards
          const splitAboutContent = (text: string) => {
            // Look for natural break points like periods, semicolons, or specific keywords
            const sentences = text.split(/[.!?]+/).filter((s: string) => s.trim().length > 0);
            
            // Find a good split point (around 40-60% through the content)
            const totalLength = text.length;
            let bestSplitIndex = Math.floor(sentences.length / 2);
            let currentLength = 0;
            
            // Find the sentence that gets us closest to 40-60% of total content
            for (let i = 0; i < sentences.length; i++) {
              currentLength += sentences[i].length;
              const percentage = currentLength / totalLength;
              
              if (percentage >= 0.4 && percentage <= 0.6) {
                bestSplitIndex = i + 1;
                break;
              }
            }
            
            // Ensure we don't split too early or too late
            bestSplitIndex = Math.max(1, Math.min(bestSplitIndex, sentences.length - 1));
            
            const firstPart = sentences.slice(0, bestSplitIndex).join('. ').trim() + '.';
            const secondPart = sentences.slice(bestSplitIndex).join('. ').trim() + '.';
            
            return { firstPart, secondPart };
          };
          
          const { firstPart, secondPart } = splitAboutContent(content);
          
          aboutSection = {
            title: section.title || '',
            content: [
              {
                title: 'Program Overview',
                description: firstPart
              },
              {
                title: 'Implementation & Impact',
                description: secondPart
              }
            ]
          };
        }
        
        // Also add to regular sections for fallback
        transformedSections[section.section_key] = {
          title: section.title || '',
          content: section.content || ''
        };
      } else {
        // Regular transformation for most components
        transformedSections[section.section_key] = {
          title: section.title || '',
          content: section.content || ''
        };
      }
      
      // Enhanced transformation for components that need array format
      // Currently used for: DSATMAboutSection and similar multi-card components
      if (['modules', 'approaches'].includes(section.section_key)) {
        enhancedSections[section.section_key] = transformContentForComponent(
          { title: section.title || '', content: section.content || '' },
          'dsatm'
        );
      }
    });

    // Create the final program object with transformed sections
    const programWithSections: ProgramWithTransformedSections = {
      ...program,
      sections: transformedSections,
      aboutSection: aboutSection,
      enhancedSections: enhancedSections,
      bannerUrl: program.banner_url || program.image_url, // Use banner_url first, fallback to image_url
      // Legacy compatibility fields for Naan Mudhalvan components
      name: program.title,
      description: program.short_description,
      category: program.program_type,
      year: program.date ? new Date(program.date).getFullYear().toString() : '',
      timeline: program.date ? new Date(program.date).getFullYear().toString() : '',
      technologies: [], // Default empty array
      imageUrl: program.image_url
    };

    return { data: programWithSections, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
}

