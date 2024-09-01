import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ContextLoginProvider } from "./context/LoginContext.jsx";
import { ContextUserClientProvider } from "./context/ContextUsuarioEscritorio.jsx";
import { BrowserRouter as Router } from "react-router-dom";  // Import Router

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>  {/* Wrap with Router */}
      <ContextUserClientProvider>
        <ContextLoginProvider>
          <App />
        </ContextLoginProvider>
      </ContextUserClientProvider>
    </Router>  {/* Close Router */}
  </React.StrictMode>
);
