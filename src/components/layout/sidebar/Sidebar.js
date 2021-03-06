import React, { useContext } from "react";

import GameSettings from "../../game/GameSettings/GameSettings";
import { GameContext } from '../../../shared/context/game-context';
import LogoImage from "../../../assets/images/logo.svg";
import SupermanImage from "../../../assets/images/superman.png";
import "./Sidebar.scss";

const Sidebar = () => {
  const { isSupermanMode, onRevealBombs } = useContext(GameContext);

  const supermanModeHandler = () => {
    onRevealBombs('SUPERMAN_MODE', !isSupermanMode);
  };

  return (
    <aside className="sidebar">
      <section className="logo p-x-5">
        <img src={LogoImage} alt="Minesweeper logo" className="m-r-5" />
        <h1 className="m-y-0">Minesweeper</h1>
      </section>
      <GameSettings className="game-settings"></GameSettings>
      <section className="more-actions p-b-10">
        <p className="m-y-10">Need some help?</p>
        <div className="superman-container">
          <img src={SupermanImage} alt="superman" className="superman-button" onClick={supermanModeHandler}/>
          <p className={`is-superman-mode m-y-0 ${isSupermanMode ? 'is-superman-mode-on' : ''}`}>{isSupermanMode ? 'On' : 'Off'}</p>
        </div>

      </section>
    </aside>
  );
};

export default Sidebar;
