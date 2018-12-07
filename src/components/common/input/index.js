import React from 'react';
import './input.scss';

const Input = ({value, type="text", id, name, placeholder = '', label, onChange}) => (
    <>
      <input
        className="Input__text-input"
        value={value}
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
      <label className="Input__label" htmlFor="email">
        {label}
      </label>
    </>
)

export default Input;
