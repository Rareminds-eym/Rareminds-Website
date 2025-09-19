// Service for handling event_interested table operations
import { supabase } from '../lib/supabaseClient';

export interface EventInterested {
  id: string;
  event_id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  created_at: string;
}

export interface EventInterestedCreateData {
  event_id: string;
  name: string;
  email: string;
  phone?: string | null;
  location?: string | null;
}

export interface EventInterestedCount {
  event_id: string;
  count: number;
}

class EventInterestedService {
  /**
   * Save user interest for an event
   */
  async saveInterest(data: EventInterestedCreateData): Promise<EventInterested> {
    try {
      const { data: result, error } = await supabase
        .from('event_intrested')
        .insert(data)
        .select()
        .single();

      if (error) {
        throw new Error(error.message || 'Failed to save interest');
      }

      return result;
    } catch (error) {
      console.error('Error saving interest:', error);
      throw error;
    }
  }

  /**
   * Get count of interested users for a specific event
   */
  async getInterestedCount(eventId: string): Promise<number> {
    try {
      const { count, error } = await supabase
        .from('event_intrested')
        .select('*', { count: 'exact', head: true })
        .eq('event_id', eventId);

      if (error) {
        console.error(`Failed to fetch interested count for event ${eventId}:`, error);
        return 0; // Return 0 as fallback
      }

      return count || 0;
    } catch (error) {
      console.error('Error fetching interested count:', error);
      return 0; // Return 0 as fallback
    }
  }

  /**
   * Check if user has already shown interest for an event
   */
  async checkUserInterest(eventId: string, email: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('event_intrested')
        .select('id')
        .eq('event_id', eventId)
        .eq('email', email)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found
        console.error('Error checking user interest:', error);
        return false; // Return false as fallback
      }

      return !!data;
    } catch (error) {
      console.error('Error checking user interest:', error);
      return false; // Return false as fallback
    }
  }

  /**
   * Get all interested users for a specific event (admin/organizer use)
   */
  async getInterestedUsers(eventId: string): Promise<EventInterested[]> {
    try {
      const { data, error } = await supabase
        .from('event_intrested')
        .select('*')
        .eq('event_id', eventId)
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message || 'Failed to fetch interested users');
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching interested users:', error);
      throw error;
    }
  }

  /**
   * Remove user interest (unsubscribe)
   */
  async removeInterest(eventId: string, email: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('event_intrested')
        .delete()
        .eq('event_id', eventId)
        .eq('email', email);

      if (error) {
        throw new Error(error.message || 'Failed to remove interest');
      }
    } catch (error) {
      console.error('Error removing interest:', error);
      throw error;
    }
  }

  /**
   * Get interested counts for multiple events (batch operation)
   */
  async getMultipleInterestedCounts(eventIds: string[]): Promise<EventInterestedCount[]> {
    try {
      const results: EventInterestedCount[] = [];
      
      // Process in batches to avoid overwhelming the database
      for (const eventId of eventIds) {
        const count = await this.getInterestedCount(eventId);
        results.push({ event_id: eventId, count });
      }

      return results;
    } catch (error) {
      console.error('Error fetching multiple interested counts:', error);
      return eventIds.map(id => ({ event_id: id, count: 0 })); // Return fallback data
    }
  }
}

// Export singleton instance
export const eventInterestedService = new EventInterestedService();

// Export the class for testing purposes
export default EventInterestedService;