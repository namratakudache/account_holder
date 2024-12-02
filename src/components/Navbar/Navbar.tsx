import React, { useState, useEffect } from "react";
import axios from "axios";
import "./navbar.css";

const Navbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]); // To store dropdown options
  const [loading, setLoading] = useState<boolean>(false); // For loading state
  const [error, setError] = useState<string>(""); // For error state

  // Toggle the dropdown visibility
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  // Handle dropdown option click
  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setDropdownOpen(false); // Close the dropdown after selecting an option
  };

  // Fetch data for dropdown options when component mounts
  useEffect(() => {
    const fetchDropdownOptions = async () => {
      // Step 1: Check if the user is authenticated by checking the auth token
      const authToken = sessionStorage.getItem("authToken");

      if (!authToken) {
        setError("User is not authenticated.");
        return; // Do not proceed with the API call if no token
      }

      // Step 2: Proceed with fetching the data only if authenticated
      setLoading(true); // Set loading to true when starting the fetch
      setError(""); // Reset any previous error

      try {
        const response = await axios.get(
          "https://sandbox-apiconnect.42cards.in/pismo-api/programs/v1/programs",
          {
            headers: {
              Authorization: `Bearer ${authToken}`, // Attach token to Authorization header
            },
          }
        );

        // Step 3: Process the response and set the dropdown options
        const optionsData = response.data?.items; // Adjust based on your response structure
        if (Array.isArray(optionsData)) {
          // Extract the `name` from each item and set it in the options array
          setOptions(optionsData.map((option) => option.name));
        } else {
          setError("Invalid response structure.");
        }
      } catch (err) {
        setError("Failed to fetch options. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDropdownOptions();
  }, []); // Empty dependency array, runs only once when the component mounts

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {/* Display Selected Option in Navbar */}
        <li className="navbar-item dropdown-container">
          <div
            className="navbar-link"
            onClick={toggleDropdown}
            role="button"
            aria-haspopup="true"
            aria-expanded={dropdownOpen ? "true" : "false"}
          >
            {selectedOption || ""}{" "}
            <i
              className="fa-solid fa-caret-down"
              style={{ color: "#ffffff" }}
            ></i>
          </div>
          {dropdownOpen && (
            <ul className="dropdown">
              {/* Show Loading Indicator */}
              {loading && <li className="dropdown-item">Loading...</li>}

              {/* Show Error Message */}
              {error && (
                <li className="dropdown-item" style={{ color: "red" }}>
                  {error}
                </li>
              )}

              {/* Map through options and display them */}
              {!loading && !error && options.length === 0 && (
                <li className="dropdown-item">No options available</li>
              )}
              {!loading &&
                !error &&
                options.map((option, index) => (
                  <li key={index}>
                    <span
                      onClick={() => handleOptionClick(option)}
                      className="dropdown-item"
                    >
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
