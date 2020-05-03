import React, { useState, useCallback } from "react";

import Sidebar from "./components/layout/Sidebar/Sidebar";
import Main from "./components/layout/Main/Main";
import { GameContext } from './shared/context/game-context';
import { setMinesLocation } from "./shared/utils/utils";
import { BOARD_WIDTH_INIT, BOARD_HEIGHT_INIT, BOARD_MINES_INIT } from './shared/utils/constants';
import './App.scss';


function App() {
  const [gameSettings, setGameSettings] = useState({
    width: BOARD_WIDTH_INIT,
    height: BOARD_HEIGHT_INIT,
    mines: BOARD_MINES_INIT,
    minesLocation: setMinesLocation(BOARD_WIDTH_INIT, BOARD_HEIGHT_INIT, BOARD_MINES_INIT),
  });

  const onStartNewGame = useCallback((obj) => {
    setGameSettings(obj);
  }, []);

  const [isSumermanMode, setIsSupermanMode] = useState(false);

  const onSupermanMode = useCallback((mode) => {
    setIsSupermanMode(mode);
  }, []);

  return (
    <GameContext.Provider
      value={{
        gameSettings: gameSettings,
        onStartNewGame: onStartNewGame,
        isSupermanMode: isSumermanMode,
        onSupermanMode: onSupermanMode
      }}
    >
      <div className="app">
        <Sidebar />
        <Main />
      </div>
    </GameContext.Provider>
  );
}

export default App;
