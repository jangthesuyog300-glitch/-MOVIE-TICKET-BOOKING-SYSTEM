import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCity: localStorage.getItem("city") || null,
};

const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    setCity: (state, action) => {
      state.selectedCity = action.payload;
      localStorage.setItem("city", action.payload);
    },
    clearCity: (state) => {
      state.selectedCity = null;
      localStorage.removeItem("city");
    },
  },
});

export const { setCity, clearCity } = citySlice.actions;
export default citySlice.reducer;
