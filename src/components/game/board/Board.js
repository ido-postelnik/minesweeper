import React from "react";

import Cell from '../cell/Cell';
import "./Board.scss";

const CELL = {

};
const DUMMY_BOARD = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20]
];

const Board = () => {
  return (
    <div class="board">
      {DUMMY_BOARD.map((row) => {
        return (
          <div className="board-row">
            {row.map((col) => {
              return <Cell value={col} className="cell"></Cell>;
            })}
          </div>
        );
      })}
      
    </div>
  );
};

export default Board;
