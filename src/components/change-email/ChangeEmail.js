import React from "react";
import FullPage from "../common/containers/FullPage";
import { FlashMessagesConsumer } from "../../context/FlashMessages";
import Input from "../common/input";
import Form from "../common/form";
import FormGroup from "../common/form-group";
import Button from "../common/button";
import withFormValidation from "../hoc/withFormValidation";
import { changeEmailFormValidator } from "./changeEmailFormValidator";
import { changeEmail } from "../../services/AuthService";
import { withRouter } from "react-router-dom";

class ChangeEmail extends React.Component {
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
        const changeEmailHash = this.props.match.params.hash;
        this.setState({ loading: true, error: false }, () => {
          changeEmail({ email, changeEmailHash })
            .then(res => {
              addMessage({
                type: "success",
                message: "Email changed! Please check your new email to verify!"
              });
              this.props.resetForm();
            })
            .catch(err => {
              this.setState({
                error: "An error occured changing your email",
                loading: false
              });
              addMessage({
                type: "danger",
                message: "An error occured changing your email"
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
              <h1 className="Form__heading">New Email</h1>

              <FormGroup>
                <Input
                  label="New Email"
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

              {!loading && (
                <FormGroup>
                  <Button type="submit">Submit</Button>
                </FormGroup>
              )}

              {loading && (
                <FormGroup>
                  <div className="Form__loading-text">Changing...</div>
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

export default withFormValidation(
  withRouter(ChangeEmail),
  ["email"],
  changeEmailFormValidator
);
