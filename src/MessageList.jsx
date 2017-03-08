import React, {Component} from 'react';

class MessageList extends Component {

  render() {
    const listMessages = this.props.messages.map((msg) =>
      <div key={msg.msgId} className="message">
        <span className="message-username">{msg.username}</span>
        <span className="message-content">{msg.content}</span>
      </div>
    )

    return (
      <div>
      {listMessages}
      </div>
    )
  }

}

export default MessageList;