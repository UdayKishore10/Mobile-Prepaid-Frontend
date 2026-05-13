import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Home() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [isLogin, setIsLogin] = useState(true);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // 🔐 PASSWORD VALIDATION
  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;
    return regex.test(password);
  };

  // 🟢 REGISTER
  const handleRegister = async () => {
    if (!phone || !password) {
      alert("Fill all fields");
      return;
    }

    if (!validatePassword(password)) {
      alert(
        "Password must have:\n- 1 uppercase\n- 1 lowercase\n- 1 number\n- 1 special character\n- Minimum 6 characters"
      );
      return;
    }

    try {
      const res = await API.post("/auth/register", {
        phone,
        password,
      });

      alert(res.data);
      setIsLogin(true);
    } catch (err) {
      console.error(err);
      alert("Registration Failed ❌");
    }
  };

  // 🔵 LOGIN
  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        phone,
        password,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", phone);
        alert("Login Success ✅");

        navigate("/"); // 👈 IMPORTANT FIX
      } else {
        alert(res.data.message);
      }
    } catch {
      alert("Login failed ❌");
    }
  };

  // ✅ DASHBOARD (AFTER LOGIN)
  if (token) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f5f7fb",
        }}
      >
        <div
          style={{
            width: "400px",
            background: "white",
            padding: "30px",
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
        >
          <h2>Welcome User 🎉</h2>
          <p>You are logged in successfully ✅</p>

          <button
            onClick={() => navigate("/recharge")}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "20px",
              background: "#1f6f43",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Go to Recharge →
          </button>

          <button
            onClick={() => navigate("/transactions")}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "10px",
              background: "#444",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            View Transactions →
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "10px",
              background: "red",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Logout ❌
          </button>
        </div>
      </div>
    );
  }

  // 🔐 LOGIN / REGISTER UI
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f7fb",
      }}
    >
      <div
        style={{
          width: "350px",
          background: "white",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center" }}>
          {isLogin ? "Login" : "Register"}
        </h2>

        <input
          placeholder="Mobile Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "15px",
            borderRadius: "10px",
            border: "1px solid #ddd",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "10px",
            borderRadius: "10px",
            border: "1px solid #ddd",
          }}
        />

        {!isLogin && (
          <p style={{ fontSize: "12px", marginTop: "10px", color: "gray" }}>
            Password must include uppercase, lowercase, number & special character
          </p>
        )}

        <button
          onClick={isLogin ? handleLogin : handleRegister}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "20px",
            background: "#1f6f43",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          {isLogin ? "Login →" : "Register →"}
        </button>

        <p
          style={{
            marginTop: "15px",
            textAlign: "center",
            cursor: "pointer",
            color: "#1f6f43",
          }}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "New user? Register"
            : "Already have account? Login"}
        </p>
      </div>
    </div>
  );
}

export default Home;