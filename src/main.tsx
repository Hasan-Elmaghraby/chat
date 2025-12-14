import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router";
import { MessageProvider } from "./context/MessageProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <MessageProvider>
        <App />
      </MessageProvider>
    </BrowserRouter>
  </StrictMode>
);
