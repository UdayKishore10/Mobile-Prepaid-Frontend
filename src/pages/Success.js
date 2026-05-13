import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Success() {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="card" style={{ textAlign: "center" }}>
      <h1>✅ Recharge Successful</h1>

      <p><b>Mobile:</b> {state?.phone}</p>
      <p><b>Operator:</b> {state?.operator}</p>
      <p><b>Amount:</b> ₹{state?.amount}</p>
      <p><b>Status:</b> {state?.status}</p>
      <p><b>Transaction ID:</b> {state?.txnId}</p>

      <button className="btn" onClick={() => navigate("/")}>
        Go Home
      </button>
    </div>
  );
}

export default Success;