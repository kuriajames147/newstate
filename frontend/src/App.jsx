import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./components/dashboard";
import Login from "./components/login";
import Register from "./components/register";
import Referrals from "./components/Referrals";
import Spin from "./components/Spin";
import Blogs from "./components/Blogs";
import Videos from "./components/videos";
import Mpesa from "./components/Mpesa";
import Auth from './components/Auth';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
