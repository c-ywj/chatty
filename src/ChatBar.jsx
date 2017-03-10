import React, {Component} from 'react';

class ChatBar extends Component {

  render() {
    console.log(this.props.user)
    return (
      <footer className="chatbar">
        <input
          className    = "chatbar-username"
          defaultValue = {this.props.user}
          onKeyDown    = {this.props.addNewNotification}
          placeholder  = "Your Name (Optional)"
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