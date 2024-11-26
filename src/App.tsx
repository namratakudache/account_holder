// src/App.tsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux"; // Import Provider
import store from "./store/store"; // Import the Redux store

import AppRoutes from "./Routing/AppRoutes"; // Import AppRoutes for routing
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/SideBar/Sidebar";
import AccountInfo from "./components/AccountInfo/AccountInfo";
import AccountINR from "./components/Statements/AccountINR";
import "./App.css";
const App: React.FC = () => {
  return (
    <Provider store={store}>
      {" "}
      {/* Wrap the app with the Provider */}
      <Router>
        <div className="app-container">
          <Navbar />
          <div className="container">
            <div>
              <Sidebar />
            </div>
            <div>
              <AccountInfo />
            </div>
            <div>
              <AccountINR />
            </div>
          </div>

          <div className="content">
            <AppRoutes />
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
