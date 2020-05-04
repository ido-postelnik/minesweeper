import React, { useState, useEffect, useContext } from "react";

import Card from '../../uiElements/Card/Card';
import { GameContext } from '../../../shared/context/game-context';
import "./StopWatch.scss";

const StopWatch = () => {
  const { isFirstMove, isGameLost } = useContext(GameContext);
  const [seconds, setSeconds] = useState(0);

  const secondsHandler = (val) => {
    setSeconds(val);
  }

  useEffect(() => {
    let interval = null;

    if (isFirstMove) {
      interval = setInterval(() => {
        secondsHandler(seconds + 1);
      }, 1000);
    } 
    else if (isFirstMove === false && seconds !== 0) {
      clearInterval(interval);
      secondsHandler(0);
    }
    if (isGameLost === true) {
      secondsHandler(seconds);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isFirstMove, isGameLost, seconds]);

  return (
    <Card label="Time (s)" content={seconds}></Card>
  );
};

export default StopWatch;
