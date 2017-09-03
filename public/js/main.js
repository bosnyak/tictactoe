const Game = function () {
    let roomId;
    var socket = io('http://localhost');
    socket.on('rooms', function (rooms) {
        console.log(rooms)
        rooms.forEach(room=>{
            $('.roomList').append('<li class="room" data-room-id="'+room.id+'">'+room.name+'</li>')
        })
        
        //socket.emit('my other event', { my: 'data' });
    });
    socket.on('room id', function(data){
        roomId = data;
        $('#roomId').text(roomId)
        console.log(roomId)

    })
    $('#create').click(function(){
        socket.emit('create room',{name:$('#roomName').val()});
    })
}