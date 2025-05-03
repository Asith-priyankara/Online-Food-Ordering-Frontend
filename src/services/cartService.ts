import api from './api';

interface AddCartItemRequest {
  foodId: number;
  quantity: number;
  ingredients: string[];
}

interface UpdateCartItemRequest {
  cartItemId: number;
  quantity: number;
}

export const addItemToCart = async (addCartItemRequest: AddCartItemRequest) => {
  try {
    const response = await api.put('/api/cart/add', addCartItemRequest );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCartItemQuantity = async (updateCartItemRequest: UpdateCartItemRequest) => {
  try {
    const response = await api.put('/api/cart-item/update', updateCartItemRequest);
    return response.data; 
  } catch (error) {
    throw error;
  }
};

export const removeCartItem = async (cartItemId: string) => {
  try {
    const response = await api.delete(`/api/cart-item/${cartItemId}/remove`);
    return response.data; 
  } catch (error) {
    throw error;
  }
};

export const clearCart = async () => {
  try {
    const response = await api.put('/api/cart/clear');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserCart = async () => {
  try {
    const response = await api.get('/api/cart');
    return response.data; 
  } catch (error) {
    throw error;
  }
};
