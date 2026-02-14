import { useSearchParams, useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const status = params.get("status");
  const message = params.get("message");

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "8px",
          textAlign: "center",
          maxWidth: "400px",
        }}
      >
        <h1 style={{ color: "#f84464" }}>⚠ Error</h1>

        <h3>{status}</h3>
        <p style={{ color: "#666" }}>{message}</p>

        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            background: "#f84464",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
          }}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
