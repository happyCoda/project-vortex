let express = require('express'),
    io = require('socket.io'),
    config,
    app,
    server,
    ioServer,
    connections = [],
    messages = [];

config = {
    port: 3002
};
app = express();
app.use(express.static('./public'));
server = app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}!`);
});
ioServer = io.listen(server);
ioServer.sockets.on('connection', (socket) => {

    socket.emit('messages', messages);

    socket.once('disconnect', () => {
        console.log(`socket ${socket.id} has been disconnected!`);
        connections.splice(connections.indexOf(socket), 1);
        socket.disconnect();
    });
    connections.push(socket);
    console.log(`sockets connected: ${connections.length}`);

    socket.on('message', (message) => {
      messages.push(message);
      emitMessages(connections, 'messages', messages);
      console.log(`Message received: ${JSON.stringify(message)}`);
    });

    socket.on('removeMessage', (messageId) => {
      messageId = parseInt(messageId, 10);
      messages = messages.filter((item) => {
        return item.id !== messageId;
      });
      emitMessages(connections, 'messages', messages);
    });
});

function emitMessages(items, evt, data) {
  items.forEach((item) => {
    item.emit(evt, data);
  });
}
