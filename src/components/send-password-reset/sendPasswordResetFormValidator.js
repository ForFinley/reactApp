import { validateEmail } from "../../utils/validateEmail";

export const sendPasswordResetFormValidator = values => {
  const errors = {};
  let formIsValid = true;
  const { email } = values;

  errors["email"] = !!email ? "" : "Email is required";

  if (email && !validateEmail(email)) {
    errors["email"] = "You must provide a valid email address";
  }

  formIsValid = Object.keys(errors).filter(k => !!errors[k]).length === 0;
  return { formIsValid, errors };
};
