import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import "./styles/main.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Recharge from "./pages/Recharge";
import Payment from "./pages/Payment";
import Success from "./pages/Success";
import Transactions from "./pages/Transactions";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recharge" element={<Recharge />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/success" element={<Success />} />
        <Route path="/transactions" element={<Transactions />} />

      </Routes>
    </BrowserRouter>
  );
  
}

export default App;