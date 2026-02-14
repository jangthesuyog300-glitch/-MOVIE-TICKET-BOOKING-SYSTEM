import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import axiosInstance from "../../app/axiosInstance";

const MyBookings = () => {
  const userId = Number(localStorage.getItem("userId")); // ✅ FIX
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (userId) {
      fetchBookings();
    }
  }, [userId]);

  const fetchBookings = async () => {
    try {
      const res = await axiosInstance.get(`/bookings/user/${userId}`);

      const safeData = Array.isArray(res.data) ? res.data : [];

      const sorted = safeData.sort((a, b) => {
        const aTime = a.showDate && a.startTime
          ? new Date(`${a.showDate}T${a.startTime}`)
          : 0;
        const bTime = b.showDate && b.startTime
          ? new Date(`${b.showDate}T${b.startTime}`)
          : 0;
        return bTime - aTime;
      });

      setBookings(sorted);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load bookings");
    }
  };

  const canCancel = (booking) => {
    if (!booking.showDate || !booking.startTime) return false;

    const showTime = dayjs(
      `${booking.showDate} ${booking.startTime}`
    );

    return showTime.diff(dayjs(), "hour") > 3;
  };

  const cancelBooking = async (bookingId) => {
    try {
      await axiosInstance.post("/bookings/cancel", {
        bookingId,
        userId,
      });
      toast.success("Booking cancelled");
      fetchBookings();
    } catch (err) {
      console.error(err);
      toast.error("Unable to cancel booking");
    }
  };

  const renderSeats = (seats) => {
    if (!Array.isArray(seats)) return "—";

    // ✅ Handles ALL formats
    return seats
      .map((s) => s.seatNumber || s)
      .join(", ");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Bookings</h2>

      {bookings.length === 0 && (
        <p>No bookings found.</p>
      )}

      {bookings.map((b) => (
        <div
          key={b.bookingId}
          style={{
            background: "#fff",
            borderRadius: "10px",
            padding: "16px",
            marginBottom: "15px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h3 style={{ marginBottom: 5 }}>{b.movieName}</h3>
          <p style={{ margin: "4px 0" }}>{b.theatreName}</p>

          <p style={{ margin: "4px 0" }}>
            {b.showDate} | {b.startTime}
          </p>

          <p style={{ margin: "4px 0" }}>
            <strong>Seats:</strong> {renderSeats(b.seats)}
          </p>

          <p style={{ margin: "4px 0" }}>
            <strong>Total:</strong> ₹{b.totalAmount}
          </p>

          {canCancel(b) ? (
            <button
              onClick={() => cancelBooking(b.bookingId)}
              style={{
                background: "#dc3545",
                color: "#fff",
                border: "none",
                padding: "8px 14px",
                borderRadius: "6px",
                marginTop: 8,
                cursor: "pointer",
              }}
            >
              Cancel Booking
            </button>
          ) : (
            <span style={{ color: "#999", marginTop: 8, display: "block" }}>
              Cancellation not available
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
