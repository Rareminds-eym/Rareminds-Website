import { supabase } from '../lib/supabaseClient';
import type { EventContactFormData } from '../components/Events/EventContactForm';

export interface Event {
  id: string;
  title: string;
  event_date: string;
  status: string;
  description?: string;
  location?: string;
}

export interface EventContact {
  id: number;
  event_id: string;
  event_title: string;
  name: string;
  email: string;
  phone: string;
  organization?: string;
  created_at: string;
}

export interface EventContactCreateData {
  event_id: string;
  event_title: string;
  name: string;
  email: string;
  phone: string;
  organization?: string;
}

/**
 * Service class for handling event contact operations
 */
export class EventContactService {
  /**
   * Fetch all active events
   */
  static async getActiveEvents(): Promise<Event[]> {
    try {
      // First, try to get events with 'upcoming' status (based on your Event type)
      let { data, error } = await supabase
        .from('events')
        .select('id, title, event_date, status, description, location')
        .eq('status', 'upcoming')
        .order('event_date', { ascending: true });

      // If no upcoming events found, try to get all events and filter active ones
      if (!data || data.length === 0) {
        const result = await supabase
          .from('events')
          .select('id, title, event_date, status, description, location')
          .in('status', ['upcoming', 'ongoing', 'active'])
          .order('event_date', { ascending: true });
        
        data = result.data;
        error = result.error;
      }

      if (error) {
        console.error('Error fetching active events:', error);
        throw new Error(`Failed to fetch events: ${error.message}`);
      }

      console.log('Fetched events:', data); // Debug log
      return data || [];
    } catch (error) {
      console.error('Error in getActiveEvents:', error);
      throw error;
    }
  }

  /**
   * Fetch a specific event by ID
   */
  static async getEventById(eventId: string): Promise<Event | null> {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('id, title, event_date, status, description, location')
        .eq('id', eventId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // Event not found
        }
        console.error('Error fetching event:', error);
        throw new Error(`Failed to fetch event: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Error in getEventById:', error);
      throw error;
    }
  }

  /**
   * Submit a new event contact form
   */
  static async submitEventContact(formData: EventContactFormData): Promise<EventContact> {
    try {
      // Validate that the event exists and is active
      const event = await this.getEventById(formData.eventId);
      if (!event) {
        throw new Error('Event not found');
      }
      if (!['upcoming', 'ongoing', 'active'].includes(event.status)) {
        throw new Error('Event is not currently accepting contact requests');
      }

      // Check for duplicate submissions (same email for same event)
      const { data: existingContact } = await supabase
        .from('event_contact')
        .select('id')
        .eq('event_id', formData.eventId)
        .eq('email', formData.email)
        .single();

      if (existingContact) {
        throw new Error('You have already submitted a contact request for this event');
      }

      // Create the contact entry
      const contactData: EventContactCreateData = {
        event_id: formData.eventId,
        event_title: formData.eventTitle,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        organization: formData.organization || null,
      };

      const { data, error } = await supabase
        .from('event_contact')
        .insert([contactData])
        .select()
        .single();

      if (error) {
        console.error('Error creating event contact:', error);
        
        // Handle specific database errors
        if (error.code === '23505') { // Unique constraint violation
          throw new Error('You have already submitted a contact request for this event');
        } else if (error.code === '23503') { // Foreign key constraint violation
          throw new Error('Invalid event selected');
        } else if (error.code === '23514') { // Check constraint violation
          if (error.message.includes('email')) {
            throw new Error('Please enter a valid email address');
          } else if (error.message.includes('phone')) {
            throw new Error('Please enter a valid phone number');
          }
        }
        
        throw new Error(`Failed to submit contact request: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Error in submitEventContact:', error);
      throw error;
    }
  }

  /**
   * Get all contact submissions for a specific event (admin function)
   */
  static async getEventContacts(eventId: string): Promise<EventContact[]> {
    try {
      const { data, error } = await supabase
        .from('event_contact')
        .select('*')
        .eq('event_id', eventId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching event contacts:', error);
        throw new Error(`Failed to fetch event contacts: ${error.message}`);
      }

      return data || [];
    } catch (error) {
      console.error('Error in getEventContacts:', error);
      throw error;
    }
  }

  /**
   * Get contact submissions by email (user function)
   */
  static async getUserEventContacts(email: string): Promise<EventContact[]> {
    try {
      const { data, error } = await supabase
        .from('event_contact')
        .select('*')
        .eq('email', email)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching user event contacts:', error);
        throw new Error(`Failed to fetch your event contacts: ${error.message}`);
      }

      return data || [];
    } catch (error) {
      console.error('Error in getUserEventContacts:', error);
      throw error;
    }
  }

  /**
   * Validate email format according to database constraints
   */
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate phone format according to database constraints
   */
  static validatePhone(phone: string): boolean {
    const phoneRegex = /^\+?[0-9\- ]{10,}$/;
    return phoneRegex.test(phone);
  }

  /**
   * Format phone number for display
   */
  static formatPhone(phone: string): string {
    // Remove any non-digit characters except + at the beginning
    const cleaned = phone.replace(/[^\d+]/g, '');
    
    // Add formatting for Indian numbers
    if (cleaned.length === 10 && !cleaned.startsWith('+')) {
      return cleaned.replace(/(\d{5})(\d{5})/, '$1 $2');
    }
    // Handle +91 Indian numbers
    if (cleaned.startsWith('+91') && cleaned.length === 13) {
      return cleaned.replace(/(\+91)(\d{5})(\d{5})/, '$1 $2 $3');
    }
    // Add formatting for US numbers (fallback)
    if (cleaned.length === 10 && !cleaned.startsWith('+')) {
      return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    }
    
    return phone;
  }

  /**
   * Get events by date range
   */
  static async getEventsByDateRange(startDate: string, endDate: string): Promise<Event[]> {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('id, title, event_date, status, description, location')
        .gte('event_date', startDate)
        .lte('event_date', endDate)
        .in('status', ['upcoming', 'ongoing', 'active'])
        .order('event_date', { ascending: true });

      if (error) {
        console.error('Error fetching events by date range:', error);
        throw new Error(`Failed to fetch events: ${error.message}`);
      }

      return data || [];
    } catch (error) {
      console.error('Error in getEventsByDateRange:', error);
      throw error;
    }
  }
}

export default EventContactService;
