import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../components/Login/login";
import Home from "../components/Home/Home";
import Card from "../components/Card/Card";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/home" element={<Home />} />
    <Route path="/card" element={<Card />} />
  </Routes>
);

export default AppRoutes;


