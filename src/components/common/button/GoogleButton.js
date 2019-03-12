import React from "react";
import { GoogleLogin } from "react-google-login";
import { AuthConsumer } from "../../../context/Auth";
import { login } from "../../../services/AuthService";
import { withRouter } from "react-router-dom";

class GoogleButton extends React.Component {
  signUpWithGoogle = async (
    { tokenObj: { id_token: idToken } },
    contextLogin
  ) => {
    const {
      data: { token }
    } = await login(
      { provider: "google" },
      { headers: { authorization: idToken } }
    );

    contextLogin(null, token);
    this.props.history.push("/");
  };

  render() {
    return (
      <AuthConsumer>
        {({ login: contextLogin }) => (
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Use Google"
            onSuccess={res => this.signUpWithGoogle(res, contextLogin)}
            onFailure={console.error}
          />
        )}
      </AuthConsumer>
    );
  }
}

export default withRouter(GoogleButton);
