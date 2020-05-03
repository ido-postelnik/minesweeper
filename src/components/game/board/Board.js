import React, { useEffect, useCallback, useState } from "react";

import { Cell, MakeCell } from '../cell/Cell';
import "./Board.scss";

const Board = (props) => {

  const [board, setBoard] = useState([]);

  //#region Init functionlity
  const createBoard = useCallback((width, height, minesLocation) => {
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

    setBoard(retVal);

    return retVal;
  }, []);

  const { width, height, minesLocation } = props.gameSettings;

  useEffect(() => {
    createBoard(width, height, minesLocation);
  }, [width, height, minesLocation, createBoard]);

  //#endregion

  const cellClickHandler = (cell, isShiftPressed) => {
    debugger;
    // Call onCellClick function that inside cell - to do inner cell stuff
    // cell.onCellClick(isShiftPressed);

    // logic for the entire board
    // like updating the steps and the remaining flags
  };

  return (
    <div className="board m-b-20">
      {/* {Object.keys(props.gameSettings).map((item) => (
        <p>{props.gameSettings[item]}</p>
      ))} */}

      {board.map((row, rowIndex) => {
        return (
          <div className="board-row" key={rowIndex}>
            {row.map((col, colIndex) => {
              return (
                <Cell
                  className="cell"
                  key={`${rowIndex}-${colIndex}`}
                  row={rowIndex}
                  col={colIndex}
                  isMined={col.isMined}
                  isFlagged={col.isFlagged}
                  // data={col}
                  onCellEvent={cellClickHandler}
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
