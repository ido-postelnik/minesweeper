export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const setMinesLocation = (boardWidth, boardHeight, minesNumber) => {
  let remainedMines = minesNumber;
  let randomRow, randomCol;
  let retVal = [];

  for (let row = 0; row < boardHeight; row++) {
    retVal.push([]);
    for (let col = 0; col < boardWidth; col++) {
      retVal[row][col] = false;
    }
  }

  while (remainedMines > 0) {
    randomRow = randomInt(0, boardHeight - 1);
    randomCol = randomInt(0, boardWidth - 1);

    if (retVal[randomRow][randomCol] !== true) {
      retVal[randomRow][randomCol] = true;
      remainedMines--;
    }
  }
  return retVal;
};

export const getNeighboursCoordinates = (row, col, boardWidth, boardHeight) => {
  let retVal = [];

  if (row > 0) { retVal.push([row - 1, col]) }                                  // up [row - 1][col]
  if (row > 0 && col < boardWidth - 1) { retVal.push([row - 1, col + 1]) }           // up-right    [row - 1][col + 1]
  if (col < boardWidth - 1) { retVal.push([row, col + 1]) }                          // right       [row][col+1]
  if (row < boardHeight - 1 && col < boardWidth - 1) { retVal.push([row + 1, col + 1]) }  // right-down  [row + 1][col + 1]
  if (row < boardHeight - 1) { retVal.push([row + 1, col]) }                         // down        [row + 1][col]
  if (row < boardHeight - 1 && col > 0) { retVal.push([row + 1, col - 1]) }          // down-left   [row + 1][col - 1]
  if (col > 0) { retVal.push([row, col - 1]) }                                  // left        [row][col - 1]
  if (row > 0 && col > 0) { retVal.push([row - 1, col - 1]) }                   // up-left     [row - 1][col - 1]

  return retVal; // [[i, j], [i,j]]
}