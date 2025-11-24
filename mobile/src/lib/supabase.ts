
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://pvchgvfesoourrmglgfk.supabase.co";  // troque
const SUPABASE_ANON_KEY = "sb_publishable_9EJO6q7ndPceE-2TB0U9KA_sJlOxbxv";              // troque

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

