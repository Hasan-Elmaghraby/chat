import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { MessageProvider } from "./context/MessageProvider";
import { UsersProvider } from "./context/UserProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <UsersProvider>
        <MessageProvider>
          <App />
        </MessageProvider>
      </UsersProvider>
    </BrowserRouter>
  </StrictMode>
);
