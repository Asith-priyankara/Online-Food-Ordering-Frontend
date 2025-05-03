import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Order {
  id: string;
  customer: string;
  items: string[];
  status: string;
  time: string;
  total: number;
}

interface CompletedOrdersProps {
  orders: Order[];
}

export default function CompletedOrders({ orders }: CompletedOrdersProps) {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">Order #{order.id}</h3>
                  <Badge variant="secondary">Completed</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{order.customer}</p>
                <p className="text-sm text-muted-foreground">{order.time}</p>
                <ul className="mt-2">
                  {order.items.map((item, index) => (
                    <li key={index} className="text-sm">{item}</li>
                  ))}
                </ul>
              </div>
              <p className="font-semibold">${order.total}</p>
            </div>
          </CardContent>
        </Card>
      ))}
      {orders.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No completed orders to show
        </div>
      )}
    </div>
  );
}