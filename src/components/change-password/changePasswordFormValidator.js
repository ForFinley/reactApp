export const changePasswordFormValidator = values => {
  const errors = {};
  let formIsValid = true;
  const { password, newPassword, confirmNewPassword } = values;

  errors["password"] = !!password ? "" : "Password is required";
  errors["newPassword"] = !!password ? "" : "New Password is required";
  errors["confirmNewPassword"] = !!confirmNewPassword ? "" : "Confirm Password is required";

  if (newPassword !== confirmNewPassword) {
    errors["newPassword"] = "Passwords must match";

    errors["confirmNewPassword"] = "Passwords must match";
  }

  formIsValid = Object.keys(errors).filter(k => !!errors[k]).length === 0;
  return { formIsValid, errors };
};
