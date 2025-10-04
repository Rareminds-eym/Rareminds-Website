import React, { useState } from 'react';
import { CheckCircle, CreditCard, X } from 'lucide-react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

type PaymentModalProps = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  registrationId: number | null;
  eventName: string;
  amount: number; // Amount in rupees
  userDetails: {
    name: string;
    email: string;
    phone: string;
  };
};

const PaymentModal: React.FC<PaymentModalProps> = ({
  open,
  onClose,
  onSuccess,
  registrationId,
  eventName,
  amount,
  userDetails
}) => {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      // Load Razorpay script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handlePayment = async () => {
    if (registrationId == null) {
      setError('Registration reference missing. Please close and try again.');
      return;
    }

    setProcessing(true);
    setError('');

    try {
      // Create order using Supabase Edge Function
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      const response = await fetch(`${supabaseUrl}/functions/v1/create-payment-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({
          registrationId,
          amount, // Amount in rupees
          currency: 'INR',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to create payment order');
      }

      const order = await response.json();

      const options = {
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: 'Rareminds',
        description: `Payment for ${eventName}`,
        order_id: order.orderId,
        handler: async (paymentResult: any) => {
          try {
            // Verify payment using Supabase Edge Function
            const verifyResponse = await fetch(`${supabaseUrl}/functions/v1/verify-payment`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${supabaseKey}`,
              },
              body: JSON.stringify({
                razorpay_order_id: paymentResult.razorpay_order_id,
                razorpay_payment_id: paymentResult.razorpay_payment_id,
                razorpay_signature: paymentResult.razorpay_signature,
                registrationId,
              }),
            });

            if (!verifyResponse.ok) {
              const errorData = await verifyResponse.json().catch(() => ({}));
              throw new Error(errorData.error || 'Payment verification failed. Please contact support.');
            }

            onSuccess();
            setProcessing(false);
          } catch (verificationError: any) {
            setError(verificationError?.message || 'Payment verification failed. Please contact support.');
            setProcessing(false);
          }
        },
        prefill: {
          name: userDetails.name,
          email: userDetails.email,
          contact: userDetails.phone,
        },
        theme: {
          color: '#6366f1',
        },
        modal: {
          ondismiss: function () {
            setProcessing(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: any) {
      setError(err?.message || 'Failed to initiate payment. Please try again.');
      setProcessing(false);
    }
  };

  if (!open) return null;

  const backdropStyle = {
    backdropFilter: 'blur(6px)',
    background: 'rgba(30, 41, 59, 0.55)',
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" style={backdropStyle}>
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl w-full max-w-md relative">
        <button
          className="absolute top-4 right-4 text-slate-500 hover:text-red-500 text-xl"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        <div className="text-center mb-6">
          <CreditCard className="w-16 h-16 mx-auto mb-4 text-indigo-600" />
          <h2 className="text-2xl font-bold mb-2">Complete Payment</h2>
          <p className="text-slate-600">Secure your spot for {eventName}</p>
        </div>

        <div className="bg-slate-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-600">Event:</span>
            <span className="font-medium">{eventName}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-600">Attendee:</span>
            <span className="font-medium">{userDetails.name}</span>
          </div>
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total Amount:</span>
            <span className="text-indigo-600">₹{amount}</span>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <button
          onClick={handlePayment}
          disabled={processing}
          className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-lg hover:from-indigo-600 hover:to-purple-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {processing ? 'Processing...' : `Pay ₹${amount}`}
        </button>

        <p className="text-xs text-slate-500 text-center mt-4">
          Powered by Razorpay • Secure Payment Gateway
        </p>
      </div>
    </div>
  );
};

export default PaymentModal;