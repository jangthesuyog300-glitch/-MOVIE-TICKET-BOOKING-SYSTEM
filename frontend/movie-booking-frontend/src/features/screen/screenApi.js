import axiosInstance from "../../app/axiosInstance";

export const createScreenApi = async (payload) => {
  const res = await axiosInstance.post("/screens", payload);
  return res.data;
};

export const getScreensByTheatreApi = async (theatreId) => {
  const res = await axiosInstance.get(
    `/screens/by-theatre/${theatreId}`
  );
  return res.data;
};
