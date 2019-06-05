import React, { Component } from 'react';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            username: ''
        }
        this.onContent = this.onContent.bind(this);
        this.onName = this.onName.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }



    onContent(event) {
        // console.log('onContent',event.target.value)
        this.setState({
            content: event.target.value
        });
    }

    onName(event) {
        console.log('test onName')
        console.log('onName',event.target.value)
        this.setState({
            username: event.target.value
        });
    }

    onKeyDown(event) {
        if (event.key === "Enter") {
            //console.log('onKeyDown', event.target.value);
            this.props.KeyDown(event);                  //note - this passes back to App.js and exec updateMessage - only app updates our data
            this.setState({ content: '' });           // it gets the path in the KeyDown={this.updateMessage} in App.js
        }

    }

    render() {
        //let test = {this.props.currentUser.name};
        return (
            <footer className="chatbar">
                <input className="chatbar-username"
                    placeholder="Your Name (Optional)"
                    //defaultValue={this.props.currentUser.name}
                    onChange={this.onName}
                    value={this.state.username}
                />
                <input className="chatbar-message"
                    placeholder="Type a message and hit ENTER"
                    onChange={this.onContent}
                    value={this.state.content}
                    onKeyDown={this.onKeyDown}
                />
            </footer>
        );
    }
}


export default Chat;