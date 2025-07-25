import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { getAllRestaurantDetails } from "@/services/restaurantService";
import { PageLoading } from "@/components/ui/loading";
import { toast } from "sonner";

interface Restaurant {
  id: number;
  name: string;
  description: string;
  cuisineType: string;
  open: boolean;
  images: string[];
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  contactInformation: {
    email: string;
    mobile: string;
  };
  openingHours: string;
}

export default function AdminDashboard() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const data = await getAllRestaurantDetails();
      setRestaurants(data);
    } catch (error: any) {
      toast.error("Failed to load restaurants", {
        description: error.response?.data?.message || "Please try again later",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <PageLoading message="Loading admin dashboard..." />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button>Add Restaurant</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Restaurants
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{restaurants.length}</div>
            <p className="text-xs text-muted-foreground">
              {restaurants.filter((r) => r.open).length} currently open
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +15% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$23,456</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,345</div>
            <p className="text-xs text-muted-foreground">+123 this week</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="restaurants" className="mt-8">
        <TabsList>
          <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="restaurants" className="space-y-4">
          {restaurants.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No restaurants found.</p>
              <Button className="mt-4">Add First Restaurant</Button>
            </div>
          ) : (
            restaurants.map((restaurant) => (
              <Card key={restaurant.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{restaurant.name}</h3>
                        <Badge
                          variant={restaurant.open ? "default" : "secondary"}
                        >
                          {restaurant.open ? "Open" : "Closed"}
                        </Badge>
                      </div>
                      <div className="mt-2 space-y-1">
                        <p className="text-sm text-gray-600">
                          {restaurant.description}
                        </p>
                        <p className="text-sm">
                          Cuisine: {restaurant.cuisineType}
                        </p>
                        <p className="text-sm">
                          Location: {restaurant.address.city},{" "}
                          {restaurant.address.state}
                        </p>
                        <p className="text-sm">
                          Hours: {restaurant.openingHours}
                        </p>
                        <p className="text-sm">
                          Contact: {restaurant.contactInformation.mobile}
                        </p>
                      </div>
                    </div>
                    <div className="space-x-2">
                      <Button variant="outline">Edit</Button>
                      <Button
                        variant={restaurant.open ? "destructive" : "default"}
                      >
                        {restaurant.open ? "Close" : "Open"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
