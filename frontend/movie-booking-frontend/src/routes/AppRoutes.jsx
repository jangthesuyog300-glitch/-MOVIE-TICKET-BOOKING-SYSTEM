// src/routes/AppRoutes.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Route guards
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

// Layouts
import AuthLayout from "../layouts/AuthLayout";
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";
import TheatreManagerLayout from "../layouts/TheatreManagerLayout";

// Auth pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// User pages
import Home from "../pages/user/Home";
import SearchMovies from "../pages/user/SearchMovies";
import MovieDetails from "../pages/user/MovieDetails";
import ShowSelection from "../pages/user/ShowSelection";
import BookingConfirmation from "../Pages/user/BookingConfirmation";
import Payment from "../Pages/user/Payment";
import Ticket from "../Pages/user/Ticket";
import MyBookings from "../Pages/user/MyBookings";
import Profile from "../pages/user/Profile";
import Notifications from "../Pages/user/Notifications";
import SeatSelection from "../Pages/user/SeatSelection";
import TheatreManagerRequest from "../Pages/user/TheatreManagerRequest";

// Admin pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateMovie from "../pages/admin/CreateMovie";
import TheatreManagerRequests from "../pages/admin/TheatreManagerRequests";
import ApprovedManagers from "../pages/admin/ApprovedManagers";

// Theatre Manager pages
import ManagerDashboard from "../Pages/manager/ManagerDashboard";
import CreateScreen from "../Pages/manager/CreateScreen";
import ScreenLayoutBuilder from "../pages/manager/ScreenLayoutBuilder";
import CreateShow from "../pages/manager/CreateShow";
import UpcomingShows from "../pages/manager/UpcomingShows";
import PastShows from "../pages/manager/PastShows";
import ManagerScreens from "../Pages/manager/ManagerScreens";

// Error pages
import ErrorPage from "../pages/error/ErrorPage";
import AccessDenied from "../pages/error/AccessDenied";
import NotFound from "../pages/error/NotFound";
import { useEffect } from "react";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>

        {/* ---------------- AUTH ROUTES ---------------- */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* ---------------- PROTECTED ROUTES ---------------- */}
        <Route element={<ProtectedRoute />}>

          {/* -------- USER ROUTES -------- */}
          <Route element={<RoleRoute allowedRoles={["User"]} />}>
            <Route element={<UserLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<SearchMovies />} />
              <Route path="/movie/:movieId" element={<MovieDetails />} />
              <Route path="/shows/:movieId" element={<ShowSelection />} />
              <Route path="/seats/:showId" element={<SeatSelection />} />
              <Route path="/booking/confirm" element={<BookingConfirmation />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/ticket/:bookingId" element={<Ticket />} />
              <Route path="/my-bookings" element={<MyBookings />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/theaterManagerRequest" element={<TheatreManagerRequest />} />
            </Route>
          </Route>

          {/* -------- ADMIN ROUTES -------- */}
          <Route element={<RoleRoute allowedRoles={["Admin"]} />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/create-movie" element={<CreateMovie />} />
              <Route
                path="/admin/theatre-manager-requests"
                element={<TheatreManagerRequests />}
              />
              <Route
                path="/admin/approved-managers"
                element={<ApprovedManagers />}
              />
            </Route>
          </Route>

          {/* -------- THEATRE MANAGER ROUTES -------- */}
          <Route element={<RoleRoute allowedRoles={["TheatreManager"]} />}>
            <Route element={<TheatreManagerLayout />}>
              <Route path="/manager" element={<ManagerDashboard />} />
              <Route path="/manager/create-screen" element={<CreateScreen />} />
              <Route
                path="/manager/screen-layout-design/:screenId"
                element={<ScreenLayoutBuilder />}
              />
              <Route
                path="/manager/create-show"
                element={<CreateShow />}
              />
              <Route
                path="/manager/screens"
                element={<ManagerScreens />}
              />
              <Route
                path="/manager/upcoming-shows"
                element={<UpcomingShows />}
              />
              <Route
                path="/manager/past-shows"
                element={<PastShows />}
              />
            </Route>
          </Route>

        </Route>

        {/* ---------------- ERROR ROUTES ---------------- */}
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  );
};

export default AppRoutes;
