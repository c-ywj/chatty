import React, {Component} from 'react';

class ChatBar extends Component {

  render() {
    return (
      <footer className="chatbar">
        <input
          className   = "chatbar-username"
          value       = {this.props.user}
          onChange    = {this.props.handleChangeUser}
          placeholder = "Your Name (Optional)"
        />
        <input
          className   = "chatbar-message"
          placeholder = "Type a message and hit ENTER"
          onKeyDown   = {this.props.addNewMessage}
        />
      </footer>
    )
  }
}

export default ChatBar;