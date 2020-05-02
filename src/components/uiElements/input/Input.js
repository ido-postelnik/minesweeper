import React, { useReducer, useEffect } from "react";

import { validate } from '../../../shared/utils/validators';
import "./Input.scss";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
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
    value: props.initialValue || "",
    isTouched: false,
    isValid: props.initialValid || false,
  });

  const { id, onInput }    = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH"
    });
  };

  return (
    <div className="input-container m-b-10">
      <label htmlFor={props.id} className="label m-b-5">
        {props.label}
      </label>
      <input
        className={`input ${
          !inputState.isValid && inputState.isTouched ? "border-red-400" : ""
        }`}
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
