import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface UserSubmission {
  id?: number
  email: string
  location: string
  usage_frequency: string
  created_at?: string
}

export interface VendorSubmission {
  id?: number
  business_name: string
  email: string
  location: string
  uses_similar: string
  other_providers?: string
  created_at?: string
} 