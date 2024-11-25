// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import Sidebar from "./components/SideBar/Sidebar";
import AccountInfo from "./components/AccountInfo/AccountInfo";
import AccountINR from "./components/AccountINRScroll/AccountINR";
// import AccountDetails from "./components/AccountDetails/AccountDetails";

const Service1: React.FC = () => {
  return <h2>Service 1</h2>;
};

const Service2: React.FC = () => {
  return <h2>Service 2</h2>;
};

const Service3: React.FC = () => {
  return <h2>Service 3</h2>;
};

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Navbar />

        <div>
          <Sidebar />
          <AccountInfo />

          <div>
            <AccountINR />
            {/* <AccountDetails/> */}
          </div>
        </div>

        <div className="content">
          <Routes>
            <Route path="/service1" element={<Service1 />} />
            <Route path="/service2" element={<Service2 />} />
            <Route path="/service3" element={<Service3 />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
