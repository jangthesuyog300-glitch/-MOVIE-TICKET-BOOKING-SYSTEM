import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAllMoviesApi,
  fetchTrendingMoviesApi,
  fetchMovieByIdApi,
} from "./movieApi";

export const fetchAllMovies = createAsyncThunk(
  "movie/fetchAll",
  async () => await fetchAllMoviesApi()
);

export const fetchTrendingMovies = createAsyncThunk(
  "movie/fetchTrending",
  async (count) => await fetchTrendingMoviesApi(count)
);

export const fetchMovieById = createAsyncThunk(
  "movie/fetchById",
  async (id) => await fetchMovieByIdApi(id)
);

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    movies: [],
    trending: [],
    selectedMovie: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.loading = false;
      })
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        state.trending = action.payload;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.selectedMovie = action.payload;
      });
  },
});

export default movieSlice.reducer;
