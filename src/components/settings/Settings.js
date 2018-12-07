import React from 'react';
import FullPage from '../common/containers/FullPage';
import { getProfile } from '../../services/AuthService';
import ChangePassword from '../change-password/ChangePassword';
import './Settings.scss';

class Settings extends React.Component {

  state = {
    userProfile: {}
  }

  componentDidMount() {
    getProfile()
      .then(res => {
        this.setState({userProfile: res.data})
      })
      .catch(console.log)
  }

  render() {
    return (
      <FullPage>
        <h1>Settings</h1>
        <hr />
        <ChangePassword username={this.state.userProfile.username} />
      </FullPage>)
  }
}

export default Settings;
