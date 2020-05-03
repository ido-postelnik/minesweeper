import React from "react";

import FlagImage from '../../../assets/images/flag.svg';
import MineImage from "../../../assets/images/mine.svg";
import "./Cell.scss";

const Cell = (props) => {
  const cellEventHandler = (event) => {
    let isShiftPressed = event.shiftKey ? true : false;

    props.onCellEvent(props.row, props.col, isShiftPressed);
  };

  return (
    <div className={`cell ${props.isRevealed && 'is-revealed'}`} onClick={cellEventHandler}>
      {props.isFlagged ? <img src={FlagImage} alt="Flag" /> : props.minedNeighboursAmount > 0 && props.isRevealed ? <span className="mined-neighbours">{props.minedNeighboursAmount}</span> : ''}
      {/* {props.isMined ? <img src={MineImage} alt="Flag" /> : ''} */}
      {/* {props.minedNeighboursAmount > 0 ? <span className="mined-neighbours">{props.minedNeighboursAmount}</span> : ''} */}
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
};

export { Cell, MakeCell };