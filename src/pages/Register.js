import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Register() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!phone || !password) {
      alert("Fill all fields");
      return;
    }

    try {
      const res = await API.post("/api/auth/register", {  // ✅ FIX HERE
        phone,
        password,
      });

      alert(res.data);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Registration Failed ❌");
    }
  };

  return (
    <div className="card" style={{ width: "350px" }}>
      <h2>Create Account</h2>

      <input
        placeholder="Mobile"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn" onClick={handleRegister}>
        Register →
      </button>
    </div>
  );
}

export default Register;