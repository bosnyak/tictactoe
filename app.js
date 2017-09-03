const express = require('express')
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const shortid = require('shortid');

app.use(express.static('public'));

let rooms = []
io.on('connection', function (socket) {
  let roomId;
  socket.emit('rooms', rooms);
  socket.on('my other event', function (data) {
    console.log(data);
  });
  socket.on('create room', (room) => {
    console.log(room)
    roomId = shortid.generate();
    rooms.push({id:roomId, name:room.name})
    socket.join(roomId, function () {
      socket.emit('room id', roomId)
    })
  })
  socket.on('disconnect', function () {
    rooms = rooms.filter(room => {
      return room.id !== roomId
    })
  });
});


server.listen(80);
