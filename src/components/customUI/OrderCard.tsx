import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface OrderCardProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  ingredients?: string[];
  onUpdateQuantity: (id: number, newQuantity: number) => void;
  onRemove: (id: number) => void;
}

export default function OrderCard({
  id,
  name,
  price,
  quantity,
  image,
  ingredients,
  onUpdateQuantity,
  onRemove
}: OrderCardProps) {
  const itemTotal = price * quantity;

  return (
    <div className="flex gap-4 p-4 rounded-lg border">
      <img
        src={image}
        alt={name}
        className="h-24 w-24 object-cover rounded-md"
      />
      <div className="flex-1 flex justify-between">
        <div>
          <h3 className="font-semibold">{name}</h3>
          {ingredients && ingredients.length > 0 && (
            <p className="text-sm text-muted-foreground mt-1">
              {ingredients.join(', ')}
            </p>
          )}
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center border rounded-lg">
              <Button 
                variant="ghost" 
                size="icon"
                className="h-8 w-8 rounded-r-none"
                onClick={() => onUpdateQuantity(id, Math.max(0, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{quantity}</span>
              <Button 
                variant="ghost" 
                size="icon"
                className="h-8 w-8 rounded-l-none"
                onClick={() => onUpdateQuantity(id, quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Badge variant="secondary" className="text-xs">
              ${price.toFixed(2)} each
            </Badge>
          </div>
        </div>
        <div className="flex flex-col items-end justify-between">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onRemove(id)}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Subtotal</p>
            <p className="font-semibold text-lg">
              ${itemTotal.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}