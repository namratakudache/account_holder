import React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../SideBar/Sidebar";
import AccountInfo from "../AccountInfo/AccountInfo";
import Statements from "../Statements/Statement";


const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <Sidebar />
        <AccountInfo />
        <Statements />
      </div>
 
    </>
  );
};

export default Home;
