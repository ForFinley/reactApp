import React from 'react';
import FormGroup from '../common/form-group';
import Input from '../common/input';
import Button from '../common/button'
import { changePassword } from '../../services/AuthService';
import { FlashMessagesConsumer } from '../../context/FlashMessages';
import './ChangePassword.scss';

class ChangePassword extends React.Component {

  state = {
    password: '',
    newPassword: '',
    loading: false,
    error: '',
    successMessage: ''
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submit = (e, addMessage) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({loading: true, error: '', successMessage: ''}, () => {
      const { password, newPassword } = this.state;
      changePassword({ password, newPassword, username: this.props.username })
        .then(res => {
          this.setState({loading: false, successMessage: 'Password changed successfully!', newPassword: '', password: ''}, () => {
            addMessage({type: 'success', message: 'Password changed successfully!'})
          })
        })
        .catch(err => {
          this.setState({loading: false}, () => {
            addMessage({type: 'danger', message: 'An error occurred changing your password'})
          })
          console.log(err);
        })
    })

  };

  render() {
    const { password, newPassword, loading, error, successMessage } = this.state;

    return (
      <div className="ChangePassword">
        <h3>Change Password</h3>

        <FormGroup>
          <Input label="Current Password" value={password} type="password" name="password" onChange={this.handleChange} id="password" />
        </FormGroup>

        <FormGroup>
          <Input label="New Password" value={newPassword} type="password" name="newPassword" onChange={this.handleChange} id="newPassword" />
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
        {!loading && !error && successMessage && (
          <FormGroup>
            <div className="Form__loading-text">{successMessage}</div>
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

export default ChangePassword;
