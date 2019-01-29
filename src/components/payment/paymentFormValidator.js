export const paymentFormValidator = values => {
  const errors = {};
  let formIsValid = true;
  const { line1, city, state, postalCode, country } = values;

  errors["line1"] = !!line1 ? "" : "Address Line 1 is required";
  errors["city"] = !!city ? "" : "City is required";
  errors["state"] = !!state ? "" : "State is required";
  errors["postalCode"] = !!postalCode ? "" : "Postal Code is required";
  errors["country"] = !!country ? "" : "Country is required";

  formIsValid = Object.keys(errors).filter(k => !!errors[k]).length === 0;
  return { formIsValid, errors };
};
