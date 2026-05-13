import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <h2>ConnectIN</h2>

      <div>
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/recharge")}>Recharge</button>
        <button onClick={() => navigate("/transactions")}>History</button>
      </div>

      <button onClick={() => {
        localStorage.removeItem("user");
        navigate("/login");
      }}>
        Logout
      </button>
    </div>
  );
}

export default Navbar;