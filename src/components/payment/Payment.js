import React from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import Button from "../common/button";
import "./Payment.scss";

class Payment extends React.Component {
  state = {
    loading: false,
    error: ""
  };
  async submit(e) {
    e.preventDefault();
    this.setState({ error: "", loading: true });
    const { token, error } = await this.props.stripe.createToken({
      email: "ldcaponi@gmail.com"
    });

    if (error) {
      this.setState({ error: error.message, loading: false });
      return;
    }

    //send token to server here
    console.log(token);
    this.setState({ loading: false });
  }

  render() {
    const { error, loading } = this.state;
    return (
      <div className="Payment">
        <h3>Payment Method</h3>
        <form>
          <CardElement
            style={{
              base: {
                lineHeight: "40px",
                "::placeholder": {
                  color: "#CFD7E0"
                }
              }
            }}
          />
          <div className="Payment__message-container">
            {!loading && error && <div className="error">{error}</div>}
            {loading && <div className="error">{error}</div>}
          </div>
          <Button type="button" onClick={this.submit.bind(this)}>
            Add Card
          </Button>
        </form>
      </div>
    );
  }
}

export default injectStripe(Payment);
