# Razorpay Integration Setup Guide

## 1. Razorpay Account Setup

1. **Create Razorpay Account**
   - Go to [https://razorpay.com](https://razorpay.com)
   - Sign up for a new account
   - Complete the verification process

2. **Get API Keys**
   - Login to Razorpay Dashboard
   - Go to Settings → API Keys
   - Generate API Keys for Test Mode first
   - Copy the Key ID and Key Secret

3. **Update Environment Variables**
   - Replace the placeholder values in `.env` file:
   ```
   VITE_RAZORPAY_KEY_ID=rzp_test_your_actual_key_id
   RAZORPAY_KEY_SECRET=your_actual_key_secret
   ```

## 2. Database Setup

1. **Run Database Migration**
   - Open Supabase Dashboard
   - Go to SQL Editor
   - Copy and run the SQL from `database-updates.sql`

## 3. Testing the Integration

1. **Test Mode**
   - Use test API keys for development
   - Test card numbers:
     - Success: 4111 1111 1111 1111
     - Failure: 4000 0000 0000 0002
   - Any future date for expiry
   - Any 3-digit CVV

2. **Test the Flow**
   - Register for an event with a price > 0
   - Complete the payment flow
   - Verify the payment status in database

## 4. Going Live

1. **Activate Live Mode**
   - Complete KYC verification in Razorpay
   - Get Live API keys
   - Update environment variables with live keys

2. **Webhook Setup (Optional)**
   - Set up webhooks in Razorpay Dashboard
   - Add webhook endpoint: `your-domain.com/api/webhook/razorpay`
   - Select events: payment.captured, payment.failed

## 5. Usage in Components

### For Free Events
```tsx
<RegistrationModal
  open={showModal}
  onClose={() => setShowModal(false)}
  eventId="event-123"
  eventName="Free Workshop"
  // No eventPrice prop = free event
/>
```

### For Paid Events
```tsx
<RegistrationModal
  open={showModal}
  onClose={() => setShowModal(false)}
  eventId="event-123"
  eventName="Premium Workshop"
  eventPrice={500} // ₹500
/>
```

## 6. Security Considerations

1. **Environment Variables**
   - Never expose Key Secret in frontend
   - Use VITE_ prefix only for Key ID (public key)

2. **Payment Verification**
   - Always verify payments on server-side
   - Use signature verification for security

3. **Error Handling**
   - Implement proper error handling
   - Log payment failures for debugging

## 7. Troubleshooting

### Common Issues

1. **Payment Modal Not Opening**
   - Check if Razorpay script is loaded
   - Verify API keys are correct

2. **Payment Verification Failed**
   - Check Key Secret in environment
   - Verify signature calculation

3. **Database Errors**
   - Ensure payment_status column exists
   - Check Supabase permissions

### Support

- Razorpay Documentation: [https://razorpay.com/docs](https://razorpay.com/docs)
- Test your integration: [https://razorpay.com/docs/payments/test-card-details](https://razorpay.com/docs/payments/test-card-details)