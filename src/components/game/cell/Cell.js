import React from "react";

import "./Cell.scss";

const Cell = (props) => {
  return (
    <div className="cell">
      <span>{props.value}</span>
    </div>
  );
};

export default Cell;
