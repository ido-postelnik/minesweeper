import React, { useCallback, useReducer, useContext } from "react";

import Input from "../../uiElements/Input/Input";
import Button from "../../uiElements/Button/Button";
import { GameContext } from '../../../shared/context/game-context';
import { setMinesLocation } from "../../../shared/utils/utils";
import {
  BOARD_WIDTH_INIT,
  BOARD_HEIGHT_INIT,
  BOARD_MINES_INIT,
  MIN_BOARD_WIDTH,
  MAX_BOARD_WIDTH,
  MIN_BOARD_HEIGHT,
  MAX_BOARD_HEIGHT,
  MIN_MINES_AMOUNT
} from '../../../shared/utils/constants';
import "./GameSettings.scss";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;

      // Calculate max mines number
      if (action.inputId === 'width') {
        maxMines = action.value * state.inputs.height.value;
      }
      else if (action.inputId === 'height') {
        maxMines = action.value * state.inputs.width.value;
      }

      // Check mines number validity accroding to changes in 'width' and 'height'
      if ((action.inputId === 'width' || action.inputId === 'height')) {
        if (state.inputs.mines.value <= maxMines && state.inputs.mines.value >= MIN_MINES_AMOUNT){
          state.inputs['mines'].isValid = true;
        }
        else {
          state.inputs['mines'].isValid = false;
        }
      }

      // inputId => width / height / mines
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;
        }
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }

      return {
        ...state,
        inputs: {
          ...state.inputs,
          // overding the state of the spesific input we changed
          [action.inputId]: {
            value: action.value,
            isValid: action.isValid,
          },
        },
        isValid: formIsValid,
      };
    default:
      return state;
  }
};

let maxMines;

const GameSettings = () => {
  const gameContext = useContext(GameContext);
  
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      width: {
        value: BOARD_WIDTH_INIT,
        isValid: true,
      },
      height: {
        value: BOARD_HEIGHT_INIT,
        isValid: true,
      },
      mines: {
        value: BOARD_MINES_INIT,
        isValid: true,
      },
    },
    isValid: true
  });

  const inputHandler = useCallback((id, value) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: validateForm(id, value),
      inputId: id,
    });
  }, []);

  const validateForm = (id, value) => {
    let retVal;

    switch (id){
      case 'width':
        retVal = value >= MIN_BOARD_WIDTH && value <= MAX_BOARD_WIDTH;
        break;
      case 'height':
        retVal = value >= MIN_BOARD_WIDTH && value <= MAX_BOARD_WIDTH;
        break;
      case 'mines':
        retVal = value >= MIN_MINES_AMOUNT && value <= maxMines;
        break;
      default:
        return 0;
    }

    return retVal;
  };

  const startNewGameHandler = (event) => {
    event.preventDefault();

    let width = formState.inputs.width.value;
    let height = formState.inputs.height.value;
    let mines = formState.inputs.mines.value;

    gameContext.onRevealBombs('SUPERMAN_MODE', false);
    gameContext.onRevealBombs('GAME_OVER', false);
    gameContext.onFirstMove(false);

    gameContext.onStartNewGame({
      width,
      height,
      mines,
      minesLocation: setMinesLocation(width, height, mines),
    });
  };

  return (
    <div className="game-settings p-x-20 p-y-20">
      <h1 className="game-settings-title m-t-0 m-b-10">Game Settings</h1>
      <form className="form" onSubmit={startNewGameHandler}>
        {/* Width */}
        <div className="input-contianer">
          <Input
            id="width"
            type="number"
            label="Board width"
            onInput={inputHandler}
            value={formState.inputs.width.value}
          />
          {!formState.inputs.width.isValid && (
            <p className="error-text m-y-5">{`Please enter a number between ${MIN_BOARD_WIDTH} and ${MAX_BOARD_WIDTH}`}</p>
          )}
        </div>

        {/* Height */}
        <div className="input-contianer">
          <Input
            id="height"
            type="number"
            label="Board height"
            onInput={inputHandler}
            value={formState.inputs.height.value}
          />
          {!formState.inputs.height.isValid && (
            <p className="error-text m-t-5">{`Please enter a number between ${MIN_BOARD_HEIGHT} and ${MAX_BOARD_HEIGHT}`}</p>
          )}
        </div>

        {/* Mines */}
        <div className="input-contianer">
          <Input
            id="mines"
            type="number"
            label="Mines number"
            onInput={inputHandler}
            value={formState.inputs.mines.value}
          />
          {!formState.inputs.mines.isValid && formState.inputs.width.isValid && formState.inputs.height.isValid && (
            <p className="error-text m-t-5">{maxMines > 1 ? `Please enter a number between ${MIN_MINES_AMOUNT} and ${maxMines}` : maxMines === 0 ? '' : `Only 1 mine is possible`}</p>
          )}
        </div>


        {/* Submit */}
        <Button
          className="success m-t-5"
          type="submit"
          disabled={!formState.isValid}
        >
          Start game
        </Button>
      </form>
    </div>
  );
};

export default GameSettings;
