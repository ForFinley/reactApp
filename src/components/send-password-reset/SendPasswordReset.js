import React from "react";
import FullPage from "../common/containers/FullPage";
import { FlashMessagesConsumer } from "../../context/FlashMessages";
import Input from "../common/input";
import Form from "../common/form";
import FormGroup from "../common/form-group";
import Button from "../common/button";
import withFormValidation from '../hoc/withFormValidation';
import { sendPasswordResetFormValidator } from './sendPasswordResetFormValidator';
import { sendRecoveryEmail } from "../../services/AuthService";
import "./SendPasswordReset.scss";

class SendPasswordReset extends React.Component {
  state = {
    loading: false,
    error: false
  };

  submit = (e, addMessage) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.runFormValidation(() => {
      if (this.props.formIsValid) {
        const { email } = this.props.formValues;
        this.setState({ loading: true, error: false }, () => {
          sendRecoveryEmail({ email })
            .then(res => {
              addMessage({ type: "success", message: "Recovery email sent! Please check your email..." });
            })
            .catch(err => {
              this.setState({
                error: "An error occured sending recovery email...",
                loading: false
              });
              addMessage({
                type: "danger",
                message: "An error occured sending recovery email..."
              });
            });
        });
      }
    }, true);
  };

  render() {
    const { loading, error } = this.state;
    const { email } = this.props.formValues;
    const { handleBlur, handleChange, validationMessage, touched } = this.props;
    return (
      <FlashMessagesConsumer>
        {({ addMessage }) => (
          <FullPage>
            <Form onSubmit={e => this.submit(e, addMessage)}>
              <h1 className="Form__heading">Send Recovery Email</h1>

              <FormGroup>
                <Input
                  label="Email"
                  value={email}
                  type="email"
                  name="email"
                  onChange={handleChange}
                  id="email"
                  onBlur={handleBlur}
                  touched={touched.email}
                  validationMessage={validationMessage.email}
                />
              </FormGroup>

              {!loading && (
                <FormGroup>
                  <Button type="submit">Send</Button>
                </FormGroup>
              )}

              {loading && (
                <FormGroup>
                  <div className="Form__loading-text">Sending recovery email...</div>
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

export default withFormValidation(SendPasswordReset, ['email'], sendPasswordResetFormValidator);
