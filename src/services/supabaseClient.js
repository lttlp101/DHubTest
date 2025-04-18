// src/services/supabaseClient.js

import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
	import.meta.env.VITE_SUPABASE_URL ||
	"https://ixeogsfookdjpuczcjbm.supabase.co";
const supabaseAnonKey =
	import.meta.env.VITE_SUPABASE_ANON_API_KEY ||
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4ZW9nc2Zvb2tkanB1Y3pjamJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5OTIyNjYsImV4cCI6MjA2MDU2ODI2Nn0.hkENMuPTaqtOLrnQLhBJxDJwx3ZnJ5oX1tiWYG5e5W8";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
