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
    this.addNewMessage = this.addNewMessage.bind(this)
  }

  componentDidMount() {
    this.mySocket = new WebSocket("ws://localhost:3001");
    console.log("componentDidMount <App />");
    this.mySocket.onmessage = (event) => {
      console.log(event.data)
      let msg = JSON.parse(event.data)
      let newMessage = this.state.messages.concat(msg)
      this.setState({messages: newMessage})
    }

  }


  addNewMessage(ev) {
    if(ev.key === "Enter") {
      let message = {
        content: ev.target.value,
        username: this.state.currentUser.name,
        msgId: Date.now()
      }
      this.mySocket.send(JSON.stringify(message))
      ev.target.value = ""
    }
  }

  render() {
    return (
      <div>
        <ChatBar currentUser={this.state.currentUser.name} addNewMessage={this.addNewMessage}></ChatBar>
        <MessageList messages={this.state.messages}></MessageList>
      </div>
    )
  }
}
export default App;