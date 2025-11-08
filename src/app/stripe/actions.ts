
'use server';

// NOTE: All Firebase Auth verification removed
// Stripe checkout and billing portal are now open access or disabled
// TODO: Implement alternative authentication/session management if Stripe is needed

export async function createCheckoutSession(idToken: string): Promise<{ sessionId?: string; error?: string }> {
  // Auth removed - Stripe checkout disabled
  return { error: 'Authentication required for checkout has been removed. Feature temporarily unavailable.' };
}

export async function createBillingPortalSession(idToken: string): Promise<{ url?: string; error?: string }> {
  // Auth removed - billing portal disabled
  return { error: 'Authentication required for billing portal has been removed. Feature temporarily unavailable.' };
}
