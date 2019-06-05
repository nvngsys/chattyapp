import React, { Component } from 'react';
import Chat from './ChatBar.jsx';
import List from './MessageList.jsx';
import { generateRandomId } from "./utils";


class App extends Component {
  constructor(props){
    super(props);
    this.state = 
    {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        },
        {
          id: 3,
          username: "Jack",
          content: "Just testing this stuff."
        }
      ]
    }

    this.updateMessage = this.updateMessage.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // <> Add a new message to the list of messages in the data store
      //const newMessage = {id: 4, username: "Michelle", content: "Hello there!"};
      //const messages = this.state.messages.concat(newMessage);
      // <> Update the state of the app component.
      // <> Calling setState will trigger a call to render() in App and all child components.
      //this.setState({messages: messages})
    }, 3000);
  }

  updateMessage(event){
    const newContent = event.target.value;
    console.log('updateMessage', newContent);
    const newMessage = {id: generateRandomId(), username: this.state.currentUser.name, content: newContent};
    const messages = this.state.messages.concat(newMessage);
    this.setState({messages: messages});
  }

  render() {
    return (
      <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
        <List messages={this.state.messages} />
        <Chat currentUser={this.state.currentUser} KeyDown={this.updateMessage}/>
      </div>
    );
  }
}
export default App;
