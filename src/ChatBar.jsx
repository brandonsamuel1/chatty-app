import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.username
    };
    this.changeUserName = this.changeUserName.bind(this);
  }


  changeUserName(event) {
    this.setState(
      {currentUser: event.target.value},
      () => { console.log(this.state.currentUser); }
    );
  }

  render() {
    console.log("Rendering <ChatBar />");
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          value={this.state.currentUser}
          onChange={this.changeUserName}
          onKeyPress={(event) => {
            if(event.key === 'Enter') {
              this.props.changeUserName(this.state.currentUser);
            }
          }}
        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyPress={(event) => {
            if(event.key === 'Enter') {
              this.props.addChatMessage(event.target.value);
              event.target.value = '';
            }
          }}
        />
      </footer>
    );
  }
}
export default ChatBar;
