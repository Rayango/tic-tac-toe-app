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
  },
  checkForWinner: function(mostRecentMove, piece) {
    if (this.checkHorizontal(mostRecentMove, piece) || this.checkVertical(mostRecentMove, piece) || this.checkLeftToBottom(mostRecentMove, piece) || this.checkRightToBotom(mostRecentMove, piece)) {
      return true;
    }
    return false;
  },
  checkHorizontal: function(mostRecentMove, piece) {
    if (mostRecentMove <= 2 && board[0] === piece && board[1] === piece && board[2] === piece) {
      return true;
    } else if (mostRecentMove <= 5 && board[3] === piece && board[4] === piece && board[5] === piece) {
      return true;
    } else if (mostRecentMove <= 8 && board[6] === piece && board[7] === piece && board[8] === piece) {
      return true;
    }
    return false;
  },
  checkVertical: function(mostRecentMove, piece) {
    let columnTop = mostRecentMove;
    while (columnTop > 2) {
      columnTop -= 3;
    }
    if (columnTop === 0 && board[0] === piece && board[3] === piece && board[6] === piece) {
      return true;
    } else if (columnTop === 1 && board[1] === piece && board[4] === piece && board[7] === piece) {
      return true;
    } else if (columnTop === 2 && board[2] === piece && board[5] === piece && board[8] === piece) {
      return true;
    }
    return false;
  },
  checkLeftToBottom: function(mostRecentMove, piece) {
    return board[0] === piece && board[4] === piece && board[8] === piece;
  },
  checkRightToBotom: function(mostRecentMove, piece) {
    return board[2] === piece && board[4] === piece && board[6] === piece;
  }
};

let handlers = {
  addPiece: function(cell) {
    let index = this.getIndexOfCell(cell.id);
    if (this.verifyMove(index)) {
      let piece = ticTacToe.playerForCurrentTurn ? ticTacToe.piece['1'] : ticTacToe.piece['0'];
      ticTacToe.board[index] = cell.innerHTML = piece;
      if (!ticTacToe.checkForWinner(index, piece)) {
        ticTacToe.playerForCurrentTurn = !ticTacToe.playerForCurrentTurn;
        ticTacToe.turnNumber++;
      }  
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
