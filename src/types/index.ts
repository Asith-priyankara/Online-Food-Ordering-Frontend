// Common types used across the application

export interface User {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  role: string;
  addresses?: Address[];
}

export interface Address {
  id: number;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  type?: "home" | "work" | "other";
}

export interface Restaurant {
  id: number;
  name: string;
  description: string;
  cuisineType: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  contactInformation: {
    email: string;
    mobile: string;
  };
  openingHours: string;
  images: string[];
  rating?: number;
  open?: boolean;
  owner?: User;
}

export interface Food {
  id: number;
  name: string;
  description: string;
  price: number;
  category: Category;
  images: string[];
  available: boolean;
  vegetarian: boolean;
  seasonal: boolean;
  ingredients: IngredientsItem[];
  restaurant: Restaurant;
}

export interface Category {
  id: number;
  name: string;
  restaurant: Restaurant;
}

export interface IngredientsItem {
  id: number;
  name: string;
  category: IngredientCategory;
  inStock: boolean;
  restaurant: Restaurant;
}

export interface IngredientCategory {
  id: number;
  name: string;
  restaurant: Restaurant;
}

export interface CartItem {
  id: number;
  food: Food;
  quantity: number;
  ingredients: string[];
  totalPrice: number;
}

export interface Cart {
  id: number;
  customer: User;
  items: CartItem[];
  total: number;
}

export interface Order {
  id: number;
  customer: User;
  restaurant: Restaurant;
  orderItems: OrderItem[];
  totalAmount: number;
  orderStatus: OrderStatus;
  createdAt: string;
  deliveryAddress: Address;
}

export interface OrderItem {
  id: number;
  food: Food;
  quantity: number;
  totalPrice: number;
  ingredients: string[];
}

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PREPARING"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED";

export type UserRole = "ROLE_CUSTOMER" | "ROLE_RESTAURANT_OWNER" | "ROLE_ADMIN";

// API Response types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface RestaurantForm {
  name: string;
  description: string;
  cuisineType: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  contactInformation: {
    email: string;
    mobile: string;
  };
  openingHours: string;
  images: string[];
}

export interface FoodForm {
  name: string;
  description: string;
  price: number;
  categoryId: number;
  images: string[];
  vegetarian: boolean;
  seasonal: boolean;
  ingredients: number[];
}

// Search types
export interface SearchFilters {
  keyword?: string;
  location?: string;
  cuisine?: string;
  priceRange?: [number, number];
  rating?: number;
  vegetarian?: boolean;
  openNow?: boolean;
}

export interface SearchResult {
  restaurants: Restaurant[];
  foods: Food[];
  totalCount: number;
}
