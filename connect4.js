/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */


const WIDTH = 7;
const HEIGHT = 6;



let currPlayer = 1 || 2; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */



function makeBoard() {
  for (let y = 0; y < HEIGHT; y++) { // For loop that runs through the array staring at 0 and must be less than the HEIGHT which is 6. Each time the loop is executed we increase by 1(y++).
    board.push(Array.from({ length: WIDTH })); // This takes our empty array (const board = []) and pushes into a new array with the WIDTH of 7. 
  }
}
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array


/** makeHtmlBoard: make HTML table and row of column tops. */




function makeHtmlBoard() {
  const htmlBoard = document.getElementById('board'); // Selects the table with the id="board"
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"

  const top = document.createElement("tr"); // Creates a new variable with the name of top, creates a new table row.
  top.setAttribute("id", "column-top"); // Our new tr now has the id of "column-top".
  top.addEventListener("click", handleClick); // Adds an event listener for clicking on any column at the top.  

  for (let x = 0; x < WIDTH; x++) { // For loop that runs through WIDTH, starts at 0 and stops at 7, each time the loop is executed it is increased by 1(x++).
    const headCell = document.createElement("td"); // Creates new variable with the name of headcell, which then creates new individual content cells(td).
    headCell.setAttribute("connect-id", x); // Takes our new td and gives it the id of x.
    top.append(headCell); // Appends new element to the top of the headCell.
  }
  htmlBoard.append(top); // Appends to top of the board where we drop our pieces in.





  // TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) { // For loop that runs through HEIGHT, starts at 0 and stops at 6, each the time the loop is executed it is increased by 1(y++).
    const row = document.createElement("tr"); // Creates new variable with the name of row, creates a new table row.
    for (let x = 0; x < WIDTH; x++) { // For loop that runs through WIDTH, starts at 0 and stops at 7, each time the loop is executed it is increased by 1(x++).
      const cell = document.createElement("td"); // Creates new variable with the name of cell, which then creates new idividual content cells(td).
      cell.setAttribute("id", `${y}-${x}`); // Sets the cell with an id of `${y}-${x}`.
      row.append(cell); // Appends the new td to the variable row.
    }
    htmlBoard.append(row); // Appends to our htmlBoard creating rows.
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  for (let y = HEIGHT - 1; y >= 0; y--) { // For loop that runs through the HEIGHT, decreases by one each time the loop is executed(y--).
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
  // TODO: write the real version of this, rather than always returning 0
  
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  const piece = document.createElement('div'); // Creates a new variable with the name of piece.
  piece.classList.add('piece'); // Adds the classlist of 'piece'.
  piece.classList.add(`p${currPlayer}`); // Adds a classlist for which player added their piece.
  piece.style.top = -50 * (y + 2); // ??

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

    return cells.every( // Checks is every cell meets the requirments made.
      ([y, x]) => // Arrow function that has the arguments of ([y, x]).
        y >= 0 && // Is y greater than or equal to 0 and..
        y < HEIGHT && // Is y less than the HEIGHT and..
        x >= 0 && // Is x greater than or equal to x and..
        x < WIDTH && // Is x less than the WIDTH and..
        board[y][x] === currPlayer // If all are true match to the current player.
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) { // For loop that runs through HEIGHT, starts at 0 and ends at 6, each time the code is executed it is increased by 1(y++).
    for (let x = 0; x < WIDTH; x++) { // For loop that runs through WIDTH, starts at 0 and ends at 7, each time the code is executed it is increased by 1(x++).
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]; // Checks if there are 4 pieces that are in a row and the same color horizontially.
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]]; // Checks if there are 4 pieces that are in a row and the same color vertically.
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]]; // Checks if there are 4 pieces that are in a row and the same color diagonally to the right.
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]]; // Checks if there are 4 pieces that are in a row and the same color diagonally to the left.

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) { // If any of these conditions are met then it will return true which will end the game.
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
