import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  available: boolean;
}

interface MenuSectionProps {
  menuItems: MenuItem[];
  onAddItem: () => void;
  onEditItem: (item: MenuItem) => void;
  onDeleteItem: (item: MenuItem) => void;
  onToggleAvailability: (itemId: number) => void;
}

export default function MenuSection({
  menuItems,
  onAddItem,
  onEditItem,
  onDeleteItem,
  onToggleAvailability,
}: MenuSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Menu Items</h2>
        <Button onClick={onAddItem}>
          <Plus className="h-4 w-4 mr-2" />
          Add Menu Item
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {menuItems.map((item) => (
          <Card key={item.id}>
            <img
              src={item.image}
              alt={item.name}
              className="h-48 w-full object-cover"
            />
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{item.name}</h3>
                    <Badge variant={item.available ? "default" : "secondary"}>
                      {item.available ? "Available" : "Unavailable"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.category}</p>
                  <p className="text-sm mt-1">{item.description}</p>
                  <p className="font-semibold mt-2">${item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onToggleAvailability(item.id)}
                >
                  {item.available ? "Mark Unavailable" : "Mark Available"}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onEditItem(item)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="text-destructive"
                  onClick={() => onDeleteItem(item)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {menuItems.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No menu items yet. Add your first item to get started!
        </div>
      )}
    </div>
  );
}