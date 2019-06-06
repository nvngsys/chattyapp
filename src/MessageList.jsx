import React, { Component } from 'react';
import Message from './Message.jsx';

class List extends Component {
    render() {
        //console.log(`MessageList.List`);
        //console.log(this.props.messages);
        const messages = this.props.messages.map(message => {
            return <Message key = {message.id} messages={message}/>
        })

        return (
            <main className="messages">
               {messages}
                
            <div className="message system">
                Anonymous1 changed their name to nomnom.
            </div>
            </main>
        );
    }
}
export default List;