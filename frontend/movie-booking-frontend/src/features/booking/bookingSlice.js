import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createBookingApi } from "./bookingApi";

export const createBooking = createAsyncThunk(
  "booking/create",
  async (payload) => await createBookingApi(payload)
);

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookingId: null,
    totalAmount: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createBooking.fulfilled, (state, action) => {
      state.bookingId = action.payload.bookingId;
      state.totalAmount = action.payload.totalAmount;
    });
  },
});

export default bookingSlice.reducer;
