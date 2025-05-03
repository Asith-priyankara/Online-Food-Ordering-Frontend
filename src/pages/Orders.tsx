import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Orders() {
  const orders = [
    {
      id: '1234',
      restaurant: 'Burger Palace',
      items: ['Classic Burger x2', 'Cheese Fries x1'],
      status: 'delivered',
      date: '2024-03-20',
      total: 32.97
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
      
      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{order.restaurant}</h3>
                    <Badge variant="outline">{order.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Order #{order.id}</p>
                  <p className="text-sm text-muted-foreground">{order.date}</p>
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
      </div>
    </div>
  );
}