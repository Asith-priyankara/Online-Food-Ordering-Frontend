import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { getAllFood } from "@/services/foodService";
import { PageLoading } from "@/components/ui/loading";
import { toast } from "sonner";

interface Food {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  vegetarian: boolean;
  restaurant: {
    id: number;
    name: string;
  };
}

export default function TopMeals() {
  const [topMeals, setTopMeals] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopMeals();
  }, []);

  const fetchTopMeals = async () => {
    try {
      setLoading(true);
      const data = await getAllFood();
      // Get a random selection of foods for "top meals"
      const shuffled = data.sort(() => 0.5 - Math.random());
      setTopMeals(shuffled.slice(0, 10)); // Show top 10 meals
    } catch (error: any) {
      toast.error("Failed to load top meals", {
        description: error.response?.data?.message || "Please try again later",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-8 bg-gray-50">
        <div className="mx-8 md:mx-20 px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold mb-6">Top Meals</h2>
          <PageLoading message="Loading top meals..." />
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 bg-gray-50">
      <div className="mx-8 md:mx-20 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold mb-6">Top Meals</h2>
        {topMeals.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              No meals found. Please try again later.
            </p>
          </div>
        ) : (
          <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hidden">
            {topMeals.map((meal) => (
              <Link
                key={meal.id}
                to={`/restaurant/${meal.restaurant.id}?item=${meal.id}`}
                className="flex-shrink-0 w-72 group"
              >
                <Card className="transition-shadow hover:shadow-lg">
                  <img
                    src={
                      meal.images?.[0] ||
                      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500"
                    }
                    alt={meal.name}
                    className="h-48 w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{meal.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {meal.restaurant.name}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>4.5</span>
                          </Badge>
                          <span className="font-semibold">
                            ${meal.price.toFixed(2)}
                          </span>
                          {meal.vegetarian && (
                            <Badge variant="outline" className="text-green-600">
                              Veg
                            </Badge>
                          )}
                        </div>
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
