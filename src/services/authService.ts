import api from './api';

export const loginUser = async (email:string, password:string, login: Function) => {
    try {
        const response = await api.post('/auth/signin',{email, password});
        login({role: response.data.role, token: response.data.jwt});
        return response.data;
    } catch(error) {
        throw error;
    }
}

export const logoutUser = (logout: Function) => {
    logout();
    window.location.href = '/';
}
