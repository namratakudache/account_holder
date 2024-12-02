import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import AppRoutes from "./Routing/AppRoutes"; // Import AppRoutes for routing
import store from "./store/store";
import "./App.css";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="app-container">
          <AppRoutes />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
