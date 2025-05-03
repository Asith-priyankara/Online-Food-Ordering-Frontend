import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthProvider";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { loginUser } from "@/services/authService";

interface LoginData {
  email: string;
  password: string;
}

export default function Login() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { login } = useAuth();

  const [formData, setFormData] = useState <LoginData> ({
      email:'',
      password:'',
    });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {id, value} = e.target;
      setFormData(prev => ({ ...prev, [id]: value}));
  }

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);

      try {
        const data = await loginUser(formData.email, formData.password, login);

        toast.success('Login successful!');

        setTimeout(() => {
          if (data.role === "ROLE_RESTAURANT_OWNER") {
            window.location.href = '/restaurant-dashboard';
          } else {
            window.location.href = '/';
          }
        }, 1000);

      } catch (error:any) {
        toast.error('Registration failed', {
          description: error.message || 'Please try again later.',
        });
      } finally {
        setIsLoading(false);
      }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" 
            type="email" 
            value={formData.email} 
            onChange={handleChange} 
            placeholder="Enter your email" 
            required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <Button className="w-full" type="submit" disabled={isLoading}>{isLoading ? 'Authenticating' : 'Sign In'}</Button>
          <p className="text-sm text-center text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
