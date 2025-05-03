import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Order {
  id: string;
  customer: string;
  items: string[];
  status: string;
  time: string;
  total: number;
}

interface ActiveOrdersProps {
  orders: Order[];
}

export default function ActiveOrders({ orders }: ActiveOrdersProps) {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">Order #{order.id}</h3>
                  <Badge>{order.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{order.customer}</p>
                <p className="text-sm text-muted-foreground">{order.time}</p>
                <ul className="mt-2">
                  {order.items.map((item, index) => (
                    <li key={index} className="text-sm">{item}</li>
                  ))}
                </ul>
              </div>
              <div className="text-right">
                <p className="font-semibold">${order.total}</p>
                <Button className="mt-2">Mark as Ready</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      {orders.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No active orders at the moment
        </div>
      )}
    </div>
  );
}