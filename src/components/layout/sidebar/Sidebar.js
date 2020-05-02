import React from "react";

import GameSettings from "../../game/gameSettings/GameSettings";
import "./Sidebar.scss";
import Logo from "../../../assets/images/minesweeper-logo.png";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <section className="logo">
        <img src={Logo} alt="Minesweeper logo" />
        <h1>Minesweeper</h1>
      </section>
      <GameSettings className="game-settings"></GameSettings>
      <section className="more-actions">Need help?</section>
    </aside>
  );
};

export default Sidebar;
