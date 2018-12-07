import React from 'react';
import './form.scss';

const Form = ({children, onSubmit}) => (
  <form className="Form" onSubmit={onSubmit}>
    {children}
  </form>
)

export default Form;
