import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { PageLoading } from "@/components/ui/loading";
import { toast } from "sonner";

interface FavoriteItem {
  id: number;
  name: string;
  restaurant: {
    id: number;
    name: string;
  };
  price: number;
  images: string[];
}

export default function FavoritesSection() {
  const [favoriteItems, setFavoriteItems] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      // TODO: Implement getUserFavorites API endpoint in backend
      // const favorites = await getUserFavorites();
      // setFavoriteItems(favorites);

      // For now, show empty state since backend API is not available
      setFavoriteItems([]);
    } catch (error: any) {
      toast.error("Failed to load favorites", {
        description: error.response?.data?.message || "Please try again later",
      });
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (itemId: number) => {
    try {
      // TODO: Implement removeFavorite API endpoint in backend
      // await removeFavoriteItem(itemId);
      setFavoriteItems((items) => items.filter((item) => item.id !== itemId));
      toast.success("Removed from favorites");
    } catch (error: any) {
      toast.error("Failed to remove favorite", {
        description: error.response?.data?.message || "Please try again later",
      });
    }
  };

  if (loading) {
    return <PageLoading message="Loading your favorites..." />;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Favorite Items</h2>

      {favoriteItems.length === 0 ? (
        <div className="text-center py-12">
          <Star className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-gray-500 text-lg">No favorite items yet.</p>
          <p className="text-gray-400 mt-2">
            Start adding your favorite dishes!
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {favoriteItems.map((item) => (
            <Card key={item.id}>
              <div className="flex">
                <img
                  src={
                    item.images?.[0] ||
                    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500"
                  }
                  alt={item.name}
                  className="h-24 w-24 object-cover rounded-l-lg"
                />
                <CardContent className="p-4 flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.restaurant.name}
                      </p>
                      <p className="font-semibold mt-2">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeFavorite(item.id)}
                    >
                      <Heart className="h-4 w-4 fill-current text-red-500" />
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
