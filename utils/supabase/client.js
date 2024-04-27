
import { createClient } from '@supabase/supabase-js'


const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_API;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabase = createClient(supabaseUrl, supabaseKey)