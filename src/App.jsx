import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
//import NotificationSystem from '../node_modules/react-notification-system/src/NotificationSystem.jsx'
import {NotificationContainer, NotificationManager} from 'react-notifications';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"},
      messages: [],
      notification: null
    }
  }

  createNotification = (type, content, username) => {
    switch(type) {
      case 'system':
        NotificationManager.success(content, 'System Message:', 3000);
        break;
      case 'chat':
        NotificationManager.info(content, 'New Message from: ' + username, 3000);
        break;
    }
  }

  changeUserName = (newName) => {
    let oldName = this.state.currentUser.name;
    this.setState({currentUser: {name: newName}});
    let content = oldName + " changed their name to " + newName;
    console.log(content)

    const newMessage = {
      type: "system",
      content: content
    };
    this.webSockets.send(JSON.stringify(newMessage))
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    this.webSockets = new WebSocket("ws://localhost:3001/");
    this.webSockets.onopen = (event) => {
      console.log('Connected to server');
      console.log('Online users: ', event);
      const onlineUserCount = JSON.stringify(event);
      this.setState({
        counter: onlineUserCount.count
      });
    }
    this.webSockets.onmessage = (event) => {
      console.log('Websocket Event Received:', event);
      const data = JSON.parse(event.data);
      console.log('data: ', data);
      switch(data.type) {
        case "chat":
          this.setState({
            messages: this.state.messages.concat(JSON.parse(event.data))
          });

        case "system":
          this.createNotification(data.type, data.content, data.username)
          break;

        case "newUser":
          this.setState({
            counter: data.count
          });
          break;

        default:
          throw new Error('Unknown event type ' + event.data);
      }
      console.log('Received message from server')
    }

    setTimeout(() => {
      console.log("Simulating incoming message");

      const newMessage = {id: 3, username: "Ironman", content: "Welcome to the chat room Avengers!", type: "chat"};
      const messages = this.state.messages.concat(newMessage)

      this.setState({messages: messages})
    }, 2000);
  }

  addChatMessage(content) {
    console.log("sending as", this.state.currentUser.name);
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
          <a href="/" className="navbar-brand">Marvels Chatty</a><span className="user-count">Online Users: {this.state.counter} </span>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar username={this.state.currentUser.name} addChatMessage={this.addChatMessage.bind(this)} changeUserName={this.changeUserName.bind(this)} />
        <NotificationContainer/>
      </div>
    );
  }
}

export default App;
