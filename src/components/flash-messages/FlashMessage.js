import React from 'react';
import './FlashMessage.scss';

const FlashMessage = props => (
  <div className={`FlashMessage FlashMessage--${props.type}`}>
    <span className="FlashMessage__message">{props.message}</span>
    <span onClick={props.onRemove} className="FlashMessage__x">&times;</span>
  </div>
)

export default FlashMessage;
