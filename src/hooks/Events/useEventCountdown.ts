import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Event } from '../../types/Events/event';

export interface EventWithCountdown extends Event {
  timeLeft: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  isRegistrationOpen: boolean;
  isRegistrationDeadlinePassed: boolean;
}

// Parse registration_deadline and ALWAYS treat it as end-of-day local time (11:59:59.999)
// This avoids timezone shifts when a backend accidentally returns a timestamp or UTC string.
function parseDeadlineEndOfDay(dateStr: string): Date {
  if (!dateStr) return new Date(0);
  // Extract just the date portion (YYYY-MM-DD) even if a time exists
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(dateStr));
  if (!match) return new Date(dateStr); // fallback
  const y = parseInt(match[1], 10);
  const m = parseInt(match[2], 10);
  const d = parseInt(match[3], 10);
  // Construct local date at 23:59:59.999
  return new Date(y, (m || 1) - 1, d || 1, 23, 59, 59, 999);
}

export const useEventCountdown = () => {
  const [events, setEvents] = useState<EventWithCountdown[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const calculateTimeLeft = (deadline: string) => {
    const deadlineDate = parseDeadlineEndOfDay(deadline);
    const now = new Date();
    const difference = deadlineDate.getTime() - now.getTime();

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const fetchEventsWithCountdown = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: supabaseError } = await supabase
        .from('events')
        .select('*')
        .not('registration_deadline', 'is', null) // Only get events with registration deadlines
        .order('registration_deadline', { ascending: true });

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }

      if (!data) {
        setEvents([]);
        return;
      }

      // Map events with countdown information
      const eventsWithCountdown: EventWithCountdown[] = data.map((event: any) => {
        const timeLeft = calculateTimeLeft(event.registration_deadline);
        const now = new Date();
        const deadlineDate = parseDeadlineEndOfDay(event.registration_deadline);
        const eventDate = new Date(event.event_date);
        
        const isRegistrationDeadlinePassed = deadlineDate.getTime() <= now.getTime();
        const isEventPassed = eventDate.getTime() <= now.getTime();
        const isRegistrationOpen = !isRegistrationDeadlinePassed && !isEventPassed;

        return {
          ...event,
          // Map location_latitude and location_longitude to location_geo for consistency
          location_geo:
            event.location_latitude !== undefined && event.location_longitude !== undefined
              ? { lat: event.location_latitude, lng: event.location_longitude }
              : undefined,
          location_type:
            event.location_type ?? (event.is_physical ? 'physical' : 'virtual'),
          timeLeft,
          isRegistrationOpen,
          isRegistrationDeadlinePassed,
        };
      });

      setEvents(eventsWithCountdown);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  const updateCountdowns = () => {
    setEvents(currentEvents => 
      currentEvents.map(event => {
        if (!event.registration_deadline) return event;
        
        const timeLeft = calculateTimeLeft(event.registration_deadline);
        const now = new Date();
        const deadlineDate = parseDeadlineEndOfDay(event.registration_deadline);
        const eventDate = new Date(event.event_date);
        
        const isRegistrationDeadlinePassed = deadlineDate.getTime() <= now.getTime();
        const isEventPassed = eventDate.getTime() <= now.getTime();
        const isRegistrationOpen = !isRegistrationDeadlinePassed && !isEventPassed;

        return {
          ...event,
          timeLeft,
          isRegistrationOpen,
          isRegistrationDeadlinePassed,
        };
      })
    );
  };

  useEffect(() => {
    fetchEventsWithCountdown();
  }, []);

  useEffect(() => {
    // Update countdowns every second
    const timer = setInterval(updateCountdowns, 1000);
    return () => clearInterval(timer);
  }, []);

  // Get only events with active registration (deadline not passed and event not passed)
  const activeEvents = events.filter(event => event.isRegistrationOpen);
  
  // Get events with upcoming deadlines (within next 7 days)
  const urgentEvents = events.filter(event => {
    if (!event.isRegistrationOpen) return false;
    const deadline = parseDeadlineEndOfDay(event.registration_deadline!);
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
    return deadline.getTime() <= sevenDaysFromNow.getTime();
  });

  return {
    events,
    activeEvents,
    urgentEvents,
    loading,
    error,
    refetch: fetchEventsWithCountdown,
  };
};
