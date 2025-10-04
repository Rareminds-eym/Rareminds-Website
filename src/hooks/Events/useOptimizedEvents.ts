import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import { Event } from '../../types/Events/event';
import { testEnvironmentVariables } from '../../utils/testConnection';

// Minimal event data for initial load (fast)
interface MinimalEvent {
  id: string;
  title: string;
  event_date: string;
  event_time: string;
  location: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  category: string;
  price?: string;
  registration_status?: 'open' | 'closed' | 'full';
  registration_deadline?: string;
  featured_image?: string;
  mobile_featured_image?: string;
  slug: string;
  organizer_name: string;
  capacity: number;
}

export const useOptimizedEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [minimalEvents, setMinimalEvents] = useState<MinimalEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 1000;

  // Fast initial load - only essential fields
  const fetchMinimalEvents = useCallback(async (isRetry: boolean = false) => {
    try {
      console.log('🚀 Fetching minimal events data...');
      
      if (!isRetry) {
        setLoading(true);
        setError(null);
        
        if (!testEnvironmentVariables()) {
          throw new Error('Missing or invalid environment variables.');
        }
      }
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // Shorter timeout for minimal data
      
      const { data, error: supabaseError } = await supabase
        .from('events')
        .select(`
          id,
          title,
          event_date,
          event_time,
          location,
          status,
          category,
          price,
          registration_deadline,
          featured_image,
          mobile_featured_image,
          slug,
          organizer_name,
          capacity
        `)
        .order('event_date', { ascending: true })
        .limit(50) // Even smaller limit for initial load
        .abortSignal(controller.signal);
      
      clearTimeout(timeoutId);

      if (supabaseError) {
        console.error('❌ Supabase error (minimal):', supabaseError);
        
        if (supabaseError.code === '57014') {
          throw new Error('Database query timeout. Please try again.');
        }
        
        throw new Error(`Database error: ${supabaseError.message}`);
      }

      if (!data) {
        throw new Error('No data received from database');
      }

      console.log(`✅ Minimal events loaded: ${data.length} events`);
      setMinimalEvents(data);
      
      // Convert minimal events to full Event format with placeholders
      const expandedEvents: Event[] = data.map(event => ({
        ...event,
        description: '',
        duration: '',
        location_geo: undefined,
        location_type: 'physical',
        organizer_email: '',
        organizer_phone: '',
        requirements: '',
        agenda: '',
        speakers: [],
        sponsors: [],
        additional_contact_info: '',
        event_banner: event.featured_image,
        mobile_featured_image: event.mobile_featured_image,
        event_tags: [],
        meta_title: event.title,
        meta_description: '',
        teaser_video: '',
        key_highlights: [],
        languages: [],
        faq: [],
        speakers_details: [],
        events_gallery: []
      }));
      
      setEvents(expandedEvents);
      setError(null);
      setRetryCount(0);
      
    } catch (err) {
      console.error('❌ Error fetching minimal events:', err);
      
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      
      if (retryCount < MAX_RETRIES && (
        errorMessage.includes('AbortError') || 
        errorMessage.includes('timeout') ||
        errorMessage.includes('network') ||
        errorMessage.includes('fetch') ||
        errorMessage.includes('57014')
      )) {
        console.log(`🔄 Retrying minimal fetch... (${retryCount + 1}/${MAX_RETRIES})`);
        setRetryCount(prev => prev + 1);
        
        setTimeout(() => {
          fetchMinimalEvents(true);
        }, RETRY_DELAY);
        
        return;
      }
      
      setError(errorMessage);
      setRetryCount(0);
    } finally {
      setLoading(false);
    }
  }, [retryCount]);

  // Load full event details on demand
  const loadFullEventDetails = useCallback(async (eventId: string): Promise<Event | null> => {
    try {
      console.log(`🔍 Loading full details for event: ${eventId}`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);
      
      const { data, error: supabaseError } = await supabase
        .from('events')
        .select('*')
        .eq('id', eventId)
        .single()
        .abortSignal(controller.signal);
      
      clearTimeout(timeoutId);

      if (supabaseError) {
        console.error('❌ Error loading event details:', supabaseError);
        return null;
      }

      if (!data) {
        return null;
      }

      // Map location data
      const fullEvent: Event = {
        ...data,
        location_geo:
          data.location_latitude !== undefined && data.location_longitude !== undefined
            ? { lat: data.location_latitude, lng: data.location_longitude }
            : undefined,
        location_type: data.location_type ?? (data.is_physical ? 'physical' : 'virtual'),
      };

      return fullEvent;
      
    } catch (err) {
      console.error('❌ Error loading event details:', err);
      return null;
    }
  }, []);

  const refetch = useCallback(() => {
    setRetryCount(0);
    fetchMinimalEvents();
  }, [fetchMinimalEvents]);

  useEffect(() => {
    fetchMinimalEvents();
  }, []);

  return { 
    events, 
    minimalEvents, 
    loading, 
    error, 
    refetch, 
    loadFullEventDetails 
  };
};