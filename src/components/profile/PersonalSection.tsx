import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { getUser, updateUser } from "@/services/userService";
import { useUser } from "@/context/UserProvider";


const PersonalSection = () => {
   const {userDetails, updateUserDetails} = useUser();

  const [isEdit, setIsEdit] = useState(false);
  const [userDetail, setUserDetail] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const fetchUserDetails = async () => {
    try {
        if (userDetails) {
            setUserDetail(userDetails);   
        } else {
            const data = await getUser();
            updateUserDetails(data);
            setUserDetail(data);
        }
    } catch (error) {
      toast.error("Failed to load user details");
    }
  }


  const handleSubmit = async () => {
    try {
      await updateUser({fullName: userDetail.fullName, phone: userDetail.phone});
      updateUserDetails(userDetail);
      toast.success("User details updated");
    } catch (error) {
        if (userDetails) {
            setUserDetail(userDetails);   
        }      
        toast.error("User details edit fail");
    } finally {
      setIsEdit(false);
    }
  };

  useEffect (() => {
    fetchUserDetails();
  }, []);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>Personal Information</CardTitle>
          <Button variant="outline" onClick={() => setIsEdit(true)}>
            Edit
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={userDetail.fullName}
              onChange={(e) =>
                setUserDetail((prev) => ({
                  ...prev,
                  fullName: e.target.value,
                }))
              }
              disabled={!isEdit}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={userDetail.email}
              disabled={true}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={userDetail.phone}
              onChange={(e) =>
                setUserDetail((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }))
              }
              disabled={!isEdit}
            />
          </div>
        </div>
        <Button disabled={!isEdit} onClick={handleSubmit}>
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
};

export default PersonalSection;
