const express = require('express');
const { Server } = require("socket.io");
const { createServer } = require('http');
const { join } = require('node:path');

const app = express();
const server = createServer(app);
const io = new Server(server);

let users = {};

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // When user registers or logs in
  

  // Private messaging


  // Group joining
  

  // Group message
  

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    for (let userId in users) {
      if (users[userId] === socket.id) delete users[userId];
    }
  });
});

server.listen(3005, () => {
  console.log('Server running at http://localhost:3005');
});