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
          uuid: 0,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          uuid: 1,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    }
    this.addNewMessage = this.addNewMessage.bind(this)
  }

  componentDidMount() {
    this.mySocket = new WebSocket("ws://localhost:3001");
    // console.log("componentDidMount <App />");
    this.mySocket.onmessage = (event) => {
      console.log(event.data)
      let msg        = JSON.parse(event.data)
      let newMessage = this.state.messages.concat(msg)
      this.setState({messages: newMessage})
    }
  }

  handleChangeUser = (ev) => {
    this.setState({
      currentUser: {name: ev.target.value}
    })
  }

  addNewMessage(ev) {
    if(ev.key === "Enter") {
      let message = {
        type    : "postMessage",
        content : ev.target.value,
        username: this.state.currentUser.name
      }
      this.mySocket.send(JSON.stringify(message))
      ev.target.value = ""
    }
  }

  addNewNotification = (ev) => {
    if(ev.key === "Enter") {
      let noti = {
        type    : "postNotification",
        content : this.state.currentUser.name + " has changed their name to " + ev.target.value
      }
      this.mySocket.send(JSON.stringify(noti))
      this.handleChangeUser(ev)
    }
  }

  render() {
    return (
      <div>
        <ChatBar
          addNewMessage      = {this.addNewMessage}
          user               = {this.state.currentUser.name}
          addNewNotification = {this.addNewNotification}
        />
        <MessageList
          messages           = {this.state.messages}
        />
      </div>
    )
  }
}
export default App;