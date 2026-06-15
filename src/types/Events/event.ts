// =====================================================
// EVENT TYPES — Final schema after all 3 migrations
// =====================================================

// Event type enum
export type EventType = 'paid' | 'free';

// Typed section content shapes matching the DB JSONB structure
export interface EventSectionContent {
  // about, agenda, cta
  text?: string;
  // highlights, gallery, faq, speakers, stats, features, testimonials
  items?: Array<
    | { id?: string; value: string; label: string }                          // stats
    | { id?: string; title?: string; description?: string }                  // features/cards
    | { id?: string; name?: string; designation?: string; school?: string; location?: string; rating?: number; review?: string } // testimonials
    | { id?: string; name?: string; photo?: string; profile?: string; role?: string; linkedIn?: string } // speakers
    | { id?: string; image_url?: string; caption?: string }                  // gallery
    | { id?: string; question?: string; answer?: string }                    // faq
    | { id?: string; text?: string }                                         // highlights (list)
  >;
  heading?: string;
  subheading?: string;
  tag?: string;
  badges?: Array<{ label: string }>;
  button?: string;
}

export interface EventSection {
  section_key: string;
  content_type: string;
  display_order: number;
  content: EventSectionContent | null;
}

// JSONB metadata objects from the new schema
export interface OrganizerMetadata {
  name?: string;
  email?: string;
  phone?: string;
}

export interface MediaMetadata {
  featured_image?: string;
  event_banner?: string;
  mobile_featured_image?: string;
  teaser_video?: string;
  enquiry_pdf?: string;
}

export interface ContentMetadata {
  capacity?: number;
  event_tags?: string[];
  languages?: string[];
  sponsors?: string[];
  requirements?: string;
  additional_contact_info?: string;
  event_link?: string;
  zoho_form_url?: string;
}

export interface LocationMetadata {
  address?: string;
  lat?: number;
  lng?: number;
}

export interface Event {
  id?: string;
  created_by?: string;

  // Core flat columns
  title: string;
  event_date: string;
  event_time: string;
  duration: number;           // INTEGER — total minutes (e.g. 4320 = 3 days)
  category: string;           // event_category_enum: Workshop | Webinar | Seminar | Conference | Training | Bootcamp | Hackathon | Other
  price?: number;             // NUMERIC(10,2) — e.g. 2999.00, or 0 for free
  event_type: EventType;      // event_type_enum: paid | free (default: 'free')
  registration_deadline?: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  is_physical?: boolean;
  slug: string;
  form_id?: string | null;    // UUID reference to custom registration form

  // JSONB metadata columns
  organizer_metadata?: OrganizerMetadata;
  media_metadata?: MediaMetadata;
  content_metadata?: ContentMetadata;
  location_metadata?: LocationMetadata;

  // Computed / joined field — not in DB
  location_geo?: { lat: number; lng: number };

  // Registration status — derived in frontend, not in DB
  registration_status?: 'open' | 'closed' | 'full';

  // Sections fetched from entity_sections + section_contents
  eventSections?: EventSection[];
}
