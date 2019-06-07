import React, { Component } from 'react';
import Chat from './ChatBar.jsx';
import List from './MessageList.jsx';
import { generateRandomId } from "./utils";
//import { connect } from 'tls';
//jpb remove randomid as it no longer needed

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
    //console.log("componentDidMount <App />");
    // this.socket = new WebSocket('ws://localhost:3001/');
    this.socket.onopen = () => {
      console.log(' Client connect to Server');
    }
  }

  updateMessage(messages) {
    this.setState({ messages: messages });
  }


  addMessage(event) {
    //console.log(this.state.type);
    //console.log(this.state.currentUser.name);
    //console.log(event.username);

    const content = event.content;
    const username = event.username;

    if (username != this.state.currentUser.name) {
      const notificationMessage = { type: "postNotification", username: username, currentUser: this.state.currentUser.name };
      this.socket.send(JSON.stringify(notificationMessage));
    }

    const newMessage = { type: this.state.type, username: username, content: content };

    // set the current user so that I can track when the user changes
    this.state.currentUser.name = event.username;
    this.socket.send(JSON.stringify(newMessage));
  }

  render() {
    //var connectedUsers = 1;
    const sty = {float: "right", "font-weight": "bold"}
    this.socket.onmessage = (event) => {
      //console.log(event.data);
      const data = JSON.parse(event.data);
      const dataType = data.type;
      //console.log(data.type);

      if (dataType == "clientcount") {
        let connectedUsers = data.userCount;
        this.setState({ users: connectedUsers })
        console.log("# of users  " + connectedUsers);
      } else {
        const messages = this.state.messages.concat(data);
        this.updateMessage(messages);
      }
    }
    //let style = {float:right}
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
