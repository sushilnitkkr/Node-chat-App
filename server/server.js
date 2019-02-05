const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname,'../public');
var app = express();
//const port = 3000;
const {generateMessage,generateLocationMessage} =require('./utils/message');
var server = http.createServer(app);
var io = socketIO(server);
var port = process.env.PORT||  3000;
app.use(express.static(publicPath));
io.on('connection',(socket)=>{
  console.log('New user connected');
  // socket.emit('newMessage',{ // emit data by server to client
  //   from:'sushile',
  //   createdAt:123
  // });
  // socket.emit from Admin text Welcome to thechat Application
  socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
    // from:'Admin',
    // text:'Welcome to the chat app',
    // createdAt: new Date().getTime()
//  });
  //socket.broadcast.emit from admin text new user joined
  socket.broadcast.emit('newMessage',generateMessage('Admin','New user loined'));
  // {
  //   from:'Admin',
  //   text:'New User Joined',
  //   createdAt: new Date().getTime()
  // });
  socket.on('createMessage',(message, callback) => {
  console.log('createMessage',message);
  io.emit('newMessage',generateMessage(message.from, message.text));  // another method to send data
callback('This is from server.'); // event acknowledgements
  // {                 //to broadcast to everyone user
  //   from:message.from,
  //   text:message.text,
  //   createdAt: new Date().getTime()
  // });
  // socket.broadcast.emit('newMessage',{    // broadcast to all other active user not self
  //   from:message.from,
  //   text:message.text,
  //   createdAt: new Date().getTime()
  // });
  });
  socket.on('createGeolocationMessage',(coords)=>{    // to send location to all connected user
    //io.emit('newMessage',generateMessage('Admin',`${coords.latitude},${coords.longitude}` ));
io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
  });
  socket.on('disconnect',()=>{
    console.log('User was Disconnected');
  });
});

server.listen(port,()=>{
  console.log(`server is up on ${port}`);
});
