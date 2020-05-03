import React, { useEffect, useCallback, useState } from "react";

import { getNeighboursCoordinates } from '../../../shared/utils/utils';
import { Cell, MakeCell } from "../Cell/Cell";
import "./Board.scss";

let minedFlagsCounter;

const Board = (props) => {
  const [board, setBoard] = useState([]);

  //#region Init functionlity
  const initBoard = useCallback((width, height, minesLocation) => {
    minedFlagsCounter = 0;
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
        // debugger;
        props.onFlagEvent(1);
      }
      else {
        // Set cell with flag
        if (props.remainingFlags === 0) {
          props.onFlagEvent(0);
        }
        if (props.remainingFlags > 0 && updatedBoard[row][col].isRevealed === false) {
          updatedBoard[row][col].isFlagged = !board[row][col].isFlagged;
          props.onFlagEvent(-1);
        }

        // Update minedFlagsCounter
        if (updatedBoard[row][col].isMined === true && board[row][col].isFlagged === true) {
          minedFlagsCounter = minedFlagsCounter + 1;

          if (minedFlagsCounter === props.gameSettings.mines) {
            props.onGameWin(); // We have a winner!
          }
        }
      }
    }
    else {
      // Do logic only if the cell is not flagged and it does not revealed yet
      if (updatedBoard[row][col].isFlagged === false && updatedBoard[row][col].isRevealed === false) {
        if (updatedBoard[row][col].isMined === true) {
          // You lost
          props.onGameOver();
        }
        else {
          let minedNeighboursAmount = getMinedNeighboursAmount(row, col);
          if (updatedBoard[row][col].isFlagged === false) {
            updatedBoard[row][col].isRevealed = true;
          }
          // updatedBoard = setIsRevealed(updatedBoard, row, col);

          if (minedNeighboursAmount > 0) {
            updatedBoard[row][col].minedNeighboursAmount = minedNeighboursAmount;
            
          }
          else {
            // No Neighbours with mine - let the magic begin! - based on BFS
            let startingCell = updatedBoard[row][col];
            // let visited = [];
            let queue = [startingCell];
            
            while (queue.length > 0) {
              // debugger;
              const cell = queue.shift(); 

              if (updatedBoard[cell.row][cell.col].isFlagged === false) {
                debugger;
                updatedBoard[cell.row][cell.col].isRevealed = true; // visited
              }
              // updatedBoard = setIsRevealed(updatedBoard, cell.row, cell.col);

              let neighboursCoordinates = getNeighboursCoordinates(cell.row, cell.col, width, height);
              let neighbourRow;
              let neighbourCol;
              let minedNeighboursAmount;

              neighboursCoordinates.forEach(neighbour => {
                neighbourRow = neighbour[0]; // row
                neighbourCol = neighbour[1]; // col
                minedNeighboursAmount = getMinedNeighboursAmount(neighbourRow, neighbourCol);

                if (updatedBoard[neighbourRow][neighbourCol].isRevealed !== true && minedNeighboursAmount === 0 && updatedBoard[neighbourRow][neighbourCol].isFlagged === false) {
                  queue.push(board[neighbourRow][neighbourCol]);
                }
                else {
                  updatedBoard[neighbourRow][neighbourCol].minedNeighboursAmount = minedNeighboursAmount;
                }

                if(updatedBoard[neighbourRow][neighbourCol].isFlagged === false) {
                  debugger;
                  updatedBoard[neighbourRow][neighbourCol].isRevealed = true; // visited
                } 
                // updatedBoard = setIsRevealed(updatedBoard, neighbourRow, neighbourCol);

              });
            }
          }

          props.onStepEvent(); // Increase steps counter
        }
      }
    }

    setBoard(updatedBoard);
  };

  // const setIsRevealed = (board, row, col) => {
  //   if (board[row][col].isFlagged === false) {
  //     debugger;
  //     board[row][col].isRevealed = true; // visited
  //   } 
  //   // board[row][col].isRevealed = true;
  //   return board;
  // };

  const getMinedNeighboursAmount = (row, col) => {
    let neighboursCoordinates = getNeighboursCoordinates(row, col, width, height);
    let retVal = 0;

    if (neighboursCoordinates.length > 0) {
      let neighbourRow;
      let neighbourCol;
      neighboursCoordinates.forEach(neighbour => {
        neighbourRow = neighbour[0]; // row
        neighbourCol = neighbour[1]; // col

        if (board[neighbourRow][neighbourCol].isMined === true) {
          retVal++;
        }
      });
    }

    return retVal;
  };

  return (
    <div className="board m-b-20">
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
                  isRevealed={cell.isRevealed}
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
