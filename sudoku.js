// Return board or null if solution doesn't exist
function solveSudoku(board) {
  if (solve(board)) {
    return board;
  } else {
    return null;
  }
}
// Main function
function solve(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        // To find an empty cell
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, row, col, num)) {
            // Check if num is valid
            board[row][col] = num;
            if (solve(board)) return true; // Continue solving
            board[row][col] = 0; // Backtrack
          }
        }
        return false; // No valid num
      }
    }
  }
  return true; // Solved
}

function isValid(board, row, col, num) {
  // Check if same number appears in row
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num) return false;
  }
  // Check if same number appears in column
  for (let x = 0; x < 9; x++) {
    if (board[x][col] === num) return false;
  }
  // Check if same number appears in 3x3 sub-grid
  let startRow = Math.floor(row / 3) * 3;
  let startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i + startRow][j + startCol] === num) return false;
    }
  }
  return true;
}

// GUI
const sudokuBoard = document.getElementById("sudokuBoard");
const clearBtn = document.getElementById("clearBtn");
const solveBtn = document.getElementById("solveBtn");

// The grid
for (let i = 0; i < 9; i++) {
  const row = sudokuBoard.insertRow();
  for (let j = 0; j < 9; j++) {
    const cell = row.insertCell();
    const input = document.createElement("input");
    input.type = "number";
    input.max = 9;
    input.min = 1;
    cell.appendChild(input);
  }
}

// Solve button function
solveBtn.onclick = function () {
  const board = getBoardFromInputs();
  const solvedBoard = solveSudoku(board);
  if (solvedBoard) {
    updateInputsFromBoard(solvedBoard);
  } else {
    alert("No solution for the given board");
  }
};

// Clear button function
clearBtn.onclick = function () {
  const inputs = sudokuBoard.getElementsByTagName("input");
  for (let input of inputs) {
    input.value = "";
  }
};

function getBoardFromInputs() {
  const board = [];
  const rows = sudokuBoard.getElementsByTagName("tr");
  for (let i = 0; i < 9; i++) {
    const row = [];
    const cells = rows[i].getElementsByTagName("td");
    for (let j = 0; j < 9; j++) {
      const value = cells[j].getElementsByTagName("input")[0].value;
      row.push(value === "" ? 0 : parseInt(value));
    }
    board.push(row);
  }
  return board;
}

function updateInputsFromBoard(board) {
  const rows = sudokuBoard.getElementsByTagName("tr");
  for (let i = 0; i < 9; i++) {
    const cells = rows[i].getElementsByTagName("td");
    for (let j = 0; j < 9; j++) {
      cells[j].getElementsByTagName("input")[0].value = board[i][j];
    }
  }
}
