import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import { Event } from '../../types/Events/event';
import { testSupabaseConnection, testEnvironmentVariables } from '../../utils/testConnection';

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 1000; // 1 second

  const fetchEvents = useCallback(async (isRetry: boolean = false) => {
    try {
      console.log(`🔄 Fetching events... ${isRetry ? `(Retry ${retryCount + 1}/${MAX_RETRIES})` : ''}`);
      
      // Test environment variables on first attempt
      if (!isRetry) {
        setLoading(true);
        setError(null);
        
        if (!testEnvironmentVariables()) {
          throw new Error('Missing or invalid environment variables. Please check your .env file.');
        }
      }
      
      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      // Optimize query to prevent timeout
      const { data, error: supabaseError } = await supabase
        .from('events')
        .select(`
          id,
          title,
          description,
          event_date,
          event_time,
          duration,
          location,
          location_latitude,
          location_longitude,
          location_type,
          organizer_name,
          organizer_email,
          organizer_phone,
          capacity,
          category,
          price,
          registration_deadline,
          status,
          event_banner,
          featured_image,
          mobile_featured_image,
          event_tags,
          meta_title,
          meta_description,
          slug,
          teaser_video,
          key_highlights,
          languages,
          requirements,
          agenda,
          speakers,
          sponsors,
          additional_contact_info,
          faq,
          speakers_details,
          events_gallery
        `)
        .order('event_date', { ascending: true })
        .limit(100) // Limit to prevent timeout on large datasets
        .abortSignal(controller.signal);
      
      clearTimeout(timeoutId);

      if (supabaseError) {
        console.error('❌ Supabase error:', supabaseError);
        
        // Handle specific PostgreSQL errors
        if (supabaseError.code === '57014') {
          throw new Error('Query timeout: The request is taking too long. Please try again.');
        }
        
        throw new Error(`Database error: ${supabaseError.message}`);
      }

      if (!data) {
        throw new Error('No data received from database');
      }

      console.log(`✅ Successfully fetched ${data.length} events`);

      // Map location_latitude and location_longitude to location_geo
      const mappedEvents = data.map((event: any) => ({
        ...event,
        location_geo:
          event.location_latitude !== undefined && event.location_longitude !== undefined
            ? { lat: event.location_latitude, lng: event.location_longitude }
            : undefined,
        location_type:
          event.location_type ?? (event.is_physical ? 'physical' : 'virtual'),
      }));

      setEvents(mappedEvents);
      setError(null);
      setRetryCount(0); // Reset retry count on success
      
    } catch (err) {
      console.error('❌ Error fetching events:', err);
      
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      
      // Check if it's a network/timeout error and we haven't exceeded max retries
      if (retryCount < MAX_RETRIES && (
        errorMessage.includes('AbortError') || 
        errorMessage.includes('timeout') ||
        errorMessage.includes('network') ||
        errorMessage.includes('fetch') ||
        errorMessage.includes('Query timeout') ||
        errorMessage.includes('57014')
      )) {
        console.log(`🔄 Retrying in ${RETRY_DELAY}ms... (${retryCount + 1}/${MAX_RETRIES})`);
        setRetryCount(prev => prev + 1);
        
        setTimeout(() => {
          fetchEvents(true);
        }, RETRY_DELAY);
        
        return; // Don't set error state yet, we're retrying
      }
      
      // Set error if all retries exhausted or non-retryable error
      setError(errorMessage);
      setRetryCount(0);
    } finally {
      setLoading(false);
    }
  }, [retryCount]);

  const refetch = useCallback(() => {
    setRetryCount(0);
    fetchEvents();
  }, [fetchEvents]);

  useEffect(() => {
    fetchEvents();
  }, []); // Remove fetchEvents from dependencies to avoid infinite loop

  return { events, loading, error, refetch };
};
