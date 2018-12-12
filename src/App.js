import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/login/Login";
import SignUp from "./components/signup/SignUp";
import Home from "./components/home/Home";
import Public from "./components/public/Public";
import Profile from "./components/profile/Profile";
import Settings from "./components/settings/Settings";
import Navbar from "./components/navbar/Navbar";
import Verify from "./components/verify/Verify";
import SendPasswordReset from './components/send-password-reset/SendPasswordReset';
import ResetPassword from "./components/reset-password/ResetPassword";
import FlashMessageContainer from "./components/flash-messages/FlashMessageContainer";
import { AuthConsumer } from "./context/Auth";
import mustBeLoggedIn from "./components/hoc/mustBeLoggedIn";
import mustBeLoggedOut from "./components/hoc/mustBeLoggedOut";
import "./App.scss";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <AuthConsumer>{state => <Navbar {...state} />}</AuthConsumer>
            <FlashMessageContainer />
            <Route exact path="/" component={Public} />
            <Route exact path="/verify/:hash" component={Verify} />
            <Route
              exact
              path="/passwordReset/:hash"
              component={ResetPassword}
            />
            <Route
              exact
              path="/sendRecoveryEmail"
              component={SendPasswordReset}
            />
            <Route exact path="/home" component={mustBeLoggedIn(Home)} />
            <Route exact path="/profile" component={mustBeLoggedIn(Profile)} />
            <Route
              exact
              path="/settings"
              component={mustBeLoggedIn(Settings)}
            />
            <Route exact path="/login" component={mustBeLoggedOut(Login)} />
            <Route exact path="/signup" component={mustBeLoggedOut(SignUp)} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
