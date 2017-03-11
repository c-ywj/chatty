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
    this.mySocket.onopen = (event) => {
      console.log("connected to server")
    }
    this.mySocket.onmessage = (event) => {
      if(event) {
        let data = JSON.parse(event.data)
        if(data.type === 'users') {
          this.setState({users: data.users})
        } else {
            let newMessage = this.state.messages.concat(data)
            this.setState({messages: newMessage})
          }
      }
    }
    console.log(this.state.users)
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
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="navbar-users">{this.state.users} Users online</span>
        </nav>
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