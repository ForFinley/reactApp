import React from "react";
import Button from "../common/button";
import { changeEmailInit } from "../../services/AuthService";

class ChangeEmailInit extends React.Component {
  state = { loading: false, status: null };

  handleClick = async e => {
    e.preventDefault();
    try {
      await this.setState({ loading: true });
      await changeEmailInit();
      this.setState({ loading: false, status: "SUCCESS" });
    } catch (e) {
      this.setState({ loading: false, status: "ERROR" });
    }
  };
  render() {
    const { status, loading } = this.state;
    const success = status === "SUCCESS";
    const error = status === "ERROR";
    const clean = status === null;
    return (
      <>
        {((clean && !loading) || error) && (
          <Button onClick={this.handleClick}>Change Email</Button>
        )}
        {!loading &&
          success && <div>Please check your email to continue...</div>}
        {!loading && error && <div>An error occurred, please try again</div>}
        {loading && <div>Loading...</div>}
      </>
    );
  }
}

export default ChangeEmailInit;
