import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/Login/login";
import Home from "../components/Home/Home";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Always show Login component at the root path */}
      <Route path="/" element={<Login />} />

      {/* Show Home only if logged in */}
      <Route
        path="/home"
        element={sessionStorage.getItem("authToken") ? <Home /> : <Navigate to="/" replace />}
      />
    </Routes>
  );
};

export default AppRoutes;
