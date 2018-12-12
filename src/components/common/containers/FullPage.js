import React from 'react';
import './FullPage.scss';

const FullPage = ({style = {}, className = '', children}) => (
  <div style={style} className={`FullPage ${className}`}>{children}</div>
)

export default FullPage;
