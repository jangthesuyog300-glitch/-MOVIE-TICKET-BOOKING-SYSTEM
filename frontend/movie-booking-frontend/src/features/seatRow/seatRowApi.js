import axiosInstance from "../../app/axiosInstance";

export const createSeatRowApi = async (payload) => {
  const res = await axiosInstance.post("/seat-rows", payload);
  return res.data;
};

export const renameSeatRowApi = async (seatRowId, rowName) => {
  const res = await axiosInstance.put(
    `/seat-rows/${seatRowId}/row-name/${rowName}`
  );
  return res.data;
};

export const addSeatApi = async (seatRowId, payload) => {
  const res = await axiosInstance.post(
    `/seat-rows/seats/${seatRowId}`,
    payload
  );
  return res.data;
};

export const updateSeatApi = async (
  seatRowId,
  seatId,
  payload
) => {
  const res = await axiosInstance.put(
    `/seat-rows/${seatRowId}/seats/${seatId}`,
    payload
  );
  return res.data;
};

export const deleteSeatApi = async (seatRowId, seatId) => {
  const res = await axiosInstance.delete(
    `/seat-rows/${seatRowId}/seats/${seatId}`
  );
  return res.data;
};

export const fetchSeatRowsByScreenApi = async (screenId) => {
  const res = await axiosInstance.get(
    `/seat-rows/screen/${screenId}`
  );
  return res.data;
};
