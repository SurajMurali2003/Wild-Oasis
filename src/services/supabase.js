import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://rgjkojronayrlokbavej.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnamtvanJvbmF5cmxva2JhdmVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwNTIyNDAsImV4cCI6MjA4NjYyODI0MH0.oWmyZdA9BmHP77AwWtmC2rd96J3LrsbaocXjjXdGQS8';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
