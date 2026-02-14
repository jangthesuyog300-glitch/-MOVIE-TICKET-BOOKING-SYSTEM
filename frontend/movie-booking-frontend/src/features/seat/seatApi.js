import axiosInstance from "../../app/axiosInstance";

export const fetchSeatLayoutApi = async (showId) => {
  const res = await axiosInstance.get(`/shows/${showId}/seats`);
  return res.data;
};

export const createBookingApi = async (payload) => {
  const res = await axiosInstance.post("/bookings", payload);
  return res.data;
};
