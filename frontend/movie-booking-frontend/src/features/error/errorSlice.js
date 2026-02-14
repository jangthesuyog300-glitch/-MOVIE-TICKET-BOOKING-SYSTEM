// src/features/error/errorSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hasError: false,
  statusCode: null,
  message: null,
  source: null, // optional: API or module name
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (state, action) => {
      const { statusCode, message, source } = action.payload;

      state.hasError = true;
      state.statusCode = statusCode || null;
      state.message = message || "Something went wrong";
      state.source = source || null;
    },

    clearError: (state) => {
      state.hasError = false;
      state.statusCode = null;
      state.message = null;
      state.source = null;
    },
  },
});

export const { setError, clearError } = errorSlice.actions;

export default errorSlice.reducer;
