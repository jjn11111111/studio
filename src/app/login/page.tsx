import AuthForm from '@/components/AuthForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold font-headline">Unlock Your Vision</CardTitle>
          <CardDescription>Sign in or create an account to begin.</CardDescription>
        </CardHeader>
        <CardContent>
          <AuthForm />
        </CardContent>
      </Card>
    </div>
  );
}
