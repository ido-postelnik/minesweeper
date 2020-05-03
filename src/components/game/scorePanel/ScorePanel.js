import React from "react";

import Card from "../../uiElements/Card/Card";
import "./ScorePanel.scss";

const ScorePanel = () => {
  return (
    <div className="score-panel">
      <Card label="Time" content="10:10" ></Card>
      <Card label="Steps count" content="10"></Card>
      <Card label="Remaining flags" content="5"></Card>
    </div>
  );
};

export default ScorePanel;
