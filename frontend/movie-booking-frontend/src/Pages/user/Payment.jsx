import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  initiatePaymentApi,
  verifyPaymentApi,
} from "../../features/payment/paymentApi";

/* ================= LOAD RAZORPAY SCRIPT ================= */
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const booking = location.state?.booking;
  const totalAmount = location.state?.totalAmount;

  /* ---------- SAFETY ---------- */
  useEffect(() => {
    if (!booking || !totalAmount) {
      toast.error("Invalid payment session");
      navigate("/");
    }
  }, [booking, totalAmount, navigate]);

  if (!booking || !totalAmount) return null;

  /* ================= PAY HANDLER ================= */
  const handlePayment = async () => {
    const loaded = await loadRazorpayScript();

    if (!loaded) {
      toast.error("Failed to load payment gateway");
      return;
    }

    try {
      /* 1️⃣ Create Razorpay Order */
      const order = await initiatePaymentApi({
        bookingId: booking.bookingId,
        amount: 1,
        currency: "INR",
      });

      /* 2️⃣ Razorpay Options */
      const options = {
  key: "rzp_test_S8DvyUkuEaM7pd",
  amount: order.amount, // already in paise
  currency: "INR",
  name: "Movie Ticket Booking",
  description: "Seat Booking Payment",
  order_id: order.orderId,

  /* ✅ ENABLE PAYMENT METHODS */
  method: {
    upi: true,
    card: true,
    netbanking: true,
    wallet: true,
  },

  /* ✅ FORCE UPI APPS TO SHOW */
  config: {
    display: {
      blocks: {
        upi: {
          name: "Pay using UPI",
          instruments: [
            { method: "upi" }
          ],
        },
      },
      sequence: ["block.upi"],
      preferences: {
        show_default_blocks: true,
      },
    },
  },

  prefill: {
    name: "Test User",
    email: "test@example.com",
    contact: "9999999999",
  },

  handler: async (response) => {
    await verifyPaymentApi({
      razorpayOrderId: response.razorpay_order_id,
      razorpayPaymentId: response.razorpay_payment_id,
      razorpaySignature: response.razorpay_signature,
    });

    navigate(`/ticket/${booking.bookingId}`);
  },

  theme: {
    color: "#f84464",
  },
};


      /* 3️⃣ OPEN RAZORPAY UI */
      new window.Razorpay(options).open();
    } catch (err) {
      console.error(err);
      toast.error("Payment initialization failed");
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Payment</h2>

      <p>
        Amount to Pay: <strong>₹{totalAmount}</strong>
      </p>

      <button
        onClick={handlePayment}
        style={{
          padding: "12px 24px",
          background: "#f84464",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Pay Now
      </button>
    </div>
  );
};

export default Payment;
