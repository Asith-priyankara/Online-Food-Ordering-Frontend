import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const restaurants = [
  {
    id: 1,
    name: 'Burger Palace',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500',
    cuisine: 'American',
    rating: 4.5,
    deliveryTime: '25-35',
    minOrder: 15,
    featured: true
  },
  {
    id: 2,
    name: 'Pizza Paradise',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500',
    cuisine: 'Italian',
    rating: 4.7,
    deliveryTime: '30-40',
    minOrder: 20,
    featured: true
  },
  {
    id: 3,
    name: 'Sushi Master',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500',
    cuisine: 'Japanese',
    rating: 4.8,
    deliveryTime: '35-45',
    minOrder: 25,
    featured: false
  },
  {
    id: 4,
    name: 'Spice Garden',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500',
    cuisine: 'Indian',
    rating: 4.6,
    deliveryTime: '30-40',
    minOrder: 20,
    featured: true
  },
  {
    id: 5,
    name: 'Mediterranean Delight',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500',
    cuisine: 'Mediterranean',
    rating: 4.4,
    deliveryTime: '25-35',
    minOrder: 15,
    featured: false
  },
  {
    id: 6,
    name: 'Taco Fiesta',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500',
    cuisine: 'Mexican',
    rating: 4.3,
    deliveryTime: '20-30',
    minOrder: 15,
    featured: true
  }
];

export default function RestaurantList() {
  return (
    <section className="py-8">
      <div className="mx-8 md:mx-20 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold mb-6">Popular Restaurants</h2>
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
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="h-48 w-full object-cover transition-transform group-hover:scale-105"
                  />
                  {restaurant.featured && (
                    <Badge className="absolute top-4 right-4">
                      Featured
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{restaurant.name}</h3>
                        <p className="text-muted-foreground">{restaurant.cuisine}</p>
                      </div>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Star className="h-3 w-3" /> {restaurant.rating}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{restaurant.deliveryTime} min</span>
                      </div>
                      <span>Min. ${restaurant.minOrder}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}