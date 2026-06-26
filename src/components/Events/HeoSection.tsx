import React, { useState } from "react";
import { CalendarDaysIcon, ClockIcon, MapPinIcon, TagIcon } from "@heroicons/react/24/outline";
import { Ticket, BadgeIndianRupee } from "lucide-react";
import type { EventType } from "../../types/Events/event";
import PaymentModal from "./PaymentModal";
import DynamicEventForm from "./DynamicEventForm";
import { supabase } from "../../lib/supabase";

interface HeroSectionProps {
  content?: {
    title?: string;
    description?: string;
    benefits?: string[];
  };
  eventDate?: string;
  eventTime?: string;
  location?: string;
  price?: number;
  eventType?: EventType;
  eventId?: string;
  eventName?: string;
  formId?: string | null; // ID of the custom form to render
}

const WebinarSection: React.FC<HeroSectionProps> = ({
  content,
  eventDate,
  eventTime,
  location,
  price,
  eventType = 'free',
  eventId,
  eventName,
  formId,
}) => {
  const title       = content?.title;
  const description = content?.description;
  const benefits    = content?.benefits ?? [];

  // Payment modal state
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationId, setRegistrationId] = useState<number | null>(null);
  const [userDetails, setUserDetails] = useState<{ name: string; email: string; phone: string } | null>(null);
  const [formAnswers, setFormAnswers] = useState<Record<string, any> | null>(null);

  // Handle form submission success
  const handleFormSubmitSuccess = async (formData: Record<string, any>) => {
    if (!eventId) {
      console.error('[Registration] Missing event ID');
      throw new Error('Event information is missing. Please refresh the page and try again.');
    }

    try {
      // Extract common fields (fallback to form field names)
      const firstName = formData.first_name || formData.firstName || formData.first || '';
      const lastName = formData.last_name || formData.lastName || formData.last || formData.surname || '';
      const combinedName = [firstName, lastName].filter(Boolean).join(' ');
      const name = formData.name || formData.full_name || formData.fullName || formData.attendee_name || combinedName || '';
      const email = formData.email || formData.email_address || formData.emailAddress || formData.Email || '';
      const phone = formData.phone || formData.mobile || formData.phone_number || formData.phoneNumber || formData.mobileNumber || formData.mobile_number || '';
      const organization = formData.organization || formData.company || formData.university || formData.institution_university_name || '';

      console.log('[Registration] Attempt:', JSON.stringify({ eventId, name, email, phone, organization, eventType }));

      // Find email field dynamically if standard field names don't match
      if (!email) {
        const emailKey = Object.keys(formData).find(key => 
          key.toLowerCase().includes('email')
        );
        if (emailKey && formData[emailKey]) {
          formData.email = formData[emailKey];
        }
      }

      // Re-check after dynamic search
      const finalEmail = email || formData.email;
      
      if (!finalEmail) {
        console.error('[Registration] Email not found in form data. Available keys:', Object.keys(formData));
        throw new Error(`Email is required for registration`);
      }

      // Check if user already registered for this event
      const { data: existingRegistration, error: checkError } = await supabase
        .from('event_registrations')
        .select('id, payment_status')
        .eq('event_id', eventId)
        .eq('email', finalEmail)
        .maybeSingle();

      if (checkError) {
        console.error('[Registration] Duplicate check error:', checkError);
      }

      if (existingRegistration) {
        throw new Error('You have already registered for this event. Please check your email for confirmation.');
      }

      // Check if this is a paid event
      const isPaidEvent = eventType === 'paid' && price && price > 0;

      // Save registration to database
      const registrationData = {
        event_id: eventId,
        event_name: eventName || '',
        name,
        email: finalEmail,
        phone,
        organization,
        quantity: 1,
        total_amount: isPaidEvent ? price : null,
        payment_status: isPaidEvent ? 'pending' : 'not_required'
      };

      const { data, error } = await supabase
        .from('event_registrations')
        .insert(registrationData)
        .select()
        .single();

      if (error) {
        console.error('[Registration] Supabase insert error:', error);
        throw new Error('Failed to save registration. Please try again.');
      }

      console.log('[Registration] Saved to Supabase:', { id: data.id, eventId, email: finalEmail });

      // Store form answers for later use in worker call
      setFormAnswers(formData);

      if (isPaidEvent) {
        console.log('[Registration] Paid event, showing payment modal:', { registrationId: data.id, name, email: finalEmail });
        setRegistrationId(data.id);
        setUserDetails({ name, email: finalEmail, phone });
        setShowPaymentModal(true);
      } else {
        console.log('[Registration] Free event, sending to Zoho worker');
        await sendRegistrationToWorker(null, formData);
        
        setRegistrationSuccess(true);
        setTimeout(() => {
          setRegistrationSuccess(false);
          setFormAnswers(null);
        }, 3000);
      }
    } catch (err: any) {
      console.error('[Registration] Exception:', err);
      throw err;
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (timeString?: string) => {
    if (!timeString) return null;
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Handle payment success
  const handlePaymentSuccess = async (paymentDetails: { razorpay_payment_id: string; order_id: string; payment_date: string }) => {
    if (!registrationId) {
      console.error('[Registration] No registration ID found in handlePaymentSuccess');
      return;
    }

    try {
      const { error } = await supabase
        .from('event_registrations')
        .update({ 
          payment_status: 'completed',
          razorpay_payment_id: paymentDetails.razorpay_payment_id,
          order_id: paymentDetails.order_id,
          payment_date: paymentDetails.payment_date,
          payment_verified_at: new Date().toISOString()
        })
        .eq('id', registrationId)
        .select();

      if (error) {
        console.error('[Registration] Failed to update payment status:', error);
        throw new Error('Failed to save payment details to database');
      }

      console.log('[Registration] Payment verified:', { paymentId: paymentDetails.razorpay_payment_id, orderId: paymentDetails.order_id, registrationId });

      // Send registration data to worker for Zoho CRM integration
      await sendRegistrationToWorker(paymentDetails.razorpay_payment_id, formAnswers ?? undefined);

      // Close payment modal and show success message
      setShowPaymentModal(false);
      setRegistrationSuccess(true);

      // Hide success message after 3 seconds
      setTimeout(() => {
        setRegistrationSuccess(false);
        setRegistrationId(null);
        setUserDetails(null);
        setFormAnswers(null);
      }, 3000);
    } catch (err) {
      console.error('[Registration] Exception during payment success handling:', err);
      setShowPaymentModal(false);
      alert('Payment was successful, but there was an error saving the details. Please contact support with your payment ID: ' + paymentDetails.razorpay_payment_id);
    }
  };

  // Send registration to Cloudflare Pages Function for Zoho CRM integration
  const sendRegistrationToWorker = async (paymentId: string | null, answers?: Record<string, any>) => {
    try {
      const finalAnswers = answers ?? formAnswers ?? {};
      console.log('[Registration] Sending to /api/register:', JSON.stringify({
        eventId,
        formId,
        eventType,
        eventName,
        paymentId,
        answerKeys: Object.keys(finalAnswers),
        answerCount: Object.keys(finalAnswers).length
      }));

      const payload = {
        answers: finalAnswers,
        event_id: eventId || '',
        form_id: formId || '',
        event_type: eventType,
        event_name: eventName || '',
        payment_id: paymentId,
        total_amount: eventType === 'paid' && price ? price : 0
      };

      const response = await fetch(`/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('[Registration] /api/register failed:', { status: response.status, error: errorData });
      } else {
        const responseData = await response.json().catch(() => ({}));
        console.log('[Registration] /api/register success:', responseData);
      }
    } catch (error) {
      console.error('[Registration] /api/register network error:', error);
    }
  };

  const handlePaymentClose = () => {
    setShowPaymentModal(false);
  };

  return (
    <section id="webinar-form" className="bg-gray-50 py-8 lg:py-16 rounded-3xl">
      {/* Price Banner */}
      {price !== undefined && (
        <div className="w-full bg-amber-50 border-y border-amber-200 py-2 px-4 text-center text-sm text-amber-800 font-medium mb-6 flex items-center justify-center gap-2">
          {price === 0
            ? <Ticket className="w-4 h-4 shrink-0" />
            : <BadgeIndianRupee className="w-4 h-4 shrink-0" />}
          {price === 0
            ? "This webinar is completely Free — Register now to secure your spot!"
            : `Registration Fee: ₹${price} — Reserve your seat today!`}
        </div>
      )}

      <div className="max-w-full mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8 lg:gap-12 mt-16">

        {/* Left Content */}
        <div className="text-black mt-0 lg:ml-12">
          {title && (
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mt-2">
              {title}
            </h1>
          )}

          {description && (
            <p className="mt-4 lg:mt-6 text-sm sm:text-base text-gray-700">
              {description}
            </p>
          )}

          {benefits.length > 0 && (
            <ul className="mt-6 lg:mt-8 space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2 text-sm sm:text-base">
                  <span className="text-gray-900 text-xl mt-0.5">•</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          )}

          {(eventDate || eventTime || location || price !== undefined) && (
            <div className="mt-6 lg:mt-8 flex flex-col gap-2 lg:gap-3 max-w-64">
              {eventDate && (
                <span className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-gray-200 text-xs sm:text-sm text-gray-800">
                  <CalendarDaysIcon className="text-gray-500 shrink-0 w-4 h-4" />
                  {formatDate(eventDate)}
                </span>
              )}
              {eventTime && (
                <span className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-gray-200 text-xs sm:text-sm text-gray-800">
                  <ClockIcon className="text-gray-500 shrink-0 w-4 h-4" />
                  {formatTime(eventTime)} IST
                </span>
              )}
              {location && (
                <span className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-gray-200 text-xs sm:text-sm text-gray-800">
                  <MapPinIcon className="text-gray-500 shrink-0 w-4 h-4" />
                  {location}
                </span>
              )}
              {price !== undefined && (
                <span className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-gray-200 text-xs sm:text-sm text-gray-800">
                  <TagIcon className="text-gray-500 shrink-0 w-4 h-4" />
                  {price === 0 ? "Free" : `₹${price}`}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Dynamic Event Form */}
       
          {eventId ? (
            <DynamicEventForm
              formId={formId}
              eventId={eventId}
              onSubmitSuccess={async (formData) => {
                await handleFormSubmitSuccess(formData);
              }}
            />
          ) : (
            <div className="flex items-center justify-center h-64 lg:h-96 text-gray-400 text-sm">
              Registration form not configured.
            </div>
          )}
        </div>


      {/* Sticky bottom bar — mobile only */}
      {price !== undefined && (
        <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
          <a
            href="#webinar-form"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("webinar-form")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex items-center justify-center gap-2 w-full py-4 bg-indigo-600 hover:bg-indigo-600 text-white font-bold text-base shadow-lg transition-colors"
          >
            {price === 0 ? "Reserve My Free Seat →" : `Reserve My Seat — ₹${price} →`}
          </a>
        </div>
      )}

      {/* Payment Modal for Paid Events */}
      {showPaymentModal && eventId && eventName && registrationId && userDetails && (
        <PaymentModal
          open={showPaymentModal}
          onClose={handlePaymentClose}
          onSuccess={handlePaymentSuccess}
          registrationId={registrationId}
          eventName={eventName}
          amount={price || 0}
          ticketQuantity={1}
          pricePerTicket={price}
          userDetails={userDetails}
        />
      )}

      {/* Registration Success Message */}
      {registrationSuccess && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md mx-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              {eventType === 'paid' && price && price > 0 ? (
                <>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
                  <p className="text-gray-600">Thank you for submitting your response.</p>
                  <p className="text-sm text-gray-500 mt-2">Your registration has been confirmed. We will reach out to you soon.</p>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h3>
                  <p className="text-gray-600">Thank you for registering for this event.</p>
                  <p className="text-sm text-gray-500 mt-2">Your registration has been confirmed. We will reach out to you soon.</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default WebinarSection;