// Export all Events components for easy importing
export { default as EventCard } from './EventCard';
export { default as EventFilters } from './EventFilters';
export { default as EventsPage } from './EventsPage';
export { default as EventDetail } from './EventDetail';
export { default as EventContactForm } from './EventContactForm';
export { default as Carousel } from './Carousel';
export { default as ImageModal } from './ImageModal';
export { default as RegistrationModal } from './RegistrationModal';
export { default as TeaserVideoModal } from './TeaserVideoModal';
export { default as InterestedModal } from './InterestedModal';

// Countdown components
export { default as EventCountdown } from './EventCountdown';
export { default as HurryUpBooking } from './HurryUpBooking';
export { default as EventCountdownSupabase } from './EventCountdownSupabase';
export { default as SingleEventCountdown } from './SingleEventCountdown';

// Export types
export type { EventContactFormData } from './EventContactForm';

// Export examples
export { 
  StandaloneEventContactForm,
  PrePopulatedEventContactForm,
  EventContactModal,
  EventDetailPage
} from './EventContactFormExample';

// Export service
export { EventContactService } from '../../services/eventContactService';
export type { Event, EventContact, EventContactCreateData } from '../../services/eventContactService';

// Export hooks
export { useEventCountdown } from '../../hooks/Events/useEventCountdown';
export type { EventWithCountdown } from '../../hooks/Events/useEventCountdown';
