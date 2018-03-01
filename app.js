// var sign = prompt("What's your sign?");

let ticTacToe = {
  firstPlayer: null,
  turnNumber: 1,
  board: Array(9).fill('', 0),
  chooseFirstPlayer: function() {
    return Math.floor(Math.random() * 2) + 1;
  }
};

let handlers = {

};

let view = {
  setUpEventListeners: function() {
    let cells = document.getElementsByClassName('cell');
    for (let cell of cells) {
      cell.addEventListener('click', function() {alert('hi')});
    }
  }
};

view.setUpEventListeners();