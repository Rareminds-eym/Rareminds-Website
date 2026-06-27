import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import { Event, EventSection } from '../../types/Events/event';
import { testEnvironmentVariables } from '../../utils/testConnection';

export const useOptimizedEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const MAX_RETRIES = 3;
  const RETRY_DELAY = 1000;

  // Fast initial load — only flat columns that exist in the new schema
  const fetchMinimalEvents = useCallback(async (isRetry: boolean = false) => {
    try {
      if (!isRetry) {
        setLoading(true);
        setError(null);

        if (!testEnvironmentVariables()) {
          throw new Error('Missing or invalid environment variables.');
        }
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const { data, error: supabaseError } = await supabase
        .from('events')
        .select(`
          id,
          created_by,
          created_at,
          title,
          event_date,
          event_time,
          duration,
          category,
          price,
          event_type,
          registration_deadline,
          status,
          is_physical,
          slug,
          form_id,
          organizer_metadata,
          media_metadata,
          content_metadata,
          location_metadata
        `)
        .order('created_at', { ascending: false })
        .limit(50)
        .abortSignal(controller.signal);

      clearTimeout(timeoutId);

      if (supabaseError) {
        if (supabaseError.code === '57014') {
          throw new Error('Database query timeout. Please try again.');
        }
        throw new Error(`Database error: ${supabaseError.message}`);
      }

      if (!data) {
        throw new Error('No data received from database');
      }
      // Map DB rows directly — all JSONB fields come back as objects already
      const expandedEvents: Event[] = data.map(row => ({
        id:                   row.id,
        created_by:           row.created_by,
        created_at:           row.created_at,
        title:                row.title,
        event_date:           row.event_date,
        event_time:           row.event_time,
        duration:             row.duration,
        category:             row.category,
        price:                row.price,
        event_type:           row.event_type,
        registration_deadline: row.registration_deadline,
        status:               row.status,
        is_physical:          row.is_physical,
        slug:                 row.slug,
        form_id:              row.form_id,
        organizer_metadata:   row.organizer_metadata   ?? {},
        media_metadata:       row.media_metadata       ?? {},
        content_metadata:     row.content_metadata     ?? {},
        location_metadata:    row.location_metadata    ?? {},
      }));

      setEvents(expandedEvents);
      setError(null);
      setRetryCount(0);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';

      if (
        retryCount < MAX_RETRIES &&
        (errorMessage.includes('AbortError') ||
          errorMessage.includes('timeout') ||
          errorMessage.includes('network') ||
          errorMessage.includes('fetch') ||
          errorMessage.includes('57014'))
      ) {
        setRetryCount(prev => prev + 1);
        setTimeout(() => fetchMinimalEvents(true), RETRY_DELAY);
        return;
      }

      setError(errorMessage);
      setRetryCount(0);
    } finally {
      setLoading(false);
    }
  }, [retryCount]);

  // Load full event details on demand (includes entity_sections + section_contents)
  const loadFullEventDetails = useCallback(async (eventId: string): Promise<Event | null> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const { data, error: supabaseError } = await supabase
        .from('events')
        .select('*')
        .eq('id', eventId)
        .single();

      clearTimeout(timeoutId);

      if (supabaseError) {
        throw new Error(`Failed to load event: ${supabaseError.message}`);
        return null;
      }

      if (!data) return null;

      // Fetch entity_sections + section_contents
      const { data: sectionsData, error: sectionsError } = await supabase
        .from('entity_sections')
        .select(`
          id,
          section_key,
          content_type,
          display_order,
          section_contents!entity_section_id ( content )
        `)
        .eq('entity_type', 'event')
        .eq('entity_id', eventId)
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (sectionsError) {
      }
      const eventSections: EventSection[] = (sectionsData ?? []).map((s: {
        section_key: string;
        content_type: string;
        display_order: number;
        section_contents: { content: unknown } | { content: unknown }[] | null;
      }) => {
        const contentRow = Array.isArray(s.section_contents)
          ? s.section_contents[0]
          : s.section_contents;
        return {
          section_key:   s.section_key,
          content_type:  s.content_type,
          display_order: s.display_order,
          content:       contentRow?.content ?? null,
        };
      });
      const fullEvent: Event = {
        id:                   data.id,
        created_by:           data.created_by,
        title:                data.title,
        event_date:           data.event_date,
        event_time:           data.event_time,
        duration:             data.duration,
        category:             data.category,
        price:                data.price,
        event_type:           data.event_type,
        registration_deadline: data.registration_deadline,
        status:               data.status,
        is_physical:          data.is_physical,
        slug:                 data.slug,
        form_id:              data.form_id,
        organizer_metadata:   data.organizer_metadata   ?? {},
        media_metadata:       data.media_metadata       ?? {},
        content_metadata:     data.content_metadata     ?? {},
        location_metadata:    data.location_metadata    ?? {},
        eventSections,
      };

      return fullEvent;

    } catch (err) {
      throw err;
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
    loading,
    error,
    refetch,
    loadFullEventDetails,
  };
};
