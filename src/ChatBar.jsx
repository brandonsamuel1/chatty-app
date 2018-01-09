import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
  console.log("Rendering <ChatBar />");
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.username} />
        <input className="chatbar-message"
        placeholder="Type a message and hit ENTER"
        onKeyPress={(event) => {
          if(event.key === 'Enter') {
            this.props.addMessage(event.target.value);
          }
        }}/>
      </footer>
    );
  }
}
export default ChatBar;
