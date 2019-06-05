import React, { Component } from 'react';

class Message extends Component {
    render() {
        console.log(`Message.Message`);
        return (
            <div className="message">
                    <span className="message-username">{this.props.messages.username}</span>
                    <span className="message-content">{this.props.messages.content}</span>            
            </div>
        );
    }
}
export default Message;


