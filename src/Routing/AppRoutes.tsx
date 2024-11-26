// src/Routing/AppRoutes.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import AccountINR from "../components/Statements/AccountINR";
import Login from "../components/Login/login";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Defining your routes for each service */}
      <Route path="/" element={<Login />} /> {/* Default Route */}
      {/* <Route path="/home" element={<Home />} />
      <Route path="/statement" element={<Statement />} />
      <Route path="/limits" element={<Limits />} />
      <Route path="/cards" element={<Cards />} /> */}
    </Routes>
  );
};

export default AppRoutes;
