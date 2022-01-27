import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { PageRoutes } from './pages/index';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <PageRoutes />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
