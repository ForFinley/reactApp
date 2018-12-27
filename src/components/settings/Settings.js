import React from "react";
import { Route } from "react-router-dom";
import FullPage from "../common/containers/FullPage";
import Container from "../common/containers/Container";
import { getProfile } from "../../services/AuthService";
import ChangePassword from "../change-password/ChangePassword";
import Payment from "../payment/Payment";
import { Elements } from "react-stripe-elements";
import LinkList from "../common/link-list/LinkList";
import "./Settings.scss";

class Settings extends React.Component {
  state = {
    userProfile: {},
    links: [
      {
        icon: <i className="fas fa-unlock-alt" />,
        text: "Password",
        path: `${this.props.match.url}/password`
      },
      {
        icon: <i className="far fa-credit-card" />,
        text: "Payment",
        path: `${this.props.match.url}/payment`
      }
    ]
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
    const { links } = this.state;
    return (
      <FullPage className="Settings">
        <Container>
          <h1>Settings</h1>
          <div>
            <div className="Settings__sidebar">
              <LinkList links={links} />
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
                render={() => (
                  <Elements>
                    <Payment />
                  </Elements>
                )}
              />
            </div>
          </div>
        </Container>
      </FullPage>
    );
  }
}

export default Settings;
