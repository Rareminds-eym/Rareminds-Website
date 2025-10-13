# Payment Integration Troubleshooting Guide

## "Failed to create payment order" Error

This error can occur for several reasons. Follow these steps to diagnose and fix the issue:

### 1. Check Browser Console
Open your browser's Developer Tools (F12) and check the Console tab for detailed error messages. Look for:
- The log message starting with "Creating payment order with:"
- The error message starting with "Payment order creation failed:"

### 2. Common Causes and Solutions

#### A. Edge Function Not Deployed
**Symptom:** 404 error or "Function not found"

**Solution:**
```bash
# Deploy the edge function
npx supabase functions deploy create-payment-order
```

#### B. Missing Environment Variables
**Symptom:** "Payment service configuration error" or 500 error

**Solution:**
Check that these environment variables are set in your Supabase project:
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

To set them:
```bash
npx supabase secrets set RAZORPAY_KEY_ID=your_key_id
npx supabase secrets set RAZORPAY_KEY_SECRET=your_key_secret
```

#### C. Invalid Registration ID
**Symptom:** "Registration not found" or 404 error

**Solution:**
- Ensure the registration was created successfully before opening the payment modal
- Check the `event_registrations` table in Supabase to verify the registration exists

#### D. CORS Issues
**Symptom:** Network error or CORS policy error

**Solution:**
- Ensure your Supabase URL is correct in `.env` file
- Check that the edge function has proper CORS headers (already implemented)

#### E. Amount Validation Issues
**Symptom:** "Missing required fields" or validation error

**Solution:**
- Ensure `amount` is a valid number greater than 0
- Check that the price is being parsed correctly from the event data

### 3. Debug Steps

1. **Check the console logs:**
   - Open browser DevTools (F12)
   - Go to Console tab
   - Try to make a payment
   - Look for the log "Creating payment order with:" - this shows what data is being sent
   - Look for any error messages

2. **Verify the registration:**
   - Go to your Supabase dashboard
   - Open the `event_registrations` table
   - Find the registration record
   - Check that it has a valid `id`

3. **Test the edge function directly:**
   ```bash
   # Run this in your terminal
   node test-supabase-functions.js
   ```

4. **Check environment variables:**
   - Verify `.env` file has:
     ```
     VITE_SUPABASE_URL=your_supabase_url
     VITE_SUPABASE_ANON_KEY=your_anon_key
     ```

### 4. Quick Fix Checklist

- [ ] Edge function is deployed
- [ ] Razorpay credentials are set in Supabase secrets
- [ ] `.env` file has correct Supabase URL and anon key
- [ ] Registration is created successfully before payment
- [ ] Amount is a valid positive number
- [ ] Browser console shows detailed error logs

### 5. Still Having Issues?

If you've checked all the above and still have issues:

1. Check the specific error code in the console:
   - **404**: Function not deployed or wrong URL
   - **500**: Server error (check Supabase logs)
   - **400**: Invalid request data
   - **401/403**: Authentication issue

2. Check Supabase Function Logs:
   - Go to Supabase Dashboard
   - Navigate to Edge Functions
   - Click on `create-payment-order`
   - Check the logs for detailed error messages

3. Verify Razorpay credentials:
   - Log into Razorpay Dashboard
   - Go to Settings > API Keys
   - Ensure you're using the correct Key ID and Secret
   - For testing, use Test Mode credentials

### 6. Testing Payment Flow

To test the complete payment flow:

1. **Test Mode (Recommended for development):**
   - Use Razorpay Test Mode credentials
   - Test card: 4111 1111 1111 1111
   - Any future expiry date
   - Any CVV

2. **Verify the flow:**
   - Select quantity of tickets
   - Fill registration form
   - Submit registration
   - Payment modal should open with correct total
   - Click "Pay" button
   - Razorpay checkout should open
   - Complete test payment
   - Verify payment status updates in database

### 7. Recent Changes

The following changes were made to fix the multiple ticket pricing issue:
- `EventDetail.tsx`: Now calculates total amount based on quantity
- `RegistrationModal.tsx`: Passes quantity and price per ticket
- `PaymentModal.tsx`: Displays ticket breakdown for multiple tickets

These changes should not affect the payment creation, but if you're experiencing issues after updating, ensure all props are being passed correctly.