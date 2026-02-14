import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div
          className="admin-card"
          onClick={() =>
            navigate("/admin/theatre-manager-requests")
          }
          style={cardStyle}
        >
          Theatre Manager Requests
        </div>

        <div
          className="admin-card"
          onClick={() => navigate("/admin/create-movie")}
          style={cardStyle}
        >
          Create Movie
        </div>
      </div>
    </div>
  );
};

const cardStyle = {
  background: "#fff",
  padding: "30px",
  borderRadius: "8px",
  cursor: "pointer",
  textAlign: "center",
  fontWeight: "bold",
};

export default AdminDashboard;
