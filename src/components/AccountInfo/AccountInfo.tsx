import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { MdRefresh } from "react-icons/md";
import {
  fetchAccountInfoRequest,
  fetchAccountInfoSuccess,
  fetchAccountInfoFailure,
} from "../../actions/accountActions";
import "./accountInfo.css";

// Define the formatDate function as before
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

const AccountInfo: React.FC = () => {
  const dispatch = useDispatch();
  const { accountInfo, loading, error } = useSelector(
    (state: any) => state.account
  ); // Access the Redux state

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    console.log("AccountInfotoken", token);

    if (!token) {
      dispatch(fetchAccountInfoFailure("No authentication token found."));
      console.error("No authentication token found.");
      return;
    }

    const fetchAccountInfo = async () => {
      dispatch(fetchAccountInfoRequest());
      try {
        const accountResponse = await axios.get(
          "https://sandbox-apiconnect.42cards.in/pismo-api/accounts/v1/accounts/103052861?cb=1732106905298",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const timelineResponse = await axios.get(
          "https://sandbox-apiconnect.42cards.in/pismo-api/events/v1/timeline?page=1&perPage=20",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        dispatch(
          fetchAccountInfoSuccess({
            name: accountResponse.data.name,
            available_limit: accountResponse.data.available_limit,
            items: timelineResponse.data.items || [],
          })
        );
      } catch (err) {
        dispatch(
          fetchAccountInfoFailure(
            "Failed to fetch data. Please try again later."
          )
        );
        console.error("Error fetching data: ", err);
      }
    };

    fetchAccountInfo();
  }, [dispatch]);

  // Render loading state or error message
  if (loading) {
    return <div className="loading-message">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const getInitials = (name: string) => {
    const nameParts = name.split(" ");
    const firstLetter = nameParts[0]?.charAt(0).toUpperCase();
    const lastLetter = nameParts[nameParts.length - 1]?.charAt(0).toUpperCase();
    return firstLetter + lastLetter;
  };

  return (
    <div className="account-info">
      {accountInfo && (
        <div className="account-info-section section-1">
          <h3 className="getInitial">{getInitials(accountInfo.name)}</h3>
          <h3>{accountInfo.name}</h3>
        </div>
      )}

      {accountInfo && (
        <div className="account-info-section section-2">
          <p>Available Credit: </p>
          <h2 className="limit">INR {accountInfo.available_limit}</h2>
        </div>
      )}

      {accountInfo?.items && accountInfo.items.length > 0 ? (
        <div className="account-info-section section-3">
          <p className="refresh">
            {/* Refresh <MdRefresh style={{ color: "#ffffff" }} /> */}
          </p>

          {accountInfo.items.map((item: any, index: number) => {
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
