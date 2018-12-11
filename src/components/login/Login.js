import React from "react";
import { AuthConsumer } from "../../context/Auth";
import Input from "../common/input";
import Form from "../common/form";
import FormGroup from "../common/form-group";
import FullPage from "../common/containers/FullPage";
import Button from "../common/button";
import withFormValidation from "../hoc/withFormValidation";
import { loginFormValidator } from "./loginFormValidator";
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
          <FullPage>
            <Form onSubmit={e => this.submit(e, login)}>
              <h1 className="Form__heading">Login</h1>

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

              {!loginLoading && (
                <FormGroup>
                  <Button type="submit">Login</Button>
                </FormGroup>
              )}

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
            </Form>
          </FullPage>
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
