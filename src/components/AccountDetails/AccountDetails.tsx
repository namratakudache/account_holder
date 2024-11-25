// src/components/AccountDetails/AccountDetails.tsx
import React from "react";
import "./accountdetails.css";

interface AccountDetailsProps {
  amount: string;
  date: string;
}

const AccountDetails: React.FC<AccountDetailsProps> = ({ amount, date }) => {
  return (
    <div className="account-details">
      <div className="details-header">
        <h2>Account Details</h2>
        <p>Due on 1 Jul 24</p>
        <h2>INR {amount}</h2>
        <p>Minimum payment: INR 6,587.18</p>
      </div>
      <div className="details-content">
        <div className="details-row">
          <div className="details-col">
            <p>{date}</p>
          </div>
          <div className="details-col">
            <p>late fee sgst</p>
          </div>

          <div className="details-col">
            <p>INR 45.00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
