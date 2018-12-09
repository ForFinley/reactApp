import React from "react";
import FullPage from "../common/containers/FullPage";
import { FlashMessagesConsumer } from "../../context/FlashMessages";
import Input from "../common/input";
import Form from "../common/form";
import FormGroup from "../common/form-group";
import Button from "../common/button";
import { resetPassword } from "../../services/AuthService";
import { withRouter } from "react-router-dom";
import "./ResetPassword.scss";

class ResetPassword extends React.Component {
  state = {
    newPassword: "",
    confirmNewPassword: "",
    loading: false,
    error: false
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submit = (e, addMessage) => {
    e.preventDefault();
    e.stopPropagation();
    const { newPassword, confirmNewPassword } = this.state;
    const hash = this.props.match.params.hash;
    if (newPassword !== confirmNewPassword) {
      return this.setState({ error: "Passwords must match" });
    }
    this.setState({ loading: true, error: false }, () => {
      resetPassword({ newPassword, hash })
        .then(res => {
          addMessage({ type: "success", message: "Password reset success!" });
          this.props.history.push("/login");
        })
        .catch(err => {
          this.setState({
            error: "An error occured resetting password",
            loading: false
          });
          addMessage({
            type: "danger",
            message: "An error occured resetting password"
          });
        });
    });
  };

  render() {
    const { newPassword, confirmNewPassword, loading, error } = this.state;
    return (
      <FlashMessagesConsumer>
        {({ addMessage }) => (
          <FullPage>
            <Form onSubmit={e => this.submit(e, addMessage)}>
              <h1 className="Form__heading">Reset Password</h1>

              <FormGroup>
                <Input
                  label="New Password"
                  value={newPassword}
                  type="password"
                  name="newPassword"
                  onChange={this.handleChange}
                  id="newPassword"
                />
              </FormGroup>

              <FormGroup>
                <Input
                  label="Confirm New Password"
                  value={confirmNewPassword}
                  type="password"
                  name="confirmNewPassword"
                  onChange={this.handleChange}
                  id="confirmNewPassword"
                />
              </FormGroup>

              {!loading && (
                <FormGroup>
                  <Button type="submit">Submit</Button>
                </FormGroup>
              )}

              {loading && (
                <FormGroup>
                  <div className="Form__loading-text">Changing Password...</div>
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
        )}
      </FlashMessagesConsumer>
    );
  }
}

export default withRouter(ResetPassword);
