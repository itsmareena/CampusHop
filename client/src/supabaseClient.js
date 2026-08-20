import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase env vars. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to client/.env"
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Accepts any email ending in "edu.in" (not just one specific college).
// Keep this in sync with the check in supabase/schema.sql.
export function isAllowedCollegeEmail(email) {
  if (typeof email !== "string" || !email.includes("@")) return false;
  const domain = email.split("@")[1]?.toLowerCase() ?? "";
  return domain.endsWith("edu.in");
}