import React from 'react';
import './Button.scss';

const Button = ({ type = 'button', onClick, children, className = '' }) => (
  <button className={`Button ${className}`} onClick={onClick} type={type}>{children}</button>
)

export default Button;
