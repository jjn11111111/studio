// File: app/lib/stripe.ts
import Stripe from 'stripe';
// 👇 1. IMPORT THE SUPABASE CLIENT
import { getSupabaseServerClient } from './supabaseServer'; 
// Make sure the path is './supabaseServer' since both files are in the same 'app/lib' folder.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export async function getOrCreateCustomer({ userId, email }: { userId: string; email?: string }) {
  // 👇 THIS LINE IS CRUCIAL
  const supabase = getSupabaseServerClient(); 

  // 1. Check Supabase for linked customer ID
  let { data, error } = await supabase.from('profiles')
  // ... rest of your code
}
