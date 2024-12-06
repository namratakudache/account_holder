import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaFileAlt, FaChartLine, FaCreditCard } from "react-icons/fa";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Make sure FontAwesome is loaded

import "./sidebar.css";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : "sidebar-collapased"}`}>
        <ul className="sidebar-list">
          {/* CustomerApp Label */}
          {isOpen ? (
            <li className="sidebar-item customer-app-label">
              {/* <i className="fa-sharp fa-solid fa-chart-simple"></i> */}

              <span className="menu-header-label-cust">CustomerApp</span>
            </li>
          ) : null}

          {/* Sidebar Links */}
          <li className={`sidebar-item ${!isOpen ? "hidden" : ""}`}>
            <Link to="/home" className="sidebar-link">
              <FaHome className="icon" />
              {isOpen && "Home"}
            </Link>
          </li>
          <li className={`sidebar-item ${!isOpen ? "hidden" : ""}`}>
            <Link to="/statement" className="sidebar-link">
              <FaFileAlt className="icon" />
              {isOpen && "Statement"}
            </Link>
          </li>
          <li className={`sidebar-item ${!isOpen ? "hidden" : ""}`}>
            <Link to="/limits" className="sidebar-link">
              <FaChartLine className="icon" />
              {isOpen && "Limits"}
            </Link>
          </li>
          <li className={`sidebar-item ${!isOpen ? "hidden" : ""}`}>
  <Link to="/card" className="sidebar-link"> {/* Link to /card */}
    <FaCreditCard className="icon" />
    {isOpen && "Card"}
  </Link>
</li>


          {/* Sidebar Toggle Button */}
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            <i
              className={`fa-solid fa-arrow-right icon-chevron ${
                isOpen ? "flipped" : ""
              }`}
            ></i>
          </button>
        </ul>
        <p className="version">v4.1.1</p>
      </div>
    </>
  );
};

export default Sidebar;
