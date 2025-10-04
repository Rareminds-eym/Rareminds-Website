import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://itvhjkgfafikpqmuunlh.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0dmhqa2dmYWZpa3BxbXV1bmxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0MzM0MDMsImV4cCI6MjA2MjAwOTQwM30.fJ9UJS9Es-HZgUQfKP6FraPVZmur7X1kCJslp2mE4Hs';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testTableNames() {
  console.log('🔍 Testing different table names...');
  
  const tableNames = ['email_otps', 'email_otp'];
  
  for (const tableName of tableNames) {
    console.log(`\n📋 Testing table: ${tableName}`);
    
    try {
      // Test if table exists by querying it
      const { data, error } = await supabase
        .from(tableName)
        .select('count', { count: 'exact' })
        .limit(1);
      
      if (error) {
        console.log(`❌ ${tableName}: ${error.message}`);
      } else {
        console.log(`✅ ${tableName}: exists and accessible`);
        
        // Try to insert a test OTP
        console.log(`📝 Testing insert into ${tableName}...`);
        const testEmail = `test${Date.now()}@example.com`;
        const testOtp = '1234';
        const expiresAt = new Date(Date.now() + 3 * 60 * 1000).toISOString();
        
        const { data: insertData, error: insertError } = await supabase
          .from(tableName)
          .insert({
            email: testEmail,
            otp: testOtp,
            expires_at: expiresAt,
            verified: false
          })
          .select();
        
        if (insertError) {
          console.log(`❌ Insert failed: ${insertError.message}`);
          if (insertError.message.includes('permission')) {
            console.log('🔒 This is likely a permissions issue with Row Level Security');
          }
        } else {
          console.log(`✅ Insert successful!`);
          console.log(`📊 Inserted data:`, insertData[0]);
          
          // Clean up - delete the test record
          await supabase
            .from(tableName)
            .delete()
            .eq('email', testEmail);
          console.log(`🧹 Test record cleaned up`);
        }
      }
    } catch (e) {
      console.log(`❌ ${tableName}: Exception - ${e.message}`);
    }
  }
  
  console.log('\n🎯 Summary:');
  console.log('- If email_otps exists: Your table name is correct');
  console.log('- If email_otp exists: You need to either rename the table or update the Edge Function');
  console.log('- If insert fails: Check Row Level Security policies');
}

testTableNames();
