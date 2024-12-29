// Import React and ReactDOM for rendering React components
import React from "react";
import ReactDOM from "react-dom/client";
// Import Redux Provider to make store available to all components
import { Provider } from "react-redux";
// Import the Redux store that holds application state
import { store } from "./redux/store";
// Import the root App component
import App from "./App";
// Import global styles
import "./index.css";
// Import toast notification styles
import "react-toastify/dist/ReactToastify.css";

// Create a root element to render our React app into
const root = ReactDOM.createRoot(document.getElementById("root"));
// Render the app wrapped in StrictMode for additional development checks
root.render(
  <React.StrictMode>
    {/* Wrap app in Provider to enable Redux state management */}
    <Provider store={store}>
      {/* Render the main App component */}
      <App />
    </Provider>
  </React.StrictMode>
);
