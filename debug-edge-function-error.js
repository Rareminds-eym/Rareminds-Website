import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://itvhjkgfafikpqmuunlh.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0dmhqa2dmYWZpa3BxbXV1bmxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0MzM0MDMsImV4cCI6MjA2MjAwOTQwM30.fJ9UJS9Es-HZgUQfKP6FraPVZmur7X1kCJslp2mE4Hs';

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugEdgeFunctionError() {
  console.log('🔍 Debugging Edge Function Error...');
  console.log(`⏰ Time: ${new Date().toISOString()}`);
  
  // Test with a unique email to avoid any rate limiting issues
  const testEmail = `debug${Date.now()}@test.com`;
  console.log(`📧 Testing with email: ${testEmail}`);
  
  try {
    console.log('\n🚀 Calling send-email-otp Edge Function...');
    
    const response = await supabase.functions.invoke('send-email-otp', {
      body: { email: testEmail }
    });
    
    console.log('\n📊 Raw Response:');
    console.log('Data:', JSON.stringify(response.data, null, 2));
    console.log('Error:', JSON.stringify(response.error, null, 2));
    
    if (response.error) {
      console.log('\n❌ Error Analysis:');
      console.log('Error Name:', response.error.name);
      console.log('Error Message:', response.error.message);
      
      if (response.error.context) {
        console.log('Context Status:', response.error.context.status);
        console.log('Context Details:', JSON.stringify(response.error.context, null, 2));
        
        // Try to extract response body for more details
        if (response.error.context.response) {
          try {
            // Get the response object
            const errorResponse = response.error.context.response;
            console.log('Response Status:', errorResponse.status);
            console.log('Response Status Text:', errorResponse.statusText);
            
            // Try to read the response body
            if (errorResponse.body && !errorResponse.bodyUsed) {
              const reader = errorResponse.body.getReader();
              const chunks = [];
              
              try {
                while (true) {
                  const { done, value } = await reader.read();
                  if (done) break;
                  chunks.push(value);
                }
                
                const responseText = new TextDecoder().decode(
                  chunks.reduce((acc, chunk) => {
                    const newAcc = new Uint8Array(acc.length + chunk.length);
                    newAcc.set(acc);
                    newAcc.set(chunk, acc.length);
                    return newAcc;
                  }, new Uint8Array(0))
                );
                
                console.log('Response Body:', responseText);
                
                // Try to parse as JSON
                try {
                  const jsonResponse = JSON.parse(responseText);
                  console.log('Parsed Error Details:', JSON.stringify(jsonResponse, null, 2));
                } catch (e) {
                  console.log('Response is not JSON format');
                }
              } catch (readError) {
                console.log('Could not read response body:', readError.message);
              }
            }
          } catch (bodyError) {
            console.log('Error reading response details:', bodyError.message);
          }
        }
        
        // Analyze common status codes
        const status = response.error.context.status;
        console.log(`\n🔍 Status Code Analysis (${status}):`);
        
        switch (status) {
          case 400:
            console.log('❌ Bad Request - Invalid input data or missing parameters');
            break;
          case 401:
            console.log('❌ Unauthorized - Authentication issues');
            break;
          case 403:
            console.log('❌ Forbidden - Permission issues');
            break;
          case 429:
            console.log('❌ Rate Limited - Too many requests');
            break;
          case 500:
            console.log('❌ Internal Server Error - Function crashed or configuration issue');
            break;
          case 502:
            console.log('❌ Bad Gateway - Function timeout or startup failure');
            break;
          case 503:
            console.log('❌ Service Unavailable - Function overloaded');
            break;
          default:
            console.log(`❌ Unknown status code: ${status}`);
        }
      }
    } else if (response.data) {
      console.log('\n✅ Function executed successfully!');
      if (response.data.success) {
        console.log('🎉 OTP should have been generated and email sent');
        
        // Check if OTP was stored in database
        console.log('\n🔍 Checking database for stored OTP...');
        const { data: otpData, error: otpError } = await supabase
          .from('email_otps')
          .select('*')
          .eq('email', testEmail)
          .order('created_at', { ascending: false })
          .limit(1);
        
        if (otpError) {
          console.log('❌ Error checking OTP database:', otpError.message);
        } else if (otpData && otpData.length > 0) {
          console.log('✅ OTP found in database:');
          console.log('- OTP Code:', otpData[0].otp);
          console.log('- Created:', otpData[0].created_at);
          console.log('- Expires:', otpData[0].expires_at);
        } else {
          console.log('⚠️ No OTP found in database');
        }
      } else {
        console.log('⚠️ Function returned success=false');
        console.log('Error details:', response.data.error || 'No error message');
      }
    }
    
  } catch (error) {
    console.log('\n💥 Exception caught:');
    console.log('Type:', error.constructor.name);
    console.log('Message:', error.message);
    console.log('Stack:', error.stack);
  }
  
  console.log('\n🔧 Common Solutions:');
  console.log('1. Check if RM_Emails environment variable is set in Supabase');
  console.log('2. Verify Resend API key is valid');
  console.log('3. Check function logs in Supabase dashboard');
  console.log('4. Ensure SUPABASE_SERVICE_ROLE_KEY is set in Edge Functions');
  console.log('5. Try redeploying the Edge Function');
}

debugEdgeFunctionError();
