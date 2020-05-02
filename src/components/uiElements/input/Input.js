import React, { useReducer, useEffect } from "react";

import { validate } from '../../../shared/utils/validators';
import "./Input.scss";

// Manage the input state - value and isValid
const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      // The new state that will be returned 
      return {
        ...state, // the old state properties (if there are more than just value and isValid)
        value: action.val, // overding value property
        isValid: validate(action.val, action.validators), // overding isValid property
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '',
    isTouched: false,
    isValid: props.initialValid || false,
  });


  // useEffect runs logic when the input value change or input validity change
  // gets array of dependencies that should trigger the function
  const { id, onInput }    = props;
  const { value, isValid } = inputState;  
  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);


  const changeHandler = (event) => {
    // Dispatching the action

    let parsedValue =
      props.type === "number" && event.target.value > 0
        ? parseInt(event.target.value)
        : event.target.value;
 
    dispatch({
      type: "CHANGE",
      val: parsedValue,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH'
    });
  };

  return (
    <div className="input-container m-b-10">
      <label htmlFor={props.id} className="label m-b-5">
        {props.label}
      </label>
      <input
        className="input"
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
      {!inputState.isValid && inputState.isTouched && (
        <p className="error-text m-t-5">{props.errorText}</p>
      )}
    </div>
  );
};

export default Input;
