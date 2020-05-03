export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const setMinesLocation = (width, height, minesNumber) => {
  let remainedMines = minesNumber;
  let randomRow, randomCol;
  let retVal = [];

  for (let row = 0; row < height; row++) {
    retVal.push([]);
    for (let col = 0; col < width; col++) {
      retVal[row][col] = false;
    }
  }

  while (remainedMines > 0) {
    randomRow = randomInt(0, height - 1);
    randomCol = randomInt(0, width - 1);

    if (retVal[randomRow][randomCol] !== true) {
      retVal[randomRow][randomCol] = true;
      remainedMines--;
    }
  }
  return retVal;
};