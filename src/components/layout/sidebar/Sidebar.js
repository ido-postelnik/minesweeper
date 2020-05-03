import React from "react";

import GameSettings from "../../game/GameSettings/GameSettings";
import LogoImage from "../../../assets/images/logo.svg";
import "./Sidebar.scss";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <section className="logo p-x-5 p-y-5">
        <img src={LogoImage} alt="Minesweeper logo" className="m-r-5" />
        <h1 className="m-y-0">Minesweeper</h1>
      </section>
      <GameSettings className="game-settings"></GameSettings>
      <section className="more-actions">Need help?</section>
    </aside>
  );
};

export default Sidebar;
