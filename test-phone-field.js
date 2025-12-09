// Test PDF Download with Phone Number
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testPhoneField() {
  console.log('🧪 Testing PDF Download with Phone Number...\n');

  const testData = {
    name: 'Test User with Phone',
    email: 'testphone@example.com',
    phone: '+91 98765 43210',
    company: 'Test Company',
    role: 'Software Engineer',
    message: 'Testing phone number field',
    download_type: 'Resume Checklist'
  };

  console.log('📝 Inserting test record with phone number...');
  console.log('Data:', testData);

  const { data, error } = await supabase
    .from('pdf_downloads')
    .insert([testData])
    .select();

  if (error) {
    console.error('❌ Error:', error.message);
    console.error('Details:', error);
    return;
  }

  console.log('\n✅ Record inserted successfully!');
  console.log('Record ID:', data[0].id);
  console.log('Phone:', data[0].phone);
  console.log('\n📧 Email notification should include phone number');
  console.log('Check marketing@rareminds.in inbox...');
  console.log('\n✨ Test complete!');
}

testPhoneField();
