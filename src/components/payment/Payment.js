import React from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import Button from "../common/button";
import { AuthConsumer } from "../../context/Auth";
import { FlashMessagesConsumer } from "../../context/FlashMessages";
import FormGroup from "../common/form-group";
import Input from "../common/input";
import withFormValidation from "../hoc/withFormValidation";
import { paymentFormValidator } from "./paymentFormValidator";
import {
  setBillingCard,
  deleteBillingCard
} from "../../services/PaymentService";
import PaymentCard from "./PaymentCard";
import Loader from "../loader/Loader";
import "./Payment.scss";

const formItems = [
  { name: "line1", display: "Address Line 1" },
  { name: "line2", display: "Address Line 2" },
  { name: "city", display: "City" },
  { name: "state", display: "State" },
  { name: "postalCode", display: "Postal Code" },
  { name: "country", display: "Country" }
];

class Payment extends React.Component {
  state = {
    loading: false,
    error: ""
  };

  async submit(e, updateProfileFunction, addMessageFunction) {
    e.preventDefault();
    this.setState({ error: "" });
    const { token, error } = await this.props.stripe.createToken();

    if (error) {
      this.setState({ error: error.message, loading: false });
      addMessageFunction({
        type: "danger",
        message: "An issue occurred adding this credit card"
      });
      return;
    }

    this.props.runFormValidation(async () => {
      if (this.props.formIsValid) {
        this.setState({ loading: true });

        const { formValues } = this.props;
        const requestBody = {
          token: token.id,
          ...formValues
        };

        try {
          await setBillingCard(requestBody);
          await updateProfileFunction();
          addMessageFunction({
            type: "success",
            message: "Card added"
          });
          this.setState({ loading: false });
        } catch (updateError) {
          this.setState({ error: updateError.message, loading: false });
          addMessageFunction({
            type: "danger",
            message: "An issue occurred adding this credit card"
          });
          return;
        }
      }
    }, true);
  }

  async deleteCard(updateProfileFunction, addMessageFunction) {
    this.setState({ loading: true });
    try {
      await deleteBillingCard();
      await updateProfileFunction();
      this.setState({ loading: false });
      addMessageFunction({
        type: "success",
        message: "Card deleted"
      });
    } catch (e) {
      addMessageFunction({ type: "danger", message: "Could not delete card" });
    }
  }

  render() {
    const { error, loading } = this.state;
    const { touched, validationMessage, handleBlur, handleChange } = this.props;

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
            <FlashMessagesConsumer>
              {({ addMessage }) => (
                <div className="Payment">
                  <h3>Payment Method</h3>
                  {!stripeBillingCardBrand &&
                    !loading && (
                      <form>
                        {formItems.map(({ name, display }) => (
                          <FormGroup style={{ marginBottom: 20 }}>
                            <Input
                              label={display}
                              value={this.props.formValues[name]}
                              type="text"
                              name={name}
                              onChange={handleChange}
                              id={name}
                              onBlur={handleBlur}
                              touched={touched[name]}
                              validationMessage={validationMessage[name]}
                            />
                          </FormGroup>
                        ))}

                        <CardElement
                          style={{
                            base: {
                              lineHeight: "40px",
                              "::placeholder": {
                                color: "#585863"
                              }
                            }
                          }}
                        />
                        <div className="Payment__message-container">
                          {!loading &&
                            error && <div className="error">{error}</div>}
                          {loading && <div className="error">{error}</div>}
                        </div>
                        <Button
                          type="button"
                          onClick={e =>
                            this.submit(e, updateProfile, addMessage)
                          }
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
                        onDelete={this.deleteCard.bind(
                          this,
                          updateProfile,
                          addMessage
                        )}
                      />
                    )}
                  {loading && <Loader />}
                </div>
              )}
            </FlashMessagesConsumer>
          );
        }}
      </AuthConsumer>
    );
  }
}

export default withFormValidation(
  injectStripe(Payment),
  formItems.map(i => i.name),
  paymentFormValidator
);
