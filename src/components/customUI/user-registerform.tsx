import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

type UserRole = "ROLE_CUSTOMER" | "ROLE_RESTAURANT_OWNER";

interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
}

interface UserRegisterFormProps {
  onSubmit: (data: RegisterData) => void; // Explicitly typing onSubmit
  isLoading: boolean;
}

const UserRegisterForm: React.FC<UserRegisterFormProps> = ({
  onSubmit,
  isLoading,
}) => {
  const [formData, setFormData] = useState<RegisterData>({
    fullName: "",
    email: "",
    password: "",
    role: "ROLE_CUSTOMER",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleRoleChange = (value: UserRole) => {
    setFormData((prev) => ({ ...prev, role: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevents the default form submission behavior
    onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Create Account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              placeholder="Enter your name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>
          <div className="space-y-2">
            <Label>Account Type</Label>
            <Select value={formData.role} onValueChange={handleRoleChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ROLE_CUSTOMER">Customer</SelectItem>
                <SelectItem value="ROLE_RESTAURANT_OWNER">
                  Restaurant Owner
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Sign Up"}
          </Button>
          <p className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserRegisterForm;
