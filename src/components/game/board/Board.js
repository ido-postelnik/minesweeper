import React, { useEffect, useCallback, useState } from "react";

import { Cell, MakeCell } from "../Cell/Cell";
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

  // trigger createBoard opun change in one of the dependencies
  const { width, height, minesLocation } = props.gameSettings;
  useEffect(() => {
    createBoard(width, height, minesLocation);
  }, [width, height, minesLocation, createBoard]);

  //#endregion

  const cellClickHandler = (cell, isShiftPressed) => {
    // logic for the entire board
    let updatedBoard = board;
    
    if(isShiftPressed) {
      debugger;
      updatedBoard[cell.row][cell.col].isFlagged = !board[cell.row][cell.col].isFlagged;
      // setBoard(updatedBoard);
    }
    else {
      debugger;
      // only if the cell is not flagged
      if (!updatedBoard[cell.row][cell.col].isFlagged) {
        let minedNeighboursAmount = getMinedNeighboursAmount();
        if (minedNeighboursAmount > 0) {
          updatedBoard[cell.row][cell.col].minedNeighboursAmount = minedNeighboursAmount;
        }
      }
    }

    setBoard(updatedBoard);

    props.onPlayerStep();
    // like updating the steps and the remaining flags
  };

  const getMinedNeighboursAmount = () => {
    debugger;
    let retVal = 8;


    return retVal;
  };

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
