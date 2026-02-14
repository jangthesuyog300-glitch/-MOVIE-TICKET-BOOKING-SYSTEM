import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSeatLayoutApi } from "./seatApi";

/* ================= ASYNC THUNK ================= */
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
    /* ===== SET MAX SEATS (Seat Count Popup) ===== */
    setMaxSeats: (state, action) => {
      state.maxSeats = action.payload;
      state.selectedSeats = [];
      state.totalPrice = 0;
    },

    /* ===== TOGGLE SEAT SELECTION ===== */
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
        if (state.selectedSeats.length >= state.maxSeats) {
          state.selectedSeats.shift(); // auto-unselect first seat
        }
        state.selectedSeats.push(seat);
      }

      state.totalPrice = state.selectedSeats.reduce(
        (sum, s) => sum + (s.price || 0),
        0
      );
    },

    /* ===== REALTIME SEAT UPDATE (SignalR) ===== */
    updateSeatStatusRealtime: (state, action) => {
      const updatedSeat = action.payload;

      state.layout.forEach((row) => {
        row.seats.forEach((seat) => {
          if (
            seat.showSeatStatusId ===
            updatedSeat.showSeatStatusId
          ) {
            seat.status = updatedSeat.status;
          }
        });
      });
    },

    /* ===== CLEAR STATE (ON LOGOUT / BACK) ===== */
    clearSeatState: (state) => {
      state.layout = [];
      state.selectedSeats = [];
      state.maxSeats = 0;
      state.totalPrice = 0;
      state.loading = false;
      state.error = null;
    },
  },

  /* ================= EXTRA REDUCERS ================= */
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeatLayout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSeatLayout.fulfilled, (state, action) => {
        state.layout = action.payload.seatRows || [];
        state.loading = false;
      })
      .addCase(fetchSeatLayout.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to load seat layout";
      });
  },
});

/* ================= EXPORTS ================= */
export const {
  setMaxSeats,
  toggleSeat,
  updateSeatStatusRealtime,
  clearSeatState,
  setSeatCount,
} = seatSlice.actions;

export default seatSlice.reducer;
