import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSeatLayoutApi } from "./seatApi";

/* ================= ASYNC ================= */
export const fetchSeatLayout = createAsyncThunk(
  "seat/fetchLayout",
  async (showId) => {
    return await fetchSeatLayoutApi(showId);
  }
);

/* ================= SLICE ================= */
const seatSlice = createSlice({
  name: "seat",
  initialState: {
    layout: [],
    selectedSeats: [],
    maxSeats: 0,
    totalPrice: 0,
    loading: false,
    error: null,
  },

  reducers: {
    /* Seat count selection */
    setMaxSeats: (state, action) => {
      state.maxSeats = action.payload;
      state.selectedSeats = [];
      state.totalPrice = 0;
    },

    /* Toggle seat */
    toggleSeat: (state, action) => {
      const seat = action.payload;

      const exists = state.selectedSeats.find(
        (s) => s.showSeatStatusId === seat.showSeatStatusId
      );

      if (exists) {
        state.selectedSeats = state.selectedSeats.filter(
          (s) => s.showSeatStatusId !== seat.showSeatStatusId
        );
      } else {
        if (state.selectedSeats.length >= state.maxSeats) return;
        state.selectedSeats.push(seat);
      }

      state.totalPrice = state.selectedSeats.reduce(
        (sum, s) => sum + (s.price || 0),
        0
      );
    },

    /* SignalR real-time updates */
    updateSeatStatusRealtime: (state, action) => {
      const updatedSeat = action.payload;

      state.layout.forEach((row) => {
        row.seats.forEach((seat) => {
          if (seat.showSeatStatusId === updatedSeat.ShowSeatStatusId) {
            seat.status = updatedSeat.Status || seat.status;
          }
        });
      });
    },

    clearSeatState: (state) => {
      state.layout = [];
      state.selectedSeats = [];
      state.maxSeats = 0;
      state.totalPrice = 0;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchSeatLayout.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSeatLayout.fulfilled, (state, action) => {
        state.layout = action.payload.seatRows || [];
        state.loading = false;
      })
      .addCase(fetchSeatLayout.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load seat layout";
      });
  },
});

export const {
  setMaxSeats,
  toggleSeat,
  updateSeatStatusRealtime,
  clearSeatState,
} = seatSlice.actions;

export default seatSlice.reducer;
