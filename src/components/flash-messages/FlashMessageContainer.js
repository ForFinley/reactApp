import React from 'react';
import FlashMessage from './FlashMessage';
import { FlashMessagesConsumer } from '../../context/FlashMessages';

const FlashMessageContainer = props => (
  <FlashMessagesConsumer>
    {({ messages, removeMessage }) => messages.map(m => <FlashMessage onRemove={() => removeMessage(m.id)} key={m.id} {...m} />)}
  </FlashMessagesConsumer>
)

export default FlashMessageContainer;
