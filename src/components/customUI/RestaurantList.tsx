import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { getAllRestaurantDetails } from "@/services/restaurantService";
import { PageLoading } from "@/components/ui/loading";
import { toast } from "sonner";

interface Restaurant {
  id: number;
  name: string;
  description: string;
  cuisineType: string;
  images: string[];
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  openingHours: string;
  open: boolean;
}

export default function RestaurantList() {
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
    return (
      <section className="py-8">
        <div className="mx-8 md:mx-20 px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold mb-6">Popular Restaurants</h2>
          <PageLoading message="Loading restaurants..." />
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="mx-8 md:mx-20 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold mb-6">Popular Restaurants</h2>
        {restaurants.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              No restaurants found. Please try again later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
              <Link
                key={restaurant.id}
                to={`/restaurant/${restaurant.id}`}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={
                        restaurant.images?.[0] ||
                        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500"
                      }
                      alt={restaurant.name}
                      className="h-48 w-full object-cover transition-transform group-hover:scale-105"
                    />
                    {restaurant.open && (
                      <Badge
                        className="absolute top-4 right-4"
                        variant="default"
                      >
                        Open
                      </Badge>
                    )}
                    {!restaurant.open && (
                      <Badge
                        className="absolute top-4 right-4"
                        variant="destructive"
                      >
                        Closed
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {restaurant.name}
                          </h3>
                          <p className="text-muted-foreground">
                            {restaurant.cuisineType}
                          </p>
                        </div>
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>4.5</span>
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {restaurant.description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{restaurant.openingHours}</span>
                        </div>
                        <span className="text-xs">
                          {restaurant.address.city}, {restaurant.address.state}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
