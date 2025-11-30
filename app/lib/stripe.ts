import Stripe from 'stripe';
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20', // or latest
});

// Example: check if user has a stripe_customer_id, else create and save it
export async function getOrCreateCustomer({ userId, email }: { userId: string; email?: string }) {
  // This assumes you have a table profile or users with a stripe_customer_id field
  // 1. Check Supabase for linked customer ID
  let { data, error } = await supabase
    .from('profiles') // or users
    .select('stripe_customer_id')
    .eq('id', userId)
    .single();

  if (error) throw new Error('Could not find user in DB');

  if (data && data.stripe_customer_id) {
    // 2. Return existing
    return await stripe.customers.retrieve(data.stripe_customer_id) as Stripe.Customer;
  }

  // 3. If not, create new Stripe customer
  const customer = await stripe.customers.create({
    email,
    metadata: { userId },
  });

  // 4. Save the new stripe_customer_id to Supabase
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ stripe_customer_id: customer.id })
    .eq('id', userId);

  if (updateError) throw new Error('Could not save stripe_customer_id');

  return customer;
}
