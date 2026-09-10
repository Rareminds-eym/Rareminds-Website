import React, { useState } from 'react';
import { CreditCard, X } from 'lucide-react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

let razorpayScriptPromise: Promise<void> | null = null;

const loadRazorpayScript = () => {
  if (window.Razorpay) return Promise.resolve();
  if (razorpayScriptPromise) return razorpayScriptPromise;

  razorpayScriptPromise = new Promise<void>((resolve, reject) => {
    document.getElementById('razorpay-checkout-script')?.remove();

    const script = document.createElement('script');
    script.id = 'razorpay-checkout-script';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      razorpayScriptPromise = null;
      reject(new Error('Unable to load the secure payment gateway. Please try again.'));
    };
    document.body.appendChild(script);
  });

  return razorpayScriptPromise;
};

type CapturedPayment = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type PaymentModalProps = {
  open: boolean;
  onClose: () => void;
  onSuccess: (paymentDetails: { razorpay_payment_id: string; order_id: string; payment_date: string }) => void | Promise<void>;
  registrationId: number | null;
  paymentToken: string | null;
  eventName: string;
  amount: number;
  ticketQuantity?: number;
  pricePerTicket?: number;
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
  paymentToken,
  eventName,
  amount,
  ticketQuantity = 1,
  pricePerTicket,
  userDetails
}) => {
  const [processing, setProcessing] = useState(false);
  const [paymentCaptured, setPaymentCaptured] = useState(false);
  const [capturedPayment, setCapturedPayment] = useState<CapturedPayment | null>(null);
  const [error, setError] = useState('');
  const titleId = React.useId();
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);
  const closeBlockedRef = React.useRef(processing || Boolean(capturedPayment));

  React.useEffect(() => {
    closeBlockedRef.current = processing || Boolean(capturedPayment);
  }, [processing, capturedPayment]);

  React.useEffect(() => {
    if (open) {
      setError('');
      setPaymentCaptured(false);
      setCapturedPayment(null);
    }
  }, [open]);

  React.useEffect(() => {
    if (!open) return;

    const previousActiveElement = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !closeBlockedRef.current) onClose();
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
      previousActiveElement?.focus();
    };
  }, [open, onClose]);

  const confirmCapturedPayment = async (payment: CapturedPayment) => {
    const verifyResponse = await fetch('/api/payments/verify-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payment),
    });

    const verifyResult = await verifyResponse.json().catch(() => ({}));
    if (!verifyResponse.ok || verifyResult.success !== true || verifyResult.verified !== true) {
      if (verifyResponse.status === 422) setCapturedPayment(null);
      throw new Error(verifyResult.error?.message || verifyResult.message || 'Payment verification failed. Please contact support.');
    }

    await onSuccess({
      razorpay_payment_id: payment.razorpay_payment_id,
      order_id: payment.razorpay_order_id,
      payment_date: new Date().toISOString()
    });
    setCapturedPayment(null);
    setPaymentCaptured(true);
  };

  const handlePayment = async () => {
    if (capturedPayment) {
      setProcessing(true);
      setError('');
      try {
        await confirmCapturedPayment(capturedPayment);
      } catch (verificationError) {
        setError(verificationError instanceof Error ? verificationError.message : 'Payment verification failed. Please contact support.');
      } finally {
        setProcessing(false);
      }
      return;
    }

    if (registrationId == null || !paymentToken) {
      setError('Registration payment authorization is missing. Please close and try again.');
      return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      setError('The payment amount is invalid. Please close and try again.');
      return;
    }

    setProcessing(true);
    setError('');

    try {
      await loadRazorpayScript();

      const orderResponse = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registration_id: registrationId, payment_token: paymentToken }),
      });

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `Failed to create payment order (${orderResponse.status})`);
      }

      const orderResult = await orderResponse.json();
      const order = orderResult.order;
      const razorpayKeyId = orderResult.razorpay_key_id || order?.key_id;

      if (!razorpayKeyId || !order?.id || !Number.isSafeInteger(order.amount) || !order.currency) {
        throw new Error('The payment service returned an invalid order.');
      }

      const options = {
        key: razorpayKeyId,
        amount: order.amount,
        currency: order.currency,
        name: 'Rareminds',
        description: `Payment for ${eventName}`,
        order_id: order.id,
        handler: async (paymentResult: any) => {
          const captured = {
            razorpay_order_id: paymentResult.razorpay_order_id,
            razorpay_payment_id: paymentResult.razorpay_payment_id,
            razorpay_signature: paymentResult.razorpay_signature,
          };
          setCapturedPayment(captured);
          try {
            await confirmCapturedPayment(captured);
          } catch (verificationError) {
            setError(verificationError instanceof Error ? verificationError.message : 'Payment verification failed. Please contact support.');
          } finally {
            setProcessing(false);
          }
        },
        prefill: {
          name: userDetails.name,
          email: userDetails.email,
          contact: userDetails.phone,
        },
        theme: { color: '#6366f1' },
        modal: {
          ondismiss: () => setProcessing(false),
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (paymentError) {
      setError(paymentError instanceof Error ? paymentError.message : 'Failed to initiate payment. Please try again.');
      setProcessing(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backdropFilter: 'blur(6px)', background: 'rgba(30, 41, 59, 0.55)' }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl w-full max-w-md relative"
      >
        <button
          ref={closeButtonRef}
          type="button"
          aria-label="Close payment dialog"
          className="absolute top-4 right-4 text-slate-500 hover:text-red-500 text-xl"
          onClick={onClose}
          disabled={processing || Boolean(capturedPayment)}
        >
          <X size={24} aria-hidden="true" />
        </button>

        <div className="text-center mb-6">
          <CreditCard className="w-16 h-16 mx-auto mb-4 text-indigo-600" aria-hidden="true" />
          <h2 id={titleId} className="text-2xl font-bold mb-2">Complete Payment</h2>
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
              <div className="border-t border-slate-200 my-2" />
            </>
          )}
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total Amount:</span>
            <span className="text-indigo-600">₹{amount}</span>
          </div>
        </div>

        {error && (
          <div role="alert" className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {capturedPayment && (
          <p className="text-sm text-amber-700 text-center mb-3">
            Payment was captured. Retry confirmation; contact support if it continues to fail.
          </p>
        )}

        <button
          type="button"
          onClick={handlePayment}
          disabled={processing || paymentCaptured}
          className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-lg hover:from-indigo-600 hover:to-purple-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {paymentCaptured
            ? 'Payment received'
            : processing
              ? 'Processing...'
              : capturedPayment
                ? 'Retry payment confirmation'
                : `Pay ₹${amount}`}
        </button>

        <p className="text-xs text-slate-500 text-center mt-4">
          Powered by Razorpay • Secure Payment Gateway
        </p>
      </div>
    </div>
  );
};

export default PaymentModal;
