import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: []
    }
  }


  componentDidMount() {
    console.log("componentDidMount <App />");

    this.webSockets = new WebSocket("ws://localhost:3001/");
    this.webSockets.onopen = (event) => {
      console.log('Connected to server')
    }
    this.webSockets.onmessage = (event) => {
      console.log('Websocket Event Received:', event);
      this.setState({
        messages: this.state.messages.concat(JSON.parse(event.data))
      });
      console.log('Received message from server')
    }

    setTimeout(() => {
      console.log("Simulating incoming message");

      const newMessage = {id: 3, username: "Michelle", content: "Hello there!", type: "chat"};
      const messages = this.state.messages.concat(newMessage)

      this.setState({messages: messages})
    }, 3000);
  }

  addMessage(content) {
    const newMessage = {
      id: Math.random(),
      type: "chat",
      content: content,
      username: this.state.currentUser.name
    };
    this.webSockets.send(JSON.stringify(newMessage))

    console.log('Sent message to server')
  }


  render() {
  console.log("Rendering <App/>");
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar username={this.state.currentUser.name} addMessage={this.addMessage.bind(this)} />
      </div>
    );
  }
}

export default App;
