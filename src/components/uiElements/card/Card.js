import React from "react";

import "./Card.scss";

const Card = (props) => {
  return (
    <div className="card m-x-10">
      <p className="card-content m-t-0 m-b-10">{props.content}</p>
      <h2 className="card-label m-y-0">{props.label}</h2>
    </div>
  );
};

export default Card;
