import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin } from 'lucide-react';
import TopMeals from '@/components/customUI/TopMeals';
import RestaurantList from '@/components/customUI/RestaurantList';

export default function Home() {
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
              Order from the best local restaurants with easy, on-demand delivery.
            </p>
            
            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto w-full">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search restaurants or dishes"
                  className="pl-10 bg-white/90 text-black h-12"
                />
              </div>
              <div className="relative sm:w-48">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Location"
                  className="pl-10 bg-white/90 text-black h-12"
                />
              </div>
              <Button className="h-12 px-8">Search</Button>
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