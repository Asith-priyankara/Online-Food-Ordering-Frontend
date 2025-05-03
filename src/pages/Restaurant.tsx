import { useSearchParams } from "react-router-dom";
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
import FoodCard, { MenuItem } from "@/components/customUI/FoodCard";
import RestaurantSidebar from "@/components/customUI/RestaurantSidebar";
import { toast } from "sonner";

// Mock data for the restaurant
const restaurantData = {
  id: 1,
  name: "Spice Garden Restaurant",
  description: "Experience the finest fusion of Asian and Western cuisine.",
  cuisine: "Multi-Cuisine",
  rating: 4.5,
  reviews: 2345,
  address: "123 Main St, New York, NY 10001",
  phone: "(555) 123-4567",
  hours: "10:00 AM - 10:00 PM",
  images: [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200",
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200",
    "https://images.unsplash.com/photo-1428515613728-6b4607e44363?w=1200",
  ],
  foodTypes: ["All", "Veg", "Non-Veg", "Seasonal"],
  foodCategories: ["All", "Pizza", "Rice", "Kottu", "Burger", "Noodles"],
};

const menuItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Classic pizza with fresh basil, tomatoes, and mozzarella",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500",
    type: "Veg",
    category: "Pizza",
    ingredientCategories: [
      {
        name: "Base",
        ingredients: [
          { name: "Pizza Dough", required: true },
          { name: "Tomato Sauce", required: true },
        ],
      },
      {
        name: "Toppings",
        ingredients: [
          { name: "Fresh Mozzarella", required: true },
          { name: "Fresh Basil", required: false },
          { name: "Cherry Tomatoes", required: false },
          { name: "Olive Oil", required: false },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Chicken Biryani",
    description: "Aromatic basmati rice cooked with tender chicken and spices",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500",
    type: "Non-Veg",
    category: "Rice",
    ingredientCategories: [
      {
        name: "Main",
        ingredients: [
          { name: "Basmati Rice", required: true },
          { name: "Chicken", required: true },
        ],
      },
      {
        name: "Spices",
        ingredients: [
          { name: "Biryani Masala", required: true },
          { name: "Saffron", required: false },
        ],
      },
      {
        name: "Garnish",
        ingredients: [
          { name: "Fried Onions", required: false },
          { name: "Mint Leaves", required: false },
          { name: "Boiled Egg", required: false },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Chicken Kottu",
    description:
      "Shredded roti stir-fried with chicken, vegetables, and spices",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500",
    type: "Non-Veg",
    category: "Kottu",
    ingredientCategories: [
      {
        name: "Base",
        ingredients: [
          { name: "Shredded Roti", required: true },
          { name: "Chicken", required: true },
        ],
      },
      {
        name: "Vegetables",
        ingredients: [
          { name: "Carrots", required: false },
          { name: "Cabbage", required: false },
          { name: "Onions", required: false },
          { name: "Bell Peppers", required: false },
        ],
      },
      {
        name: "Sauces",
        ingredients: [
          { name: "Spicy Sauce", required: false },
          { name: "Curry Sauce", required: true },
        ],
      },
    ],
  },
];

export default function Restaurant() {
  // const { id } = useParams();
  const [searchParams] = useSearchParams();
  const highlightedItemId = searchParams.get("item");

  const [selectedType, setSelectedType] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<
    Record<number, string[]>
  >({});

  useEffect(() => {
    if (highlightedItemId) {
      setExpandedItems([parseInt(highlightedItemId)]);
      const item = menuItems.find(
        (item) => item.id === parseInt(highlightedItemId)
      );
      if (item) {
        setSelectedType(item.type);
        setSelectedCategory(item.category);
      }
    }
  }, [highlightedItemId]);

  const filteredItems = menuItems.filter(
    (item) =>
      (selectedType === "All" || item.type === selectedType) &&
      (selectedCategory === "All" || item.category === selectedCategory)
  );

  const toggleItemExpanded = (itemId: number) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const toggleIngredient = (itemId: number, ingredient: string) => {
    setSelectedIngredients((prev) => {
      const current = prev[itemId] || [];
      return {
        ...prev,
        [itemId]: current.includes(ingredient)
          ? current.filter((i) => i !== ingredient)
          : [...current, ingredient],
      };
    });
  };

  const addToCart = (item: MenuItem) => {
    const ingredients = selectedIngredients[item.id] || [];
    console.log("Adding to cart:", {
      ...item,
      selectedIngredients: ingredients,
    });
    toast.success("Added to cart!", {
      description: `${item.name} has been added to your cart.`,
    });
  };

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarExpanded((prev) => !prev);
  };

  return (
    <div>
      {/* Restaurant Header */}
      <div className="relative h-[400px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${restaurantData.images[0]})`,
            transform: "scale(1.1)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-2 text-shadow">
              {restaurantData.name}
            </h1>
            <p className="text-lg mb-4 text-shadow-sm max-w-2xl">
              {restaurantData.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Badge
                variant="secondary"
                className="flex items-center gap-1 px-3 py-1"
              >
                <Star className="h-4 w-4" /> {restaurantData.rating} (
                {restaurantData.reviews})
              </Badge>
              <Badge
                variant="secondary"
                className="flex items-center gap-1 px-3 py-1"
              >
                <Clock className="h-4 w-4" /> {restaurantData.hours}
              </Badge>
              <Badge
                variant="secondary"
                className="flex items-center gap-1 px-3 py-1"
              >
                <MapPin className="h-4 w-4" /> {restaurantData.address}
              </Badge>
              <Badge
                variant="secondary"
                className="flex items-center gap-1 px-3 py-1"
              >
                <Phone className="h-4 w-4" /> {restaurantData.phone}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {/* <div className="mx-8 md:mx-20 px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[240px,1fr] gap-8"> */}
      {/* Sidebar */}
      {/* <div className="lg:sticky lg:top-4 h-fit">
            <RestaurantSidebar
              foodTypes={restaurantData.foodTypes}
              selectedType={selectedType}
              categories={restaurantData.foodCategories}
              selectedCategory={selectedCategory}
              onTypeSelect={setSelectedType}
              onCategorySelect={setSelectedCategory}
            />
          </div> */}

      {/* Menu Items */}
      {/* <div className="auto-rows-auto grid grid-cols-1 xl:grid-cols-2 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="h-fit">
                <FoodCard
                  item={item}
                  isExpanded={expandedItems.includes(item.id)}
                  selectedIngredients={selectedIngredients[item.id] || []}
                  onToggleExpand={() => toggleItemExpanded(item.id)}
                  onIngredientToggle={(ingredient) => toggleIngredient(item.id, ingredient)}
                  onAddToCart={() => addToCart(item)}
                />
              </div>
            ))}
          </div> */}
      {/* </div>
      </div> */}
      <div className="mx-8 md:mx-20 px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-[240px,1fr] lg:gap-8">
          {/* Sidebar for mobile */}
          <div className="block lg:hidden mb-6">
            <button
              onClick={toggleSidebar}
              className="flex items-center justify-between w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg"
            >
              <span className="font-medium text-lg text-gray-900 dark:text-gray-100">
                Filters
              </span>
              {isSidebarExpanded ? (
                <ChevronUp className="h-5 w-5 text-gray-900 dark:text-gray-100" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-900 dark:text-gray-100" />
              )}
            </button>
            {isSidebarExpanded && (
              <div className="mt-4">
                <RestaurantSidebar
                  foodTypes={restaurantData.foodTypes}
                  selectedType={selectedType}
                  categories={restaurantData.foodCategories}
                  selectedCategory={selectedCategory}
                  onTypeSelect={setSelectedType}
                  onCategorySelect={setSelectedCategory}
                />
              </div>
            )}
          </div>

          {/* Sidebar for larger screens */}
          <div className="hidden lg:block lg:sticky lg:top-4 h-fit">
            <RestaurantSidebar
              foodTypes={restaurantData.foodTypes}
              selectedType={selectedType}
              categories={restaurantData.foodCategories}
              selectedCategory={selectedCategory}
              onTypeSelect={setSelectedType}
              onCategorySelect={setSelectedCategory}
            />
          </div>

          {/* Menu Items */}
          <div className="auto-rows-auto grid grid-cols-1 xl:grid-cols-2 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="h-fit">
                <FoodCard
                  item={item}
                  isExpanded={expandedItems.includes(item.id)}
                  selectedIngredients={selectedIngredients[item.id] || []}
                  onToggleExpand={() => toggleItemExpanded(item.id)}
                  onIngredientToggle={(ingredient) =>
                    toggleIngredient(item.id, ingredient)
                  }
                  onAddToCart={() => addToCart(item)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
