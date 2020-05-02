import React from "react";

import { randomInt } from "../../../shared/utils/utils";
import Cell from '../cell/Cell';
import "./Board.scss";

// todo - should MakeCell be somewhere else?
function MakeCell(row, col, isMined) {
  this.row               = row;
  this.col               = col;
  this.isMined           = isMined;
  this.neighbourHasBombs = 0; // todo - needed?
  this.isFlagged         = false;
  this.isRevealed        = false;
  this.onCellClick       = () => {
    debugger;
  };
};

const Board = (props) => {
  //#region Main functionlity
  const createBoard = (width, height, minesNumber) => {
    let minesLocation = setMinesLocation(width, height, minesNumber);
    let retVal = [];
    
    for (let row = 0; row < height; row++) {
      retVal.push([]);
      for (let col = 0; col < width; col++) {
        let cell = new MakeCell(row, col, minesLocation[row][col]);
        retVal[row][col] = `${cell.isMined ? cell.isMined : ''}`;
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
                  value={col}
                  key={`${rowIndex}-${colIndex}`}
                  className="cell"
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
