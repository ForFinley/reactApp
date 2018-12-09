import React from "react";
import { AuthConsumer } from "../../context/Auth";
import Input from "../common/input";
import Form from "../common/form";
import FormGroup from "../common/form-group";
import FullPage from "../common/containers/FullPage";
import Button from "../common/button";
import withFormValidation from '../hoc/withFormValidation';
import { loginFormValidator } from "./loginFormValidator";
import "./Login.scss";

class Login extends React.Component {

  submit = (e, loginFn) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.runFormValidation(() => {
      if (this.props.formIsValid) {
        const { username, password } = this.props.formValues;
        loginFn({ username, password });
      }
    }, true);
  };

  render() {
    const { username, password } = this.props.formValues;
    const { touched, validationMessage, handleChange, handleBlur } = this.props;
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
                  onChange={handleChange}
                  id="username"
                  onBlur={handleBlur}
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

export default withFormValidation(Login, ['username', 'password'], loginFormValidator);
