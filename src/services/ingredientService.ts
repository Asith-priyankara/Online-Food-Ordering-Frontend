import api from "./api";

interface CreateIngredientRequest {
  name: string;
  category: string;
  restaurantId: number;
}

interface UpdateIngredientRequest {
  name?: string;
  category?: string;
}

export interface Ingredient {
  id: number;
  name: string;
  category: string;
  inStock: boolean;
  restaurant: {
    id: number;
    name: string;
  };
}

export interface IngredientCategory {
  id: number;
  name: string;
  restaurant: {
    id: number;
    name: string;
  };
}

// Ingredient operations
export const createIngredient = async (
  ingredientRequest: CreateIngredientRequest
) => {
  try {
    const response = await api.post(
      "/api/admin/ingredients",
      ingredientRequest
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRestaurantIngredients = async (restaurantId: number) => {
  try {
    const response = await api.get(
      `/api/admin/ingredients/restaurant/${restaurantId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateIngredient = async (
  ingredientId: number,
  updateRequest: UpdateIngredientRequest
) => {
  try {
    const response = await api.put(
      `/api/admin/ingredients/${ingredientId}`,
      updateRequest
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteIngredient = async (ingredientId: number) => {
  try {
    const response = await api.delete(`/api/admin/ingredients/${ingredientId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateIngredientStock = async (ingredientId: number) => {
  try {
    const response = await api.put(
      `/api/admin/ingredients/${ingredientId}/stock`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Ingredient category operations
export const createIngredientCategory = async (
  name: string,
  restaurantId: number
) => {
  try {
    const response = await api.post("/api/admin/ingredients/category", {
      name,
      restaurantId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getIngredientCategories = async (restaurantId: number) => {
  try {
    const response = await api.get(
      `/api/admin/ingredients/restaurant/${restaurantId}/category`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateIngredientCategory = async (
  categoryId: number,
  name: string
) => {
  try {
    const response = await api.put(
      `/api/admin/ingredients/category/${categoryId}`,
      { name }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteIngredientCategory = async (categoryId: number) => {
  try {
    const response = await api.delete(
      `/api/admin/ingredients/category/${categoryId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
