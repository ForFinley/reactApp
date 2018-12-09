import React from "react";
import { AuthConsumer } from "../../context/Auth";
import Input from "../common/input";
import Form from "../common/form";
import FormGroup from "../common/form-group";
import FullPage from "../common/containers/FullPage";
import Button from "../common/button";
import { bootstrapFormHandler } from "../../services/formHandler";
import { loginFormValidator } from "./loginFormValidator";
import "./Login.scss";

class Login extends React.Component {
  state = {
    formValues: { username: "", password: "" },
    touched: { username: false, password: false },
    validationMessage: { username: "", password: "" },
    formIsValid: true
  };

  constructor(props) {
    super(props);
    //sets up reusable form handler logic
    bootstrapFormHandler(this, loginFormValidator);
  }

  submit = (e, loginFn) => {
    e.preventDefault();
    e.stopPropagation();
    this.runFormValidation(() => {
      if (this.state.formIsValid) {
        const { username, password } = this.state.formValues;
        loginFn({ username, password });
      }
    }, true);
  };

  render() {
    const { username, password } = this.state.formValues;
    const { touched, validationMessage } = this.state;
    return (
      <AuthConsumer>
        {({ login, loginLoading, loginError }) => (
          <FullPage>
            <Form onSubmit={e => this.submit(e, login)}>
              <h1 className="Form__heading">Login</h1>

              <FormGroup>
                <Input
                  label="Username"
                  value={username}
                  type="text"
                  name="username"
                  onChange={this.handleChange}
                  id="username"
                  onBlur={this.handleBlur}
                  touched={touched.username}
                  validationMessage={validationMessage.username}
                />
              </FormGroup>

              <FormGroup>
                <Input
                  label="Password"
                  value={password}
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                  id="password"
                  onBlur={this.handleBlur}
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

export default Login;
