import api from "./api";

interface UpdateUserRequest {
    fullName?: string;
    phone?: string;
}

interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
}

interface AddAddress {
    street: string;
    city: string;
    state: string;
    zipCode: string;
}
export const getUser = async () => {
    try {
        const response = await api.get('/api/users/profile');
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getUserAddresses = async () => {
    try {
        const response = await api.get('api/users/address');
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateUser = async (reqData: UpdateUserRequest) => {
    try {
        const response = await api.put('api/users/update', reqData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const changePassword = async (reqData: ChangePasswordRequest, login:Function) => {
    try {
        const response = await api.put('api/users/passwordChange', reqData);
        login({role: response.data.role, token: response.data.jwt});
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const addAddress = async (reqData: AddAddress) => {
    try {
        const response = await api.put('api/users/address', reqData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteAddress = async (id: string) => {
    try {
        const response = await api.delete(`api/users/address/${id}`, {            data:  id , // Send ID as a query parameter
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

