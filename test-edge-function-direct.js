// Test the edge function directly
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing credentials');
  console.error('VITE_SUPABASE_URL:', supabaseUrl ? '✓' : '✗');
  console.error('Service Key:', supabaseServiceKey ? '✓' : '✗');
  process.exit(1);
}

async function testEdgeFunction() {
  console.log('🧪 Testing Edge Function Directly...\n');
  
  const testRecord = {
    id: 'test-123',
    name: 'Direct Test User',
    email: 'directtest@example.com',
    company: 'Test Company',
    role: 'Developer',
    message: 'Testing edge function directly',
    download_type: 'Resume Checklist',
    submitted_at: new Date().toISOString()
  };

  const url = `${supabaseUrl}/functions/v1/send-download-notification`;
  
  console.log('📡 Calling:', url);
  console.log('📝 Payload:', testRecord);
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseServiceKey}`
      },
      body: JSON.stringify({ record: testRecord })
    });

    const text = await response.text();
    
    console.log('\n📊 Response Status:', response.status);
    console.log('📄 Response:', text);
    
    if (response.ok) {
      console.log('\n✅ Edge function executed successfully!');
      console.log('📧 Check marketing@rareminds.in for the email');
    } else {
      console.log('\n❌ Edge function failed');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testEdgeFunction();
