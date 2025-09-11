import React from 'react';
import EventContactForm from './EventContactForm';
import { toast } from 'sonner';

/**
 * Example usage of EventContactForm component
 * This shows different ways to use the form:
 * 1. Standalone form (loads events dynamically)
 * 2. Pre-populated with event ID and name
 * 3. With custom success/error handlers
 */

// Example 1: Standalone form that loads events dynamically
const StandaloneEventContactForm: React.FC = () => {
  const handleSuccess = () => {
    toast.success('Contact request submitted successfully!');
  };

  const handleError = (error: string) => {
    toast.error(`Error: ${error}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Contact Us About Our Events
          </h1>
          <p className="text-lg text-gray-600">
            Select an event and get in touch with our team
          </p>
        </div>
        
        <EventContactForm 
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </div>
    </div>
  );
};

// Example 2: Pre-populated form for a specific event
const PrePopulatedEventContactForm: React.FC = () => {
  // These would typically come from props, URL params, or context
  const eventId = "550e8400-e29b-41d4-a716-446655440000"; // Example UUID
  const eventTitle = "React Developer Workshop 2024";

  const handleSuccess = () => {
    // You could redirect to a thank you page or show a modal
    alert('Thank you! We will contact you soon about the React Developer Workshop.');
  };

  const handleError = (error: string) => {
    console.error('Form submission error:', error);
    alert('Something went wrong. Please try again or contact us directly.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Join the React Developer Workshop
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Fill out the form below to register your interest
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            📅 Event: {eventTitle}
          </div>
        </div>
        
        <EventContactForm 
          eventId={eventId}
          eventTitle={eventTitle}
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </div>
    </div>
  );
};

// Example 3: Modal version of the form
const EventContactModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  eventId?: string;
  eventTitle?: string;
}> = ({ isOpen, onClose, eventId, eventTitle }) => {
  const handleSuccess = () => {
    toast.success('Contact request submitted!');
    onClose();
  };

  const handleError = (error: string) => {
    toast.error(`Error: ${error}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between rounded-t-xl">
          <h2 className="text-xl font-semibold text-gray-900">
            Event Contact Form
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          <EventContactForm
            eventId={eventId}
            eventTitle={eventTitle}
            onSuccess={handleSuccess}
            onError={handleError}
          />
        </div>
      </div>
    </div>
  );
};

// Example 4: Integration with React Router (assuming you're using it)
const EventDetailPage: React.FC = () => {
  // This would typically come from URL params
  // const { eventId } = useParams();
  const eventId = "550e8400-e29b-41d4-a716-446655440000"; // Example
  const eventTitle = "AI & Machine Learning Summit 2024";
  
  return (
    <div className="min-h-screen bg-white">
      {/* Event details section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{eventTitle}</h1>
          <p className="text-xl opacity-90">
            Join industry experts for a full-day summit on the latest in AI and ML
          </p>
        </div>
      </div>

      {/* Event info and contact form */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Event information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Details</h2>
            <div className="space-y-4 text-gray-600">
              <div className="flex items-center">
                <span className="font-medium w-24">Date:</span>
                <span>March 15, 2024</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium w-24">Time:</span>
                <span>9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium w-24">Location:</span>
                <span>Tech Convention Center, San Francisco</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium w-24">Format:</span>
                <span>In-person & Virtual</span>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What You'll Learn</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Latest AI and ML frameworks and tools</li>
                <li>• Real-world implementation strategies</li>
                <li>• Industry best practices and case studies</li>
                <li>• Networking with AI professionals</li>
              </ul>
            </div>
          </div>

          {/* Contact form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Register Your Interest
            </h2>
            <EventContactForm
              eventId={eventId}
              eventTitle={eventTitle}
              onSuccess={() => {
                toast.success('Registration submitted! Check your email for confirmation.');
              }}
              onError={(error) => {
                toast.error(`Registration failed: ${error}`);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Export all examples
export {
  StandaloneEventContactForm,
  PrePopulatedEventContactForm,
  EventContactModal,
  EventDetailPage
};

// Default export for the standalone version
export default StandaloneEventContactForm;
