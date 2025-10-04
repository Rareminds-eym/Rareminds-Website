import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://itvhjkgfafikpqmuunlh.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0dmhqa2dmYWZpa3BxbXV1bmxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0MzM0MDMsImV4cCI6MjA2MjAwOTQwM30.fJ9UJS9Es-HZgUQfKP6FraPVZmur7X1kCJslp2mE4Hs';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkEmailOtpsTable() {
  console.log('🔍 Checking if email_otps table exists...');
  
  try {
    // Try to query the email_otps table
    const { data, error } = await supabase
      .from('email_otps')
      .select('count', { count: 'exact' })
      .limit(1);
    
    if (error) {
      if (error.code === '42P01') { // Table does not exist
        console.log('❌ email_otps table does not exist');
        console.log('📝 You need to create the email_otps table in your Supabase database');
        console.log('🔧 Run the SQL in create-email-otps-table.sql in your Supabase SQL editor');
        return false;
      } else {
        console.error('❌ Error querying email_otps table:', error.message);
        return false;
      }
    }
    
    console.log('✅ email_otps table exists');
    console.log('📊 Records count:', data?.length || 0);
    return true;
  } catch (err) {
    console.error('❌ Exception checking table:', err.message);
    return false;
  }
}

checkEmailOtpsTable().then(exists => {
  if (exists) {
    console.log('\n🎉 Database is ready for OTP verification!');
  } else {
    console.log('\n⚠️  Database needs setup before OTP verification will work');
  }
});
