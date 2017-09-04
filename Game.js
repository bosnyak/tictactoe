module.exports = function (io, roomId) {
    this.players = []
    this.board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]]

    for (let key in io.sockets.adapter.rooms[roomId].sockets) {
        this.players.push(key)
    }
    let type = Math.floor(Math.random() * 2) + 1

    io.sockets.connected[this.players[0]].type = type;
    type == 1 ? io.sockets.connected[this.players[1]].type = 2 : io.sockets.connected[this.players[1]].type = 1;

    console.log(io.sockets.connected[this.players[0]].type)
    console.log(io.sockets.connected[this.players[1]].type)
    io.sockets.connected[this.players[0]].emit('my type', io.sockets.connected[this.players[0]].type)
    io.sockets.connected[this.players[1]].emit('my type', io.sockets.connected[this.players[1]].type)
    io.sockets.in(roomId).emit('game start')

    this.showPlayers = function () {
        console.log(this.players)
    }

    this.check = function (type, row, col) {
        if (this.board[row][col] == 0) {
            this.board[row][col] = type;
            this.renderBoard();
            
        }
        
    }

    this.renderBoard = function () {
        io.sockets.in(roomId).emit('renderBoard', this.board)
    }

}