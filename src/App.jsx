import React, { Component } from 'react';
import Chat from './ChatBar.jsx';
import List from './MessageList.jsx';
import { generateRandomId } from "./utils";
//jpb remove randomid as it no longer needed

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = new WebSocket('ws://localhost:3001/');
    this.state = {
        currentUser: { name: "Jack" }, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: []
      };

    this.addMessage = this.addMessage.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
  }

  componentDidMount() {
    //console.log("componentDidMount <App />");
    // this.socket = new WebSocket('ws://localhost:3001/');
    this.socket.onopen = () => {
      console.log('Connected to Server');
    }

  }

  updateMessage(messages){
    this.setState({ messages: messages });
  }

  addMessage(event) {
    const newContent = event.content;
    const newMessage = { username: event.username, content: newContent };
    this.socket.send(JSON.stringify(newMessage));
  }

  render() {
    this.socket.onmessage = (event) => {
      //console.log(event.data);
      var data = JSON.parse(event.data);
      const messages = this.state.messages.concat(data);
      this.updateMessage(messages);
    }
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <List messages={this.state.messages} />
        <Chat currentUser={this.state.currentUser} MessageChange={this.addMessage} />
      </div>
    );
  }
}
export default App;
