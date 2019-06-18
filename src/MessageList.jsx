import React, { Component } from 'react';
import Message from './Message.jsx';
import NameChange from './NameChange.jsx';

class List extends Component {
    render() {
        //console.log(`MessageList.List`);

        // TODO - check for a message length - if no length return back
        console.log(this.props.messages);
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
                    color={message.color}
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