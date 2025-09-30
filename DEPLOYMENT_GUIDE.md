# Razorpay Payment Integration - Deployment Guide

## 🚀 Quick Deployment Steps

### 1. Deploy Edge Functions via Supabase Dashboard

Go to: https://supabase.com/dashboard/project/itvhjkgfafikpqmuunlh/functions

#### Function 1: `create-payment-order`
- Click "Create a new function"
- Name: `create-payment-order`
- Copy the code from: `supabase/functions/create-payment-order/index.ts`

#### Function 2: `verify-payment`
- Click "Create a new function" 
- Name: `verify-payment`
- Copy the code from: `supabase/functions/verify-payment/index.ts`

### 2. Set Environment Variables

Go to: https://supabase.com/dashboard/project/itvhjkgfafikpqmuunlh/settings/functions

Add these environment variables:
```
RAZORPAY_KEY_ID=rzp_test_RNNqYdwXmbBzxz
RAZORPAY_KEY_SECRET=zUYP3rpWcSObKLIrVkPrm94p
```

### 3. Test the Integration

After deployment, test with a paid event in your application.

## 🔧 Alternative: CLI Deployment

If you prefer CLI:
```bash
npx supabase login
npx supabase link --project-ref itvhjkgfafikpqmuunlh
npx supabase functions deploy create-payment-order
npx supabase functions deploy verify-payment
npx supabase secrets set RAZORPAY_KEY_ID=rzp_test_RNNqYdwXmbBzxz
npx supabase secrets set RAZORPAY_KEY_SECRET=zUYP3rpWcSObKLIrVkPrm94p
```

## 🧪 Testing

1. Find a paid event in your application
2. Try to register for it
3. The payment modal should appear
4. Use Razorpay test card: 4111 1111 1111 1111, any future date, any CVV

## 📋 Function URLs

After deployment, your functions will be available at:
- Create Order: `https://itvhjkgfafikpqmuunlh.supabase.co/functions/v1/create-payment-order`
- Verify Payment: `https://itvhjkgfafikpqmuunlh.supabase.co/functions/v1/verify-payment`