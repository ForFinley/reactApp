import React from "react";
import FullPage from "../common/containers/FullPage";
import { AuthConsumer } from "../../context/Auth";
import "./Profile.scss";

class Profile extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {({ profile }) => (
          <FullPage>
            <div>{JSON.stringify(profile)}</div>
          </FullPage>
        )}
      </AuthConsumer>
    );
  }
}

export default Profile;
