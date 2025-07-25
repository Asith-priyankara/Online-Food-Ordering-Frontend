import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';
import { getUserOrderHistory } from '@/services/orderService';
import { PageLoading } from '@/components/ui/loading';
import { toast } from 'sonner';

interface Order {
  id: number;
  orderStatus: string;
  createdAt: string;
  totalAmount: number;
  orderItems: {
    id: number;
    quantity: number;
    totalPrice: number;
    food: {
      id: number;
      name: string;
      price: number;
      image: string[];
    };
    ingredients: string[];
  }[];
  restaurant: {
    id: number;
    name: string;
  };
}

export default function OrdersSection() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getUserOrderHistory();
      setOrders(data);
    } catch (error: any) {
      toast.error('Failed to load orders', {
        description: error.response?.data?.message || 'Please try again later'
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'out_for_delivery':
        return 'outline';
      case 'completed':
        return 'default';
      default:
        return 'secondary';
    }
  };

  const formatStatus = (status: string) => {
    return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (loading) {
    return <PageLoading message="Loading your orders..." />;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Order History</h2>
      
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No orders found.</p>
          <p className="text-gray-400 mt-2">Start ordering from your favorite restaurants!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{order.restaurant.name}</h3>
                      <Badge variant={getStatusColor(order.orderStatus)}>
                        {formatStatus(order.orderStatus)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">Order #{order.id}</p>
                    <p className="text-sm text-muted-foreground mb-3">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <div className="space-y-1">
                      {order.orderItems.map((item) => (
                        <p key={item.id} className="text-sm">
                          {item.food.name} x{item.quantity}
                        </p>
                      ))}
                    </div>
                  </div>
                  <p className="font-semibold">${order.totalAmount.toFixed(2)}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
