import React from "react";
import "./form-group.scss";

const FormGroup = ({ children, style }) => (
  <div className="FormGroup" style={style}>
    {children}
  </div>
);

export default FormGroup;
