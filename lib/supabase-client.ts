"use client"

import { createClient } from "@supabase/supabase-js"

// Note: We can't import env.ts here because it's a client component
// Environment variables are validated at build time
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

// Client-side ONLY Supabase client with anon key
// This is safe to use in client components for real-time subscriptions
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
