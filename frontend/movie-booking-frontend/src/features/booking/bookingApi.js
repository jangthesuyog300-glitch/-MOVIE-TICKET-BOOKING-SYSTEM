import axiosInstance from "../../app/axiosInstance";

export const createBookingApi = async (payload) => {
  const res = await axiosInstance.post("/bookings", payload);
  return res.data;
};

export const cancelBookingApi = async (payload) => {
  const res = await axiosInstance.post("/bookings/cancel", payload);
  return res.data;
};
