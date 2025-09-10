import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Event } from '../../types/Events/event';

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true });

      if (error) {
        throw error;
      }

      // Map location_latitude and location_longitude to location_geo
      const mappedEvents = (data || []).map((event: any) => ({
        ...event,
        location_geo:
          event.location_latitude !== undefined && event.location_longitude !== undefined
            ? { lat: event.location_latitude, lng: event.location_longitude }
            : undefined,
        location_type:
          event.location_type ?? (event.is_physical ? 'physical' : 'virtual'),
      }));

      setEvents(mappedEvents);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return { events, loading, error, refetch: fetchEvents };
};