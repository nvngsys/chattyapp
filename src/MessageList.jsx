import React, { Component } from 'react';
import Message from './Message.jsx';
import NameChange from './NameChange.jsx';

class List extends Component {
    render() {
        //console.log(this.props.messages);
        const messages = this.props.messages.map(message => {
            //console.log("List");
            //console.log('List' + message.type);
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