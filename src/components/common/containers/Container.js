import React from 'react';
import './Container.scss';

const Container = ({style = {}, className = '', children}) => (
  <div className={`Container ${className}`} style={style}>{children}</div>
)

export default Container;
