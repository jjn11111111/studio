
'use client';

import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

// NOTE: Auth removed - checkout button now simply redirects to pricing page
// Stripe integration would need separate implementation without Firebase Auth
export default function CheckoutButton() {
  const router = useRouter();

  const handleCheckout = async () => {
    // Redirect to pricing page instead of checkout
    // TODO: Implement Stripe checkout without Firebase Auth if needed
    router.push('/pricing');
  };

  return (
    <Button onClick={handleCheckout} className="w-full" size="lg">
      View Pricing
    </Button>
  );
}
