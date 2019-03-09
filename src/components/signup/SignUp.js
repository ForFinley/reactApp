import React from "react";
import { AuthConsumer } from "../../context/Auth";
import Input from "../common/input";
import Form from "../common/form";
import FormGroup from "../common/form-group";
import FullPage from "../common/containers/FullPage";
import Button from "../common/button";
import { Link } from "react-router-dom";
import withFormValidation from "../hoc/withFormValidation";
import { signUpFormValidator } from "./signUpFormValidator";
import { signUp, login } from "../../services/AuthService";
import { GoogleLogin } from "react-google-login";
import { withRouter } from "react-router-dom";
import "./SignUp.scss";

class SignUp extends React.Component {
  state = {
    loading: false,
    error: false
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submit = e => {
    e.preventDefault();
    e.stopPropagation();
    this.props.runFormValidation(() => {
      if (this.props.formIsValid) {
        this.setState({ loading: true, error: false }, () => {
          const { email, password } = this.props.formValues;
          signUp({ email, password })
            .then(res => {
              this.setState({ loading: false });

              this.props.history.push("/login");
            })
            .catch(err => {
              this.setState({ loading: false });
              console.log(err);
            });
        });
      }
    }, true);
  };

  signUpWithGoogle = async ({ tokenObj: { id_token: idToken } }, loginFn) => {
    await this.setState({ loading: true });
    const {
      data: { token }
    } = await login(
      { provider: "google" },
      { headers: { authorization: idToken } }
    );

    loginFn(null, token);
    this.props.history.push("/");
  };

  render() {
    const { email, password, confirmPassword } = this.props.formValues;
    const { touched, validationMessage, handleBlur, handleChange } = this.props;
    const { error, loading } = this.state;
    return (
      <AuthConsumer>
        {({ login }) => (
          <FullPage>
            <Form onSubmit={this.submit}>
              <h1 className="Form__heading">Sign Up</h1>

              <FormGroup>
                <Input
                  label="Email"
                  value={email}
                  type="text"
                  name="email"
                  onChange={handleChange}
                  id="email"
                  onBlur={handleBlur}
                  touched={touched.email}
                  validationMessage={validationMessage.email}
                />
              </FormGroup>

              <FormGroup>
                <Input
                  label="Password"
                  value={password}
                  type="password"
                  name="password"
                  onChange={handleChange}
                  id="password"
                  onBlur={handleBlur}
                  touched={touched.password}
                  validationMessage={validationMessage.password}
                />
              </FormGroup>

              <FormGroup>
                <Input
                  label="Confirm Password"
                  value={confirmPassword}
                  type="password"
                  name="confirmPassword"
                  onChange={handleChange}
                  id="confirmPassword"
                  onBlur={handleBlur}
                  touched={touched.confirmPassword}
                  validationMessage={validationMessage.confirmPassword}
                />
              </FormGroup>

              {loading && (
                <FormGroup>
                  <div className="Form__loading-text">Signing Up...</div>
                </FormGroup>
              )}
              {error &&
                !loading && (
                  <FormGroup>
                    <div className="Form__error-text">{error}</div>
                  </FormGroup>
                )}

              {!loading && (
                <FormGroup>
                  <Button type="submit">Sign Up</Button>{" "}
                  <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    buttonText="Sign in with Google"
                    onSuccess={res => this.signUpWithGoogle(res, login)}
                    onFailure={console.error}
                  />
                </FormGroup>
              )}

              <div className="mb10 font-s">
                Already have an account?{" "}
                <Link to="/login" className="link">
                  Login
                </Link>
              </div>
            </Form>
          </FullPage>
        )}
      </AuthConsumer>
    );
  }
}

export default withFormValidation(
  withRouter(SignUp),
  ["email", "password", "confirmPassword"],
  signUpFormValidator
);
