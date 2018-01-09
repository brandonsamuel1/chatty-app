import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [{
        id: 1,
        type: 'chat',
        content: 'I wont be impressed with technology until I can download food'
      }, {
        id: 2,
        type: 'chat',
        content: 'I am message 2'
      }]
    }
  }
  render() {
  console.log("Rendering <App/>");
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar />
      </div>
    );
  }
}
export default App;
