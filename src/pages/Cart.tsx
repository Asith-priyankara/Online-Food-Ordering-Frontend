import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { MapPin, Plus, ChevronDown, ShoppingBag } from "lucide-react";
import OrderCard from "@/components/customUI/OrderCard";
import {
  getUserCart,
  updateCartItemQuantity,
  removeCartItem,
} from "@/services/cartService";
import { getUserAddresses } from "@/services/userService";
import { createOrder } from "@/services/orderService";
import { PageLoading } from "@/components/ui/loading";
import { toast } from "sonner";

interface Address {
  id: number;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

interface CartItem {
  id: number;
  quantity: number;
  ingredients: string[];
  food: {
    id: number;
    name: string;
    description: string;
    price: number;
    images: string[];
  };
}

interface Cart {
  id: number;
  cartItems: CartItem[];
  customer: {
    id: number;
    fullName: string;
  };
  totalPrice: number;
}

export default function Cart() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  useEffect(() => {
    fetchCartData();
    fetchAddresses();
  }, []);

  useEffect(() => {
    if (addresses.length > 0 && !selectedAddress) {
      setSelectedAddress(addresses[0]);
    }
  }, [addresses, selectedAddress]);

  const fetchCartData = async () => {
    try {
      setLoading(true);
      const cartData = await getUserCart();
      setCart(cartData);
    } catch (error: any) {
      toast.error("Failed to load cart", {
        description: error.response?.data?.message || "Please try again later",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchAddresses = async () => {
    try {
      const addressData = await getUserAddresses();
      setAddresses(addressData);
    } catch (error: any) {
      toast.error("Failed to load addresses", {
        description: error.response?.data?.message || "Please try again later",
      });
    }
  };

  const updateQuantity = async (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      await handleRemoveItem(id);
      return;
    }

    try {
      await updateCartItemQuantity({ cartItemId: id, quantity: newQuantity });
      await fetchCartData(); // Refresh cart data
      toast.success("Cart updated successfully");
    } catch (error: any) {
      toast.error("Failed to update cart", {
        description: error.response?.data?.message || "Please try again later",
      });
    }
  };

  const handleRemoveItem = async (cartItemId: number) => {
    try {
      await removeCartItem(cartItemId.toString());
      await fetchCartData(); // Refresh cart data
      toast.success("Item removed from cart");
    } catch (error: any) {
      toast.error("Failed to remove item", {
        description: error.response?.data?.message || "Please try again later",
      });
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress || !cart) {
      toast.error("Please select a delivery address");
      return;
    }

    try {
      const orderRequest = {
        restaurantId: cart.cartItems[0]?.food?.id ? "1" : "1", // You may need to adjust this based on your data structure
        deliveryAddress: {
          street: selectedAddress.street,
          city: selectedAddress.city,
          state: selectedAddress.state,
          zipCode: selectedAddress.zipCode,
        },
      };

      await createOrder(orderRequest);
      toast.success("Order placed successfully!");
      await fetchCartData(); // Refresh cart
    } catch (error: any) {
      toast.error("Failed to place order", {
        description: error.response?.data?.message || "Please try again later",
      });
    }
  };

  const cartItems = cart?.cartItems || [];
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.food.price * item.quantity,
    0
  );
  const deliveryFee = 3.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + deliveryFee + tax;

  if (loading) {
    return <PageLoading message="Loading your cart..." />;
  }

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
                  {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <OrderCard
                    key={item.id}
                    id={item.id}
                    name={item.food.name}
                    price={item.food.price}
                    quantity={item.quantity}
                    image={
                      item.food.images?.[0] ||
                      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500"
                    }
                    ingredients={item.ingredients}
                    onUpdateQuantity={updateQuantity}
                    onRemove={handleRemoveItem}
                  />
                ))}
                {cartItems.length === 0 && (
                  <div className="text-center py-8">
                    <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-muted-foreground">
                      Your cart is empty
                    </p>
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
                      <p className="font-medium">Delivery Address</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedAddress.street}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {selectedAddress.city}, {selectedAddress.state}{" "}
                        {selectedAddress.zipCode}
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
                              const address = addresses.find(
                                (a) => a.id === parseInt(value)
                              );
                              if (address) setSelectedAddress(address);
                            }}
                            className="space-y-4"
                          >
                            {addresses.map((address) => (
                              <div
                                key={address.id}
                                className="flex items-start space-x-3"
                              >
                                <RadioGroupItem
                                  value={address.id.toString()}
                                  id={`address-${address.id}`}
                                />
                                <div className="flex-1">
                                  <Label
                                    htmlFor={`address-${address.id}`}
                                    className="font-medium"
                                  >
                                    Address {address.id}
                                  </Label>
                                  <p className="text-sm text-muted-foreground">
                                    {address.street}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {address.city}, {address.state}{" "}
                                    {address.zipCode}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </RadioGroup>
                          <Button
                            variant="outline"
                            className="w-full mt-4"
                            onClick={() => console.log("Add new address")}
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
                onClick={handlePlaceOrder}
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
