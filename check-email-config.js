import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://itvhjkgfafikpqmuunlh.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0dmhqa2dmYWZpa3BxbXV1bmxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0MzM0MDMsImV4cCI6MjA2MjAwOTQwM30.fJ9UJS9Es-HZgUQfKP6FraPVZmur7X1kCJslp2mE4Hs';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkEmailConfig() {
  console.log('🔍 Checking Email Service Configuration...');
  
  // First, check if we can access the database table now
  console.log('\n📊 Testing database table access...');
  try {
    const { data, error } = await supabase
      .from('email_otps')
      .select('count', { count: 'exact' })
      .limit(1);
    
    if (error) {
      console.log('❌ Database table error:', error.message);
      return;
    } else {
      console.log('✅ Database table accessible');
    }
  } catch (e) {
    console.log('❌ Database connection error:', e.message);
    return;
  }
  
  // Let's try with a different email to avoid rate limiting
  const testEmail = `test${Date.now()}@example.com`;
  console.log(`\n📧 Testing with fresh email: ${testEmail}`);
  
  try {
    const { data, error } = await supabase.functions.invoke('send-email-otp', {
      body: { email: testEmail }
    });
    
    console.log('\n📊 Response:');
    console.log('Data:', JSON.stringify(data, null, 2));
    console.log('Error:', JSON.stringify(error, null, 2));
    
    if (error) {
      if (error.context?.status === 429) {
        console.log('\n⏰ Rate Limiting Detected');
        console.log('This could be from:');
        console.log('- Supabase Edge Function rate limits');
        console.log('- Email service (Resend) rate limits');
        console.log('- Try again in a few minutes');
      } else if (error.context?.status === 500) {
        console.log('\n💥 Server Error - Likely Configuration Issue');
        console.log('This usually means:');
        console.log('- RM_Emails environment variable not set');
        console.log('- Invalid Resend API key');
        console.log('- Email service misconfigured');
      }
    }
    
    if (data && data.success) {
      console.log('\n🎉 Success! Email service is working');
      
      // Check if OTP was stored
      setTimeout(async () => {
        const { data: otpData, error: otpError } = await supabase
          .from('email_otps')
          .select('*')
          .eq('email', testEmail)
          .order('created_at', { ascending: false })
          .limit(1);
        
        if (otpError) {
          console.log('❌ Error checking stored OTP:', otpError.message);
        } else if (otpData && otpData.length > 0) {
          console.log('✅ OTP stored in database:');
          console.log(`- OTP Code: ${otpData[0].otp}`);
          console.log(`- Email: ${otpData[0].email}`);
          console.log(`- Expires: ${otpData[0].expires_at}`);
        } else {
          console.log('⚠️ No OTP found in database');
        }
      }, 1000);
    }
    
  } catch (err) {
    console.error('❌ Exception:', err.message);
  }
}

console.log('⏳ Waiting 2 seconds to avoid rate limits...');
setTimeout(checkEmailConfig, 2000);
