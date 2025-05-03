import { Button } from '@/components/ui/button';
import { ShieldX } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Unauthorized() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4">
      <div className="text-center space-y-6">
        <ShieldX className="h-24 w-24 mx-auto text-destructive" />
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Access Denied</h1>
          <p className="text-muted-foreground max-w-md">
            You don't have permission to access this page. Please sign in with the appropriate account or contact support if you think this is a mistake.
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <Button asChild variant="outline">
            <Link to="/">Go Home</Link>
          </Button>
          <Button asChild>
            <Link to="/login">Sign In</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}