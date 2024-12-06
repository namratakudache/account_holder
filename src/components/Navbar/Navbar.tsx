import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./navbar.css";

const Navbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false); // Track if navbar is open on mobile

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  const fetchDropdownOptions = useCallback(async () => {
    const authToken = sessionStorage.getItem("authToken");

    if (!authToken) {
      setError("User is not authenticated.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        "https://sandbox-apiconnect.42cards.in/pismo-api/programs/v1/programs",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const optionsData = response.data?.items;
      if (Array.isArray(optionsData)) {
        setOptions(optionsData.map((option: { name: string }) => option.name));
      } else {
        setError("Invalid response structure.");
      }
    } catch (err) {
      setError("Failed to fetch options. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDropdownOptions();
  }, [fetchDropdownOptions]);

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Element | null;
    if (dropdownOpen && target && !target.closest(".dropdown-container")) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [dropdownOpen]);

  return (
    <nav className={`navbar ${isOpen ? "open" : ""}`}>
      <div className="hamburger-menu" onClick={() => setIsOpen((prev) => !prev)}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <ul className="navbar-list">
        <li className="navbar-item dropdown-container">
          <div
            className="navbar-link"
            onClick={toggleDropdown}
            role="button"
            aria-haspopup="true"
            aria-expanded={dropdownOpen ? "true" : "false"}
          >
            {selectedOption || ""}{" "}
            <i className="fa-solid fa-caret-down" style={{ color: "#ffffff" }}></i>
          </div>
          {dropdownOpen && (
            <ul className="dropdown">
              {loading && <li className="dropdown-item">Loading...</li>}
              {error && (
                <li className="dropdown-item" style={{ color: "red" }}>
                  {error}
                </li>
              )}
              {!loading && !error && options.length === 0 && (
                <li className="dropdown-item">No options available</li>
              )}
              {!loading &&
                !error &&
                options.map((option, index) => (
                  <li key={index}>
                    <span onClick={() => handleOptionClick(option)} className="dropdown-item">
                      {option}
                    </span>
                  </li>
                ))}
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
