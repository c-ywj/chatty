import React, {Component} from 'react';
import Message            from './Message.jsx';

class MessageList extends Component {

  render() {
    return (
      <div>
        {
          this.props.messages.map((msg) => {
            return (
              <Message userName = {msg.username}
                       content  = {msg.content}
                       key      = {msg.msgId}
              />
            )
          })
        }
      </div>
    )
  }

}

export default MessageList;