import { Card, CardContent } from '@/components/ui/card';

interface Order {
  id: string;
  restaurant: string;
  items: string[];
  status: string;
  date: string;
  total: number;
}

export default function OrdersSection() {
  const orders: Order[] = [
    {
      id: '1234',
      restaurant: 'Burger Palace',
      items: ['Classic Burger x2', 'Cheese Fries x1'],
      status: 'delivered',
      date: '2024-03-20',
      total: 32.97
    },
    {
      id: '1235',
      restaurant: 'Pizza Paradise',
      items: ['Margherita Pizza x1', 'Garlic Bread x1'],
      status: 'processing',
      date: '2024-03-21',
      total: 28.98
    },
    {
      id: '1234',
      restaurant: 'Burger Palace',
      items: ['Classic Burger x2', 'Cheese Fries x1'],
      status: 'delivered',
      date: '2024-03-20',
      total: 32.97
    },
    {
      id: '1235',
      restaurant: 'Pizza Paradise',
      items: ['Margherita Pizza x1', 'Garlic Bread x1'],
      status: 'processing',
      date: '2024-03-21',
      total: 28.98
    },
    {
        id: '1234',
        restaurant: 'Burger Palace',
        items: ['Classic Burger x2', 'Cheese Fries x1'],
        status: 'delivered',
        date: '2024-03-20',
        total: 32.97
      },
      {
        id: '1235',
        restaurant: 'Pizza Paradise',
        items: ['Margherita Pizza x1', 'Garlic Bread x1'],
        status: 'processing',
        date: '2024-03-21',
        total: 28.98
      },
      {
        id: '1234',
        restaurant: 'Burger Palace',
        items: ['Classic Burger x2', 'Cheese Fries x1'],
        status: 'delivered',
        date: '2024-03-20',
        total: 32.97
      },
      {
        id: '1235',
        restaurant: 'Pizza Paradise',
        items: ['Margherita Pizza x1', 'Garlic Bread x1'],
        status: 'processing',
        date: '2024-03-21',
        total: 28.98
      },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Your Orders</h2>
      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{order.restaurant}</h3>
                <p className="text-sm text-muted-foreground">Order #{order.id}</p>
                <p className="text-sm text-muted-foreground">{order.date}</p>
                <ul className="mt-2">
                  {order.items.map((item, index) => (
                    <li key={index} className="text-sm">{item}</li>
                  ))}
                </ul>
              </div>
              <div className="text-right">
                <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                  {order.status}
                </span>
                <p className="font-semibold mt-2">${order.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}