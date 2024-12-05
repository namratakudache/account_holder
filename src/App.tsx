import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import AppRoutes from "./Routing/AppRoutes"; // Import AppRoutes for routing
import store from "./store/store";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SessionTimeout from "./components/SessionTimeout/sessionTimeout";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="app-container">
        <SessionTimeout />
          <AppRoutes />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
