import React from "react";

import "./GameSettings.scss";

const GameSettings = () => {
  return (
    <div class="game-settings">
      <h1>Game Settings</h1>
      <label for="width">Width</label>
      <input id="width"></input>
    </div>
  );
};

export default GameSettings;
