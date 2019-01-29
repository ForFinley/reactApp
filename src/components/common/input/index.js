import React from "react";
import "./input.scss";

const Input = ({
  value,
  type = "text",
  id,
  name,
  placeholder = "",
  label,
  onChange,
  validationMessage,
  touched,
  onBlur,
  style
}) => (
  <>
    <input
      className={`Input__text-input ${
        touched && validationMessage ? "Input__text-input--error" : ""
      } ${touched && !validationMessage ? "Input__text-input--success" : ""}`}
      value={value}
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      style={style}
    />
    <label className="Input__label" htmlFor="email">
      {label}
    </label>
    {touched &&
      validationMessage && (
        <div className="Input__validation-message">{validationMessage}</div>
      )}
  </>
);

export default Input;
