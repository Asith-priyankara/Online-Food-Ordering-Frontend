import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Leaf, Beef, Clock } from 'lucide-react';

interface RestaurantSidebarProps {
  foodTypes: string[];
  selectedType: string;
  categories: string[];
  selectedCategory: string;
  onTypeSelect: (type: string) => void;
  onCategorySelect: (category: string) => void;
}

export default function RestaurantSidebar({
  foodTypes,
  selectedType,
  categories,
  selectedCategory,
  onTypeSelect,
  onCategorySelect,
}: RestaurantSidebarProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Veg':
        return <Leaf className="h-4 w-4" />;
      case 'Non-Veg':
        return <Beef className="h-4 w-4" />;
      case 'Seasonal':
        return <Clock className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 bg-card p-4 rounded-lg border shadow-sm">
      <div>
        <h3 className="font-semibold mb-3 text-lg">Food Type</h3>
        <ScrollArea className="h-[200px] pr-4">
          <div className="space-y-2">
            {foodTypes.map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "ghost"}
                className={`w-full justify-start text-left ${
                  selectedType === type
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
                onClick={() => onTypeSelect(type)}
              >
                {getTypeIcon(type)}
                <span className="ml-2">{type}</span>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div>
        <h3 className="font-semibold mb-3 text-lg">Categories</h3>
        <ScrollArea className="h-[280px] pr-4">
          <div className="space-y-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "ghost"}
                className={`w-full justify-start text-left ${
                  selectedCategory === category
                    ? "bg-primary/90 text-primary-foreground"
                    : "hover:bg-muted"
                }`}
                onClick={() => onCategorySelect(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}