// Minimal Analytics Helper - Events Registration Flow
// Pushes events to window.dataLayer (consumed by GA4 via gtag)

export const ANALYTICS_EVENTS = {
  EVENT_DETAIL_VIEW: 'event_detail_view',
  EVENT_REGISTRATION_START: 'event_registration_start',
  REGISTRATION_FIELD_INTERACTION: 'registration_field_interaction',
  WHATSAPP_OPT_IN: 'whatsapp_opt_in',
  EVENT_REGISTRATION_SUBMIT: 'event_registration_submit',
  EVENT_REGISTRATION_SUCCESS: 'event_registration_success',
  EVENT_REGISTRATION_FAILED: 'event_registration_failed',
} as const;

export const trackEvent = (
  eventName: string,
  eventData: Record<string, unknown> = {}
): void => {
  if (typeof window === 'undefined') return;
  try {
    const dl = window as unknown as { dataLayer: Record<string, unknown>[] };
    dl.dataLayer = dl.dataLayer || [];
    dl.dataLayer.push({ event: eventName, ...eventData });
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics]', eventName, eventData);
    }
  } catch {
    // Never break the app for analytics
  }
};
