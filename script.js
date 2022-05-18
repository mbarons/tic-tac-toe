const gameboard = (() => {
  let board = Array.from(document.querySelectorAll(".tile")); //define array of tiles

  const rows = [
    // define the rows that wins the game
    [board[0], board[1], board[2]],
    [board[3], board[4], board[5]],
    [board[6], board[7], board[8]],
    [board[0], board[3], board[6]],
    [board[1], board[4], board[7]],
    [board[2], board[5], board[8]],
    [board[0], board[4], board[8]],
    [board[2], board[4], board[6]],
  ];

  const resultContainer = document.querySelector(".result");

  return { board, rows, resultContainer };
})();

const Player = (symbol) => {
  //define the players and their symbols
  return { symbol };
};

const gameFlow = (() => {
  let board = gameboard.board; //store the array of tiles
  let winningRows = gameboard.rows; //store winning rows
  let player1 = Player("×");
  let player2 = Player("○");

  const checkIfTie = (board, rows) => {
    if (board.every((tile) => tile.textContent != "" ) && checkIfOver(rows) === false) { //if every tile is not empty and there is not a winner, returns true for a tie.
      return true;
    }
  };

  const checkIfOver = (board) => {
    let over = false;
    for (z = 0; z <= board.length - 1; z++) {
      if (board[z][0].textContent == "") {
        over = false; //goes over every tile of the winnable row, if the first is empty, returns false for over
      } else if (
        board[z][0].textContent === board[z][1].textContent &&
        board[z][0].textContent == board[z][2].textContent
      ) {
        over = true;
        break; //if the 3 tiles of the winnable row are equal, return true for over and break the loop.
      }
    }
    return over; //return over
  };

  const display = () => {
    let i = 1; //define a counter to alternate between players
    for (let tile of board) {
      // add click event for every tile
      tile.addEventListener("click", () => {
        if (checkIfTie(board, winningRows)) { //If tie do nothing
        } else {
          if (i == 1) {
            if (tile.textContent != "") {
            } //if the tile clicked is different than empty, do nothing.
            else {
              if (checkIfOver(winningRows)) {
              } //if the game is already over, do nothing.
              else {
                tile.textContent = player1.symbol;
                i++; //if game not over, prints player1 symbol and change the counter to alternate to player2
                if (checkIfOver(winningRows)) {
                  gameboard.resultContainer.textContent = "Player1 Won"; //if the game is over this turn, prints the winner
                }
              }
            }
          } else if (i == 2) {
            //this is the same as above, but for player2
            if (tile.textContent != "") {
            } else {
              if (checkIfOver(winningRows)) {
              } else {
                tile.textContent = player2.symbol;
                tile.classList.add("cpu");
                i--;
                if (checkIfOver(winningRows)) {
                  gameboard.resultContainer.textContent = "Player2 Won";
                }
              }
            }
          }
          if (checkIfTie(board, winningRows)) {
            gameboard.resultContainer.textContent = "TIE"; //If tie prints tie;
          }
        }
      });
    }
  };

  return { display };
})();

gameFlow.display();
