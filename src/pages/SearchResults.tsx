import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { globalSearch, SearchResult } from "@/services/searchService";
import { toast } from "sonner";

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [results, setResults] = useState<SearchResult>({
    restaurants: [],
    foods: [],
  });
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState(
    searchParams.get("q") || ""
  );
  const [searchLocation, setSearchLocation] = useState(
    searchParams.get("location") || ""
  );

  useEffect(() => {
    const keyword = searchParams.get("q");
    const loc = searchParams.get("location");

    if (keyword) {
      performSearch(keyword, loc || undefined);
    }
  }, [searchParams]);

  const performSearch = async (keyword: string, location?: string) => {
    setLoading(true);
    try {
      const searchResults = await globalSearch(keyword, location);
      setResults(searchResults);
    } catch (error: any) {
      toast.error("Search failed", {
        description: error.response?.data?.message || "Please try again later",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!searchKeyword.trim()) {
      toast.error("Please enter a search term");
      return;
    }

    const params = new URLSearchParams();
    params.set("q", searchKeyword);
    if (searchLocation) {
      params.set("location", searchLocation);
    }
    setSearchParams(params);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Search Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search restaurants or dishes"
                className="pl-10 h-12"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            <div className="relative sm:w-48">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Location"
                className="pl-10 h-12"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            <Button
              className="h-12 px-8"
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-8">
            <div className="text-lg">Searching...</div>
          </div>
        ) : (
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">
                All Results ({results.restaurants.length + results.foods.length}
                )
              </TabsTrigger>
              <TabsTrigger value="restaurants">
                Restaurants ({results.restaurants.length})
              </TabsTrigger>
              <TabsTrigger value="dishes">
                Dishes ({results.foods.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-8">
              {/* Restaurants Section */}
              {results.restaurants.length > 0 && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Restaurants</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.restaurants.map((restaurant) => (
                      <RestaurantCard
                        key={restaurant.id}
                        restaurant={restaurant}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Dishes Section */}
              {results.foods.length > 0 && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Dishes</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.foods.map((food) => (
                      <FoodCard key={food.id} food={food} />
                    ))}
                  </div>
                </div>
              )}

              {results.restaurants.length === 0 &&
                results.foods.length === 0 && (
                  <div className="text-center py-8">
                    <div className="text-lg text-muted-foreground">
                      No results found for "{searchParams.get("q")}"
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Try adjusting your search terms or location
                    </p>
                  </div>
                )}
            </TabsContent>

            <TabsContent value="restaurants">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.restaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
              </div>
              {results.restaurants.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No restaurants found
                </div>
              )}
            </TabsContent>

            <TabsContent value="dishes">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.foods.map((food) => (
                  <FoodCard key={food.id} food={food} />
                ))}
              </div>
              {results.foods.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No dishes found
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}

// Restaurant Card Component
function RestaurantCard({ restaurant }: { restaurant: any }) {
  return (
    <Link to={`/restaurant/${restaurant.id}`} className="group">
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative">
          <img
            src={
              restaurant.images[0] ||
              "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500"
            }
            alt={restaurant.name}
            className="h-48 w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{restaurant.name}</h3>
                <p className="text-muted-foreground">
                  {restaurant.cuisineType}
                </p>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">
                  {restaurant.rating || "4.5"}
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {restaurant.description}
            </p>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {restaurant.address}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

// Food Card Component
function FoodCard({ food }: { food: any }) {
  return (
    <Link to={`/restaurant/${food.restaurant.id}`} className="group">
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative">
          <img
            src={
              food.image[0] ||
              "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500"
            }
            alt={food.name}
            className="h-48 w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{food.name}</h3>
                <p className="text-muted-foreground text-sm">
                  {food.restaurant.name}
                </p>
              </div>
              <div className="text-lg font-bold">${food.price}</div>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {food.description}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
