import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { changePassword } from "@/services/userService";
import { useAuth } from "@/context/AuthProvider";
import { toast } from "sonner";


const PasswordSection= () => {
  
  const { login } = useAuth();
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [userPassword, setUserPassword] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const handleClick = async () => {
    try {
      const data = await changePassword(userPassword, login);
      setUserPassword({ currentPassword: "", newPassword: "" });
      toast.success("Password change sucessfully");
    } catch (error) {
      toast.error("Failed to change password");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Password</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 relative">
          <Label htmlFor="current-password">Current Password</Label>
          <Input
            id="current-password"
            type={showCurrentPassword ? "text" : "password"}
            value={userPassword.currentPassword}
            onChange={(e) =>
              setUserPassword((prev) => ({
                ...prev,
                currentPassword: e.target.value,
              }))
            }
          />
          <button
            type="button"
            className="absolute right-2 top-8 text-gray-500"
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
          >
            {showCurrentPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <div className="space-y-2 relative">
          <Label htmlFor="new-password">New Password</Label>
          <Input
            id="new-password"
            type={showNewPassword ? "text" : "password"}
            value={userPassword.newPassword}
            onChange={(e) =>
              setUserPassword((prev) => ({
                ...prev,
                newPassword: e.target.value,
              }))
            }
          />
          <button
            type="button"
            className="absolute right-2 top-8 text-gray-500"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <Button onClick={handleClick}>Update Password</Button>
      </CardContent>
    </Card>
  );
};

export default PasswordSection;
