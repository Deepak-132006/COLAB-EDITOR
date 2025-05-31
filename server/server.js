const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

app.use(cors()); // enable CORS for all routes

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // allow requests from your React app
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('send-changes', (data) => {
    socket.broadcast.emit('receive-changes', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = 5001;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
