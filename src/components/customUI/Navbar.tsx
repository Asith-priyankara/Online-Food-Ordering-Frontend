import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, UtensilsCrossed, Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";
import { useAuth } from "@/context/AuthProvider";
import { logoutUser } from "@/services/authService";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { authData, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-2">
            <UtensilsCrossed className="h-6 w-6" />
            <span className="font-bold text-xl hidden sm:inline">FoodHub</span>
          </Link>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hover:bg-accent"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {/* Conditional Rendering for Auth */}
            {authData ? (
              <>
                {/* Cart Button */}
                <Link to="/cart">
                  <Button variant="ghost" size="icon" className="hover:bg-accent">
                    <ShoppingCart className="h-5 w-5" />
                  </Button>
                </Link>

                {/* Profile Button */}
                <Link to="/profile">
                  <Button variant="ghost" size="icon" className="hover:bg-accent">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>

                {/* Logout Button */}
                <Button
                  onClick={() => logoutUser(logout)}
                  className="hidden sm:inline-flex"
                >
                  Log out
                </Button>
              </>
            ) : (
              <Link to="/login">
                {/* Sign In Button */}
                <Button className="hidden sm:inline-flex">Sign in</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
