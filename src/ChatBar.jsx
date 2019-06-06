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
        //console.log('handleChange->name', event.target.name)
        // console.log('handleChange->value', event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        });
        // console.log(this.state.username)
    }

    onKeyDown(event) {
        if (event.key === "Enter") {
            //console.log('onKeyDown', event.target.value);
            //note - this passes back to App.js and exec updateMessage - only app updates our data
            //      it gets the path in the MessageChange={this.updateMessage} in App.js
            this.props.MessageChange(this.state);

            //this clear is broke
            // console.log(2, event.target.name);

            //this.setState({ content: '' });  //<-TODOthis was working but I broke it
            // this has content: but no longer works
            this.setState({ [event.target.name]: '' });
        }

    }

    render() {
        //let test = {this.props.currentUser.name};
        return (
            <form>
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
            </form>
        );
    }
}


export default Chat;