import React from "react";
import Input from '../common/input';
import Form from '../common/form';
import FormGroup from '../common/form-group';
import FullPage from '../common/containers/FullPage';
import Button from '../common/button';
import {signUp} from '../../services/AuthService';
import {withRouter} from 'react-router-dom';
import "./SignUp.scss";

class SignUp extends React.Component {
  state = { username: "", mail: "", password: "", loading: false, error: false };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submit = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({loading: true, error: false}, () => {
      const { email, password, username } = this.state;
      signUp({username, email, password})
        .then(res => {
          this.setState({loading: false})

          this.props.history.push('/login');
        })
        .catch(err => {
          this.setState({loading: false})
          console.log(err);
        })
    })

  };

  render() {
    const { username, email, password, error, loading } = this.state;
    return (
      <FullPage>
        <Form onSubmit={this.submit}>
          <h1 className="Form__heading">Sign Up</h1>

          <FormGroup>
            <Input label="Username" value={username} type="text" name="username" onChange={this.handleChange} id="username" />
          </FormGroup>

          <FormGroup>
            <Input label="Email" value={email} type="text" name="email" onChange={this.handleChange} id="email" />
          </FormGroup>

          <FormGroup>
            <Input label="Password" value={password} type="password" name="password" onChange={this.handleChange} id="password" />
          </FormGroup>

          {!loading && (
            <FormGroup>
              <Button type="submit">Sign Up</Button>
            </FormGroup>
          )}

          {loading && (
            <FormGroup>
              <div className="Form__loading-text">Logging In...</div>
            </FormGroup>
          )}
          {error &&
            !loading && (
              <FormGroup>
                <div className="Form__error-text">{error}</div>
              </FormGroup>
            )}
        </Form>
      </FullPage>
    );
  }
}

export default withRouter(SignUp);
