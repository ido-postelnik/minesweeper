import React, { useEffect, useCallback, useState, useContext } from "react";

import { Cell, MakeCell } from "../Cell/Cell";
import { getNeighboursCoordinates } from '../../../shared/utils/utils';
import { GameContext } from '../../../shared/context/game-context';
import "./Board.scss";

let minesFlaggedCounter;

const Board = (props) => {
  const { isGameLost, isFirstMove, onFirstMove } = useContext(GameContext);
  const [board, setBoard] = useState([]);
  const { width, height, minesLocation } = props.gameSettings;

  // Init board
  const initBoard = useCallback((width, height, minesLocation) => {
    minesFlaggedCounter = 0;
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

  // Trigger initBoard upon change in one of the game settings dependencies (i.e --> new game started)
  useEffect(() => {
    initBoard(width, height, minesLocation);
  }, [width, height, minesLocation, initBoard]);

  // Handler cell click event
  const cellClickHandler = (row, col, isShiftPressed) => {
    if (isFirstMove === false) {
      onFirstMove(true);
    }

    if (isGameLost !== true) {
      let updatedBoard = board;

      if (isShiftPressed === true) {
        updatedBoard = onShiftAndClickEvent(board, row, col);
      }
      else if (board[row][col].isFlagged === false && board[row][col].isRevealed === false) {
        // Do logic only if the cell is not flagged and it does not revealed yet
        updatedBoard = onClickEvent(board, row, col);
      }

      setBoard(updatedBoard);
    }
    else {
      props.onGameOver();
    }
  };

  //#region helper functions
  const onShiftAndClickEvent = (board, row, col) => {
    let updatedBoard = board;

    let isFlagged = board[row][col].isFlagged;

    if (isFlagged === true) {
      if (board[row][col].isMined === true) {
        minesFlaggedCounter = minesFlaggedCounter - 1;
      }

      updatedBoard[row][col].isFlagged = !board[row][col].isFlagged;
      props.onFlagEvent(-1);
    }
    else {
      if (props.remainingFlags === 0) {
        props.onFlagEvent(0);
      }
      else if (props.remainingFlags > 0 && board[row][col].isRevealed === false) {
        updatedBoard[row][col].isFlagged = !board[row][col].isFlagged;
        props.onFlagEvent(1);
      }

      // Update minesFlaggedCounter
      if (board[row][col].isMined === true && board[row][col].isFlagged === true) {
        minesFlaggedCounter = minesFlaggedCounter + 1;

        if (minesFlaggedCounter === props.gameSettings.mines) {
          props.onGameWin(); // We have a winner!
        }
      }
    }

    return updatedBoard;
  }

  const onClickEvent = (board, row, col) => {
    let updatedBoard = board;

    if (board[row][col].isMined === true) {
      props.onGameOver(); // You lost
    }
    else {
      let minedNeighboursAmount = getMinedNeighboursAmount(row, col);

      if (updatedBoard[row][col].isFlagged === false) {
        updatedBoard[row][col].isRevealed = true;
      }

      if (minedNeighboursAmount > 0) {
        updatedBoard[row][col].minedNeighboursAmount = minedNeighboursAmount;

      }
      else {
        updatedBoard = revealNotMinedNeighbours(board, row, col);
      }

      props.onStepEvent(); // Increase steps counter
    }

    return updatedBoard;
  }

  const revealNotMinedNeighbours = (board, row, col) => {
    // Based on BFS algorithm
    let updatedBoard = board;

    let startingCell = updatedBoard[row][col];
    // let visited = [];
    let queue = [startingCell];

    while (queue.length > 0) {
      const cell = queue.shift();

      if (updatedBoard[cell.row][cell.col].isFlagged === false) {
        updatedBoard[cell.row][cell.col].isRevealed = true; // visited
      }

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

        if (updatedBoard[neighbourRow][neighbourCol].isFlagged === false) {
          updatedBoard[neighbourRow][neighbourCol].isRevealed = true; // visited
        }

      });
    }

    return updatedBoard;
  };

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
  //#endregion

  return (
    <div className="board-wrapper m-b-20">
      <div className="board m-auto">      
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
    </div>
  );
};

export default Board;
