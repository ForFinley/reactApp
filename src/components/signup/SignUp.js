import React from "react";
import { AuthConsumer } from "../../context/Auth";
import FullPage from "../common/containers/FullPage";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
  FormFeedback
} from "reactstrap";
import { Link } from "react-router-dom";
import withFormValidation from "../hoc/withFormValidation";
import { signUpFormValidator } from "./signUpFormValidator";
import { signUp, login } from "../../services/AuthService";
import { GoogleLogin } from "react-google-login";
import { withRouter } from "react-router-dom";
import "./SignUp.scss";

class SignUp extends React.Component {
  state = {
    loading: false,
    error: false
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submit = e => {
    e.preventDefault();
    e.stopPropagation();
    this.props.runFormValidation(() => {
      if (this.props.formIsValid) {
        this.setState({ loading: true, error: false }, () => {
          const { email, password } = this.props.formValues;
          signUp({ email, password })
            .then(res => {
              this.setState({ loading: false });

              this.props.history.push("/login");
            })
            .catch(err => {
              this.setState({ loading: false });
              console.log(err);
            });
        });
      }
    }, true);
  };

  signUpWithGoogle = async ({ tokenObj: { id_token: idToken } }, loginFn) => {
    await this.setState({ loading: true });
    const {
      data: { token }
    } = await login(
      { provider: "google" },
      { headers: { authorization: idToken } }
    );

    loginFn(null, token);
    this.props.history.push("/");
  };

  render() {
    const { email, password, confirmPassword } = this.props.formValues;
    const { touched, validationMessage, handleBlur, handleChange } = this.props;
    const { error, loading } = this.state;
    return (
      <AuthConsumer>
        {({ login }) => (
          <FullPage>
            <Container>
              <Row>
                <Col sm="12" lg={{ size: 8, offset: 2 }}>
                  <Form>
                    <h1 className="Form__heading">Sign Up</h1>

                    <FormGroup>
                      <Label for="email">Email</Label>
                      <Input
                        invalid={touched.email && validationMessage.email}
                        value={email}
                        type="text"
                        name="email"
                        onChange={handleChange}
                        id="email"
                        onBlur={handleBlur}
                      />
                      <FormFeedback>{validationMessage.email}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label for="password">Password</Label>
                      <Input
                        invalid={touched.password && validationMessage.password}
                        value={password}
                        type="password"
                        name="password"
                        onChange={handleChange}
                        id="password"
                        onBlur={handleBlur}
                      />
                      <FormFeedback>{validationMessage.password}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label for="confirmPassword">Confirm Password</Label>
                      <Input
                        invalid={
                          touched.confirmPassword &&
                          validationMessage.confirmPassword
                        }
                        value={confirmPassword}
                        type="password"
                        name="confirmPassword"
                        onChange={handleChange}
                        id="confirmPassword"
                        onBlur={handleBlur}
                      />
                      <FormFeedback>
                        {validationMessage.confirmPassword}
                      </FormFeedback>
                    </FormGroup>

                    {loading && (
                      <FormGroup>
                        <div className="Form__loading-text">Signing Up...</div>
                      </FormGroup>
                    )}
                    {error &&
                      !loading && (
                        <FormGroup>
                          <div className="Form__error-text">{error}</div>
                        </FormGroup>
                      )}

                    {!loading && (
                      <FormGroup>
                        <Button color="primary" onClick={this.submit}>
                          Sign Up
                        </Button>{" "}
                        <GoogleLogin
                          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                          buttonText="Sign in with Google"
                          onSuccess={res => this.signUpWithGoogle(res, login)}
                          onFailure={console.error}
                        />
                      </FormGroup>
                    )}

                    <div className="mb10 font-s">
                      Already have an account?{" "}
                      <Link to="/login" className="link">
                        Login
                      </Link>
                    </div>
                  </Form>
                </Col>
              </Row>
            </Container>
          </FullPage>
        )}
      </AuthConsumer>
    );
  }
}

export default withFormValidation(
  withRouter(SignUp),
  ["email", "password", "confirmPassword"],
  signUpFormValidator
);
