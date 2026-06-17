import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://iajivjjzfvkhullzfsom.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlhaml2amp6ZnZraHVsbHpmc29tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4OTk4MzEsImV4cCI6MjA5NDQ3NTgzMX0.QtZ6f8KYZXWBOil2JvOUwx45TMw5qeblcfhQysIqptg';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  console.log("Testing insert into entries table...");
  const tempName = "Test Model " + Date.now();
  const testRecord = {
    name: tempName,
    type: "Model",
    task: "NLP",
    summary: "This is a temporary test entry to check inserts.",
    approved: false,
    popular: false
  };

  try {
    const { data, error } = await supabase
      .from("entries")
      .insert([testRecord]);

    if (error) {
      console.error("Insert failed with error:", error);
    } else {
      console.log("Insert succeeded! Inserted data:", data);
      
      // Now let's try to clean it up (delete it)
      // Since public anon doesn't have delete permission, this might fail or be filtered, which is fine
      const { error: delError } = await supabase
        .from("entries")
        .delete()
        .eq("name", tempName);
      
      console.log("Cleanup delete attempted. Delete error (expected if not admin):", delError);
    }
  } catch (err) {
    console.error("Insert threw exception:", err);
  }
}

run();
