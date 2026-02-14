import axiosInstance from "../../app/axiosInstance";

export const loginApi = async (payload) => {
  const response = await axiosInstance.post("/auth/login", payload);
  return response.data;
};

export const registerApi = async (payload) => {
  const response = await axiosInstance.post("/auth/register", payload);
  return response.data;
};
