import React, { useState, useEffect, useContext } from "react";

import { GameContext } from '../../../shared/context/game-context';
import "./StopWatch.scss";

const StopWatch = (props) => {
  debugger;
  const gameContext = useContext(GameContext);

  useEffect(() => {
    debugger;

    const startWatch = () => {
      debugger;
      let s = seconds;
      setInterval(() => {
        s++;
        startWatchSeconds(s);
      }, 1000);
    };

    startWatch();
  }, [gameContext]);

  const [seconds, startWatchSeconds] = useState(0);

  // const startWatch = () => {
  //   debugger;
  //   let s = seconds;
  //   setInterval(() => {
  //     s++;
  //   });
  //   startWatchSeconds(s);
  // };


  return (
    <div className="stop-watch">
      <p>seconds: {seconds}</p>
    </div>
  );
};

export default StopWatch;
