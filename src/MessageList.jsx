import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  constructor(props) {
    super(props)
  }
  render() {
  console.log("Rendering <MessageList />");
  let messages = this.props.messages.map(message => {
    return (
      <Message key={message.id} content={message.content} type={message.type} />
    )});
    return (
      <main className="messages">
        {messages}
      </main>
    );
  }
}
export default MessageList;
