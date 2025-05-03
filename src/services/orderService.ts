import api from './api'; 

// interface OrderRequest {
//   restaurantId: string;
//   items: { foodId: string, quantity: number }[];
//   totalAmount: number;
//   orderDate: string;
// }


// export const createOrder = async (orderRequest: OrderRequest) => {
//   try {
//     const response = await api.post('/api/order', orderRequest);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const getUserOrderHistory = async ()=> {
  try {
    const response = await api.get('/api/order/user');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRestaurantOrderHistory = async (restaurantId: string, orderStatus: string = '') => {
  try {
    const response = await api.get(`/api/admin/order/restaurant/${restaurantId}`, {
      params: { orderStatus },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateOrderStatus = async (orderId: string, orderStatus: string) => {
  try {
    const response = await api.put(`/api/admin/order/${orderId}/${orderStatus}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
