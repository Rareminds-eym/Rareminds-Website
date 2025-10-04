import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://itvhjkgfafikpqmuunlh.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0dmhqa2dmYWZpa3BxbXV1bmxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0MzM0MDMsImV4cCI6MjA2MjAwOTQwM30.fJ9UJS9Es-HZgUQfKP6FraPVZmur7X1kCJslp2mE4Hs';

console.log('🔍 Testing Supabase Edge Functions...');
console.log('URL:', supabaseUrl);
console.log('Key:', supabaseKey ? 'Set (length: ' + supabaseKey.length + ')' : 'Missing');

const supabase = createClient(supabaseUrl, supabaseKey);

async function testBasicConnection() {
  console.log('\n📡 Testing basic Supabase connection...');
  try {
    const { data, error } = await supabase
      .from('events')
      .select('count', { count: 'exact' })
      .limit(1);
    
    if (error) {
      console.error('❌ Basic connection failed:', error.message);
      return false;
    }
    
    console.log('✅ Basic connection successful');
    console.log('📊 Events available:', data?.length || 0);
    return true;
  } catch (err) {
    console.error('❌ Connection error:', err.message);
    return false;
  }
}

async function testEdgeFunction(functionName, payload) {
  console.log(`\n🚀 Testing Edge Function: ${functionName}...`);
  try {
    const { data, error } = await supabase.functions.invoke(functionName, {
      body: payload
    });
    
    if (error) {
      console.error(`❌ ${functionName} error:`, {
        name: error.name,
        message: error.message,
        status: error.status,
        context: error.context
      });
      
      if (error.name === 'FunctionsFetchError') {
        if (error.context?.status === 404) {
          console.log(`⚠️  Function '${functionName}' not found (404) - likely not deployed`);
        } else if (error.context?.status === 500) {
          console.log(`⚠️  Function '${functionName}' server error (500) - deployed but failing`);
        } else {
          console.log(`⚠️  Function '${functionName}' network error - check deployment and network`);
        }
      }
      return false;
    }
    
    console.log(`✅ ${functionName} response:`, data);
    return true;
  } catch (err) {
    console.error(`❌ ${functionName} exception:`, err.message);
    console.log(`⚠️  This usually means the Edge Function is not deployed`);
    return false;
  }
}

async function runTests() {
  console.log('🏁 Starting comprehensive tests...\n');
  
  // Test 1: Basic connection
  const basicConnection = await testBasicConnection();
  
  if (!basicConnection) {
    console.log('\n❌ Stopping tests - basic connection failed');
    return;
  }
  
  // Test 2: Edge Functions
  const sendOtpTest = await testEdgeFunction('send-email-otp', {
    email: 'test@example.com'
  });
  
  const verifyOtpTest = await testEdgeFunction('verify-email-otp', {
    email: 'test@example.com',
    otp: '1234'
  });
  
  // Summary
  console.log('\n📋 Test Summary:');
  console.log('✅ Basic Connection:', basicConnection ? 'PASS' : 'FAIL');
  console.log('📧 Send OTP Function:', sendOtpTest ? 'PASS' : 'FAIL');
  console.log('🔐 Verify OTP Function:', verifyOtpTest ? 'PASS' : 'FAIL');
  
  if (!sendOtpTest || !verifyOtpTest) {
    console.log('\n🔧 Recommended Actions:');
    console.log('1. Deploy Edge Functions using: supabase functions deploy');
    console.log('2. Check function logs: supabase functions logs');
    console.log('3. Verify environment variables in Supabase dashboard');
    console.log('4. Check CORS settings in supabase/config.toml');
  }
}

runTests().catch(console.error);
