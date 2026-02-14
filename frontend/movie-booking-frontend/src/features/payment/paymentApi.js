import axiosInstance from "../../app/axiosInstance";

export const initiatePaymentApi = async (payload) => {
  const res = await axiosInstance.post("/payments/initiate", payload);
  return res.data;
};

export const verifyPaymentApi = async (payload) => {
  const res = await axiosInstance.post("/payments/verify", payload);
  return res.data;
};
