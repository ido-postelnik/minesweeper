import React from "react";

import { randomInt } from "../../../shared/utils/utils";
import { Cell, MakeCell } from '../cell/Cell';
import "./Board.scss";

const Board = (props) => {
  //#region Main functionlity
  const createBoard = (width, height, minesNumber) => {
    let minesLocation = setMinesLocation(width, height, minesNumber);
    let retVal = [];
    
    for (let row = 0; row < height; row++) {
      retVal.push([]);
      for (let col = 0; col < width; col++) {
        let cell = new MakeCell(row, col, minesLocation[row][col]);
        retVal[row][col] = cell;
        // retVal[row][col] = `${cell.isMined ? cell.isMined : ''}`;
        // retVal[row][col] = `${cell.row} = ${cell.col}`;
      }
    }

    return retVal;
  };
  

  const setMinesLocation = (width, height, minesNumber) => {
    let remainedMines = minesNumber;
    let randomRow, randomCol;
    let retVal = [];

    for (let row = 0; row < height; row++) {
      retVal.push([]);
      for (let col = 0; col < width; col++) {
        retVal[row][col] = false;
      }
    }
  
    while(remainedMines > 0) {
      randomRow = randomInt(0, height - 1);
      randomCol = randomInt(0, width - 1);

      if (retVal[randomRow][randomCol] !== true) {
        retVal[randomRow][randomCol] = true;
        remainedMines--;
      }
    }
    return retVal;
  };

  const cellClickHandler = (cell, isShiftPressed) => {
    debugger;
    // Call onCellClick function that inside cell - to do inner cell stuff
    cell.onCellClick(isShiftPressed);

    // logic for the entire board
    // like updating the steps and the remaining flags
  };

  //#endregion
  
  //#region Init game
  const { width, height, mines } = props.gameSettings;
  const BOARD = createBoard(width, height, mines);

  //#endregion

  return (
    <div className="board m-b-20">
      {/* {Object.keys(props.gameSettings).map((item) => (
        <p>{props.gameSettings[item]}</p>
      ))} */}

      {BOARD.map((row, rowIndex) => {
        return (
          <div className="board-row" key={rowIndex}>
            {row.map((col, colIndex) => {
              return (
                <Cell
                  className="cell"
                  data={col}
                  onCellEvent={cellClickHandler}
                  key={`${rowIndex}-${colIndex}`}
                ></Cell>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
