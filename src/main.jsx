import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { ThemeProvider } from "./context/Theme.context.jsx";
import { NotifyProvider } from "./context/Notify.context.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider>
      <NotifyProvider>
        <App />
      </NotifyProvider>
    </ThemeProvider>
  </Provider>
);
