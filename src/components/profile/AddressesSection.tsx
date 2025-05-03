import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { toast } from "sonner";
import { addAddress, deleteAddress, getUserAddresses } from "@/services/userService";
import { useUser } from "@/context/UserProvider";

interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

const AddressesSection = () => {

  const {addresses, updateAddresses} = useUser();

  const [isEdit, setIsEdit] = useState(false);
  const [address, setAddress] = useState<Address[]>([]);

  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const fetchAddresses = async () => {
    try {
      if (addresses) {
        setAddress(addresses);
      } else {
        const data = await getUserAddresses();
        setAddress(data);
        updateAddresses(data);
      }
    } catch (error) {
      toast.error("Failed to fetch addresses");
    }
  }

  const handleNewAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewAddress((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const data = await addAddress(newAddress);
      updateAddresses(data);
      setAddress(data);
      setIsEdit(false);
      setNewAddress({ street: "", city: "", state: "", zipCode: "" });
      toast.success("Address added sucessfully!");
    } catch {
      toast.error("Failed to add address");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const data = await deleteAddress(id);
      updateAddresses(data);
      setAddress(data);
      toast.success("Address deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete address");
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Delivery Addresses</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          {address.map((address, index) => (
            <div key={address.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Address {index + 1}</p>
                  <span className="flex flex-wrap gap-1 text-sm text-muted-foreground">
                    <p>{address.street}</p> <p>{address.city}</p>{" "}
                    <p>{address.state}</p> <p>{address.zipCode}</p>
                  </span>
                </div>
                <Button
                  variant="outline"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(address.id)}
                >
                  Delete
                </Button>
              </div>
              <Separator />
            </div>
          ))}

          {!isEdit && (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setIsEdit(true)}
            >
              Add New Address
            </Button>
          )}
          {isEdit && (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="street">Street</Label>
                  <Input
                    id="street"
                    value={newAddress.street}
                    onChange={handleNewAddressChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={newAddress.city}
                    onChange={handleNewAddressChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={newAddress.state}
                    onChange={handleNewAddressChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input
                    id="zipCode"
                    value={newAddress.zipCode}
                    onChange={handleNewAddressChange}
                  />
                </div>
              </div>
              <Button onClick={handleSave}>Save Address</Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressesSection;
