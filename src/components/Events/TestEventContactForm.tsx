import React from 'react';
import EventContactForm from './EventContactForm';
import { toast, Toaster } from 'sonner';

/**
 * Test page to verify EventContactForm is working correctly
 * Visit this page to test the form without going through the full event detail page
 */
const TestEventContactForm: React.FC = () => {
  const handleSuccess = () => {
    toast.success('✅ Form submitted successfully!');
    console.log('Form submitted successfully!');
  };

  const handleError = (error: string) => {
    toast.error(`❌ Form error: ${error}`);
    console.error('Form error:', error);
  };

  // Test data - replace with real event ID from your database
  const testEventId = "550e8400-e29b-41d4-a716-446655440000"; // Replace with real UUID
  const testEventTitle = "Test Event - React Workshop";

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <Toaster position="top-right" />
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Event Contact Form Test
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            This is a test page to verify the EventContactForm component is working correctly.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Standalone Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Standalone Form (Dynamic Event Selection)
            </h2>
            <EventContactForm 
              onSuccess={handleSuccess}
              onError={handleError}
            />
          </div>

          {/* Pre-populated Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Pre-populated Form (Specific Event)
            </h2>
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Event ID:</strong> {testEventId}<br/>
                <strong>Event Title:</strong> {testEventTitle}
              </p>
            </div>
            <EventContactForm 
              eventId={testEventId}
              eventTitle={testEventTitle}
              onSuccess={handleSuccess}
              onError={handleError}
            />
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Debug Information</h3>
          <div className="space-y-2 text-sm">
            <p><strong>Database Table:</strong> event_contact</p>
            <p><strong>Expected Columns:</strong> id, event_id, event_title, name, email, phone, organization, created_at</p>
            <p><strong>Events Table Columns Used:</strong> id, title, event_date, status, description, location</p>
            <p><strong>Status Values Expected:</strong> upcoming, ongoing, active</p>
          </div>
          
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Make sure you have at least one event in your database with status 'upcoming', 'ongoing', or 'active' for the dynamic form to work.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestEventContactForm;
