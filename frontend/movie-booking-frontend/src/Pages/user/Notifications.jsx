const Notifications = () => {
  return (
    <div className="page">
      <h2 style={{ marginBottom: "20px" }}>Notifications</h2>

      <div
        className="card"
        style={{
          textAlign: "center",
          padding: "40px",
        }}
      >
        <p style={{ fontSize: "16px", color: "#666" }}>
          🔔 You don’t have any notifications yet.
        </p>

        <p
          style={{
            marginTop: "10px",
            fontSize: "14px",
            color: "#999",
          }}
        >
          Booking updates and alerts will appear here.
        </p>
      </div>
    </div>
  );
};

export default Notifications;
