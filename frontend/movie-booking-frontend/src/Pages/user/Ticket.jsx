import { useNavigate, useParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react"; // Import for QR generation

const Ticket = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  // Custom styles for a modern "Ticket" feel
  const styles = {
    container: {
      padding: "40px 20px",
      minHeight: "100vh",
      backgroundColor: "#f4f7f6",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    ticketCard: {
      backgroundColor: "#fff",
      borderRadius: "16px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      padding: "30px",
      width: "100%",
      maxWidth: "350px",
      position: "relative",
      borderTop: "8px solid #e11d48" // Accent color
    },
    qrContainer: {
      padding: "16px",
      backgroundColor: "#fff",
      borderRadius: "12px",
      boxShadow: "inset 0 0 10px rgba(0,0,0,0.05)",
      margin: "20px auto",
      width: "fit-content"
    },
    button: {
      marginTop: "25px",
      padding: "12px 24px",
      backgroundColor: "#1e293b",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
      transition: "background 0.2s"
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.ticketCard}>
        <h2 style={{ color: "#1e293b", marginBottom: "8px" }}>🎬 Your Ticket</h2>
        <p style={{ color: "#64748b", fontSize: "14px" }}>Show this at the entrance</p>

        {/* QR Code Implementation */}
        <div style={styles.qrContainer}>
          <QRCodeSVG 
            value={bookingId || "no-id"} // Core logic: uses bookingId
            size={180}
            level="H" // High error correction
            includeMargin={true}
          />
        </div>

        <div style={{ borderTop: "2px dashed #e2e8f0", margin: "20px 0" }} />

        <p style={{ fontWeight: "700", color: "#334155", margin: "5px 0" }}>
          Booking ID: <span style={{ color: "#e11d48" }}>{bookingId}</span>
        </p>
        <p style={{ fontSize: "15px", color: "#64748b" }}>Enjoy your show!</p>
      </div>

      <button 
        style={styles.button}
        onClick={() => navigate("/")}
        onMouseOver={(e) => e.target.style.backgroundColor = "#334155"}
        onMouseOut={(e) => e.target.style.backgroundColor = "#1e293b"}
      >
        Back to Home
      </button>
    </div>
  );
};

export default Ticket;
