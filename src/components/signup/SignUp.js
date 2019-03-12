import React from "react";
import { AuthConsumer } from "../../context/Auth";
import SinglePageForm from "../common/containers/SinglePageForm";
import { Button, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { Link } from "react-router-dom";
import GoogleButton from "../common/button/GoogleButton";
import withFormValidation from "../hoc/withFormValidation";
import { signUpFormValidator } from "./signUpFormValidator";
import { signUp } from "../../services/AuthService";
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

  render() {
    const { email, password, confirmPassword } = this.props.formValues;
    const { touched, validationMessage, handleBlur, handleChange } = this.props;
    const { error, loading } = this.state;
    return (
      <AuthConsumer>
        {({ login }) => (
          <SinglePageForm>
            <h1 className="Form__heading">Sign Up</h1>

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
            <FormGroup>
              <Label for="confirmPassword">Confirm Password</Label>
              <Input
                invalid={
                  touched.confirmPassword && validationMessage.confirmPassword
                }
                value={confirmPassword}
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                id="confirmPassword"
                onBlur={handleBlur}
              />
              <FormFeedback>{validationMessage.confirmPassword}</FormFeedback>
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
                <Button color="primary" onClick={this.submit}>
                  Sign Up
                </Button>{" "}
                <GoogleButton />
              </FormGroup>
            )}

            <div className="mb10 font-s">
              Already have an account?{" "}
              <Link to="/login" className="link">
                Login
              </Link>
            </div>
          </SinglePageForm>
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
