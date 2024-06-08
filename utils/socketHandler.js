const io = require('socket.io')();

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('message', (data) => {
    io.emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

module.exports = io;