const SUPABASE_URL = "https://kjeoiabqmzumqyqvvpro.supabase.co";

const SUPABASE_KEY = "sb_publishable_ubjX6b1XOc0ydJgnWn58VA_kBwv-zRs";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

console.log("✅ Supabase chargé !");