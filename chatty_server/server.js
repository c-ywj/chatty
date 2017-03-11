const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

let connects = 0;

  function onMessage(message) {
  let parsedMsg = JSON.parse(message)

  if(parsedMsg.type === "postMessage") {
    let msgResponse = {"uuid": uuid.v1(),
                       "username": parsedMsg.username,
                       "type": "incomingMessage",
                       "content": parsedMsg.content}
    let stringifiedMsgResponse = JSON.stringify(msgResponse)
    wss.broadcast(stringifiedMsgResponse)
  } else if(parsedMsg.type === "postNotification") {
    let notiResponse = {"uuid": uuid.v1(),
                        "type": "incomingNotification",
                        "content": parsedMsg.content}
    let stringifiedNotiResponse = JSON.stringify(notiResponse)
    wss.broadcast(stringifiedNotiResponse)
  }
}

wss.broadcast = function(data) {
  wss.clients.forEach(function(client) {
    if(client.readyState === client.OPEN) {
      client.send(data);
    }
  });
}
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  users = {type: 'users', users: connects += 1};
  console.log(users.users, "connected");
  wss.clients.forEach(function(client) {
    client.send(JSON.stringify(users))
  })

  //what happens when clients send messages
  ws.on('message', onMessage);

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')
    users = {type: 'users', users: connects -= 1};
    console.log(users.users, "remaining")
    wss.clients.forEach(function(client) {
      client.send(JSON.stringify(users))
    })
  });
});