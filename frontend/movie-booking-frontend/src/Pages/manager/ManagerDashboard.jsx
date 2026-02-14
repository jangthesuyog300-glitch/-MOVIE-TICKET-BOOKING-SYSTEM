import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance  from "../../app/axiosInstance";

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    try{
       axiosInstance.get(`/theatre/Manager/${userId}`).then((res) => {
      localStorage.setItem("theatreId", res.data.theatreId);
    });
  }catch(err){
    console.error(err); 
  }
  }, []);

  const actions = [
    {
      title: "Create Screen",
      desc: "Add a new screen to your theatre",
      path: "/manager/create-screen",
      icon: "🎬",
    },
    {
      title: "Create Show",
      desc: "Schedule a new movie show",
      path: "/manager/create-show",
      icon: "📅",
    },
    {
      title: "All Screens",
      desc: "View and manage screens",
      path: "/manager/screens",
      icon: "🏟️",
    },
    {
      title: "Upcoming Shows",
      desc: "Check upcoming scheduled shows",
      path: "/manager/upcoming-shows",
      icon: "⏳",
    },
    {
      title: "Past Shows",
      desc: "View completed shows history",
      path: "/manager/past-shows",
      icon: "📜",
    },
  ];

  return (
    <div style={page}>
      <h2 style={heading}>🎭 Theatre Manager Dashboard</h2>

      <div style={grid}>
        {actions.map((a) => (
          <div
            key={a.title}
            style={card}
            onClick={() => navigate(a.path)}
          >
            <div style={icon}>{a.icon}</div>
            <h3 style={cardTitle}>{a.title}</h3>
            <p style={desc}>{a.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagerDashboard;

/* ======================= STYLES ======================= */

const page = {
  minHeight: "90vh",
  padding: "40px 20px",
  background: "#f5f5f5",
};

const heading = {
  textAlign: "center",
  marginBottom: "40px",
  fontSize: "28px",
  fontWeight: "700",
  color: "#222",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "24px",
  maxWidth: "1000px",
  margin: "0 auto",
};

const card = {
  background: "#fff",
  borderRadius: "16px",
  padding: "30px 20px",
  cursor: "pointer",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  textAlign: "center",
  transition: "all 0.3s ease",
};

const icon = {
  fontSize: "40px",
  marginBottom: "12px",
};

const cardTitle = {
  fontSize: "18px",
  fontWeight: "700",
  marginBottom: "8px",
  color: "#333",
};

const desc = {
  fontSize: "14px",
  color: "#666",
};
