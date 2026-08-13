import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// Link bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";
// Link bootstrap js
import "bootstrap/dist/js/bootstrap.min.js";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
