import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api";

function Transactions() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const phone = localStorage.getItem("user");

    API.get(`/recharge/history/${phone}`)
      .then(res => {
        console.log("History:", res.data);
        setData(res.data);
      })
      .catch(err => {
        console.error(err);
        alert("Failed to fetch transactions ❌");
      });
  }, []);

  return (
    <div>
      <Navbar />

      <div className="card">
        <h2>Transaction History</h2>

        {data.length === 0 ? (
          <p>No transactions found</p>
        ) : (
          data.map(item => (
            <div key={item.txnId} className="plan-card">
              <h3>₹{item.amount}</h3>
              <p>{item.phone}</p>
              <p>{item.operator}</p>
              <p>{item.status}</p>
              <p>{item.createdAt}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Transactions;