import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  MapPin,
  Phone,
  Star,
} from "lucide-react";
import FoodCard from "@/components/customUI/FoodCard";
import RestaurantSidebar from "@/components/customUI/RestaurantSidebar";
import { PageLoading } from "@/components/ui/loading";
import { toast } from "sonner";
import { getRestaurantDetails } from "@/services/restaurantService";
import { getRestaurantFood } from "@/services/foodService";
import { getRestaurantCategories } from "@/services/categoryService";

interface Restaurant {
  id: number;
  name: string;
  description: string;
  cuisineType: string;
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
  images: string[];
  open: boolean;
}

interface Food {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  vegetarian: boolean;
  seasonal: boolean;
  available: boolean;
  category: {
    id: number;
    name: string;
  };
  ingredients: Array<{
    id: number;
    name: string;
    category: {
      id: number;
      name: string;
    };
  }>;
}

interface Category {
  id: number;
  name: string;
}

export default function Restaurant() {
  const { id } = useParams<{ id: string }>();

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menuItems, setMenuItems] = useState<Food[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingFood, setLoadingFood] = useState(false);

  // Filter states
  const [selectedFoodType, setSelectedFoodType] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showInfo, setShowInfo] = useState(false);

  const foodTypes = ["All", "Veg", "Non-Veg", "Seasonal"];

  useEffect(() => {
    if (id) {
      fetchRestaurantData();
      fetchCategories();
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchMenuItems();
    }
  }, [id, selectedFoodType, selectedCategory]);

  const fetchRestaurantData = async () => {
    try {
      setLoading(true);
      const data = await getRestaurantDetails(id!);
      setRestaurant(data);
    } catch (error: any) {
      toast.error("Failed to load restaurant details", {
        description: error.response?.data?.message || "Please try again later",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getRestaurantCategories(parseInt(id!));
      setCategories([{ id: 0, name: "All" }, ...data]);
    } catch (error: any) {
      console.error("Failed to load categories:", error);
    }
  };

  const fetchMenuItems = async () => {
    try {
      setLoadingFood(true);
      const vegetarian = selectedFoodType === "Veg";
      const nonVeg = selectedFoodType === "Non-Veg";
      const seasonal = selectedFoodType === "Seasonal";
      const foodCategory =
        selectedCategory === "All" ? undefined : selectedCategory;

      const data = await getRestaurantFood(
        parseInt(id!),
        vegetarian,
        nonVeg,
        seasonal,
        foodCategory
      );
      setMenuItems(data);
    } catch (error: any) {
      toast.error("Failed to load menu items", {
        description: error.response?.data?.message || "Please try again later",
      });
    } finally {
      setLoadingFood(false);
    }
  };

  const handleAddToCart = (item: Food) => {
    // TODO: Implement actual cart functionality
    toast.success("Added to cart!", {
      description: `${item.name} has been added to your cart.`,
    });
  };

  if (loading) {
    return <PageLoading message="Loading restaurant..." />;
  }

  if (!restaurant) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Restaurant not found</h2>
          <p className="text-muted-foreground">
            The restaurant you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Restaurant Header */}
      <div className="relative h-[400px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${
              restaurant.images?.[0] ||
              "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200"
            })`,
            transform: "scale(1.1)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-2 text-shadow">
              {restaurant.name}
            </h1>
            <p className="text-lg mb-4 text-shadow-sm max-w-2xl">
              {restaurant.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Badge
                variant="secondary"
                className="flex items-center gap-1 px-3 py-1"
              >
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> 4.5
                (245 reviews)
              </Badge>
              <Badge
                variant="secondary"
                className="flex items-center gap-1 px-3 py-1"
              >
                <Clock className="h-4 w-4" /> {restaurant.openingHours}
              </Badge>
              <Badge
                variant="secondary"
                className="flex items-center gap-1 px-3 py-1"
              >
                <MapPin className="h-4 w-4" /> {restaurant.address.street},{" "}
                {restaurant.address.city}
              </Badge>
              <Badge
                variant="secondary"
                className="flex items-center gap-1 px-3 py-1"
              >
                <Phone className="h-4 w-4" />{" "}
                {restaurant.contactInformation.mobile}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurant Info Toggle */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <span className="font-medium">
              {restaurant.cuisineType} • Restaurant Info
            </span>
            {showInfo ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>

          {showInfo && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Address</h3>
                <p className="text-gray-600">
                  {restaurant.address.street}
                  <br />
                  {restaurant.address.city}, {restaurant.address.state}{" "}
                  {restaurant.address.zipCode}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Contact</h3>
                <p className="text-gray-600">
                  Phone: {restaurant.contactInformation.mobile}
                  <br />
                  Email: {restaurant.contactInformation.email}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-72 flex-shrink-0">
            <RestaurantSidebar
              foodTypes={foodTypes}
              selectedType={selectedFoodType}
              categories={categories.map((cat) => cat.name)}
              selectedCategory={selectedCategory}
              onTypeSelect={setSelectedFoodType}
              onCategorySelect={setSelectedCategory}
            />
          </div>

          {/* Menu Items */}
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Menu</h2>
              <p className="text-gray-600">
                {menuItems.length} {menuItems.length === 1 ? "item" : "items"}{" "}
                available
              </p>
            </div>

            {loadingFood ? (
              <PageLoading message="Loading menu items..." />
            ) : menuItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No items found for the selected filters.
                </p>
                <p className="text-gray-400 mt-2">
                  Try adjusting your filters or check back later.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems.map((item) => (
                  <FoodCard
                    key={item.id}
                    item={{
                      id: item.id,
                      name: item.name,
                      description: item.description,
                      price: item.price,
                      image:
                        item.images?.[0] ||
                        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500",
                      type: item.vegetarian ? "Veg" : "Non-Veg",
                      category: item.category.name,
                      ingredientCategories: item.ingredients.reduce(
                        (acc, ingredient) => {
                          const categoryName = ingredient.category.name;
                          if (!acc.find((cat) => cat.name === categoryName)) {
                            acc.push({
                              name: categoryName,
                              ingredients: [],
                            });
                          }
                          const category = acc.find(
                            (cat) => cat.name === categoryName
                          );
                          if (category) {
                            category.ingredients.push({
                              name: ingredient.name,
                              required: false,
                            });
                          }
                          return acc;
                        },
                        [] as Array<{
                          name: string;
                          ingredients: Array<{
                            name: string;
                            required: boolean;
                          }>;
                        }>
                      ),
                    }}
                    isExpanded={false}
                    selectedIngredients={[]}
                    onToggleExpand={() => {}}
                    onIngredientToggle={() => {}}
                    onAddToCart={() => handleAddToCart(item)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
