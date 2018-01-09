import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  constructor(props) {
    super(props)
  }
  render() {
  console.log("Rendering <MessageList />");
  return (
      <main className="messages">
        {this.props.messages.map(message => (
          <Message
            key={message.id}
            content={message.content}
            username={message.username}
            type={message.type} />
        ))}
      </main>
    ) //return bracket
  } //bracket for render

}
export default MessageList;
