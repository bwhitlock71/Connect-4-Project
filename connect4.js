/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

// var WIDTH = 7;
// var HEIGHT = 6;

const WIDTH = 7;
const HEIGHT = 6;

// MY COMMENTS //

let currPlayer = 1 || 2; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

//MY COMMENTS//

function makeBoard() {
  for (let y = 0; y < HEIGHT; y++) { // Loop through the array staring at 0 and ending at 5
    board.push(Array.from({ length: WIDTH })); //Is this pulling the const = board ouside of the function?
  }
}
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array


/** makeHtmlBoard: make HTML table and row of column tops. */

// MY COMMENTS //


function makeHtmlBoard() {
  const htmlBoard = document.getElementById('board'); // Selects the table with the id="board"
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"

  // MY COMMENTS //
  const top = document.createElement("tr"); // Creates a new table row 
  top.setAttribute("id", "column-top"); // The new table row with the id of column top
  top.addEventListener("click", handleClick); // Adds an event listener for clicking on any column at the top  

  for (let x = 0; x < WIDTH; x++) { // for loop that iterates through WIDTH and stops at 6(runs horizontal)
    const headCell = document.createElement("td"); // creates idividual content cells 
    headCell.setAttribute("id", x); //  ??
    top.append(headCell); // appends new element to the top of the const headCell
  }
  htmlBoard.append(top); // appends to top

  // END OF MY COMMENTS CURRENTLY //



  // TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) { // for loop that iterates through HEIGHT and stops at 5(runs vertical) 
    const row = document.createElement("tr"); // creates new individual rows for HEIGHT
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
  // TODO: write the real version of this, rather than always returning 0
  
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  const piece = document.createElement('div');
  piece.classList.add('piece');
  piece.classList.add(`p${currPlayer}`);
  piece.style.top = -50 * (y + 2);

  const spot = document.getElementById(`${y}-${x}`);
  spot.append(piece);
  // TODO: make a div and insert into correct table cell
}

/** endGame: announce game end */

function endGame(msg) {
  alert(msg);
  // TODO: pop up alert message
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  if (board.every(row => row.every(cell => cell))) {
    return endGame('Tie!');
  }
  // TODO: check if all cells in board are filled; if so call, call endGame

  // switch players
  currPlayer = currPlayer === 1 ? 2 : 1;
  // TODO: switch currPlayer 1 <-> 2
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
