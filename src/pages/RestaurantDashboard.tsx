import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import RestaurantForm from "@/components/dashboard/RestaurantForm";
import ActiveOrders from "@/components/dashboard/ActiveOrders";
import CompletedOrders from "@/components/dashboard/CompletedOrders";
import MenuSection from "@/components/dashboard/MenuSection";
import MenuItemForm from "@/components/dashboard/MenuItemForm";
import ConfirmationDialog from "@/components/customUI/confirmation-dialog";
import CardComponent from "@/components/customUI/card-component";
import { useAuth } from "@/context/AuthProvider";
import { toast } from "sonner";

export default function RestaurantDashboard() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { token } = useAuth();

  interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    available: boolean;
  }

  const [isOpen, setIsOpen] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showAddMenuItemDialog, setShowAddMenuItemDialog] = useState(false);
  const [editingMenuItem, setEditingMenuItem] = useState<MenuItem | null>(null);
  const [deletingMenuItem, setDeletingMenuItem] = useState<MenuItem | null>(
    null
  );

  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: 1,
      name: "Classic Burger",
      description: "Juicy beef patty with lettuce, tomato, and special sauce",
      price: 12.99,
      category: "Burgers",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
      available: true,
    },
    {
      id: 2,
      name: "Cheese Fries",
      description: "Crispy fries topped with melted cheese",
      price: 6.99,
      category: "Sides",
      image:
        "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=500",
      available: true,
    },
  ]);

  const [activeOrders, setactiveOrders] = useState([
    {
      id: "1234",
      customer: "John Doe",
      items: ["Classic Burger x2", "Cheese Fries x1"],
      status: "preparing",
      time: "10 mins ago",
      total: 32.97,
    },
  ]);

  const [completedOrders, setCompletedOrders] = useState([
    {
      id: "1233",
      customer: "Jane Smith",
      items: ["Classic Burger x1", "Cheese Fries x2"],
      status: "completed",
      time: "1 hour ago",
      total: 26.97,
    },
  ]);

  const [restaurantInfo, setRestaurantInfo] = useState({
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
      mobile: "",
      email: "",
    },
    openingHours: "",
    images: [],
  });

  const fetchRestaurantDetails = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/admin/restaurant/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch restaurant details");
      }
      const data = await response.json();

      setRestaurantInfo(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchRestaurantDetails();
  }, []);

  const handleAddMenuItem = (formData: FormData) => {
    const newItem: MenuItem = {
      id: menuItems.length + 1,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: parseFloat(formData.get("price") as string),
      category: formData.get("category") as string,
      image: formData.get("image") as string,
      available: true,
    };

    setMenuItems([...menuItems, newItem]);
    setShowAddMenuItemDialog(false);
  };

  const handleEditMenuItem = (formData: FormData) => {
    if (!editingMenuItem) return;

    const updatedItem: MenuItem = {
      ...editingMenuItem,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: parseFloat(formData.get("price") as string),
      category: formData.get("category") as string,
      image: formData.get("image") as string,
    };

    setMenuItems(
      menuItems.map((item) =>
        item.id === editingMenuItem.id ? updatedItem : item
      )
    );
    setEditingMenuItem(null);
  };

  const handleDeleteMenuItem = () => {
    if (!deletingMenuItem) return;
    setMenuItems(menuItems.filter((item) => item.id !== deletingMenuItem.id));
    setDeletingMenuItem(null);
  };

  const toggleItemAvailability = (itemId: number) => {
    setMenuItems(
      menuItems.map((item) =>
        item.id === itemId ? { ...item, available: !item.available } : item
      )
    );
  };

  const handleUpdateRestaurant = async (data: any) => {
    const id = data.id;
    try {
      const response = await fetch(`${backendUrl}/api/admin/restaurant/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("error");
      }
      setShowEditDialog(false);
      toast.success("Restaurant details update successfully");
    } catch (error) {
      toast.error("error");
    }
  };

  const handleDeleteRestaurant = async () => {
    const id = restaurantInfo.id;
    try {
      const response = await fetch(`${backendUrl}/api/admin/restaurant/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Error");
      }
      window.location.href = "/";
    } catch (error: any) {
      toast.error("error");
    } finally {
      setShowDeleteDialog(false);
    }
  };

  const handleOpenRestaurant = async () => {
    const id = restaurantInfo.id;
    try {
      const response = await fetch(
        `${backendUrl}/api/admin/restaurant/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Status not change");
      }
      setIsOpen(!isOpen);
      toast.success("Status change sucessfully");
    } catch (error: any) {
      toast.error("Error occur");
      setIsOpen(isOpen);
    }
  };

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">{restaurantInfo.name}</h1>
          <p className="text-muted-foreground">{restaurantInfo.cuisineType}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              checked={isOpen}
              onCheckedChange={() => handleOpenRestaurant()}
            />
            <Label>Restaurant {isOpen ? "Open" : "Closed"}</Label>
          </div>
          <Button variant="outline" onClick={() => setShowEditDialog(true)}>
            Edit Restaurant
          </Button>
          <Button
            variant="destructive"
            onClick={() => setShowDeleteDialog(true)}
          >
            Delete Restaurant
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <CardComponent
          cardHeader="Total Orders"
          cardContentValue="145"
          cardContent="+12% from last month"
        />
        <CardComponent
          cardHeader="Revenue"
          cardContentValue="$2,345"
          cardContent="+8% from last month"
        />
        <CardComponent
          cardHeader="Active Orders"
          cardContentValue="6"
          cardContent="2 preparing, 4 ready"
        />
        <CardComponent
          cardHeader="Rating"
          cardContentValue="4.8"
          cardContent="Based on 234 reviews"
        />
      </div>

      <Tabs defaultValue="active" className="mt-8">
        <TabsList>
          <TabsTrigger value="active">Active Orders</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="menu">Menu</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <ActiveOrders orders={activeOrders} />
        </TabsContent>

        <TabsContent value="completed">
          <CompletedOrders orders={completedOrders} />
        </TabsContent>

        <TabsContent value="menu">
          <MenuSection
            menuItems={menuItems}
            onAddItem={() => setShowAddMenuItemDialog(true)}
            onEditItem={setEditingMenuItem}
            onDeleteItem={setDeletingMenuItem}
            onToggleAvailability={toggleItemAvailability}
          />
        </TabsContent>
      </Tabs>

      {/* Edit Restaurant Dialog */}
      <RestaurantForm
        initialData={restaurantInfo}
        onSubmit={handleUpdateRestaurant}
        dialogTitle={"Edit Restaurant"}
        isOpen={showEditDialog}
        onClose={() => setShowEditDialog(false)}
      />

      {/* Delete Restaurant Dialog */}
      <ConfirmationDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDeleteRestaurant}
        title="Are you sure?"
        description="This action cannot be undone. This will permanently delete your
              restaurant and remove all associated data from our servers"
        confirmButtonLabel="Delete Restaurant"
        confirmButtonStyle="bg-destructive text-destructive-foreground"
      />

      {/* Menu Item Form (Add/Edit) */}
      <MenuItemForm
        open={showAddMenuItemDialog}
        onOpenChange={setShowAddMenuItemDialog}
        onSubmit={handleAddMenuItem}
      />

      <MenuItemForm
        open={!!editingMenuItem}
        onOpenChange={() => setEditingMenuItem(null)}
        onSubmit={handleEditMenuItem}
        item={editingMenuItem || undefined}
      />

      {/* Delete Menu Item Dialog */}

      <ConfirmationDialog
        isOpen={!!deletingMenuItem}
        onClose={() => setDeletingMenuItem(null)}
        onConfirm={handleDeleteMenuItem}
        title="Delete Menu Item"
        description={`Are you sure you want to delete ${deletingMenuItem?.name} ? This action cannot be undone`}
        confirmButtonLabel="Delete Item"
        confirmButtonStyle="bg-destructive text-destructive-foreground"
      />
    </div>
  );
}
