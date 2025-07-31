import { createClient } from "@supabase/supabase-js"
import { env } from "./env"

// Server-side ONLY Supabase client with service role key
// This should NEVER be imported in client components
export const supabaseAdmin = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY)
