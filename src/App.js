import React from 'react';

import './App.scss';
// import "./style/styles.scss";
import Sidebar from './components/layout/sidebar/Sidebar';
import Main from "./components/layout/main/Main";

function App() {
  return (
    <div className="app">
      <Sidebar/>
      <Main />
      <h1>test</h1>
    </div>
  );
}

export default App;
