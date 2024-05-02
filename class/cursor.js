const Screen = require("./screen");

class Cursor {

  constructor(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;

    this.row = 0;
    this.col = 0;

    this.gridColor = 'red';
    this.cursorColor = 'yellow';

  }

  resetBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.gridColor);
  }

  setBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.cursorColor);
  }

  up() {
    if (this.row > 0) {
      this.resetBackgroundColor();
      console.log(this.row);
      this.row--;
      console.log(this.row);
      this.setBackgroundColor();
      Screen.render();
    }
  }

  down() {
    if (this.row < this.maxRow) {
      this.resetBackgroundColor();
      console.log(this.row);
      this.row++;
      console.log(this.row);
      this.setBackgroundColor();
      Screen.render();
    }
  }

  left() {
    if (this.col > 0) {
      this.resetColor();
      this.col--;
      this.setColor();
      Screen.render();
    }
  }

  right() {
    if (this.col < this.maxCol) {
      this.resetColor();
      this.col++;
      this.setColor();
      Screen.render();
    }
  }

}


module.exports = Cursor;
