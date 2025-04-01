import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux"; // Import Provider ✅
import store from "./redux/store";  // Import the Redux store ✅
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}> {/* Wrap App with Provider ✅ */}
      <App />
    </Provider>
  </React.StrictMode>
);
