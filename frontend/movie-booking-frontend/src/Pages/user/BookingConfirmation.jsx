import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createBookingApi } from "../../features/booking/bookingApi";

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const showId = location.state?.showId;
  const seats = location.state?.seats || [];

  const [loading, setLoading] = useState(false);

  /* ---------- SAFETY CHECK ---------- */
  useEffect(() => {
    if (!showId || seats.length === 0) {
      toast.error("Invalid booking data");
      navigate("/");
    }
  }, [showId, seats, navigate]);

  if (!showId || seats.length === 0) return null;

  const totalAmount = seats.reduce(
    (sum, seat) => sum + (seat.price || 0),
    0
  );

  /* ---------- PAY NOW HANDLER ---------- */
  const handlePayNow = async () => {
    try {
      setLoading(true);

      const payload = {
        userId: localStorage.getItem("userId"), // TODO: replace with logged-in userId
        seats: seats.map((s) => ({
          showSeatStatusId: s.showSeatStatusId,
        })),
      };

      const bookingResponse = await createBookingApi(payload);

      toast.success("Seats locked successfully");

      navigate("/payment", {
        state: {
          booking: bookingResponse,
          totalAmount,
        },
      });
    } catch (err) {
      toast.error("Seats already booked. Please try again.");
      navigate(-1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "400px",
          width: "100%",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
          textAlign: "center",
          border: "1px solid #eee",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Booking Confirmation</h2>

        <p style={{ fontSize: "1.1rem", marginBottom: "10px" }}>
          <strong>Seats:</strong>{" "}
          {seats.map((s) => s.seatNumber).join(", ")}
        </p>

        <p style={{ fontSize: "1.2rem", color: "#333" }}>
          <strong>Total Amount:</strong> ₹{totalAmount}
        </p>

        <button
          style={{
            marginTop: "30px",
            padding: "12px 30px",
            background: "#f84464",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer",
            width: "100%",
            opacity: loading ? 0.7 : 1,
          }}
          disabled={loading}
          onClick={handlePayNow}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
