import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../../app/axiosInstance";

const ManagerScreens = () => {
  const [screens, setScreens] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const theatreId = localStorage.getItem("theatreId");

  useEffect(() => {
    loadScreens();
  }, []);

  const loadScreens = async () => {
    try {
      
      const res = await axiosInstance.get(`/screens/by-theatre/${theatreId}`);
      setScreens(res.data || []);
    } catch {
      toast.error("Failed to load screens");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p style={{ padding: 20 }}>Loading screens...</p>;
  }

  return (
    <div style={{ padding: 30 }}>
      <h2 style={{ marginBottom: 20 }}>My Screens</h2>

      {screens.length === 0 ? (
        <div
          style={{
            background: "#fff3f3",
            padding: 20,
            borderRadius: 10,
            textAlign: "center",
          }}
        >
          <h3>No Screen Available</h3>
          <p>Please create a screen first to design seat layout.</p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: 20,
          }}
        >
          {screens.map((screen) => (
            <div
              key={screen.screenId}
              onClick={() =>
                navigate(
                  `/manager/screen-layout-design/${screen.screenId}`
                )
              }
              style={{
                cursor: "pointer",
                background: "#ffffff",
                padding: 20,
                borderRadius: 12,
                boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
                transition: "transform 0.2s",
              }}
            >
              <h3>{screen.screenName}</h3>
              <p>Total Seats: {screen.totalSeats}</p>
              <button
                style={{
                  marginTop: 10,
                  background: "#f84464",
                  color: "#fff",
                  border: "none",
                  padding: "8px 14px",
                  borderRadius: 6,
                }}
              >
                Design Layout →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManagerScreens;
