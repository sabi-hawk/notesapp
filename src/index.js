import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import StateProvider from "./providers/stateProvider";
import { BrowserRouter } from "react-router-dom";
import { persister } from "./flux/store";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StateProvider>
    <PersistGate persistor={persister}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </StateProvider>
);
