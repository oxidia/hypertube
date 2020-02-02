module.exports = io => {
  io.on('connection', client => {
    console.log('User connected');

    client.on('offer', data => {
      console.log('New offer');
      client.broadcast.emit('new-offer', data);
    });
  });
};
