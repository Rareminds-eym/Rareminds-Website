import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://itvhjkgfafikpqmuunlh.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0dmhqa2dmYWZpa3BxbXV1bmxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0MzM0MDMsImV4cCI6MjA2MjAwOTQwM30.fJ9UJS9Es-HZgUQfKP6FraPVZmur7X1kCJslp2mE4Hs';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testFinalOTP() {
  console.log('🎯 Testing FINAL OTP System...');
  
  const testEmail = 'karthikeyan@rareminds.in';
  console.log(`📧 Testing with: ${testEmail}`);
  
  // Clean up first
  console.log('\n🧹 Cleaning up old OTPs...');
  await supabase.from('email_otps').delete().eq('email', testEmail);
  
  console.log('\n📤 Step 1: Testing send-otp-email function...');
  try {
    const { data, error } = await supabase.functions.invoke('send-otp-email', {
      body: { email: testEmail }
    });
    
    console.log('Response:', { data, error });
    
    if (error) {
      console.log('❌ Send OTP failed:', error.message);
      return;
    }
    
    if (data?.success) {
      console.log('✅ Send OTP SUCCESS!');
      
      // Wait and check database
      console.log('\n⏳ Waiting 3 seconds for database write...');
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      console.log('🔍 Checking database for OTP...');
      const { data: otpData, error: otpError } = await supabase
        .from('email_otps')
        .select('*')
        .eq('email', testEmail)
        .order('created_at', { ascending: false })
        .limit(1);
      
      if (otpError) {
        console.log('❌ Database error:', otpError.message);
        return;
      }
      
      if (otpData && otpData.length > 0) {
        const otp = otpData[0];
        console.log('🎉 SUCCESS! OTP found in database:');
        console.log(`📋 Email: ${otp.email}`);
        console.log(`🔑 OTP Code: ${otp.otp}`);
        console.log(`⏰ Created: ${otp.created_at}`);
        console.log(`⌛ Expires: ${otp.expires_at}`);
        console.log(`✅ Verified: ${otp.verified}`);
        
        // Test verification
        console.log(`\n📥 Step 2: Testing verify-otp with code: ${otp.otp}...`);
        const { data: verifyData, error: verifyError } = await supabase.functions.invoke('verify-otp', {
          body: { email: testEmail, otp: otp.otp }
        });
        
        console.log('Verify response:', { data: verifyData, error: verifyError });
        
        if (verifyError) {
          console.log('❌ Verify OTP failed:', verifyError.message);
        } else if (verifyData?.success) {
          console.log('🎉 VERIFICATION SUCCESS!');
          
          console.log('\n🎊 COMPLETE SUCCESS! Your OTP system is working perfectly:');
          console.log('✅ OTP generation and storage');
          console.log('✅ Email sending (check your inbox!)');
          console.log('✅ OTP verification');
          console.log('✅ Database integration');
          
          console.log('\n📱 Now try your registration form - it should work perfectly!');
        } else {
          console.log('❌ Verify returned success=false:', verifyData?.error);
        }
        
      } else {
        console.log('❌ No OTP found in database - function may have failed silently');
      }
    } else {
      console.log('❌ Send OTP returned success=false:', data?.error);
    }
  } catch (err) {
    console.error('💥 Exception:', err.message);
  }
}

testFinalOTP();
