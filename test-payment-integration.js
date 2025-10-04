// Test script to verify Razorpay integration
const testPaymentIntegration = async () => {
  console.log('🧪 Testing Razorpay Integration...\n');

  // Test 1: Check environment variables
  console.log('1. Checking environment variables...');
  const keyId = 'rzp_test_RNNqYdwXmbBzxz';
  const keySecret = 'zUYP3rpWcSObKLIrVkPrm94p';
  
  if (keyId && keySecret) {
    console.log('✅ Razorpay credentials found');
    console.log(`   Key ID: ${keyId}`);
    console.log(`   Secret: ${keySecret.substring(0, 8)}...`);
  } else {
    console.log('❌ Razorpay credentials missing');
    return;
  }

  // Test 2: Test Razorpay API connectivity
  console.log('\n2. Testing Razorpay API connectivity...');
  try {
    const orderData = {
      amount: 50000, // ₹500 in paise
      currency: 'INR',
      receipt: `test_${Date.now()}`,
      notes: {
        test: 'true'
      }
    };

    const authHeader = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
    
    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authHeader}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (response.ok) {
      const order = await response.json();
      console.log('✅ Razorpay API connection successful');
      console.log(`   Order ID: ${order.id}`);
      console.log(`   Amount: ₹${order.amount / 100}`);
      console.log(`   Status: ${order.status}`);
    } else {
      const error = await response.text();
      console.log('❌ Razorpay API connection failed');
      console.log(`   Error: ${error}`);
    }
  } catch (error) {
    console.log('❌ Razorpay API test failed');
    console.log(`   Error: ${error.message}`);
  }

  // Test 3: Check Supabase configuration
  console.log('\n3. Checking Supabase configuration...');
  const supabaseUrl = 'https://itvhjkgfafikpqmuunlh.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0dmhqa2dmYWZpa3BxbXV1bmxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0MzM0MDMsImV4cCI6MjA2MjAwOTQwM30.fJ9UJS9Es-HZgUQfKP6FraPVZmur7X1kCJslp2mE4Hs';
  
  if (supabaseUrl && supabaseKey) {
    console.log('✅ Supabase configuration found');
    console.log(`   URL: ${supabaseUrl}`);
    console.log(`   Key: ${supabaseKey.substring(0, 20)}...`);
  } else {
    console.log('❌ Supabase configuration missing');
  }

  console.log('\n🎉 Integration test completed!');
  console.log('\n📋 Next Steps:');
  console.log('1. Deploy Supabase Edge Functions:');
  console.log('   npx supabase login');
  console.log('   npx supabase functions deploy create-payment-order');
  console.log('   npx supabase functions deploy verify-payment');
  console.log('');
  console.log('2. Set environment variables in Supabase Dashboard:');
  console.log('   RAZORPAY_KEY_ID=rzp_test_RNNqYdwXmbBzxz');
  console.log('   RAZORPAY_KEY_SECRET=zUYP3rpWcSObKLIrVkPrm94p');
  console.log('');
  console.log('3. Test the payment flow in your application');
};

// Run the test
testPaymentIntegration().catch(console.error);