
import React, { useState } from "react";
import { createClient } from '@supabase/supabase-js';
import { CheckCircle } from 'lucide-react';
import PaymentModal from './PaymentModal';

type RegistrationModalProps = {
  open: boolean;
  onClose: () => void;
  eventId: string;
  eventName: string;
  eventPrice?: number; // Optional price for paid events
};

const RegistrationModal: React.FC<RegistrationModalProps> = ({ open, onClose, eventId, eventName, eventPrice = 0 }) => {
  // Debug logging
  React.useEffect(() => {
    if (open) {
      console.log('RegistrationModal opened with:', { eventId, eventName, eventPrice });
      console.log('Event price type:', typeof eventPrice);
      console.log('Will show payment?', eventPrice > 0);
    }
  }, [open, eventId, eventName, eventPrice]);

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [registrationId, setRegistrationId] = useState("");

  if (!open) return null;

  // Backdrop overlay styles
  const backdropStyle = {
    backdropFilter: 'blur(6px)',
    background: 'rgba(30, 41, 59, 0.55)', // slate-800 with 55% opacity
  };

  // Supabase client
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";
  const supabase = createClient(supabaseUrl, supabaseKey);
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = "Name is required.";
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Valid email is required.";
    if (!phone.trim() || !/^\d{10,}$/.test(phone)) newErrors.phone = "Valid phone number is required.";
    if (!organization.trim()) newErrors.organization = "University/Company name is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    console.log('Form submitted with eventPrice:', eventPrice);
    console.log('Will require payment?', eventPrice > 0);
    
    if (validate()) {
      setSubmitting(true);
      try {
        const { data, error } = await supabase.from('event_registrations').insert({
          event_id: eventId,
          event_name: eventName,
          name,
          email,
          phone,
          organization,
          payment_status: eventPrice > 0 ? 'pending' : 'not_required'
        }).select().single();
        
        if (error) {
          console.error('Registration error:', error);
          setSubmitError(error.message);
        } else {
          console.log('Registration successful:', data);
          if (eventPrice > 0) {
            // Show payment modal for paid events
            console.log('Showing payment modal for registration ID:', data.id);
            setRegistrationId(data.id);
            setShowPayment(true);
          } else {
            // Free event - show success immediately
            console.log('Free event - showing success');
            setSuccess(true);
            setName("");
            setEmail("");
            setPhone("");
            setOrganization("");
            setTimeout(() => {
              setSuccess(false);
              onClose();
            }, 1500);
          }
        }
      } catch (err) {
        console.error('Registration catch error:', err);
        setSubmitError("Failed to submit registration. Please try again.");
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handlePaymentSuccess = async () => {
    // Update registration status to paid
    try {
      await supabase
        .from('event_registrations')
        .update({ payment_status: 'completed' })
        .eq('id', registrationId);
      
      setShowPayment(false);
      setSuccess(true);
      setName("");
      setEmail("");
      setPhone("");
      setOrganization("");
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1500);
    } catch (err) {
      console.error('Failed to update payment status:', err);
    }
  };

  const handlePaymentClose = () => {
    setShowPayment(false);
    // Optionally, you might want to delete the registration if payment is cancelled
  };

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center" style={backdropStyle}>
        <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-2xl w-full max-w-xs sm:max-w-md relative">
          <h2 className="text-2xl font-bold mb-6 text-center">Register for Event</h2>
          {eventPrice > 0 && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3 mb-4">
              <p className="text-indigo-700 text-sm text-center">
                <strong>Event Fee: ₹{eventPrice}</strong>
              </p>
              <p className="text-indigo-600 text-xs text-center mt-1">
                Payment required after registration
              </p>
            </div>
          )}
          {success ? (
            <div className="flex flex-col items-center justify-center text-green-600 font-semibold mb-4">
              <CheckCircle className="w-12 h-12 animate-bounce mb-2" />
              <span>Registration successful!</span>
              {eventPrice > 0 && <span className="text-sm text-slate-600 mt-1">Payment completed</span>}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Name of Attendee</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${errors.name ? 'border-red-500' : 'border-slate-300'}`} />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block font-medium mb-1">Email Address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${errors.email ? 'border-red-500' : 'border-slate-300'}`} />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block font-medium mb-1">Phone Number</label>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${errors.phone ? 'border-red-500' : 'border-slate-300'}`} />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="block font-medium mb-1">University / Company Name</label>
                <input type="text" value={organization} onChange={e => setOrganization(e.target.value)} className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${errors.organization ? 'border-red-500' : 'border-slate-300'}`} />
                {errors.organization && <p className="text-red-500 text-sm mt-1">{errors.organization}</p>}
              </div>
              {submitError && <div className="text-red-500 text-center text-sm mb-2">{submitError}</div>}
              <button type="submit" className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-lg hover:from-indigo-600 hover:to-purple-600 transition" disabled={submitting}>
                {submitting ? 'Submitting...' : eventPrice > 0 ? 'Register & Proceed to Payment' : 'Submit Registration'}
              </button>
            </form>
          )}
          <button className="absolute top-4 right-4 text-slate-500 hover:text-red-500 text-xl" onClick={onClose}>&times;</button>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        open={showPayment}
        onClose={handlePaymentClose}
        onSuccess={handlePaymentSuccess}
        registrationId={registrationId}
        eventName={eventName}
        amount={eventPrice}
        userDetails={{
          name,
          email,
          phone
        }}
      />
    </>
  );
};

export default RegistrationModal;
