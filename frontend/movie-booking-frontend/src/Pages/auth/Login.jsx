import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginApi } from "../../features/auth/authApi";
import { loginSuccess } from "../../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // if(localStorage.getItem("token")){
  //   if(localStorage.getItem("role")==="Admin"){
  //     navigate("/admin");
  //   }else if(localStorage.getItem("role")==="TheatreManager"){
  //     navigate("/manager");
  //   } else{
  //     navigate("/");
  //   }
  // }

  const handleLogin = async () => {
    if (!email.includes("@")) {
      toast.error("Enter valid email");
      return;
    }
    if (password.length < 6) {
      toast.error("Invalid password");
      return;
    }

    try {
      const data = await loginApi({ email, password });

      dispatch(
        loginSuccess({
          token: data.token,
          userId: data.userId,
          role: data.role,
        })
      );
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("role", data.role);

      console.log(data.role);
      if (data.role === "Admin") navigate("/admin");
      else if (data.role === "TheatreManager") navigate("/manager");
      else navigate("/");
    } catch {
      // handled globally
    }
  };

  return (
    <div style={cardStyle}>
      <h2>Sign in</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={inputStyle}
        required
        pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={inputStyle}
        required
        minLength={6}
      />

      <button onClick={handleLogin} style={buttonStyle}>
        Login
      </button>

      <p onClick={() => navigate("/register")} style={linkStyle}>
        New user? Register
      </p>
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

const linkStyle = {
  color: "#f84464",
  cursor: "pointer",
  textAlign: "center",
};

export default Login;
