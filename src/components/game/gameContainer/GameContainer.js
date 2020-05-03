import React, { useContext } from "react";

import ScorePanel from '../scorePanel/ScorePanel';
import Board from '../board/Board';
import { GameContext } from '../../../shared/context/game-context';
import "./GameContainer.scss";

const GameContainer = () => {

  const gameContext = useContext(GameContext);

  return (
    <div className="game-container">
      {/* {Object.keys(gameContext.gameSettings).map((item) => (
        <p>{gameContext.gameSettings[item]}</p>
      ))} */}
      <ScorePanel className="score-panel"></ScorePanel>
      <Board gameSettings={gameContext.gameSettings}></Board>
    </div>
  );
};

export default GameContainer;
