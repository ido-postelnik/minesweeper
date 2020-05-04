import React, { useContext, useState, useEffect } from "react";

import ScorePanel from "../ScorePanel/ScorePanel";
import Board from "../Board/Board";
import { GameContext } from '../../../shared/context/game-context';
import { setMinesLocation } from "../../../shared/utils/utils";
import "./GameContainer.scss";

const GameContainer = () => {
  const { gameSettings, onRevealBombs, onStartNewGame, onFirstMove } = useContext(GameContext);

  useEffect(() => {
    setSteps(0);
    setRemainingFlags(gameSettings.mines)
  }, [gameSettings])

  const [steps, setSteps] = useState(0);
  const [remainingFlags, setRemainingFlags] = useState(gameSettings.mines);


  const remainingFlagsHandler = (val) => {
    if(remainingFlags === 0 && val === 0) {
      alert('😔 Oh snap, You ran out of flags!');
    }
    else {
      setRemainingFlags(remainingFlags - val);
    }
  };

  const stepsHandler = () => {
    setSteps(steps + 1);
  };

  const lossHandler = () => {
    alert(`😓 Game over.. Let's try again!`);

    onRevealBombs('GAME_OVER', true);
  };

  const gameWinHandler = () => {
    alert(`✨ Yay! We have a winner! ✨`);

    startNewGame();
  };

  const startNewGame = () => {
    let width = gameSettings.width;
    let height = gameSettings.height;
    let mines = gameSettings.mines;

    onStartNewGame({
      width,
      height,
      mines,
      minesLocation: setMinesLocation(width, height, mines),
    });

    onRevealBombs('SUPERMAN_MODE', false);
    onRevealBombs('GAME_OVER', false);
    onFirstMove(false);
  };

  return (
    <div className="game-container">
      <ScorePanel className="score-panel" steps={steps} remainingFlags={remainingFlags}></ScorePanel>
      <Board 
        gameSettings={gameSettings} 
        onStepEvent={stepsHandler} 
        onFlagEvent={remainingFlagsHandler} 
        onGameOver={lossHandler}
        onGameWin={gameWinHandler}
        remainingFlags={remainingFlags}></Board>
    </div>
  );
};

export default GameContainer;
