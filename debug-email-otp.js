import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://itvhjkgfafikpqmuunlh.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0dmhqa2dmYWZpa3BxbXV1bmxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0MzM0MDMsImV4cCI6MjA2MjAwOTQwM30.fJ9UJS9Es-HZgUQfKP6FraPVZmur7X1kCJslp2mE4Hs';

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugEmailOTP() {
  console.log('🔍 Debugging OTP Email Sending...');
  console.log('Testing with email: karthikeyan@rareminds.in');
  
  try {
    console.log('\n📧 Calling send-email-otp function...');
    
    const { data, error } = await supabase.functions.invoke('send-email-otp', {
      body: { email: 'karthikeyan@rareminds.in' }
    });
    
    console.log('\n📊 Response Details:');
    console.log('Data:', JSON.stringify(data, null, 2));
    console.log('Error:', JSON.stringify(error, null, 2));
    
    if (error) {
      console.log('\n❌ Function Error Details:');
      console.log('- Name:', error.name);
      console.log('- Message:', error.message);
      console.log('- Status:', error.status);
      
      if (error.context) {
        console.log('- Context Status:', error.context.status);
        console.log('- Context Response:', error.context.response?.status);
        
        // Try to get response body
        if (error.context.response && typeof error.context.response.text === 'function') {
          try {
            const responseText = await error.context.response.text();
            console.log('- Response Body:', responseText);
          } catch (e) {
            console.log('- Could not read response body');
          }
        }
      }
    }
    
    if (data) {
      console.log('\n✅ Function Response:');
      if (data.success) {
        console.log('🎉 OTP function reported success!');
        console.log('📬 Email should have been sent');
        
        // Check if OTP was stored in database
        console.log('\n🔍 Checking database for stored OTP...');
        const { data: otpData, error: otpError } = await supabase
          .from('email_otps')
          .select('*')
          .eq('email', 'karthikeyan@rareminds.in')
          .order('created_at', { ascending: false })
          .limit(1);
        
        if (otpError) {
          console.log('❌ Error checking OTP database:', otpError.message);
        } else if (otpData && otpData.length > 0) {
          console.log('✅ OTP found in database:');
          console.log('- OTP:', otpData[0].otp);
          console.log('- Created:', otpData[0].created_at);
          console.log('- Expires:', otpData[0].expires_at);
          console.log('- Verified:', otpData[0].verified);
        } else {
          console.log('⚠️  No OTP found in database - database table might not exist');
        }
        
      } else {
        console.log('❌ OTP function reported failure');
        console.log('Error message:', data.error || data.message);
      }
    }
    
    // Additional checks
    console.log('\n🔧 Troubleshooting Steps:');
    console.log('1. Check if email_otps table exists in your Supabase database');
    console.log('2. Check if RM_Emails environment variable is set in Edge Functions');
    console.log('3. Verify your Resend API key is valid and active');
    console.log('4. Check spam folder in your email');
    console.log('5. Try with a different email address');
    
  } catch (err) {
    console.error('❌ Exception during test:', err);
  }
}

debugEmailOTP();
