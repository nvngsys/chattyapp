import React, { Component } from 'react';

class NameChange extends Component {
    render() {
        return (
            <div className="message system">
                {this.props.currentuser} changed their name to {this.props.username}.
            </div>
        );
    }
}

export default NameChange;