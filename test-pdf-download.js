// Test PDF Download Email Notification
// This script tests if the pdf_downloads table and email trigger work correctly

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  console.error('Required: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testPdfDownload() {
  console.log('🧪 Testing PDF Download Email Notification...\n');

  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    company: 'Test Company',
    role: 'Software Engineer',
    message: 'This is a test download',
    download_type: 'Resume Checklist'
  };

  console.log('📝 Inserting test download record...');
  console.log('Data:', testData);

  const { data, error } = await supabase
    .from('pdf_downloads')
    .insert([testData])
    .select();

  if (error) {
    console.error('❌ Error inserting record:', error.message);
    return;
  }

  console.log('✅ Record inserted successfully!');
  console.log('Record ID:', data[0].id);
  console.log('\n📧 Email notification should be sent to marketing@rareminds.in');
  console.log('Check your inbox in a few seconds...');
  console.log('\n✨ Test complete!');
}

testPdfDownload();
