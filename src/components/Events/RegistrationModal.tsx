
import React, { useState } from "react";
import { createClient } from '@supabase/supabase-js';
import { CheckCircle, Mail, Clock } from 'lucide-react';
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
  const [registrationId, setRegistrationId] = useState<number | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  
  // OTP verification states
  const [emailVerified, setEmailVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  const extractSupabaseFunctionError = (error: unknown) => {
    if (typeof error === "object" && error !== null) {
      const typedError = error as {
        status?: number;
        message?: string;
        name?: string;
        context?: {
          error?: string;
          status?: number;
          response?: { status?: number };
        };
      };

      const contextStatus = typedError.context?.response?.status ?? typedError.context?.status;
      const contextMessage = typedError.context?.error;

      const status = contextStatus ?? typedError.status;
      let parsedMessage = typeof (contextMessage ?? typedError.message) === "string"
        ? (contextMessage ?? typedError.message) ?? ""
        : "";

      if (parsedMessage) {
        try {
          const parsed = JSON.parse(parsedMessage) as Record<string, unknown>;
          if (typeof parsed.error === "string") {
            parsedMessage = parsed.error;
          } else if (typeof parsed.message === "string") {
            parsedMessage = parsed.message;
          }
        } catch {
          // Ignore JSON parse failures
        }
      }

      return { status, message: parsedMessage, name: typedError.name };
    }

    if (error instanceof Error) {
      return { status: undefined, message: error.message, name: error.name };
    }

    return { status: undefined, message: "", name: undefined };
  };

  // Supabase client (must be before early return)
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";
  const supabase = createClient(supabaseUrl, supabaseKey);
  
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

    setSendingOtp(true);
    setOtpError("");

    try {
      console.log("🚀 Sending OTP to:", email.trim());
      
      const { data, error } = await supabase.functions.invoke("send-otp-email", {
        body: { email: email.trim() }
      });

      console.log("📧 OTP Response - Data:", data);
      console.log("❌ OTP Response - Error:", error);
      console.log("📊 Full Response:", { data, error });

      if (error) {
        console.error("OTP send error:", error);
        const { message, status, name } = extractSupabaseFunctionError(error);
        const normalizedMessage = message?.toLowerCase() ?? "";

        console.log("🔍 Extracted Error Details:", { message, status, name, normalizedMessage });

        if (status === 404 || normalizedMessage.includes("not found")) {
          setOtpError("⚠️ Email verification service is not available. Please contact support.");
        } else if (
          normalizedMessage.includes("failed to fetch") ||
          normalizedMessage.includes("cors") ||
          normalizedMessage.includes("network") ||
          name === "AbortError" ||
          name === "FunctionsFetchError"
        ) {
          setOtpError("⚠️ Cannot connect to email service. Please check your internet connection and try again.");
        } else if (normalizedMessage.includes("email service not configured")) {
          setOtpError("⚠️ Email service is not configured. Please contact support.");
        } else {
          setOtpError(message || "Failed to send OTP. Please try again or contact support.");
        }
        return;
      }

      console.log("✅ Checking data.success:", data?.success);
      console.log("📝 Data content:", JSON.stringify(data, null, 2));

      if (data?.success) {
        console.log("🎉 OTP sent successfully!");
        setOtpSent(true);
        setResendCooldown(60); // 60 seconds cooldown
      } else {
        console.log("❌ OTP send failed:", data?.error);
        setOtpError(data?.error || "Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("OTP send exception:", error);
      const { message } = extractSupabaseFunctionError(error);

      if (message?.toLowerCase().includes("failed to fetch")) {
        setOtpError("⚠️ Cannot connect to email service. The edge functions may not be deployed. See DEPLOY_NOW.md");
      } else {
        setOtpError(message || "Failed to send OTP. Please try again or contact support.");
      }
    } finally {
      setSendingOtp(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp.trim() || otp.trim().length !== 4) {
      setOtpError("Please enter the 4-digit OTP");
      return;
    }

    setVerifyingOtp(true);
    setOtpError("");

    try {
      const { data, error } = await supabase.functions.invoke("verify-otp", {
        body: {
          email: email.trim(),
          otp: otp.trim()
        }
      });

      if (error) {
        console.error("OTP verification error:", error);
        const { message, status, name } = extractSupabaseFunctionError(error);
        const normalizedMessage = message?.toLowerCase() ?? "";

        if (status === 404 || normalizedMessage.includes("not found")) {
          setOtpError("⚠️ Email verification not deployed yet. Please deploy the edge functions first. See DEPLOY_NOW.md");
        } else if (
          normalizedMessage.includes("failed to fetch") ||
          normalizedMessage.includes("cors") ||
          normalizedMessage.includes("network") ||
          name === "AbortError"
        ) {
          setOtpError("⚠️ Cannot connect to email service. The edge functions may not be deployed. See DEPLOY_NOW.md");
        } else {
          setOtpError(message || "Failed to verify OTP. Please try again.");
        }
        return;
      }

      if (data?.success) {
        setEmailVerified(true);
        setOtpError("");
      } else {
        setOtpError(data?.error || "Invalid or expired OTP");
      }
    } catch (error) {
      console.error("OTP verification exception:", error);
      const { message } = extractSupabaseFunctionError(error);

      if (message?.toLowerCase().includes("failed to fetch")) {
        setOtpError("⚠️ Cannot connect to email service. The edge functions may not be deployed. See DEPLOY_NOW.md");
      } else {
        setOtpError(message || "Failed to verify OTP. Please try again.");
      }
    } finally {
      setVerifyingOtp(false);
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
            resetForm();
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
    if (registrationId == null) {
      console.error('Missing registration ID during payment success handling');
      return;
    }

    try {
      const { error } = await supabase
        .from('event_registrations')
        .update({ payment_status: 'completed', payment_verified_at: new Date().toISOString() })
        .eq('id', registrationId);

      if (error) {
        throw error;
      }

      setShowPayment(false);
      setSuccess(true);
      resetForm();
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1500);
    } catch (err) {
      console.error('Failed to update payment status:', err);
      setSubmitError('Payment succeeded, but updating the registration record failed. Please contact support.');
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
              {/* Email Verification Section */}
              <div>
                <label className="block font-medium mb-1">Email Address</label>
                <div className="relative">
                  <input 
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
                    <label className="block font-medium mb-1">Name of Attendee</label>
                    <div className="relative">
                      <input 
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
                    <label className="block font-medium mb-1">Phone Number</label>
                    <div className="relative">
                      <input 
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
                    <label className="block font-medium mb-1">University / Company Name</label>
                    <div className="relative">
                      <input 
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
