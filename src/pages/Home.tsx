import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import TopMeals from "@/components/customUI/TopMeals";
import RestaurantList from "@/components/customUI/RestaurantList";

export default function Home() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!searchKeyword.trim()) {
      toast.error("Please enter a search term");
      return;
    }

    // Navigate to search results page
    const params = new URLSearchParams();
    params.set("q", searchKeyword);
    if (location) {
      params.set("location", location);
    }

    navigate(`/search?${params.toString()}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-screen bg-black text-white">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1500"
          alt="Food Banner"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl sm:text-5xl font-bold">
              Delicious Food Delivered To Your Door
            </h1>
            <p className="text-lg sm:text-xl">
              Order from the best local restaurants with easy, on-demand
              delivery.
            </p>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto w-full">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search restaurants or dishes"
                  className="pl-10 bg-white/90 text-black h-12"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <div className="relative sm:w-48">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Location"
                  className="pl-10 bg-white/90 text-black h-12"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <Button className="h-12 px-8" onClick={handleSearch}>
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Top Meals Section */}
      <TopMeals />

      {/* Restaurant List Section */}
      <RestaurantList />
    </div>
  );
}
