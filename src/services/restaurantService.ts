import api from "./api";

interface CreateRestaurantRequest {
    name: string;
    description: string;
    cuisineType: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    },
    contactInformation: {
      email: string;
      mobile: string;
    },
    openingHours: string
    images: string[];
}

interface UpdateRestaurantRequest {
    name?: string;
    description?: string;
    cuisineType?: string;
    address: {
      street?: string;
      city?: string;
      state?: string;
      zipCode?: string;
    },
    contactInformation: {
      email?: string;
      mobile?: string;
    },
    openingHours?: string
    images?: string[];
}


export const createRestaurant = async (reqData: CreateRestaurantRequest) => {
    try {
        const response = await api.post('/api/admin/restaurant', reqData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateRestaurant = async (restaurantId: string, reqData: UpdateRestaurantRequest) => {
    try {
        const response = await api.put(`/api/admin/restaurant/${restaurantId}`, reqData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteRestaurant = async (restaurantId: string) => {
    try {
        const response = await api.delete(`/api/admin/restaurant/${restaurantId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const changeStatusRestaurant = async (restaurantId: string) => {
    try {
        const response = await api.put(`/api/admin/restaurant/${restaurantId}/status`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUserRestaurantDetails = async () => {
    try {
        const response = await api.get('/api/admin/restaurant/user');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getAllRestaurantDetails = async () => {
    try {
        const response = await api.get('/api/restaurant');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const searchRestaurantDetails = async (keyword:string) => {
    try {
        const response = await api.get('/api/restaurant/user', {params:{keyword:keyword}});
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getRestaurantDetails = async (restaurantId: string) => {
    try {
        const response = await api.get(`/api/restaurant/${restaurantId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const addToFavoriteRestaurant = async (restaurantId: string) => {
    try {
        const response = await api.put(`/api/restaurant/${restaurantId}/add-favorites`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
