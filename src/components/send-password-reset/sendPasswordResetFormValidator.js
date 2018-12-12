export const sendPasswordResetFormValidator = values => {
  const errors = {};
  let formIsValid = true;
  const { email } = values;

  errors["email"] = !!newPassword ? "" : "Email is required";

  formIsValid = Object.keys(errors).filter(k => !!errors[k]).length === 0;
  return { formIsValid, errors };
};
