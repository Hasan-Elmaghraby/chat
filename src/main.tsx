import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { MessageProvider } from "./context/message";
import { UsersProvider } from "./context/users";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MessageProvider>
      <UsersProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UsersProvider>
    </MessageProvider>
  </StrictMode>
);
