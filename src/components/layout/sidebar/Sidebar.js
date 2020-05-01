import React from "react";

import GameSettings from "../../game/gameSettings/GameSettings";
import "./Sidebar.scss";
import Logo from "../../../assets/images/minesweeper-logo.png";

const Sidebar = () => {
  return (
    <aside class="sidebar">
      <section class="logo">
        <img src={Logo} alt="Minesweeper logo" />
        <h1>Minesweeper</h1>
      </section>
      <GameSettings class="game-settings"></GameSettings>
      <section class="more-actions">Need help?</section>
    </aside>
  );
};

export default Sidebar;
