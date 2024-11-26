import React from "react";
import "./accountdetails.css";
import { FaCopy, FaDownload } from "react-icons/fa";

interface AccountDetailsProps {
  amount: string;
  date: string;
  dueDate: string;
  minimumPayment: number;
  softDescriptor: string;
  value: number;
}

// Function to format the date in 'DD-MMM-YY' format
const formatDate = (dateString: string): string => {
  const date = new Date(dateString); // Parse the date string into a Date object
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  };
  return date.toLocaleDateString("en-GB", options).replace(",", "");
};

// Function to extract the last date from a date range
const extractLastDate = (dateRange: string): string => {
  const parts = dateRange.split("to"); // Split the string by "to"
  return parts.length > 1 ? parts[1].trim() : dateRange; // Return the last part trimmed
};

const handleCopyClick = () => {};
const AccountDetails: React.FC<AccountDetailsProps> = ({
  amount,
  date,
  dueDate,
  minimumPayment,
  softDescriptor,
  value,
}) => {
  return (
    <div className="account-details">
      {/* Header Section */}
      <div className="details-header">
        <FaCopy className="icon copy-icon" onClick={handleCopyClick} />
        <p className="dueDate">Due on {formatDate(dueDate)}</p>{" "}
        {/* Format dueDate */}
        <h2 className="inr">{amount}</h2>
        <p>Minimum payment: INR {minimumPayment.toFixed(2)}</p>
        <FaDownload className="icon download-icon" />
      </div>
    </div>
  );
};

export default AccountDetails;
