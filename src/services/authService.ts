import api from "./api";

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  role: string;
}

export const loginUser = async (
  email: string,
  password: string,
  login: Function
) => {
  try {
    const response = await api.post("/auth/signin", { email, password });
    login({ role: response.data.role, token: response.data.jwt });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (registerRequest: RegisterRequest) => {
  try {
    const response = await api.post("/auth/signup", registerRequest);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = (logout: Function) => {
  logout();
  window.location.href = "/";
};
