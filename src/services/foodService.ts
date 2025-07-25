import api from "./api";

interface CreateFoodRequest {
  name: string;
  description: string;
  price: number;
  category: string;
  image: string[];
  restaurantId: number;
  vegetarian: boolean;
  seasional: boolean;
  ingredients: IngredientsItem[];
}

interface IngredientsItem {
  id: number;
  name: string;
  category: string;
  restaurant: string;
}

export const createFood = async (foodRequest: CreateFoodRequest) => {
  try {
    const response = await api.post("/api/admin/food", foodRequest);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteFood = async (foodId: number) => {
  try {
    const response = await api.delete(`/api/admin/food/${foodId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateFoodAvailability = async (foodId: string) => {
  try {
    const response = await api.put(`/api/admin/food/${foodId}/availability`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchFood = async (name: string) => {
  try {
    const response = await api.get("/api/food/search", { params: { name } });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRestaurantFood = async (
  restaurantId: number,
  vegetarian: boolean,
  nonVeg: boolean,
  seasonal: boolean,
  foodCategory: string | undefined
) => {
  try {
    const response = await api.get(`/api/food/restaurant/${restaurantId}`, {
      params: {
        vegetarian,
        nonVeg,
        seasonal,
        food_category: foodCategory,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFoodById = async (foodId: number) => {
  try {
    const response = await api.get(`/api/food/${foodId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllFood = async () => {
  try {
    const response = await api.get("/api/food");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateFood = async (
  foodId: number,
  foodRequest: Partial<CreateFoodRequest>
) => {
  try {
    const response = await api.put(`/api/admin/food/${foodId}`, foodRequest);
    return response.data;
  } catch (error) {
    throw error;
  }
};
