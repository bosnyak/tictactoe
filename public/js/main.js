const Game = function () {
    let roomId;
    var socket = io();
    let type;
    $('.board').hide();
    $('.back').hide();
    $('.message').hide();
    socket.on('rooms', rooms => {
        $('.room-list').html('')
        rooms.forEach(room => {
            $('.room-list').append('<li class="room waves-effect" data-room-id="' + room.id + '">' + room.name + '</li>')
        })

        //socket.emit('my other event', { my: 'data' });
    });
    socket.on('room id', data => {
        roomId = data;
        $('#roomId').text(roomId)
        $('.buttons-screen').remove();
        $('.back').show();
        $('.message').show();
        $('.message').html('Waiting opponent connect')
    })

    socket.on('player join', () => {
        $('.buttons-screen').remove();
        $('.message').show();
        $('.back').show();
        $('.board').show();
        $('.message').html('Player joined')
    })
    socket.on('player left', () => {
        $('.message').html('Opponent disconnected\nWaiting opponent connect')
        resetBoard();
        $('.board').hide();
    })

    socket.on('game start', () => {
        //$('.message').html('Waiting opponent connect')
    })
    socket.on('my type', myType => {
        type = myType;

    })
    socket.on('renderBoard', board => {
        renderBoard(board);

    })
    socket.on('turn', turn => {
        let message;
        if (turn == type) {
            message = 'Your turn'
        } else {
            message = 'Opponent turn'
        }
        $('.message').html(message)
    })
    socket.on('gameIsOver', win => {
       
        if (win.type == 0) {
            $('.message').html('Draw\nGame restarting in 3 sec')
        } else {
            if (win.type == type) {
                $('.message').html('You win\nGame restarting in 3 sec')
            } else {
                $('.message').html('You lose\nGame restarting in 3 sec')
            }
        }
        resetBoard();
    })
    $('#create').click(function () {
        socket.emit('create room', { name: $('#roomName').val() });

    })
    $('body').on('click', '.room', function () {

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
                    board[i][j] == 1 ? board[i][j] = 'O' : board[i][j] = 'X'
                    $('td[data-row=' + i + '][data-col=' + j + ']').append('<div class="check">' + board[i][j] + '</div>')
                }
            }
        }
    }
    function resetBoard() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {


                $('td[data-row=' + i + '][data-col=' + j + ']').html('')

            }
        }
    }
}