import axiosInstance from "../../app/axiosInstance";

export const getManagerRequestsApi = async () => {
  const res = await axiosInstance.get("/theaterManagerRequest");
  return res.data;
};

export const approveManagerRequestApi = async (
  requestId,
  adminId
) => {
  const res = await axiosInstance.put(
    `/theaterManagerRequest/approve/${requestId}/${adminId}`
  );
  return res.data;
};

export const rejectManagerRequestApi = async (
  requestId,
  adminId,
  reason
) => {
  const res = await axiosInstance.put(
    `/theaterManagerRequest/reject/${requestId}/${adminId}`,
    null,
    { params: { reason } }
  );
  return res.data;
};
