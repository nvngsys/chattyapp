import React, { Component } from 'react';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            username: this.props.currentUser.name
        }
        this.handleChange = this.handleChange.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onKeyDown(event) {
        if (event.key === "Enter") {
            this.props.MessageChange(this.state);
            this.setState({ [event.target.name]: '' });
        }

    }

    render() {
        return (
                <footer className="chatbar">
                    <input className="chatbar-username"
                        name="username"
                        placeholder="Your Name (Optional)"
                        //defaultValue={this.props.currentUser.name}
                        //defaultValue = {this.state.username}
                        onChange={this.handleChange}
                        value={this.state.username}
                    />
                    <input className="chatbar-message"
                        name="content"
                        placeholder="Type a message and hit ENTER"
                        onChange={this.handleChange}
                        value={this.state.content}
                        onKeyDown={this.onKeyDown}
                    />
                </footer>
        );
    }
}


export default Chat;