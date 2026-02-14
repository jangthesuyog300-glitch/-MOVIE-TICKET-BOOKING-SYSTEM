import axiosInstance from "../../app/axiosInstance";

export const fetchCitiesApi = async () => {
  const response = await axiosInstance.get("/cities");
  return response.data;
};
