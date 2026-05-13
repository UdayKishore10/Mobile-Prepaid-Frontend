import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const plansData = {
  JIO: [
    { price: 149, data: "1GB/day", validity: "20 days" },
    { price: 199, data: "1.5GB/day", validity: "28 days" },
    { price: 299, data: "2GB/day", validity: "28 days" }
  ],
  AIRTEL: [
    { price: 179, data: "1GB/day", validity: "24 days" },
    { price: 265, data: "1.5GB/day", validity: "28 days" },
    { price: 359, data: "2GB/day", validity: "28 days" }
  ],
  VI: [
    { price: 199, data: "1GB/day", validity: "24 days" },
    { price: 249, data: "1.5GB/day", validity: "28 days" }
  ],
  BSNL: [
    { price: 107, data: "3GB total", validity: "35 days" },
    { price: 187, data: "2GB/day", validity: "28 days" }
  ]
};

function Recharge() {
  const [mobile, setMobile] = useState("");
  const [operator, setOperator] = useState("JIO");
  const [selectedPlan, setSelectedPlan] = useState(null);

  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px", background: "#f5f7fb", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>

        {/* LEFT SIDE */}
        <div style={{
          flex: 2,
          background: "#fff",
          padding: "25px",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
        }}>
          <h2>Mobile Recharge</h2>

          {/* MOBILE INPUT */}
          <input
            value={mobile}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              if (value.length <= 10) {
                setMobile(value);
              }
            }}
            placeholder="Enter 10-digit Mobile Number"
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "10px",
              borderRadius: "10px",
              border: "1px solid #ddd"
            }}
          />

          {/* ERROR MESSAGE */}
          {mobile.length > 0 && mobile.length < 10 && (
            <p style={{ color: "red", fontSize: "12px" }}>
              Enter exactly 10 digits
            </p>
          )}

          {/* OPERATORS */}
          <h3 style={{ marginTop: "20px" }}>Select Operator</h3>

          <div style={{ display: "flex", gap: "10px" }}>
            {["JIO", "AIRTEL", "VI", "BSNL"].map(op => (
              <button
                key={op}
                onClick={() => {
                  setOperator(op);
                  setSelectedPlan(null);
                }}
                style={{
                  padding: "12px 20px",
                  borderRadius: "10px",
                  border: "none",
                  background: operator === op ? "#1f6f43" : "#eee",
                  color: operator === op ? "white" : "black",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                {op}
              </button>
            ))}
          </div>

          {/* PLANS */}
          <h3 style={{ marginTop: "20px" }}>Select Plan</h3>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {plansData[operator].map((plan, index) => (
              <div
                key={index}
                onClick={() => setSelectedPlan(plan)}
                style={{
                  padding: "15px",
                  width: "130px",
                  borderRadius: "12px",
                  background: "#fafafa",
                  border: selectedPlan === plan ? "2px solid #1f6f43" : "1px solid #ddd",
                  cursor: "pointer",
                  textAlign: "center",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
                }}
              >
                <h3>₹{plan.price}</h3>
                <p>{plan.data}</p>
                <p>{plan.validity}</p>
              </div>
            ))}
          </div>

          {/* BUTTON */}
          <button
            disabled={mobile.length !== 10 || !selectedPlan}
            style={{
              marginTop: "20px",
              padding: "14px",
              background:
                mobile.length === 10 && selectedPlan ? "#1f6f43" : "#ccc",
              color: "white",
              border: "none",
              width: "100%",
              borderRadius: "10px",
              fontSize: "16px",
              cursor:
                mobile.length === 10 && selectedPlan ? "pointer" : "not-allowed"
            }}
            onClick={() => {

              // 🔴 FINAL VALIDATION
              if (mobile.length !== 10) {
                alert("Enter valid 10-digit mobile number ❌");
                return;
              }

              if (!selectedPlan) {
                alert("Select a plan ❌");
                return;
              }

              const data = { mobile, operator, plan: selectedPlan };

              localStorage.setItem("currentRecharge", JSON.stringify(data));

              navigate("/payment", { state: data });
            }}
          >
            Review & Pay →
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div style={{
          flex: 1,
          background: "#fff",
          padding: "25px",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          height: "fit-content"
        }}>
          <h3>Order Summary</h3>

          {selectedPlan ? (
            <>
              <p><b>Mobile:</b> {mobile}</p>
              <p><b>Operator:</b> {operator}</p>
              <p><b>Plan:</b> {selectedPlan.data}</p>
              <p><b>Validity:</b> {selectedPlan.validity}</p>

              <hr />

              <h3 style={{ color: "#1f6f43" }}>
                Total: ₹{selectedPlan.price}
              </h3>
            </>
          ) : (
            <p>Select plan</p>
          )}
        </div>

      </div>
    </div>
  );
}

export default Recharge;