import React, { Component } from 'react';
import Chat from './ChatBar.jsx';
import List from './MessageList.jsx';
import { generateRandomId } from "./utils";


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
    this.socket.onopen = () => {
      console.log('Connected to Server');
    }
    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // <> Add a new message to the list of messages in the data store
    //   //const newMessage = {id: 4, username: "Michelle", content: "Hello there!"};
    //   //const messages = this.state.messages.concat(newMessage);
    //   // <> Update the state of the app component.
    //   // <> Calling setState will trigger a call to render() in App and all child components.
    //   //this.setState({messages: messages})
    // }, 3000);
  }

  updateMessage(messages){
    this.setState({ messages: messages });
  }

  addMessage(event) {
    const newContent = event.content;
    //console.log(event.target);
    //console.log('content', event.content);
    //console.log('username', event.username);
    //const newMessage = { id: generateRandomId(), username: this.state.currentUser.name, content: newContent };
    const newMessage = { username: event.username, content: newContent };
    this.socket.send(JSON.stringify(newMessage));

    //receive the message and console log.
    // this.setState({ messages: messages });
  }

  render() {
    this.socket.onmessage = (event) => {
      // console.log('onmessage event');
      console.log(event.data);
      // code to handle incoming message
      var data = JSON.parse(event.data);
      const messages = this.state.messages.concat(data);
      //this.setState({ messages: messages });
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
