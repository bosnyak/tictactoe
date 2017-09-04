const Game = function () {
    let roomId;
    var socket = io('http://localhost');
    let type;
    $('.board').hide();
    $('.back').hide();
    $('.message').hide();
    socket.on('rooms', rooms => {
        console.log(rooms)
        console.log('veio rooms')
        $('.room-list').html('')
        rooms.forEach(room => {
            $('.room-list').append('<li class="room waves-effect" data-room-id="' + room.id + '">' + room.name + '</li>')
        })

        //socket.emit('my other event', { my: 'data' });
    });
    socket.on('room id', data => {
        roomId = data;
        $('#roomId').text(roomId)
        console.log(roomId)
        $('.buttons-screen').remove();
        $('.back').show();
        $('.message').show();
        $('.message').html('Waiting opponent connect')
    })

    socket.on('player join', () => {
        console.log('player join')
        $('.buttons-screen').remove();
        $('.message').show();
        
        $('.board').show();
        $('.message').html('Player joined')
    })
    socket.on('player left', () => {
        $('.message').html('Waiting opponent connect')
    })

    socket.on('game start', () => {
        //console.log('meu tipo'+socket['abc'])
        //$('.message').html('Waiting opponent connect')
    })
    socket.on('my type', (myType) => {
        type = myType;

        console.log('meu tipo ' + type)
    })
    socket.on('renderBoard', (board) => {
        renderBoard(board);

    })
    $('#create').click(function () {
        socket.emit('create room', { name: $('#roomName').val() });

    })
    $('body').on('click', '.room', function () {
        console.log('clicou')

        console.log($(this).attr('data-room-id'))
        socket.emit('join room', { id: $(this).attr('data-room-id') })

    })
    $('td').click(function () {
        //$(this).append('<div class="check">X</div>')

        socket.emit('check', { type: type, row: $(this).attr('data-row'), col: $(this).attr('data-col') })
    })

    function renderBoard(board) {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] == 0) {

                } else {
                    board[i][j] == 1 ?  board[i][j] = 'O' : board[i][j] = 'X'
                    $('td[data-row=' + i + '][data-col=' + j + ']').append('<div class="check">' + board[i][j] + '</div>')
                }
            }
        }
    }
}