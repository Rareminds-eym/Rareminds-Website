// Test Supabase Edge Functions
const testSupabaseFunctions = async () => {
  console.log('🧪 Testing Supabase Edge Functions...\n');

  const supabaseUrl = 'https://itvhjkgfafikpqmuunlh.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0dmhqa2dmYWZpa3BxbXV1bmxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0MzM0MDMsImV4cCI6MjA2MjAwOTQwM30.fJ9UJS9Es-HZgUQfKP6FraPVZmur7X1kCJslp2mE4Hs';

  // Test 1: Create Payment Order Function
  console.log('1. Testing create-payment-order function...');
  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/create-payment-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseKey}`,
      },
      body: JSON.stringify({
        registrationId: 999, // Test registration ID
        amount: 500, // ₹500
        currency: 'INR',
      }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ create-payment-order function working');
      console.log(`   Order ID: ${result.orderId}`);
      console.log(`   Amount: ₹${result.amount / 100}`);
      console.log(`   Key ID: ${result.keyId}`);
    } else {
      const error = await response.text();
      console.log('❌ create-payment-order function failed');
      console.log(`   Status: ${response.status}`);
      console.log(`   Error: ${error}`);
    }
  } catch (error) {
    console.log('❌ create-payment-order function error');
    console.log(`   Error: ${error.message}`);
  }

  // Test 2: Verify Payment Function (basic connectivity test)
  console.log('\n2. Testing verify-payment function connectivity...');
  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/verify-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseKey}`,
      },
      body: JSON.stringify({
        // Intentionally incomplete data to test error handling
        razorpay_order_id: 'test'
      }),
    });

    if (response.status === 400) {
      const result = await response.json();
      console.log('✅ verify-payment function accessible');
      console.log(`   Expected error: ${result.error}`);
    } else {
      console.log('❌ verify-payment function unexpected response');
      console.log(`   Status: ${response.status}`);
    }
  } catch (error) {
    console.log('❌ verify-payment function error');
    console.log(`   Error: ${error.message}`);
  }

  console.log('\n🎉 Function test completed!');
  console.log('\n📋 If functions are working, try the payment flow in your app now!');
};

testSupabaseFunctions().catch(console.error);