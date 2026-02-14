import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f2f2f2",
        padding: "20px",
      }}
    >
      <div
        className="card"
        style={{
          maxWidth: "420px",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#f84464" }}>404</h1>

        <p
          style={{
            marginTop: "10px",
            color: "#666",
          }}
        >
          The page you are looking for does not exist.
        </p>

        <div style={{ marginTop: "20px" }}>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/")}
          >
            Go to Home
          </button>

          <button
            className="btn btn-outline"
            style={{ marginLeft: "10px" }}
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
