import React, { useEffect, useCallback, useState } from "react";

import { Cell, MakeCell } from "../Cell/Cell";
import "./Board.scss";

const Board = (props) => {

  const [board, setBoard] = useState([]);

  //#region Init functionlity
  const initBoard = useCallback((width, height, minesLocation) => {
    let retVal = [];

    for (let row = 0; row < height; row++) {
      retVal.push([]);
      for (let col = 0; col < width; col++) {
        let cell = new MakeCell(row, col, minesLocation[row][col]);
        retVal[row][col] = cell;
      }
    }

    setBoard(retVal);

    return retVal;
  }, []);

  // trigger initBoard opun change in one of the dependencies (i.e new game started)
  const { width, height, minesLocation } = props.gameSettings;
  useEffect(() => {
    initBoard(width, height, minesLocation);
  }, [width, height, minesLocation, initBoard]);

  //#endregion

  const cellClickHandler = (row, col, isShiftPressed) => {
    // logic for the entire board
    let updatedBoard = board;
    
    if(isShiftPressed === true) {
      let isFlagged = updatedBoard[row][col].isFlagged;
      if (isFlagged === true) {
        updatedBoard[row][col].isFlagged = !board[row][col].isFlagged;
        props.onFlagEvent(1);
      }
      else {
        props.onFlagEvent(-1);
        if (props.remainingFlags > 0) {
          updatedBoard[row][col].isFlagged = !board[row][col].isFlagged;
        }
      }

    }
    else {
      // debugger;
      // only if the cell is not flagged
      if (!updatedBoard[row][col].isFlagged === true) {
        if (updatedBoard[row][col].isMined === true) {
          // You lost
          props.onGameOver();
        }
        else {
          props.onStepEvent();

          let minedNeighboursAmount = getMinedNeighboursAmount(row, col);
          if (minedNeighboursAmount > 0) {
            updatedBoard[row][col].minedNeighboursAmount = minedNeighboursAmount;
          }
          else {
            // No Neighbours with mine - let the magic begin! - based on BFS
          }
        }

      }
    }

    setBoard(updatedBoard);
  };

  const getMinedNeighboursAmount = (row, col) => {
    let neighboursCoordinates = getNeighboursCoordinates(row, col);
    let retVal = 0;

    if (neighboursCoordinates.length > 0) {
      let neighbourRow;
      let neighbourCol;
      neighboursCoordinates.forEach(neighbour => {
        neighbourRow = neighbour[0];
        neighbourCol = neighbour[1];

        if (board[neighbourRow][neighbourCol].isMined === true) {
          retVal++;
        }
      });
    }

    return retVal;
  };

  const getNeighboursCoordinates = (row, col) => {
    let retVal = [];

    if (row > 0) { retVal.push([row - 1, col]) }                                  // up [row - 1][col]
    if (row > 0 && col < width - 1) { retVal.push([row - 1, col + 1]) }           // up-right    [row - 1][col + 1]
    if (col < width - 1) { retVal.push([row, col + 1]) }                          // right       [row][col+1]
    if (row < height - 1 && col < width - 1) { retVal.push([row + 1, col + 1]) }  // right-down  [row + 1][col + 1]
    if (row < height - 1) { retVal.push([row + 1, col]) }                         // down        [row + 1][col]
    if (row < height - 1 && col > 0) { retVal.push([row + 1, col - 1]) }          // down-left   [row + 1][col - 1]
    if (col > 0) { retVal.push([row, col - 1]) }                                  // left        [row][col - 1]
    if (row > 0 && col > 0) { retVal.push([row - 1, col - 1]) }                   // up-left     [row - 1][col - 1]

    return retVal;
  }

  return (
    <div className="board m-b-20">
      {/* {Object.keys(props.gameSettings).map((item) => (
        <p>{props.gameSettings[item]}</p>
      ))} */}

      {board.map((row, rowIndex) => {
        return (
          <div className="board-row" key={rowIndex}>
            {row.map((cell, colIndex) => {
              return (
                <Cell
                  className="cell"
                  key={`${rowIndex}-${colIndex}`}
                  row={rowIndex}
                  col={colIndex}
                  isMined={cell.isMined}
                  isFlagged={cell.isFlagged}
                  minedNeighboursAmount={cell.minedNeighboursAmount}
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
