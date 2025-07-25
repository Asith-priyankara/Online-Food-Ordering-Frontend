import api from "./api";

export interface SearchResult {
  restaurants: Array<{
    id: number;
    name: string;
    description: string;
    cuisineType: string;
    rating: number;
    address: string;
    images: string[];
  }>;
  foods: Array<{
    id: number;
    name: string;
    description: string;
    price: number;
    image: string[];
    restaurant: {
      id: number;
      name: string;
    };
  }>;
}

export const globalSearch = async (keyword: string, location?: string) => {
  try {
    const params: any = { keyword };
    if (location) {
      params.location = location;
    }

    const response = await api.get("/api/search", { params });
    return response.data as SearchResult;
  } catch (error) {
    throw error;
  }
};

export const searchRestaurants = async (keyword: string, location?: string) => {
  try {
    const params: any = { keyword };
    if (location) {
      params.location = location;
    }

    const response = await api.get("/api/restaurant/search", { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchFoods = async (keyword: string) => {
  try {
    const response = await api.get("/api/food/search", {
      params: { name: keyword },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRestaurantsByLocation = async (location: string) => {
  try {
    const response = await api.get("/api/restaurant/location", {
      params: { location },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRestaurantsByCuisine = async (cuisine: string) => {
  try {
    const response = await api.get("/api/restaurant/cuisine", {
      params: { cuisine },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
