import React from "react";

import Input from '../../uiElements/input/Input';
import Button from '../../uiElements/button/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MIN,
  VALIDATOR_MAX,
} from "../../../shared/utils/validators";
import {
  MIN_BOARD_WIDTH,
  MAX_BOARD_WIDTH,
  MIN_BOARD_HEIGHT,
  MAX_BOARD_HEIGHT
} from "../../../shared/utils/constants";
import { useForm } from '../../../shared/hooks/form-hook';
import "./GameSettings.scss";

const GameSettings = () => {
  const widthInit  = 10;
  const heightInit = 10;
  const minesInit  = 5;
  let maxMines = widthInit * heightInit;

  const [formState, inputHandler, setFormData] = useForm(
    {
      width: {
        value: widthInit,
        isValid: true,
      },
      height: {
        value: heightInit,
        isValid: true,
      },
      mines: {
        value: minesInit,
        isValid: true,
      },
    },
    false
  );



  const startNewGameHandler = (event) => {
    event.preventDefault();

    console.log('Form inputs: ', formState.inputs);
  };

  // useEffect(() => {
  //   // identifiedItem should come from the BE
  //   const identifiedItem = {
  //     id: "2",
  //     name: "BBB",
  //     description: "What an amazing item B",
  //     image:
  //       "https://cdn1.brandability.co.za/1970/01/21130944/Non-Woven-Shopper-Bag-Royal-Blue.jpg",
  //     owner: "1",
  //   };

  //   if (itemId != null && identifiedItem != null) {
  //     setFormData(
  //       {
  //         name: {
  //           value: identifiedItem.name,
  //           isValid: true,
  //         },
  //         description: {
  //           value: identifiedItem.description,
  //           isValid: true,
  //         },
  //       },
  //       true
  //     );
  //   }

  //   dataArrivedHanler(); // I do this in order to re-render the component after data has "arrived" asyncronaslly
  // }, [setFormData, itemId]);

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
          validators={[VALIDATOR_MIN(0), VALIDATOR_MAX(maxMines)]}
          errorText={`Please enter a number between 0 to ${maxMines}`}
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
