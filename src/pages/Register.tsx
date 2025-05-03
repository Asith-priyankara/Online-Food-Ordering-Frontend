import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthProvider";
import UserRegisterForm from "@/components/customUI/user-registerform";
import RestaurantForm from "@/components/dashboard/RestaurantForm";

export default function Register() {
  const { login, role, token } = useAuth();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [isLoading, setIsLoading] = useState(false);

  const [showRestaurantDialog, setShowRestaurantDialog] = useState(false);

  const handleSubmit = async (formData: any) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${backendUrl}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      const authData = {
        role: data.role,
        token: data.jwt,
      };
      login(authData);
      toast.success("Registration successful!", {
        description: "You can now sign in with your credentials.",
      });

      if (data.role == "ROLE_RESTAURANT_OWNER") {
        setShowRestaurantDialog(true);
      } else {
        window.location.href = "/";
      }
    } catch (error: any) {
      toast.error("Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateRestaurant = async (data: any) => {
    try {
      const response = await fetch(`${backendUrl}/api/admin/restaurant`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("error");
      }
      setShowRestaurantDialog(false);
      toast.success("Restaurant created successfully");
      window.location.href = "/restaurant-dashboard";
    } catch (error) {
      toast.error("error");
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <UserRegisterForm onSubmit={handleSubmit} isLoading={isLoading} />

      <RestaurantForm
        initialData={{}}
        onSubmit={handleCreateRestaurant}
        dialogTitle={"Create Restaurant"}
        isOpen={showRestaurantDialog}
        onClose={() => setShowRestaurantDialog(false)}
      />
    </div>
  );
}
