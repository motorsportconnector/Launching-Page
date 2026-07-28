import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import EarlyInterestLanding from "./EarlyInterestLanding.jsx";
import CookieBanner from "./CookieBanner.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <EarlyInterestLanding />
    <CookieBanner />
  </React.StrictMode>
);
