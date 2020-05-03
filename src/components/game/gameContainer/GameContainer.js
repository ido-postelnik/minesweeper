import React, { useContext, useState, useEffect } from "react";

import ScorePanel from "../ScorePanel/ScorePanel";
import Board from "../Board/Board";
import { GameContext } from '../../../shared/context/game-context';
import "./GameContainer.scss";

const GameContainer = () => {
  const gameContext = useContext(GameContext);

  useEffect(() => {
    setSteps(0);
  }, [gameContext])

  const [steps, setSteps] = useState(0);

  const remainingFlagsHandler = () => {

  };

  const stepsHandler = () => {
    let s = steps + 1;
    setSteps(s);
  };

  return (
    <div className="game-container">
      {/* {Object.keys(gameContext.gameSettings).map((item) => (
        <p>{gameContext.gameSettings[item]}</p>
      ))} */}
      <ScorePanel className="score-panel" steps={steps}></ScorePanel>
      <Board gameSettings={gameContext.gameSettings} onPlayerStep={stepsHandler}></Board>
    </div>
  );
};

export default GameContainer;
