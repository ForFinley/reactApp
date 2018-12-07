import React from "react";
import { login } from "../services/AuthService";
import {
  setToken,
  getToken,
  getDecodedToken,
  destroyToken
} from "../services/Storage";
import { setAuthHeaders, removeAuthHeaders } from '../services/Headers';

//creating a context to store login state information
//could use redux for this, but context is fine
const AuthContext = React.createContext();

class AuthProvider extends React.Component {
  state = { isLoggedIn: null, loginLoading: false, loginError: "", name: "" };

  componentDidMount() {
    const token = getToken();
    if (token && this.validateToken()) {

      //user is already logged in -- found token in local storage
      //now login state will persist through browser refreshes
      this.handleSuccess(token);
    } else {
      this.logoutFromContext();
    }
  }

  loginFromContext = (data) => {
    //set loading to true, try to login
    this.setState({ loginLoading: true });

    //simulate http login
    login(data)
      .then((res) => this.handleSuccess(res.data.token))
      .catch(this.handleError);
  };

  logoutFromContext = () => {
    destroyToken();
    removeAuthHeaders();
    this.setState({
      isLoggedIn: false,
      name: ""
    });
  };

  handleSuccess = token => {
    //save token to localStorage
    setToken(token);
    setAuthHeaders(token);
    const decoded = getDecodedToken();

    //set context state
    this.setState({
      loginLoading: false,
      isLoggedIn: true,
      name: decoded.username,
      loginError: ""
    });
  };

  handleError = e => {
    destroyToken();
    removeAuthHeaders();
    this.setState({
      loginLoading: false,
      isLoggedIn: false,
      name: "",
      loginError: 'An error occurred logging in'
    });
  };

  validateToken = () => {
    const token = getDecodedToken();
    return (new Date().getTime()/1000) < token.exp;
  }
  render() {
    return (
      <AuthContext.Provider
        value={{
          login: this.loginFromContext,
          logout: this.logoutFromContext,
          ...this.state
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
const AuthConsumer = AuthContext.Consumer;
export { AuthProvider, AuthConsumer };
