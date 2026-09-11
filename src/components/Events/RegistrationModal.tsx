
import React, { useState } from "react";
import { CheckCircle, Mail, Clock } from 'lucide-react';
import PaymentModal from './PaymentModal';
import { sendEmailOtp, verifyEmailOtp } from '@/services/emailBff';
import { createEventRegistration } from '@/services/eventRegistrationBff';

type RegistrationModalProps = {
  open: boolean;
  onClose: () => void;
  eventId: string;
  eventName: string;
  eventPrice?: number; // Optional price for paid events (total amount)
  ticketQuantity?: number; // Number of tickets
  pricePerTicket?: number; // Price per individual ticket
};

const RegistrationModal: React.FC<RegistrationModalProps> = ({ open, onClose, eventId, eventName, eventPrice = 0, ticketQuantity = 1, pricePerTicket }) => {
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
  const [registrationId, setRegistrationId] = useState<number | null>(null);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentToken, setPaymentToken] = useState<string | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  
  // OTP verification states
  const [emailVerified, setEmailVerified] = useState(false);
  const [verificationProof, setVerificationProof] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const sessionRef = React.useRef(0);
  const closeTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetForm = React.useCallback(() => {
    setName("");
    setEmail("");
    setPhone("");
    setOrganization("");
    setErrors({});
    setSubmitError("");
    setIsFormValid(false);
    setShowPayment(false);
    setRegistrationId(null);
    setPaymentAmount(0);
    setPaymentToken(null);
    setEmailVerified(false);
    setVerificationProof(null);
    setOtpSent(false);
    setOtp("");
    setOtpError("");
    setResendCooldown(0);
    setSubmitting(false);
    setSendingOtp(false);
    setVerifyingOtp(false);
  }, []);

  const clearCloseTimer = React.useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const handleClose = React.useCallback(() => {
    sessionRef.current += 1;
    clearCloseTimer();
    setSuccess(false);
    resetForm();
    onClose();
  }, [clearCloseTimer, onClose, resetForm]);

  const scheduleClose = React.useCallback(() => {
    clearCloseTimer();
    const session = sessionRef.current;
    closeTimerRef.current = setTimeout(() => {
      if (sessionRef.current === session) handleClose();
    }, 1500);
  }, [clearCloseTimer, handleClose]);

  React.useEffect(() => {
    sessionRef.current += 1;
    clearCloseTimer();
    if (!open) {
      setSuccess(false);
      resetForm();
    }
    return clearCloseTimer;
  }, [clearCloseTimer, open, resetForm]);

  // Resend cooldown timer (must be before early return)
  React.useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);
  
  // Real-time validation effect (must be before early return)
  React.useEffect(() => {
    if (!emailVerified) {
      setIsFormValid(false);
      return;
    }
    
    const isNameValid = name.trim().length > 0;
    const isPhoneValid = /^\d{10,}$/.test(phone.trim());
    const isOrgValid = organization.trim().length > 0;
    
    setIsFormValid(isNameValid && isPhoneValid && isOrgValid);
  }, [name, phone, organization, emailVerified]);

  // Early return AFTER all hooks
  if (!open) return null;

  // Backdrop overlay styles
  const backdropStyle = {
    backdropFilter: 'blur(6px)',
    background: 'rgba(30, 41, 59, 0.55)', // slate-800 with 55% opacity
  };
  
  const sendOtp = async () => {
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email.trim())) {
      setOtpError("Please enter a valid email address");
      return;
    }

    const session = sessionRef.current;
    setSendingOtp(true);
    setOtpError("");

    try {
      await sendEmailOtp(email.trim());
      if (sessionRef.current !== session) return;
      setOtpSent(true);
      setResendCooldown(60);
    } catch (error) {
      if (sessionRef.current !== session) return;
      setOtpError(error instanceof Error ? error.message : "Failed to send OTP. Please try again.");
    } finally {
      if (sessionRef.current === session) setSendingOtp(false);
    }
  };

  const verifyOtp = async () => {
    if (!/^\d{4}$/.test(otp.trim())) {
      setOtpError("Please enter the 4-digit OTP");
      return;
    }

    const session = sessionRef.current;
    setVerifyingOtp(true);
    setOtpError("");

    try {
      const proof = await verifyEmailOtp(email.trim(), otp.trim());
      if (sessionRef.current !== session) return;
      setVerificationProof(proof);
      setEmailVerified(true);
    } catch (error) {
      if (sessionRef.current !== session) return;
      setOtpError(error instanceof Error ? error.message : "Invalid or expired OTP");
    } finally {
      if (sessionRef.current === session) setVerifyingOtp(false);
    }
  };
  
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
    if (process.env.NODE_ENV === 'development') {
      console.log('Form submitted with eventPrice:', eventPrice);
      console.log('Form submitted with ticketQuantity:', ticketQuantity);
      console.log('Will require payment?', eventPrice > 0);
    }
    
    if (validate()) {
      const session = sessionRef.current;
      setSubmitting(true);
      try {
        if (!verificationProof) throw new Error('Please verify your email again.');

        const registration = await createEventRegistration({
          event_id: eventId,
          email,
          name,
          phone,
          organization,
          quantity: ticketQuantity,
          verification_proof: verificationProof,
        });
        if (sessionRef.current !== session) return;

        if (registration.payment_status === 'pending') {
          if (!registration.payment_token) throw new Error('Payment authorization was not issued.');
          setRegistrationId(registration.id);
          setPaymentAmount(registration.total_amount);
          setPaymentToken(registration.payment_token);
          setShowPayment(true);
        } else {
          setSuccess(true);
          resetForm();
          scheduleClose();
        }
      } catch (err) {
        if (sessionRef.current !== session) return;
        if (process.env.NODE_ENV === 'development') {
          console.error('Registration catch error:', err);
        }
        setSubmitError("Failed to submit registration. Please try again.");
      } finally {
        if (sessionRef.current === session) setSubmitting(false);
      }
    }
  };

  const handlePaymentSuccess = async () => {
    setShowPayment(false);
    setSuccess(true);
    resetForm();
    scheduleClose();
  };

  const handlePaymentClose = () => {
    handleClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center" style={backdropStyle}>
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="registration-dialog-title"
          className="bg-white rounded-2xl p-4 sm:p-8 shadow-2xl w-full max-w-xs sm:max-w-md relative"
        >
          <h2 id="registration-dialog-title" className="text-2xl font-bold mb-6 text-center">Register for Event</h2>
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
              {/* Email Verification Section */}
              <div>
                <label htmlFor="registration-email" className="block font-medium mb-1">Email Address</label>
                <div className="relative">
                  <input 
                    id="registration-email"
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    disabled={emailVerified}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition-all ${
                      emailVerified
                        ? 'border-green-500 bg-green-50 cursor-not-allowed'
                        : email.trim() && /^\S+@\S+\.\S+$/.test(email.trim())
                        ? 'border-green-500 bg-green-50'
                        : 'border-slate-300'
                    }`} 
                  />
                  {emailVerified && (
                    <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                  )}
                </div>
                
                {/* OTP Section */}
                {!emailVerified && (
                  <div className="mt-3">
                    {!otpSent ? (
                      <button
                        type="button"
                        onClick={sendOtp}
                        disabled={sendingOtp || !email.trim() || !/^\S+@\S+\.\S+$/.test(email.trim())}
                        className="w-full py-2 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        <Mail className="w-4 h-4" />
                        {sendingOtp ? 'Sending OTP...' : 'Send Verification Code'}
                      </button>
                    ) : (
                      <div className="space-y-3">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <p className="text-blue-700 text-sm flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            OTP sent to {email}
                          </p>
                          <p className="text-blue-600 text-xs mt-1 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Expires in 3 minutes
                          </p>
                        </div>
                        
                        <div className="relative">
                          <input
                            type="text"
                            inputMode="numeric"
                            aria-label="Four-digit verification code"
                            value={otp}
                            onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                            placeholder="Enter 4-digit OTP"
                            maxLength={4}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500 text-center text-2xl tracking-widest font-bold"
                          />
                        </div>
                        
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={verifyOtp}
                            disabled={verifyingOtp || otp.length !== 4}
                            className="flex-1 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                          >
                            {verifyingOtp ? 'Verifying...' : 'Verify OTP'}
                          </button>
                          
                          <button
                            type="button"
                            onClick={sendOtp}
                            disabled={resendCooldown > 0 || sendingOtp}
                            className="px-4 py-2 bg-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-300 transition disabled:bg-gray-200 disabled:cursor-not-allowed disabled:text-gray-400"
                          >
                            {resendCooldown > 0 ? `${resendCooldown}s` : 'Resend'}
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {otpError && (
                      <p className="text-red-500 text-sm mt-2">{otpError}</p>
                    )}
                  </div>
                )}
                
                {emailVerified && (
                  <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    Email verified successfully
                  </p>
                )}
              </div>

              {/* Other form fields - only show after email verification */}
              {emailVerified && (
                <>
                  <div>
                    <label htmlFor="registration-name" className="block font-medium mb-1">Name of Attendee</label>
                    <div className="relative">
                      <input 
                        id="registration-name"
                        type="text" 
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition-all ${
                          errors.name 
                            ? 'border-red-500' 
                            : name.trim().length > 0
                            ? 'border-green-500 bg-green-50'
                            : 'border-slate-300'
                        }`} 
                      />
                      {name.trim().length > 0 && (
                        <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                      )}
                    </div>
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="registration-phone" className="block font-medium mb-1">Phone Number</label>
                    <div className="relative">
                      <input 
                        id="registration-phone"
                        type="tel" 
                        value={phone} 
                        onChange={e => setPhone(e.target.value)} 
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition-all ${
                          errors.phone 
                            ? 'border-red-500' 
                            : phone.trim() && /^\d{10,}$/.test(phone.trim())
                            ? 'border-green-500 bg-green-50'
                            : 'border-slate-300'
                        }`} 
                      />
                      {phone.trim() && /^\d{10,}$/.test(phone.trim()) && (
                        <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                      )}
                    </div>
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="registration-organization" className="block font-medium mb-1">University / Company Name</label>
                    <div className="relative">
                      <input 
                        id="registration-organization"
                        type="text" 
                        value={organization} 
                        onChange={e => setOrganization(e.target.value)} 
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition-all ${
                          errors.organization 
                            ? 'border-red-500' 
                            : organization.trim().length > 0
                            ? 'border-green-500 bg-green-50'
                            : 'border-slate-300'
                        }`} 
                      />
                      {organization.trim().length > 0 && (
                        <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                      )}
                    </div>
                    {errors.organization && <p className="text-red-500 text-sm mt-1">{errors.organization}</p>}
                  </div>
                  
                  {submitError && <div className="text-red-500 text-center text-sm mb-2">{submitError}</div>}
                  
                  {isFormValid ? (
                    <button 
                      type="submit" 
                      className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-lg hover:from-indigo-600 hover:to-purple-600 transition transform hover:scale-[1.02] active:scale-[0.98]" 
                      disabled={submitting}
                    >
                      {submitting ? 'Submitting...' : eventPrice > 0 ? 'Register & Proceed to Payment' : 'Submit Registration'}
                    </button>
                  ) : (
                    <div className="w-full py-3 bg-gray-300 text-gray-500 font-bold rounded-lg cursor-not-allowed text-center">
                      Please fill all fields correctly
                    </div>
                  )}
                </>
              )}
            </form>
          )}
          <button
            type="button"
            aria-label="Close registration dialog"
            className="absolute top-4 right-4 text-slate-500 hover:text-red-500 text-xl"
            onClick={handleClose}
          >
            &times;
          </button>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        open={showPayment}
        onClose={handlePaymentClose}
        onSuccess={handlePaymentSuccess}
        registrationId={registrationId}
        paymentToken={paymentToken}
        eventName={eventName}
        amount={paymentAmount}
        ticketQuantity={ticketQuantity}
        pricePerTicket={pricePerTicket}
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
