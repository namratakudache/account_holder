
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../components/Login/login";
import Home from "../components/Home/Home";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/home" element={<Home />} />
  </Routes>
);

export default AppRoutes;
