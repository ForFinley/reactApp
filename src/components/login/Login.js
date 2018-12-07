import React from "react";
import { AuthConsumer } from "../../context/Auth";
import Input from '../common/input';
import Form from '../common/form';
import FormGroup from '../common/form-group';
import FullPage from '../common/containers/FullPage';
import Button from '../common/button';
import "./Login.scss";

class Login extends React.Component {
  state = { username: "", password: "" };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submit = (e, loginFn) => {
    const { username, password } = this.state;
    e.preventDefault();
    e.stopPropagation();
    loginFn({username, password});
  };

  render() {
    const { username, password } = this.state;
    return (
      <AuthConsumer>
        {({ login, loginLoading, loginError }) => (
          <FullPage>
            <Form onSubmit={e => this.submit(e, login)}>
              <h1 className="Form__heading">Login</h1>

              <FormGroup>
                <Input label="Username" value={username} type="text" name="username" onChange={this.handleChange} id="username" />
              </FormGroup>

              <FormGroup>
                <Input label="Password" value={password} type="password" name="password" onChange={this.handleChange} id="password" />
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
