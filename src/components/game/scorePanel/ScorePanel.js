import React from "react";

import Card from '../../uiElements/Card/Card';
import StopWatch from '../../game/StopWatch/StopWatch';
import "./ScorePanel.scss";

const ScorePanel = (props) => {
  return (
    <div className="score-panel">
      <StopWatch isFirstMove={props.isFirstMove}></StopWatch>
      <Card label="Steps" content={props.steps}></Card>
      <Card label="Remaining flags" content={props.remainingFlags}></Card>
    </div>
  );
};

export default ScorePanel;
