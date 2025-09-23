#!/usr/bin/env node

// Simple script to test Supabase connection
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log('🔍 Testing Supabase Connection...\n');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing environment variables:');
  console.error('VITE_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
  console.error('VITE_SUPABASE_ANON_KEY:', supabaseKey ? '✅ Set' : '❌ Missing');
  process.exit(1);
}

console.log('✅ Environment variables loaded');
console.log('📡 Supabase URL:', supabaseUrl);
console.log('🔑 API Key:', supabaseKey ? 'Present' : 'Missing');

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log('\n📡 Testing connection...');
    
    // Test optimized minimal query first
    console.log('🔍 Testing minimal query...');
    const { data: minimalData, error: minimalError } = await supabase
      .from('events')
      .select(`
        id,
        title,
        event_date,
        status,
        slug
      `)
      .limit(5);

    if (minimalError) {
      console.error('❌ Minimal query failed:', minimalError);
      return false;
    }

    console.log('✅ Minimal query successful');
    console.log('📊 Sample events:', minimalData?.length || 0);
    
    // Test full query with count
    console.log('🔍 Testing full query with count...');
    const { data, error, count } = await supabase
      .from('events')
      .select('*', { count: 'exact' })
      .limit(1);

    if (error) {
      console.error('❌ Connection test failed:', error.message);
      console.error('Error details:', error);
      return false;
    }

    console.log('✅ Connection successful!');
    console.log('📊 Events table accessible');
    console.log('📈 Total events count:', count);
    console.log('📋 Sample data:', data?.length ? 'Available' : 'Empty');

    if (data && data.length > 0) {
      console.log('🔍 First event preview:', {
        id: data[0].id,
        title: data[0].title,
        status: data[0].status
      });
    }

    return true;
  } catch (err) {
    console.error('❌ Connection error:', err.message);
    console.error('Full error:', err);
    return false;
  }
}

testConnection()
  .then(success => {
    if (success) {
      console.log('\n🎉 All tests passed! Supabase connection is working.');
    } else {
      console.log('\n💥 Tests failed. Please check your configuration.');
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('\n💥 Unexpected error:', err);
    process.exit(1);
  });