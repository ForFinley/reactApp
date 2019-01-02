import React from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import Button from "../common/button";
import { AuthConsumer } from "../../context/Auth";
import { setBillingCard } from "../../services/PaymentService";
import PaymentCard from "./PaymentCard";
import Loader from "../loader/Loader";
import "./Payment.scss";

class Payment extends React.Component {
  state = {
    loading: false,
    error: ""
  };
  async submit(e, updateProfileFunction) {
    e.preventDefault();
    this.setState({ error: "", loading: true });
    const { token, error } = await this.props.stripe.createToken();

    if (error) {
      this.setState({ error: error.message, loading: false });
      return;
    }

    await setBillingCard({ token: token.id });
    await updateProfileFunction();
    this.setState({ loading: false });
  }

  render() {
    const { error, loading } = this.state;
    return (
      <AuthConsumer>
        {({ profile, updateProfile }) => {
          const {
            stripeBillingCardBrand,
            stripeBillingCardLast4,
            stripeBillingCardExpMonth,
            stripeBillingCardExpYear
          } = profile;
          return (
            <div className="Payment">
              <h3>Payment Method</h3>
              {!stripeBillingCardBrand && (
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
                  <Button
                    type="button"
                    onClick={e => this.submit(e, updateProfile)}
                  >
                    Add Card
                  </Button>
                </form>
              )}
              {stripeBillingCardBrand &&
                !loading && (
                  <PaymentCard
                    brand={stripeBillingCardBrand}
                    expYear={stripeBillingCardExpYear}
                    expMonth={stripeBillingCardExpMonth}
                    last4={stripeBillingCardLast4}
                  />
                )}
              {loading && <Loader />}
            </div>
          );
        }}
      </AuthConsumer>
    );
  }
}

export default injectStripe(Payment);
