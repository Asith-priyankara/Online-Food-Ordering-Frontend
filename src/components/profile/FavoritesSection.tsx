import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

interface FavoriteItem {
  id: number;
  name: string;
  restaurant: string;
  price: number;
  image: string;
}

export default function FavoritesSection() {
  const favoriteItems: FavoriteItem[] = [
    {
      id: 1,
      name: 'Classic Burger',
      restaurant: 'Burger Palace',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500'
    },
    {
      id: 2,
      name: 'Margherita Pizza',
      restaurant: 'Pizza Paradise',
      price: 14.99,
      image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500'
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Favorite Items</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {favoriteItems.map((item) => (
          <Card key={item.id}>
            <div className="flex">
              <img
                src={item.image}
                alt={item.name}
                className="h-24 w-24 object-cover rounded-l-lg"
              />
              <CardContent className="p-4 flex-1">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.restaurant}</p>
                    <p className="font-semibold mt-2">${item.price}</p>
                  </div>
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4 fill-current" />
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}