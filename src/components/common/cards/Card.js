import React from "react";
import "./Card.scss";

const Card = props => {
  return (
    <div style={{ ...props.style }} className={`Card ${props.className || ""}`}>
      {props.children}
    </div>
  );
};

export default Card;
