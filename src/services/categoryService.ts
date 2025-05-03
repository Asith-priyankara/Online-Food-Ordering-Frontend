import api from './api'; 

export const createCategory = async (categoryName: string) => {
  try {
    const response = await api.post('/api/admin/category', categoryName);
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
