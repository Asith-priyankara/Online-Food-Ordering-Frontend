import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const topMeals = [
  {
    id: 1,
    name: 'Classic Burger',
    restaurant: 'Burger Palace',
    restaurantId: 1,
    price: 12.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500'
  },
  {
    id: 2,
    name: 'Margherita Pizza',
    restaurant: 'Pizza Paradise',
    restaurantId: 2,
    price: 14.99,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500'
  },
  {
    id: 3,
    name: 'Sushi Roll',
    restaurant: 'Sushi Master',
    restaurantId: 3,
    price: 16.99,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500'
  },
  {
    id: 4,
    name: 'Chicken Biryani',
    restaurant: 'Spice Garden',
    restaurantId: 4,
    price: 15.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500'
  },
  {
    id: 5,
    name: 'Pasta Carbonara',
    restaurant: 'Italian Corner',
    restaurantId: 5,
    price: 13.99,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500'
  },
  {
    id: 4,
    name: 'Chicken Biryani',
    restaurant: 'Spice Garden',
    restaurantId: 4,
    price: 15.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500'
  },
  {
    id: 5,
    name: 'Pasta Carbonara',
    restaurant: 'Italian Corner',
    restaurantId: 5,
    price: 13.99,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500'
  },
  {
    id: 4,
    name: 'Chicken Biryani',
    restaurant: 'Spice Garden',
    restaurantId: 4,
    price: 15.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500'
  },
  {
    id: 5,
    name: 'Pasta Carbonara',
    restaurant: 'Italian Corner',
    restaurantId: 5,
    price: 13.99,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500'
  },
  {
    id: 4,
    name: 'Chicken Biryani',
    restaurant: 'Spice Garden',
    restaurantId: 4,
    price: 15.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500'
  },
  {
    id: 5,
    name: 'Pasta Carbonara',
    restaurant: 'Italian Corner',
    restaurantId: 5,
    price: 13.99,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500'
  }
];

export default function TopMeals() {
  return (
    <section className="py-8">
      <div className="mx-8 md:mx-20 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold mb-6">Top Meals</h2>
        <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hidden">
          {topMeals.map((meal) => (
            <Link 
              key={meal.id} 
              to={`/restaurant/${meal.restaurantId}?item=${meal.id}`}
              className="flex-shrink-0 w-72 group"
            >
              <Card className="transition-shadow hover:shadow-lg">
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="h-48 w-full object-cover transition-transform group-hover:scale-105"
                />
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{meal.name}</h3>
                      <p className="text-sm text-muted-foreground">{meal.restaurant}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary">⭐ {meal.rating}</Badge>
                        <span className="font-semibold">${meal.price}</span>
                      </div>
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