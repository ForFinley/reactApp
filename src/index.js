import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { AuthProvider } from "./context/Auth";
import { FlashMessagesProvider } from './context/FlashMessages';

ReactDOM.render(
  <AuthProvider>
    <FlashMessagesProvider>
      <App />
    </FlashMessagesProvider>
  </AuthProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
