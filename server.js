const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let buzzed = false;

app.use(express.static('public'));

io.on('connection', (socket) => {
  socket.on('buzz', (name) => {
    if (!buzzed) {
      buzzed = true;
      io.emit('buzzed', name);
    }
  });

  socket.on('reset', () => {
    buzzed = false;
    io.emit('reset');
  });
});

server.listen(3000, () => {
  console.log('サーバー起動中：http://localhost:3000');
});
