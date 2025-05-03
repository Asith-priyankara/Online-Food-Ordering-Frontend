import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { ChevronUp, ChevronDown, Plus, Leaf, Beef, Clock } from 'lucide-react';

interface Ingredient {
  name: string;
  required: boolean;
}

interface IngredientCategory {
  name: string;
  ingredients: Ingredient[];
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  type: string;
  category: string;
  ingredientCategories: IngredientCategory[];
}

interface FoodCardProps {
  item: MenuItem;
  isExpanded: boolean;
  selectedIngredients: string[];
  onToggleExpand: () => void;
  onIngredientToggle: (ingredient: string) => void;
  onAddToCart: () => void;
}

export default function FoodCard({
  item,
  isExpanded,
  selectedIngredients,
  onToggleExpand,
  onIngredientToggle,
  onAddToCart,
}: FoodCardProps) {
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
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="flex flex-col sm:flex-row sm:h-48">
        <div className="relative h-48 sm:h-full sm:w-48 flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover "
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
        <div className="flex-1 p-4 flex flex-col">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{item.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge 
                  variant="secondary" 
                  className={`flex items-center gap-1 ${
                    item.type === 'Veg' ? 'bg-green-100 text-green-800' :
                    item.type === 'Non-Veg' ? 'bg-red-100 text-red-800' :
                    item.type === 'Seasonal' ? 'bg-amber-100 text-amber-800' :
                    'bg-primary/10'
                  }`}
                >
                  {getTypeIcon(item.type)}
                  {item.type}
                </Badge>
                <Badge variant="outline">{item.category}</Badge>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-lg">
                ${item.price.toFixed(2)}
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleExpand}
                className="mt-2 hover:bg-primary/10"
              >
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {!isExpanded && (
            <Button
              onClick={onAddToCart}
              className="mt-auto bg-primary hover:bg-primary/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 pt-0">
          <Separator className="mb-4" />
          <div className="space-y-6">
            {item.ingredientCategories.map((category) => (
              <div key={category.name}>
                <h4 className="font-semibold mb-3">{category.name}</h4>
                <div className="grid grid-cols-2 gap-3">
                  {category.ingredients.map((ingredient) => (
                    <div
                      key={ingredient.name}
                      className="flex items-center space-x-2 bg-muted/50 p-2 rounded-lg"
                    >
                      <Checkbox
                        id={`${item.id}-${ingredient.name}`}
                        checked={
                          ingredient.required ||
                          selectedIngredients.includes(ingredient.name)
                        }
                        onCheckedChange={() => {
                          if (!ingredient.required) {
                            onIngredientToggle(ingredient.name);
                          }
                        }}
                        disabled={ingredient.required}
                      />
                      <label
                        htmlFor={`${item.id}-${ingredient.name}`}
                        className="text-sm cursor-pointer select-none"
                      >
                        {ingredient.name}
                        {ingredient.required && (
                          <span className="text-muted-foreground ml-1 text-xs">
                            (Required)
                          </span>
                        )}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <Button
              onClick={onAddToCart}
              className="w-full bg-primary hover:bg-primary/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}