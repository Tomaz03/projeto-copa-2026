import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jhurtggkaqxiyowkvvib.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpodXJ0Z2drYXF4aXlvd2t2dmliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzMDMyNzEsImV4cCI6MjA4MDg3OTI3MX0.606bwC8nIBCKrdte_chjknFaUZm01yvV7RTnY7YqV5M'

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Import the supabase client like this:
// For React:
// import { supabase } from "@/integrations/supabase/client";
// For React Native:
// import { supabase } from "@/src/integrations/supabase/client";
