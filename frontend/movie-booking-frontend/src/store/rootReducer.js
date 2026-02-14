import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import cityReducer from "../features/city/citySlice";
import movieReducer from "../features/movie/movieSlice";
import bookingReducer from "../features/booking/bookingSlice";
import errorReducer from "../features/error/errorSlice";
import showReducer from "../features/show/showSlice";
import seatReducer from "../features/seat/seatSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  city: cityReducer,
  show: showReducer,
  movie: movieReducer,
  booking: bookingReducer,
  error: errorReducer,
  seat: seatReducer,
});

export default rootReducer;