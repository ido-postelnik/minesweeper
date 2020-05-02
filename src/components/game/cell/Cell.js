import React from "react";

import FlagImage from '../../../assets/images/flag.png';
import MineImage from '../../../assets/images/mine.png';
import "./Cell.scss";

const Cell = (props) => {
  debugger;
  const cellEventHandler = (event) => {
    let isShiftPressed = event.shiftKey ? true : false

    props.onCellEvent(props.data, isShiftPressed);
  };
  return (
    <div className="cell" onClick={cellEventHandler}>
      {props.data.isFlagged ? <img src={FlagImage} alt="Flag" /> : ""}
      {props.data.isMined ? <img src={MineImage} alt="Flag" /> : ""}
      {/* {props.data.isMined ? <span>{props.data.isMined}</span> : <span>no</span>} */}
    </div>
  );
};

function MakeCell(row, col, isMined) {
  this.row               = row;
  this.col               = col;
  this.isMined           = isMined;
  this.neighbourHasBombs = 0; // todo - needed?
  this.isFlagged         = false;
  this.isRevealed        = false;
  this.onCellClick = (isShiftPressed) => {
    debugger;
    //update cell state
    if (isShiftPressed === true) {
      this.isFlagged = !this.isFlagged;
    }
  };
};

export { Cell, MakeCell };