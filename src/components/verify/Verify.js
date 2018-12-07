import React from "react";
import { withRouter } from "react-router-dom";
import FullPage from "../common/containers/FullPage";
import { FlashMessagesConsumer } from "../../context/FlashMessages";
import { verifyEmail } from "../../services/AuthService";
import "./Verify.scss";

class Verify extends React.Component {
  tries = 0;

  tryToVerifyEmail = addMessage => {
    const hash = this.props.match.params.hash;
    if (!hash) {
      return;
    }

    this.tries++;

    if (this.tries < 2) {
      verifyEmail(hash)
        .then(res => {
          addMessage({
            type: "success",
            message: "Successfully verified your email!"
          });
          this.props.history.push("/login");
        })
        .catch(err => {
          addMessage({
            type: "danger",
            message: "A problem occurred verifying your email"
          });
        });
    }
  };

  render() {
    return (
      <FullPage>
        <FlashMessagesConsumer>
          {({ addMessage }) => this.tryToVerifyEmail(addMessage)}
        </FlashMessagesConsumer>
      </FullPage>
    );
  }
}

export default withRouter(Verify);
