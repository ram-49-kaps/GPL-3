const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

let supabase = null;

try {
  if (supabaseUrl && supabaseKey && supabaseUrl.startsWith('http')) {
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log('✅ Supabase connected');
  } else {
    console.log('ℹ️  Running without Supabase (will log registrations to console)');
  }
} catch (err) {
  console.log('ℹ️  Supabase not configured, running in local mode');
}

module.exports = supabase;
