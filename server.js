const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

let buzzedList = [];

io.on('connection', (socket) => {
  socket.on('buzz', (name) => {
    if (!buzzedList.includes(name)) {
      buzzedList.push(name);
      io.emit('buzzedList', buzzedList);
    }
  });

  socket.on('reset', () => {
    buzzedList = [];
    io.emit('reset');
  });
});

server.listen(3000, () => {
  console.log('サーバー起動中：http://localhost:3000');
});
