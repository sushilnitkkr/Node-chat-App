const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname,'../public');
var app = express();
//const port = 3000;
var server = http.createServer(app);
var io = socketIO(server);
var port = process.env.PORT||  3000;
app.use(express.static(publicPath));
io.on('connection',(socket)=>{
  console.log('New user connected');
  socket.on('disconnect',()=>{
    console.log('User was Disconnected');
  });
});

server.listen(port,()=>{
  console.log(`server is up on ${port}`);
});
