import React from "react";
import { Route } from "react-router-dom";
import FullPage from "../common/containers/FullPage";
import Container from "../common/containers/Container";
import { getProfile } from "../../services/AuthService";
import ChangePassword from "../change-password/ChangePassword";
import LinkList from "../common/link-list/LinkList";
import "./Settings.scss";

class Settings extends React.Component {
  state = {
    userProfile: {}
  };

  componentDidMount() {
    getProfile()
      .then(res => {
        this.setState({ userProfile: res.data });
      })
      .catch(console.log);
  }

  render() {
    const { match } = this.props;
    console.log(match);
    return (
      <FullPage className="Settings">
        <Container>
          <h1>Settings</h1>
          <div>
            <div className="Settings__sidebar">
              <LinkList />
            </div>

            <div className="Settings__content">
              <Route
                exact
                path={match.path}
                render={() => <div>Please choose a setting</div>}
              />
              <Route
                path={`${match.path}/password`}
                component={ChangePassword}
              />
              <Route
                path={`${match.path}/payment`}
                component={() => <div>Payment</div>}
              />
            </div>
          </div>
        </Container>
      </FullPage>
    );
  }
}

export default Settings;
