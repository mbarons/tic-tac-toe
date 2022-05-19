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

const reset = ((board) => {
  const reset = () => {
 
}
  return {reset};
});

const playAgain = (() => {
  let playAgainContainer = document.querySelector(".play-again-container");
  let playAgainButton = document.createElement("button");

  const showButton = () => {
  playAgainButton.textContent = "Play Again";
  playAgainButton.classList.add("play-again");
  playAgainContainer.appendChild(playAgainButton);
}
  const resetTile = (tile) => {
    tile.textContent = "";
  }
  const reset = () => {
    gameFlow.board.forEach(tile => resetTile(tile));
    playAgainContainer.removeChild(playAgainButton);
    gameboard.resultContainer.textContent = "";
  }

  const click = () => {
    playAgainButton.addEventListener("click", reset)
  }

return {showButton, reset, click};
})();

const gameFlow = (() => {
  let board = gameboard.board; //store the array of tiles
  let winningRows = gameboard.rows; //store winning rows
  let player1 = Player("×");
  let cpu = Player("○");

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
    for (let tile of board) {
      // add click event for every tile
      tile.addEventListener("click", () => {
        if (checkIfTie(board, winningRows)) { //If tie do nothing
        } else {
            if (tile.textContent != "") {
            } //if the tile clicked is different than empty, do nothing.
            else {
              if (checkIfOver(winningRows)) {
              } //if the game is already over, do nothing.
              else {
                tile.textContent = player1.symbol;
                tile.classList.add("player");
                tile.classList.remove("cpu");
                if (checkIfOver(winningRows)) {
                  gameboard.resultContainer.textContent = "You Won"; //if the game is over this turn, prints the winner
                  playAgain.showButton();
                  playAgain.click();
                }
                if (checkIfTie(board, winningRows)) {
                  gameboard.resultContainer.textContent = "That was a tie!"; //If tie prints tie;
                  playAgain.showButton();
                  playAgain.click();
              }
            
          } //the code below is to generate a random play for cpu
            let random;
            do {
            random = Math.floor(Math.random() * 9);
            if (checkIfOver(winningRows)){break}
            if (checkIfTie(board, winningRows)){break};
          }
            while (board[random].textContent != "");
            if (checkIfOver(winningRows) || checkIfTie(board, winningRows)) {
            } 
            else {
            board[random].textContent = cpu.symbol;
            board[random].classList.add("cpu");
            board[random].classList.remove("player");
            if (checkIfOver(winningRows)) {
              gameboard.resultContainer.textContent = "CPU Won";
              playAgain.showButton();
              playAgain.click();
                }
              }
          
        }}
      });
    }
  };
  return { display, board };
})();
gameFlow.display();
