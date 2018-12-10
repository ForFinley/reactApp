export const resetPasswordFormValidator = values => {
  const errors = {};
  let formIsValid = true;
  const { newPassword, confirmNewPassword } = values;

  errors["newPassword"] = !!newPassword ? "" : "New Password is required";

  errors["confirmNewPassword"] = !!confirmNewPassword
    ? ""
    : "Confirm New Password is required";

  if (newPassword !== confirmNewPassword) {
    errors["newPassword"] = "Passwords must match";

    errors["confirmNewPassword"] = "Passwords must match";
  }

  formIsValid = Object.keys(errors).filter(k => !!errors[k]).length === 0;
  return { formIsValid, errors };
};
