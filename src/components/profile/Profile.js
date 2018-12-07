import React from 'react';
import FullPage from '../common/containers/FullPage';
import { getProfile } from '../../services/AuthService';
import './Profile.scss';

class Profile extends React.Component {

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
    return (<FullPage><div>{JSON.stringify(this.state.userProfile)}</div></FullPage>)
  }
}

export default Profile;
