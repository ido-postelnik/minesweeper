import React from "react";

import ScorePanel from "../../game/scorePanel/ScorePanel";
import Board from "../../game/board/Board";
import "./Main.scss";

const Main = () => {
  return (
    <main className="main p-x-20 p-t-5 p-b-20">
      <ScorePanel className="score-panel"></ScorePanel>
      <Board></Board>
    </main>
  );
};

export default Main;
