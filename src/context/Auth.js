import React from "react";
import { login, getProfile } from "../services/AuthService";
import {
  setToken,
  getToken,
  getDecodedToken,
  destroyToken
} from "../services/Storage";
import { setAuthHeaders, removeAuthHeaders } from "../services/Headers";

//creating a context to store login state information
//could use redux for this, but context is fine
const AuthContext = React.createContext();

class AuthProvider extends React.Component {
  state = {
    isLoggedIn: null,
    loginLoading: false,
    profileLoading: false,
    loginError: "",
    profile: {}
  };

  componentDidMount() {
    const token = getToken();
    if (token && this.validateToken()) {
      //user is already logged in -- found token in local storage
      //now login state will persist through browser refreshes
      this.loginFromContext(null, token);
    } else {
      this.logoutFromContext();
    }
  }

  loginFromContext = async (params, token) => {
    //set loading to true, try to login
    this.setState({ loginLoading: true });
    try {
      if (!token) {
        //login to receive token
        const { data } = await login(params);
        token = data.token;
      }

      //handle the token once we receive it
      this.handleToken(token);

      //get fresh profile information and update on state
      await this.updateProfile();

      //cleanup state
      this.setState({
        loginLoading: false,
        loginError: "",
        isLoggedIn: true
      });
    } catch (e) {
      this.handleError(e);
    }
  };

  logoutFromContext = () => {
    destroyToken();
    removeAuthHeaders();
    this.setState({
      loginError: "",
      loginLoading: false,
      profile: {},
      isLoggedIn: false
    });
  };

  handleToken = token => {
    setToken(token);
    setAuthHeaders(token);
  };

  updateProfile = () =>
    new Promise((resolve, reject) => {
      this.setState({ profileLoading: true });
      getProfile()
        .then(res => {
          this.setState(
            {
              profile: res.data
            },
            () => {
              this.setState({ profileLoading: false }, resolve);
            }
          );
        })
        .catch(() => {
          this.setState({ profileLoading: false }, reject);
        });
    });

  handleError = e => {
    console.error(e);
    destroyToken();
    removeAuthHeaders();
    this.setState({
      loginLoading: false,
      loginError: "An error occurred logging in",
      profile: {},
      isLoggedIn: false
    });
  };

  validateToken = () => {
    const token = getDecodedToken();
    return new Date().getTime() / 1000 < token.exp;
  };
  render() {
    return (
      <AuthContext.Provider
        value={{
          login: this.loginFromContext,
          logout: this.logoutFromContext,
          updateProfile: this.updateProfile,
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
