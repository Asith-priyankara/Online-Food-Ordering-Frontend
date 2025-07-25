import api from "./api";

export interface Category {
  id: number;
  name: string;
  restaurant: {
    id: number;
    name: string;
  };
}

interface CreateCategoryRequest {
  name: string;
  restaurantId: number;
}

export const createCategory = async (categoryData: CreateCategoryRequest) => {
  try {
    const response = await api.post("/api/admin/category", categoryData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRestaurantCategories = async (restaurantId: number) => {
  try {
    const response = await api.get(`/api/category/restaurant/${restaurantId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllCategories = async () => {
  try {
    const response = await api.get("/api/category");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCategory = async (categoryId: number, name: string) => {
  try {
    const response = await api.put(`/api/admin/category/${categoryId}`, {
      name,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCategory = async (categoryId: number) => {
  try {
    const response = await api.delete(`/api/admin/category/${categoryId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
