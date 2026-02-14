import axiosInstance from "../../app/axiosInstance";

export const fetchAllMoviesApi = async () => {
  const res = await axiosInstance.get("/movie");
  return res.data;
};

export const fetchTrendingMoviesApi = async (count = 20) => {
  const res = await axiosInstance.get(`/movie/Latest/${count}`);
  return res.data;
};

export const fetchMovieByIdApi = async (id) => {
  const res = await axiosInstance.get(`/movie/id/${id}`);
  return res.data;
};

export const createMovieApi = async (formData) => {
  const res = await axiosInstance.post("/movie", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
