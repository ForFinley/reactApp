import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { AuthProvider } from "./context/Auth";
import { FlashMessagesProvider } from "./context/FlashMessages";
import { StripeProvider } from "react-stripe-elements";
import config from "./config";

ReactDOM.render(
  <StripeProvider apiKey={config.REACT_APP_STRIPE_PUBLISHABLE_KEY}>
    <AuthProvider>
      <FlashMessagesProvider>
        <App />
      </FlashMessagesProvider>
    </AuthProvider>
  </StripeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
