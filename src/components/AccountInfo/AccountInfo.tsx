import React, { useState, useEffect } from "react";

import axios from "axios";
import "./accountInfo.css";
import { MdRefresh } from "react-icons/md";

interface TimelineItem {
  type: string;
  category: string;
  timestamp: string; // Assuming it's an ISO string or timestamp
}
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short", // Use short month format (e.g., Nov)
    day: "numeric", // Show only day number
  });
};

// Define types for the data
interface AccountInfoResponse {
  name: string;
  available_limit: number;
  items: Array<any>; // For event timeline data
}

const AccountInfo: React.FC = () => {
  const [accountInfo, setAccountInfo] = useState<AccountInfoResponse | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the data from the API
  useEffect(() => {
    const fetchAccountInfo = async () => {
      setLoading(true); // Set loading to true before fetching data

      try {
        const token = sessionStorage.getItem("authToken");
        if (!token) {
          setError("No authentication token found.");
          setLoading(false);
          return;
        }

        // Fetch Account Info for name and available credit
        const accountResponse = await axios.get(
          "https://sandbox-apiconnect.42cards.in/pismo-api/accounts/v1/accounts/103052861?cb=1732106905298",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Fetch Event Timeline Data
        const timelineResponse = await axios.get(
          "https://sandbox-apiconnect.42cards.in/pismo-api/events/v1/timeline?page=1&perPage=20",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Assuming account response contains name and available credit,
        // and event timeline response contains the items data
        setAccountInfo({
          name: accountResponse.data.name,
          available_limit: accountResponse.data.available_limit,
          items: timelineResponse.data.items || [], // event timeline data
        });
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
        setLoading(false);
      }
    };

    fetchAccountInfo();
  }, []);

  // Render loading state or error message
  if (loading) {
    return <div className="loading-message">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const getInitials = (name: string) => {
    const nameParts = name.split(" "); // Split the name into words
    const firstLetter = nameParts[0]?.charAt(0).toUpperCase(); // Get the first letter of the first name
    const lastLetter = nameParts[nameParts.length - 1]?.charAt(0).toUpperCase(); // Get the first letter of the last name
    return firstLetter + lastLetter; // Combine the initials
  };

  return (
    <div className="account-info">
      {/* Display Name in first section */}
      {accountInfo && (
        <div className="account-info-section section-1">
          <h3 className="getInitial">{getInitials(accountInfo.name)}</h3>
          <h3>{accountInfo.name}</h3>
        </div>
      )}

      {/* Display Available Credit in second section */}
      {accountInfo && (
        <div className="account-info-section section-2">
          <p>Available Credit: </p>
          <h2 className="limit">INR {accountInfo.available_limit}</h2>
        </div>
      )}

      {/* Display Event Timeline in third section */}
      {accountInfo?.items && accountInfo.items.length > 0 ? (
        <div className="account-info-section section-3">
          <p className="refresh">
            Refresh <MdRefresh style={{ color: "#ffffff" }} />
          </p>

          {accountInfo.items.map((item: any, index: number) => {
            // Ensure that the required fields exist before displaying
            if (item?.type && item?.category && item?.timestamp) {
              return (
                <div key={index} className="item-details">
                  <div>
                    <p> {item.type}</p>
                    <p> {item.category}</p>
                  </div>

                  <p>{formatDate(item.timestamp)}</p>
                </div>
              );
            }
            return null;
          })}
        </div>
      ) : (
        <p>No event data available.</p>
      )}
    </div>
  );
};

export default AccountInfo;
