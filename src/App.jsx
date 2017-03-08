import React, {Component} from 'react';
import ChatBar            from './ChatBar.jsx';
import MessageList        from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentUser: {name: "seewhy"},
      messages: [
        {
          msgId: 0,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          msgId: 1,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    }
  }

  componentDidMount() {
  console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {msgId: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  addNewMessage(msg) {
    let messages = this.state.messages
    this.setState({messages: messages.concat(msg)})
  }

  render() {
    return (
      <div>
        <ChatBar currentUser={this.state.currentUser.name}></ChatBar>
        <MessageList messages={this.state.messages}></MessageList>
      </div>
    )
  }
}
export default App;