// Check what course_category values exist for school courses
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://itvhjkgfafikpqmuunlh.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchoolCategories() {
  console.log('🔍 Checking course_category values for school courses...\n');

  const { data, error } = await supabase
    .from('courses')
    .select('course_category, title, category, institution_type')
    .eq('institution_type', 'school')
    .eq('category', 'course')
    .order('course_category', { ascending: true });

  if (error) {
    console.error('❌ Error:', error);
    return;
  }

  if (!data || data.length === 0) {
    console.log('❌ No school courses found');
    return;
  }

  // Get unique categories
  const categories = [...new Set(data.map(c => c.course_category))];
  
  console.log('✅ Found', data.length, 'school courses');
  console.log('\n📋 Unique course_category values:');
  categories.forEach((cat, index) => {
    const count = data.filter(c => c.course_category === cat).length;
    console.log(`${index + 1}. "${cat}" (${count} courses)`);
  });

  console.log('\n📝 All courses:');
  data.forEach((course, index) => {
    console.log(`${index + 1}. [${course.course_category}] ${course.title}`);
  });
}

checkSchoolCategories();
