import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ContextLoginProvider } from "./context/LoginContext.jsx";
import { ContextUserClientProvider } from "./context/ContextUsuarioEscritorio.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextUserClientProvider>
      <ContextLoginProvider>
        <App />
      </ContextLoginProvider>
    </ContextUserClientProvider>
  </React.StrictMode>
);
