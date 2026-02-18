import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./components/dashboard";
import Login from "./components/login";
import Register from "./components/register";
import Referrals from "./components/Referrals";
import Spin from "./components/Spin";
import Blogs from "./components/Blogs";
import Videos from "./components/videos";
import Withdraw from "./components/Withdraw";
import Auth from './components/Auth';
import Profile from './components/profile';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/referrals" element={<Referrals />} />
        <Route path="/spin" element={<Spin />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/Withdraw" element={<Withdraw />} />
      </Routes>
    </Router>
  );
}

export default App;
