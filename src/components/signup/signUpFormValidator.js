import { validateEmail } from "../../utils/validateEmail";

export const signUpFormValidator = values => {
  const errors = {};
  let formIsValid = true;
  const { username, email, password, confirmPassword } = values;

  errors["username"] = !!username ? "" : "Username is required";

  errors["email"] = !!email ? "" : "Email is required";

  errors["password"] = !!password ? "" : "Password is required";

  errors["confirmPassword"] = !!confirmPassword
    ? ""
    : "Confirm Password is required";

  if (email && !validateEmail(email)) {
    errors["email"] = "You must provide a valid email address";
  }
  if (password !== confirmPassword) {
    errors["password"] = "Passwords must match";

    errors["confirmPassword"] = "Passwords must match";
  }

  formIsValid = Object.keys(errors).filter(k => !!errors[k]).length === 0;
  return { formIsValid, errors };
};
