import React, { Component } from 'react';
import Chat from './ChatBar.jsx';
import List from './MessageList.jsx';
import { generateRandomId } from "./utils";

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = new WebSocket('ws://localhost:3001/');
    this.state = {
      type: "postMessage",
      currentUser: { name: "Anonymous" }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      users: 0
    };

    this.addMessage = this.addMessage.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
  }

  componentDidMount() {
    this.socket.onopen = () => {
      console.log(' Client connect to Server');
    }
  }

  updateMessage(messages) {
    this.setState({ messages: messages });
  }

  addMessage(event) {
    const content = event.content;
    const username = event.username;

    if (username != this.state.currentUser.name) {
      const notificationMessage = { type: "postNotification", username: username, currentUser: this.state.currentUser.name };
      this.socket.send(JSON.stringify(notificationMessage));
    }
    const newMessage = { type: this.state.type, username: username, content: content };
    this.state.currentUser.name = event.username;
    this.socket.send(JSON.stringify(newMessage));
  }

  render() {
    const sty = {float: "right", "font-weight": "bold"}
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const dataType = data.type;

      if (dataType == "clientcount") {
        let connectedUsers = data.userCount;
        this.setState({ users: connectedUsers })
      } else {
        const messages = this.state.messages.concat(data);
        this.updateMessage(messages);
      }
    }

    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className = 'navbar-count'>{this.state.users} users online</span>
        </nav>
        <List messages={this.state.messages} />
        <Chat currentUser={this.state.currentUser} MessageChange={this.addMessage} />
      </div>
    );
  }
}
export default App;
