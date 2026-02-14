import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerApi } from "../../features/auth/authApi";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userName: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleSubmit = async () => {
    const { userName, email, phone, password } = form;

    // 1️⃣ Empty field validation
    if (!userName || !email || !phone || !password) {
      toast.error("All fields are required");
      return;
    }

    // 2️⃣ Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email address");
      return;
    }

    // 3️⃣ Phone number validation (10 digits only)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      toast.error("Phone number must be 10 digits");
      return;
    }

    // 4️⃣ Password length validation
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      await registerApi(form);
      toast.success("Registration successful");
      navigate("/login");
    } catch {
      toast.error("Registration failed");
    }
  };

  return (
    <div style={cardStyle}>
      <h2>Sign up</h2>

      {["userName", "email", "phone", "password"].map((field) => (
        <input
          key={field}
          placeholder={field}
          type={field === "password" ? "password" : "text"}
          value={form[field]}
          onChange={(e) =>
            setForm({ ...form, [field]: e.target.value })
          }
          style={inputStyle}
        />
      ))}

      <button onClick={handleSubmit} style={buttonStyle}>
        Register
      </button>
    </div>
  );
};

const cardStyle = {
  background: "#fff",
  padding: "30px",
  width: "350px",
  borderRadius: "8px",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  background: "#f84464",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
};

export default Register;
