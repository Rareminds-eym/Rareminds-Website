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
  onSuccess: (paymentDetails: { razorpay_payment_id: string; order_id: string; payment_date: string }) => void;
  registrationId: number | null;
  eventName: string;
  amount: number; // Amount in rupees (total)
  ticketQuantity?: number; // Number of tickets
  pricePerTicket?: number; // Price per individual ticket
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
  ticketQuantity = 1,
  pricePerTicket,
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

    // Ensure minimum amount is ₹1 as required by Razorpay
    const minimumAmount = 1;
    const finalAmount = Math.max(minimumAmount, amount);
    const amountInPaise = Math.round(finalAmount * 100); // Convert rupees to paise

    setProcessing(true);
    setError('');

    try {
      const paymentsApiUrl = '/api/payments';

      if (process.env.NODE_ENV === 'development') {
        console.log('Creating payment order with:', {
          registrationId,
          amount: amountInPaise,
          currency: 'INR',
          paymentsApiUrl
        });
      }

      const receipt = `rcpt_${registrationId}_${Date.now()}`;

      // Create order through Pages Function. The function calls the payment worker service binding.
      const orderResponse = await fetch(`${paymentsApiUrl}/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: 'INR',
          receipt,
          notes: {
            registration_id: registrationId.toString(),
            event_name: eventName,
            customer_name: userDetails.name,
            customer_email: userDetails.email,
          }
        }),
      });

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json().catch(() => ({}));
        if (process.env.NODE_ENV === 'development') {
          console.error('Payment order creation failed:', {
            status: orderResponse.status,
            statusText: orderResponse.statusText,
            errorData
          });
        }
        throw new Error(errorData.error?.message || `Failed to create payment order (${orderResponse.status})`);
      }

      const orderResult = await orderResponse.json();
      const order = orderResult.order;
      const razorpayKeyId = orderResult.razorpay_key_id || order?.key_id;

      if (!razorpayKeyId) {
        throw new Error('Razorpay Key ID not returned by payment service');
      }

      if (process.env.NODE_ENV === 'development') {
        console.log('Payment order created:', order);
      }

      const options = {
        key: razorpayKeyId,
        amount: order.amount,
        currency: order.currency,
        name: 'Rareminds',
        description: `Payment for ${eventName}`,
        order_id: order.id,
        handler: async (paymentResult: any) => {
          try {
            if (process.env.NODE_ENV === 'development') {
              console.log('Payment successful, verifying...', paymentResult);
            }

            // Verify payment through Pages Function. The function calls the payment worker service binding.
            const verifyResponse = await fetch(`${paymentsApiUrl}/verify-payment`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: paymentResult.razorpay_order_id,
                razorpay_payment_id: paymentResult.razorpay_payment_id,
                razorpay_signature: paymentResult.razorpay_signature,
              }),
            });

            if (!verifyResponse.ok) {
              const errorData = await verifyResponse.json().catch(() => ({}));
              if (process.env.NODE_ENV === 'development') {
                console.error('Payment verification failed:', errorData);
              }
              throw new Error(errorData.error?.message || 'Payment verification failed. Please contact support.');
            }

            const verifyResult = await verifyResponse.json();
            if (process.env.NODE_ENV === 'development') {
              console.log('Payment verified:', verifyResult);
            }

            // Pass payment details back to parent
            onSuccess({
              razorpay_payment_id: paymentResult.razorpay_payment_id,
              order_id: paymentResult.razorpay_order_id,
              payment_date: new Date().toISOString()
            });
            setProcessing(false);
          } catch (verificationError: any) {
            if (process.env.NODE_ENV === 'development') {
              console.error('Verification error:', verificationError);
            }
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
      if (process.env.NODE_ENV === 'development') {
        console.error('Payment initiation error:', err);
      }
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
          {ticketQuantity > 1 && pricePerTicket && (
            <>
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-600">Tickets:</span>
                <span className="font-medium">{ticketQuantity} × ₹{pricePerTicket}</span>
              </div>
              <div className="border-t border-slate-200 my-2"></div>
            </>
          )}
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