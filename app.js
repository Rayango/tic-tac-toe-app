// var sign = prompt("What's your sign?");

let ticTacToe = {
  playerForTurnOne: null,
  playerForCurrentTurn: null,
  turnNumber: 1,
  piece: {
    1: 'x',
    0: 'o'
  },
  board: Array(9).fill('', 0),
  chooseFirstPlayer: function() {
    let playerThatGoesFirst = Math.floor(Math.random() * 2);
    this.playerForCurrentTurn = playerThatGoesFirst;
    this.playerForTurnOne = playerThatGoesFirst;
  }
};

let handlers = {
  addPiece: function(cell) {
    let index = this.getIndexOfCell(cell.id);
    if (this.verifyMove(index)) {
      ticTacToe.board[index] = cell.innerHTML = ticTacToe.playerForCurrentTurn ? ticTacToe.piece['1'] : ticTacToe.piece['0'];
      ticTacToe.turnNumber++;
      ticTacToe.playerForCurrentTurn = !ticTacToe.playerForCurrentTurn;
    }
  },
  getIndexOfCell: function(id) {
    switch(id) {
      case 'topLeft':
        return 0;
      case 'topMid':
        return 1;
      case 'topRight':
        return 2;
      case 'midLeft':
        return 3;
      case 'midMid':
        return 4;
      case 'midRight':
        return 5;
      case 'bottomLeft':
        return 6;
      case 'bottomMid':
        return 7;
      case 'bottomRight':
        return 8;      
    }
  },
  verifyMove: function(index) {
    return !ticTacToe.board[index];
  }
};

let view = {
  setUpEventListeners: function() {
    let cells = document.getElementsByClassName('cell');
    for (let cell of cells) {
      cell.addEventListener('click', (e) => handlers.addPiece(e.target));
    }
  }
};

view.setUpEventListeners();
ticTacToe.chooseFirstPlayer();
