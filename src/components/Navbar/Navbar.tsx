// src/components/Navbar.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {/* Dropdown Menu on the Right */}
        <li className="navbar-item dropdown-container">
          <div
            className="navbar-link"
            onClick={toggleDropdown}
            role="button"
            aria-haspopup="true"
            aria-expanded={dropdownOpen ? "true" : "false"}
          >
<i className="fa-solid fa-caret-down" style={{ color: "#ffffff" }}></i>
</div>
          {dropdownOpen && (
            <ul className="dropdown">
              <li>
                <Link to="/service1" className="dropdown-item">
                  348158 - City Union Bank Credit Card
                </Link>
              </li>
              <li>
                <Link to="/service2" className="dropdown-item">
                  348158 - Test System
                </Link>
              </li>
              <li>
                <Link to="/service3" className="dropdown-item">
                  348158 - CUB Rupay Wearables
                </Link>
              </li>
              <li>
                <Link to="/service3" className="dropdown-item">
                  348158 - Rupay NCMC
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
