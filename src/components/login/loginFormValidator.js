import { validateEmail } from "../../utils/validateEmail";

export const loginFormValidator = values => {
  const errors = {};
  let formIsValid = true;
  const { email, password } = values;

  errors["email"] = !!email ? "" : "Email is required";

  errors["password"] = !!password ? "" : "Password is required";

  if (email && !validateEmail(email)) {
    errors["email"] = "You must provide a valid email address";
  }

  formIsValid = Object.keys(errors).filter(k => !!errors[k]).length === 0;
  return { formIsValid, errors };
};
