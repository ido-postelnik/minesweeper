import React, { useState, useCallback } from "react";

import Sidebar from './components/layout/sidebar/Sidebar';
import Main from './components/layout/main/Main';
import { GameContext } from './shared/context/game-context';
import { BOARD_WIDTH_INIT, BOARD_HEIGHT_INIT, BOARD_MINES_INIT } from './shared/utils/constants';
import './App.scss';


function App() {
  const [gameSettings, setGameSettings] = useState({
    width: BOARD_WIDTH_INIT,
    height: BOARD_HEIGHT_INIT,
    mines: BOARD_MINES_INIT,
  });

  const onStartNewGame = useCallback((obj) => {
    setGameSettings(obj);
  }, []);

  return (
    <GameContext.Provider
      value={{
        gameSettings: gameSettings,
        onStartNewGame: onStartNewGame,
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
