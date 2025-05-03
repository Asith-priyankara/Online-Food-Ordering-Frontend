import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; // Adjust import  as needed
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
// Define the types for nested objects
interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

interface ContactInformation {
  email: string;
  mobile: string;
}

// Define the main restaurant data type
interface RestaurantData {
  id: string;
  name: string;
  description: string;
  cuisineType: string;
  address: Address;
  contactInformation: ContactInformation;
  openingHours: string;
  images: string[];
}

// Define props for the component
interface Props {
  initialData?: Partial<RestaurantData>; // Allow partial data for editing
  onSubmit: (data: RestaurantData) => void; // Callback with full data
  dialogTitle?: string;
  isOpen: boolean;
  onClose: () => void;
}

const RestaurantForm: React.FC<Props> = ({
  initialData = {},
  onSubmit,
  dialogTitle = "Manage Restaurant",
  isOpen,
  onClose,
}) => {
  const [restaurantData, setRestaurantData] = useState<RestaurantData>({
    id: "",
    name: "",
    description: "",
    cuisineType: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
    contactInformation: {
      email: "",
      mobile: "",
    },
    openingHours: "",
    images: [],
  });

  useEffect(() => {
    setRestaurantData({
      id: initialData.id || "",
      name: initialData.name || "",
      description: initialData.description || "",
      cuisineType: initialData.cuisineType || "",
      address: {
        street: initialData.address?.street || "",
        city: initialData.address?.city || "",
        state: initialData.address?.state || "",
        zipCode: initialData.address?.zipCode || "",
      },
      contactInformation: {
        mobile: initialData.contactInformation?.mobile || "",
        email: initialData.contactInformation?.email || "",
      },
      openingHours: initialData.openingHours || "",
      images: initialData.images || [],
    });
  }, [initialData]);


  const handleChange = (field: keyof RestaurantData, value: any) => {
    setRestaurantData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNestedChange = (
    field: keyof RestaurantData,
    nestedField: keyof Address | keyof ContactInformation,
    value: string
  ) => {
    setRestaurantData((prev) => ({
      ...prev,
      [field]: { ...(prev[field] as object), [nestedField]: value },
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(restaurantData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[80vh] overflow-auto scrollbar-hidden">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Restaurant Name</Label>
            <Input
              id="name"
              value={restaurantData.name}
              required
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={restaurantData.description}
              required
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cuisineType">Cuisine Type</Label>
            <Input
              id="cuisineType"
              value={restaurantData.cuisineType}
              required
              onChange={(e) => handleChange("cuisineType", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="street">Street</Label>
            <Input
              id="street"
              value={restaurantData.address.street}
              required
              onChange={(e) =>
                handleNestedChange("address", "street", e.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={restaurantData.address.city}
              required
              onChange={(e) =>
                handleNestedChange("address", "city", e.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              value={restaurantData.address.state}
              required
              onChange={(e) =>
                handleNestedChange("address", "state", e.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zipCode">Zip Code</Label>
            <Input
              id="zipCode"
              value={restaurantData.address.zipCode}
              required
              onChange={(e) =>
                handleNestedChange("address", "zipCode", e.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mobile">Phone Number</Label>
            <Input
              id="mobile"
              value={restaurantData.contactInformation.mobile}
              required
              onChange={(e) =>
                handleNestedChange(
                  "contactInformation",
                  "mobile",
                  e.target.value
                )
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={restaurantData.contactInformation.email}
              required
              onChange={(e) =>
                handleNestedChange(
                  "contactInformation",
                  "email",
                  e.target.value
                )
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="openingHours">Opening Hours</Label>
            <Input
              id="openingHours"
              value={restaurantData.openingHours}
              required
              onChange={(e) => handleChange("openingHours", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="images">Images (Comma-separated URLs)</Label>
            <Input
              id="images"
              value={restaurantData.images.join(", ")}
              onChange={(e) =>
                handleChange(
                  "images",
                  e.target.value.split(",").map((url) => url.trim())
                )
              }
            />
          </div>
          <DialogFooter>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RestaurantForm;
