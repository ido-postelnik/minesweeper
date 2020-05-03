import React, { useContext, useState, useEffect } from "react";

import ScorePanel from "../ScorePanel/ScorePanel";
import Board from "../Board/Board";
import { GameContext } from '../../../shared/context/game-context';
import { setMinesLocation } from "../../../shared/utils/utils";
import "./GameContainer.scss";

const GameContainer = () => {
  const gameContext = useContext(GameContext);

  useEffect(() => {
    setSteps(0);
    setRemainingFlags(gameContext.gameSettings.mines)
  }, [gameContext])

  const [steps, setSteps] = useState(0);
  const [remainingFlags, setRemainingFlags] = useState(gameContext.gameSettings.mines);

  const remainingFlagsHandler = (val) => {
    if(remainingFlags === 0 && val === 0) {
      alert('😔 Oh snap, You ran out of flags!');
    }
    else {
      setRemainingFlags(remainingFlags + val);
    }
  };

  const stepsHandler = () => {
    setSteps(steps + 1);
  };

  const lossHandler = () => {
    alert(`😓 Game over.. Let's try again!`);

    startNewGame();
  };

  const gameWinHandler = () => {
    alert(`✨ Yay! We have a winner! ✨`);

    startNewGame();
  };

  const startNewGame = () => {
    let width = gameContext.gameSettings.width;
    let height = gameContext.gameSettings.height;
    let mines = gameContext.gameSettings.mines;

    gameContext.onStartNewGame({
      width,
      height,
      mines,
      minesLocation: setMinesLocation(width, height, mines),
    });
  };

  return (
    <div className="game-container">
      <ScorePanel className="score-panel" steps={steps} remainingFlags={remainingFlags}></ScorePanel>
      <Board 
        gameSettings={gameContext.gameSettings} 
        onStepEvent={stepsHandler} 
        onFlagEvent={remainingFlagsHandler} 
        onGameOver={lossHandler}
        onGameWin={gameWinHandler}
        remainingFlags={remainingFlags}></Board>
    </div>
  );
};

export default GameContainer;
