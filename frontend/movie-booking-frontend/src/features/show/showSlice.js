import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchShowsByCityMovieDateApi } from "./showApi";

export const fetchShowsByCityMovieDate = createAsyncThunk(
  "show/fetchByCityMovieDate",
  async ({ city, movieId, date }) =>
    await fetchShowsByCityMovieDateApi(city, movieId, date)
);

const showSlice = createSlice({
  name: "show",
  initialState: {
    shows: [],
    loading: false,
  },
  reducers: {
    clearShows: (state) => {
      state.shows = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShowsByCityMovieDate.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchShowsByCityMovieDate.fulfilled, (state, action) => {
        state.shows = action.payload;
        state.loading = false;
      })
      .addCase(fetchShowsByCityMovieDate.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { clearShows } = showSlice.actions;
export default showSlice.reducer;
