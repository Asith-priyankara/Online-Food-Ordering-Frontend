import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { MapPin, Plus, ChevronDown, ShoppingBag } from 'lucide-react';
import OrderCard from '@/components/customUI/OrderCard';

interface Address {
  id: number;
  type: string;
  address: string;
  details: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  ingredients?: string[];
}

export default function Cart() {
  const addresses: Address[] = [
    {
      id: 1,
      type: 'Home',
      address: '123 Main St',
      details: 'Apt 4B, New York, NY 10001'
    },
    {
      id: 2,
      type: 'Work',
      address: '456 Business Ave',
      details: 'Floor 12, New York, NY 10002'
    }
  ];

  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  
  useEffect(() => {
    if (addresses.length > 0 && !selectedAddress) {
      setSelectedAddress(addresses[0]);
    }
  }, []);

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Classic Burger',
      price: 12.99,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
      ingredients: ['Lettuce', 'Tomato', 'Special Sauce']
    },
    {
      id: 2,
      name: 'Cheese Fries',
      price: 6.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=500'
    },
    {
      id: 1,
      name: 'Classic Burger',
      price: 12.99,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
      ingredients: ['Lettuce', 'Tomato', 'Special Sauce']
    },
    {
      id: 2,
      name: 'Cheese Fries',
      price: 6.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=500'
    }
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = 3.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + deliveryFee + tax;

  return (
    <div className="mx-8 md:mx-20 px-4 sm:px-6 lg:px-8 py-14">
      <div className="flex items-center gap-3 mb-8">
        <ShoppingBag className="h-8 w-8" />
        <h1 className="text-3xl font-bold">Your Cart</h1>
      </div>
      
      <div className="grid gap-8 lg:grid-cols-[1fr,400px]">
        {/* Left Column - Order Items */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                Order Items
                <Badge variant="secondary" className="ml-2">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <OrderCard
                    key={item.id}
                    {...item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                  />
                ))}
                {cartItems.length === 0 && (
                  <div className="text-center py-8">
                    <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-muted-foreground">Your cart is empty</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Delivery Address and Order Summary */}
        <div className="space-y-6">
          {/* Delivery Address */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Delivery Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedAddress && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{selectedAddress.type}</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedAddress.address}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {selectedAddress.details}
                      </p>
                    </div>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline" size="sm">
                          Change
                          <ChevronDown className="h-4 w-4 ml-2" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="right">
                        <SheetHeader>
                          <SheetTitle>Select Delivery Address</SheetTitle>
                        </SheetHeader>
                        <div className="mt-6">
                          <RadioGroup
                            value={selectedAddress.id.toString()}
                            onValueChange={(value) => {
                              const address = addresses.find(a => a.id === parseInt(value));
                              if (address) setSelectedAddress(address);
                            }}
                            className="space-y-4"
                          >
                            {addresses.map((address) => (
                              <div key={address.id} className="flex items-start space-x-3">
                                <RadioGroupItem
                                  value={address.id.toString()}
                                  id={`address-${address.id}`}
                                />
                                <div className="flex-1">
                                  <Label
                                    htmlFor={`address-${address.id}`}
                                    className="font-medium"
                                  >
                                    {address.type}
                                  </Label>
                                  <p className="text-sm text-muted-foreground">
                                    {address.address}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {address.details}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </RadioGroup>
                          <Button
                            variant="outline"
                            className="w-full mt-4"
                            onClick={() => console.log('Add new address')}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add New Address
                          </Button>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <Button 
                className="w-full"
                size="lg"
                disabled={!selectedAddress || cartItems.length === 0}
              >
                Place Order
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}