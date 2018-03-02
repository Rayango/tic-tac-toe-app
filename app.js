// var sign = prompt("What's your sign?");

let ticTacToe = {
  score: {playerOne: 0, playerTwo: 0},
  gameState: true,
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
    document.getElementById('header').innerHTML = this.playerForCurrentTurn ? '<h1> Player One Goes First! </h1>' : '<h1> Player Two Goes First! </h1>';
  },
  checkForWinner: function(mostRecentMove, piece) {
    if (this.checkHorizontal(mostRecentMove, piece) || this.checkVertical(mostRecentMove, piece) || this.checkLeftToBottom(mostRecentMove, piece) || this.checkRightToBotom(mostRecentMove, piece)) {
      return true;
    }
    return false;
  },
  checkHorizontal: function(mostRecentMove, piece) {
    let board = ticTacToe.board;
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
    let board = ticTacToe.board;
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
    let board = ticTacToe.board;
    return board[0] === piece && board[4] === piece && board[8] === piece;
  },
  checkRightToBotom: function(mostRecentMove, piece) {
    let board = ticTacToe.board;
    return board[2] === piece && board[4] === piece && board[6] === piece;
  }
};

let handlers = {
  addPiece: function(cell) {
    if (!ticTacToe.gameState) {
      document.getElementById('header').innerHTML = '<h1> Press New Game to start a new game! </h1>';
      return;
    }

    let index = this.getIndexOfCell(cell.id);
    if (this.verifyMove(index)) {
      let piece = ticTacToe.playerForCurrentTurn ? ticTacToe.piece['1'] : ticTacToe.piece['0'];
      ticTacToe.board[index] = piece;
      view.updateBoard(cell, piece);
      if (ticTacToe.checkForWinner(index, piece)) {
        document.getElementById('header').innerHTML = ticTacToe.playerForCurrentTurn ? '<h1> Player One Wins! </h1>' : '<h1> Player Two Wins! </h1>';  
        ticTacToe.playerForCurrentTurn ? ticTacToe.score.playerOne += 1 : ticTacToe.score.playerTwo += 1;
        ticTacToe.gameState = !ticTacToe.gameState;
        view.updateScore();
      } else {
        ticTacToe.playerForCurrentTurn = !ticTacToe.playerForCurrentTurn;
        ticTacToe.turnNumber++;
        if (ticTacToe.turnNumber < 10) {
          document.getElementById('header').innerHTML = ticTacToe.playerForCurrentTurn ? '<h1> Player One\'s Turn! </h1>' : '<h1> Player Two\'s Turn! </h1>';
        } else {
          document.getElementById('header').innerHTML = '<h1> Cat\'s Game! </h1>';
          ticTacToe.gameState = false;
        }
      }
    } else {
      document.getElementById('header').innerHTML = ticTacToe.playerForCurrentTurn ? '<h1> Invalid move! Try again P1! </h1>' : '<h1> Invalid Move! Try again P2! </h1>';
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
  },
  startNewGame: function() {
    ticTacToe.board = Array(9).fill('', 0);
    ticTacToe.gameState = true;
    ticTacToe.playerForTurnOne = !ticTacToe.playerForCurrentTurn;
    ticTacToe.playerForCurrentTurn = ticTacToe.playerForTurnOne;
    ticTacToe.turnNumber = 1;
    view.createNewGameView();
  }
};

let view = {
  setUpEventListeners: function() {
    let cells = document.getElementsByClassName('cell');
    for (let cell of cells) {
      cell.addEventListener('click', (e) => handlers.addPiece(e.target));
    }
  }, 
  updateBoard: function(cell, piece) {
    cell.innerText = piece;
  },
  updateScore: function() {
    document.getElementById('playerOneScore').innerText = ticTacToe.score.playerOne;
    document.getElementById('playerTwoScore').innerText = ticTacToe.score.playerTwo;
  },
  createNewGameView: function() {
    let cells = document.getElementsByClassName('cell');
    for (let cell of cells) {
      cell.innerText = '';
    }
    document.getElementById('header').innerHTML = ticTacToe.playerForTurnOne ? '<h1> Player One Goes First! </h1>' : '<h1> Player Two Goes First! </h1>';
  }
};

view.setUpEventListeners();
ticTacToe.chooseFirstPlayer();
