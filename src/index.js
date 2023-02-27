import React from "react";
import ReactDOM from "react-dom/client";
import { ContextProvider } from "./Component/UI/ContextProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Provider } from "react-redux";
import store from "./Component/Store/ReduxStore";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContextProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ContextProvider>
);
