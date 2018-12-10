import React from 'react';
import FormGroup from '../common/form-group';
import Input from '../common/input';
import Button from '../common/button'
import { changePassword } from '../../services/AuthService';
import withFormValidation from '../hoc/withFormValidation';
import { changePasswordFormValidator } from './changePasswordFormValidator';
import { FlashMessagesConsumer } from '../../context/FlashMessages';
import './ChangePassword.scss';

class ChangePassword extends React.Component {

  state = {
    loading: false,
    error: ''
  }

  submit = (e, addMessage) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.runFormValidation(() => {
      if (this.props.formIsValid) {
        this.setState({loading: true, error: ''}, () => {
          const { password, newPassword } = this.props.formValues;
          changePassword({ password, newPassword, username: this.props.username })
            .then(res => {
              this.setState({loading: false, successMessage: 'Password changed successfully!'}, () => {
                addMessage({type: 'success', message: 'Password changed successfully!'})
              })
            })
            .catch(err => {
              this.setState({loading: false}, () => {
                addMessage({type: 'danger', message: 'An error occurred changing your password'})
              })
            })
        })
      }
    }, true)


  };

  render() {
    const { loading, error } = this.state;
    const { password, newPassword, confirmNewPassword } = this.props.formValues;
    const { handleChange, handleBlur, validationMessage, touched } = this.props;

    return (
      <div className="ChangePassword">
        <h3>Change Password</h3>

        <FormGroup>
          <Input label="Current Password" value={password} type="password" name="password" onChange={handleChange} id="password" onBlur={handleBlur} touched={touched.password} validationMessage={validationMessage.password} />
        </FormGroup>

        <FormGroup>
          <Input label="New Password" value={newPassword} type="password" name="newPassword" onChange={handleChange} id="newPassword" onBlur={handleBlur} touched={touched.newPassword} validationMessage={validationMessage.newPassword} />
        </FormGroup>

        <FormGroup>
          <Input label="Confirm New Password" value={confirmNewPassword} type="password" name="confirmNewPassword" onChange={handleChange} id="confirmNewPassword" onBlur={handleBlur} touched={touched.confirmNewPassword} validationMessage={validationMessage.confirmNewPassword} />
        </FormGroup>

        {!loading && (
          <FlashMessagesConsumer>
            {({addMessage}) => (
              <FormGroup>
                <Button onClick={ e => this.submit(e, addMessage)}>
                  Submit
                </Button>
              </FormGroup>
            )}
          </FlashMessagesConsumer>
        )}

        {loading && (
          <FormGroup>
            <div className="Form__loading-text">Submitting...</div>
          </FormGroup>
        )}
        {error &&
          !loading && (
            <FormGroup>
              <div className="Form__error-text">{error}</div>
            </FormGroup>
          )}
      </div>
    )
  }

}

export default withFormValidation(ChangePassword, ['password', 'newPassword', 'confirmNewPassword'], changePasswordFormValidator);
