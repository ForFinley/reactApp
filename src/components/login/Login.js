import React from "react";
import { AuthConsumer } from "../../context/Auth";
import SinglePageForm from "../common/containers/SinglePageForm";
import { Button, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import GoogleButton from "../common/button/GoogleButton";
import withFormValidation from "../hoc/withFormValidation";
import { loginFormValidator } from "./loginFormValidator";
import { Link } from "react-router-dom";
import "./Login.scss";

class Login extends React.Component {
  submit = (e, loginFn) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.runFormValidation(() => {
      if (this.props.formIsValid) {
        const { email, password } = this.props.formValues;
        loginFn({ email, password });
      }
    }, true);
  };

  render() {
    const { email, password } = this.props.formValues;
    const { touched, validationMessage, handleChange, handleBlur } = this.props;
    return (
      <AuthConsumer>
        {({ login, loginLoading, loginError }) => (
          <SinglePageForm>
            <h1 className="Form__heading">Login</h1>

            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                invalid={touched.email && validationMessage.email}
                value={email}
                type="text"
                name="email"
                onChange={handleChange}
                id="email"
                onBlur={handleBlur}
              />
              <FormFeedback>{validationMessage.email}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                invalid={touched.password && validationMessage.password}
                value={password}
                type="password"
                name="password"
                onChange={handleChange}
                id="password"
                onBlur={handleBlur}
              />
              <FormFeedback>{validationMessage.password}</FormFeedback>
            </FormGroup>

            {loginLoading && (
              <FormGroup>
                <div className="Form__loading-text">Logging In...</div>
              </FormGroup>
            )}
            {loginError &&
              !loginLoading && (
                <FormGroup>
                  <div className="Form__error-text">{loginError}</div>
                </FormGroup>
              )}

            {!loginLoading && (
              <FormGroup>
                <Button onClick={e => this.submit(e, login)} color="primary">
                  Login
                </Button>
                <GoogleButton />
              </FormGroup>
            )}

            <div className="mb10 font-s">
              Forgot password?{" "}
              <Link className="link" to="/sendRecoveryEmail">
                Click here
              </Link>
            </div>
            <div className="font-s">
              Don't have an account?{" "}
              <Link to="/signup" className="link">
                Sign Up
              </Link>
            </div>
          </SinglePageForm>
        )}
      </AuthConsumer>
    );
  }
}

export default withFormValidation(
  Login,
  ["email", "password"],
  loginFormValidator
);
