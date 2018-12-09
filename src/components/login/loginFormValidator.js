export const loginFormValidator = values => {
  const errors = {};
  let formIsValid = true;
  const { username, password } = values;

  errors["username"] = !!username ? "" : "Username is required";

  errors["password"] = !!password ? "" : "Password is required";

  formIsValid = Object.keys(errors).filter(k => !!errors[k]).length === 0;
  return { formIsValid, errors };
};
