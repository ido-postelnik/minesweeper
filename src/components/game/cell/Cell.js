import React, { useState, useEffect } from "react";

import FlagImage from '../../../assets/images/flag.svg';
import MineImage from "../../../assets/images/mine.svg";
import "./Cell.scss";

const Cell = (props) => {
  const [cell, setCell] = useState({
    row: props.row,
    col: props.col,
    isMined: props.isMined,
    isFlagged: props.isFlagged
  });

  useEffect(() => {
    setCell({
      row: props.row,
      col: props.col,
      isMined: props.isMined,
      isFlagged: props.isFlagged,
    });
  }, [props]);

  const cellEventHandler = (event) => {
    let isShiftPressed = event.shiftKey ? true : false;

    if (isShiftPressed === true) {
      // debugger;
      setCell({
        row: props.row,
        col: props.col,
        isMined: props.isMined,
        isFlagged: !cell.isFlagged,
      });

    }
    else {
      debugger;
    }

    props.onCellEvent(props.data, isShiftPressed);
  };

  return (
    <div className="cell" onClick={cellEventHandler}>
      {cell.isFlagged ? <img src={FlagImage} alt="Flag" /> : ""}
      {cell.isMined ? <img src={MineImage} alt="Flag" /> : ""}
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
    // if (isShiftPressed === true) {
    //   this.isFlagged = !this.isFlagged;
    // }
  };
};

export { Cell, MakeCell };