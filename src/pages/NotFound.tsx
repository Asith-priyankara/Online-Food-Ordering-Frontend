import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <Card className="w-full max-w-md text-center">
        <CardContent className="pt-6">
          <div className="space-y-6">
            {/* 404 Illustration */}
            <div className="text-8xl font-bold text-muted-foreground">404</div>

            {/* Error Message */}
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold">Page Not Found</h1>
              <p className="text-muted-foreground">
                Oops! The page you're looking for doesn't exist. It might have
                been moved, deleted, or you entered the wrong URL.
              </p>
            </div>

            {/* Food Emoji */}
            <div className="text-4xl">🍕</div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="outline"
                onClick={() => navigate(-1)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </Button>
              <Button asChild className="flex items-center gap-2">
                <Link to="/">
                  <Home className="h-4 w-4" />
                  Go Home
                </Link>
              </Button>
            </div>

            {/* Suggestions */}
            <div className="text-sm text-muted-foreground">
              <p>You can also:</p>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                <Link to="/search" className="text-primary hover:underline">
                  Search for restaurants
                </Link>
                <span>•</span>
                <Link to="/orders" className="text-primary hover:underline">
                  View your orders
                </Link>
                <span>•</span>
                <Link to="/profile" className="text-primary hover:underline">
                  Check your profile
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
