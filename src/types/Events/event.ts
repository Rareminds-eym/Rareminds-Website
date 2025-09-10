export interface Event {
  location_type?: 'physical' | 'virtual';
  location_link?: string; // For virtual events
  location_geo?: { lat: number; lng: number }; // For physical events
  events_gallery?: string[];
  id?: string;
  title: string;
  description: string;
  event_date: string;
  event_time: string;
  duration: string;
  location: string;
  organizer_name: string;
  organizer_email: string;
  organizer_phone: string;
  capacity: number;
  category: string;
  price?: string;
  registration_deadline?: string;
  requirements?: string;
  agenda?: string;
  speakers?: string[];
  sponsors?: string[];
  additional_contact_info?: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  event_banner?: string;
  featured_image?: string;
  event_tags?: string[];
  meta_title: string;
  meta_description: string;
  slug: string;

  speakers_details?: Array<{
      name: string;
      photo: string;
      profile: string;
      linkedIn?: string;
    }>;
    teaser_video?: string;
}