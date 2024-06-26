const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.json());

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.post('/data', (req, res) => {
  const { device, value } = req.body;
  console.log(`Data received from ${device}: ${value}`);

  // Emit data to connected clients
  io.emit('data-update', req.body);

  res.status(200).send('Data received');
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
