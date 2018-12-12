import React from 'react';
import FullPage from '../common/containers/FullPage';
import Container from '../common/containers/Container';
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
      <FullPage className="Settings">
        <Container>
          <h1>Settings</h1>
          <hr />
          <ChangePassword username={this.state.userProfile.username} />
        </Container>
      </FullPage>)
  }
}

export default Settings;
