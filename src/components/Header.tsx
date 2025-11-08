
'use client';

import Link from 'next/link';
import { Button } from './ui/button';

// NOTE: All authentication UI removed - open access for all visitors
export default function Header() {
  return (
    <header className="bg-card border-b shadow-sm sticky top-0 z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <h1 className="text-2xl font-bold font-headline text-primary group-hover:text-accent transition-colors">
              3rd Eye CrossTraining
            </h1>
          </Link>
          <nav className="flex items-center gap-4">
            <Button asChild variant="ghost">
              <Link href="/about">About</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/directions">Directions</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/training">Training</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/pricing">Pricing</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/journal">Community Journal</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
