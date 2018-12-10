import React from "react";
import FullPage from "../common/containers/FullPage";
import { FlashMessagesConsumer } from "../../context/FlashMessages";
import Input from "../common/input";
import Form from "../common/form";
import FormGroup from "../common/form-group";
import Button from "../common/button";
import withFormValidation from '../hoc/withFormValidation';
import { resetPasswordFormValidator } from './resetPasswordFormValidator';
import { resetPassword } from "../../services/AuthService";
import { withRouter } from "react-router-dom";
import "./ResetPassword.scss";

class ResetPassword extends React.Component {
  state = {
    loading: false,
    error: false
  };

  submit = (e, addMessage) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.runFormValidation(() => {
      if (this.props.formIsValid) {
        const { newPassword } = this.props.formValues;
        const hash = this.props.match.params.hash;
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
      }
    }, true);
  };

  render() {
    const { loading, error } = this.state;
    const { newPassword, confirmNewPassword } = this.props.formValues;
    const { handleBlur, handleChange, validationMessage, touched } = this.props;
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
                  onChange={handleChange}
                  id="newPassword"
                  onBlur={handleBlur}
                  touched={touched.newPassword}
                  validationMessage={validationMessage.newPassword}
                />
              </FormGroup>

              <FormGroup>
                <Input
                  label="Confirm New Password"
                  value={confirmNewPassword}
                  type="password"
                  name="confirmNewPassword"
                  onChange={handleChange}
                  id="confirmNewPassword"
                  onBlur={handleBlur}
                  touched={touched.confirmNewPassword}
                  validationMessage={validationMessage.confirmNewPassword}
                />
              </FormGroup>

              {!loading && (
                <FormGroup>
                  <Button type="submit">Submit</Button>
                </FormGroup>
              )}

              {loading && (
                <FormGroup>
                  <div className="Form__loading-text">Resetting Password...</div>
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

export default withRouter(withFormValidation(ResetPassword, ['newPassword', 'confirmNewPassword'], resetPasswordFormValidator));
