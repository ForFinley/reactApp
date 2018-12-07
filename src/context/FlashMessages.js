import React from "react";
import { getRandomId } from '../utils/randomId';

const FlashMessagesContext = React.createContext();

class FlashMessagesProvider extends React.Component {
  state = { messages: [] };

  addMessage = message => {
    const newId = getRandomId();
    this.setState({ messages: [...this.state.messages, {...message, id: newId }] }, () => {
      if (message.type === 'success') {
        setTimeout(() => {
          this.removeMessage(newId);
        }, 3000)
      }
    })
  }

  removeMessage = id => {
    this.setState({ messages: this.state.messages.filter(m => m.id !== id) })
  }

  render() {
    return (
      <FlashMessagesContext.Provider
        value={{
          messages: this.state.messages,
          addMessage: this.addMessage,
          removeMessage: this.removeMessage
        }}
      >
        {this.props.children}
      </FlashMessagesContext.Provider>
    );
  }
}
const FlashMessagesConsumer = FlashMessagesContext.Consumer;
export { FlashMessagesProvider, FlashMessagesConsumer };
