import Stripe from 'stripe'
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

export async function getOrCreateCustomer({ userId, email }: { userId: string, email?: string | null }) {
  const found = await stripe.customers.search({ query: `metadata['user_id']:'${userId}'` })
  if (found.data.length) return found.data[0]

  if (email) {
    const emailSearch = await stripe.customers.search({ query: `email:'${email}'` })
    const existing = emailSearch.data.find(c => c.metadata?.user_id === userId || c.email === email)
    if (existing) {
      if (existing.metadata?.user_id !== userId) {
        await stripe.customers.update(existing.id, { metadata: { user_id: userId } })
      }
      return existing
    }
  }

  return stripe.customers.create({ email: email ?? undefined, metadata: { user_id: userId } })
}
