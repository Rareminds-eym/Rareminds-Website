import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle, AlertCircle, Loader2, Calendar, User, Mail, Phone, Building2 } from 'lucide-react';
import { EventContactService } from '../../services/eventContactService';

// Validation schema based on the database constraints
const eventContactSchema = z.object({
  eventId: z.string().uuid({ message: "Please select an event" }),
  eventTitle: z.string().min(1, { message: "Event title is required" }),
  name: z.string().min(1, { message: "Name is required" }).max(100, { message: "Name must be less than 100 characters" }),
  email: z.string()
    .email({ message: "Please enter a valid email address" })
    .regex(/^[^@]+@[^@]+\.[^@]+$/, { message: "Please enter a valid email format" })
    .max(255, { message: "Email must be less than 255 characters" }),
  phone: z.string()
    .min(10, { message: "Phone number must be at least 10 characters" })
    .regex(/^\+?[0-9\- ]{10,}$/, { message: "Please enter a valid phone number (numbers, spaces, hyphens, and + allowed)" })
    .max(20, { message: "Phone number must be less than 20 characters" }),
  organization: z.string()
    .min(1, { message: "Organization name is required" })
    .max(100, { message: "Organization name must be less than 100 characters" }),
}).refine(
  (data) => EventContactService.validateEmail(data.email),
  {
    message: "Please enter a valid email format",
    path: ["email"],
  }
).refine(
  (data) => EventContactService.validatePhone(data.phone),
  {
    message: "Please enter a valid phone number format",
    path: ["phone"],
  }
);

export type EventContactFormData = z.infer<typeof eventContactSchema>;

interface EventContactFormProps {
  eventId?: string;
  eventTitle?: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
  onClose?: () => void;
}

interface Event {
  id: string;
  title: string;
  event_date: string;
  status: string;
}

const EventContactForm: React.FC<EventContactFormProps> = ({
  eventId: defaultEventId,
  eventTitle: defaultEventTitle,
  onSuccess,
  onError,
  onClose
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error' | 'duplicate'>('idle');
  const [availableEvents, setAvailableEvents] = useState<Event[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors }
  } = useForm<EventContactFormData>({
    resolver: zodResolver(eventContactSchema),
    defaultValues: {
      eventId: defaultEventId || '',
      eventTitle: defaultEventTitle || '',
      name: '',
      email: '',
      phone: '',
      organization: '',
    }
  });

  const selectedEventId = watch('eventId');

  // Load available events when component mounts
  React.useEffect(() => {
    if (!defaultEventId) {
      loadEvents();
    }
  }, [defaultEventId]);

  // Check if user has already submitted for this event
  React.useEffect(() => {
    if (defaultEventId) {
      const submittedEvents = JSON.parse(localStorage.getItem('submittedEventContacts') || '[]');
      if (submittedEvents.includes(defaultEventId)) {
        setFormStatus('duplicate');
        setErrorMessage('You have already submitted a contact request for this event');
      }
    }
  }, [defaultEventId]);

  // Update event title when event ID changes
  React.useEffect(() => {
    if (selectedEventId && availableEvents.length > 0) {
      const selectedEvent = availableEvents.find(event => event.id === selectedEventId);
      if (selectedEvent) {
        setValue('eventTitle', selectedEvent.title);
      }
    }
  }, [selectedEventId, availableEvents, setValue]);

  const loadEvents = async () => {
    setLoadingEvents(true);
    try {
      const events = await EventContactService.getActiveEvents();
      setAvailableEvents(events);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoadingEvents(false);
    }
  };

  const onSubmit = async (data: EventContactFormData) => {
    setIsSubmitting(true);
    setFormStatus('idle');

    try {
      await EventContactService.submitEventContact(data);

      // Store successful submission in localStorage
      const submittedEvents = JSON.parse(localStorage.getItem('submittedEventContacts') || '[]');
      if (!submittedEvents.includes(data.eventId)) {
        submittedEvents.push(data.eventId);
        localStorage.setItem('submittedEventContacts', JSON.stringify(submittedEvents));
      }

      setFormStatus('success');
      reset();
      onSuccess?.();

      if (onClose) {
        setTimeout(() => setFormStatus('idle'), 1500);
        setTimeout(() => onClose(), 1600);
        return;
      }

      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      const errorMsg = error instanceof Error ? error.message : 'Unknown error occurred';
      setErrorMessage(errorMsg);
      
      // Check if it's a duplicate submission error
      if (errorMsg.includes('already submitted')) {
        setFormStatus('duplicate');
        
        // Store duplicate submission attempt in localStorage
        const submittedEvents = JSON.parse(localStorage.getItem('submittedEventContacts') || '[]');
        if (!submittedEvents.includes(data.eventId)) {
          submittedEvents.push(data.eventId);
          localStorage.setItem('submittedEventContacts', JSON.stringify(submittedEvents));
        }
      } else {
        setFormStatus('error');
      }
      
      onError?.(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const FormField: React.FC<{
    label: string;
    name: keyof EventContactFormData;
    type?: string;
    placeholder?: string;
    required?: boolean;
    icon?: React.ReactNode;
    children?: React.ReactNode;
  }> = ({ label, name, type = 'text', placeholder, required, icon, children }) => (
    <div className="space-y-2">
      <label htmlFor={name} className="flex items-center text-sm font-medium text-gray-700">
        {icon && <span className="mr-2">{icon}</span>}
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children || (
        <div className="relative">
          <input
            {...register(name)}
            id={name}
            type={type}
            placeholder={placeholder}
            className={`w-full px-3 py-2.5 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent ${
              errors[name] 
                ? 'border-red-300 bg-red-50 text-red-900' 
                : 'border-slate-300 hover:border-slate-400 focus:border-slate-500 bg-white'
            }`}
          />
        </div>
      )}
      {errors[name] && (
        <p className="text-sm text-red-600 flex items-center">
          <AlertCircle className="w-4 h-4 mr-1" />
          {errors[name]?.message}
        </p>
      )}
    </div>
  );

  return (
    <div className="w-full bg-transparent">
      {/* Show title and description only when not pre-populated with event */}
      {!defaultEventId && (
        <div className="mb-6 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Event Contact Form</h2>
          <p className="text-gray-600 text-sm">Get in touch with us about our upcoming events</p>
        </div>
      )}

      {formStatus === 'success' && (
        <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-400 rounded-lg flex items-start text-green-800 animate-fadeIn">
          <CheckCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-green-900">Message sent successfully!</p>
            <p className="text-sm text-green-700 mt-1">Thank you for your inquiry. We'll review your message and get back to you within 24 hours.</p>
          </div>
        </div>
      )}

      {formStatus === 'duplicate' && (
        <div className="mb-4 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-lg flex items-start text-amber-800 animate-fadeIn">
          <AlertCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-amber-900">Already Submitted</p>
            <p className="text-sm text-amber-700 mt-1">You have already submitted a contact request for this event. We'll get back to you soon!</p>
          </div>
        </div>
      )}

      {formStatus === 'error' && (
        <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 rounded-lg flex items-start text-red-800 animate-fadeIn">
          <AlertCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-red-900">Unable to send message</p>
            <p className="text-sm text-red-700 mt-1">{errorMessage || 'Please check your information and try again. If the problem persists, contact us directly.'}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Event Selection */}
        {!defaultEventId && (
          <FormField
            label="Select Event"
            name="eventId"
            required
            icon={<Calendar className="w-4 h-4" />}
          >
            <div className="relative">
              <select
                {...register('eventId')}
                className={`w-full px-3 py-2.5 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent ${
                  errors.eventId 
                    ? 'border-red-300 bg-red-50 text-red-900' 
                    : 'border-slate-300 hover:border-slate-400 focus:border-slate-500 bg-white'
                }`}
                disabled={loadingEvents}
              >
                <option value="">
                  {loadingEvents ? 'Loading events...' : 'Select an event'}
                </option>
                {availableEvents.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.title} - {new Date(event.event_date).toLocaleDateString()}
                  </option>
                ))}
              </select>
              {loadingEvents && (
                <Loader2 className="absolute right-3 top-3 w-5 h-5 animate-spin text-gray-400" />
              )}
            </div>
          </FormField>
        )}

        {/* Hidden event title field */}
        <input type="hidden" {...register('eventTitle')} />

        {/* Form fields in a 2-column grid on larger screens */}
        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            label="Full Name"
            name="name"
            placeholder="Enter your full name"
            required
            icon={<User className="w-4 h-4" />}
          />

          <FormField
            label="Email Address"
            name="email"
            type="email"
            placeholder="your.email@company.com"
            required
            icon={<Mail className="w-4 h-4" />}
          />

          <FormField
            label="Phone Number"
            name="phone"
            type="tel"
            placeholder="+91 98765 43210"
            required
            icon={<Phone className="w-4 h-4" />}
          />

          <FormField
            label="Organization"
            name="organization"
            placeholder="Company or Institution"
            required
            icon={<Building2 className="w-4 h-4" />}
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting || formStatus === 'duplicate'}
            className={`w-full flex items-center justify-center px-4 py-3 font-semibold rounded-lg text-white
              transition-all duration-200 transform hover:translate-y-[-1px] focus:outline-none focus:ring-4 focus:ring-slate-300
              ${isSubmitting || formStatus === 'duplicate'
                ? 'bg-slate-400 cursor-not-allowed' 
                : 'bg-slate-800 hover:bg-slate-900 shadow-lg hover:shadow-xl'
              }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                Sending Message...
              </>
            ) : formStatus === 'duplicate' ? (
              <>
                <CheckCircle className="w-5 h-5 mr-3" />
                Already Submitted
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-3" />
                Send Inquiry
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
};

export default EventContactForm;
