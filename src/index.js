import React from "react";
import ReactDOM from "react-dom/client";
import "./fonts/OpenSans-Bold.ttf";
import "./fonts/OpenSans-Regular.ttf";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
