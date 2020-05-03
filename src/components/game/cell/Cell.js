import React, { useState, useEffect } from "react";

import FlagImage from '../../../assets/images/flag.svg';
import MineImage from "../../../assets/images/mine.svg";
import "./Cell.scss";

const Cell = (props) => {
  debugger;
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
    debugger;
    let isShiftPressed = event.shiftKey ? true : false;

    props.onCellEvent(cell, isShiftPressed);
  };

  return (
    <div className="cell" onClick={cellEventHandler}>
      {props.isFlagged ? <img src={FlagImage} alt="Flag" /> : ''}
      {props.isMined ? <img src={MineImage} alt="Flag" /> : ''}
      {props.minedNeighboursAmount > 0 ? <span>{props.minedNeighboursAmount}</span> : ''}
    </div>
  );
};

function MakeCell(row, col, isMined) {
  this.row                   = row;
  this.col                   = col;
  this.isMined               = isMined;
  this.minedNeighboursAmount = 0;
  this.isFlagged             = false;
  this.isRevealed            = false;
  this.onCellClick = (isShiftPressed) => {
    debugger;
    //update cell state
    // if (isShiftPressed === true) {
    //   this.isFlagged = !this.isFlagged;
    // }
  };
};

export { Cell, MakeCell };