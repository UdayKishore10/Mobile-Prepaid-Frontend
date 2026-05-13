import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api";
import axios from "axios";
function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [upi, setUpi] = useState("");
  const [method, setMethod] = useState("");

  // 🔐 UPI VALIDATION
  const isValidUPI = (upi) => {
    return /^[\w.-]+@[a-zA-Z]+$/.test(upi);
  };

  const handlePay = async () => {
    // UPI ID validation
    if (method === "UPI") {
      if (!upi) {
        alert("Enter UPI ID ❌");
        return;
      }

      if (!isValidUPI(upi)) {
        alert("Invalid UPI ID format ❌ (example: name@ybl)");
        return;
      }
    }

    // SIMULATE APP REDIRECT
    if (method === "PHONEPE") {
      alert("Redirecting to PhonePe...");
    } else if (method === "GPAY") {
      alert("Redirecting to Google Pay...");
    } else if (method === "PAYTM") {
      alert("Redirecting to Paytm...");
    }

    try {
     const res = await API.post("/recharge", {
  phone: state.mobile,
  operator: state.operator,
  amount: state.plan.price,
  planName: state.plan.data,
  planValidity: state.plan.validity,
  userId: 1,

  // ✅ IMPORTANT FIX
  paymentMethod: method || "UPI"
});

      navigate("/success", { state: res.data });

    } catch {
      alert("Payment failed ❌");
    }
  };

  return (
    <div style={{
      background: "#f5f7fb",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>

      <div style={{
        width: "420px",
        background: "white",
        padding: "25px",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
      }}>

        <h2>Complete Payment</h2>

        <p><b>Mobile:</b> {state?.mobile}</p>
        <p><b>Operator:</b> {state?.operator}</p>
        <p><b>Amount:</b> ₹{state?.plan?.price}</p>

        <hr />

        <h3>Select Payment Method</h3>

        {/* PAYMENT OPTIONS */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>

          <button style={methodBtn(method === "PHONEPE")}
            onClick={() => setMethod("PHONEPE")}>
            PhonePe
          </button>

          <button style={methodBtn(method === "GPAY")}
            onClick={() => setMethod("GPAY")}>
            GPay
          </button>

          <button style={methodBtn(method === "PAYTM")}
            onClick={() => setMethod("PAYTM")}>
            Paytm
          </button>

          <button style={methodBtn(method === "UPI")}
            onClick={() => setMethod("UPI")}>
            Enter UPI ID
          </button>

        </div>

        {/* UPI INPUT */}
        {method === "UPI" && (
          <>
            <input
              placeholder="example@upi / name@ybl / name@sbi"
              value={upi}
              onChange={(e) => setUpi(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #ddd",
                marginTop: "15px"
              }}
            />

            {/* ERROR MESSAGE */}
            {upi && !isValidUPI(upi) && (
              <p style={{ color: "red", fontSize: "12px" }}>
                Invalid UPI format (example: name@ybl)
              </p>
            )}
          </>
        )}

        {/* PAY BUTTON */}
        <button
          onClick={handlePay}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "14px",
            background: "#1f6f43",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            cursor: "pointer"
          }}
        >
          Pay ₹{state?.plan?.price} →
        </button>

      </div>
    </div>
  );
}

// BUTTON STYLE
const methodBtn = (active) => ({
  padding: "10px 15px",
  borderRadius: "10px",
  border: active ? "2px solid #1f6f43" : "1px solid #ddd",
  background: active ? "#e6ffe6" : "#fafafa",
  cursor: "pointer"
});

export default Payment;