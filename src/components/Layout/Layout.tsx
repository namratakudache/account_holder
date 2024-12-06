// components/Layout/Layout.tsx
import React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../SideBar/Sidebar";
import AccountInfo from "../AccountInfo/AccountInfo";
import { Outlet } from "react-router-dom"; // This will render child routes dynamically

const Layout: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <Sidebar />
        <div className="main-content">
          <AccountInfo />
          <Outlet /> {/* This will render the content of the active route */}
        </div>
      </div>
    </>
  );
};

export default Layout;
