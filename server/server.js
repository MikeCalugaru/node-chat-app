const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = new express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', function(socket) {
  console.log('New user connected');
  
//  socket.emit('newEmail', {
//    from: 'mike@example.com',
//    text: 'Hey. What is going on',
//    createdAt: 123
//  });
  
  socket.on('disconnect', function(socket) {
    console.log('Client disconnected');
  });
  
//  socket.on('createEmail', (newEmail) => {
//    console.log('createEmail', newEmail);
//  });
  
  socket.emit('newMessage', {
    from: 'userAndrew',
    text: 'Hello user, let\' meet at 6',
    createdAt: 123
  });
  
  socket.on('createNewMessage', function(newMessage) {
    console.log(newMessage);
  });
  
});



server.listen(port, () => {
  console.log('Listening on port 3000');
});
