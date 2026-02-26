import { createClient } from '@supabase/supabase-js';
import XLSX from 'xlsx';

// Supabase configuration
const supabaseUrl = 'https://itvhjkgfafikpqmuunlh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0dmhqa2dmYWZpa3BxbXV1bmxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0MzM0MDMsImV4cCI6MjA2MjAwOTQwM30.fJ9UJS9Es-HZgUQfKP6FraPVZmur7X1kCJslp2mE4Hs';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to parse semicolon-separated text into array
function parseToArray(text) {
  if (!text) return [];
  return text.split(';').map(item => item.trim()).filter(item => item);
}

// Helper function to parse curriculum text into structured JSON
function parseCurriculum(text) {
  if (!text) return [];
  
  const units = text.split('\n').filter(line => line.trim());
  return units.map(unit => {
    const match = unit.match(/Unit (\d+) \(([^)]+)\): ([^—]+)—(.+)/);
    if (match) {
      return {
        unit: `Unit ${match[1]}`,
        duration: match[2].trim(),
        title: match[3].trim(),
        description: match[4].trim()
      };
    }
    return null;
  }).filter(item => item !== null);
}

async function insertCourseFromExcel() {
  try {
    console.log('📖 Reading Excel file...');
    
    // Read Excel file
    const workbook = XLSX.readFile('sample_record_row.xlsx');
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convert to JSON
    const data = XLSX.utils.sheet_to_json(worksheet);
    
    if (data.length === 0) {
      console.error('❌ No data found in Excel file');
      return;
    }
    
    const row = data[0];
    console.log('✅ Excel data loaded');
    
    // Prepare course data
    const courseData = {
      title: row.title,
      slug: row.slug,
      subtitle: row.subtitle || null,
      course_code: row.course_code || null,
      category: row.category,
      institution_type: row.institution_type?.toLowerCase() || 'both',
      course_category: row.course_category || null,
      description: row.description || null,
      overview: row.overview || null,
      duration_hours: row.duration_hours || null,
      mode: row.mode || null,
      level: row.level || null,
      focus: row.focus || null,
      price: row.price || 0,
      currency: row.currency || 'INR',
      benefits: parseToArray(row.benefits),
      what_you_learn: parseToArray(row.what_you_learn),
      who_should_take: parseToArray(row.who_should_take),
      outcomes: parseToArray(row.outcomes),
      curriculum: parseCurriculum(row.curriculum),
      instructors: [],
      meta_title: row.meta_title || null,
      meta_description: row.meta_description || null,
      is_featured: row.is_featured === 'TRUE' || row.is_featured === true,
      is_active: row.is_active === 'TRUE' || row.is_active === true,
      display_order: row.display_order || 0
    };
    
    console.log('📝 Inserting course into database...');
    console.log('Course:', courseData.title);
    
    // Insert into Supabase
    const { data: insertedData, error } = await supabase
      .from('courses')
      .insert([courseData])
      .select();
    
    if (error) {
      console.error('❌ Error inserting course:', error.message);
      console.error('Details:', error);
      return;
    }
    
    console.log('✅ Course inserted successfully!');
    console.log('Inserted course ID:', insertedData[0].id);
    console.log('Course title:', insertedData[0].title);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run the script
insertCourseFromExcel();
