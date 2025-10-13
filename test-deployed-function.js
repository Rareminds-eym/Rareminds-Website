import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://itvhjkgfafikpqmuunlh.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0dmhqa2dmYWZpa3BxbXV1bmxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0MzM0MDMsImV4cCI6MjA2MjAwOTQwM30.fJ9UJS9Es-HZgUQfKP6FraPVZmur7X1kCJslp2mE4Hs';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testDeployedFunction() {
  console.log('🔍 Testing Deployed Edge Function...');
  
  // Test with a real email to see if the function is actually trying to send emails
  const testEmail = 'karthikeyan@rareminds.in';
  console.log(`📧 Testing with real email: ${testEmail}`);
  
  console.log('\n🧹 First, let\'s clean up any old OTPs...');
  try {
    await supabase
      .from('email_otps')
      .delete()
      .eq('email', testEmail);
    console.log('✅ Old OTPs cleaned up');
  } catch (e) {
    console.log('⚠️ Could not clean up old OTPs:', e.message);
  }
  
  console.log('\n🚀 Calling Edge Function...');
  try {
    const { data, error } = await supabase.functions.invoke('send-email-otp', {
      body: { email: testEmail }
    });
    
    console.log('\n📊 Function Response:');
    console.log('Data:', JSON.stringify(data, null, 2));
    console.log('Error:', JSON.stringify(error, null, 2));
    
    if (error) {
      console.log('\n❌ Function failed with error:', error.message);
      return;
    }
    
    if (data && data.success) {
      console.log('\n✅ Function reported success');
      
      // Wait a moment for database write
      console.log('⏳ Waiting 2 seconds for database write...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Check if OTP was stored
      console.log('\n🔍 Checking database for OTP...');
      const { data: otpData, error: otpError } = await supabase
        .from('email_otps')
        .select('*')
        .eq('email', testEmail)
        .order('created_at', { ascending: false })
        .limit(1);
      
      if (otpError) {
        console.log('❌ Error querying OTP:', otpError.message);
        return;
      }
      
      if (otpData && otpData.length > 0) {
        console.log('✅ OTP FOUND in database!');
        console.log('📋 OTP Details:');
        console.log(`- Email: ${otpData[0].email}`);
        console.log(`- OTP Code: ${otpData[0].otp}`);
        console.log(`- Created: ${otpData[0].created_at}`);
        console.log(`- Expires: ${otpData[0].expires_at}`);
        console.log(`- Verified: ${otpData[0].verified}`);
        
        console.log('\n🎉 SUCCESS! Your OTP system is working!');
        console.log('📧 Check your email inbox for the OTP');
        console.log('📱 Try using the OTP in your registration form');
        
        return true;
      } else {
        console.log('❌ NO OTP found in database');
        console.log('\n🔧 This suggests one of these issues:');
        console.log('1. Edge Function database connection is failing silently');
        console.log('2. The deployed function is different from local code');
        console.log('3. Database permissions issue for the service role key');
        console.log('4. Environment variables are not being loaded correctly');
        
        return false;
      }
    } else {
      console.log('❌ Function did not report success');
      console.log('Response data:', data);
    }
  } catch (err) {
    console.error('💥 Exception:', err.message);
    return false;
  }
}

async function runTest() {
  const success = await testDeployedFunction();
  
  if (!success) {
    console.log('\n🔄 Let\'s try redeploying the Edge Function...');
    console.log('Run this command to redeploy:');
    console.log('supabase functions deploy send-email-otp');
    console.log('\nOr deploy all functions:');
    console.log('supabase functions deploy');
  }
}

runTest();
