// components/Card/Card.tsx
import React from "react";
import { useSelector } from "react-redux"; // Import useSelector to access Redux state
import Sidebar from "../SideBar/Sidebar";
import AccountInfo from "../AccountInfo/AccountInfo";
import "./card.css";
const Card: React.FC = () => {
  const { accountInfo } = useSelector((state: any) => state.account); //accessing accountInfo state from store
  const getInitials = (name: string): string => {
    const names = name.split(" ");
    const initials = names.map((n) => n[0]).join("");
    return initials.toUpperCase(); // Return initials in uppercase
  };

  // Check if accountInfo exists before rendering
  if (!accountInfo) {
    return <div>Loading...</div>;
  }
  return (
    <div className="card-container">
      <Sidebar />
      <AccountInfo />
      <div className="card-detail">
        <div className="card"></div>
      <h3>{getInitials(accountInfo.name)}</h3>
      <h4>{accountInfo.name}</h4>
      <p>Available Credit: INR {accountInfo.available_limit}</p>
      <p>Account Normal</p>
      <div className="card-list">
        <a href="">Cards</a>
        <a href="">Profile</a>
        <a href="">Account</a>
        <a href="">Spending limits</a>
      </div>
     
      </div>
    </div>
  );
};

export default Card;
