import React, { useContext } from "react";

import GameSettings from "../../game/GameSettings/GameSettings";
import { GameContext } from '../../../shared/context/game-context';
import LogoImage from "../../../assets/images/logo.svg";
import SupermanImage from "../../../assets/images/superman.png";
import "./Sidebar.scss";

const Sidebar = () => {
  const { isSupermanMode, onSupermanMode } = useContext(GameContext);

  const supermanModeHandler = () => {
    onSupermanMode(!isSupermanMode);
  };

  return (
    <aside className="sidebar">
      <section className="logo p-x-5">
        <img src={LogoImage} alt="Minesweeper logo" className="m-r-5" />
        <h1 className="m-y-0">Minesweeper</h1>
      </section>
      <GameSettings className="game-settings"></GameSettings>
      <section className="more-actions p-b-20">
        <p className="m-y-10">Need a hint ?</p>
        <div className="superman-container">
          <img src={SupermanImage} alt="superman" className="superman-button" onClick={supermanModeHandler}/>
          {isSupermanMode && <p className="is-superman-mode m-y-0">ON</p>}
        </div>

      </section>
    </aside>
  );
};

export default Sidebar;
