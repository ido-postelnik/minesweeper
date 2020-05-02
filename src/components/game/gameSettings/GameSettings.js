import React, { useCallback, useReducer, useContext } from "react";

import Input from '../../uiElements/input/Input';
import Button from '../../uiElements/button/Button';
import { GameContext } from '../../../shared/context/game-context';
import {
  VALIDATOR_MIN,
  VALIDATOR_MAX,
} from "../../../shared/utils/validators";
import {
  BOARD_WIDTH_INIT, 
  BOARD_HEIGHT_INIT, 
  BOARD_MINES_INIT,
  MIN_BOARD_WIDTH,
  MAX_BOARD_WIDTH,
  MIN_BOARD_HEIGHT,
  MAX_BOARD_HEIGHT
} from "../../../shared/utils/constants";
import "./GameSettings.scss";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      
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
      
      // Calculate max mines number
      if(action.inputId === 'width') {
        maxMines = action.value * state.inputs.height.value;
      } 
      else if (action.inputId === 'height') {
        maxMines = action.value * state.inputs.width.value;
      }

      // Check validity of mines when "width" or "height" got changed
      // todo - this logic needs to trigger the validate functions for the mines input
      // 1st option - add error message also here..
      // 2nd option - do all the validating here and not in the Input component
      // debugger;
      if(action.inputId === 'width' || action.inputId === 'height') {
        if (state.inputs.mines.value > maxMines) {
          state.inputs.mines.isValid = false;
          formIsValid = false;
        }
        else {
          state.inputs.mines.isValid = true;
          formIsValid = true;
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
  // debugger;

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


  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  // Width input handler
  // const widthInputHandler = useCallback((id, value, isValid) => {
  //   debugger;
  //   dispatch({
  //     type: "INPUT_CHANGE",
  //     value: value,
  //     isValid: isValid,
  //     inputId: id,
  //   });
  // }, []);

  // Height input handler
  // const heightInputHandler = useCallback((id, value, isValid) => {
  //   dispatch({
  //     type: "INPUT_CHANGE",
  //     value: value,
  //     isValid: isValid,
  //     inputId: id,
  //   });
  // }, []);

  // Mines input handler
  // const minesInputHandler = useCallback((id, value, isValid) => {
  //   dispatch({
  //     type: "INPUT_CHANGE",
  //     value: value,
  //     isValid: isValid,
  //     inputId: id,
  //   });
  // }, []);

  const startNewGameHandler = (event) => {
    event.preventDefault();
    // debugger;

    gameContext.onStartNewGame({
      width: formState.inputs.width.value,
      height: formState.inputs.height.value,
      mines: formState.inputs.mines.value,
    });

    console.log("Form inputs: ", formState.inputs);
  };

  return (
    <div className="game-settings p-x-10 p-y-10">
      <h1 className="game-settings-title m-t-0 m-b-10">Game Settings</h1>
      <form className="game-settings-form p-x-5" onSubmit={startNewGameHandler}>
        {/* Width */}
        <Input
          id="width"
          type="number"
          label="Board width"
          validators={[
            VALIDATOR_MIN(MIN_BOARD_WIDTH),
            VALIDATOR_MAX(MAX_BOARD_WIDTH),
          ]}
          errorText={`Please enter a number between ${MIN_BOARD_WIDTH} to ${MAX_BOARD_WIDTH}`}
          onInput={inputHandler}
          initialValue={formState.inputs.width.value}
          initialValid={formState.inputs.width.isValid}
        />

        {/* Height */}
        <Input
          id="height"
          type="number"
          label="Board height"
          validators={[
            VALIDATOR_MIN(MIN_BOARD_HEIGHT),
            VALIDATOR_MAX(MAX_BOARD_HEIGHT),
          ]}
          errorText={`Please enter a number between ${MIN_BOARD_WIDTH} to ${MAX_BOARD_WIDTH}`}
          onInput={inputHandler}
          initialValue={formState.inputs.height.value}
          initialValid={formState.inputs.height.isValid}
        />

        {/* Mines */}
        <Input
          id="mines"
          type="number"
          label="Mines number"
          validators={[VALIDATOR_MIN(1), VALIDATOR_MAX(maxMines)]}
          errorText={`Please enter a number between 1 to ${maxMines}`}
          onInput={inputHandler}
          initialValue={formState.inputs.mines.value}
          initialValid={formState.inputs.mines.isValid}
        />

        {/* Submit */}
        <Button
          className="success m-auto m-t-15"
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
