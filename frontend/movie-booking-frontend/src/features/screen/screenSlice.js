import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createScreenApi,
  getScreensByTheatreApi,
} from "./screenApi";

export const createScreen = createAsyncThunk(
  "screen/create",
  async (payload) => await createScreenApi(payload)
);

export const fetchScreensByTheatre = createAsyncThunk(
  "screen/fetchByTheatre",
  async (theatreId) =>
    await getScreensByTheatreApi(theatreId)
);

const screenSlice = createSlice({
  name: "screen",
  initialState: {
    screens: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchScreensByTheatre.fulfilled, (state, action) => {
        state.screens = action.payload;
      });
  },
});

export default screenSlice.reducer;
