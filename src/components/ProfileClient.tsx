'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import Link from 'next/link';

// NOTE: Authentication removed - profile page now shows generic information for all visitors
export default function ProfileClient() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-semibold">User Access</h3>
        <p className="text-muted-foreground">Open Access - All features available to all visitors</p>
      </div>
      
      <div className="space-y-2">
        <h3 className="font-semibold">Subscription Status</h3>
        <p className="text-muted-foreground">All content is freely accessible</p>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Upgrade Options</CardTitle>
          <CardDescription>
            Explore our pricing options to support the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/pricing">View Pricing</Link>
          </Button>
        </CardContent>
      </Card>

      <div className="text-sm text-muted-foreground mt-8">
        <p>Note: User authentication has been removed. All visitors have full access to all features.</p>
      </div>
    </div>
  );
}
