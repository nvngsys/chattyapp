import React, { Component } from 'react';
import Message from './Message.jsx';
import NameChange from './NameChange.jsx';

class List extends Component {
    render() {
        const messages = this.props.messages.map(message => {
            if (message.type == "incomingNotification") {
                return <NameChange
                    key={message.id}
                    username={message.username}
                    currentuser={message.currentUser}
                />

            } else if (message.type == "incomingMessage") {
                return < Message
                    key={message.id}
                    type={message.type}
                    username={message.username}
                    content={message.content}
                //messages={message}
                />
            }
        })
        return (
            <main className="messages">
                {messages}
            </main>
        );
    }
}
export default List;