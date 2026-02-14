import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState({
    userId: "",
    userName: "",
    email: "",
    phone: "",
    role: "",
  });

  useEffect(() => {
    // Fetch user data from localStorage (set during login)
    const storedUser = {
      userId: localStorage.getItem("userId"),
      userName: localStorage.getItem("userName"),
      email: localStorage.getItem("email"),
      phone: localStorage.getItem("phone"),
      role: localStorage.getItem("role"),
    };

    setUser(storedUser);
  }, []);

  return (
    <div className="page">
      <h2 style={{ marginBottom: "20px" }}>My Profile</h2>

      <div
        className="card"
        style={{ maxWidth: "500px", margin: "0 auto" }}
      >
        <div style={{ marginBottom: "15px" }}>
          <strong>User ID:</strong>
          <p>{user.userId}</p>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <strong>Name:</strong>
          <p>{user.userName}</p>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <strong>Email:</strong>
          <p>{user.email}</p>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <strong>Phone:</strong>
          <p>{user.phone}</p>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <strong>Role:</strong>
          <p>{user.role}</p>
        </div>

        <div style={{ marginTop: "20px", color: "#666" }}>
          <p>
            Profile editing will be available in future updates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
