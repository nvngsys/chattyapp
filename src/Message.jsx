import React, { Component } from 'react';

class Message extends Component {
    render() {
        var userStyle = {
            color: this.props.color
        };

        console.log(this.props.color);

        return (
            <div className="message">
                {/*<span className="message-username" style={{this.props.color}}>{this.props.username}</span>*/}
                <span className="message-username" style={userStyle}>{this.props.username}</span>
                <span className="message-content">{this.props.content}</span>
            </div>
        );
    }
}

export default Message;
