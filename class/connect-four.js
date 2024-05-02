const Screen = require("./screen");
const Cursor = require("./cursor");

class ConnectFour {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' ']]

    this.cursor = new Cursor(6, 7);

    // Initialize a 6x7 connect-four grid
    Screen.initialize(6, 7);
    Screen.setGridlines(true);

    // Replace this with real commands
    // Screen.addCommand('t', 'test command (remove)', ConnectFour.testCommand);
    Screen.addCommand('up', 'Up', this.cursor.up.bind(this.cursor));
    Screen.addCommand('left', 'Left', this.cursor.left.bind(this.cursor));
    Screen.addCommand('right', 'Right', this.cursor.right.bind(this.cursor));
    Screen.addCommand('down', 'Down', this.cursor.down.bind(this.cursor));
    Screen.addCommand('return', 'Place move', this.placeMove.bind(this));

    this.cursor.setBackgroundColor();
    Screen.render();
  }

  // Remove this
  // static testCommand() {
  //   console.log("TEST COMMAND");
  // }

  static checkWin(grid) {
    const directions = [
        [0, 1], [1, 0], [1, 1], [1, -1]  // Horizontal, Vertical, Diagonal Right, Diagonal Left
    ];
    const rows = grid.length;
    const cols = grid[0].length;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (grid[row][col] === ' ') continue;
            let player = grid[row][col];

            for (let [dx, dy] of directions) {
                let count = 0;
                let r = row, c = col;

                while (r >= 0 && r < rows && c >= 0 && c < cols && grid[r][c] === player) {
                    r += dx;
                    c += dy;
                    count++;
                }

                if (count >= 4) return player;  // Player wins
            }
        }
    }

    // Check if the game is a tie (no empty cells)
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (grid[row][col] === ' ') return false;  // The game has not ended
        }
    }

    return 'T';  // The game is a tie
  }

  placeMove() {
    if (this.grid[this.cursor.row][this.cursor.col] === ' ') {
      this.grid[this.cursor.row][this.cursor.col] = this.playerTurn;
      this.playerTurn = this.playerTurn === 'O' ? 'X' : 'O';
      Screen.setGrid(this.cursor.row, this.cursor.col, this.grid[this.cursor.row][this.cursor.col]);
      Screen.render();

      let winner = ConnectFour.checkWin(this.grid);
      if (winner) {
        ConnectFour.endGame(winner);
      }
    }
  }


  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = ConnectFour;
