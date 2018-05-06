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
  
  socket.emit('newMessage', {
    from: 'admin',
    text: 'Welcome to the chat app'
  });
  socket.broadcast.emit('newMessage', {
    from: 'admin',
    text: 'New user joined'
  });
  
  socket.on('createMessage', function(message) {
    console.log('Create message', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
//    socket.broadcast.emit('newMessage', {
//      from: message.from,
//      text: message.text,
//      createdAt: new Date().getTime()
//    });
  });
  
   socket.on('disconnect', function(socket) {
    console.log('Client disconnected');
  });
  
});

server.listen(port, () => {
  console.log('Listening on port 3000');
});
