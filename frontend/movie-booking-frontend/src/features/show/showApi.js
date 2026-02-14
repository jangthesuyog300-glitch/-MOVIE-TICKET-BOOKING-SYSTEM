import axiosInstance from "../../app/axiosInstance";

export const fetchShowsByCityMovieDateApi = async (
  city,
  movieId,
  date
) => {
  const res = await axiosInstance.get(
    `/shows/${city}/${movieId}/${date}`
  );
  return res.data;
};

export const createShowApi = async (payload) => {
  const res = await axiosInstance.post("/shows", payload);
  return res.data;
};
