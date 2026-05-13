import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!phone || !password) {
      alert("Enter all fields");
      return;
    }

    localStorage.setItem("user", phone);
    navigate("/");
  };

  return (
    <div className="card" style={{ width: "350px" }}>
      <h2>Login</h2>

      <input placeholder="Mobile Number" onChange={(e)=>setPhone(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />

      <button className="btn" onClick={handleLogin}>
        Login →
      </button>

      <p onClick={()=>navigate("/register")} style={{ cursor:"pointer" }}>
        Create Account
      </p>
    </div>
  );
}

export default Login;